import React, { useState } from "react";

import styles from "./CreateButton.module.scss";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

interface CreateProps {
  url: string;
}

const CreateButton = ({ url }: CreateProps) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState("");

  const create = async () => {
    setLoading(true);
    setImage(undefined);
    setErrorMessage("");

    try {
      const response = await fetch("/api/grayscale", {
        headers: { "Content-Type": "application/json" },
        method: "post",
        body: JSON.stringify({ url }),
      });

      if (!response.ok) throw new Error('Something went wrong. Please check your picture and try again...')

      const result = await response.json();
      setImage(result.grayscaledUrl);
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <ErrorMessage message={errorMessage} />
      <input
        type="button"
        value={loading ? "Loading ..." : "Make Image Grayscale"}
        onClick={create}
        disabled={loading}
      />
      {image && (
        <div className={styles.finalImageContainer}>
          <div className={styles.header}>Final (grayscaled) image:</div>
          <img src={image} alt="Grayscale Final" className={styles.image} />
        </div>
      )}
    </div>
  );
};

export default CreateButton;
