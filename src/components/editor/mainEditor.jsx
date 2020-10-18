import React from 'react';
import StepWizard from 'react-step-wizard';
import WizardOne from './wizardOne'
import WizardTwo from './wizardTwo'
import WizrdThree from './wizardThree'


import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import './mainEditor.css'

let custom = {
  enterRight: {transition: "12s"} ,
  enterLeft : {transition: "12s"},
  exitRight : {transition: "12s"},
  exitLeft  : {transition: "12s"}
}

class Editor extends React.Component {
    constructor (props) {
      super(props)
      this.state = {

      }
    }

    render () {
      return (
        <>
          <StepWizard>
            <WizardOne/>
            <WizardTwo/>
            <WizrdThree/>
          </StepWizard>
        </>
       )
    }
  }


  export default Editor
