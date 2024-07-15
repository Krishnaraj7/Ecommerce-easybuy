import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'

const Pagenotfound = () => {
  return (
    <Layout title={'Page not found'}>
      <div style={{minHeight:'60vh'}} className=" d-flex flex-column align-items-center justify-content-center ">
        <h1 style={{fontSize:'80px',fontWeight:'bold',color:'brown'}}>404</h1>
        <h4 className=" fw-normal ">Oops ! Page Not Found</h4>
        <Link to="/" className="text-white border border-1 p-1 px-4   border-black text-decoration-none mt-2 bg-black ">
          Go Back
        </Link>
      </div>
    </Layout>
  )
}

export default Pagenotfound