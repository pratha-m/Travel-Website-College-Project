import React,{useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import LoadingBar from 'react-top-loading-bar';
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import ErrorPage from './pages/errorPage/ErrorPage';
import EachPlace from './pages/eachPlace/EachPlace';
import Hotels from './pages/hotels/Hotels';

function App() {
  const [topBarProgress,setTopBarProgress]=useState(0);
  const [userStatus,setUserStatus]=useState({isLoggedIn:false,isAdmin:false,isFetching:true})
  const [userData,setUserData]=useState({name:"",email:""});
  const [runUseEffNo,setRunUseEff]=useState(0);

  useEffect(()=>{
    async function fetchUserData(){
      try{
        setUserStatus({...userStatus,isFetching:true});
        const result=await axios.get("http://localhost:3001/api/v1/user/profile",{withCredentials:true});
        if(result.status===200){
          const {isAdmin,email,name}=result.data.user;
          setUserData({name:name,email:email});
          if(isAdmin) setUserStatus({isLoggedIn:true,isAdmin:true,isFetching:false});
          else setUserStatus({isLoggedIn:true,isAdmin:false,isFetching:false});
        }
      }
      catch(error){
        if(error.response){
          setUserData({name:"",email:""});
          setUserStatus({isLoggedIn:false,isAdmin:false,isFetching:false});
        }
        setUserStatus({...userStatus,isFetching:false});
      }
    } 
    fetchUserData();
  },[runUseEffNo]);

  const successToast=(message)=>{
    toast.success(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
      toastId:"abc"
    });
  }
  const errorToast=(message)=>{
    toast.error(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
      toastId:"abc"
      });
  }

  return (
    <div>
    <Router>
      <Header userStatus={userStatus} setUserStatus={setUserStatus} userData={userData} setUserData={setUserData} runUseEffNo={runUseEffNo} setRunUseEff={setRunUseEff}/>
          <Routes>
            <Route exact path='/login' element={<Login setTopBarProgress={setTopBarProgress} successToast={successToast} errorToast={errorToast} runUseEffNo={runUseEffNo} setRunUseEff={setRunUseEff}/>}/>
            <Route exact path='/signup' element={<Signup setTopBarProgress={setTopBarProgress} successToast={successToast} errorToast={errorToast} runUseEffNo={runUseEffNo} setRunUseEff={setRunUseEff}/>}/>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/about' element={<About/>}/>
            <Route exact path='/contact' element={<Contact/>}/>
            <Route exact path='/forgotpassword' element={<ForgotPassword setTopBarProgress={setTopBarProgress} successToast={successToast} errorToast={errorToast}/>}/>
            <Route exact path='/places/*' element={<EachPlace setTopBarProgress={setTopBarProgress} successToast={successToast} errorToast={errorToast}/>}/>
            <Route exact path='/hotels/*' element={<Hotels setTopBarProgress={setTopBarProgress} successToast={successToast} errorToast={errorToast}/>}/>
            <Route exact path='*' element={<ErrorPage/>}/>
          </Routes>
      <Footer/>
      <LoadingBar
        color='#f11946'
        progress={topBarProgress}
        onLoaderFinished={()=>setTopBarProgress(0)}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
    </div>
  );
}

export default App;
