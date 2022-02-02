import React from 'react'
const style = {
  wrapper: `relative`,
  container: `before:content-[''] before:bg-red-500 bg-gray-900 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('https://lh3.googleusercontent.com/ujepnqpnL0nDQIHsWxlCXzyw4pf01yjz1Jmb4kAQHumJAPrSEj0-e3ABMZlZ1HEpJoqwOcY_kgnuJGzfXbd2Tijri66GXUtfN2MXQA=s250')] before:bg-cover before:bg-center before:opacity-30 before:blur`,
  contentWrapper: `flex h-screen relative justify-center flex-wrap items-center`,
  copyContainer: `lg:w-1/2 lg:inline w-full flex flex-col items-center justify-center`,
  title: `relative w-[560] text-left text-white leading-[40px] lg:text-[40px] text-2xl font-bold `,
  description: `text-[#8a939b] w-[400px] text-center font-medium container-[400px] lg:text-2xl text-md mt-[0.8rem] mb-[2.5rem]`,
  ctaContainer: `flex`,
  accentedButton: ` relative text-lg font-semibold px-10 py-3 lg:px-12 lg:py-4 bg-[#2181e2] rounded-lg mr-5 text-white hover:bg-[#42a0ff] cursor-pointer`,
  Startedbutton: ` relative text-lg font-semibold px-10 py-3 lg:px-12 lg:py-4 bg-[#363840] rounded-lg mr-5 text-[#e4e8ea] hover:bg-[#4c505c] cursor-pointer`,
  cardContainer: `rounded-[3rem] w-[360px] md:w-[550px] `,
  infoContainer: `h-20 bg-[#313338] p-4  rounded-b-lg flex items-center text-white`,
  author: `flex flex-col justify-center ml-4`,

  infoIcon: `flex justify-end items-center flex-1 text-[#8a939b] text-3xl font-bold`,
}
const Hero = () => {
  return (
    <div className={style.wrapper}>
      {/* container */}
      <div className={style.container}>
        {/* content wrapper */}
        <div className={style.contentWrapper}>
          {/* copy container */}
          <div className={style.copyContainer}>
            <div className={style.title}>
              <span>Discover, collect, and sell extraordinary NFTs</span>
            </div>
            {/* description */}
            <div className={style.description}>
              <span>
                OpenSea is the world's first and largest NFT marketplace{' '}
              </span>
            </div>
            {/* button container */}
            <div className={style.ctaContainer}>
              {/* Explore button */}
              <div className={style.accentedButton}>
                <span>Explore</span>
              </div>
              {/* accented button */}
              <div className={style.Startedbutton}>
                <span>Get Started</span>
              </div>
            </div>
          </div>
          {/* cardContainer */}
          <div className={style.cardContainer}>
            <img
              className="rounded-t-lg"
              src="https://lh3.googleusercontent.com/V3WU5skoHvCfvfMLgL5gm4NPoBjpU4gTmOkz8d561r09FrMC-UN-h5vDNbgVKsoNzQ2NdIQPGxC-8mHmd5tPmqbvUEaTPZdB0HNP=s550"
              alt=""
            />

            {/* infoContainer */}

            <div className={style.infoContainer}>
              <img
                className="h-[2.25rem] rounded-full"
                src="https://lh3.googleusercontent.com/pqR3PEN7lUuAwTZpk_sjbKKGQVbj4jIj_OFGDmNW1wGKPgygR6tpM0sAcbuMjis84ddfeokjzWjAMNQYw0VpNyIkx6OwjQFifxLHlw=s80"
                alt=""
              />
              {/* Author */}
              <div className={style.author}>
                {/* author anme */}
                <div className={style.name}>Future Proof Visions </div>
                <a
                  className="text-[#1868b7]"
                  href="https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/85237985525734684917380424682378680952947795822601319472306616631339503321089"
                >
                  WylieStyles
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
