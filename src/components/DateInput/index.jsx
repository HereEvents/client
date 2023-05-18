import style from "./style.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import beginDateUpdate from "../../function/beginDateUpdate";

// creator: Hadar Naiman
export default function DateInput({ values, setValues = () => {}, timeString ,  ...props }) {
  const [datepicker, setdatepicker] = useState(false);
  const [selectDate, setSelectDate] = useState(
    props.val ? props.val : beginDateUpdate(new Date(),timeString)
  );
  useEffect(() => {
    setValues({ ...values, date: selectDate });
  }, [selectDate]);

  function dateSelectHandle(date) {
    // console.log(timeString,"in DateInput");
    const dateUpdate = beginDateUpdate(date,timeString)
    setSelectDate(() => dateUpdate);
    setdatepicker(!datepicker);
    if (typeof props.func === "function") props.func(dateUpdate);
  }

  function dateFormat(dateString) {
    const dateObj = new Date(dateString);
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear().toString();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  const buttonText = "בחר תאריך ביומן";

  return (
    <div className={style.container}>
      <button
        className={style.button}
        onClick={() => setdatepicker(!datepicker)}
        type="button"
      >
        <span className={style.arrIcon}>
          <IoIosArrowBack />
        </span>
        <span className={style.buttonText}>
          {selectDate ? dateFormat(selectDate) : buttonText}
        </span>
        <span className={style.calIcon}>
          <FaRegCalendarAlt />
        </span>
      </button>
      {datepicker && (
        <div>
          <DatePicker
            inline
            dateFormat="dd/MM/yyyy"
            selected={props.val ? props.val : selectDate}
            onSelect={(date) => dateSelectHandle(date)}
          />
        </div>
      )}
    </div>
  );
}
