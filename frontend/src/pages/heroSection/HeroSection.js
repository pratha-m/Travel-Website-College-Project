import React, { useState } from 'react'
import {useNavigate} from "react-router-dom";
import "./heroSection.css";
import hotels from "../../Data/hotels.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const HeroSection=()=>{
  const [filteredHotels,setFilteredHotels]=useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const navigate=useNavigate();


  const searchHotels=(e)=>{
     let searchDropdown=document.getElementById("searchDropdown");
     if(!e.target.value){
      searchDropdown.style.display="none";
     }else{
      searchDropdown.style.display="block";
     }   
     let getSearches=[];
     hotels.forEach((eachHotel)=>{
        if(eachHotel.Country.toLowerCase().startsWith(e.target.value)){
          const isCountryALreadyPresent=getSearches.some((eachSearch)=>{return eachSearch.Country===eachHotel.Country});
          if(!isCountryALreadyPresent){
            getSearches.push(eachHotel);
          }
        }
     }) 
     setFilteredHotels(getSearches);
  }

  function handleClickOutside(event) {
    const targetElement=document.getElementById('searchContainer');
    if(targetElement && (event.target !== targetElement && !targetElement.contains(event.target))) {
       const searchDropdown=document.getElementById("searchDropdown");
       searchDropdown.style.display="none";
    }
    else if(targetElement){
      const searchDropdown=document.getElementById("searchDropdown");
      searchDropdown.style.display="block";
    }
  }
  window.addEventListener("click",handleClickOutside);

  if(startDate>endDate){
    setEndDate(startDate);
  }
  
  const setInputVal=(country)=>{
    let locationInput=document.getElementById("location");
    locationInput.value=country;
  }

  const openHotelsPage=()=>{
     let locationInput=document.getElementById("location")
     if(locationInput.value){
        navigate(`/hotels/?country=${locationInput.value.toLowerCase()}`)
     }
  }

  return (
    <div className='hero-container'>
    <video src="/images/pexels_videos_1893629 (2160p).mp4" className='hero_img' />
    <h1>ADVENTURE AWAITS</h1>
    <p>What are you waiting for?</p>
    <form className='search'>
        <div className='search-container' id='searchContainer'>
          <label >Where are you going?</label>
          <input id='location' type='text' className='searchInput' placeholder='Search your location' onChange={(e)=>{searchHotels(e)}} />
          <div className="searchDropdown" id='searchDropdown'>
            {
             filteredHotels && filteredHotels.map((eachHotel)=>{
                  return(
                    <div className="eachSearchRes" key={eachHotel.HotelName} onClick={()=>{setInputVal(eachHotel.Country)}}>
                      <div className="placeDetails">
                        <div className="searchCountry">{eachHotel.Country}</div>
                        {/* <div className="searchCity">{eachHotel.Country}</div> */}
                      </div>
                      {/* <input type="checkbox"/> */}
                    </div>
                  ) 
             })
            }
          </div>
        </div>
        <div className='row-container'>
          <div className='search-container'>
            <label>Check in</label>
            <DatePicker
              selected={startDate}
              selectsStart
              startDate={startDate}
              endDate={endDate} // add the endDate to your startDate DatePicker now that it is defined
              onChange={(date)=>{
                setStartDate(date)
              }}
              minDate={new Date()}
              dateFormat={"dd-MM-yyyy"}
              id='checkIn'
            />
          </div>
          <div className='search-container'>
            <label>Check out</label>
            <DatePicker
              selected={endDate}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              onChange={date => setEndDate(date)}
              dateFormat={"dd-MM-yyyy"}
              id='checkOut'
            />
          </div>
    
        </div>
        <div className='search-container'>
            <button className='hero-btn' type='button' onClick={openHotelsPage}>Explore</button>
        </div>
    </form>
    </div>    
  )
}

export default HeroSection