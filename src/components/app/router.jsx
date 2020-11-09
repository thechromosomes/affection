import  React from 'react'
import { Route, Switch } from 'react-router-dom'
import Error from './error'
import Home from '../landingPage/home'
import Editor from '../editor/mainEditor'
import MainWrapper from './mainWrapper'



// add routes for all pages
const Pages = () => (
    <Switch>
        <Route path="/edit" exact component={Editor}/>
        <Route path="/" exact component={Home} />
        <Route component={Error} />
    </Switch>
)

// this will wrap the app into beauty
const wrappedRoutes = () => (
    <>
      <MainWrapper>
        <Route component={Pages} />
      </MainWrapper>

    </>
  )

// this will specify route
const Router = () => {
    return (
      <Route component={wrappedRoutes} />
    )
}

export default Router;
