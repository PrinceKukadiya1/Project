import React from "react";
import './login.scss'
import logo from '../../assets/logo1.png'
import { login } from '../../authContext/apiCall'
import { useContext } from 'react'
import { AuthContext } from '../../authContext/AuthContext'


const Login = () => {

  const [email , setEmail] = React.useState("")
  const [password , setPassword] = React.useState("")
  const {dispatch} = useContext(AuthContext)

  const handlelogin = (e) => {
    e.preventDefault()
    login({email , password} , dispatch)
  }

  return (
    <div className='login'>
      <div className="top">
        <div className="wrapper">

          <img src={logo} alt="logo" className='logo' />

        </div>
      </div>
    
    <div className="container">
      <form >
        <h1>Sign In</h1>
          <input type="email" placeholder='Email Or Phone Number' onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder='Password' onChange={e => setPassword(e.target.value)} />
          <button className="loginButton" onClick={handlelogin}>Sign In</button>
          <span>New To StarLight ? <b>Sign Up Now.</b></span>
          <small>This Page Is Protected By Google reCAPTCHA to ensure you are not a bot. <b>Learn more</b>.</small>
        
      </form>
    </div>
      
    </div>
  )
}

export default Login
