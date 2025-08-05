import React, { useContext } from 'react'
import './navbar.scss'
import logo from '../../assets/logo1.png';
import avatar from '../../assets/avatar.png';
import { Search, NotificationsActive, ArrowDropDown } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../authContext/AuthContext'
import { logout } from '../../authContext/AuthActions'

const Navbar = () => {

  const [isScrolled, setIsScrolled] = React.useState(false);
  const { dispatch } = useContext(AuthContext);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  }

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img src={logo} alt="logo" />
          <Link to="/" className='link'><span>Home</span></Link>
          <Link to="/movies" className='link'><span>Movies</span></Link>
          <Link to="/series" className='link'><span>Series</span></Link>

          <Link to="/new" className="link"><span>New</span></Link>
          <Link to="/my-list" className="link"><span>My List</span></Link>

        </div>
        <div className="right">
          <Search className='icon' />
          <span>KID</span>
          <NotificationsActive className='icon' />
          <img src={avatar} alt="profile" />

          <div className="profile">
            <ArrowDropDown className='icon' />

            <div className="options">
              <span>Settings</span>
              <span onClick={() => dispatch(logout())}>Logout</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Navbar
