import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({common, handleLogout, profile}) => (
<nav className="navbar navbar-expand-md navbar-static-top navbar-default navbar-header-full navbar-dark yamm" role="navigation" id="header">
    <div className="container">
        <div className="navbar-header">
            <button type="button" className="navbar-toggle d-inline d-md-none" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span>
                <i className="fa fa-bars"></i>
            </button>
            <a id="ar-brand" className="navbar-brand d-inline d-md-none" href="index.html">Schmusi<span>.</span>cc</a>
        </div> 

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="navbar-nav mr-auto">
                { common.loggedIn && (
                  <li className="nav-item">
                          <Link to={`/u/${profile.username}/`}>Profile</Link>
                  </li>
                )}
                { common.loggedIn && (
                  <li className="nav-item">
                          <Link to="/upload/">Upload</Link>
                  </li>
                )}
                { common.loggedIn && (
                  <li className="nav-item">
                          <Link to="/library/">Library</Link>
                  </li>
                )}
             </ul>
            <ul className="navbar-nav">
                { !common.loggedIn && (
                  <li className="nav-item">
                    <Link to="/signup">Login/Sign Up</Link>
                  </li>
                )}
                { common.loggedIn && (
                  <li className="nav-item d-inline d-md-none">
                    <a href="/logout" onClick={handleLogout}>Logout</a>
                  </li>
                )}
            </ul>
        </div>
    </div>
</nav>
)

export default Nav
