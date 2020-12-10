import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Button from '@material-ui/core/Button';
import $ from 'jquery';
import axios from 'axios';
import Endpoints, {baseUrl} from '../apiEndpoints';
import Avatar from '@material-ui/core/Avatar';
import SimpleReactValidator from 'simple-react-validator';

import './logIn.css'


class LogIn extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({
            validators: {
                username: {
                    message: 'Please choose a unique user name. This one is already exists',
                    rule: () => {
                    return this.state.usernameStatus
                }
              },
                confirmPass: {
                    message: 'pass does not match.',
                    rule: (val, params, validator) => {
                    return val === this.state.password
                }
            },
                avatar: {
                    message: 'image corrupted.',
                    rule: () => {
                    return !this.state.imageHurdle
                }
            }
        }
        });

        this.state = {
            flipToSigUp: false,
            username:"",
            usernameStatus: true,
            password:"",
            confirmPass:"",
            email:"",
            avatar: "image/iconThumbnail.png",
            editedAvatar: "image/iconThumbnail.png",
            displayname:"",
            logInUserName:"",
            logInpass: "",
            imageHurdle: false,
         }

    }

    responseGoogle = (response) => {
        this.setState({
            "email": response.profileObj.email,
            "displayname": response.profileObj.name || response.profileObj.givenName,
            "avatar": response.profileObj.imageUrl,
            "editedAvatar": response.profileObj.imageUrl
        })
    }

    handleFlip = () => {
        this.setState({flipToSigUp: !this.state.flipToSigUp})
        $('input').val('');
        this.setState({
            username:"",
            password:"",
            confirmPass:"",
            email:"",
            displayname:""
        })
    }

    checkUserName = (event) => {
        let username = event.target.value.toLowerCase()
        let url = Endpoints.User.findUserName
        this.setState({"username": username})
        axios.post(url, {username})
          .then((response) => {
            this.setState({"usernameStatus": response.data.status})
            this.validator.showMessageFor("username")
          })
          .catch((error) => {
            console.log(error);
          })
    }

    handleChange = (event) => {
        let key = event.target.name
        this.setState({[key]: event.target.value})
        this.validator.showMessageFor(key)
    }

    handleLoginChange = (event) => {
        let key = event.target.name
        if(key === "logInUserName"){
            let lowerCase = event.target.value.toLowerCase()
            this.setState({[key]: lowerCase})
            return false
        }
        this.setState({[key]: event.target.value})

    }

    showPass = (event) => {
        var x = document.getElementById("myPass");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";

        }
    }

    submitForm = () => {
        let url = Endpoints.User.register
        let {username, email, password, displayname, avatar} = this.state
        let locationFrom = this.props.location.state && this.props.location.state.from.pathname || "/"

        if (this.validator.allValid()) {
            axios.post(url, {username, email, password, displayname, avatar})
            .then(function (response) {
                if(response.data.status === false){
                    console.log(response.data.message);
                    alert(response.data.message)
                }else{
                    alert("success bro")
                    localStorage.setItem("state",JSON.stringify(response.data.user));
                    window.location.href = locationFrom
                }
                })
            .catch(function (error) {
                console.log(error);
                alert(error)
            })
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    handleLogIn = () => {
        let {logInUserName, logInpass} = this.state
        let url = Endpoints.User.logIn
        let locationFrom = this.props.location.state && this.props.location.state.from.pathname || "/"

        axios.post(url, {"username": logInUserName, "password": logInpass})
        .then(function (response) {
            if(response.data.status === false){
                alert(response.data.message)
            }else{
                alert("success bro")
                localStorage.setItem("state",JSON.stringify(response.data.user));
                window.location.href = locationFrom
            }
        })
        .catch(function (error) {
            console.log(error);
            alert(error)
        })
    }


     uploadFile = async (event) => {
        event.preventDefault();
        let file = event.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        try{
            let url = Endpoints.UploadFile
            const res = await axios.post(url, formData, config);
            this.setState({"avatar": res.data.file})
            this.setState({"editedAvatar": baseUrl+res.data.file})
            this.setState("imageHurdle", false)

        } catch(err){
            console.log(err);
            this.setState("imageHurdle", true)
            this.validator.showMessageFor("avatar")
        }
    }

    renderToggleButton = (item) => (
        <Button className="toggle_button" onClick={this.handleFlip} variant="contained" color="primary">{item}</Button>
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
                    <p className="text-muted"> Please enter username and password!</p>
                    <input type="text" placeholder="Username" name="logInUserName" value={this.state.logInUserName} onChange={this.handleLoginChange}/>

                    <input type="password" placeholder="Password" name="logInpass" id="myPass" onChange={this.handleLoginChange}/>

                    <span><input type="checkbox" onClick={this.showPass}/>Show Password</span>

                    <input type="submit" placeholder="let me in " onClick={this.handleLogIn}/>

                    <p className="text-muted"> OR </p>
                    <div className="google_button">
                    {this.renderToggleButton("signUp")}
                    </div>
                </div>
                </FrontSide>

                <BackSide>
                <div className="box">
                    <h1>SignUp</h1>
                    <div className="avatar">

                    <Avatar alt="Remy Sharp" src={this.state.editedAvatar} /><span><input type="file" placeholder="upload DP" name="myFile" onChange={this.uploadFile}/></span>
                     {this.validator.message('avatar', this.state.avatar, 'required|avatar')}

                    </div>

                    <p className="text-muted"> Please enter your credential</p>

                    <input type="text" placeholder="Username" value={this.state.username} name="username" onChange={this.checkUserName}/>
                    {this.validator.message('username', this.state.username, 'required|username')}


                    <input type="text" placeholder="Pen name" name="displayname" value={this.state.displayname} onChange={this.handleChange}/>
                    {this.validator.message('displayname', this.state.displayname, 'required|string')}

                    <input type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange}/>
                    {this.validator.message('email', this.state.email, 'required|email')}

                    <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    {this.validator.message('password', this.state.password, 'required|min:5|max:20')}

                    <input type="password" placeholder="Confirm Password" value={this.state.confirmPass}
                    name="confirmPass" onChange={this.handleChange}/>
                    {this.validator.message('confirmPass', this.state.confirmPass, 'required|confirmPass')}

                    <input type="submit" placeholder="let me in " onClick={this.submitForm} />

                    <p className="text-muted"> OR </p>
                    <div className="google_button">
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_AUTH_API}
                        buttonText="fetch credentials"
                        onSuccess={this.responseGoogle}
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

