import React from 'react'

const styles = {
  cardContainer: `bg-black rounded-xl h-[520px] w-[500px] md:w-[350px] `,
  image: `h-[400px] w-[350px] rounded-t-xl `,
  imageContainer: `rounded-xl`,
  description: `text-white text-center text-sm`,
  button: `border-[0.5px] w-10 text-white rounded-xl mt-4 text-center center `,
}
const NotableCard = ({ name, imag_url, description, isReD }) => {
  return (
    <div
      className={
        isReD ? `${styles.cardContainer} bg-[#fe0200]  ` : styles.cardContainer
      }
    >
      {/* image */}
      <div className={styles.imageContainer}>
        <img className={styles.image} src={imag_url} alt="card-image" />
      </div>
      {/* Info */}
      <div className="center mt-2 flex-col text-white">
        <span className="mb-2 text-2xl">{name}</span>
        {/* description
         */}
        <p className={styles.description}>{description}</p>
        {/* Live button */}
        <div className={styles.button}>
          <span>live</span>
        </div>
      </div>
    </div>
  )
}

export default NotableCard
