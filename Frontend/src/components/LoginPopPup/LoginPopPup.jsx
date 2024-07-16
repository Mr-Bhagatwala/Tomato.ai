import React, { useState } from 'react'
import './LoginPopPup.css'
import { assets } from '../../assets/frontend_assets/assets'
const LoginPopPup = ({setShowLogin}) => {
    const [currState , setCurrState] = useState("Sign Up")
  return (
    <div  className='login-popup'>
      
      <form action="" className="login-poppup-container">

        <div className="login-poppup-title">
            <h2>{currState}</h2>
            <img  onClick={()=>setShowLogin(false)}   src={assets.cross_icon}  />
        </div>

        <div className="login-poppup-inputs">
            {currState==="Login" ? <></> :<input type="text"  placeholder='your name' required/> }
            <input type="email" placeholder='your email' required />
            <input type="password" placeholder='password' required />
        </div>
        <button >{currState === "Sign Up" ? "Create Account" : "Login"}</button>

        <div className="login-poppup-condition">
            <input type="checkbox" required />
            <p>By Continuing , i agree to the terms of use & privacy policy</p>
        </div>
        {
            currState === "Login" 
            ? <p>Create new account    <span onClick={()=> setCurrState ("Sign Up") }>Click here </span></p>
            :  <p>Already have an account  <span onClick={()=> setCurrState ("Login") }>Login here</span>  </p>
        }
      </form>
    </div>
  )
}

export default LoginPopPup
