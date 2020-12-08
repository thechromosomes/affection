import React, { Component, useRef } from 'react';
import ReactQuill, { Quill }  from 'react-quill';
import {toolbar} from './mainEditorComponents'
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import ReactSnackBar from "react-js-snackbar";


import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
const textInput = React.createRef();
const storedHtml = getFromLS()

class WizardOne extends Component {
    constructor(props) {
      super(props);
      this.state = {
          editorHtml: storedHtml,
          theme: 'snow',
          placeholder: "People says my fellings are hell to understand. So I ended up here. I hope you will understand...",
          mainHeading: "",
          counTextLength: 0,
          mentionedUserTemp: null,
          mentionedUser: [],
          show: false,
          errorMessage: ""
      }
    }

    componentDidMount = () => {
      this.counTextLength()
    }

      handleThemeChange = (newTheme) => {
        if (newTheme === "core") newTheme = null;
        this.setState({ theme: newTheme })
      }

      showSnackBar = (message) => {
        this.setState({errorMessage: message})
            this.setState({ show: true });
            setTimeout(() => {
              this.setState({ show: false });
            }, 3000);
      }

      handleNextStep = () => {
        if(this.state.mainHeading == ""){
            this.showSnackBar("could you please name your post.")
            textInput.current.focus();
        }else if(this.state.counTextLength < 100){
          let stringsRemained = 124 - (124 * this.state.counTextLength / 100)
          this.showSnackBar(`come on just ${stringsRemained} strings needed.`)
          this.refs.bodyInput.focus();
        }else{
          this.props.nextStep()
        }
      };

      handleChange = (html) => {
        this.setState({ editorHtml: html });
        global.localStorage.setItem(
          "editorHtml",
          JSON.stringify(html)
        )
        this.counTextLength()
      }

      handleMainHeading = (event) => {
        this.setState({mainHeading: event.target.value})
      }

      counTextLength = () => {
        let regex = /(<([^>]+)>)/ig;
        let body = this.state.editorHtml;
        let result = body.replace(regex, "");
        let finalResult = (result.length / 124) * 100
        this.setState({counTextLength: finalResult})

        if(result.indexOf('@') >= 0){
          let arr = result.split('@');
          this.setState({mentionedUserTemp: "@" + arr[1]})

          // make post request here
          let mentionedUser = [...this.state.mentionedUser]
          mentionedUser.push(arr[1])
          this.setState({mentionedUser})
        }else {
          this.setState({mentionedUser: []})
        }

      }



      handleMentionUser = (newentry) => {
        let res = this.state.editorHtml.replace(this.state.mentionedUserTemp, "<span>" + "<b>" + "<span style=\"color: rgb(153, 51, 255);\">" + newentry + "</span>" + "</b> &nbsp;" + "</span>");
        this.state.editorHtml = res;
        this.setState({mentionedUser: []})
        this.refs.bodyInput.focus();
      }

      renderButtonProgress = () => {
        if (this.state.counTextLength <= 100){
          return (
            <>
            <LinearProgressWithLabel value={this.state.counTextLength} variant="buffer" valueBuffer={this.state.counTextLength}/>
            </>
          )
        }
      }


    render() {
        return (
            <>
              <ReactSnackBar Icon={<span>🦄</span>} Show={this.state.show}>
                {this.state.errorMessage}
              </ReactSnackBar>

                <div className="themeSwitcher">
                    <label> Theme </label>
                    <select onChange={(e) =>
                    this.handleThemeChange(e.target.value)}>
                    <option value="snow">Snow</option>
                    <option value="bubble">Bubble</option>
                    </select>
                  <button onClick={this.handleNextStep}>Next Step</button>
                </div>

                <div className="text_editor" >
                <TextField label="Name your post" inputRef={textInput} variant="outlined" autoFocus fullWidth onChange={this.handleMainHeading}/>

                {this.renderButtonProgress()}

                <ReactQuill
                    ref="bodyInput"
                    theme={this.state.theme}
                    onChange={this.handleChange}
                    value={this.state.editorHtml}
                    modules={WizardOne.modules}
                    placeholder={this.state.placeholder}
                />
                <div>
                {this.state.mentionedUser.length > 1 &&
                  <ul>
                  {this.state.mentionedUser.map(item => (
                    <li style={{cursor: "pointer"}} onClick={() => this.handleMentionUser(item)}>
                    {item}
                    </li>
                  ))}
                  </ul>
                }
                </div>

                <div>
                </div>
                </div>

            </>
         );
    }
}

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%">
        <LinearProgress variant="determinate" {...props} />
      </Box>
    </Box>
  );
}

function undoChange() {
    this.quill.history.undo();
  }
  function redoChange() {
    this.quill.history.redo();
  }

  function changeMention() {
    const cursorPosition = this.quill.getSelection().index;
    this.quill.insertText(cursorPosition, "@");
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

    // get html from local storage
    function getFromLS() {
      let ls
          if (localStorage.getItem("editorHtml") !== null) {
            try {
              ls = JSON.parse(localStorage.getItem("editorHtml"));
            } catch (e) {
              console.log("error", e)
            }
          } else{
            ls = ""
          }
          return ls;
    }



export default WizardOne;
