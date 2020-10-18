import React, { Component } from 'react';

class WizardTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        return (
            <>
                <h1>hello world</h1>
                <div>
                    <h2>Step {this.props.currentStep}</h2>
                    <p>Total Steps: {this.props.totalSteps}</p>
                    <p>Is Active: {this.props.isActive}</p>
                    <p><button onClick={this.props.previousStep}>Previous Step</button></p>
                    <p><button onClick={this.props.nextStep}>Next Step</button></p>
                    <p><button onClick={this.props.firstStep}>First Step</button></p>
                    <p><button onClick={this.props.lastStep}>Last Step</button></p>
                </div>
            </>
         );
    }
}

export default WizardTwo;