/* eslint-disable no-undef */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { reduce } from 'lodash'

import { 
  loadUsers,
} from '../actions'
import List from '../components/List'
import User from '../components/User'

const loadData = ({loadUsers, }) => {
    loadUsers()
}

export class HomeContainer extends Component {
  static propTypes = {
    loadUsers: PropTypes.func.isRequired,
  }

  constructor(props){
    super(props)
    this.renderUser = this.renderUser.bind(this)
  }

  componentDidMount() {
    loadData(this.props)
  }

  renderUser( user ) {
    return (
        <User
          user={user} 
          key={user.id}
        />
    )
  }

  handleLoadMoreClick = () => {
    this.props.loadUsers(true)
  }

  render() {
    const
        users = this.props.users
    ;

    if (Object.keys(users).length === 0 && users.constructor === Object) {
      return <h1><i>Loading users...</i></h1>
    }

    console.log(users)

    return (
      <div>
        <h1>Welcome to Django-Redux Starter App</h1>
        <List
            renderItem={this.renderUser}
            items={users}
            className="user-list"
            onLoadMoreClick={this.handleLoadMoreClick}
            loadingLabel={`Loading users...`}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    profile,
    common,
    entities: { users, },
    pagination: { userPagination }
  } = state

  const usersToGrab = userPagination['users'] || {ids:[]}
  const userList = usersToGrab.ids.map(id => users[id])

  return {
    users: userList,
    common,
    profile,
    userPagination
  }
}

export default withRouter(connect(mapStateToProps, {
  loadUsers,
})(HomeContainer))
