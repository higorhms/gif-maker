import React from "react";
import styles from "./PreviewContainer.module.scss";
import CreateButton from "../CreateButton/CreateButton";

interface PreviewProps {
  url: string;
}

const Preview = ({ url }: PreviewProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.controller}>
        <div className={styles.header}>Preview of grayscaled image:</div>
        <div className={styles.description}>
          The image above is a preview of what your image will look like after
          using this tool. To create your final grayscaled image, click the button
          below:
        </div>
        <CreateButton url={url} />
      </div>
      <img src={url} alt="Grayscale Preview" className={styles.image} />
    </div>
  );
};

export default Preview;
