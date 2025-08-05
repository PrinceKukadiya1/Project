import React from 'react'
import './register.scss'
import logo from '../../assets/logo1.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Register = () => {

  const navigate = useNavigate();
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [username, setUsername] = React.useState("")

  const emailRef = React.useRef()
  const passwordRef = React.useRef()
  const usernameRef = React.useRef()

  const handleStart = () => {
    setEmail(emailRef.current.value)

  }

  const handleFinish = async (e) => {
    e.preventDefault();
    setPassword(passwordRef.current.value)
    setUsername(usernameRef.current.value)
    try {
      await axios.post('http://localhost:3000/api/auth/register', { email, password, username })
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='register'>
      <div className="top">
        <div className="wrapper">

          <img src={logo} alt="logo" className='logo' />

          <button className='loginButton' onClick={() => {
            navigate("/login");
          }}>Sign In</button>
        </div>
      </div>

      <div className="container">
        <h1>Unlimited Movies, TV Shows, and More.</h1>
        <h2>Watch Anywhere. Cancle Anytimes.</h2>
        <p>Ready To Watch? Enter Your Email To Create or Restart Your Membership.</p>

        {!email ? (
          <div className="input">
            <input type="email" placeholder='Email Address' ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>Get Started</button>
          </div>
        ) : (
          <form className="input">
            <input type="password" placeholder='Password' ref={passwordRef} />
            <input type="username" placeholder='Username' ref={usernameRef} />
            <button className="registerButton" onClick={handleFinish} >Start</button>
          </form>
        )}

      </div>
    </div>
  )
}

export default Register
