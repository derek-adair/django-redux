import React from 'react'
import { Link } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.
const Header = ({common, profile, handleLogout}) => (
<header id="header-full-top" className="d-none d-md-block header-full clearfix">
    <div className="container">
        <div className="header-full-title">
            <h1 className="animated fadeInRight"><Link to="/">Django-Redux</Link></h1>
            <p className="animated fadeInRight">Simple boilerplate for a django-redux app</p>
        </div>
        <nav className="top-nav">
  {common.loggedIn && <span id="header-profile">{profile.username}</span>}


  {common.loggedIn && (
            <div className="dropdown animated fadeInDown animation-delay-11">
                <a href="/" className="btn-logout"  onClick={handleLogout}><i className="fa fa-user"></i> Logout</a>
            </div> 

  )}
  </nav>
  </div>
</header> 
)

export default Header
