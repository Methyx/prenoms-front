import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import Header from "./pages/Header";
import Home from "./pages/Home";
import History from "./pages/History";

// style
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
