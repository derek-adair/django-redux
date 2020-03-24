import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { resetErrorMessage, loadProfile, handleLogout, } from '../actions'
import { has, each } from 'lodash'

import Nav from '../components/Nav'
const loadData = props => {
  const { profile, loadProfile, common } = props

  if(common.loggedIn){
    loadProfile()
  }
}

export class App extends Component {
  static propTypes = {
    // Injected by React Redux
    error: PropTypes.shape({
        message: PropTypes.string.isRequired,
        text: PropTypes.string
    }),
    resetErrorMessage: PropTypes.func.isRequired,
    loadProfile: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired,
    // Injected by React Router
    children: PropTypes.node
  }


  componentDidMount(){
		const token = window.localStorage.getItem('jwt');
    loadData(this.props)
  }

  componentDidUpdate(prevProps){
    if(prevProps.profile !== this.props.profile && this.props.profile.username !== null){
      // Trigger an action after the profile is laoded or changes
      //Example: this.props.someAction(this.props.profile.username)
    }

  }
  handleDismissClick = e => {
    this.props.resetErrorMessage()
    e.preventDefault()
  }

  handleChange = nextValue => {
    this.props.history.push(`/${nextValue}`)
  }

  renderErrorMessage() {
    const { error } = this.props
    if (!error || !has(error, 'response.data')) {
      return null
    }

    let { non_field_errors,  ...field_errors} = error.response.data,
      field_error_msgs = [];


    if (typeof error.response.data === "object") {
      each(field_errors, function(field_error, key){
        each(field_error, function(msg){
         field_error_msgs.push(msg)
        })
      })
    } else {
        // If there is no message and response.data is a string...
        error.message = error.response.data
    }
    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <div className="container">
       <b>
        {error.message}

        { non_field_errors && 
            (<span>: <ul>{non_field_errors.map(error=>(<li>{error}</li>))}</ul></span>)}

        { field_error_msgs && 
            (<span>: <ul>{field_error_msgs.map(error=>(<li>{error}</li>))}</ul></span>)}
      </b>

        <button className="float-right" onClick={this.handleDismissClick}>
          Dismiss
        </button>
      </div>
      </p>
    )
  }

  render() {
    return (
      <div>
				<Nav {...this.props} />
        {this.renderErrorMessage()}
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  error: state.error,
  profile: state.profile,
  common: state.common
})

export default withRouter(connect(mapStateToProps, {
  resetErrorMessage,
  loadProfile,
  handleLogout
})(App))
