import React, { useContext, useEffect, useState } from "react";
import styles from "./style.module.css";
import ClassicButton from "../../components/ClassicButton copy";
import EventCard from "../../components/EventCard";
import { useNavigate } from "react-router-dom";
import headerContext from "../../context/headerContext";
import userContext from "../../context/userContext";
import popUpContext from "../../context/popUpContext";
import apiCalls from "../../function/apiCalls";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Helmet } from "react-helmet";

// Creator: Yisrael_Olonoff
// i created the home page using the "Header", "EventCard",
// and the "ClassicButton" components.
// the button position is fixed to the same exsect position
// on the page.
// כמות התוצאות שבכל עמוד בדף הבית- נקבע בשרת

function Home() {
  const [events, setEvents] = useState([]);
  const [nextPage, setNextPage] = useState(undefined);
  const [searchMode, setSearchMode] = useState("loading");

  const { search, setHeader } = useContext(headerContext);
  const { user, setUser } = useContext(userContext);
  const { setPopUp, setGuestMode, setPopUpText } = useContext(popUpContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetchEventsSearch();
  }, [search]);

  const navToNewEvent = () => {
    if (!user) {
      setPopUp(true);
      setGuestMode(false);
      setPopUpText("כדי שתוכל לפרסם אירוע, נהיה חייבים להכיר😊");
    } else {
      navigate("/newEvent");
    }
  };

  const navToNewNewEvent = () => {
    navigate("/newNewEvent");
  };

  setHeader("home");

  const logOut = () => {
    const confirmed = window.confirm("האם אתה בטוח שברצונך להתנתק ?");
    if (confirmed) {
      localStorage.removeItem("Token");
      setUser(false);
      navigate("/login");
    }
  };

  const fetchEventsNext = () => {
    setSearchMode("loading");
    apiCalls("post", "event", {
      page: nextPage,
      search: search,
    }).then((data) => {
      setEvents((currentEvent) => currentEvent.concat(data.event));
      setNextPage(data.nextPage);
      if (data.event.length === 0) setSearchMode("noResult");
      else {
        setSearchMode("isResult");
      }
    });
  };

  const fetchEventsSearch = () => {
    setSearchMode("loading");
    apiCalls("post", "event", {
      page: 1,
      search: search,
    }).then((data) => {
      setEvents(data.event);
      setNextPage(data.nextPage);
      if (data.event.length === 0) setSearchMode("noResult");
      else {
        setSearchMode("isResult");
      }
    });
  };

  return (
    <div className={styles.main}>
      <Helmet>
        <title>KorePo</title>
        <link rel="icon" href="../../../public/logo-hereHvent.ico" />
        <meta name="description" content="האירוע שלך נמצא כאן KorePo" />
        <meta
          name="keywords"
          content="אירועים בבנימין,הופעות בבנימין,בנימין,אירועים"
        />
      </Helmet>
      {/* <BiLogOutCircle className={styles.logOut} onClick={logOut} /> */}
      <div className={styles.eventsContainer}>
        <EventCard
          events={events}
          nextPage={nextPage}
          loadMore={fetchEventsNext}
          searchMode={searchMode}
        />
      </div>
      <div className={styles.button}>
        <ClassicButton
          width={"250px"}
          height={"50px"}
          onClick={() => {
            navToNewEvent();
          }}
        >
          <IoIosAddCircleOutline className={styles.icon} />
          פרסם אירוע
        </ClassicButton>
      </div>
      {/* <div className={styles.newButton}>
        <ClassicButton
          width={"250px"}
          height={"100%"}
          text={" פרסם אירוע חדש ➕"}
          onClick={() => {
            navToNewNewEvent();
          }}
        />
      </div> */}
    </div>
  );
}

export default Home;
