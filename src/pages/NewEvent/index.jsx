import { useEffect, useState } from "react";
import ClassicButton from "../../components/ClassicButton copy";
import Input from "../../components/Input";
import Select from "../../components/Select";
import styles from "./style.module.css";
import headerContext from "../../context/headerContext";
import axios from "axios";
import apiCalls from "../../function/apiCalls";
import { useNavigate } from "react-router-dom";

export default function NewEvent({ style = {}, className = "", ...props }) {
  const nav = useNavigate();
  const dataloc = [
    "עלמון",
    "עמיחי",
    "עטרת",
    "בית חורון",
    "דולב",
    "עלי",
    "גני מודיעין",
    "גבע בנימין",
    "גבעון החדשה",
    "חשמונאים",
    "כפר אדומים",
    "כפר האורנים",
    "כוכב השחר",
    "כוכב יעקב",
    "מעלה לבונה",
    "מעלה מכמש",
    "מתתיהו",
    "מבוא חורון",
    "מצפה יריחו",
    "נעלה",
    "נחליאל",
    "נוה צוף",
    `ניל"י`,
    "עופרה",
    "פסגות",
    "רימונים",
    "שילה",
    "טלמון",
  ];
  const { setHeader, header } = headerContext;
  const [prevValues, setPrevValues] = useState([]);
  const [values, setValues] = useState({
    eventName: "",
    summary: "",
    advertiserName: "",
    advertiserTel: "",
    advertiserEmail: "",
    date: "",
    beginningTime: "",
    finishTime: "",
    place: "",
    category: "",
    targetAudience: "",
    registrationPageUrl: "",
    cardImageUrl: "",
    coverImageUrl: "",
    gallery: "",
    type: "",
    payment: "",
  });

  const inputs = [
    {
      id: 1,
      name: "eventName",
      type: "text",
      label: "שם האירוע",
      placeholder: "שם האירוע",
      required: true,
    },
    {
      id: 2,
      name: "summary",
      type: "text",
      label: "תקציר",
      placeholder: "תקציר",
      required: true,
    },
    {
      id: 3,
      name: "advertiserName",
      type: "text",
      label: "שם המפרסם",
      placeholder: "שם המפרסם",
      required: true,
    },
    {
      id: 4,
      name: "advertiserTel",
      type: "text",
      label: "טלפון",
      placeholder: "טלפון",
      required: true,
    },
    {
      id: 5,
      name: "advertiserEmail",
      type: "email",
      label: "מייל",
      placeholder: "מייל",
      required: true,
    },
    {
      id: 6,
      name: "date",
      type: "date",
      label: "תאריך האירוע",
      placeholder: "בחר תאריך ביומן",
      required: true,
    },
    {
      id: 7,
      name: "beginningTime",
      type: "time",
      label: "זמן התחלה",
      placeholder: "זמן התחלה",
    },
    {
      id: 8,
      name: "finishTime",
      type: "time",
      label: "זמן סיום",
      placeholder: "זמן סיום",
    },
    {
      id: 9,
      name: "place",
      type: "select",
      label: "מקום",
      placeholder: "בחר מיקום",
      required: true,
    },
    {
      id: 10,
      name: "category",
      type: "select",
      label: "קטגוריה",
      placeholder: "קטגוריה",
    },
    {
      id: 11,
      name: "targetAudience",
      type: "select",
      label: "קהל יעד",
      placeholder: "קהל יעד",
    },
    {
      id: 12,
      name: "registrationPageURL",
      type: "text",
      label: "דף הרשמה לאירוע",
      placeholder: "דף הרשמה לאירוע",
    },
    {
      id: 13,
      name: "cardImageURL",
      type: "file",
      type: "file",
      label: "תמונת אירוע",
      // required: true,
    },
    {
      id: 14,
      name: "coverImageURL",
      type: "file",
      type: "file",
      label: "תמונת כיסוי",
    },
    {
      id: 15,
      name: "gallery",
      type: "file",
      type: "file",
      label: "העלה תמונות לגלריה",
    },
    {
      id: 16,
      name: "type",
      type: "select",
      label: "תדירות",
      placeholder: "תדירות",
    },
    {
      id: 17,
      name: "payment",
      type: "select",
      label: "עלות",
      placeholder: "עלות",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in values) {
      if (Array.isArray(values[key])) {
        for (const file of values[key]) {
          formData.append(key, file);
        }
      } else {
        formData.append(key, values[key]);
      }
    }
    console.log(formData);
    axios.post("http://localhost:8080/event", formData).then(() => {
      window.location.reload(false);
    });

    const eventData = {
      eventName: values.eventName,
      summary: values.summary,
      advertiser: {
        name: values.advertiserName,
        tel: values.advertiserTel,
        email: values.advertiserEmail,
      },
      date: values.date,
      beginningTime: values.beginningTime,
      finishTime: values.finishTime,
      place: values.place,
      category: values.category,
      targetAudience: values.targetAudience,
      registrationPageUrl: values.registrationPageUrl,
      cardImageUrl: values.cardImageUrl,
      coverImageUrl: values.coverImageUrl,
      gallery: values.gallery,
      type: values.type,
      payment: values.payment,
    };
    console.log(eventData);
    apiCalls(
      "post",
      "http://localhost:5000/api/event/createvent",
      eventData
    ).then((res) => {
      if (res.status === 200) {
        nav("/");
      }
    });
  };

  const onChange = (e) => {
    if (e.target.type === "file") {
      const files = e.target.value;
      setValues({ ...values, [e.target.name]: files });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  //   const createEvent = () => {
  //     axios.post('http://localhost:3001/event', formData)
  //     .then(()=>{
  //         window.location.reload(false);
  //     })
  // }

  return (
    <div
      dir="RTL"
      className={`${styles.main} ${className}`}
      style={style}
      {...props}
    >
      <form
        onSubmit={handleSubmit}
        className={styles.form}
        enctype="multipart/form-data"
      >
        {inputs.map((input) => {
          if (input.type !== "select")
            return (
              <Input
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
                className={styles.inputs}
              />
            );
          else
            return (
              <Select
                placeholder={input.placeholder}
                value={values[input.name]}
                choossArray={dataloc}
              />
            );
        })}

        <div className={styles.button}>
          <ClassicButton width={"200px"} text={"Save"} type={"submit"} />
        </div>
      </form>
    </div>
  );
}
