import React, { useCallback, useState } from "react";
import Head from "next/head";

import Navbar from "@/components/Navbar/Navbar";
import styles from "./styles.module.scss";
import { useMedia } from "@/context/MediaContext";
import Gallery from "@/components/gallery/gallery";
import HeroSection from "./_components/HeroSection/HeroSection";
import GrayscaleGenerator from "./_components/GrayscaleGenerator/GrayscaleGenerator";

const Grayscale = () => {
  const [url, setUrl] = useState("");
  const { addImageToGallery } = useMedia();

  const handleFinish = useCallback((uploadedUrls: Array<string>) => {
    setUrl(uploadedUrls[0]);
    addImageToGallery(uploadedUrls[0]);
  }, [addImageToGallery]);

  const onGalleryAddButton = useCallback((url: string): void => {
    setUrl(url);
  }, []);

  const onGalleryDeleteButton = useCallback((): void => {
    setUrl("");
  }, []);

  return (
    <>
      <Head>
        <title>Grayscale Generator</title>
        <meta
          name="description"
          content="This grayscale generator takes an image, handles the upload, and returns the image with a grayscale effect applied."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <Navbar />
        <div className={styles.body}>
          <HeroSection />
          <GrayscaleGenerator url={url} handleFinish={handleFinish} />
          <Gallery
            shouldShowAddButton={(urlToCompare) => urlToCompare === url}
            onDeleteButton={onGalleryDeleteButton}
            onAddButton={onGalleryAddButton}
          />
        </div>
      </main>
    </>
  );
};

export default Grayscale;
