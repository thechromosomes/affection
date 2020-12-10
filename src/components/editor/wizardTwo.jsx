import React, { Component } from 'react';
import { SketchPicker } from 'react-color'
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Select from 'react-select';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import WallPreview from './wallPreview'




const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// flaoating icon
const floatingIcon1 = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    marginLeft:"10px"
};

// flaoating icon 2
const floatingIcon2 = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 75,
    left: 'auto',
    position: 'fixed',
}


class WizardTwo extends Component {
    constructor(props) {
        super(props);
        console.log("props from w2", props)
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
            postedBy: null,
            postNameOption: [
                { value: 'anonymous', label: 'anonymous' },
                { value: 'chromosome', label: 'chromosome' },
            ],
        }
    }

    handleChange = (color) => {
        this.setState({ wallColor: color.hex });
    }

    handleClickOpenClose = () => {
        this.setState({openColorPellete: !this.state.openColorPellete})
    };

    handleTagChange = tags => {
        this.setState({tags});
        this.setState({tagInputValue: ""})
      };

      handleInputChange = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '');
        if (inputValue){
            this.setState({tagInputValue: inputValue})
        }

      };

      handlePostedBy = (postedBy) => {
        this.setState({ postedBy });
      }

      createTag = () => {
          let tags =  [...this.state.tags]
          let inputData = {"value":this.state.tagInputValue, "label": this.state.tagInputValue }
          tags.push(inputData)
          this.setState({tags})
          this.setState({tagInputValue: ""})
      }

      renderInsertTags = () => {
        let filterTag = this.state.tagsOptions.filter(tag => tag.value === this.state.tagInputValue)
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

                {this.renderInsertTags()}

                {/* rendering wall preview component */}
                <WallPreview
                    editorHtml={this.props.editorHtml}
                    mainHeading={this.props.mainHeading}
                    wallColor={this.state.wallColor}
                    handleClickOpenClose={this.handleClickOpenClose}
                />

                <Grid item xs={6}>
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
                <Grid item xs={6}>
                    <Select
                        isSearchable
                        placeholder="name your post"
                        value={this.state.postedBy}
                        onChange={this.handlePostedBy}
                        options={this.state.postNameOption}
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

export default WizardTwo;