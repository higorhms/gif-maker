import React, { useState } from "react";

import styles from "./PreviewContainer.module.scss";
import GifPreview from "./GifPreview";
import { useMedia } from "@/context/MediaContext";
import PreviewController from "./PreviewController";

const PreviewContainer = () => {
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const { gifMakerUrls } = useMedia();

  return (
    <div className={styles.container}>
      <PreviewController
        width={width}
        setWidth={setWidth}
        height={height}
        setHeight={setHeight}
        animationSpeed={animationSpeed}
        setAnimationSpeed={setAnimationSpeed}
        gifMakerUrls={gifMakerUrls}
      />
      <GifPreview
        images={gifMakerUrls}
        width={width}
        height={height}
        animationSpeed={animationSpeed}
      />
    </div>
  );
};

export default PreviewContainer;
