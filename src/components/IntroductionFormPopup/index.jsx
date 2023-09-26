import styles from "./style.module.css";
import RegisterForm from "../RegisterForm";

export default function IntroductionFormPopup({setIsPopup,route}){
 
return(
  <div className={styles.container} onClick={()=>(setIsPopup(false))}>
    <div className={styles.popup} onClick={(event)=>{event.stopPropagation()}}>
      <RegisterForm route={route} close={()=>setIsPopup(false)}/>
    </div>      
  </div>
)


}