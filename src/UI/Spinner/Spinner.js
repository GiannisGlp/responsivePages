import React from "react";
import styles from "./Spinner.module.css";

const spinner = (props) => {
  return (
    <div>
      <div className={styles.Loader}>Loading...</div>
    </div>
  );
};

export default spinner;
