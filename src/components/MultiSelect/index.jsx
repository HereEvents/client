import React, { useState } from "react";
import Select from "react-select";
import styles from "./style.module.css";
import { useEffect } from "react";

const MultiSelect = ({
  saveToSession,
  options,
  placeholder,
  values,
  setValues,
  name,
  errorMessage,
  isValid,
  selectRequired,
  setSelectRequired,
}) => {
  const [selectedOption, setSelectedOption] = useState({});
  const [validationMessage, setValidationMessage] = useState(!isValid);

  // const saveNewEventToSession = () => {
  //   if (selectedOption && selectedOption.value) {
  //     setValues({ ...values, [name]: selectedOption.value });
  //     name && sessionStorage.setItem("place", selectedOption.value);
  //     console.log("saveNewEventToSession");
  //     setSelectRequired(false);
  //   }
  // };
  // const saveSearchToSession = () => {
  //   if (selectedOption && selectedOption.value) {
  //     setValues({ ...values, [name]: selectedOption.value });
  //     name && sessionStorage.setItem("placeToSearch", selectedOption.value);
  //     console.log("saveSearchToSession");
  //     setSelectRequired(false);
  //   }
  // };

  useEffect(() => {
    // if (saveToSession === "place") {
    //   saveNewEventToSession();
    // } else if (saveToSession === "placeToSearch") {
    //   saveSearchToSession();
    // }
    if (selectedOption && selectedOption.value) {
      setValues({ ...values, [name]: selectedOption.value });
      name && sessionStorage.setItem(saveToSession, selectedOption.value);
      setSelectRequired(false);
    }
  }, [selectedOption]);
  return (
    <>
      <Select
        style={{ width: "100%" }}
        options={options}
        blurInputOnSelect={true}
        isRtl={true}
        placeholder={placeholder}
        defaultValue={
          name && sessionStorage.getItem(saveToSession) != null
            ? {
                label: sessionStorage.getItem(saveToSession),
                value: sessionStorage.getItem(saveToSession),
              }
            : { label: placeholder, value: `${placeholder}` }
        }
        isSearchable={true}
        isClearable={true}
        required={true}
        className={styles.submitted}
        onChange={setSelectedOption}
        onBlur={() => {
          setSelectRequired(true);
        }}
      />
      {!validationMessage && selectRequired && (
        <span className={styles.errorMessage || validationMessage}>
          {errorMessage}
        </span>
      )}
    </>
  );
};

export default MultiSelect;
