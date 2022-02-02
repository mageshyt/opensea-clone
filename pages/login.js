import { useWeb3 } from '@3rdweb/hooks'
import React from 'react'

const style = {
  description: `text-md text-gray-500 font-medium`,
  blue_word: `text-blue-500 cursor-pointer`,
  icon: `h-8 w-8`,
  name: `text-md text-gray-100 font-medium`,
  iconContainer: `flex hover:bg-[#303339]  cursor-pointer rounded-lg items-center justify-between p-4 border-b-[1px] border-gray-900`,
  popular: `text-sm text-gray-500 font-medium`,
}
const login = () => {
  const { address, connectWallet } = useWeb3()
  return (
    <div className=" flex h-[1000px] items-center justify-center p-10">
      {/* Container */}
      <div className="flex flex-col items-center justify-center ">
        {/* info container */}
        <div>
          {/* title */}
          <h2 className="mb-5 text-2xl font-semibold text-gray-50">
            Connect your wallet.
          </h2>
          {/* description */}
          <p className={style.description}>
            Connect with one of our available{' '}
            <span className={style.blue_word}>wallet</span> providers or create
            a new one.
          </p>
        </div>
        {/* sign in options */}
        <div className="mt-5 h-[320px] w-[350px] rounded-lg border-[0.5px] border-[#04111d] md:w-[570px] ">
          {/* sign in with meta mask wallet */}
          <div onClick={() => connectWallet('injected')}>
            <Wallet
              name="MetaMask"
              img_url="https://opensea.io/static/images/logos/metamask-alternative.png"
              popular={true}
            />
          </div>
          {/* Coinbase */}
          <Wallet
            name="Coinbase wallet "
            img_url="https://storage.opensea.io/static/wallets/walletlink/walletlink-alternative.png"
            popular={false}
          />
          {/* wallet connect */}
          <Wallet
            name="WalletConnect"
            img_url="https://storage.opensea.io/static/wallets/walletconnect/walletconnect-alternative.png"
            popular={false}
          />
          {/* Fortmatic */}
          <Wallet
            img_url="https://static.opensea.io/logos/fortmatic-alternative.png"
            name="Fortmatic"
          />
          <div className="border-[#e5e8eb]items-center flex cursor-pointer justify-center rounded-b-xl border-[0.5px] p-4 p-4">
            <div className="text-xl text-white">Show more options</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default login

const Wallet = ({ name, img_url, popular }) => (
  <div
    className={
      popular
        ? `${style.iconContainer}`
        : `${style.iconContainer} cursor-not-allowed`
    }
  >
    <div className="flex items-center space-x-3 ">
      <img className={style.icon} src={img_url} alt="" />
      <p className={style.name}>{name}</p>
    </div>
    {popular ? <p className={style.popular}>popular</p> : <p></p>}
  </div>
)
