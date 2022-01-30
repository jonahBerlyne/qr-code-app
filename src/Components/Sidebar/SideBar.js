import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function SideBar() {
 return (
    <List disablePadding dense>
      <ListItem button>
        <ListItemText>Home</ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemText>Billing</ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemText>Settings</ListItemText>
      </ListItem>
    </List>
 );
}