import {Component} from 'react'
import {Link, Redirect, withRouter} from 'react-router-dom'
import {ImCross} from 'react-icons/im'
import {HiOutlineSearch} from 'react-icons/hi'
import Cookies from 'js-cookie'

import './index.css'

class Header extends Component {
  state = {
    showMenu: false,
    showSearchBar: false,
  }

  onClickShowSearchBar = () => {
    this.setState({showSearchBar: true})
  }

  onClickShowMenu = () => {
    this.setState({showMenu: true})
  }

  onClickHideMenu = () => {
    this.setState({showMenu: false})
  }

  onEnterSearchInput = () => {
    const {enterSearchInput} = this.props
    enterSearchInput()
  }

  onChangeSearchInput = event => {
    const {changeSearchInput} = this.props
    changeSearchInput(event.target.value)
  }

  renderSearchInput = () => {
    const {searchInput} = this.props

    return (
      <div className="search-container-div">
        <input
          type="search"
          className="input-element"
          onChange={this.onChangeSearchInput}
          value={searchInput}
        />
        <button
          type="button"
          onClick={this.onEnterSearchInput}
          className="menu-btn"
          testid="searchButton"
        >
          <HiOutlineSearch className="search-Hi-icon" />
        </button>
      </div>
    )
  }

  render() {
    const {showMenu, showSearchBar} = this.state
    console.log(showSearchBar)
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <nav className="nav-container">
        <div className="nav-responsive-container">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657426908/lg-devices-logo_rpfa68.png"
              className="app-logo"
              alt="website logo"
            />
          </Link>
          <div className="large-screen-container">
            <ul className="ul-large-lists">
              <Link to="/" className="head-link">
                <li className="list-item">Home</li>
              </Link>
              <Link to="/popular" className="head-link">
                <li className="list-item">Popular</li>
              </Link>
            </ul>
            <div className="profile-and-search-div">
              {showSearchBar ? (
                this.renderSearchInput()
              ) : (
                <Link to="/search">
                  <button
                    type="button"
                    className="menu-btn"
                    testid="searchButton"
                    onClick={this.onClickShowSearchBar}
                  >
                    <HiOutlineSearch className="search-Hi-icon" />
                  </button>
                </Link>
              )}
              <Link to="/account">
                <img
                  src="https://res.cloudinary.com/dtvpdvwm9/image/upload/v1659950732/Avatar_qqrscp.png"
                  alt="profile"
                  className="avatar-img"
                />
              </Link>
            </div>
          </div>

          <div className="nav-mobile-container">
            {showSearchBar ? (
              this.renderSearchInput()
            ) : (
              <Link to="/search">
                <button
                  type="button"
                  className="menu-btn"
                  testid="searchButton"
                  onClick={this.onClickShowSearchBar}
                >
                  <HiOutlineSearch className="search-Hi-icon" />
                </button>
              </Link>
            )}

            <button
              type="button"
              className="menu-btn"
              onClick={this.onClickShowMenu}
            >
              <img
                src="https://res.cloudinary.com/dtvpdvwm9/image/upload/v1659953477/add-to-queue_1_1_lft2pf.png"
                alt="menu"
                className="menu-bar"
              />
            </button>
          </div>
        </div>
        {showMenu && (
          <div className="nav-mobile-div">
            <ul className="ul-mobile-list">
              <Link to="/" className="head-link">
                <li className="list-item">Home</li>
              </Link>
              <Link to="/popular" className="head-link">
                <li className="list-item">Popular</li>
              </Link>
              <Link to="/account" className="head-link">
                <li className="list-item">Account</li>
              </Link>
              <button
                className="menu-btn"
                type="button"
                onClick={this.onClickHideMenu}
                testid="searchButton"
              >
                <ImCross className="list-item" />
              </button>
            </ul>
          </div>
        )}
      </nav>
    )
  }
}
export default withRouter(Header)
