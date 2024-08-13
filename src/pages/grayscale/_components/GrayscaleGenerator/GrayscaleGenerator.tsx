import React from 'react'

import styles from "./GrayscaleGenerator.module.scss";
import Upload from '@/components/Upload/Upload';
import Preview from '../Preview/PreviewContainer';

interface GrayscaleGeneratorProps {
  url: string;
  handleFinish: (urls: Array<string>) => void;
}

const GrayscaleGenerator = ({ url, handleFinish }: GrayscaleGeneratorProps) => {
  return (
    <section className={styles.grayscaleSection}>
      <div className={styles.grayscaleGenerator} >
        <Upload handleFinish={handleFinish} text="Select your image!" />
      </div>
      {url && (
        <div className={styles.tool}>
          <Preview url={url} />
        </div>
      )}
    </section>
  )
}

export default GrayscaleGenerator