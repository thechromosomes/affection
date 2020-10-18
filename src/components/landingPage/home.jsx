import React, { Component } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import ScrollAnimation from 'react-animate-on-scroll';
import { FullPage, Slide } from 'react-full-page';

const flipperStyle = {
    width: "100%",
    height: "100%",
    textAlign: "center",
    display: "inline-block"
}
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flippy: "",
            littleTempArray: [1,11,1111,12,132,12,13243,1232,1323,1323,132,1323,132,132]
         }
    }

    scrole = (data) => {
        console.log('scrole', data)
        // alert("scrole")
    }
    render() {
        return (
            <>
            <FullPage afterChange={this.scrole}>
            {this.state.littleTempArray.map( elem => (
                <Slide >
                    <ScrollAnimation animateIn='wobble' animateOut='wobble' initiallyVisible={true} style={{height: "100%"}}>
                        <Flippy
                            flipOnHover={false}
                            flipOnClick={true}
                            style={flipperStyle}
                            >
                            <FrontSide style={{backgroundColor: '#41669d'}}>
                                RICK
                            </FrontSide>
                            <BackSide style={{ backgroundColor: '#175852'}}>
                                ROCKS
                                <div><a href={`https://www.pluralsight.com/guides/how-to-render-%22a%22-with-optional-href-in-react`}>fdgdfg</a></div>
                            </BackSide>
                        </Flippy>
                    </ScrollAnimation>
                </Slide>
            ))}
            </FullPage>
            </>
         );
    }
}

export default Home;