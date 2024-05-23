import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Pubg from "./pages/Pubg";

function App() {
  return (
    <div className="App bg-gray-800">
      <Router>
        <Navbar />
   

        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/games/:id" element={<Pubg />} />
          {/* <Route path="/pubg" element={<Pubg />} />
          <Route path="/telegram" /> 
          <Route path="/mobilelegends" />
          <Route path="/ffire" />
          <Route path="/statemobile" />
          <Route path="/standoff" />
          <Route path="/arena" />
          <Route path="/asphalt" />
          <Route path="/dragracing" />
          <Route path="/bigo" />
          <Route path="/brawlstars" />
          <Route path="/genshin" />
          <Route path="/callofduty" /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
