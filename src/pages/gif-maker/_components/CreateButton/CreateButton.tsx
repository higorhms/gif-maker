import React, { useState } from "react";

import styles from "./CreateButton.module.scss";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

interface CreateProps {
  urls: Array<string>;
  height: number;
  width: number;
  speed: number;
}

const CreateButton = ({
  urls,
  height,
  width,
  speed,
}: CreateProps) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const create = async () => {
    const body = {
      urls,
      height,
      width,
      speed
    };

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/gif", {
        headers: { "Content-Type": "application/json", },
        method: "post",
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error('Something went wrong. Please check your picture and try again...')

      const data = await response.json();
      window.location.href = data.url;
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
        value={loading ? "Loading ..." : "Create Your GIF"}
        onClick={create}
        disabled={loading}
      />
    </div>
  );
};

export default CreateButton;
