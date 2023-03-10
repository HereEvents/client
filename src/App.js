import { BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import MainTest from "./test/MainTest";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout />
        <MainTest />
      </BrowserRouter>
    </div>
  );
}

export default App;
