import  React from 'react'
import { Route, Switch } from 'react-router-dom'
import Error from './error'
import Home from '../landingPage/home'
import App from '../app/App'
import Footer from '../layout/footer'
import Editor from '../editor/mainEditor'

// add routes for all pages
const Pages = () => (
    <Switch>
        <Route path="/edit" exact component={Editor}/>
        <Route component={Error} />
    </Switch>
)

// this will wrap the app into beauty
const wrappedRoutes = () => (
    <div>
      <App>
          <Route component={Pages} />
      </App>
      <Footer/>
    </div>
  )

// this will specify route
const Router = () => {
    return (
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route component={wrappedRoutes} />
          </Switch>
        </main>
    )
}

export default Router;
