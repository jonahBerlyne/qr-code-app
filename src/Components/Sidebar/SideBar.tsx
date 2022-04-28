import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

interface Forms {
  showContactForm: () => void;
  showDateForm: () => void;
  showEmailForm: () => void;
  showImgForm: () => void;
  showTextForm: () => void;
  showUrlForm: () => void;
};

export default function SideBar({ showContactForm, showDateForm, showEmailForm, showImgForm, showTextForm, showUrlForm }: Forms) {
 return (
    <List disablePadding dense>
      <ListItem button onClick={showContactForm}>
        <ListItemText>Contact</ListItemText>
      </ListItem>
      <ListItem button onClick={showDateForm}>
        <ListItemText>Date</ListItemText>
      </ListItem>
      <ListItem button onClick={showEmailForm}>
        <ListItemText>E-mail</ListItemText>
      </ListItem>
      <ListItem button onClick={showImgForm}>
        <ListItemText>Image</ListItemText>
      </ListItem>
      <ListItem button onClick={showTextForm}>
        <ListItemText>Text</ListItemText>
      </ListItem>
      <ListItem button onClick={showUrlForm}>
        <ListItemText>Website</ListItemText>
      </ListItem>
    </List>
 );
}