import React, { useContext } from "react";
import styles from "./style.module.css";
import ClassicButton from "../../components/ClassicButton copy";
import EventCard from "../../components/EventCard";
import { useNavigate } from "react-router-dom";
import headerContext from "../../context/headerContext";

// Creator: Yisrael_Olonoff
// i created the home page using the "Header", "EventCard",
// and the "ClassicButton" components.
// the button position is fixed to the same excect position
// on the page.

function Home() {
  const { setHeader } = useContext(headerContext);
  const navigate = useNavigate();
  const navToNewEvent = () => {
    navigate("/newEvent");
  };
  setHeader('home');
  return (
    <div className={styles.main}>
      <p>אירועים קרובים</p>
      <EventCard />
      <div className={styles.button}>
        <ClassicButton
          width={"200px"}
          text={"פרסם אירוע"}
          onClick={() => {
            navToNewEvent();
            setHeader("פרסם אירוע");
          }}
        />
      </div>
    </div>
  );
}

export default Home;
