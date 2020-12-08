import  React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Error from './error'
import Home from '../landingPage/home'
import Editor from '../editor/mainEditor'
import MainWrapper from './mainWrapper'
import UserDashboard from '../userProfile/userDashboard'
import Login from '../login/logIn'


// handle private route
const PrivateRoute = ({ component: Component, ...rest }) => {
  let isLoggedIn = global.localStorage.getItem("state")
  return (
    <Route {...rest} render={props => isLoggedIn
      ? (
        <Component key={props.match.params.id || 'empty'} {...props} />
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )
    } />
  )
}

// add routes for all pages
const Pages = () => (
    <Switch>
        <Route protected={false} path="/" exact component={Home}/>
        <Route protected={false} path="/login" exact component={Login}/>
        <PrivateRoute protected={false} path="/edit" exact component={Editor}/>
        <PrivateRoute protected={true} path="/userDashboard" exact component={UserDashboard} />
        <Route component={Error} />
    </Switch>
)

// this will wrap the app into beauty
const wrappedRoutes = (pageProps) => {
  return(
    <>
      <MainWrapper>
        <Route component={Pages} pageProps={pageProps}/>
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
