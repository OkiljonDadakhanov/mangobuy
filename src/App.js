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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
