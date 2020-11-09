import React from 'react';
import { useLocation } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GoogleAuth from '../login/googleLogIn'
import ThemeButton from '../app/themeButton/themeButtons'


import './header.css'
const Header = (props) => {
    const location = useLocation();
    return (
        <div className="main_nav_bar">
        {/* <AppBar> */}
            <Toolbar>
                <Typography variant="h6" noWrap>
                    CHROMOSOME
                </Typography>
                <div style={{textAlign:"left", color: "red", float: "right"}}>
                    <h1>Express</h1>
                </div>
                <GoogleAuth/>
                {location.pathname !== "/" && <ThemeButton/>}
            </Toolbar>
        {/* </AppBar> */}
        </div>
     );
}

export default Header;