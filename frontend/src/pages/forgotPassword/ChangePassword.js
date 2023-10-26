import axios from 'axios';
import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom";

const ChangePassword = ({setRenderForms,userId,userEmail,setTopBarProgress,successToast,errorToast}) => {
  const [password,setPassword]=useState(""); 
  const [confirmPassword,setConfirmPassword]=useState("");
  const navigate=useNavigate();

  const changePassword=async(event)=>{
       event.preventDefault();
       if(password && confirmPassword){
         if(password===confirmPassword){
          try{
            setTopBarProgress(50);
            const result=await axios.put("http://localhost:3001/api/v1/user/changepassword",{email:userEmail,password});
            if(result.status===200){
               successToast(result.data.message);
               setTopBarProgress(100);
               navigate("/");
               setRenderForms({isEmailForm:true,isOtpForm:false,isChangePassForm:false});
            }
          }
          catch(error){
            if(error.response){
             errorToast(error.response.data.message)
              setTopBarProgress(100);
            }
            else{
              errorToast("Network Error Occured")
              setTopBarProgress(100);
            }
          }
         }
         else{
           errorToast("Password and Confirm Password Must Be Same"); 
         }
       }
       else{
         errorToast("Pls Enter all Credentials");
       }
  }

  return (
    <div className="loginContainer">
          <h2>Create New Password</h2>
          <p className="short">For Email : {userEmail}</p>
          <form action="">
              <label htmlFor="UserName">Password</label>
              <input type="password" placeholder="*********" onChange={(e)=>{setPassword(e.target.value)}}/>
              <label htmlFor="UserName">Confirm Password</label>
              <input type="password" placeholder="*********" onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
              <button className="btn-2" onClick={changePassword}>Change Password</button>
          </form>
          <p>Already have an account?<span><Link to="/login">Sign In</Link></span></p>
    </div>
  )
}

export default ChangePassword