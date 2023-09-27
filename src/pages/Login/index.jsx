import styles from "./style.module.css";
import { useState , useEffect , useContext } from "react";
import apiCalls from "../../function/apiCalls";
import { setToken } from "../../function/token";
import userContext from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import ClassicButton from "../../components/ClassicButton copy"
import Input from "../../components/Input";
import EnterGoogle from "../../components/EnterGoogle";


export default function RegisterForm() {
  
  const [isEmail,setIsEmail] = useState(false)

  const {setUser} = useContext(userContext)

  const navigate = useNavigate();

  async function createUser (e){
  e.preventDefault();
  try {
    const email = e.target[0].value
  if(email){
    const res = await apiCalls("post", "user/login", {email:email} )
    setUser(res.user);
    setToken(res.token);
    localStorage.setItem("Token", res.token);
  }
  else{
    console.log("no email");
  }
} catch (error) {
  console.log(error);
}
  navigate("/")
  }
    
  return (
    <form onSubmit={createUser} className={styles.form}>
    <div className={styles.title}><b>איזה כיף שחזרת!</b>
      <br /> <span className={styles.secondTitle}>בא תיכנס!</span>
    </div>
    <Input id="email"    type="email" name="email" placeholder="המייל שלך"  noLabelAndError={true} onChange={(e)=>(setIsEmail(e.target.value!==""&&e.target.checkValidity()))}/>
    <ClassicButton width="100%" text="מדהים, המשכנו!" type="submit" disabled={!(isEmail)}/>
    <EnterGoogle/>
    <div className={styles.login}>
            עוד לא רשום?
            <span onClick={()=>navigate("/registeretion")} className={styles.clickHere}>
              לחץ כאן
            </span>
    </div>
</form>

  )
}
