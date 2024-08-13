import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';

type MediaContextType = {
  gifMakerUrls: Array<string>;
  gallery: Array<string>;
  addImageToGifMaker: (newUrl: string) => void;
  addImagesToGifMaker: (newUrls: Array<string>) => void;
  deleteImageFromGifMaker: (urlToDelete: string) => void;
  updateGifMakerImages: (urls: Array<string>) => void;
  addImageToGallery: (newUrl: string) => void;
  addImagesToGallery: (newUrls: Array<string>) => void;
  deleteImageFromGallery: (urlToDelete: string) => void;
  updateGallery: (urls: Array<string>) => void;
  gifMakerContains: (url: string) => boolean;
};

type MediaProviderProps = {
  children: ReactNode;
};

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const useMedia = (): MediaContextType => {
  const context = useContext(MediaContext);
  if (context === undefined) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
};

const GIFT_MAKER_KEY = '@Gift-Maker:giftMakerUrls';
const GALLERY_KEY = '@Gift-Maker:gallery';

const MediaProvider = ({ children }: MediaProviderProps) => {
  const [gifMakerUrls, setGifMakerUrls] = useState<string[]>([]);
  const [gallery, setGallery] = useState<string[]>([]);

  useEffect(() => {
    const localGifMakerUrls = localStorage.getItem(GIFT_MAKER_KEY);
    const localGallery = localStorage.getItem(GALLERY_KEY);

    if (localGifMakerUrls?.length) setGifMakerUrls(JSON.parse(localGifMakerUrls));
    if (localGallery?.length) setGallery(JSON.parse(localGallery));
  }, []);

  const addImageToGifMaker = (newUrl: string) => {
    if (gifMakerUrls.includes(newUrl)) return;
    const newUrls = [...gifMakerUrls, newUrl]
    setGifMakerUrls(newUrls);
    localStorage.setItem(GIFT_MAKER_KEY, JSON.stringify(newUrls));
  };

  const addImagesToGifMaker = (newUrls: Array<string>) => {
    newUrls = newUrls.filter(url => !gifMakerUrls.includes(url))
    newUrls = [...gifMakerUrls, ...newUrls];
    setGifMakerUrls(newUrls);
    localStorage.setItem(GIFT_MAKER_KEY, JSON.stringify(newUrls));
  };

  const deleteImageFromGifMaker = (urlToDelete: string) => {
    const newUrls = gifMakerUrls.filter((url) => url !== urlToDelete);
    setGifMakerUrls(newUrls);
    localStorage.setItem(GIFT_MAKER_KEY, JSON.stringify(newUrls));
  };

  const updateGifMakerImages = (newUrls: Array<string>) => {
    setGifMakerUrls(newUrls);
    localStorage.setItem(GIFT_MAKER_KEY, JSON.stringify(newUrls));
  };

  const addImageToGallery = (newUrl: string) => {
    if (gallery.includes(newUrl)) return;
    const newUrls = [...gallery, newUrl];
    setGallery(newUrls);
    localStorage.setItem(GALLERY_KEY, JSON.stringify(newUrls));
  };

  const addImagesToGallery = (newUrls: Array<string>) => {
    newUrls = newUrls.filter(url => !gallery.includes(url))
    newUrls = [...gallery, ...newUrls];
    setGallery(newUrls);
    localStorage.setItem(GALLERY_KEY, JSON.stringify(newUrls));
  };

  const deleteImageFromGallery = (urlToDelete: string) => {
    let newUrls = gallery.filter((url) => url !== urlToDelete);
    setGallery(newUrls);
    localStorage.setItem(GALLERY_KEY, JSON.stringify(newUrls));
  };

  const updateGallery = (newUrls: Array<string>) => {
    setGallery(newUrls);
    localStorage.setItem(GALLERY_KEY, JSON.stringify(newUrls));
  };

  const gifMakerContains = useCallback((url: string) => {
    return gifMakerUrls.includes(url);
  }, [gifMakerUrls]);

  return (
    <MediaContext.Provider value={{
      gifMakerUrls,
      gallery,
      addImageToGifMaker,
      addImagesToGifMaker,
      deleteImageFromGifMaker,
      updateGifMakerImages,
      addImageToGallery,
      addImagesToGallery,
      deleteImageFromGallery,
      updateGallery,
      gifMakerContains
    }}>
      {children}
    </MediaContext.Provider>
  );
};

export default MediaProvider;