import React from "react";

import styles from "./PasswordRecoveryInfo.module.scss";

export const PasswordRecoveryInfo = ({text, img}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <h2>{text}</h2>
        <img src={img} alt="repairInfo" />
      </div>
    </div>
  );
};
