import React from "react";

import styles from "./ExpensesArrow.module.scss";

export const ExpensesArrow = () => {
  return (
    <svg className={styles.icon}>
      <use href="#expenses-arrow"></use>
    </svg>
  );
};
