import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function SideBar({showUrlForm}) {
 return (
    <List disablePadding dense>
      <ListItem button>
        <ListItemText>E-mail</ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemText>Images</ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemText>Text</ListItemText>
      </ListItem>
      <ListItem button onClick={showUrlForm}>
        <ListItemText>Website</ListItemText>
      </ListItem>
    </List>
 );
}