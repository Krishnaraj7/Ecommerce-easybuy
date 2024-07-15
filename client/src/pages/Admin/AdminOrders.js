
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { VscThreeBars } from "react-icons/vsc";
import { useAuth } from '../../context/auth';
import moment from 'moment'
import axios from 'axios';
import { Select } from 'antd';
const { Option } = Select;

const AdminOrders = () => {

    const [showNav, setShowNav] = useState(false);
    const [status,setStatus] = useState(["Not process","Processing","Shipped","Delivered","Cancel"])

    const [changeStatus, setChangeStatus] = useState("")

    const [orders,setOrders] = useState([])
    const [auth,setAuth] = useAuth()

    const toggleNav = () => {
      setShowNav(!showNav);
    };

    const getOrders =async()=>{
        try {
          const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`)
          setOrders(data)
          
        } catch (error) {
          console.log(error)
          
        }
      }

      useEffect(()=>{
        if(auth?.token) getOrders()
      },[auth?.token])

      const handleChange = async(orderId,value)=>{
        try {

            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}` , {status:value})
            getOrders()

            
        } catch (error) {
            console.log(error)
            
        }
      }




  return (
   <Layout>
      <div className="container-fluid p-3">
  <div className="row">
    {/* Navigation List for Large Screens */}
    <div className="col-md-3 col-sm-12" style={{ backgroundColor: '#f8f9fa' }}>
      <h4 style={{ color: '#555', marginBottom: '20px' }}>Admin Dashboard  <span className="col-12 d-md-none">
        <button onClick={toggleNav} className="btn " style={{ marginBottom: '8px' }}>
          <VscThreeBars />
        </button>
      </span></h4>

      <div className={`${showNav ? 'd-none d-md-block' : ''}`}>
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink className="nav-link active" to="/dashboard/admin" style={{ color: '#555', padding: '10px 15px' }}>
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
            <NavLink className="nav-link" to="/dashboard/admin/orders" style={{ color: '#007bff', padding: '10px 15px' }}>
             Orders
            </NavLink>
          </li>
          
         
        </ul>
      </div>
    </div>

    {/* Main Content */}
    <div className="col-md-9 col-sm-12">
     <h3>Orders</h3>


     
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
                          <td>
                            <Select variant = {false} onChange={(value,orderId) => handleChange(order._id,value)} defaultValue={order?.status}>

                               {status.map((s,i)=>(
                                <Option key={i} value={s}>
                                    {s}
                                </Option>
                               ))}

                            </Select>
                          </td>
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
                            <h5 className='fw-semibold'>{product.name}</h5>
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

export default AdminOrders