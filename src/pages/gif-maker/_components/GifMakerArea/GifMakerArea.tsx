import React, { useCallback } from 'react'

import { useMedia } from '@/context/MediaContext';
import Upload from "@/components/Upload/Upload";
import PreviewContainer from "@/pages/gif-maker/_components/Preview/PreviewContainer";
import ImageGrid from "@/pages/gif-maker/_components/ImageGrid/ImageGrid";
import styles from "./GifMakerArea.module.scss";

const GifMakerArea = () => {
  const { gifMakerUrls, addImagesToGifMaker, addImagesToGallery } = useMedia();

  const handleFinish = useCallback((uploadedUrls: Array<string>) => {
    addImagesToGifMaker(uploadedUrls);
    addImagesToGallery(uploadedUrls);
  }, [addImagesToGifMaker, addImagesToGallery]);

  return (
    <section className={styles.gifMakerSection}>
      <div className={styles.gifMaker} >
        <Upload handleFinish={handleFinish} text="Select your favorite images!" />
        {
          !!gifMakerUrls.length &&
          (
            <div className={styles.tool}>
              <ImageGrid />
              <PreviewContainer />
            </div>
          )
        }
      </div>
    </section>
  )
}

export default GifMakerArea