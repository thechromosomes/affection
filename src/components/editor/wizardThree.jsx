import React, { Component } from 'react';

class WizardThree extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        return (
            <>
                <div className="preview_wall">
                    <h1>here is the preview of your page</h1>
                </div>
                <div>
                    <p><button onClick={this.props.previousStep}>Previous Step</button></p>
                    <p><button onClick={this.props.firstStep}>Go to editor</button></p>
                </div>
            </>
         );
    }
}

export default WizardThree;