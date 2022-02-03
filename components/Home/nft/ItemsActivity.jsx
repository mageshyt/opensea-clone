import React, { useEffect } from 'react'
import { CgArrowsExchangeV } from 'react-icons/cg'
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { useState } from 'react'
// import { dummyEvents } from '../../static/dummyEvents'
// import EventItem from './itemActivity/EventItem'
import { client } from '../../../lib/sanityClient'
import EventItem from './EventItem'
const style = {
  wrapper: `w-full mt-8 border border-[#151b22] rounded-xl bg-[#303339] overflow-hidden`,
  title: `bg-[#262b2f] px-6 py-4 flex items-center`,
  titleLeft: `flex-1 flex items-center text-xl font-bold`,
  titleIcon: `text-3xl mr-2`,
  titleRight: `text-xl`,
  filter: `flex items-center border border-[#151b22] mx-4 my-6 px-3 py-4 rounded-xl bg-[#363840]`,
  filterTitle: `flex-1`,
  tableHeader: `flex w-full bg-[#262b2f] border-y border-[#151b22] mt-8 px-4 py-1`,
  eventItem: `flex px-4`,
  ethLogo: `h-5 mr-2`,
  accent: `text-[#2081e2]`,
}
const ItemsActivity = () => {
  const [toggle, setToggle] = useState(true)
  const [dummyEvents, setDummyEvents] = useState([])
  const fetchCollectionData = async (sanityClient = client) => {
    // ! this is our query to fetch our collection
    const query = `
*[_type=='DummyData'] {
price,
 from,
  to,
  date
  
}
  `

    const collectionData = await sanityClient.fetch(query) //! we are fetching from sanity and storing
    await setDummyEvents(collectionData)
  }
  useEffect(() => {
    fetchCollectionData()
  }, [toggle])
  //   console.log('dummyEvents 👉', dummyEvents)
  return (
    <div className={style.wrapper}>
      <div onClick={() => setToggle(!toggle)} className={style.title}>
        <div className={style.titleLeft}>
          {/* up and down icon */}
          <span className={style.titleIcon}>
            <CgArrowsExchangeV className={style.titleIcon} />
          </span>
          Item Activity
        </div>
        {/* title right */}
        <div className={style.titleRight}>
          {toggle ? <AiOutlineDown /> : <AiOutlineUp />}
        </div>
      </div>
      {/* if toggle  is true  then show the listing*/}
      {toggle && (
        // activity table
        <div className={style.activityTable}>
          <div className={style.filter}>
            <div className={style.filterTitle}>Filter</div>
            <div className={style.filterIcon}>
              {' '}
              <AiOutlineDown />{' '}
            </div>
          </div>
          {/* table headings */}
          <div className={style.tableHeader}>
            <div className={`${style.tableHeaderElement} flex-[2]`}>Event</div>
            <div className={`${style.tableHeaderElement} flex-[2]`}>Price</div>
            <div className={`${style.tableHeaderElement} flex-[3]`}>From</div>
            <div className={`${style.tableHeaderElement} flex-[3]`}>To</div>
            <div className={`${style.tableHeaderElement} flex-[2]`}>Date</div>
          </div>
          {dummyEvents.map((event, index) => (
            <EventItem event={event} key={index} />
          ))}
        </div>
      )}
    </div>
  )
}
export default ItemsActivity
