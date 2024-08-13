import React from 'react'

import styles from "./HeroSection.module.scss";

const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroSectionContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.header}>GIF Maker</h1>
          <p className={styles.description}>
            Unleash your creativity with our intuitive GIF Studio! Effortlessly upload and arrange your images, fine-tune the slideshow sequence, and forge your animated GIFs to share with the world. Crafting your visual story has never been easier!
          </p>
        </div>
        <div className={styles.gifContainer}>
          <img src="https://github.com/higorhms/GoBarber/assets/44821959/94357a9c-56b9-4a65-ba71-0fa6d2171bce" alt="Instructions GIF" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection