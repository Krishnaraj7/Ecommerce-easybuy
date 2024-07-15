import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Layout from '../../components/Layout/Layout'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { VscThreeBars } from "react-icons/vsc";

const Products = () => {

    const [products,setProducts] = useState([])

    //get products
    const getAllProducts = async()=>{
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`)
            setProducts(data.products)
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    useEffect(() => {
      getAllProducts()
    }, [])
    

    const [showNav, setShowNav] = useState(false);

    const toggleNav = () => {
      setShowNav(!showNav);
    };

  return (
    <>
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
            <NavLink className="nav-link" to="/dashboard/admin/products" style={{ color: '#007bff', padding: '10px 15px' }}>
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

    {/* Main Content */}
    <div className="col-md-9 col-sm-12">
      <h4 className="text-center mt-2">Products</h4>
      <div className="d-flex flex-wrap justify-content-center">
        {products?.map(p => (
            <Link className=' text-decoration-none text-black  ' key={p._id} to={`/dashboard/admin/product/${p.slug}`}>
          <div  className="product-card card border-0 m-3 shadow-md" style={{ width: '15rem' }}>
            <img src={`${process.env.REACT_APP_API}/api/v1/product/get-productphoto/${p._id}`} className="card-img-top" alt={p.name} style={{ height: '18rem' }} />
            <div className="card-body">
              <h6 style={{ fontSize: '15px' }}>{p.name}</h6>
              <p style={{ fontSize: '10px' }}>{p.description.slice(0, 60) + '...'}</p>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
</div>
    


    {/* <div className='mt-3'>
        <h4 className=' text-center  '>Products</h4>
        <div className='d-flex flex-wrap justify-content-center'>
  {products?.map(p => (
    <div key={p._id} className="card border-0  m-3" style={{ width: '15rem' }}>
      <img src={`${process.env.REACT_APP_API}/api/v1/product/get-productphoto/${p._id}`} className="card-img-top" alt={p.name} style={{ height: '18rem', }} />
      <div className="card-body">
        <h6 style={{fontSize:'13px'}}>{p.name}</h6>
        <p style={{fontSize:'10px'}}>{p.description.slice(0, 60) + '...'}</p>
      </div>
    </div>
  ))}
</div>
    </div> */}
    </Layout>
    
    </>
   
  )
}

export default Products