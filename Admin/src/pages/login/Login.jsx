    // import React, { useContext, useState } from "react";
    // import { login } from "../../context/authContext/apiCall.js";
    // import { AuthContext } from "../../context/authContext/AuthContext";
    // import './login.css'

    // const Login = () => {

    //     const [email, setEmail] = useState("");
    //     const [password, setPassword] = useState("");
    //     const { isFetching, dispatch } = useContext(AuthContext);

    //     const handleLogin = (e) => {
    //         e.preventDefault();
    //         login({ email, password }, dispatch);
    //     }

    //         return (
    //             <div className="login">
    //                 <form className="loginForm">
    //                     <input
    //                         type="text"
    //                         placeholder="email"
    //                         className="loginInput"
    //                         onChange={(e) => setEmail(e.target.value)}
    //                     />
    //                     <input
    //                         type="password"
    //                         placeholder="password"
    //                         className="loginInput"
    //                         onChange={(e) => setPassword(e.target.value)}
    //                     />
    //                     <button
    //                         className="loginButton"
    //                         onClick={handleLogin}
    //                         disabled={isFetching}
    //                     >
    //                         Login
    //                     </button>
    //                 </form>
    //             </div>
    //         )
    //     }

    //     export default Login


//     import React, { useContext, useState } from "react";
// import { login } from "../../context/authContext/apiCall.js";
// import { AuthContext } from "../../context/authContext/AuthContext";
// import "./login.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { isFetching, dispatch } = useContext(AuthContext);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     login({ email, password }, dispatch);
//   };

//   return (
//     <div className="loginPage">
//       <div className="loginContainer">
//         <h2 className="loginTitle">Admin Login</h2>

//         <form className="loginForm" onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="loginInput"
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Enter your password"
//             className="loginInput"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button
//             type="submit"
//             className="loginButton"
//             disabled={isFetching}
//           >
//             {isFetching ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p className="signupText">
//           Don’t have an account? <a href="/register" className="signupLink">Sign Up</a>
//         </p>

//       </div>

      
//     </div>
//   );
// };

// export default Login;



import React, { useContext, useState } from "react";
import { login } from "../../context/authContext/apiCall.js";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };

  return (
    <div className="loginPage">
      <div className="loginContainer">
        <h2 className="loginTitle">Admin Login</h2>

        <form className="loginForm" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            className="loginInput"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="loginInput"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="loginButton" disabled={isFetching}>
            {isFetching ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="signupText">
          Don’t have an account?{" "}
          <a href="/register" className="signupLink">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;




