import React from 'react'
import { useEffect, useState } from 'react'

import { HiTag } from 'react-icons/hi'
import { IoMdWallet } from 'react-icons/io'
import toast, { Toaster } from 'react-hot-toast'

const style = {
  button: `mr-8 flex items-center py-2 px-10 lg:px-12 rounded-lg cursor-pointer`,
  buttonIcon: `text-xs `,
  buttonText: `ml-2  text-xs lg:text-lg font-semibold`,
}
const Purchase = ({ isListed, selectedNft, listings, marketPlaceModule }) => {
  const [selectedMarketNft, setSelectedMarketNft] = useState()
  const [enableButton, setEnableButton] = useState(false)
  //   console.log({ selectedNft, isListed, listings, marketPlaceModule })
  useEffect(() => {
    if (!listings || isListed === 'false') return
    ;(async () => {
      setSelectedMarketNft(
        listings.find((marketNft) => marketNft.asset?.id === selectedNft.id)
      )
    })()
  }, [selectedNft, listings, isListed])

  useEffect(() => {
    if (!selectedMarketNft || !selectedNft) return

    setEnableButton(true)
  }, [selectedMarketNft, selectedNft])
  const confirmPurchase = (toastHandler = toast) =>
    toastHandler.success(`Purchase successful!`, {
      style: {
        background: '#04111d',
        color: '#fff',
      },
    })

  const buyItem = async (
    listingId = selectedMarketNft.id,
    quantityDesired = 1,
    module = marketPlaceModule
  ) => {
    await module
      .buyoutDirectListing({
        // ! we are buying the listed item
        listingId: listingId,
        quantityDesired: quantityDesired,
      })
      .catch((error) => console.error(error))
    console.log('buyoutDirectListing')
    confirmPurchase()
  }

  return (
    <div className="flex h-20 w-full items-center rounded-lg border border-[#151c22] bg-[#303339] px-12">
      <Toaster position="bottom-left" reverseOrder={false} />
      {isListed === 'true' ? (
        <>
          <div
            onClick={() => {
              enableButton ? buyItem(selectedMarketNft.id, 1) : null
            }}
            className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}
          >
            <IoMdWallet className={style.buttonIcon} />
            <div className={style.buttonText}>Buy Now</div>
          </div>
          <div
            className={`${style.button} border border-[#151c22]  bg-[#363840] hover:bg-[#4c505c]`}
          >
            <HiTag className={style.buttonIcon} />
            <div className={style.buttonText}>Make Offer</div>
          </div>
        </>
      ) : (
        <div className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}>
          <IoMdWallet className={style.buttonIcon} />
          <div className={style.buttonText}>List Item</div>
        </div>
      )}
    </div>
  )
}

export default Purchase
