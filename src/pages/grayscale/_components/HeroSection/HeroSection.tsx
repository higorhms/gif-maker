import React from 'react'
import styles from "./HeroSection.module.scss";

const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroSectionContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.header}>Grayscale Generator</h1>
          <p className={styles.description}>
            This tool allows a user to upload an image, see a preview of it in
            grayscale, click create and receive their image with grayscale
            applied. To get started, upload an image below:
          </p>
        </div>
        <div className={styles.gifContainer}>
          <img src="https://github.com/higorhms/GoBarber/assets/44821959/6ac4ca52-f72c-4350-9a46-340f49419428" alt="Instructions GIF" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection