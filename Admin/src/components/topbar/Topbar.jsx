// import React, { useContext } from 'react';
// import './topbar.css';
// import logo from '../../assets/logo3.png';
// import avatar from '../../assets/avatar.png';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../context/authContext/AuthContext';
// import { NotificationsNone, Language, Settings } from '@mui/icons-material';

// const Topbar = () => {
//   const { dispatch } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch({ type: 'LOGOUT' }); // Use AuthContext's logout
//     navigate('/login'); // Redirect to login page
//   };

//   return (
//     <div className='topbar'>
//       <div className="topbarWrapper">
//         <div className="topLeft">
//           <img src={logo} alt="Logo" />
//         </div>

//         <div className="topRight">
//           <button className='logout' onClick={handleLogout}>
//             LogOut
//           </button>
//           <img src={avatar} alt="Avatar" className='topAvatar' />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Topbar;


import React, { useContext } from "react";
import "./topbar.css";
import logo from "../../assets/logo3.png";
import avatar from "../../assets/avatar.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext/AuthContext";
import { Menu } from "@mui/icons-material";

const Topbar = ({ setSidebarOpen }) => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <header className="topbar">
      <div className="topbarWrapper">
        <button
          className="hamburger"
          onClick={() => setSidebarOpen((prev) => !prev)}
          aria-label="Menu"
        >
          <Menu fontSize="inherit" />
        </button>
        <div className="topLeft logoWrapper">
          <img src={logo} alt="Logo" />
        </div>
        <div className="topRight">
          <button className="logout" onClick={handleLogout}>LogOut</button>
          <img src={avatar} alt="Avatar" className="topAvatar" />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
