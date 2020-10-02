import  React from 'react'
import { Route, Switch } from 'react-router-dom'
import App from './App';
import Error from './error'
import Header from '../layout/header'
import Footer from '../layout/footer'
import MainWrapper from '../app/MainWrapper'

const Pages = () => (
    <Switch>
        <Route path="/" exact component={App} />
        <Route component={Error} />
    </Switch>
)

const wrappedRoutes = () => (
    <div>
      <Header />
        <MainWrapper>
            <Route path="/" component={Pages} />
        </MainWrapper>
      <Footer/>
    </div>
  )

const Router = () => {
    return (
        <main>
          <Switch>
            <Route path="/" component={wrappedRoutes} />
          </Switch>
        </main>
    )
}

export default Router;
