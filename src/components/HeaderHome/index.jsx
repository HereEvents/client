import React, { useState, useContext } from "react";
import styles from "./style.module.css";
import { CgPlayListSearch } from "react-icons/cg";
import Logo from "../../components/Logo";
import { TbListSearch } from "react-icons/tb";
import { BiAnalyse } from "react-icons/bi";
import { GoSettings, GoSearch } from "react-icons/go";
import { BsDot, BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import headerContext from "../../context/headerContext";

function HeaderHome({ page, isValid, setIsValid }) {
  const navigate = useNavigate();
  // const [headerHeight, setHeaderHeight] = useState(18)
  const { search, setSearch } = useContext(headerContext);
  // const [showInput, setShowInput] = useState(true);
  // const [showSettings, setShowSettings] = useState(false);
  // const [wordsearch, setWordsearch] = useState("")

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  //     if (scrollTop > 0 && headerHeight === 18) {
  //       setHeaderHeight(16)
  //     } else if (scrollTop === 0 && headerHeight === 16) {
  //       setHeaderHeight(18)
  //     }
  //   }
  //   window.addEventListener('scroll', handleScroll)
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll)
  //   }
  // }, [headerHeight])

  return (
    <div className={styles.main}>
      <div className={styles.headerHome_container}>
        <div className={styles.logo_container}>
          <img src={"/KorePo.svg"} alt="" className={styles.logo} />
          <div
            onClick={() => {
              setSearch("");
            }}
          ></div>
        </div>
        <div className={styles.options}>
          <label className={styles.searchContainer}>
            <span>
              <GoSearch className={styles.iconSearch} />{" "}
            </span>
            <input
              dir="rtl"
              placeholder=" אירועים בסביבה שלך..."
              className={styles.visibleInput}
              type="search"
              defaultValue={search}
              onChange={(e) => {
                e.target.value.length >= 3
                  ? setSearch(e.target.value)
                  : setSearch("");
              }}
            />
          </label>
          <span
            className={styles.advanceContainer}
            onClick={() => {
              navigate("/searchEvent");
            }}
          >
            {" "}
            <GoSettings className={styles.icon} />
          </span>
        </div>
        <Link
          className={styles.declaimer}
          to={`https://wa.me/+972525666679?text=היי לגבי האפליקציה KorePo רציתי להגיד ש`}
        >
          <img
            src={"/uil_comment-message.svg"}
            alt=""
            className={styles.iconDeclaimer}
          />
          <span className={styles.declaimertext}>
            אנחנו בהרצה! נשמח לקבל ממך פידבק
          </span>
        </Link>
      </div>
    </div>

    //the header before the design.
    // <div className={styles.main} style={{ height: `${headerHeight}vh` }}>
    //    <div className={styles.headerHome_container} >
    //     <div className={styles.titleContainer}>
    //       <div className={styles.titleBox}>
    //        <h1 className={styles.title}> HereEvent </h1>
    //        <BiAnalyse className={styles.logo}/>
    //        </div >
    //        <span className={styles.searchContainer}>
    //         <input
    //         dir='rtl'
    //         placeholder='חפש...'
    //         // className={showInput? styles.visibleInput : styles.hiddenInput}
    //         className={styles.visibleInput}
    //         type="search"
    //         defaultValue={search}
    //         onChange={(e)=>setSearch(e.target.value)}/>
    //       </span>
    //     </div>
    //     <div className={styles.options}>
    //       <span>
    //        <BsThreeDotsVertical className={styles.icon}/>
    //       </span>
    //       <span
    //       className={styles.advanceContainer} onClick={() =>{navigate("/searchEvent")}}>
    //       <TbListSearch className={styles.icon}/>
    //       </span>
    //       <span>
    //       <FiSearch className={styles.icon} onClick={()=> setShowInput(!showInput)}/>
    //       </span>
    //       </div>
    //       </div>
    //       </div>
  );
}

export default HeaderHome;
