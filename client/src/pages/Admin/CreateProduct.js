import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { NavLink, useNavigate } from 'react-router-dom';
import { VscThreeBars } from "react-icons/vsc";
import toast from 'react-hot-toast';
import axios from 'axios';
import {Select} from 'antd'
import { FaRegImage } from "react-icons/fa6";


const { Option } = Select;





const CreateProduct = () => {

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate()


  //get all categories
  const getAllCategory = async()=>{
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
      if(data?.success){
        setCategories(data?.category)
        
        
      }
      
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
      
    }
  }

  useEffect(()=>{
    getAllCategory()
  },[])

  //create product func
  const handleCreate = async(e)=>{
    e.preventDefault()
    try {
      const productData = new FormData()
      productData.append("name",name)
      productData.append("description",description)
      productData.append("price",price)
      productData.append("quantity",quantity)
      productData.append("photo",photo)
      productData.append("category",category)
      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`, productData)

      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
        
      } else {
        toast.error(data?.message);
      }
      
    } catch (error) {
      console.log(error)
      toast.error('error')
      
    }
  }




    const [showNav, setShowNav] = useState(false);

    const toggleNav = () => {
      setShowNav(!showNav);
    };


  return (
    <Layout title={'Dashboard - products'}>
  
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
                <NavLink className="nav-link" to="/dashboard/admin/create-product" style={{ color: '#007bff', padding: '10px 15px' }}>
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
            <h3>Create new Product</h3>
            <div className='m-1 w-75'>
            <Select style={{cursor:'pointer'}} variant={false} placeholder="Select a category" size='large' showSearch  allowClear className='form-select border border-2 rounded-2 border-dark-subtle  mb-3 p-2 w-75 ' onChange={(value)=>{setCategory(value)}}>
              {categories?.map(c=>(
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}

            </Select>

                <div className='mb-3'>
                <label className='btn btn-outline-success     '>
                  {photo? photo.name :<>
                    <FaRegImage /> <span>
                    Upload Photo
                      </span>
                  </>}  
                  <input type='file' name='photo' accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])} hidden />
                </label>
                </div>

                <div className='mb-3'>
                  {photo && (
                    <div>
                      <img src={URL.createObjectURL(photo)} alt='product image' height={'300px'} className='img img-responsive' />
                    </div>
                  )}

                </div>

                {/* input field */}

                <div className='mb-3'>
                  <input type='text' value={name} placeholder='Product Name' className='form-control' onChange={(e)=>setName(e.target.value)} />

                </div>

                <div className='mb-3'>
                  <textarea type='text' value={description} placeholder='Product description' className='form-control' onChange={(e)=>setDescription(e.target.value)} />

                </div>

                <div className='mb-3'>
                  <input type='number' value={price} placeholder='Product price' className='form-control' onChange={(e)=>setPrice(e.target.value)} />

                </div>


                <div className='mb-3'>
                  <input type='number' value={quantity} placeholder='Product Quantity' className='form-control' onChange={(e)=>setQuantity(e.target.value)} />

                </div>


                <div className='mb-3'>
                 <Select variant={false} placeholder='Select Shipping' size='large' showSearch className='sorm-select mb-3 border border-2 border-dark-subtle  rounded-2 ' onChange={(value)=>setShipping(value)}   >

                  <Option value='0'>NO</Option>
                  <Option value='1'>YES</Option>

                 </Select>

                </div>

                <button onClick={handleCreate} className='btn btn-success rounded-1 '>Create Product</button>




            </div>
          </div>
        </div>
      </div>
      </Layout>
  )
}

export default CreateProduct