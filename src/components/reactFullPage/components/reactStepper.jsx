import React from 'react';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import StepButton from '@material-ui/core/StepButton';
import Button from "@material-ui/core/Button";

const VerticalStepper = (props) => {
    return (
        <>
        <Stepper activeStep={props.activeWall} orientation="vertical" nonLinear>
        {props.posts.map((label, index) => (
          <Step key={Math.random()}>
            <StepButton
              onClick={() => props.handleBack(index)}
            >
            </StepButton>
          </Step>
        ))}
      </Stepper>
        </>
     );
}

export default VerticalStepper;