import React from 'react';
import "../../Styles/Sidebar.css";
import Icon from './Icon';
import { ContactPage, CalendarMonth, Email, CameraAlt, Search, Link } from "@mui/icons-material";

interface Forms {
  showContactForm: () => void;
  showDateForm: () => void;
  showEmailForm: () => void;
  showImgForm: () => void;
  showTextForm: () => void;
  showUrlForm: () => void;
};

export default function Sidebar({ showContactForm, showDateForm, showEmailForm, showImgForm, showTextForm, showUrlForm }: Forms) {
 return (
   <div className="sidebar">
    <Icon icon={<ContactPage style={{ color: "rosybrown" }} fontSize="large" />} onClick={showContactForm} testId="contactIcon" />
    <Icon icon={<CalendarMonth style={{ color: "red" }} fontSize="large" />} onClick={showDateForm} testId="dateIcon" />
    <Icon icon={<Email style={{ color: "goldenrod" }} fontSize="large" />} onClick={showEmailForm} testId="emailIcon" />
    <Icon icon={<CameraAlt style={{ color: "darkslategray" }} fontSize="large" />} onClick={showImgForm} testId="imgIcon" />
    <Icon icon={<Search fontSize="large" />} onClick={showTextForm} testId="searchIcon" />
    <Icon icon={<Link color="primary" fontSize="large" />} onClick={showUrlForm} testId="urlIcon" />
  </div>
 );
}