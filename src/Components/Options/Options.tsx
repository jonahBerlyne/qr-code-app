import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Option from './Option';
import { ContactPage } from "@mui/icons-material";

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
   <Option icon={<ContactPage />} name={"Contact"} onClick={showContactForm} />
 );
}