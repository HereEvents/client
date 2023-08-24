import styles from "./style.module.css";
import { useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// creator: Kobi Krumbein
// color: _______________
// icon: ________________

const Input = (props) => {
  const {
    noLabelAndError,
    label,
    errorMessage,
    instructions,
    className = "",
    type,
    onChange,
    width,
    refInput,
    isValid,
    isTheSubmitButtonPush,
    isChecked,
    onblur = () => {},
    ...inputProps
  } = props;
  const [validationMessage, setValidationMessage] = useState(!isValid);

  const onInvalid = (e) => {
    setValidationMessage(true);
  };

  const onBlur = (e) => {
    onblur();
    const target = e.target;
    if (!!validationMessage) {
      setValidationMessage(false);
    }
  };

  const tempRef = useRef();
  return (
    <>
      {type != "radio" ? (
        <div className={styles.containerInput}>
          {noLabelAndError||<label className={styles.label}>
            <div>{label} </div>
          </label>}
          <input
            // className={`${styles.input} ${className}`}
            className="form-control"
            {...inputProps}
            onInvalid={onInvalid}
            onBlur={onBlur}
            onChange={onChange}
            type={type}
            ref={refInput ? refInput : tempRef}
          />
          <p className={styles.uploadInstructions}>{instructions}</p>
          {noLabelAndError||!!validationMessage && (
            <span className={styles.errorMessage || validationMessage}>
              {errorMessage}
            </span>
          )}
        </div>
      ) : (
        <div className={styles.radio}>
          <input
            className={`${styles.input} ${className}`}
            style={{ width: width }}
            onChange={onChange}
            type={type}
            onBlur={onBlur}
            onInvalid={onInvalid}
            id={label}
            checked={isChecked}
            {...inputProps}
            // ref={inputRef ? inputRef : tempRef}
          />
          <label className={styles.labelRadio}for={label}>
            {label}
          </label>
          {noLabelAndError||!!validationMessage && (
            <span className={styles.errorMessage || validationMessage}>
              {errorMessage}
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default Input;
