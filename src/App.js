import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Codes from "./Components/Codes/Codes";
import Auth from "./Firebase/Auth";
import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<SignUpPage/>}/>
        <Route path="/codes" element={<Codes/>}/>
      </Routes>
    </Router>
  );
}