import { useEffect, useState } from "react";
import Input from "../components/Input";
import NewEvent from "../pages/NewEvent";
import $ from "jquery";

export default function Kobi() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await $.ajax({
        url: "https://data.gov.il/api/3/action/datastore_search",
        data: {
          resource_id: "5c78e9fa-c2e2-4771-93ff-7f400a12f7ba",
          limit: 5, // get 5 results
          q: "jones", // query for 'jones'
        },
        dataType: "jsonp",
      });

      setData(response.result.records);
      console.log(data);
    };

    fetchData();
  }, []);
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
  return (
    <>
      <NewEvent />
    </>
  );
}
