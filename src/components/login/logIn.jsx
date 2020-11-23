import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Button from '@material-ui/core/Button';


import './logIn.css'


class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flipToSigUp: false
         }
    }

    responseGoogle = (response) => {
        console.log("response", response)
    }

    handleFlip = () => {
        this.setState({flipToSigUp: !this.state.flipToSigUp})
    }
    renderToggleButton = (item) => (
        <ToggleButtonGroup
                exclusive
                aria-label="text alignment"
            >
                <ToggleButton value="left" aria-label="left aligned">
                <Button className="toggle_button" onClick={this.handleFlip} variant="contained" color="primary">{item}</Button>
                </ToggleButton>

        </ToggleButtonGroup>
    )
    render() {
        return (

            <div>
            <Flippy
                flipOnClick={false}
                isFlipped={this.state.flipToSigUp}
            >
                <FrontSide>
                <div className="box">
                    <h1>logIn</h1>
                    <p className="text-muted"> Please enter your username and password!</p>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <input type="submit" placeholder="let me in " />
                    <p className="text-muted"> OR </p>
                    <div className="google_button">
                    <GoogleLogin
                        clientId="526821602981-00h2ri9kdpq8nefrnffeasvle2igr1sn.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    {this.renderToggleButton("signUp")}
                    </div>
                </div>
                </FrontSide>

                <BackSide>
                <div className="box">
                    <h1>SignUp</h1>
                    <p className="text-muted"> Please enter your credentials!</p>
                    <input type="text" placeholder="Username" />
                    <input type="text" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Confirm Password" />
                    <input type="submit" placeholder="let me in " />
                    <p className="text-muted"> OR </p>
                    <div className="google_button">
                    <GoogleLogin
                        clientId="526821602981-00h2ri9kdpq8nefrnffeasvle2igr1sn.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    {this.renderToggleButton("logIn")}
                    </div>
                </div>
                </BackSide>
            </Flippy>
            </div>
         );
    }
}

export default LogIn;

