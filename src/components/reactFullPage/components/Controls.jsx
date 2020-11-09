import React from 'react';
import PropTypes from 'prop-types';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from '@material-ui/core/StepButton';

let controllerStyle = {
  marginLeft: "-8%",
  textAlign: "center",
}

export default class Controls extends React.Component {
  renderSlidesNumbers(currentSlideIndex) {
    const { slidesCount, scrollToSlide } = this.props;
    const slidesNumbers = [];
    for (let i = 0; i < slidesCount; i++) {
      let stepperComponent =
      <Step key={i}>
        <StepButton onClick={() => scrollToSlide(i)}></StepButton>
      </Step>

      slidesNumbers.push(stepperComponent);
    }
    return slidesNumbers;
  }

  render() {
    const {
      getCurrentSlideIndex, slidesCount, style, className,
    } = this.props;
    const currentSlideIndex = getCurrentSlideIndex();

    return (
      <Stepper orientation="vertical" nonLinear style={controllerStyle} activeStep={currentSlideIndex}>
      {this.renderSlidesNumbers(currentSlideIndex)}
      </Stepper>

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
