import {useContext, useEffect} from "react";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import "./App.css";
import Navbar from "./components/Navbar";
import {Context} from "./context/ContextProvider";
import HomeScreen from "./pages/HomeScreen";
import PaymentListScreen from "./pages/PaymentListScreen";
import ServicesScreen from "./pages/ServicesScreen";

function App() {
  const {setUUID} = useContext(Context);

  useEffect(() => {
    const storedUUID = JSON.parse(localStorage.getItem("uuid"));
    if (storedUUID) {
      setUUID(storedUUID);
    } else {
      const generatedUUID = uuidv4();
      setUUID(generatedUUID);
      localStorage.setItem("uuid", JSON.stringify(generatedUUID));
    }
  }, [setUUID]);

  return (
    <div className="App bg-gray-800">
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/games/:gameID" element={<ServicesScreen />} />
          <Route path="/history" element={<PaymentListScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
