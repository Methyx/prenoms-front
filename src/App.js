import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// pages
import Header from "./pages/Header";
import Home from "./pages/Home";
import History from "./pages/History";

// style
import "./App.css";

function App() {
  // Use STATES
  const [firstname, setFirstname] = useState("");
  const [gender, setGender] = useState("");
  const [years, setYears] = useState("2020");
  const [dptSelected, setDptSelected] = useState(null);

  // ---------
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setFirstname={setFirstname}
              gender={gender}
              setGender={setGender}
              years={years}
              setYears={setYears}
              dptSelected={dptSelected}
              setDptSelected={setDptSelected}
            />
          }
        />
        <Route
          path="/history"
          element={
            <History
              firstname={firstname}
              setFirstname={setFirstname}
              gender={gender}
              setGender={setGender}
              dptSelected={dptSelected}
              setDptSelected={setDptSelected}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
