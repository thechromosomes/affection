import React, { PureComponent } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from './router'


class App extends PureComponent {

  render() {
    return (
      <BrowserRouter>
        <>
          <Router />
        </>
      </BrowserRouter>
    )
  }
}



export default App
