import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPopup = ({setShowLogin}) => {

    const {url, token, setToken} = useContext(StoreContext);
    const [currState, setCurrState] = useState("Sign Up");
    
    const [data, setData] = useState({
      name:"",
      email:"",
      password:"",
    })

    const onChangeHandler = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setData({...data, [name]:value});
    }

    const onLogin = async (e) => {
      e.preventDefault();
      let newUrl = url;
      if(currState == "Login")
          newUrl += '/api/user/login';
      else
        newUrl += '/api/user/register';

      const response = await axios.post(newUrl, data);
      console.log(response);
      if(response.data.success)
      {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setShowLogin(false);
          if(currState != "Login")
              alert('sign in completed!!!');
          else  
              alert('Login is completed')
      }
      else
      {
        alert(response.data.message);
      }
    }


  return (
    <div className = 'login-popup'>
      <form onSubmit = {onLogin} className="login-popup-container">
        <div className = "login-popup-title">
            <h2>{currState}</h2>
            <img onClick = {() => setShowLogin(false)}  src = {assets.cross_icon} alt=""/>
        </div>
        <div className="login-popup-inputs">
            {currState === "Login" ? <></> : <input onChange = {onChangeHandler} type = "text" name = "name" value = {data.name} placeholder = "Your name" required/>}
            <input onChange = {onChangeHandler} type = "email" name = "email" value = {data.email}placeholder = 'Your email' required/>
            <input onChange = {onChangeHandler} type = "password" name = "password" value = {data.password} placeholder = 'Password' required/>
        </div>
        <button type = 'submit'>{currState === "Sign Up" ? "Create Account": "Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required/>
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
            {currState === 'Sign Up' ? <p>Already have an account? <span onClick = {() => {setCurrState("Login")}}>Login here</span></p> : 
            <p>Create a new account? <span onClick = {() => {setCurrState("Sign Up")}}>Click here</span></p>}
      </form>
    </div>
  )
}

export default LoginPopup
