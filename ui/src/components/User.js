import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  const { username } = user

  return (
    <div className="User">
      <Link to={`/u/${username}`}>
        <h3>
          {username} 
        </h3>
      </Link>
    </div>
  )
}

export default User
