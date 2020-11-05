import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';

const Header = () => {
    return (
        <>
        <div className="main_nav_bar">
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" noWrap>
                    CHROMOSOME
                </Typography>
                <div style={{textAlign:"left", color: "red", float: "right"}}>
                    <h1>Express</h1>
                </div>
            </Toolbar>
        </AppBar>
        </div>
        </>
     );
}

export default Header;