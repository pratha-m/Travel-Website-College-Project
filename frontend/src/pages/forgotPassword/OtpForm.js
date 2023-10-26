import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const OtpForm = ({setRenderForms,userId,userEmail,setTopBarProgress,successToast,errorToast}) => {
  const [otp,setOtp]=useState("");

  const submitOtp=async(event)=>{
     event.preventDefault();
     if(otp){
       try{
        setTopBarProgress(50);
        const result=await axios.post("http://localhost:3001/api/v1/user/checkotp",{otp,userId});
        if(result.status===200){
           setTopBarProgress(100)
           setRenderForms({isEmailForm:false,isOtpForm:false,isChangePassForm:true});
        }
       }
       catch(error){
        if(error.response){
          errorToast(error.response.data.message)
          setTopBarProgress(100)
        }
        else{
          errorToast("Error in Network")
          setTopBarProgress(100)
        }
       }
     }
     else{
      errorToast("Pls Enter Otp");
     }
  }
  const resendOtp=async()=>{
    try{
      setTopBarProgress(50)
      const result=await axios.post("http://localhost:3001/api/v1/user/sendemail",{email:userEmail});
      if(result.status===200){
        successToast(`Email Sent To ${userEmail}`)
        setTopBarProgress(100)
      }
    }
   catch(error){
      if(error.response){
       errorToast(error.response.data.message)
        setTopBarProgress(100)
      }
      else{
        errorToast("Network Error Occured");
        setTopBarProgress(100)
      }
   }
  }


  return (
    <div className="loginContainer emailFormContainer">
    <h2>Enter Otp</h2>
    <p className="short">Sent To : {userEmail}</p>
    <form>
        <label htmlFor="UserName" className='emailLabel'>Otp</label>
        <input type="text" placeholder="Enter Otp" required={true} onChange={(e)=>{setOtp(e.target.value)}}/>
        <button className="btn-2" onClick={submitOtp}>Continue</button>
    </form>
    <p>Otp Will be expired in 5 minutes<span onClick={resendOtp}> Resend Otp</span></p>
    <p>Already have an account?<span><Link to="/login">Sign In</Link></span></p>
    </div>
  )
}

export default OtpForm