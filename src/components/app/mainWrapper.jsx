import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from '../layout/header/header'
import {createGlobalStyle} from 'styled-components';
import Theme from './themeButton/themeProvider'



const GlobalStyle = createGlobalStyle`
html {
  background: ${props => props.value.theme.background};
  height: 100%;
  background-size: cover;
  justify-content: center;
  text-align: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
`

const originalLayouts = getFromLS();

class MainWrapper extends Component {
    static propTypes = {
      children: PropTypes.element.isRequired
    }

    state = {
        theme : JSON.parse(JSON.stringify(originalLayouts)),
    }

    changeColor = (color) => {
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
    const currentPath = children.props.pageProps.location.pathname
    return (
        <>
          <Theme.Provider  value={{changeTheme: this.changeColor, theme: this.state.theme}}>
              <GlobalStyle value={{theme: this.state.theme}}/>
              {(currentPath !== "/")
                ? <>
                <Header/>
                {children}
                </>

                : <>
                {children}
                </>
              }
          </Theme.Provider>
        </>
    )
  }
}

function getFromLS() {
    let ls = {};
        if (localStorage.getItem("color") !== null) {
          try {
            ls = JSON.parse(localStorage.getItem("color"));
          } catch (e) {
            console.log("error", e)
          }
        } else{
          ls = JSON.parse(`{"background":"linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)","color":"black"}`)
        }
        return ls;
  }

export default MainWrapper
