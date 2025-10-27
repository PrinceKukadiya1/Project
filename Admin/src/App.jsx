


// import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import React, { useContext, useState } from "react";
// import Sidebar from "./components/sidebar/Sidebar";
// import Topbar from "./components/topbar/Topbar";
// import "./App.css";

// import Home from "./pages/home/Home";
// import UserList from "./pages/userList/UserList";
// import User from "./pages/user/User";
// import NewUser from "./pages/newUser/NewUser";
// import Movie from "./pages/movie/Movie";
// import NewMovie from "./pages/newMovie/NewMovie";
// import Analysis from "./pages/analysis/Analysis";
// import MovieList from "./pages/movieList/MovieList";
// import ListList from "./pages/listList/ListList";
// import List from "./pages/list/List";
// import NewList from "./pages/newList/NewList";
// import Login from "./pages/login/Login";

// import { AuthContext } from "./context/authContext/AuthContext";

// function AppLayout() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <>
//       {/* Static Topbar */}
//       <Topbar setSidebarOpen={setSidebarOpen} />

//       {/* Sidebar + Main Content */}
//       <div className="layout">
//         <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
//         <main className="content">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/analytics" element={<Analysis />} />
//             <Route path="/users" element={<UserList />} />
//             <Route path="/user/:userId" element={<User />} />
//             <Route path="/newUser" element={<NewUser />} />
//             <Route path="/movies" element={<MovieList />} />
//             <Route path="/movie/:movieId" element={<Movie />} />
//             <Route path="/newMovie" element={<NewMovie />} />
//             <Route path="/lists" element={<ListList />} />
//             <Route path="/list/:listId" element={<List />} />
//             <Route path="/newlist" element={<NewList />} />
//           </Routes>
//         </main>
//       </div>
//     </>
//   );
// }

// function App() {
//   const { user } = useContext(AuthContext);
//   useLocation();

//   return (
//     <Routes>
//       <Route
//         path="/login"
//         element={!user ? <Login /> : <Navigate to="/" replace />}
//       />
//       <Route
//         path="*"
//         element={user ? <AppLayout /> : <Navigate to="/login" replace />}
//       />
//     </Routes>
//   );
// }

// export default function WrappedApp() {
//   return (
//     <Router>
//       <App />
//     </Router>
//   );
// }

// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import React from "react";
// // import "./App.css";

// // import Register from "./pages/register/Register"; // <-- make sure path matches your file

// // function App() {
// //   return (
// //     <Routes>
// //       <Route path="/*" element={<Register />} />
// //     </Routes>
// //   );
// // }

// // export default function WrappedApp() {
// //   return (
// //     <Router>
// //       <App />
// //     </Router>
// //   );
// // }


// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import React, { useContext, useState } from "react";
// import Sidebar from "./components/sidebar/Sidebar";
// import Topbar from "./components/topbar/Topbar";
// import "./App.css";

// import Home from "./pages/home/Home";
// import UserList from "./pages/userList/UserList";
// import User from "./pages/user/User";
// import NewUser from "./pages/newUser/NewUser";
// import Movie from "./pages/movie/Movie";
// import NewMovie from "./pages/newMovie/NewMovie";
// import Analysis from "./pages/analysis/Analysis";
// import MovieList from "./pages/movieList/MovieList";
// import ListList from "./pages/listList/ListList";
// import List from "./pages/list/List";
// import NewList from "./pages/newList/NewList";
// import Login from "./pages/login/Login";
// import Register from "./pages/register/Register";

// import { AuthContext } from "./context/authContext/AuthContext";

// function AppLayout() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <>
//       <Topbar setSidebarOpen={setSidebarOpen} />
//       <div className="layout">
//         <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
//         <main className="content">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/analytics" element={<Analysis />} />
//             <Route path="/users" element={<UserList />} />
//             <Route path="/user/:userId" element={<User />} />
//             <Route path="/newUser" element={<NewUser />} />
//             <Route path="/movies" element={<MovieList />} />
//             <Route path="/movie/:movieId" element={<Movie />} />
//             <Route path="/newMovie" element={<NewMovie />} />
//             <Route path="/lists" element={<ListList />} />
//             <Route path="/list/:listId" element={<List />} />
//             <Route path="/newlist" element={<NewList />} />
//           </Routes>
//         </main>
//       </div>
//     </>
//   );
// }

// function App() {
//   const { user } = useContext(AuthContext);

//   return (
//     <Routes>
//       {/* Register first page */}
//       <Route
//         path="/register"
//         element={!user ? <Register /> : <Navigate to="/" replace />}
//       />

//       {/* Login page */}
//       <Route
//         path="/login"
//         element={!user ? <Login /> : <Navigate to="/" replace />}
//       />

//       {/* Protected pages */}
//       <Route
//         path="*"
//         element={user ? <AppLayout /> : <Navigate to="/register" replace />}
//       />
//     </Routes>
//   );
// }

// export default function WrappedApp() {
//   return (
//     <Router>
//       <App />
//     </Router>
//   );
// }


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";

import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import Movie from "./pages/movie/Movie";
import NewMovie from "./pages/newMovie/NewMovie";
import Analysis from "./pages/analysis/Analysis";
import MovieList from "./pages/movieList/MovieList";
import ListList from "./pages/listList/ListList";
import List from "./pages/list/List";
import NewList from "./pages/newList/NewList";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import { AuthContext } from "./context/authContext/AuthContext";

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Topbar setSidebarOpen={setSidebarOpen} />
      <div className="layout">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analytics" element={<Analysis />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/user/:userId" element={<User />} />
            <Route path="/newUser" element={<NewUser />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/movie/:movieId" element={<Movie />} />
            <Route path="/newMovie" element={<NewMovie />} />
            <Route path="/lists" element={<ListList />} />
            <Route path="/list/:listId" element={<List />} />
            <Route path="/newlist" element={<NewList />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* Register is first page */}
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/" replace />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
      <Route path="*" element={user ? <AppLayout /> : <Navigate to="/register" replace />} />
    </Routes>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
