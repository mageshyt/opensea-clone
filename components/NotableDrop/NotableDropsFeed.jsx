import React from 'react'
import NotableCard from './NotableCard'
const styles = {
  title: `text-2xl text-center text-white font-semibold mb-4`,
  wrapper: `mt-10`,
  cardContainer: `
    flex items-center justify-around pb-10
  `,
}
const NotableDropsFeed = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Notable Drops Feed</h1>
      {/* card */}
      <div className={styles.cardContainer}>
        <NotableCard
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
      </div>
    </div>
  )
}

export default NotableDropsFeed
