import  React from 'react'
import { Route, Switch } from 'react-router-dom'
import Error from './error'
import Home from '../landingPage/home'
import Editor from '../editor/mainEditor'
import MainWrapper from './mainWrapper'
import UserDashboard from '../userProfile/userDashboard'
import Login from '../login/logIn'



// add routes for all pages
const Pages = () => (
    <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/edit" exact component={Editor}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/userDashboard" exact component={UserDashboard}/>

        <Route component={Error} />
    </Switch>
)

// this will wrap the app into beauty
const wrappedRoutes = () => {
  return(
    <>
      <MainWrapper>
        <Route component={Pages} />
      </MainWrapper>

    </>
  )
}

// this will specify route
const Router = () => {
    return (
      <Route component={wrappedRoutes} />
    )
}

export default Router;
