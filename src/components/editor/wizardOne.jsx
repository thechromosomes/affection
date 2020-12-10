import React, { Component, useRef } from 'react';
import ReactQuill, { Quill }  from 'react-quill';
import {toolbar} from './mainEditorComponents'
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import ReactSnackBar from "react-js-snackbar";
import Fab from '@material-ui/core/Fab';
import { motion, useCycle } from "framer-motion";
import WizardTwo from './wizardTwo'


import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
const textInput = React.createRef();
const storedHtml = getFromLS()

// flaoating icon
const floatingIcon = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
};

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
          moveNext: false,
          show: false,
          errorMessage: "",
          nextButton: {
            "rotate": 360,
            "scale": 1
          }
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
          this.setState({"moveNext": true})
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

        // scale the next button
        if (this.state.counTextLength == 100){
          let scaleTemp = {...this.state.nextButton}
          scaleTemp.rotate = 359
          scaleTemp.scale = 1.2
          this.setState({"nextButton": scaleTemp})
        }

        // mention user
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

      goBack = () => {
        this.setState({"moveNext": false})
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
      let {nextButton, theme, editorHtml, placeholder, show, errorMessage, mainHeading, mentionedUser} = this.state
        return (
            <>
            {!this.state.moveNext ?
            <>
              <ReactSnackBar Icon={<span>🦄</span>} Show={show}>
                {errorMessage}
              </ReactSnackBar>

                <div className="text_editor" >
                  <TextField label="Name your post" inputRef={textInput} variant="outlined" autoFocus fullWidth onChange={this.handleMainHeading} defaultValue={this.state.mainHeading}/>

                  {this.renderButtonProgress()}

                  <ReactQuill
                      ref="bodyInput"
                      theme={theme}
                      onChange={this.handleChange}
                      value={editorHtml}
                      modules={WizardOne.modules}
                      placeholder={placeholder}
                  />
                  <div className="mention_user">
                  {mentionedUser.length > 1 &&
                    <ul>
                    {mentionedUser.map(item => (
                      <li style={{cursor: "pointer"}} onClick={() => this.handleMentionUser(item)}>
                      {item}
                      </li>
                    ))}
                    </ul>
                  }
                  </div>
                </div>

                  <motion.div style={floatingIcon}
                    initial={{  x: "-300vh" }}
                    animate={{scale: nextButton.scale, x:0}}
                    transition={{
                        delay: 1,
                        type: "spring",
                        duration: 2,
                        stiffness: 500,
                        damping: 10
                      }}
                    >
                    <Fab
                      variant="extended"
                      size="large"
                      color="primary"
                      aria-label="add"
                      style={floatingIcon}
                      onClick={this.handleNextStep}
                    >
                    Next
                    </Fab>
                  </motion.div>
            </>
            : <WizardTwo editorHtml={editorHtml} mainHeading={mainHeading} mentionedUser={mentionedUser} goBack={this.goBack}/>}

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
