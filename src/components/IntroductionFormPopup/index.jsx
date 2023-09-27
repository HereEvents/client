import styles from "./style.module.css";
import RegisterForm from "../RegisterForm";

export default function IntroductionFormPopup({setIsPopup}){
 
return(
  <div className={styles.container} onClick={()=>(setIsPopup(false))}>
    <div className={styles.popup} onClick={(event)=>{event.stopPropagation()}}>
      <RegisterForm close={()=>setIsPopup(false)}/>
    </div>      
  </div>
)


}