import React from 'react';
import { CiTrash } from 'react-icons/ci';

import styles from './ImageItem.module.scss';

interface ImageItemProps {
  url: string,
  onDelete: Function;
  provided: any;
}

const ImageItem = ({ url, onDelete, provided }: ImageItemProps) => {
  return (
    <li
      ref={provided?.innerRef}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      style={{ ...provided?.draggableProps.style }}
      className={styles.gridItem}
    >
      <img src={url} alt={`image preview`} />
      <div className={styles.deleteIcon} onClick={() => onDelete(url)}>
        <CiTrash />
      </div>
    </li>
  );
};

export default ImageItem;
