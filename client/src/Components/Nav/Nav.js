import { Link } from "react-router-dom";
import {Avatar, AppBar, Toolbar, Button, Typography} from '@material-ui/core';
import useStyles from './Styles.js'
import React, {useState} from 'react'
import { useEffect } from "react";
import { useNavigate, useLocation  } from "react-router";
import decode from 'jwt-decode'
import {toast, ToastContainer} from 'react-toastify'


const Nav = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const navigate = useNavigate()
  const location = useLocation()
  
  
  const logout = () => {  
    localStorage.clear()
    setUser(null)
      navigate('/auth')

      }
  
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  
  const classes = useStyles();

    return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Typography variant='h6' component={Link} to="/"> Travel Tracker</Typography>
          <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    
  </AppBar>

  );
}

export default Nav