import React, { Component } from 'react';
import { SketchPicker } from 'react-color'
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Select from 'react-select';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import WallPreview from './wallPreview'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import Endpoints, {baseUrl} from '../apiEndpoints';
import FontPicker from "font-picker-react";



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} className="preview_snackBar"/>;
  }

// floating icon
const floatingIcon1 = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    marginLeft:"10px"
};

// floating icon 2
const floatingIcon2 = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 75,
    left: 'auto',
    position: 'fixed',
};


class WizardTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            wallColor:"#fff",
            openColorPellete: false,
            tagsOptions: [
                { value: 'chocolate', label: 'chocolate' },
                { value: 'strawberry', label: 'strawberry' },
                { value: 'vanilla', label: 'vanilla' },
            ],
            tagInputValue: "",
            postedBy: "",
            postNameOption: [
                { value: 'anonymous', label: 'anonymous' }
            ],
            openSnackBar: false,
            displayname: "",
            userId: "",
            fontFamily: "Open Sans"
        }
    }

    handleChange = (color) => {
        this.setState({ wallColor: color.hex });
    }

    setFontFamily = (font) => {
        this.setState({"fontFamily": font})
    }

    fetchTags = () => {
        let url = Endpoints.Tags.fetchTags
        axios.post(url)
        .then((response) => {
            if(response.data.status === false){
                alert(response.data.message)
            }else{
                this.setState({"tagsOptions": response.data.tags})
                alert("success bro")
            }
        })
        .catch(function (error) {
            console.log(error);
            alert(error)
        })
    }

    handleClickOpenClose = () => {
        this.setState({openColorPellete: !this.state.openColorPellete})
    };

    handleTagChange = async tags => {
        this.setState({"tags": tags});
        this.setState({tagInputValue: ""})
      };

      handleInputChange = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '');
        if (inputValue){
            this.setState({tagInputValue: inputValue})
        }

      };

      handlePostedBy = (postedBy) => {
          if(postedBy.value === "anonymous") {
              this.setState({"openSnackBar": true})
          }
        this.setState({"postedBy": postedBy });
      }

      createTag = () => {
        let url = Endpoints.Tags.createTags
        axios.post(url, {"createBy": this.state.userId, "tagName": this.state.tagInputValue})
        .then((response) => {
            if(response.data.status === false){
                alert(response.data.message)
            }else{
                this.fetchTags()
                let tags =  [...this.state.tags]
                let inputData =   { "value": response.data.tag.unique_id, "label": response.data.tag.tag_name}
                tags.push(inputData)
                this.setState({tags})
                this.setState({tagInputValue: ""})
                alert("success bro")
            }
        })
        .catch(function (error) {
            console.log(error);
            alert(error)
        })
      }

      renderInsertTags = () => {
        let filterTag = this.state.tagsOptions.filter(tag => tag.label === this.state.tagInputValue)
        if (filterTag.length <= 0 && this.state.tagInputValue !== ""){
            return(
                <>
                    <h1>{this.state.tagInputValue}</h1>
                    <button onClick={this.createTag}>create tag</button>
                </>
            )
         }else {
             return (
                 false
             )
         }
      }

      closeSnackBar = () => {
          this.setState({"openSnackBar": false})
      }

      componentDidMount(){
        let userData =   getFromLS()
        this.setState({"displayname": userData.displayname})
        this.setState({"userId": userData.unique_id})
        let postNameOption = [...this.state.postNameOption]
        postNameOption.push({ value: userData.username, label: userData.username })
        this.setState({postNameOption})

        // fetch tags
        this.fetchTags()
      }

    render() {
        return (
            <Grid container spacing={3} style={{margin: 0, width: "100%"}}>
                <Dialog
                    fullScreen
                    open={this.state.openColorPellete}
                    TransitionComponent={Transition}
                    style={ {backgroundColor: this.state.wallColor}}
                    >
                <div style={{ margin: "auto", background:this.state.wallColor }}>
                    <SketchPicker
                    width={400}
                    color={ this.state.wallColor }
                    onChange={ this.handleChange }
                    />
                </div>
                    <Fab
                        variant="extended"
                        size="large"
                        color="primary"
                        aria-label="add"
                        style={{margin:100}}
                        onClick={this.handleClickOpenClose}
                        >
                        looks awesome
                    </Fab>
                </Dialog>

                {/* rendering wall preview component */}
                <WallPreview
                    editorHtml={this.props.editorHtml}
                    mainHeading={this.props.mainHeading}
                    wallColor={this.state.wallColor}
                    handleClickOpenClose={this.handleClickOpenClose}
                    displayname={this.state.displayname}
                />

                {this.renderInsertTags()}

                <Grid item xs={4}>
                    <Select
                        isMulti
                        isSearchable
                        placeholder="select or create tags"
                        value={this.state.tags}
                        onChange={this.handleTagChange}
                        options={this.state.tagsOptions}
                        onInputChange={this.handleInputChange}
                />
                </Grid>

                <Snackbar open={this.state.openSnackBar} autoHideDuration={6000}>
                    <Alert onClose={this.closeSnackBar} severity="success">
                    You have chosen an anonymous user. which means you can't control the post further and it will never show in your dashboard. just remember it's not your post anyway. it's anonymous now.
                    </Alert>
                </Snackbar>

                <Grid item xs={4}>
                    <Select
                        isSearchable
                        placeholder="who's posting"
                        value={this.state.postedBy}
                        onChange={this.handlePostedBy}
                        options={this.state.postNameOption}
                    />
                </Grid>

                <Grid item xs={4}>
                    <FontPicker
                        apiKey={process.env.REACT_APP_GOOGLE_FONT_API}
                        activeFontFamily={this.state.fontFamily}
                        onChange={(nextFont) =>
                            this.setFontFamily(nextFont.family)
                        }
                    />
                </Grid>

                <Grid item xs={12}>
                    <Fab
                        variant="extended"
                        size="large"
                        color="primary"
                        aria-label="add"
                        style={floatingIcon1}
                        onClick={this.props.goBack}
                        >
                        Go back to editor
                    </Fab>
                    <Fab
                        variant="extended"
                        size="large"
                        color="primary"
                        aria-label="add"
                        style={floatingIcon2}
                        onClick={() => alert("posted")}
                        >
                        Let's Post
                    </Fab>
                </Grid>
            </Grid>
         );
    }
}

  // get html from local storage
  function getFromLS() {
    let ls
      if (localStorage.getItem("state") !== null) {
        try {
          ls = JSON.parse(localStorage.getItem("state"));
        } catch (e) {
          console.log("error", e)
        }
      } else{
        ls = ""
      }
      return ls;
  }

export default WizardTwo;