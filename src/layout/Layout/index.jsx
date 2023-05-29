import ForgetPassword from "../../components/ForgetPassword";
import GuestPopup from "../../components/GuestPopup";
import fakeDataContext from "../../context/fakeDataContext";
import headerContext from "../../context/headerContext";
import userContext from "../../context/userContext";
import popUpContext from "../../context/popUpContext";
import axios from "axios";
import Header from "../Header";
import Main from "../Main";
import { createContext, useEffect, useState } from "react";
import apiCalls from "../../function/apiCalls";
import { useLocation } from "react-router-dom";
import NewEventPopup from "../../components/NewEventPopup";

export const settingsContext = createContext();

function Layout() {
  const [user, setUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [guestMode, setGuestMode] = useState(false);
  const [saveEventMode, setSaveEventMode] = useState(false);
  const [popUpText, setPopUpText] = useState("");
  const location = useLocation();

  const [fakeData, setFakeData] = useState("bla bla");
  const [header, setHeader] = useState("home");
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [audiences, setAudiences] = useState([]);

  async function fetchData() {
    let apiCategories, apiAudiences;
    try {
      apiCategories = await apiCalls("get", "/setting/categories");
      apiAudiences = await apiCalls("get", "/setting/audiences");
    } catch (e) {
      console.log();
    }

    setAudiences(
      apiAudiences[0].settingData.map((v) => ({
        ...v,
        isActive: false,
      }))
    );
    setCategories(
      apiCategories[0].settingData.map((v) => ({
        ...v,
        isActive: false,
      }))
    );
  }
  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     if (
  //       !user &&
  //       (location.pathname == "/searchEvent" ||
  //         location.pathname.startsWith("/viewEvent"))
  //     ) 
  //     {
  //       setGuestMode(true);
  //       setPopUpText("עדיין לא יצא לנו להכיר😊");
  //       setPopUp(true);
  //     }
  //   }, 5000);

  //   return () => clearInterval(intervalId);
  // }, [user, location.pathname]);

  return (
    <>
      <userContext.Provider value={{ user, setUser, isAdmin, setIsAdmin }}>
        <popUpContext.Provider value={{ setPopUp, setGuestMode, setPopUpText,setSaveEventMode }}>
          <headerContext.Provider
            value={{ header, setHeader, search, setSearch }}
          >
            <settingsContext.Provider value={{ categories, audiences }}>
              <Header />
              <fakeDataContext.Provider value={{ fakeData }}>
                <Main />
                {popUp &&
            <GuestPopup text={popUpText} guestMode={guestMode} saveEventMode={saveEventMode}/> 
          }


              </fakeDataContext.Provider>
            </settingsContext.Provider>
          </headerContext.Provider>
        </popUpContext.Provider>
      </userContext.Provider>
    </>
  );
}

export default Layout;
