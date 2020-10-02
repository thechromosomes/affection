import React, { PureComponent } from 'react'
import { ThemeProvider } from 'styled-components'
import styled from 'styled-components';
import Button from '../theming/styledComponent'


const Section = styled.section`
  color: ${props => props.theme.color};
  padding: "3em";
  background: ${props => props.theme.background};
`
class MainWrapper extends PureComponent {
  state = {
    theme : {
      background: "green",
      color: "red"
    }
   }

   changeColor = () => {
    const theme = {...this.state.theme}
    theme.background = "red"
    theme.color = "yellow"
    this.setState({theme})
   }

  render() {
    const { children } = this.props

    return (
      <ThemeProvider theme={this.state.theme}>
        <Section>
          <div>{children}</div>
        </Section>
        <Button onClick={this.changeColor} >change layout</Button>
      </ThemeProvider>
    )
  }
}

export default MainWrapper
