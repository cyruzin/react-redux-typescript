import React from 'react';
import { Link } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import LogoutIcon from '@material-ui/icons/ArrowBackIosOutlined';

export default (
  <>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <Link to="/dashboard/user" style={{ textDecoration: 'none' }}>
        <ListItemText primary="Usuários" />
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <Link to="/dashboard/logout" style={{ textDecoration: 'none' }}>
        <ListItemText primary="Sair" />
      </Link>
    </ListItem>
  </>
);
