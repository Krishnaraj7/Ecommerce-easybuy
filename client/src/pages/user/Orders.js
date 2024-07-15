import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { NavLink } from 'react-router-dom';
import { VscThreeBars } from "react-icons/vsc";
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment'



const Orders = () => {

    const [showNav, setShowNav] = useState(false);
    const [orders,setOrders] = useState([])
    const [auth,setAuth] = useAuth()

    const toggleNav = () => {
      setShowNav(!showNav);
    };


      const getOrders =async()=>{
        try {
          const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`)
          setOrders(data)
          
        } catch (error) {
          console.log(error)
          
        }
      }

      useEffect(()=>{
        if(auth?.token) getOrders()
      },[auth?.token])






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
              <NavLink className="nav-link active" to="/dashboard/user"  style={{ color: '#555', padding: '10px 15px' }}>
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard/user/profile" style={{ color: '#555', padding: '10px 15px' }}>
               Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard/user/orders" style={{ color: '#007bff', padding: '10px 15px' }}>
               Orders
              </NavLink>
            </li>
          
          </ul>
          </div>
        </div>

        {/* Toggle Button for Small Screens */}
      

        {/* Main Content */}
        <div className={`col-md-9 col-sm-12${showNav ? ' col-md-offset-3' : ''}`} style={{ padding: '20px' }}>
          <h3>Orders</h3>
          {/* <p style={{ fontSize: '1rem', lineHeight: '1.5' }}>
            Here you can manage all the aspects of your e-commerce platform.
          </p> */}

       
              <div className='border shadow'>
              {orders.map((order, index) => (
                <>
                  <div key={index} className='table-responsive'>
                    <table className='table '>
                      <thead>
                        <tr>
                          <th scope='col'>#</th>
                          <th scope='col'>Status</th>
                          <th scope='col'>Buyer</th>
                          <th scope='col'>Date</th>
                          <th scope='col'>Payment</th>
                          <th scope='col'>Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{order?.status}</td>
                          <td>{order?.buyer?.name}</td>
                          <td>{moment(order?.createAt).fromNow()}</td>
                          <td>{order?.payment.success ? 'Success' : 'Failed'}</td>
                          <td>{order?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    </div>
                  
                    <div className='container'>
                      {order?.products?.map((product, i) => (
                        <div key={i} className='row mb-2 p-3 card flex-row'>
                          <div className='col-md-4'>
                            <img
                              src={`${process.env.REACT_APP_API}/api/v1/product/get-productphoto/${product._id}`}
                              className='card-img-top img-fluid'
                              alt={product.name}
                            />
                          </div>
                          <div className='col-md-8'>
                            <p className='fw-semibold'>{product.name}</p>
                            <p className='w-50'>{product.description.slice(0, 100) + '...'}</p>
                            <p>Price: ${product.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  
                </>
              ))}
            </div>
            
       
         
        </div>
      </div>
    </div>
    </Layout>
  )
}

export default Orders