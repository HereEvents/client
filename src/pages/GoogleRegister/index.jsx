import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiCalls from "../../function/apiCalls";
import userContext from "../../context/userContext";

export default function GoogleRegister() {
  const { user, setUser } = useContext(userContext);
  const nav = useNavigate();
  let search = window.location.search;
  let params = new URLSearchParams(search);
  const go = async () => {
    const verifiedUser = await apiCalls("post", "/user/verify", {
      aoutherizetion: params.get("token"),
    });
    if (verifiedUser.email) {
      setUser(verifiedUser);
    } else {
      setUser("");
    }
  if (localStorage.lastRoute==="/login"){
    nav("/" , { replace: true })
    localStorage.removeItem('lastRoute')
  }
  else if (localStorage.lastRoute) {
    nav(localStorage.lastRoute,{ replace: true })
  }
  else{
    nav("../",{ replace: true });
  }
  };
  useEffect(() => {
    localStorage.setItem("Token", params.get("token"));
    go();
  }, []);
  return <div>GoogleRegister</div>;
}
