import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CodesPage from "./Pages/CodesPage";
import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import AppRoute from "./Routes/AppRoute";
import AuthRoute from "./Routes/AuthRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthRoute><LoginPage/></AuthRoute>}/>
        <Route path="/register" element={<AuthRoute><SignUpPage/></AuthRoute>}/>
        <Route path="/" element={<AppRoute><HomePage/></AppRoute>}/>
        <Route path="/codes" element={<AppRoute><CodesPage/></AppRoute>}/>
      </Routes>
    </Router>
  );
}