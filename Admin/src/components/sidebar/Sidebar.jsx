// import React from 'react';
// import './sidebar.css';
// import {
//   LineStyle,
//   Timeline,
//   PersonOutline,
//   AddBoxRounded,
//   PlayCircleOutline,
//   List
// } from '@mui/icons-material';
// import { Link, useLocation } from 'react-router-dom';

// const Sidebar = () => {
//   const location = useLocation();
//   const path = location.pathname;

//   return (
//     <div className='sidebar'>
//       <div className="sidebarWrapper">

//         {/* Dashboard */}
//         <div className="sidebarMenu">
//           <h3 className="sidebarTitle">Dashboard</h3>
//           <ul className="sidebarList">
//             <Link to="/" className='link'>
//               <li className={`sidebarListItem ${path === '/' ? 'active' : ''}`}>
//                 <LineStyle className='sidebarIcons' />
//                 Home
//               </li>
//             </Link>

//             <Link to="/analytics" className='link'>
//               <li className={`sidebarListItem ${path === '/analytics' ? 'active' : ''}`}>
//                 <Timeline className='sidebarIcons' />
//                 Analytics
//               </li>
//             </Link>
//           </ul>
//         </div>

//         {/* Quick Menu */}
//         <div className="sidebarMenu">
//           <h3 className="sidebarTitle">Quick Menu</h3>
//           <ul className="sidebarList">
//             <Link to="/users" className='link'>
//               <li className={`sidebarListItem ${path === '/users' ? 'active' : ''}`}>
//                 <PersonOutline className='sidebarIcons' />
//                 Users
//               </li>
//             </Link>

//             <Link to="/movies" className='link'>
//               <li className={`sidebarListItem ${path === '/movies' ? 'active' : ''}`}>
//                 <PlayCircleOutline className='sidebarIcons' />
//                 Movies
//               </li>
//             </Link>

//             <Link to="/lists" className='link'>
//               <li className={`sidebarListItem ${path === '/lists' ? 'active' : ''}`}>
//                 <List className='sidebarIcons' />
//                 Lists
//               </li>
//             </Link>
//           </ul>
//         </div>

//         {/* Creation */}
//         <div className="sidebarMenu">
//           <h3 className="sidebarTitle">Creation</h3>
//           <ul className="sidebarList">
//             <Link to="/newmovie" className='link'>
//               <li className={`sidebarListItem ${path === '/newmovie' ? 'active' : ''}`}>
//                 <AddBoxRounded className='sidebarIcons' />
//                 Create Movie
//               </li>
//             </Link>

//             <Link to="/newlist" className='link'>
//               <li className={`sidebarListItem ${path === '/newlist' ? 'active' : ''}`}>
//                 <AddBoxRounded className='sidebarIcons' />
//                 Create List
//               </li>
//             </Link>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import React from "react";
import "./sidebar.css";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ open, setOpen }) => {
  const { pathname } = useLocation();

  const closeOnClick = () => {
    if (window.innerWidth <= 768) setOpen(false);
  };

  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <button className="closeBtn" onClick={() => setOpen(false)}>✕</button>
      <ul className="sidebarList">
        <li className={pathname === "/" ? "active" : ""}>
          <Link to="/" onClick={closeOnClick}>Dashboard</Link>
        </li>
        <li className={pathname.startsWith("/movies") ? "active" : ""}>
          <Link to="/movies" onClick={closeOnClick}>Movies</Link>
        </li>
        <li className={pathname.startsWith("/lists") ? "active" : ""}>
          <Link to="/lists" onClick={closeOnClick}>Lists</Link>
        </li>
        <li className={pathname.startsWith("/analytics") ? "active" : ""}>
          <Link to="/analytics" onClick={closeOnClick}>Analytics</Link>
        </li>
        <li className={pathname.startsWith("/users") ? "active" : ""}>
          <Link to="/users" onClick={closeOnClick}>Users</Link>
        </li>
        <li className={pathname.startsWith("/newUser") ? "active" : ""}>
          <Link to="/newUser" onClick={closeOnClick}>New User</Link>
        </li>
        <li className={pathname.startsWith("/newMovie") ? "active" : ""}>
          <Link to="/newMovie" onClick={closeOnClick}>Create Movie</Link>
        </li>
        <li className={pathname.startsWith("/newlist") ? "active" : ""}>
          <Link to="/newlist" onClick={closeOnClick}>Create List</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
