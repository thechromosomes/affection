import React, { PureComponent } from 'react'
import { ThemeProvider } from 'styled-components'
import styled from 'styled-components';
import ThemeButton from './themeButton/themeButtons'
import Header from '../layout/header'



const Section = styled.section`
  color: ${props => props.theme.color};
  padding: "3em";
  text-align: center;
  background: ${props => props.theme.background};
`
// const originalLayouts = getFromLS();
// const originalLayouts = JSON.parse({"background":"linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)","color":"black"})

class App extends PureComponent {
  state = {
    // theme : JSON.parse(JSON.stringify(originalLayouts)),
    theme : {
      background: "white",
      color: "black"
    }
   }

   changeColor = (color) => {
    console.log(color)
    const theme = {...this.state.theme}
    theme.background = color.css
    theme.color = color.textColor
    this.setState({theme})
    global.localStorage.setItem(
      "color",
      JSON.stringify(theme)
    )
   }

  render() {
    const { children } = this.props

    return (
      <ThemeProvider theme={this.state.theme}>
        <Section>
         <Header />
        <ThemeButton handleClick={ (color) => this.changeColor(color)}/>
          <>{children}</>
        </Section>
      </ThemeProvider>
    )
  }
}

function getFromLS() {
  let ls = {};
      if (global.localStorage.getItem("color") !== null) {
        try {
          ls = JSON.parse(global.localStorage.getItem("color"));
        } catch (e) {
          console.log("error", e)
        }
      } else{
        ls = JSON.parse({"background":"linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)","color":"black"})
      }
      return ls;
}

export default App
