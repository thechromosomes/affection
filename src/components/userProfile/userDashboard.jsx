import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './userDashboard.css'


class UserDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        return (
            <Grid container spacing={3} style={{margin: 0, width: '100%'}}>
                <Grid item xs>
                <Paper>xs</Paper>
                </Grid>
                <Grid item xs>
                <Paper>xs</Paper>
                </Grid>
                <Grid item xs>
                <Paper>xs</Paper>
                </Grid>
            </Grid>
         );
    }
}

export default UserDashboard;