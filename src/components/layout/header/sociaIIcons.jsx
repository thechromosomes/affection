import React, { Component } from "react";

class SocialIcons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div className="center">
          <div className="wrapper">
            <a href="https://dribbble.com/shots/2252572-Day-083-Social-Connect">
              <div className="container container--facebook">
                <div className="box box--left box--front">
                  <i className="ion ion-social-facebook"></i>
                  <span className="count">13 K</span>
                </div>
                <span className="follow follow--left">Like</span>
              </div>
            </a>

            <a href="https://dribbble.com/shots/2252572-Day-083-Social-Connect">
              <div className="container container--twitter">
                <div className="box box--middle">
                  <i className="ion ion-social-twitter"></i>
                  <span className="count">10.5 K</span>
                </div>
                <span className="follow follow--middle">Follow</span>
              </div>
            </a>

            <a href="https://dribbble.com/shots/2252572-Day-083-Social-Connect">
              <div className="container container--instagram">
                <div className="box box--right">
                  <i className="ion ion-social-instagram"></i>
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
  }
}

export default SocialIcons;
