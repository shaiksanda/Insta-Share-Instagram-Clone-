import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'
import {HiHome} from 'react-icons/hi'
import {CgProfile} from 'react-icons/cg'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

class Header extends Component {
  handleLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <div className="header-container">
        <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dq4yjeejc/image/upload/v1727945534/logo_fk7sop.png"
              alt="website logo"
              className="website-logo-header"
            />
          </Link>
          <h1 className="insta-share-heading-header">Insta Share</h1>
        </div>
        <div className="small-container">
          <Link to="/" className="nav-item-link">
            <HiHome className="nav-item-link" size={20} />
          </Link>
          <button className="button" type="button" testid="searchIcon">
            <FaSearch />
          </button>
          <CgProfile size={20} />
          <FiLogOut onClick={this.handleLogout} size={20} />
        </div>
        <div className="medium-container">
          <div className="search-box">
            <input
              className="search-input"
              type="search"
              placeholder="Search Caption"
            />
            <button className="button" type="button" testid="searchIcon">
              <FaSearch />
            </button>
          </div>
          <Link
            to="/"
            className="header-link nav-item-link"
            style={{color: '#4094EF'}}
          >
            Home
          </Link>
          <Link className="header-link nav-item-link" to="/profile">
            Profile
          </Link>
          <button
            onClick={this.handleLogout}
            type="button"
            className="logout-button"
          >
            Logout
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
