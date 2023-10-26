import React from 'react'
import "./cards.css";
import { useNavigate } from 'react-router-dom';
import popularPlaces from "../../Data/places.json"
const Cards = () => {
  const navigate=useNavigate();


  const eachPlacePage=(index)=>{
    navigate(`/places/?placeIndex=${index}`)
  }

  return (
    <div className='cards'>
      <h1>Check out these epic destinations!</h1>
      <div className="card_items">
         {
          popularPlaces && popularPlaces.map((eachPlace,index)=>{
              return(
                <div className="each_item" key={eachPlace.image_url}>
                  <div className="explore_more" onClick={()=>{eachPlacePage(index)}}>Go</div>
                  <div className="each_item_img">
                    <img src={eachPlace.image_url} alt="" />
                  </div>
                  <div className="each_item_text">
                    {eachPlace.name}
                  </div>
                </div>
              ) 
          })
         }
      </div> 
    </div>
  )
}

export default Cards


