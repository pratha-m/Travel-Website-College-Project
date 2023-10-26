import React from 'react'
import "../css/pages/home.css";
import HeroSection from './heroSection/HeroSection';
import Cards from './cards/Cards';
import Map from "./myMap/Map";

const Home = () => {
 
  return (
    <div id='homePage'>
      <HeroSection/>
      <Cards/>
      <Map/>
    </div>
  )
}

export default Home;