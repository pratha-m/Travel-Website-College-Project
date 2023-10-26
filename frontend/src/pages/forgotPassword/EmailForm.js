import React, { useState } from 'react'
import axios from "axios";
import "../../css/pages/forgotPassword/emailForm.css";
import { Link } from 'react-router-dom';

const EmailForm=({setRenderForms,setUserId,setUserEmail,setTopBarProgress,successToast,errorToast}) => {
  const [email,setEmail]=useState("");

  const submitEmail=async(event)=>{
      event.preventDefault();     
      if(email){
        try{
          setTopBarProgress(50);
          const result=await axios.post("http://localhost:3001/api/v1/user/sendemail",{email});
          if(result.status===200){
             const {email,_id}=result.data.user;
             successToast(`Email Sent To ${email}`)
             setTopBarProgress(100);
             setUserId(_id);
             setUserEmail(email)
             setRenderForms({isEmailForm:false,isOtpForm:true,isChangePassForm:false});
          }
        }
       catch(error){
          if(error.response){
            errorToast(error.response.data.message)
            setTopBarProgress(100);
          }
          else{
            errorToast("Error in Senting Email");
            setTopBarProgress(100);
          }
       }
      }
      else{
        errorToast("Pls Enter Email");
      }
  } 

  return (
    <div className="loginContainer emailFormContainer">
       
    <h2>Enter Email</h2>
    {/* <p className="short">Lorem ipsum dolor sit amet, consectetur</p> */}
    <form>
        <label htmlFor="UserName" className='emailLabel'>Email</label>
        <input type="email" placeholder="example@gmail.com" required={true} onChange={(e)=>{setEmail(e.target.value)}}/>
        <button className="btn-2" onClick={submitEmail}>Continue</button>
    </form>
    <p>Already have an account?<span><Link to="/login">Sign In</Link></span></p>
    </div>
  )
}

export default EmailForm