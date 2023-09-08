import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.js";
import Expore from "./components/Explore/Expore";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
      <Routes>
        <Route path="/listings" element={<Expore />} />
      </Routes>
    </div>
  );
}

export default App;
