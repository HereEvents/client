import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";

// creator:matanel vatkin
// need to get array of options (str), placeholder (str), icon (src)

const Select = ({
  choossArray = [],
  placeholder = "location",
  icon,
  errorMessage,
  style = {},
  className = "",
  values,
  setValues = () => {},
  ...props
}) => {
  const [isPlaceChosen, setIsPlaceChosen] = useState(false);
  const [valueText, setValueText] = useState(placeholder);
  const [openPopup, setOpenPopup] = useState(false);
  useEffect(() => {
    setValues({ ...values, [props.name]: valueText });
    if (typeof props.func === "function") props.func(valueText);
  }, [valueText]);
  const lableOnclick = () => {
    setOpenPopup((prev) => !prev);
  };
  const changeTextValue = (e) => {
    setValueText(e.target.innerText);
    setOpenPopup(false);
    setIsPlaceChosen(true);
    // setValue(valueText);
  };
  return (
    <div>
      <div
        className={`${styles.select_container} ${className}`}
        value={valueText}
      >
        <img className={styles.icon} src={icon} />
        <p className={`${styles.select}`} onClick={lableOnclick}>
          {valueText}
        
        {openPopup ? (
          <BsArrowUpShort
            className={styles.arrow}
            style={{ width: "30px"}}
          />
        ) : (
          <BsArrowDownShort
            className={styles.arrow}
            style={{ width: "30px"}}
          />
        )}
        </p>
      </div>
      {openPopup ? (
        <div className={`${styles.select_box}`}>
          {choossArray.map((opt) => (
            <p
              key={opt}
              className={`${styles.option}`}
              onClick={changeTextValue}
            >
              {opt}
            </p>
          ))}
        </div>
      ) : null}
      {!isPlaceChosen ? (
        <span className={styles.errorMessage}> {errorMessage}</span>
      ) : (
        <span className={styles.isPlaceChosen}> {errorMessage}</span>
      )}
    </div>
  );
};

export default Select;
