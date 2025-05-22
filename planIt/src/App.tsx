import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProgressCalendar from "./pages/ProgressCalendar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/progressCalendar" element={<ProgressCalendar />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
