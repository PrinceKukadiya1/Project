import React, { useContext, useState } from "react";
import './login.scss';
import logo from '../../assets/logo1.png';
import { login } from '../../authContext/apiCall';
import { AuthContext } from '../../authContext/AuthContext';
import { useNavigate } from 'react-router-dom'; // ADDED: For navigation

// ADDED: Import Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate(); // ADDED: For navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Call your existing login API
      await login({ email, password }, dispatch);
      toast.success("Login successful!"); // ADDED: Success toast
    } catch (error) {
      toast.error("Invalid email or password!"); // ADDED: Error toast
    }
  };

  return (
    <div className='login'>
      <div className="top">
        <div className="wrapper">
          <img src={logo} alt="logo" className='logo' />
        </div>
      </div>

      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder='Email Or Phone Number'
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder='Password'
            onChange={e => setPassword(e.target.value)}
          />
          <button className="loginButton" onClick={handleLogin}>
            Sign In
          </button>

          {/* CHANGED: Made "Sign Up Now." clickable */}
          <span>
            New To StarLight?{" "}
            <b
              onClick={() => navigate('/register')}
              style={{ cursor: 'pointer' }}
            >
              Sign Up Now.
            </b>
          </span>

          <small>
            This Page Is Protected By Google reCAPTCHA to ensure you are not a bot.{" "}
            <b>Learn more</b>.
          </small>
        </form>
      </div>

      {/* ADDED: Toast container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Login;
