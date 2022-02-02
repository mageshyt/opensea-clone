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
// import NFTCard from '../../components/NFTCard'

const style = {
  bannerImageContainer: `h-[20vh] w-screen overflow-hidden flex justify-center items-center`,
  bannerImage: `w-full object-cover`,
  infoContainer: `w-screen px-4`,
  midRow: `w-full flex justify-center text-white`,
  endRow: `w-full flex justify-end text-white`,
  profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
  socialIconsContainer: `flex text-3xl mb-[-2rem]`,
  socialIconsWrapper: `w-44`,
  socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
  socialIcon: `my-2`,
  divider: `border-r-2`,
  title: `text-5xl font-bold mb-4`,
  createdBy: `text-lg mb-4`,
  statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
  collectionStat: `w-1/4`,
  statValue: `text-3xl font-bold w-full flex items-center justify-center`,
  ethLogo: `h-6 mr-2`,
  statName: `text-lg w-full text-center mt-1`,
  description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
}
// ! our query

const Collection = () => {
  const router = useRouter() // ! it has access to query id
  const { provider } = useWeb3()
  const { collectionId } = router.query // ! get out collectionId
  const [collection, setCollection] = useState({})
  const [nfts, setNfts] = useState([]) //! to store our nft variable
  const [listings, setListings] = useState([])
  // https://eth-rinkeby.alchemyapi.io/v2/Y_swT3kIgOwjUbFjtbwIiGPT5ML1N8KA
  // to get her nfts
  const nftModule = useMemo(() => {
    //! if provider doesn't exist, return it
    if (!provider) return
    const sdk = new ThirdwebSDK(
      provider.getSigner(),
      'https://eth-rinkeby.alchemyapi.io/v2/Y_swT3kIgOwjUbFjtbwIiGPT5ML1N8KA'
    )
  }, [provider])

  //! to get all the nft from the collection

  useEffect(() => {
    if (!nftModule) return
    ;(async () => {
      const nfts = await nftModule.getAll()
      setNfts(nfts) // ! we are setting our nft
    })()
  }, [nftModule])

  //! for marketplace
  const marketplaceModule = useMemo(() => {
    if (!provider) return
    const sdk = new ThirdwebSDK(
      provider.getSigner(),
      'https://eth-rinkeby.alchemyapi.io/v2/Y_swT3kIgOwjUbFjtbwIiGPT5ML1N8KA'
    )
    return sdk.getMarketplaceModule(
      '0x393770b8F920Ae6895Ef2B96927a76a5bc3bd26e'
    )
  }, [provider])
  // ! get all listing in the collection
  useEffect(() => {
    //! if marketplace doesn't exist, return it
    if (!marketplaceModule) return
    ;(async () => {
      const listings = await marketplaceModule.getAllListings()
      setListings(listings)
    })()
  }, [marketplaceModule])

  const fetchCollection = async (
    sanityClient = client,
    collectionId = collectionId
  ) => {
    const query = `*[_type=='marketItems' && contractAddress == ${collectionId}]{
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
    const collectionData = await sanityClient.fetch(query) //! we are fetching and storing

    await setCollection(collectionData)
  }

  //! run useEffect when collectionId changes
  useEffect(() => {
    fetchCollection()
  }, [collectionId])

  console.log('collectionData -->', collection)
  return <div>{/* <h1>{router.query}</h1> */}</div>
}

export default Collection
