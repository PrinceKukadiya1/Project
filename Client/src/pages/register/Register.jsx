import React, { useState, useRef } from 'react';
import './register.scss';
import logo from '../../assets/logo1.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    try {
      // FIX: use refs directly to avoid async state lag
      const newUser = {
        email,
        password: passwordRef.current.value,
        username: usernameRef.current.value,
      };
      await axios.post('http://localhost:3000/api/auth/register', newUser);
      toast.success("Account created successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error("Registration failed! Please try again.");
    }
  };

  return (
    <div className='register'>
      <div className="top">
        <div className="wrapper">
          <img src={logo} alt="logo" className='logo' />
          <button
            className='loginButton'
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        </div>
      </div>

      <div className="container" style={{ zIndex: 2 }}> {/* FIX: ensure clickable */}
        <h1>Unlimited Movies, TV Shows, and More.</h1>
        <h2>Watch Anywhere. Cancel Anytime.</h2>
        <p>Ready to watch? Enter your email to create or restart your membership.</p>

        {!email ? (
          <div className="input">
            <input
              type="email"
              placeholder='Email Address'
              ref={emailRef}
              style={{ cursor: 'text' }} // FIX: ensure cursor shows
            />
            <button className="registerButton" onClick={handleStart}>Get Started</button>
          </div>
        ) : (
          <form className="input" onSubmit={handleFinish}>
            <input
              type="password"
              placeholder='Password'
              ref={passwordRef}
              style={{ cursor: 'text' }}
            />
            <input
              type="text"
              placeholder='Username'
              ref={usernameRef}
              style={{ cursor: 'text' }}
            />
            <button className="registerButton" type="submit">Start</button>
          </form>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Register;
