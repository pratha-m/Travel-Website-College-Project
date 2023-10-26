import React, { useState } from 'react'
import EmailForm from './EmailForm'
import OtpForm from './OtpForm'
import ChangePassword from "./ChangePassword";

const ForgotPassword = ({setTopBarProgress,successToast,errorToast}) => {
  const [renderForms,setRenderForms]=useState({isEmailForm:true,isOtpForm:false,isChangePassForm:false}); 
  const [userId,setUserId]=useState("");
  const [userEmail,setUserEmail]=useState("");

  return (
    <>
       {renderForms.isEmailForm && <EmailForm setRenderForms={setRenderForms} setUserId={setUserId} setUserEmail={setUserEmail} setTopBarProgress={setTopBarProgress} successToast={successToast} errorToast={errorToast}/>}
       {renderForms.isOtpForm && <OtpForm setRenderForms={setRenderForms} userId={userId} userEmail={userEmail} setTopBarProgress={setTopBarProgress} successToast={successToast} errorToast={errorToast}/>}
       {renderForms.isChangePassForm && <ChangePassword setRenderForms={setRenderForms} userId={userEmail} userEmail={userEmail} setTopBarProgress={setTopBarProgress} successToast={successToast} errorToast={errorToast}/>}
    </>
  )
}

export default ForgotPassword