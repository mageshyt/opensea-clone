import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Home/Hero'
import { useWeb3 } from '@3rdweb/hooks'
import Login from './login'
import { useEffect } from 'react'
import { client } from '../lib/sanityClient'
import toast, { Toaster } from 'react-hot-toast'
import NotableDropsFeed from '../components/NotableDrop/NotableDropsFeed'
const style = {
  wrapper: ``,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,
}
export default function Home() {
  const { address, connectWallet } = useWeb3()

  // ! to handel toast
  const welcomeUser = (userName, toastHandler = toast) => {
    toastHandler.success(
      `Welcome back${userName !== 'Unnamed' ? ` ${userName}` : ''}!`,
      {
        style: {
          background: '#04111d',
          color: '#fff',
        },
      }
    )
  }
  useEffect(() => {
    if (!address) return // ! IFee immediate invoke the function
    ;(async () => {
      const useDoc = {
        _type: 'users',
        _id: address,
        userName: 'Unnamed',
        walletAddress: address,
      }
      // ! we will create the user if he not exist
      const result = await client.createIfNotExists(useDoc)
      welcomeUser(result.userName)
    })()
  }, [address])

  return (
    <div className={style.wrapper}>
      <Toaster position="top-center" reverseOrder={false} />
      {address ? (
        <>
          <Header />
          <Hero />
          <NotableDropsFeed />
        </>
      ) : (
        <Login />
      )}
    </div>
  )
}
