import React, { useContext, useState } from 'react'
import headerContext from '../../context/headerContext';
import styles from "./style.module.css";
import Input from '../../components/Input'
import ToggleSwitch from '../../components/ToggleSwitch';
import ClassicButton from '../../components/ClassicButton copy';
import { FaSignInAlt } from 'react-icons/fa'
import { FiUserPlus } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { setToken } from '../../function/token'
import axios from 'axios';
import userContext from '../../context/userContext';
import apiCalls from '../../function/apiCalls';

// creator: Yisrael Olonoff
// login page

function Login() {
  const { user, setUser } = useContext(userContext);
  const { setHeader } = useContext(headerContext)
  setHeader('login')

  const [checked, setChecked] = useState(true);
  const [userInfo, setUserInfo] = useState({})

  const navigate = useNavigate();

  const navToRegistretionPage = () => {
    navigate("/registeretion");
  };

  const navToForgetPassword = () => {
    navigate('/forgetPassword');
  };

  const loginAouth = async (e) => {
    e.preventDefault();
    const res = await apiCalls("post", "user/login",
      {
        email: userInfo.email,
        password: userInfo.password,
      })
      console.log(res);
    if (res.token) {
      setUser(res.user)
      setToken(res.token)
      localStorage.setItem('Token', res.token)
      console.log('token set');
      navigate("/");
    }
    else {
      console.log(res);
      alert('אימייל/סיסמא לא נכונים')
    };
  }


const handleChange = (e) => {
  const { name, value } = e.target;
  setUserInfo({ ...userInfo, [name]: value });
};

const handleToggleSwitch = (e) => {
  setChecked(!checked);
  console.log(checked);
}

const inputs = [
  {
    id: 1,
    name: "email",
    type: "email",
    placeholder: '📧 אימייל',
    required: true,
  },
  {
    id: 2,
    name: "password",
    type: "password",
    placeholder: "🗝️ סיסמא",
    required: true,
  },
];


return (
  // <div className={styles.main}>
    <div className={styles.container}>
      <h2 className={styles.connection}>התחברות</h2>
      <form className={styles.form} onSubmit={loginAouth} >
        {inputs.map((input) => {
          return (
            <div className={styles.connect}>
              <Input
                autoComplete='off'
                key={input.id}
                {...input}
                // width={'400px'}
                className={styles.inputs}
                onChange={handleChange}
              />
            </div>
          )
        })}
       <div className={styles.remember}>
       <ToggleSwitch
            text={'זכור אותי'}
            checked={checked}
            onChange={handleToggleSwitch}
          />
       </div>

        <div className={styles.firstButton}>
          <ClassicButton
            width={'86%'}
            type={'submit'}
            onClick={loginAouth}
          >
            <FaSignInAlt className={styles.icon} /> התחברות
          </ClassicButton>
        </div>
      </form>

<div className={styles.question} >
      <div className={styles.forgotPassword} onClick={navToForgetPassword}>?שכחת סיסמא  </div>

        <div className={styles.register}>
         <div> עדיין אין לך חשבון?<span onClick={navToRegistretionPage} className={styles.clickHere}>לחץ כאן</span></div>
         </div>
         </div>
         </div>
        // </div>
)
}
export default Login