import React, { useContext } from "react";
import styles from "./style.module.css";
import { BiAnalyse } from "react-icons/bi";
import Logo from "../Logo";
import { Link } from "react-router-dom";

function HeaderLogin() {
  return (
    <div className={styles.main}>
      <img src={"/KorePo.svg"} alt="" className={styles.logo} />
      <Link
        className={styles.declaimer}
        to={`https://wa.me/+972525666679?text=היי לגבי האפליקציה KorePo רציתי להגיד ש`}
      >
        <img
          src={"/uil_comment-message.svg"}
          alt=""
          className={styles.iconDeclaimer}
        />
        <span className={styles.declaimertext}>
          אנחנו בהרצה נשמח לקבל ממך פידבק
        </span>
      </Link>
    </div>
  );
}

export default HeaderLogin;
