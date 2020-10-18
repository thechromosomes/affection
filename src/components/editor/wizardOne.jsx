import React, { Component } from 'react';
import ReactQuill, { Quill }  from 'react-quill';
import {toolbar} from './mainEditorComponents'
import PropTypes from 'prop-types';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

class WizardOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorHtml: '',
            theme: 'snow',
            placeholder: "   your text here"

          }
    }

    handleThemeChange (newTheme) {
        console.log("newTheme", newTheme)
        if (newTheme === "core") newTheme = null;
        this.setState({ theme: newTheme })
      }

      handleChange (html) {
        console.log("html", html)
          this.setState({ editorHtml: html });
      }


    render() {
        return (
            <>
                <div className="themeSwitcher">
                    <label> Theme </label>
                    <select onChange={(e) =>
                    this.handleThemeChange(e.target.value)}>
                    <option value="snow">Snow</option>
                    <option value="bubble">Bubble</option>
                    </select>
                </div>

                <div className="text_editor">
                <ReactQuill
                    theme={this.state.theme}
                    onChange={this.handleChange}
                    value={this.state.editorHtml}
                    modules={WizardOne.modules}
                    placeholder={this.state.placeholder}
                />
                </div>

                <div>
                    <h2>Step {this.props.currentStep}</h2>
                    <p>Total Steps: {this.props.totalSteps}</p>
                    <p>Is Active: {this.props.isActive}</p>
                    <p><button onClick={this.props.previousStep}>Previous Step</button></p>
                    <p><button onClick={this.props.nextStep}>Next Step</button></p>
                    {/* <p><button onClick={()=>this.props.goToStep(2)}>Step 2</button></p> */}
                    <p><button onClick={this.props.firstStep}>First Step</button></p>
                    <p><button onClick={this.props.lastStep}>Last Step</button></p>
                </div>

            </>
         );
    }
}

function undoChange() {
    this.quill.history.undo();
  }
  function redoChange() {
    this.quill.history.redo();
  }

  function changeMention() {
    alert("clicked")
  }

    WizardOne.modules = {
      toolbar: {
        container: toolbar,
        handlers: {
          undo: undoChange,
          redo: redoChange,
          atSign: changeMention
        },
      },
      history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
      },

      imageResize: {
        parchment: Quill.import('parchment')
    }
    };

    WizardOne.propTypes = {
      placeholder: PropTypes.string,
    }



export default WizardOne;