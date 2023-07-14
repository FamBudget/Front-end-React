import React from "react";

import styles from "./ShowPassword.module.scss";

export const ShowPassword = () => {
  return (
    <svg className={styles.icon}>
      <use href="#view-hide"></use>
    </svg>
  );
};
