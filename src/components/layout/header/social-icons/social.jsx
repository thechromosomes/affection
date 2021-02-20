import React, { PureComponent } from "react";
import { useState, useEffect } from 'react'
import './social_icon.scss'

const SocailIcons = () => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = "https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);


  return (
    <>
      <div className="center">
        <div className="wrapper">
          <a href="https://dribbble.com/shots/2252572-Day-083-Social-Connect">
            <div className="container container--facebook">
              <div className="box box--left box--front">
                <i className="ion ion-social-facebook" />
                <span className="count">13 K</span>
              </div>
              <span className="follow follow--left">Like</span>
            </div>
          </a>

          <a href="https://dribbble.com/shots/2252572-Day-083-Social-Connect">
            <div className="container container--twitter">
              <div className="box box--middle">
                <i className="ion ion-social-twitter" />
                <span className="count">10.5 K</span>
              </div>
              <span className="follow follow--middle">Follow</span>
            </div>
          </a>

          <a href="https://dribbble.com/shots/2252572-Day-083-Social-Connect">
            <div className="container container--instagram">
              <div className="box box--right">
                <i className="ion ion-social-instagram" />
                <span className="count">11 K</span>
              </div>
              <span className="follow follow--right">Follow</span>
            </div>
          </a>
        </div>
      </div>

      <button
        id="stop"
        className="button"
        title="Stops the animation from running"
      >
        Stop
      </button>
    </>
  );
};

export default SocailIcons;
