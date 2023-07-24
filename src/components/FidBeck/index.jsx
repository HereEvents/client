import { Link } from "react-router-dom";
import styles from "./style.module.css";

function FidBeck() {
  return (
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
  );
}

export default FidBeck;
