import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Codes from "./Components/Codes/Codes";
import Auth from "./Firebase/Auth";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth/>}/>
        <Route path="/codes" element={<Codes/>}/>
      </Routes>
    </Router>
  );
}