import React, { useEffect, useState } from 'react'
import {Link,useLocation} from "react-router-dom";
import "../css/components/header.css";

const Header = ({userStatus,setUserStatus,userData,runUseEffNo,setRunUseEff}) => {
  const location=useLocation();
  const [urlPath,setUrlPath]=useState(location.pathname);

  useEffect(()=>{
    setUrlPath(location.pathname);
  },[location.pathname]);
  
  const logout=()=>{
    document.cookie="MAPIT_USER_TOKEN=;expires=Thu,01 Jan 1970 00:00:00 UTC; path=/;";
    setUserStatus({...userStatus,isLoggedIn:false});
    setRunUseEff(runUseEffNo+1);
  }
  const toggleDropdown=()=>{
     let userDropdown=document.getElementById("userDropdown");
     if(userDropdown.classList.contains("hideUserDropdown")){
        userDropdown.classList.remove("hideUserDropdown"); 
        userDropdown.classList.add("showUserDropdown"); 
     }
     else{
       userDropdown.classList.remove("showUserDropdown"); 
       userDropdown.classList.add("hideUserDropdown"); 
     }
  }
  return (
    <>
    <input type="checkbox" id="expand-toggler"/>
    <header className="header">
        <div className="logoContainer">
          <Link to="/">Traveller</Link>
          <label htmlFor="expand-toggler" id="expand-btn">
              <img src="/images/hamburgericon.png" id="hambergerIcon" alt="" />
              <img src="/images/crossicon.png" id="crossIcon" alt="" />
          </label>
        </div>
        <nav>
            {(urlPath==="/")?
            <ul>
                <li><a href="/#">Home</a></li>
                <li><a href="/#">About</a></li>
                <li><a href="/#">Services</a></li>
                <li><a href="/#">Contact Us</a></li>
            </ul>:<ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">about</Link></li>
                <li><Link to="/">Services</Link></li>
                <li><Link to="/">Contact Us</Link></li>
            </ul>
            }
        </nav>  
        <div className='signInBtnContainer'>
          {
           userStatus.isLoggedIn?
            (
            <>
             <button className='signInButton userLoggedBtn' onClick={toggleDropdown} type='button'>{userData.name.length>12?(userData.name.substring(0,10)+".."):(userData.name)}</button>  
             <div className="userDropdown hideUserDropdown" id='userDropdown'>
               <div className="eachOption">Profile</div>
               <div className="eachOption" >Trips</div>
               <div className="eachOption" onClick={()=>logout()}>Logout</div>
             </div>
            </>
            ):
           (<button className='signInButton loginBtn'><Link to="/login" className='loginBtnText'>Sign In</Link></button>)
          }
        </div>
    </header>
    </>
  )
}

export default Header