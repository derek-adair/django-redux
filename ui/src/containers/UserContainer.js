/* eslint-disable no-undef */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { reduce } from 'lodash'

import { 
  loadUser,
} from '../actions'
import User from '../components/User'
import List from '../components/List'

const loadData = ({ username, loadUser, loadUserClips}) => {
  loadUser(username)
}

class UserContainer extends Component {
  static propTypes = {
    user: PropTypes.object,
    loadUser: PropTypes.func.isRequired,
  }
  
  componentDidMount() {
    loadData(this.props)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.username !== this.props.username) {
      loadData(this.props)
    }
  }
  render() {
    const 
        user = this.props.user
    ;

    if(!user){
        return (<h1>Loading User...</h1>)
    }

    return (
      <div>
        <h1>{user.username}'s Profile</h1>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const username = ownProps.match.params.username

  const {
    profile,
    common,
    entities: { users, },
  } = state

  return {
    username,
    profile,
    common,
    user: users[username],
  }
}

export default withRouter(connect(mapStateToProps, {
  loadUser,
})(UserContainer))
