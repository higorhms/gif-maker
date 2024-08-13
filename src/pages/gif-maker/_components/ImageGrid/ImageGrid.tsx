import React, { useCallback } from "react";
import { DragDropContext, Draggable, DropResult, Droppable } from "@hello-pangea/dnd";

import styles from "./ImageGrid.module.scss";
import { useMedia } from "@/context/MediaContext";
import ImageItem from "./ImageItem";

const ImageGrid = () => {
  const { gifMakerUrls, updateGifMakerImages, deleteImageFromGifMaker } = useMedia();
 
  const onDragEnd = useCallback((result: DropResult): void => {
    const { destination, source } = result;

    if (!destination || (destination.droppableId === source.droppableId 
      && destination.index === source.index)) {
      return;
    }

    const newUrls = Array.from(gifMakerUrls);
    const [reorderedItem] = newUrls.splice(source.index, 1);
    newUrls.splice(destination.index, 0, reorderedItem);

    updateGifMakerImages(newUrls);
  }, [gifMakerUrls, updateGifMakerImages]);

  const onDelete = useCallback((urlToDelete: string) => {
    deleteImageFromGifMaker(urlToDelete);
  }, [deleteImageFromGifMaker]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>

      <h1 className={styles.header}>Rearrange Your Images with Ease!</h1>
      <span className={styles.description}>
        Simply drag and drop the images below to reorder them as you like.
      </span>

      <Droppable droppableId="droppable-media" direction="horizontal">
        {(provided) => (
          <ul ref={provided.innerRef} {...provided.droppableProps} className={styles.gridContainer}>
            {gifMakerUrls.map((url, index) => (
              <Draggable key={url} draggableId={url} index={index}>
                {(provided) => (
                  <ImageItem
                    key={index}
                    url={url}
                    onDelete={onDelete}
                    provided={provided}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ImageGrid;
