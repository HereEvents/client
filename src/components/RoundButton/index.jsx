import React from 'react'
import styles from "./style.module.css";

// creator: Yisrael Olonoff
// when using my button component you decide the context by
// using my props: icon, func, text, ...props.
// to add text in your button use the text prop, example: 
// <RoundButton icon={<Icon/>} func={func} text={'text'} ></RoundButton>
// to get nice results use fill icons, png type.


function RoundButton({ icon, func, text, ...props }) {
  return (
    <div className={styles.main}>
      <button
        className={props.isActive ? styles.button+' '+styles.active : styles.button}
        onClick={func}
        {...props}
      >
        <img className={styles.icon} src={icon} id={props.id} />
      </button>
      <span className={styles.text}>
        {text}
      </span>
    </div>
  )
}

export default RoundButton