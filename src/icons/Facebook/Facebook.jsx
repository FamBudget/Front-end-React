import React from "react";

import styles from "./Facebook.module.scss";

export const Facebook = () => {
  return (
    <svg className={styles.icon}>
      <use href="#facebook"></use>
    </svg>
  );
};
