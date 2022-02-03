import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import { BiHeart } from 'react-icons/bi'
const style = {
  wrapper: `bg-[#303339] flex-auto w-[14rem] h-[22rem] my-10 mx-5 rounded-2xl overflow-hidden cursor-pointer`,
  imgContainer: ` w-full overflow-hidden flex justify-center items-center`,
  nftImg: `w-full object-cover`,
  details: `p-3`,
  info: `flex justify-between text-[#e4e8eb] drop-shadow-xl`,
  infoLeft: `flex-0.6 flex-wrap`,
  collectionName: `font-semibold text-sm text-[#8a939b]`,
  assetName: `font-bold text-lg mt-2`,
  infoRight: `flex-0.4 text-right`,
  priceTag: `font-semibold text-sm text-[#8a939b]`,
  priceValue: `flex items-center text-xl font-bold mt-2`,
  ethLogo: `h-5 mr-2`,
  likes: `text-[#8a939b] font-bold flex items-center w-full justify-end mt-3`,
  likeIcon: `text-xl mr-2`,
}
const NFTCard = ({ nftItem, listings, nftItem, title }) => {
  const [isListed, setIsListed] = useState(false)
  const [price, setPrice] = useState(0)
  // console.log('listing 👉', listings)
  useEffect(() => {
    // ! let us loop through the listings to find the one that matches the nftItem

    const listing = listings.find((listing) => listing.asset.id === nftItem.id)
    if (Boolean(listing)) {
      ;`
          if we the listing asset id and nftItem id matches then we set the price and set the isListed to true because it is for sale
        `
      setIsListed(true)
      setPrice(listing.buyoutCurrencyValuePerToken.displayValue)
    }
  }, [listings, nftItem])

  return (
    <div
      className={style.wrapper}
      onClick={() => {
        Router.push({
          pathname: `/nfts/${nftItem.id}`,
          query: { isListed: isListed },
        })
      }}
    >
      {/* Image */}
      <div className={style.imgContainer}>
        <img src={nftItem.image} alt={nftItem.name} className={style.nftImg} />
      </div>
      {/* Details */}
      <div className={style.details}>
        <div className={style.info}>
          <div className={style.infoLeft}>
            <div className={style.collectionName}>{title}</div>
            <div className={style.assetName}>{nftItem.name}</div>
          </div>
          {/* is lister then show the price */}
          {isListed && (
            <div className={style.infoRight}>
              <div className={style.priceTag}>Price</div>
              <div className={style.priceValue}>
                <img
                  src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt="eth"
                  className={style.ethLogo}
                />
                {price}
              </div>
            </div>
          )}
        </div>
        {/* likes */}
        <div className={style.likes}>
          <div className={style.likeIcon}>
            <BiHeart />
            <span>{nftItem.likes}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
// grid grid-cols-1 place-items-center gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5

export default NFTCard
