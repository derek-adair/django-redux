import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({common, handleLogout, profile}) => (
<nav className="navbar navbar-expand-lg navbar-dark bg-primary" role="navigation" id="header">
    <div className="container">
  <a className="navbar-brand" href="/">Django-Redux</a>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="navbar-nav mr-auto">
                { common.loggedIn && (
                  <li className="nav-item">
                          <Link to={`/u/${profile.username}/`} className="nav-link">Profile</Link>
                  </li>
                )}
             </ul>
            <ul className="navbar-nav">
                { !common.loggedIn && (
                  <li className="nav-item">
                    <Link to="/signup" className="nav-link">Login/Sign Up</Link>
                  </li>
                )}
                { common.loggedIn && (
                  <li className="nav-item">
                    <a href="/logout" onClick={handleLogout} className="nav-link">Logout</a>
                  </li>
                )}
            </ul>
        </div>
    </div>
</nav>
)

export default Nav
