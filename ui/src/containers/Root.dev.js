import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import DevTools from './DevTools'
import { Switch, Route } from 'react-router-dom'

//Containers 
import App from './App'
import UserContainer from './UserContainer'
import SignupContainer from './SignupContainer'
import HomeContainer from './HomeContainer'
import ConfirmResetPasswordContainer from './ConfirmResetPasswordContainer'

const Root = ({ store }) =>{
  
  return (
  <Provider store={store}>
    <div>
      <Route path="/" 
             component={App} />
    <Switch>
      <div className="container">
        <Route exact path="/" 
               component={HomeContainer} 
        />
        <Route exact path="/signup/"
               component={SignupContainer} 
        />
        <Route exact path="/u/:username/"
               component={UserContainer} 
        />
        <Route path="/reset-password/:uid/:token/"
               component={ConfirmResetPasswordContainer} 
        />
      </div>
    </Switch>
    <DevTools />
    </div>
  </Provider>
)
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root
