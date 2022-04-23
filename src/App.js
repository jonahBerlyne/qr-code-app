import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Codes from "./Components/Codes/Codes";
import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import AppRoute from "./Routes/AppRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<SignUpPage/>}/>
        <Route path="/home" element={<AppRoute><HomePage/></AppRoute>}/>
        <Route path="/codes" element={<AppRoute><Codes/></AppRoute>}/>
      </Routes>
    </Router>
  );
}