import React, { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
import hotels from "../../Data/hotels.json";
import "./hotels.css";
import hotelImages from "../../Data/hotelImages.json"
import useRazorpay from "react-razorpay";

const Hotels = () => {
  const location=useLocation();
  const [Razorpay] = useRazorpay();
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

  const openPayment=async(price)=>{
    // let response=await fetch("http://localhost:3001/payment",{
    //     method:"POST",
    //     headers:{
    //         "Content-Type": "application/json",
    //     },
    //     body:JSON.stringify({
    //         amount:price,
    //     }),
    // })
    // let orderData=await response.json();
    // if(orderData.success==="true"){
    //     let orderId=orderData.order.id;
    //     var options = {
    //         "key": "rzp_test_snWSRYhCKfQNs4", // Enter the Key ID generated from the Dashboard
    //         "amount": orderData.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    //         "currency": "INR",
    //         "name": "pratham company",
    //         "description": "First Transaction",
    //         "image": "https://t3.ftcdn.net/jpg/02/47/48/00/360_F_247480017_ST4hotATsrcErAja0VzdUsrrVBMIcE4u.jpg",
    //         "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    //         "handler": function (response) {
    //             console.log(response);
    //         },
    //         "prefill": {
    //             "name": "pratham",
    //             "email": "pratham@example.com",
    //             "contact": "8484848488"
    //         },
    //         "notes": {
    //             "address": "Razorpay Corporate Office"
    //         },
    //         "theme": {
    //             "color": "#3399cc"
    //         }
    //     };
    //     var rzp1 = new window.Razorpay(options);
    //     rzp1.on('payment.failed', function (response) {
    //         console.log("Pls Be Patient , Some Error Occured");
    //     });
    //     rzp1.open();
    // }
    // else{
    //     alert(orderData.error);
    // }
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
                     <div className="checkAvBtn"><button onClick={()=>{openPayment(eachHotel.RoomPrice)}}>Check Availaility</button></div>
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