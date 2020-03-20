import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { has, get } from 'lodash'

import LoginForm from '../components/forms/LoginForm'
import RegisterForm from '../components/forms/RegisterForm'
import ForgotPasswordForm from '../components/forms/ForgotPasswordForm'
import { submitLogin, submitRegister, submitForgotPassword } from '../actions'

class SignupContainer extends Component {

  static propTypes = {
    submitLogin: PropTypes.func.isRequired
  }
  
  constructor(props){
    super(props)
    this.triggerReset = this.triggerReset.bind(this)
  }

  triggerReset(e){
    e.preventDefault()
    this.setState({ resetPassword: true})
  }

  render(){
    const 
        {submitLogin, submitRegister, submitForgotPassword, password_reset_msg}  = this.props
    ;

    // LODASH get: https://lodash.com/docs/4.17.15#get
    // checks to see if reset password link has been clicked
    if (get(this, 'state.resetPassword', false)){
      if ( password_reset_msg ) {
          return (<div><h1>Forgot Password?</h1><p>{password_reset_msg}</p></div>)
      } else {
        return (<ForgotPasswordForm handleReset={submitForgotPassword} resetSubmitted={this.resetSubmitted} />)
      }
    }
    return (
      <div className="container">
        <LoginForm submitLogin={submitLogin} />
        <a href="#" onClick={this.triggerReset} >Forgot Password?</a>
      <hr />
        <RegisterForm submitRegister={submitRegister} />
      </div>
    )
  }
}  

const mapStateToProps = (state, ownProps) => {
    // grab the password_reset_msg
    // defaults to false
    let {msg:{reset_password: password_reset_msg = false}} = state

    return {
      password_reset_msg
    }
}
export default withRouter(connect(mapStateToProps, {
    submitLogin,
    submitRegister,
    submitForgotPassword
})(SignupContainer))
