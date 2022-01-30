import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Codes from "./Components/Codes/Codes";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/codes" element={<Codes/>}/>
      </Routes>
    </Router>
  );
}