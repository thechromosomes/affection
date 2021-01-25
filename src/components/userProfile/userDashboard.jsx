import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import UserDashboardWall from './dashboardComponent'

import './userDashboard.css'

class UserDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [1,2,3,4,5,6,7,8,9]
         }
    }
    render() {
        return (
            <Grid container spacing={3} style={{margin: 0, width: '100%'}}>
                <Grid item xs={12}>
                    <h1>this is my profile data and stuff</h1>
                </Grid>
                {this.state.posts.map( (post, index) => (
                    <Grid item xs={3} key={index}>
                      <UserDashboardWall/>
                    </Grid>
                ))}
            </Grid>
         );
    }
}

export default UserDashboard;