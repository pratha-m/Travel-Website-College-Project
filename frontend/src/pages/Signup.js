import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from "axios";
import "../css/pages/login.css";
import "../css/pages/signup.css";

const Signup = ({setTopBarProgress,successToast,errorToast,runUseEffNo,setRunUseEff}) => {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();
  
  const createAccount=async(event)=>{
       event.preventDefault();
       if(name && email && password){
         try{
            setTopBarProgress(50);
            const result=await axios.post("http://localhost:3001/api/v1/user/create",{name,email,password},{withCredentials:true});
            if(result.status===200){
              setRunUseEff(runUseEffNo+1);
              successToast(result.data.message);
              setTopBarProgress(100);
              navigate("/");
            }
         }
         catch(error){
            if(error.response){
              errorToast(error.response.data.message);
            }
            else{
              errorToast("Network Error Occured");
            }
            setTopBarProgress(100);
         }
       }
       else{
         errorToast("Pls Enter All credentials");
       }
  }


    
  return (
    <div className="loginContainer signupContainer">
        <h2>Create an Account</h2>
        {/* <p className="short">Lorem ipsum dolor sit amet, consectetur</p> */}
        <form>
            <label htmlFor="UserName">Full Name</label>
            <input type="text" placeholder="John Warner" onChange={(e)=>{setName(e.target.value)}} required={true}/>
            <label htmlFor="UserName">Email</label>
            <input type="text" placeholder="example@gmail.com" onChange={(e)=>{setEmail(e.target.value)}} required={true}/>
            <label htmlFor="UserName">Password</label>
            <input type="password" placeholder="*********" onChange={(e)=>{setPassword(e.target.value)}} required={true}/>
            <button className="btn-2" onClick={createAccount}>Sign Up</button>
        </form>
        <p>Already have an account?<span><Link to="/login">Sign In</Link></span></p>
    </div>
  )
}

export default Signup