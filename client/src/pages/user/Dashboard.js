import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { NavLink } from 'react-router-dom';
import { VscThreeBars } from "react-icons/vsc";

import { useAuth } from '../../context/auth';

const Dashboard = () => {

  const [auth] = useAuth()

    const [showNav, setShowNav] = useState(false);

    const toggleNav = () => {
      setShowNav(!showNav);
    };


  return (
    <Layout title={'Dashboard'}>
        <div  className="container-fluid p-3">
      <div className="row">
        {/* Navigation List for Large Screens */}
        <div className={`col-md-3 col-sm-12   `} style={{backgroundColor:'#f8f9fa'}}>
        <h4 style={{ color: '#555', marginBottom: '20px' }}>Dashboard  <span className="col-12 d-md-none">
          <button onClick={toggleNav} className="btn " style={{ marginBottom: '8px' }}>
          <VscThreeBars />
          </button>
        </span></h4>
       
            <div className={`${showNav ? ' d-none d-md-block' : ''}`}>
         
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink className="nav-link active"  style={{ color: '#007bff', padding: '10px 15px' }}>
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard/user/profile" style={{ color: '#555', padding: '10px 15px' }}>
               Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard/user/orders" style={{ color: '#555', padding: '10px 15px' }}>
               Orders
              </NavLink>
            </li>
          
          </ul>
          </div>
        </div>

        {/* Toggle Button for Small Screens */}
      

        {/* Main Content */}
        <div className={`col-md-9 col-sm-12${showNav ? ' col-md-offset-3' : ''}`} style={{ padding: '20px' }}>
          <h3>User Details</h3>
          {/* <p style={{ fontSize: '1rem', lineHeight: '1.5' }}>
            Here you can manage all the aspects of your e-commerce platform.
          </p> */}
          <div className='card shadow-sm    p-3 col-sm-12 col-md-6'>
               <p><strong>Name : </strong>{auth?.user?.name}</p> 
               <p><strong>Email : </strong>{auth?.user?.email}</p> 
               <p><strong>Address : </strong>{auth?.user?.address}</p> 
                
          </div>
        </div>
      </div>
    </div>
    </Layout>
  )
}

export default Dashboard