import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import popularPlaces from "../../Data/places.json"
import "./eachPlace.css";
const EachPlace = () => {
  const [eachPlace,setEachPlace]=useState();  
  const location=useLocation();
  useEffect(()=>{
      const queryParams=new URLSearchParams(location.search);
      const placeIndex=queryParams.get("placeIndex");
      const eachPlace=popularPlaces[placeIndex]
      setEachPlace(eachPlace)
  },[location])


  return (
    <div className="each_place">
        <div className="each_place_img">
            <img src={eachPlace && eachPlace.image_url} alt="" />
        </div>
        <div className="each_place_text">
            <div className="name_desc">
              <h1>{eachPlace && eachPlace.name}</h1>
              <p>{eachPlace && eachPlace.description}</p>
            </div>
            <div className="other_details">
               <p>Language : {eachPlace && eachPlace.details.language}</p>
               <p>Currency : {eachPlace && eachPlace.details.currency}</p>
               <p>Area Sq Km : {eachPlace && eachPlace.details.area_sq_km}</p>
               <p>Population: {eachPlace && eachPlace.details.population}</p>
            </div>
            <div className="book_btn_cont">
                <button>Book Now</button>
            </div>
        </div>
    </div>
  )
}

export default EachPlace