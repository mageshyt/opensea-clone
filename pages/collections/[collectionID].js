import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useWeb3 } from '@3rdweb/hooks'
import { client } from '../../lib/sanityClient'
import { ThirdwebSDK } from '@3rdweb/sdk'
import Header from '../../components/Header'
import { CgWebsite } from 'react-icons/cg'
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'
import { HiDotsVertical } from 'react-icons/hi'
import NFTCard from '../../components/NFTCard'
// import NFTCard from '../../components/NFTCard'

const style = {
  bannerImageContainer: `h-[20vh] w-screen overflow-hidden center`,
  bannerImage: `w-full object-cover`,
  infoContainer: `w-screen px-4`,
  midRow: `w-full flex justify-center text-white`,
  endRow: `w-full flex justify-end text-white`,
  profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
  socialIconsContainer: `flex hidden md:flex text-3xl mb-[-2rem]`,
  socialIconsWrapper: `w-44`,
  socialIconsContent: `flex  container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
  socialIcon: `my-2 `,
  divider: `border-r-2`,
  title: `text-5xl font-bold mb-4`,
  createdBy: `text-lg mb-4`,
  statsContainer: `w-[45vw] grid place-items-center grid-cols-2 py-6 grid-rows-2 lg:flex lg:justify-between md:py-4 border border-[#151b22] rounded-xl md:mb-4`,
  collectionStat: `w-1/4`,
  statValue: `lg:text-3xl text-2xl font-bold w-full flex items-center justify-center`,
  ethLogo: `h-6 mr-2`,
  statName: `text-lg w-full text-center mt-1`,
  description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
}
// ! our query

const Collection = () => {
  const router = useRouter() // ! it has access to query id
  const { provider } = useWeb3()
  const { collectionID } = router.query // ! get out collectionId
  const [collection, setCollection] = useState({})
  const [nfts, setNfts] = useState([]) //! to store our nft variable
  const [listings, setListings] = useState([])
  // https://eth-rinkeby.alchemyapi.io/v2/Y_swT3kIgOwjUbFjtbwIiGPT5ML1N8KA
  // to get our nfts
  const nftModule = useMemo(() => {
    //! if provider doesn't exist, return it
    if (!provider) return
    const sdk = new ThirdwebSDK(
      provider.getSigner(),
      'https://eth-rinkeby.alchemyapi.io/v2/Y_swT3kIgOwjUbFjtbwIiGPT5ML1N8KA'
    )
    return sdk.getNFTModule(collectionID)
  }, [provider])

  //! to get all the nft from the collection
  useEffect(() => {
    if (!nftModule) return
    ;(async () => {
      const nfts = await nftModule.getAll()

      setNfts(nfts)
    })()
  }, [nftModule])

  const marketPlaceModule = useMemo(() => {
    if (!provider) return

    const sdk = new ThirdwebSDK(
      provider.getSigner(),
      'https://eth-rinkeby.alchemyapi.io/v2/Y_swT3kIgOwjUbFjtbwIiGPT5ML1N8KA'
    )
    return sdk.getMarketplaceModule(
      '0x393770b8F920Ae6895Ef2B96927a76a5bc3bd26e'
    )
  }, [provider])

  // get all listings in the collection
  useEffect(() => {
    if (!marketPlaceModule)
      return //! to ge the listing items in our third web market place module
    ;(async () => {
      const get = await marketPlaceModule.getAllListings()

      setListings(get)
    })()
  }, [marketPlaceModule])
  console.log('listings', listings)
  const fetchCollectionData = async (
    sanityClient = client,
    collectionId = collectionID
  ) => {
    // ! this is our query to fetch our collection
    const query = `*[_type=='marketItems' && contractAddress == '0x8848d969Ba8432be3964b7A487AbfEd4781fa6B5']{
    'imageUrl':profileImage.asset->url,
    'bannerImageUrl':bannerImage.asset->url,
   volumeTraded,
  createdBy,
  contractAddress,
  "creator":createdBy->userName,
  title,floorPrice,
  "allOwners":owners[]->,
  description
  
}

  `
    const collectionData = await sanityClient.fetch(query) //! we are fetching from sanity and storing
    await setCollection(...collectionData)
  }

  useEffect(() => {
    fetchCollectionData()
  }, [collectionID])

  return (
    <div>
      <Header />
      {/* banner image */}
      <div className={style.bannerImageContainer}>
        <img
          className={style.bannerImage}
          src={
            collection?.bannerImageUrl
              ? collection.bannerImageUrl
              : 'https://via.placeholder.com/200'
          }
          alt="banner"
        />
      </div>
      {/* profile image */}
      <div className={style.infoContainer}>
        <div className={style.midRow}>
          <img
            className={style.profileImg}
            src={
              collection?.imageUrl
                ? collection.imageUrl
                : 'https://via.placeholder.com/200'
            }
            alt="profile image"
          />
        </div>
        {/* social icons */}
        <div className={style.endRow}>
          <SocialIconsContainer />
        </div>
        <div className={style.endRow}>
          <HiDotsVertical
            className={` inline text-2xl text-white md:hidden `}
          />
        </div>
        {/* club info */}
        <div className={style.midRow}>
          <div className={style.title}>{collection?.title}</div>
        </div>
        {/* Creator info */}
        <div className={style.midRow}>
          <div className={style.createdBy}>
            Created by {''}
            <span className="text-[#2081e2]">{collection?.creator}</span>
          </div>
        </div>
        {/* stats */}
        <Stat collection={collection} nfts={nfts} />

        {/* lets display our nfts */}
        {/* <div className="mt-10 flex flex-wrap"> */}
        <div
          className="mt-10 grid  grid-cols-1 place-items-center gap-x-2  md:grid-cols-2
          lg:grid-cols-4 xl:grid-cols-5"
        >
          {/* */}
          {nfts.map((nft, index) => {
            if (index !== 10) {
              return (
                <NFTCard
                  key={index}
                  nftItem={nft}
                  title={collection?.title}
                  listings={listings}
                />
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default Collection
const Stat = ({ collection, nfts }) => {
  return (
    <div>
      <div className={style.midRow}>
        <div className={style.statsContainer}>
          <div className={style.collectionStat}>
            {/* no of items */}
            <div className={style.statValue}>{nfts.length}</div>
            <div className={style.statName}>items</div>
          </div>
          {/* no of owners */}
          <div className={style.collectionStat}>
            <div className={style.statValue}>
              {collection?.allOwners ? collection.allOwners.length : ''}
            </div>
            <div className={style.statName}>owners</div>
          </div>
          {/* floor price */}
          <div className={style.collectionStat}>
            <div className={style.statValue}>
              <img
                src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                alt="eth"
                className={style.ethLogo}
              />
              {collection?.floorPrice}
            </div>
            <div className={style.statName}>floor price</div>
          </div>
          <div className={style.collectionStat}>
            <div className={style.statValue}>
              <img
                src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                alt="eth"
                className={style.ethLogo}
              />
              {collection?.volumeTraded}.5K
            </div>
            <div className={style.statName}>volume traded</div>
          </div>
        </div>
      </div>
      <div className={style.midRow}>
        <div className={style.description}>{collection?.description}</div>
      </div>
    </div>
  )
}
const SocialIconsContainer = () => {
  return (
    <div className={style.socialIconsContainer}>
      <div className={style.socialIconsWrapper}>
        <div className={style.socialIconsContent}>
          <SocialIcons Icons={CgWebsite} />
          <div className={style.divider} />
          <SocialIcons Icons={AiOutlineInstagram} />
          <div className={style.divider} />
          <SocialIcons Icons={AiOutlineTwitter} />
          <div className={style.divider} />
          <SocialIcons Icons={HiDotsVertical} />
        </div>
      </div>
    </div>
  )
}
const SocialIcons = ({ Icons }) => {
  return (
    <div className={style.socialIcon}>
      <Icons />
    </div>
  )
}
