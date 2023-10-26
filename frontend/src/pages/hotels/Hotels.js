import React, { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
import hotels from "../../Data/hotels.json";
import "./hotels.css";
import hotelImages from "../../Data/hotelImages.json"

const Hotels = () => {
  const location=useLocation();
  const [filteredHotels,setFilteredHotels]=useState([]);
  useEffect(()=>{
    const queryParams=new URLSearchParams(location.search);
    const country=queryParams.get("country");
    const getHotels=[];
    hotels.forEach((eachHotel)=>{
      if(eachHotel.Country.toLowerCase().includes(country)){
          getHotels.push(eachHotel);
      }
   }) 
   setFilteredHotels(getHotels); 
  },[location])


  const imageReplaced=(e)=>{
    e.target.src="https://cf.bstatic.com/xdata/images/hotel/square600/213408725.jpg?k=940bd2291fc758733d8191c968ef0120b0e0e6a47e8d9ebce26673acfb0ea606&o=";
  }


  return (
     <div className="hotels">
        <h1><span>{filteredHotels.length>0?filteredHotels.length:"No"}</span> Hotel{filteredHotels.length>1 && "s"} Found</h1>
        <div className="allHotels">
          {
            filteredHotels && filteredHotels.map((eachHotel,index)=>{
              return(
                <div className="eachHotel" key={index}>
                <div className="eachHotelImg">
                     <img src={hotelImages[index].url} onError={(e)=>{imageReplaced(e)}} alt="" />
                </div>
                <div className="eachHotelText">
                  <div className="textLeft">   
                    <div className="hotelName">{eachHotel.HotelName}</div>
                    <div className="hotelLocation">{eachHotel.Location}</div>
                    <div className="bedType">{eachHotel.BedType}</div>
                  </div>  
                  <div className="textRight">
                     <div className="rating">
                        <div className="ratingReview">{eachHotel.ReviewScore}</div>
                        <div className="ratingScore">{eachHotel.Rating}</div>
                     </div>
                     <div className="price">₹ {eachHotel.RoomPrice}</div>
                     <div className="checkAvBtn"><button >Check Availaility</button></div>
                  </div>
                </div>
                </div>
              )
            })
          }   
        </div>
     </div>
  )
}

export default Hotels