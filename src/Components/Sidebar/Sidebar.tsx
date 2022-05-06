import React from 'react';
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
    <Icon icon={<ContactPage style={{ color: "rosybrown" }} fontSize="large" />} onClick={showContactForm} />
    <Icon icon={<CalendarMonth style={{ color: "red" }} fontSize="large" />} onClick={showDateForm} />
    <Icon icon={<Email style={{ color: "goldenrod" }} fontSize="large" />} onClick={showEmailForm} />
    <Icon icon={<CameraAlt style={{ color: "darkslategray" }} fontSize="large" />} onClick={showImgForm} />
    <Icon icon={<Search fontSize="large" />} onClick={showTextForm} />
    <Icon icon={<Link color="primary" fontSize="large" />} onClick={showUrlForm} />
  </div>
 );
}