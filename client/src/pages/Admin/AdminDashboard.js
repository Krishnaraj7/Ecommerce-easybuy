import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { NavLink } from 'react-router-dom';
import { VscThreeBars } from "react-icons/vsc";

import { useAuth } from '../../context/auth';

const AdminDashboard = () => {

    const [auth] = useAuth()

    const [showNav, setShowNav] = useState(false);

    const toggleNav = () => {
      setShowNav(!showNav);
    };
   

      
  return (
   <Layout title={'Admin Dashboard'}>
  
  <div  className="container-fluid p-3">
      <div className="row">
        {/* Navigation List for Large Screens */}
        <div className={`col-md-3 col-sm-12   `} style={{backgroundColor:'#f8f9fa'}}>
        <h4 style={{ color: '#555', marginBottom: '20px' }}>Admin Dashboard  <span className="col-12 d-md-none">
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
              <NavLink className="nav-link" to="/dashboard/admin/create-category" style={{ color: '#555', padding: '10px 15px' }}>
                Category
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard/admin/create-product" style={{ color: '#555', padding: '10px 15px' }}>
                Create Products
              </NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" to="/dashboard/admin/products" style={{ color: '#555', padding: '10px 15px' }}>
             All Products
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/dashboard/admin/orders" style={{ color: '#555', padding: '10px 15px' }}>
             Orders
            </NavLink>
          </li>
            
          </ul>
          </div>
        </div>

        {/* Toggle Button for Small Screens */}
      

        {/* Main Content */}
        <div className={`col-md-9 col-sm-12${showNav ? ' col-md-offset-3' : ''}`} style={{ padding: '20px' }}>
          <h3>Welcome to the Admin Panel</h3>
          <p style={{ fontSize: '1rem', lineHeight: '1.5' }}>
            Here you can manage all the aspects of your e-commerce platform.
          </p>
          <div className='card shadow-sm    p-3 col-sm-12 col-md-6'>
               <p><strong>Name : </strong>{auth?.user?.name}</p> 
               <p><strong>Email : </strong>{auth?.user?.email}</p> 
               <p><strong>Address : </strong>{auth?.user?.phone}</p> 
                
          </div>
        </div>
      </div>
    </div>

    {/* <div className="container-fluid p-3">
      <div className="row">
        <div className="col-md-3 col-sm-12" >
          <h4 style={{ color: '#555', marginBottom: '20px' }}>Admin Dashboard</h4>
          <ul className="nav flex-column">
         
            <li className="nav-item">
              <NavLink className="nav-link active"  style={{ color: '#007bff', padding: '10px 15px' }}>Dashboard</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={'/dashboard/admin/create-category'} style={{ color: '#555', padding: '10px 15px' }}>Category</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={'/dashboard/admin/create-product'} style={{ color: '#555', padding: '10px 15px' }}>Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={'/dashboard/admin/users'} style={{ color: '#555', padding: '10px 15px' }}>Customers</NavLink>
            </li>
            
          
          </ul>
        </div>
        <div className="col-md-9 col-sm-12" style={{ padding: '20px' }}>
         
          <h1>Welcome to the Admin Panel</h1>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.5' }}>
            Here you can manage all the aspects of your e-commerce platform. Use the navigation on the left to access different sections.
          </p>
        </div>
      </div>
    </div> */}

   </Layout>
  )
}

export default AdminDashboard