import Header from '../../components/Header'
import { useEffect, useMemo, useState } from 'react'
import { useWeb3 } from '@3rdweb/hooks'
import { ThirdwebSDK } from '@3rdweb/sdk'
import { useRouter } from 'next/router'
import NFTImage from '../../components/Home/nft/NFTImage'
import GeneralDetails from '../../components/Home/nft/GeneralDetails'
import ItemsActivity from '../../components/Home/nft/ItemsActivity'

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
}
const nftId = () => {
  const { provider } = useWeb3()
  const [selectedNft, setSelectNft] = useState()
  const router = useRouter()
  const [listings, setListings] = useState([])
  //! to get our nfts
  const nftModule = useMemo(() => {
    //! if provider doesn't exist, return it
    if (!provider) return
    const sdk = new ThirdwebSDK(
      provider.getSigner(),
      'https://eth-rinkeby.alchemyapi.io/v2/Y_swT3kIgOwjUbFjtbwIiGPT5ML1N8KA'
    )
    return sdk.getNFTModule('0x8848d969Ba8432be3964b7A487AbfEd4781fa6B5')
  }, [provider])

  // ! get all NFT in the collection
  useEffect(() => {
    if (!nftModule) return // ! if it is not exists, return it
    ;(async () => {
      const nfts = await nftModule.getAll()
      const filtered_nfts = nfts.find((nft) => nft.id === router.query.nftId)

      setSelectNft(filtered_nfts)
    })()
  }, [nftModule])

  // ! marketPlace
  const marketPlaceModule = useMemo(() => {
    if (!provider) return // ! if it is not exists, return it
    const sdk = new ThirdwebSDK(
      provider.getSigner(),
      'https://eth-rinkeby.alchemyapi.io/v2/Y_swT3kIgOwjUbFjtbwIiGPT5ML1N8KA'
    )
    return sdk.getMarketplaceModule(
      '0x393770b8F920Ae6895Ef2B96927a76a5bc3bd26e'
    )
  }, [provider])

  //   ! to get our listings
  useEffect(() => {
    if (!marketPlaceModule) return // ! if it is not exists, return it
    ;(async () => {
      const get = await marketPlaceModule.getAllListings()
      setListings(get)
    })()
  }, [])
  return (
    <div>
      <Header />
      <div className={style.wrapper}>
        <div className={style.container}>
          {/* Top container */}
          <div className={style.topContent}>
            {/* Image container */}
            <div className={style.nftImgContainer}>
              <NFTImage selectedNft={selectedNft} />
            </div>
            {/* Details */}
            <div className={style.detailsContainer}>
              <GeneralDetails selectedNft={selectedNft} />
            </div>
          </div>
          {/* Item activity */}
          <ItemsActivity selectedNft={selectedNft} />
        </div>
      </div>
    </div>
  )
}

export default nftId
