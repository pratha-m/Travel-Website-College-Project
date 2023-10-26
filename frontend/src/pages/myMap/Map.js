import React from 'react'
import "./map.css";

const Map = () => {
  return (
    <div className='map_cont'>
        <h1>Our Location</h1>
        <iframe title="Our Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55015.77799376522!2d76.55227738257811!3d30.47899009699132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fdc7c202e6489%3A0xf2b1d67562f68349!2sRajpura%2C%20Punjab%20140401!5e0!3m2!1sen!2sin!4v1696962119374!5m2!1sen!2sin" width="600" height="450" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
   </div>
  )
}

export default Map