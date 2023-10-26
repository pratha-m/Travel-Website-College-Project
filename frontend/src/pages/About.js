import React from 'react'
import "../css/pages/about.css";

const About = () => {
  return (
    <section className="about" id="aboutPage">
        <div className="aboutUsHead">About <span>Us</span></div>
        <div className="aboutUsMainContent">
           <div className="aboutUsImage">
               <img src="https://img.freepik.com/premium-vector/woman-use-pc-desk-with-computer-monitor-working-home-vector-freelancer-business-female_507816-657.jpg?w=2000" alt=""/>
           </div>
           <div className="aboutUsTextContent">
               <p>
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti accusamus magni 
                   odit harum ullam neque,voluptates voluptatibus eaque sunt repellendus.
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti accusamus 
                   
               </p>
               <span className="socialLinks">
                   <ul>
                       {/* <!-- <li><a href="/" className="eachSocialLink"><i className="fa fa-brands fa-github"></i></a></li> --> */}
                       <li><a href="/" className="eachSocialLink"><i className="fa fa-brands fa-linkedin"></i></a></li>
                       <li><a href="/" className="eachSocialLink"><i className="fa fa-brands fa-twitter"></i></a></li>
                       <li><a href="/" className="eachSocialLink"><i className="fa fa-brands fa-instagram"></i></a></li>
                       {/* <!-- <li><a href="/" className="eachSocialLink"><i className="fa fa-brands fa-codepen"></i></a></li> --> */}
                   </ul>
               </span>
           </div>
        </div>
   </section>
  )
}

export default About