import { useLocation } from "react-router-dom";
import Input from "../Input";
import styles from "./style.module.css";
import getGoogleOAuthURL from "../../function/getGoogleOAuthURL";
import { FcGoogle } from "react-icons/fc";

export default function EnterGoogle({}) {

  const location = useLocation(); 

  return (
  <div>
    <a href={getGoogleOAuthURL()}>
          <Input type="button"  noLabelAndError={true} value="אני רוצה להמשיך באמצעות      " onClick={()=>localStorage.lastRoute = location.pathname}/>
        <div className={styles.buttonGoogle}>
        <FcGoogle/>
        </div>
    </a>
  </div>
  )
}
