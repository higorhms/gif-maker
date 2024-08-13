import { useCallback, useState } from "react";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";

import styles from "./Gallery.module.scss";
import { useMedia } from "@/context/MediaContext";
import Upload from "../Upload/Upload";
import ImageItem from "./ImageItem";

interface GalleryProps {
  onAddButton: (url: string) => void;
  shouldShowAddButton: (url: string) => boolean;
  onDeleteButton: (url: string) => void;
}

const Gallery = ({ onAddButton, shouldShowAddButton, onDeleteButton }: GalleryProps) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const { gallery, updateGallery, addImagesToGallery } = useMedia();

  const handleFinish = useCallback((uploadedUrls: string[]) => {
    addImagesToGallery([...gallery, ...uploadedUrls]);
  }, [gallery, addImagesToGallery]);

  const onDragEnd = useCallback((result: DropResult) => {
    const { destination, source } = result;

    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    const newUrls = Array.from(gallery);
    const [reorderedItem] = newUrls.splice(source.index, 1);
    newUrls.splice(destination.index, 0, reorderedItem);

    updateGallery(newUrls);
  }, [gallery, updateGallery]);

  return (
    <>
      <button
        className={isGalleryOpen ? styles.toggleButtonClose : styles.toggleButtonOpen}
        onClick={() => setIsGalleryOpen(!isGalleryOpen)}
      >
        {isGalleryOpen ? <CiCircleChevRight /> : <CiCircleChevLeft />}
      </button>

      <div className={isGalleryOpen ? styles.galleryOpen : styles.galleryClosed}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable-media" direction="horizontal">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {isGalleryOpen && <h1 className={styles.header}>G a l l e r y</h1>}
                <ul className={styles.gridContainer}>
                  {gallery.map((url, index) => (
                    <ImageItem
                      key={url}
                      url={url}
                      index={index}
                      shouldShowAddButton={shouldShowAddButton}
                      onAddButton={onAddButton}
                      onDeleteButton={onDeleteButton}
                    />
                  ))}
                  {provided.placeholder}
                </ul>
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {isGalleryOpen &&
          (<div className={styles.addMore}>
            <Upload handleFinish={handleFinish} text="Things looking empty? Add more images!"></Upload>
          </div>
          )}
      </div>
    </>
  );
};

export default Gallery;
