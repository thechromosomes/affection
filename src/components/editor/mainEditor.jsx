import React from 'react';
import StepWizard from 'react-step-wizard';
import WizardOne from './wizardOne'
import WizardTwo from './wizardTwo'

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import './mainEditor.css'

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
          </StepWizard>
        </>
       )
    }
  }


  export default Editor
