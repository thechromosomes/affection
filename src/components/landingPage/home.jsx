import React, { Component } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import Grid from '@material-ui/core/Grid'
import ScrollAnimation from 'react-animate-on-scroll';
import { FullPage, Slide } from '../reactFullPage';
import Header from '../layout/header'

import './home.css'

const flipperStyle = {
    width: "100%",
    height: "90%",
    textAlign: "center",
    display: "inline-block",
}
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flippy: "",
            posts: [1,11,1111,12,132,12,13243,1232,1323,1323,132,1323,132,132, 123, 123123,23123,213123,1323213,123,123,123,123,123,12,312,3, 111,12,132,12,13243,1232,1323,1323,132,1323,132,132, 123, 123123,23123,213123,1323213,123,123,123,123,123,12,312,3, 1,11,1111,12,132,12,13243,1232,1323,1323,132,1323,132,132, 123, 123123,23123,213123,1323213,123,123,123,123,123,12,312,3, 111,12,132,12,13243,1232,1323,1323,132,1323,132,132, 123, 123123,23123,213123,1323213,123,123,123,123,123,12,312,3],
            activeWall:0,
            currentSlide:0

        }
    }

    scrole = (data) => {
        console.log('scrole', data.to)
        this.setState({activeWall: data.to})
    }

    handleBack = (event) => {
        this.setState({currentSlide: event})
        this.setState({posts: [1,11,1111,12,132,12,13243,1232,1323,1323,132,133,132,132, 123, 123123,23123,213123,1323213,123,123,123,123,123,12,312,3]})
        console.log("event", event)
    }
    render() {
        return (
            <Grid container>
                <Grid item xs={1}>
                    {/* <h1>this is custom</h1> */}
                </Grid>
                <Grid item xs={11}>
                    <FullPage afterChange={this.scrole} initialSlide={this.state.currentSlide} controls>
                    {this.state.posts.map( (elem, index) => (
                    <Slide>
                            <Flippy
                                flipOnHover={false}
                                flipOnClick={true}
                                style={flipperStyle}
                                >
                                <FrontSide style={{backgroundColor: '#41669d'}}>
                                    <div>
                                    <ScrollAnimation animateIn='bounce' animateOut='bounce' initiallyVisible={true}>
                                            What is Lorem Ipsum?
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                                            What is Lorem Ipsum?
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                                            What is Lorem Ipsum?
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                                    </ScrollAnimation>
                                    </div>
                                </FrontSide>
                                <BackSide style={{ backgroundColor: '#175852'}}>
                                    <div>
                                        <h1>header here</h1>
                                    </div>
                                    <div><a href={`https://www.pluralsight.com/guides/how-to-render-%22a%22-with-optional-href-in-react`}>fdgdfg</a></div>
                                </BackSide>
                            </Flippy>
                    </Slide>
                    ))}
                    </FullPage>
                </Grid>
            </Grid>
         );
    }
}

export default Home;