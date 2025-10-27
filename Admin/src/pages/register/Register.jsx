// import React, { useState } from "react";
// import "./register.css";

// const Register = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handleRegister = (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     // Example: call API here
//     console.log("Registering:", { email, password });
//   };

//   return (
//     <div className="registerPage">
//       <div className="registerContainer">
//         <h2 className="registerTitle">Admin Register</h2>

//         <form className="registerForm" onSubmit={handleRegister}>
//           <input
//             type="email"
//             placeholder="Email"
//             className="registerInput"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="registerInput"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             className="registerInput"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//           <button type="submit" className="registerButton">
//             Register
//           </button>
//         </form>

//         <p className="loginText">
//           Already have an account?{" "}
//           <a href="/login" className="loginLink">Login</a>
//         </p>
//       </div>

//     </div>
//   );
// };

// export default Register;








// import React, { useState, useContext } from "react";
// import "./register.css";
// import { register } from "../../context/authContext/apiCall";
// import { AuthContext } from "../../context/authContext/AuthContext";

// const Register = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const { dispatch, isFetching } = useContext(AuthContext);

//   const handleRegister = (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     register({ email, password }, dispatch);
//   };

//   return (
//     <div className="registerPage">
//       <div className="registerContainer">
//         <h2 className="registerTitle">Admin Register</h2>

//         <form className="registerForm" onSubmit={handleRegister}>
//           <input
//             type="email"
//             placeholder="Email"
//             className="registerInput"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="registerInput"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             className="registerInput"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//           <button type="submit" className="registerButton" disabled={isFetching}>
//             {isFetching ? "Registering..." : "Register"}
//           </button>
//         </form>

//         <p className="loginText">
//           Already have an account?{" "}
//           <a href="/login" className="loginLink">Login</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;







import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // useNavigate hook

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      await axios.post("http://localhost:3000/api/auth/register", {
        username,
        email,
        password,
        isAdmin: true, // optional, if you want admin
      });

      alert("Registration successful! Please login.");
      navigate("/login"); // redirect to login page
    } catch (err) {
      console.error(err);
      alert("Failed to register. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registerPage">
      <div className="registerContainer">
        <h2 className="registerTitle">Admin Register</h2>

        <form className="registerForm" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            className="registerInput"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="registerInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="registerInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="registerInput"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="registerButton" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="loginText">
          Already have an account?{" "}
          <a href="/login" className="loginLink">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
