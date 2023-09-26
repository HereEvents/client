import { useState,useContext } from "react";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import headerContext from "../../context/headerContext";
import Input from "../../components/Input";
import ClassicButton from "../../components/ClassicButton copy";
import { IoIosCreate } from "react-icons/io";
import apiCalls from "../../function/apiCalls";
import { setToken } from "../../function/token";
import userContext from "../../context/userContext";
import RegisterForm from "../../components/RegisterForm";

function Registeretion() {

  const { setHeader } = useContext(headerContext);
  setHeader("דף הרשמה");

  const navigate = useNavigate();

  return (
<RegisterForm close={()=>navigate("/",{ replace: true })} route="/registeretion"/>
  );
}

export default Registeretion;
