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
    console.log(verifiedUser);
    if (verifiedUser.email) {
      setUser(verifiedUser);
    } else {
      setUser("");
    }
  if (localStorage.lastEvent) {
    nav("/viewEvent/"+localStorage.lastEvent)
  }
  else{
    nav("../");
  }
  };
  useEffect(() => {
    localStorage.setItem("Token", params.get("token"));
    go();
  }, []);
  return <div>GoogleRegister</div>;
}
