import React from 'react'
import Layout from '../components/Layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";



const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div style={{height:'90vh'}} className="row w-100 px-4  d-flex  align-items-center justify-content-center  ">
        <h1 className=' text-center  mt-5 '>How can we help you today?</h1>
        <div className="col-md-6 mt-4 text-center   ">
          <img
            src='/images/5124556.jpg'
            alt="contact"
            style={{ width: "60%" }}
            className=' me-lg-5 '
          />
        </div>
        <div className="col-md-4">
          <h3 className=" p-2 text-black border-bottom border-black  ">CONTACT US</h3>
          <p className="text-justify mt-2">
          Have a question or need assistance? Feel free to reach out to our friendly customer support team. We are available 24/7 to help you with any queries
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@ecommerceapp.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 012-3456789
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Contact