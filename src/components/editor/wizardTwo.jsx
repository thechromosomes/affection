import React, { Component } from 'react';
import { SketchPicker } from 'react-color'
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Select from 'react-select';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const colorPicked = {
    margin: "auto",
    padding: "15",
}

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
            tagInputValue: ""
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
            <>
                <div>
                <button onClick={this.handleClickOpenClose}>Choose color</button>
                <Dialog
                fullScreen
                open={this.state.openColorPellete}
                TransitionComponent={Transition}
                PaperProps={{ style: {backgroundColor: this.state.wallColor} }}
                >
                <div style={colorPicked}>
                    <SketchPicker
                    width={400}
                    color={ this.state.wallColor }
                    onChange={ this.handleChange }
                    />
                <button onClick={this.handleClickOpenClose}>I am done</button>
                </div>
                </Dialog>

                {this.renderInsertTags()}
                <Select
                    isMulti
                    isSearchable
                    placeholder="select or create tags"
                    value={this.state.tags}
                    onChange={this.handleTagChange}
                    options={this.state.tagsOptions}
                    onInputChange={this.handleInputChange}
                />
                </div>

                <div>
                    <button onClick={this.props.previousStep}>Previous Step</button>
                    <button onClick={this.props.nextStep}>Next Step</button>
                    <button onClick={this.props.firstStep}>First Step</button>
                </div>
            </>
         );
    }
}

export default WizardTwo;