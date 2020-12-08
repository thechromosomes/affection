import React from 'react';
import PropTypes from 'prop-types';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from '@material-ui/core/StepButton';
import StepLabel from '@material-ui/core/StepLabel';
import Icon from '@material-ui/core/Icon';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


let controllerStyle = {
  right: "0px",
}

export default class Controls extends React.Component {
  renderSlidesNumbers(currentSlideIndex) {
    const { slidesCount, scrollToSlide } = this.props;
    const slidesNumbers = [];
    // for (let i = 0; i < slidesCount; i++) {
    //   let stepperComponent =
    //   <Step key={i}>
    //       <StepLabel StepIconComponent={()=>this.ColorlibStepIcon(i)} ></StepLabel>
    //   </Step>
    //   slidesNumbers.push(stepperComponent);
    // }
    return (
      <Step key={currentSlideIndex}>
        <StepLabel StepIconComponent={()=>this.ColorlibStepIcon(currentSlideIndex )} ></StepLabel>
        <StepLabel StepIconComponent={()=>this.ColorlibStepIcon(currentSlideIndex + 1)} ></StepLabel>
        <StepLabel StepIconComponent={()=>this.ColorlibStepIcon(currentSlideIndex + 2)} ></StepLabel>
        <StepLabel StepIconComponent={()=>this.ColorlibStepIcon(currentSlideIndex + 3)} ></StepLabel>
      </Step>
    )
  }

  ColorlibStepIcon(i) {
    return (
      <div>
        <Button onClick={() => this.props.scrollToSlide(i)} variant="contained">image{i}</Button>
      </div>
    );
  }

  render() {
    const {
      getCurrentSlideIndex, slidesCount, style, className,
    } = this.props;
    const currentSlideIndex = getCurrentSlideIndex();

    return (
      <div className="stppppper">
      <Stepper orientation="vertical" nonLinear style={controllerStyle} activeStep={currentSlideIndex}>
      {this.renderSlidesNumbers(currentSlideIndex)}
      </Stepper>
      </div>

    );
  }
}

Controls.propTypes = {
  className: PropTypes.string,
  getCurrentSlideIndex: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  scrollToSlide: PropTypes.func.isRequired,
  slidesCount: PropTypes.number.isRequired,
  style: PropTypes.object,
};

Controls.defaultProps = {
  className: 'full-page-controls',
  style: {},
};
