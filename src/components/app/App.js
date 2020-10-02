import React, {Component} from 'react';
import Button from '../theming/styledComponent';
import { ThemeProvider } from 'styled-components'
import './App.css';

class App extends Component {
    state = {
      theme : {
        border: "black",
        button: "green"
      }
     }

  changeColor = () => {
    const theme = {...this.state.theme}
    theme.button = "red"
    theme.border = "yellow"
    this.setState({theme})
  }

  render() {
    return (
        <>
        <ThemeProvider theme={this.state.theme}>
          <h1>hi there</h1>
          <Button> this is new custom button</Button>
          <Button onClick={this.changeColor} >change the button color</Button>
        </ThemeProvider>
        </>
     );
  }
}

// export default hot(module)(App)
export default App