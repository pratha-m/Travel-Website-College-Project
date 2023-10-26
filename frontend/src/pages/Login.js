import React, { useState } from 'react'
import axios from 'axios'
import "../css/pages/login.css"
import { Link,useNavigate } from 'react-router-dom'
const Login = ({setTopBarProgress,successToast,errorToast,runUseEffNo,setRunUseEff}) => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();

  const signIn=async(event)=>{
    event.preventDefault();
    if(email && password){
      try{
         setTopBarProgress(50);
         const result=await axios.post("http://localhost:3001/api/v1/user/login",{email,password},{withCredentials:true});
         if(result.status===200){
           setRunUseEff(runUseEffNo+1);
           successToast(result.data.message)
           setTopBarProgress(100);
           navigate("/");
         }
      }
      catch(error){
         if(error.response){
           errorToast(error.response.data.message)
         }
         else{
           errorToast("Network Error Occured");
         }
         setTopBarProgress(100);
      }
    }
    else{
      errorToast("Pls Enter All Credentials");
    }
  }

  return (
       <div className="loginContainer">
          <h2>Sign in to your Account</h2>
          {/* <p className="short">Lorem ipsum dolor sit amet, consectetur</p> */}
          <form action="">
              <label htmlFor="UserName">Email</label>
              <input type="email" placeholder="example@gmail.com"  onChange={(e)=>{setEmail(e.target.value)}}/>
              <label htmlFor="UserName">Password</label>
              <input type="password" placeholder="*********"  onChange={(e)=>{setPassword(e.target.value)}}/>
              <button className="btn-2" onClick={signIn}>Sign in</button>
          </form>
          <p>Don't have an account? <span><Link to="/signup">Sign Up</Link></span></p>
          <p><span><Link to="/forgotpassword">ForgotPassword</Link></span></p>
       </div>
  )
}

export default Login