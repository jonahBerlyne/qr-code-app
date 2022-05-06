import React from 'react';
import Option from './Option';
import { ContactPage, CalendarMonth, Email, CameraAlt, Search, Link } from "@mui/icons-material";

interface Forms {
  showContactForm: () => void;
  showDateForm: () => void;
  showEmailForm: () => void;
  showImgForm: () => void;
  showTextForm: () => void;
  showUrlForm: () => void;
};

export default function Options({ showContactForm, showDateForm, showEmailForm, showImgForm, showTextForm, showUrlForm }: Forms) {
 return (
   <div>
    <Option icon={<ContactPage />} name="Contact" onClick={showContactForm} />
    <Option icon={<CalendarMonth />} name="Date" onClick={showDateForm} />
    <Option icon={<Email />} name="Email" onClick={showEmailForm} />
    <Option icon={<CameraAlt />} name="Image" onClick={showImgForm} />
    <Option icon={<Search />} name="Search" onClick={showTextForm} />
    <Option icon={<Link />} name="Website" onClick={showUrlForm} />
  </div>
 );
}