import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from '../layout/header'
import styled from 'styled-components';
import Theme from './themeButton/themeProvider'



const Section = styled.section`
  color: ${props => props.value.theme.color};
  padding: "3em";
  text-align: center;
  background: ${props => props.value.theme.background};
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
    let homePath = children._owner.memoizedProps.location.pathname

    return (
        <>
        {homePath !== "/" ?
        <Theme.Provider  value={{changeTheme: this.changeColor}}>
        <Section value={{theme: this.state.theme}}>
            <Header/>
            <>{children}</>
        </Section>
        </Theme.Provider>

      : <div>
        <Header/>
        {children}
      </div>}
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
          ls = JSON.parse({"background":"linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)","color":"black"})
        }
        return ls;
  }

export default MainWrapper
