import React from 'react'

import styles from "./PreviewController.module.scss";
import CreateButton from '../CreateButton/CreateButton';

interface PreviewControllerProps {
  width: number;
  height: number;
  animationSpeed: number;
  gifMakerUrls: Array<string>
  setWidth: (value: number) => void;
  setHeight: (value: number) => void;
  setAnimationSpeed: (value: number) => void;
}

const PreviewController = ({
  width,
  height,
  animationSpeed,
  gifMakerUrls,
  setWidth,
  setHeight,
  setAnimationSpeed,
}: PreviewControllerProps) => {

  return (
    <div className={styles.controller}>
      <h1 className={styles.header}>See Your GIF in Action!</h1>

      <div className={styles.control}>
        <label>Width:</label>
        <input
          className={styles.width}
          type="range"
          min="100"
          max="800"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
        />
        <span>{width}px</span>
      </div>

      <div className={styles.control}>
        <label>Height:</label>
        <input
          type="range"
          min="100"
          max="800"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
        />
        <span>{height}px</span>
      </div>

      <div className={styles.control}>
        <label>Speed:</label>
        <input
          type="range"
          min="1"
          max="5"
          step="1"
          value={animationSpeed}
          onChange={(e) => setAnimationSpeed(Number(e.target.value))}
        />
        <span>{animationSpeed}</span>
      </div>
      <span className={styles.description}>
        Once you are happy with what you see, hit the button below to finalize your GIF masterpiece and get ready to share it with the world.
      </span>
      <div className={styles.download}>
        <CreateButton urls={gifMakerUrls} height={height} width={width} speed={animationSpeed} />
      </div>
    </div>
  )
}

export default PreviewController