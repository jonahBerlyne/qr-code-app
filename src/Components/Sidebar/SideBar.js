import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function SideBar({showEmailForm, showImagesForm, showTextForm, showUrlForm}) {
 return (
    <List disablePadding dense>
      <ListItem button onClick={showEmailForm}>
        <ListItemText>E-mail</ListItemText>
      </ListItem>
      <ListItem button onClick={showImagesForm}>
        <ListItemText>Images</ListItemText>
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