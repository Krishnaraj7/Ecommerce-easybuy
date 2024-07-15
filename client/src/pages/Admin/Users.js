import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { NavLink } from 'react-router-dom';
import { VscThreeBars } from "react-icons/vsc";

const Users = () => {

    const [showNav, setShowNav] = useState(false);

    const toggleNav = () => {
      setShowNav(!showNav);
    };


  return (
    <Layout title={'Dashboard - All users'}>
  
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
                <NavLink className="nav-link active" to="/dashboard/admin"  style={{color: '#555',  padding: '10px 15px' }}>
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
                 Crerate Products
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
            <h3>Customers</h3>
            
          </div>
        </div>
      </div>
      </Layout>
  )
}

export default Users