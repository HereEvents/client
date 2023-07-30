const translation = {
  advencedSearch: "חיפוש מתקדם",
  category: "קטגוריה",
  audience: "קהל יעד",
  location: "מיקום",
  choseLocation: "בחר מיקום",
  date: "תאריך",
  allDate: "כל התאריכים",
  today: "היום",
  tomorrow: "מחר",
  thisWeek: "השבוע",
  selectDate: "בחר תאריך ביומן",
  search: "חפש",
  back: "חזרה",
  fun: "כיף",
  women: "נשים",
  family: "משפחה",
  adults: "מבוגרים",
  teenagers: "נוער",
  kids: "ילדים",
  lectures: "הרצאות",
  food: "אוכל",
  "local art craft": "יצירה מקומית",
  music: "מוזיקה",
};

const areaLocations = {
  "גוש אדומים": ["כפר אדומים", "מצפה יריחו", "אלון", "נופי פרת"],
  "גוש טלמונים": ["טלמון", "נריה", "כרם רעים", "חרשה", "דולב", "נחליאל"],
  "גוש שילה": [
    "שילה",
    "שבות רחל",
    "אש קודש",
    "קידה",
    "עדי עד",
    "גבעת הראל",
    "גבעת הרואה",
    "שילה הקדומה- תל שילה",
    "חוות מלאכי השלום"
  ],
};

const locationsAreaLess = [
  "עלמון",
  "מצפה חגית",
  "עמיחי",
  "עטרת",
  "בית חורון",
  "עלי",
  "גני מודיעין",
  "אדם- גבע בנימין",
  "גבעון החדשה",
  "חשמונאים",
  "כפר האורנים",
  "כוכב השחר",
  "כוכב יעקב",
  "מעלה לבונה",
  "מעלה מכמש",
  "מתתיהו",
  "מבוא חורון",
  "נעלה",
  "נוה צוף",
  `ניל"י`,
  "סנה-בני אדם",
  "עופרה",
  "פסגות",
  "רימונים",
  "שער בנימין",
  "בית אל",
];

const locations = Object.values(areaLocations)
  .reduce((acc, location) => {
    return acc.concat(location);
  }, locationsAreaLess)
  .sort();

const allAreas = Object.keys(areaLocations).sort();

const areaAndAllLocations = allAreas.concat(locations);

export { allAreas, locations, areaAndAllLocations, areaLocations, translation };
