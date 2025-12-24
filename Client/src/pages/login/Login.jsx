// import React, { useContext, useState, useEffect } from "react";
// import "./login.scss";
// import logo from "../../assets/logo1.png";
// import { login } from "../../authContext/apiCall";
// import { AuthContext } from "../../authContext/AuthContext";
// import { useNavigate } from "react-router-dom";

// // Toastify
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const { dispatch, user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   // ✅ Navigate ONLY after auth state updates
//   useEffect(() => {
//     if (user) {
//       navigate("/");
//     }
//   }, [user, navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await login({ email, password }, dispatch);
//       toast.success("Login successful!");
//     } catch (error) {
//       toast.error("Invalid email or password!");
//     }
//   };

//   return (
//     <div className="login">
//       <div className="top">
//         <div className="wrapper">
//           <img src={logo} alt="logo" className="logo" />
//         </div>
//       </div>

//       <div className="container">
//         <form onSubmit={handleLogin}>
//           <h1>Sign In</h1>

//           <input
//             type="email"
//             placeholder="Email or Phone Number"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button className="loginButton" type="submit">
//             Sign In
//           </button>

//           <span>
//             New to StarLight?{" "}
//             <b
//               onClick={() => navigate("/register")}
//               style={{ cursor: "pointer" }}
//             >
//               Sign Up Now.
//             </b>
//           </span>

//           <small>
//             This page is protected by Google reCAPTCHA to ensure you are not a bot.{" "}
//             <b>Learn more</b>.
//           </small>
//         </form>
//       </div>

//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
//     </div>
//   );
// };

// export default Login;



import React, { useContext, useState } from "react";
import "./login.scss";
import logo from "../../assets/logo1.png";
import { login } from "../../authContext/apiCall";
import { AuthContext } from "../../authContext/AuthContext";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }, dispatch);

      // ✅ FORCE navigation AFTER success
      if (res) {
        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 500);
      }
    } catch (err) {
      toast.error("Invalid email or password!");
    }
  };

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img src={logo} alt="logo" className="logo" />
        </div>
      </div>

      <div className="container">
        <form onSubmit={handleLogin}>
          <h1>Sign In</h1>

          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="loginButton">
            Sign In
          </button>
        </form>
      </div>

      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default Login;
