import React from "react";

import styles from "./ExpensesArrow.module.scss";

export const Arrow = ({operation}) => {
  return (
    <svg className={styles.icon}>
      <use href={`#${operation}-arrow`}></use>
    </svg>
  );
};
