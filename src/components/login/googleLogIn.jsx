import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';


class GoogleLogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    responseGoogle = (response) => {
        console.log("response", response)
    }
    render() {
        return (
            <>
              <GoogleLogin
                clientId="526821602981-00h2ri9kdpq8nefrnffeasvle2igr1sn.apps.googleusercontent.com"
                buttonText="Login to express"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
            </>
        );
    }
}

export default GoogleLogIn;