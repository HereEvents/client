import { useContext, useState, useEffect } from "react";
import headerContext from "../../context/headerContext";
import {
  allAreas,
  areaAndAllLocations,
  areaLocations,
  translation,
} from "./translation";
import style from "./style.module.css";
import ClassicButton from "../../components/ClassicButton copy";
import RoundButton from "../../components/RoundButton";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { settingsContext } from "../../layout/Layout";
import Select from "../../components/Select";
import MultiSelect from "../../components/MultiSelect";

// Yair Ken
// I tried to make the date buttons relatively generic, so to add them to this component, you only need to add them to the array and show

export default function SearchEvent({ setSearch }) {
  const textShow = translation;
  const arrBtnDates = ["allDate", "today", "tomorrow", "thisWeek"];
  const DefaultBtnDate = !sessionStorage.getItem("date to search")
    ? "allDate"
    : sessionStorage.getItem("date to search");
  console.log(DefaultBtnDate);
  const DefaultBtnDateObject = setDefaultBtnDateObject(
    arrBtnDates,
    DefaultBtnDate
  );
  const arrayLocations = areaAndAllLocations;

  const placeData = arrayLocations.map((i) => {
    return { value: i, label: i };
  });

  const [btnDates, setBtnDates] = useState(DefaultBtnDateObject);

  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState([]);
  const [audiences, setAudiences] = useState([]);
  const [location, setLocation] = useState("");

  // const [selectRequired, setSelectRequired] = useState(false);

  const settingContext = useContext(settingsContext);
  const { setHeader } = useContext(headerContext);

  const navigate = useNavigate();

  setHeader(textShow.advencedSearch);

  function setDefaultBtnDateObject(arrBtnDates, DefaultBtnDate) {
    const Object = {};
    arrBtnDates.forEach((btn) => {
      Object[btn] = btn === DefaultBtnDate;
    });
    return Object;
  }

  function clickAudience(e) {
    setAudiences((prev) =>
      prev.map((v, i) =>
        i == e.target.id ? { ...v, isActive: !v.isActive } : v
      )
    );
  }

  function clickCategory(e) {
    setCategories((prev) =>
      prev.map((v, i) =>
        i == e.target.id
          ? (console.log(e.target), { ...v, isActive: !v.isActive })
          : v
      )
    );
  }

  function clickDateBtn(e) {
    setBtnDates((prev) => {
      let newBtnDates = { ...prev };
      Object.keys(prev).forEach((v) => (newBtnDates[v] = false));
      newBtnDates[e.target.name] = true;
      sessionStorage.setItem("date to search", e.target.name);
      return newBtnDates;
    });
  }

  useEffect(() => {
    if (settingContext.categories && settingContext.audiences) {
      setAudiences(settingContext.audiences);
      setCategories(settingContext.categories);
      setLoading(() => false);
    }
  }, [settingContext.audiences, settingContext.categories]);

  function handleSubmit() {
    let categoriesUpdate = createListIdSettingIsTrue(categories);
    let audiencesUpdate = createListIdSettingIsTrue(audiences);

    let locationUpdate = location.undefined;
    //  if (location===textShow.choseLocation) {
    //   locationUpdate = ""
    //  }
    if (allAreas.includes(locationUpdate)) {
      locationUpdate = areaLocations[locationUpdate];
    }

    let btnDatesUpdate;
    for (const key in btnDates) {
      if (btnDates[key]) {
        btnDatesUpdate = key;
        break;
      }
    }

    // console.log(categoriesUpdate,"categoriesUpdate");
    // console.log(audiencesUpdate,"audiencesUpdate");
    // console.log(locationUpdate, "locationUpdate");
    // console.log(btnDatesUpdate,"btnDatesUpdate");

    setSearch({
      categories: categoriesUpdate,
      audiences: audiencesUpdate,
      location: locationUpdate,
      btnDates: btnDatesUpdate,
    });

    navigate("/searchEvent/result");

    function createListIdSettingIsTrue(array) {
      let arrayUpdate = [];
      array.forEach((v) => {
        if (v.isActive) {
          arrayUpdate.push(v._id);
        }
      });
      return arrayUpdate;
    }
  }

  return (
    <div>
      {/* {console.log(categories)}
      {console.log(audiences)}
      {console.log(location.undefined)}
      {console.log(btnDates)} */}

      <div className={style.content}>
        <div className={style.section}>
          <span className={style.title}>{textShow.category}</span>
          <div className={style.categories}>
            {!loading ? (
              categories.map((category, i) => (
                <RoundButton
                  text={textShow[category.name]}
                  icon={category.icon}
                  func={clickCategory}
                  id={i}
                  isActive={category.isActive}
                />
              ))
            ) : (
              <Loader />
            )}
          </div>
        </div>

        <div className={style.section}>
          <span className={style.title}>{textShow.audience}</span>
          <div className={style.audiences}>
            {!loading ? (
              audiences.map((audience, i) => (
                <RoundButton
                  text={textShow[audience.name]}
                  icon={audience.icon}
                  id={i}
                  func={clickAudience}
                  isActive={audience.isActive}
                />
              ))
            ) : (
              <Loader />
            )}
          </div>
        </div>

        <div className={style.section}>
          <span className={style.title}>{textShow.location}</span>
          <div className={style.location}>
            {
              <MultiSelect
                options={placeData}
                name={"placeToSearch"}
                placeholder={textShow.choseLocation}
                // func={setLocation}
                // style={{width:"95%"}}
                // icon="https://cdn-icons-png.flaticon.com/512/2838/2838912.png"
                selectRequired={true}
                setSelectRequired={() => {}}
                values={location}
                saveToSession={"placeToSearch"}
                setValues={setLocation}
              />
            }
          </div>
        </div>

        <div className={style.section}>
          <span className={style.title}>{textShow.date}</span>
          <div className={style.dateBtnSelection}>
            <div className={style.allDateButton}>
              <ClassicButton
                width={"35%"}
                text={textShow.allDate}
                isActive={btnDates.allDate}
                name="allDate"
                key="allDate"
                func={clickDateBtn}
                border={"solid 1px #CCCCCC"}
                oppositeColor
              />
            </div>
            <div className={style.otherButtons}>
              <ClassicButton
                width={"23%"}
                text={textShow[arrBtnDates[1]]}
                isActive={btnDates[arrBtnDates[1]]}
                name={arrBtnDates[1]}
                key={arrBtnDates[1]}
                func={clickDateBtn}
                border={"solid 1px #CCCCCC"}
                oppositeColor
              />
              <ClassicButton
                width={"35%"}
                text={textShow[arrBtnDates[2]]}
                isActive={btnDates[arrBtnDates[2]]}
                name={arrBtnDates[2]}
                key={arrBtnDates[2]}
                func={clickDateBtn}
                border={"solid 1px #CCCCCC"}
                oppositeColor
              />
              <ClassicButton
                width={"35%"}
                text={textShow[arrBtnDates[3]]}
                isActive={btnDates[arrBtnDates[3]]}
                name={arrBtnDates[3]}
                key={arrBtnDates[3]}
                func={clickDateBtn}
                border={"solid 1px #CCCCCC"}
                oppositeColor
              />
            </div>
          </div>
        </div>

        <div className={style.footerBtn}>
          <ClassicButton
            width="100%"
            height={50}
            text={textShow.search}
            func={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
