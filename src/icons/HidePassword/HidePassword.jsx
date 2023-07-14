import React from "react";

import styles from "./HidePassword.module.scss";

export const HidePassword = () => {
  return (
    <svg className={styles.icon}>
      <use href="#view-hide"></use>
    </svg>
  );
};
