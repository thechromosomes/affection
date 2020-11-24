import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import { FullPage, Slide } from '../reactFullPage';
import Modal from 'react-modal';


import './home.css'

const flipperStyle = {
    width: "100%",
    height: "100%",
    textAlign: "center",
    display: "inline-block",
}
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [1,11,1111,12,132,12,13243,1232,1323,1323,132,1323,132,132, 123, 123123,23123,213123,1323213,123,123,123,123,123,12,312,3, 111,12,132,12,13243,1232,1323,1323,132,1323,132,132, 123, 123123,23123,213123,1323213,123,123,123,123,123,12,312,3, 1,11,1111,12,132,12,13243,1232,1323,1323,132,1323,132,132, 123, 123123,23123,213123,1323213,123,123,123,123,123,12,312,3, 111,12,132,12,13243,1232,1323,1323,132,1323,132,132, 123, 123123,23123,213123,1323213,123,123,123,123,123,12,312,3],
            activeWall:0,
            currentSlide:0,
            showModal: false
        }
    }

    scrole = (data) => {
        this.setState({activeWall: data.to})
    }

    render() {
        return (
            <Grid container>
             <Grid item xs={10} sm={10} md={11} lg={11} xl={11}>
                 <Modal
                    isOpen={this.state.showModal}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={() => this.setState({ showModal: false })}
                    // style={customStyles}
                    contentLabel="Example Modal"
                    >
                    <button onClick={() => this.setState({ showModal: false })}>close</button>
                    <p>What is Lorem Ipsum?
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </Modal>
                </Grid>
                {this.state.showModal == false &&
                <Grid item xs={10} sm={10} md={11} lg={11} xl={11}>
                    <FullPage afterChange={this.scrole} initialSlide={this.state.currentSlide} controls>
                    {this.state.posts.map( (elem, index) => (
                    <Slide id={index}>
                        What is Lorem Ipsum?
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                        What is Lorem Ipsum?
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                        What is Lorem Ipsum?
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        <Button onClick={() => this.setState({ showModal: true })}>open dialog</Button>
                    </Slide>
                    ))}
                    </FullPage>
                </Grid>}
            </Grid>
         );
    }
}

export default Home;