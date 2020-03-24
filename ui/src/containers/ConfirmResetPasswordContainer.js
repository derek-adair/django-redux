import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import ResetPasswordForm from '../components/forms/ResetPasswordForm'
import { submitResetPassword } from '../actions'

class SignupContainer extends Component {

  render(){
    const 
        {submitResetPassword, uid, token, reset_password_success}  = this.props
    ;

    if (reset_password_success){
        return (<div>
            <h1>Reset Password</h1> 
            <p>Your password has been reset, please <Link to="/signup">Login</Link>.</p>
        </div>)
    }
    return (<ResetPasswordForm handleReset={submitResetPassword} uid={uid} token={token} />)
  }
}  

const mapStateToProps = (state, ownProps) => {
    // grab the password_reset_msg
    // defaults to false
    let {msg:{reset_password_success: reset_password_success = false}} = state
    return {
        uid: ownProps.match.params.uid, 
        token: ownProps.match.params.token,
        reset_password_success
    }
}
export default withRouter(connect(mapStateToProps, {
    submitResetPassword,
})(SignupContainer))
