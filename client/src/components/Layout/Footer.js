import React from 'react'
import { Link } from 'react-router-dom'
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <div style={{backgroundColor:'#1e1c1c'}}  className=" text-light p-3 mt-5 ">
      <h5 style={{fontSize:'10px'}}  className=" text-center">
      &copy; Easybuy 2024 . All Right Reserved 
     
      </h5>
     
      <p style={{fontSize:'12px'}} className=' text-center  mt-2  '>
    <Link  to={'/about'} className='text-decoration-none text-light p-2 '>About</Link>
    <Link to={'/contact'} className='text-decoration-none text-light p-2 '>Contact</Link>
    <Link to={'/policy'} className='text-decoration-none text-light p-2 '>Privacy Policy</Link>
      </p>
     
    </div>
  )
}

export default Footer