import React, { useState } from 'react'
import styles from './style.module.css'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import headerContext from '../../context/headerContext'
import Input from '../../components/Input'
import ClassicButton from '../../components/ClassicButton copy'
import { IoIosCreate } from 'react-icons/io'
import axios from 'axios'
import { error } from 'jquery'
import apiCalls from '../../function/apiCalls'

function Registeretion() {
  const { setHeader } = useContext(headerContext)
  setHeader('דף הרשמה')

  const [userData, setUserData] = useState({})

  const navigate = useNavigate();

  const inputs = [
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeholder: `🙍🏽‍♂️ שם מלא`,
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "🗝️ הגדר סיסמא",
      required: true,
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "password",
      placeholder: "🗝️ אמת סיסמא",
      required: true,
    },
    {
      id: 4,
      name: "email",
      type: "email",
      placeholder: '📧 כתובת אימייל',
      required: true,
    },
  ];

  const createUser = async (e) => {
    e.preventDefault();
    if (userData.password === userData.confirmPassword) {
      const { confirmPassword, ...data } = userData;
      console.log(data);
      try{
      const res = await apiCalls("post", "user/creatUser", data)
      console.log(`im regular log: ${res.status}`);
      if (res.status === "success") {
        console.log('user saved succesfuly!');
        navigate('/login')
      } else if (res.status !== "success") {
        console.log('error');
      } }
       catch (error) {
        console.log(error);
        alert('אימייל בשימוש')
      };
    } else alert('ססמאות לא תואמות')
  }

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };


  return (
    <div className={styles.main}>
      <form className={styles.formArea} onSubmit={createUser} autoComplete="off">
        <div>
          {inputs.map((input) => {
            return (
              <div className={styles.feild}>
                <Input
                  key={input.id}
                  {...input}
                  width={'300px'}
                  className={styles.inputs}
                  onChange={handleChange}
                />
              </div>
            )
          })}
        </div>
        <ClassicButton
          width={'70%'}
          type={'submit'}
        >
          <IoIosCreate className={styles.icon} /> צור משתמש
        </ClassicButton>

      </form>
    </div>
  )
}

export default Registeretion