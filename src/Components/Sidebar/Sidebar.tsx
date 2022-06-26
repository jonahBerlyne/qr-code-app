import React from 'react';
import "../../Styles/Sidebar.css";
import Icon from './Icon';
import { ContactPage, CalendarMonth, Email, CameraAlt, Search, Link, QrCodeScanner, Logout } from "@mui/icons-material";
import { useNavigate, useParams } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

interface Forms {
  showContactForm: () => void;
  showDateForm: () => void;
  showEmailForm: () => void;
  showImgForm: () => void;
  showTextForm: () => void;
  showUrlForm: () => void;
};

export default function Sidebar({ showContactForm, showDateForm, showEmailForm, showImgForm, showTextForm, showUrlForm }: Forms) {

 const navigate = useNavigate();

 const logOut = async (): Promise<any> => {
   try {
     await signOut(auth);
   } catch (err) {
     alert(`Signout error: ${err}`);
   }
 }
 
 return (
  <nav className='sidebar sidebar-close'>


    <div className="menu-bar-top">
      <h2 className="nav-header">Create a QR Code:</h2>
      <div className="menu">
        <ul className="modal-menu">
          <li className="nav-link">
            <Icon icon={<ContactPage style={{ color: "rosybrown" }} fontSize="large" />} onClick={showContactForm} testId="contactIcon" />
            <span className="nav-text">Contact</span>
          </li>
          <li className="nav-link">
            <Icon icon={<CalendarMonth style={{ color: "red" }} fontSize="large" />} onClick={showDateForm} testId="dateIcon" />
            <span className="nav-text">Date</span>
          </li>
          <li className="nav-link">
            <Icon icon={<Email style={{ color: "goldenrod" }} fontSize="large" />} onClick={showEmailForm} testId="emailIcon" />
            <span className="nav-text">Email</span>
          </li>
          <li className="nav-link">
            <Icon icon={<CameraAlt style={{ color: "darkslategray" }} fontSize="large" />} onClick={showImgForm} testId="imgIcon" />
            <span className="nav-text">Image</span>
          </li>
          <li className="nav-link">
            <Icon icon={<Search fontSize="large" />} onClick={showTextForm} testId="searchIcon" />
            <span className="nav-text">Search</span>
          </li>
          <li className="nav-link">
            <Icon icon={<Link color="primary" fontSize="large" />} onClick={showUrlForm} testId="urlIcon" />
            <span className="nav-text">URL</span>
          </li>
        </ul>
      </div>


      <div className="menu-bar-bottom">
        <h2 className="nav-header">More:</h2>
        <div className="menu">
          <ul className="page-links">
            <li className="nav-link">
              <Icon icon={<QrCodeScanner color="primary" fontSize="large" />} onClick={() => navigate("/codes")} />
              <span className="nav-text">Your QR Codes</span>
            </li>
            <li className="nav-link">
              <Icon icon={<Logout color="primary" fontSize="large" />} onClick={logOut} />
              <span className="nav-text">Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </nav>
  //  <div className="sidebar">
  //   <Icon icon={<ContactPage style={{ color: "rosybrown" }} fontSize="large" />} onClick={showContactForm} testId="contactIcon" />
  //   <Icon icon={<CalendarMonth style={{ color: "red" }} fontSize="large" />} onClick={showDateForm} testId="dateIcon" />
  //   <Icon icon={<Email style={{ color: "goldenrod" }} fontSize="large" />} onClick={showEmailForm} testId="emailIcon" />
  //   <Icon icon={<CameraAlt style={{ color: "darkslategray" }} fontSize="large" />} onClick={showImgForm} testId="imgIcon" />
  //   <Icon icon={<Search fontSize="large" />} onClick={showTextForm} testId="searchIcon" />
  //   <Icon icon={<Link color="primary" fontSize="large" />} onClick={showUrlForm} testId="urlIcon" />
  // </div>
 );
}