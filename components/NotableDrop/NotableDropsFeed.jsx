import React from 'react'
import NotableCard from './NotableCard'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Slider from 'react-slick'

const styles = {
  title: `text-2xl text-center text-white font-semibold mb-4`,
  wrapper: `mt-10`,
  cardContainer: `grid pb-10 `,
}

import { settings } from './setting'

const NotableDropsFeed = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Notable Drops Feed</h1>
      {/* card */}
      <div className={`ml-[50px] mt-5`}>
        <Slider {...settings}>
          {/* className={`grid grid-cols-1 place-items-center gap-1 pb-10 lg:grid-cols-2 xl:grid-cols-3`} */}

          <NotableCard
            // className="ml-10"
            name="Glimpses of Existence"
            description="16 1/1's from a lens-based visual artist"
            imag_url="https://storage.opensea.io/static/promocards/glimpses-promocard.png"
          />

          <NotableCard
            isReD={true}
            name="CYBERPUNK VOL. 1"
            description="The World's First Cyberpunk NFT Exhibition"
            imag_url="https://storage.opensea.io/static/promocards/superchief-cyberpunk-promocard.jpg"
          />
          <NotableCard
            name="THE OVERSEERS"
            description="A depiction of beauty and strength"
            imag_url="https://storage.opensea.io/static/promocards/overseers-promocard.png"
          />
        </Slider>
      </div>
    </div>
  )
}

export default NotableDropsFeed
