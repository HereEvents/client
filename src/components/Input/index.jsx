import styles from "./style.module.css";
import { useState } from "react";

// creator: Kobi Krumbein
// color: _______________
// icon: ________________

const Input = (props) => {
  const { label, className = "", type, onChange, ...inputProps } = props;

  return (
    <div>
      <label className={styles.label}>
        <div>{label} </div>
      </label>
      <input
        className={`${styles.input} ${className}`}
        {...inputProps}
        onChange={onChange}
        type={type}
      />
    </div>
  );
};

export default Input;
