import React from 'react'

import styles from "./ErrorMessage.module.scss";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    (message && <div className={styles.error}>{message}</div>)
  )
}

export default ErrorMessage