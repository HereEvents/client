import { BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import MainTest from "./test/MainTest";
import "./app.css";
import { Helmet } from "react-helmet";
import ReactGA from "react-ga4";

const TRACKING_ID = "G-0KR78SJP2Q";
ReactGA.initialize(TRACKING_ID);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Helmet>
          <title>KorePo</title>
          {/* <link rel="icon" href="../public/favicon.ico" /> */}
          <meta name="description" content="האירוע שלך נמצא כאן KorePo" />
          <meta
            name="keywords"
            content="אירועים בבנימין,הופעות בבנימין,בנימין,אירועים"
          />
        </Helmet>
        <Layout />
        {/* <MainTest /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
