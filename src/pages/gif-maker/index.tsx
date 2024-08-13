import Head from "next/head";

import { useMedia } from "@/context/MediaContext";
import Navbar from "@/components/Navbar/Navbar";
import styles from "./styles.module.scss";
import HeroSection from "@/pages/gif-maker/_components/HeroSection/HeroSection";
import GifMakerArea from "@/pages/gif-maker/_components/GifMakerArea/GifMakerArea";
import Gallery from "@/components/gallery/gallery";

export default function GIFMaker() {
  const { addImageToGifMaker, gifMakerContains, deleteImageFromGallery } = useMedia();

  return (
    <>
      <Head>
        <title>Gif Maker</title>
        <meta
          name="description"
          content="This gif maker handles uploading multiple images, allows the user to preview the images playing one after another, and returns the a completed GIF."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <Navbar />
        <div className={styles.body}>
          <div>
            <HeroSection />
            <GifMakerArea />
          </div>
          <Gallery
            shouldShowAddButton={gifMakerContains}
            onAddButton={addImageToGifMaker}
            onDeleteButton={deleteImageFromGallery}
          />
        </div>
      </main>
    </>
  );
}
