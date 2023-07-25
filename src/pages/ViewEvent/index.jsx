import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./style.module.css";
import ClassicButton from "../../components/ClassicButton copy";
import headerContext from "../../context/headerContext";
import { MdOutlinePlace } from "react-icons/md";
import { TbTicket } from "react-icons/tb";
import apiCalls from "../../function/apiCalls";
import translation from "./translation.js";
import { FaRegCalendarAlt, FaWhatsapp } from "react-icons/fa";
import { AiOutlineClockCircle, AiOutlineHome } from "react-icons/ai";
import { MdOpenInNew } from "react-icons/md";
import { BiMoney } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import FavouriteMark from "../../components/FavouriteMark";
import userContext from "../../context/userContext";
import { Link } from "react-router-dom";
import DateDisplay from "../../components/DateDisplay";
import Loader from "../../components/Loader";
import { Helmet } from "react-helmet";

// Creator: Naama Orlan
//This page view the details of a specific event.

export default function ViewEvent() {
  const audienceMapping = {
    "64118b289057ecc057ef8a38": "נשים",
    "64118b289057ecc057ef8a39": "משפחות",
    "64118b289057ecc057ef8a3a": "מבוגרים",
    "64118b289057ecc057ef8a3b": "נוער",
    "64118b289057ecc057ef8a3c": "ילדים",
  };

  const categoryMapping = {
    "641189cf3d762f6a181064c7": "כיף",
    "641189cf3d762f6a181064c8": "הרצאות",
    "641189cf3d762f6a181064c9": "אוכל",
    "641189cf3d762f6a181064ca": "יצירה מקומית",
    "641189cf3d762f6a181064cb": "מוזיקה",
  };

  const { user } = useContext(userContext);
  const { isAdmin, setIsAdmin } = useContext(userContext);
  const { setHeader } = useContext(headerContext);
  setHeader("פרטי האירוע");

  // In the routing there is a param called event which contains the event id.
  // I collect the eventID from the event param and then I call the server to give me the whole event's data.
  const navigate = useNavigate();
  const { event } = useParams();

  //Two states. One for the data itself, the other is for the loading.

  const [loading, setLoading] = useState(true);
  const [eventData, setEventData] = useState();
  const [isActive, setIsActive] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  async function fetchEvent() {
    try {
      let apiData = await apiCalls("get", "/event/" + event);
      if (user.userType === "admin") {
        checkUserType();
        if (apiData.status === "published") {
          setIsPublished(true);
          setIsActive(true);
        }
      }
      if (new Date(apiData.date[apiData.date.length - 1]) > new Date()) {
        const futureDates = apiData.date.filter(
          (date) => new Date(date) >= new Date()
        );
        apiData.date = futureDates.slice(0, 1);
      }
      setEventData(apiData);

      console.log(apiData);
    } catch (error) {
      console.log("error - url no be");
      setLoading(() => "error");
    }
  }

  async function checkUserType() {
    const token = localStorage.getItem("Token");
    let apiData = await apiCalls("post", "user/checkUserType", {
      aoutherizetion: token,
    });
    if (apiData) {
      setIsAdmin(apiData.userType);
    }
  }

  useEffect(() => {
    fetchEvent();
  }, [user.userType, setIsAdmin]);

  useEffect(() => {
    if (eventData) {
      setLoading(() => false);
    }
  }, [eventData]);

  // function getDateStatus(date) {
  //   const currentDate = new Date();
  //   const eventDate = new Date(date);

  //   if (eventDate < currentDate) {
  //     return "past";
  //   } else if (eventDate.getDate() === currentDate.getDate() &&
  //     eventDate.getMonth() === currentDate.getMonth() &&
  //     eventDate.getFullYear() === currentDate.getFullYear()) {
  //     return "present";
  //   } else {
  //     return "future";
  //   }
  // }

  const handleButtonToggle = () => {
    if (!isPublished) {
      setIsActive(!isActive);
      if (!isActive) {
        handlePublish();
      }
    }
  };

  const handlePublish = async () => {
    try {
      const updatedData = await apiCalls("put", `/event/${event}`, {
        status: "published",
        publishedAt: Date.now(),
      });
      console.log(updatedData);
      setIsPublished(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading == "error" ? (setHeader("login")||<div className={style.notBe}>
        <span>האירוע שחיפשת לא קיים יותר במערכת</span>
        <div className={style.homeButton}>
                    <ClassicButton
                      width={"100%"}
                      height={"50px"}
                      type={"submit"}
                      onClick={() => navigate("/")}
                      // onClick={loginAouth}
                    >
                      <AiOutlineHome className={style.icon} />לדף הבית
                    </ClassicButton>
                  </div>
      </div>) : loading ? (
        <Loader />
      ) : (
        <div
          className={style.container}
          onClick={() => console.log("registrationPageURL", eventData)}
        >
          <Helmet>
            <title>{eventData.eventName}</title>
            <link rel="icon" href={eventData.cardImageURL} />
            <meta name="description" content={eventData.summary} />
            <meta
              name="keywords"
              content="אירועים בבנימין,הופעות בבנימין,בנימין,אירועים"
            />
            <meta name="keywords" content={eventData.eventName} />
            <meta name="keywords" content={eventData.place} />
          </Helmet>{" "}
          <div className={style.innercontainer}>
            <div>
              <img
                src={eventData.coverImageURL}
                className={style.coverImage}
                alt="cover-img"
              />
            </div>
            <div className={style.containerSecond}>
              <div className={style.content}>
                <div className={style.section}>
                  <h1 className={style.heading}>{eventData.eventName}</h1>

                  <div className={style.favourite}>
                    <FavouriteMark />
                  </div>
                </div>
                <div className={style.main}>
                  <div className={style.section}>
                    <div className={style.dataSection}>
                      <div className={style.reactIcon}>
                        <FaRegCalendarAlt />
                      </div>
                      <div className={style.dates}>
                        {eventData.date.map((date, index) => {
                          const formattedDate = new Date(
                            date
                          ).toLocaleDateString("he-IL", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            timeZone: "UTC",
                            numberingSystem: "latn",
                          });
                          const dateObj = {
                            formattedDate,
                            weekday: formattedDate.split(",")[0],
                          };
                          return (
                            <div key={index} className={style.date}>
                              {eventData.isReapeated &&
                              eventData.repeatType == "weekly" ? (
                                `${formattedDate} (כל  ${dateObj.weekday})`
                              ) : eventData.isReapeated &&
                                eventData.repeatType == "daily" ? (
                                `${formattedDate} (כל יום)`
                              ) : eventData.isReapeated &&
                                eventData.repeatType == "customized" ? (
                                // formattedDate+" " +
                                <DateDisplay
                                  returnType={eventData.repeatType}
                                  values={eventData}
                                  startDate={formattedDate}
                                  viewEvent={true}
                                />
                              ) : (
                                formattedDate
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className={style.section}>
                    <div className={style.dataSection}>
                      <div className={style.reactIcon}>
                        <AiOutlineClockCircle />
                      </div>
                      <div className={style.hourOfEvent}>
                        {eventData.finishTime}- {eventData.beginningTime}
                      </div>
                    </div>
                  </div>

                  <div className={style.section}>
                    <div className={style.dataSection}>
                      <div className={style.reactIcon}>
                        <MdOutlinePlace />
                      </div>

                      <div className={style.placeOfEvent}>
                        {" "}
                        {eventData.place} {"- "}
                        {eventData.accuratelocation}
                      </div>
                    </div>
                  </div>

                  <div className={style.section}>
                    <div className={style.dataSection}>
                      <div className={style.reactIcon}>
                        <BiMoney />
                      </div>
                      <div className={style.payment}>
                        {eventData.payment.isFree === true
                          ? "כניסה חופשית"
                          : "בתשלום"}
                      </div>
                    </div>
                  </div>

                  <div className={style.section}>
                    <div className={style.dataSection}>
                      <div className={style.reactIcon}>
                        <BsPeopleFill />
                      </div>
                      <div className={style.payment}>
                        {eventData.audiences.map((audience, index) => (
                          <span key={index}>
                            {audienceMapping[audience]}
                            {index !== eventData.audiences.length - 1 && ", "}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className={style.section}>
                    <div className={style.dataSection}>
                      <div className={style.reactIcon}>
                        <BiCategory />
                      </div>
                      <div className={style.payment}>
                        {eventData.categories.map((category, index) => (
                          <span key={index}>
                            {categoryMapping[category]}
                            {index !== eventData.categories.length - 1 && ", "}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={style.section}>
                  <div>
                    <p className={style.detailsTitle}>{translation.details}</p>
                    <p className={style.detailsContent}>
                      {" "}
                      {eventData.summary}
                    </p>{" "}
                  </div>
                </div>
                <div className={style.linkAndButton}>
                  {eventData && eventData.registrationPageURL ? (
                    <div>
                      <a
                        className={style.cards}
                        href={eventData.registrationPageURL}
                        target="_blank"
                      >
                        <span className="openIcon">
                          <MdOpenInNew />
                        </span>
                        לדף הרשמה וכרטיסים
                      </a>
                    </div>
                  ) : (
                    <Link
                      to={`https://wa.me/+972${eventData.advertiser.tel}?text=שלום, לגבי הארוע ${eventData.eventName} שפרסמת`}
                    >
                      <FaWhatsapp /> יצירת קשר עם המפרסם{" "}
                    </Link>
                  )}

                  <div className={style.homeButton}>
                    <ClassicButton
                      width={"100%"}
                      height={"50px"}
                      type={"submit"}
                      onClick={() => navigate("/")}
                      // onClick={loginAouth}
                    >
                      <AiOutlineHome className={style.icon} /> חזרה לדף הבית
                    </ClassicButton>
                  </div>
                </div>
              </div>
              {isAdmin === user.userType && eventData && (
                <div className={style.adminContainer}>
                  <div className={style.advertiserInfo}>
                    <h4>פרטי המפרסם:</h4>
                    <p>{eventData.advertiser.name}</p>
                    <p>{eventData.advertiser.email} </p>
                    <p>
                      {eventData.advertiser.tel}{" "}
                      <Link
                        to={`https://wa.me/+972${eventData.advertiser.tel}`}
                      >
                        <FaWhatsapp />
                      </Link>
                    </p>{" "}
                  </div>
                  <div className={style.publishButton}>
                    <button
                      className={`${
                        style.adminPublish
                          ? isActive
                            ? style.active
                            : style.adminPublish
                          : style.active
                      }`}
                      onClick={handleButtonToggle}
                      disabled={isPublished || isActive}
                    >
                      {isActive ? "פורסם בהצלחה 👍🏽" : "פרסם"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
