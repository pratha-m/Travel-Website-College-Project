import React from 'react'
import {Navigate} from "react-router-dom";
import Loader from '../../components/Loader';

const ProtectedRoute=({element,fallbackPath,userStatus})=>{
  if(userStatus.isFetching){
    return <>
      {userStatus.isFetching && <Loader/>}
      {!userStatus.isFetching && userStatus.isAdmin && element}
    </>;
  }
  else if(userStatus.isAdmin){
    return element;
  }
  else{
    return <Navigate to={fallbackPath}/>
  }
}

export default ProtectedRoute