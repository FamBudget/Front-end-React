import React from "react";

import styles from "./Google.module.scss";

export const Google = () => {
  return (
    <svg className={styles.icon}>
      <use href="#google"></use>
    </svg>
  );
};
