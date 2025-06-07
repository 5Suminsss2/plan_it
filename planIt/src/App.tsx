import "./css/Calendar.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProgressCalendar from "./pages/ProgressCalendar";
import SharedPlan from "./pages/SharedPlan";
import SharedPlanDetail from "./pages/SharedPlanDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/progressCalendar" element={<ProgressCalendar />} />
        <Route path="/sharedPlan" element={<SharedPlan />} />
        <Route path="/sharedPlan/:id" element={<SharedPlanDetail />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
