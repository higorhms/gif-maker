import React from 'react'
import { CiCirclePlus, CiTrash } from 'react-icons/ci'
import { Draggable } from '@hello-pangea/dnd'

import styles from "./ImageItem.module.scss";

interface ImageItemProps {
  url: string;
  index: number;
  onDeleteButton: (url: string) => void;
  onAddButton: (url: string) => void;
  shouldShowAddButton: (url: string) => boolean;
}

const ImageItem = ({
  url,
  index,
  onAddButton,
  onDeleteButton,
  shouldShowAddButton
}: ImageItemProps) => {
  return (
    <Draggable draggableId={url} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{ ...provided.draggableProps.style }}
          className={styles.gridItem}
        >

          <img src={url} alt={`image preview ${index}`} />

          <div className={styles.deleteIcon} onClick={() => onDeleteButton(url)}>
            <CiTrash />
          </div>

          <div className={styles.addToGifMakerButtonContainer}>
            {
              !shouldShowAddButton(url) &&
              <button className={styles.addToGifMakerButton} onClick={() => onAddButton(url)}>
                <CiCirclePlus />
              </button>
            }
          </div>
        </li>
      )}
    </Draggable>
  )
}

export default ImageItem