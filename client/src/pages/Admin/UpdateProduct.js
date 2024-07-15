import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { VscThreeBars } from "react-icons/vsc";
import toast from 'react-hot-toast';
import axios from 'axios';
import {Select} from 'antd'
import { FaRegImage } from "react-icons/fa6";


const { Option } = Select;

const UpdateProduct = () => {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id,setId] = useState("")
    
    const navigate = useNavigate()
    const params = useParams()
  
    //get single product
    const getSingleProduct = async()=>{
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`) 
            setName(data.products.name);
            setId(data.products._id)
            setDescription(data.products.description);
            setPrice(data.products.price);
            // setPrice(data.products.price);
            setQuantity(data.products.quantity);
            setShipping(data.products.shipping);
            setCategory(data.products.category._id);
           

            
        } catch (error) {
            console.log(error)
        }
    }

   useEffect(()=>{
    getSingleProduct()
    //eslint-disable-next-line
   },[])
  
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
  
    //update product func
    const handleUpdate=async(e)=>{
        e.preventDefault()

        try {
            const productData = new FormData();
            productData.append("name",name)
            productData.append("description",description);
            productData.append("price",price);
            productData.append("quantity",quantity);
            photo && productData.append("photo", photo);
            productData.append("category",category);

            const {data} = axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`, productData);

            if(data?.success){
                toast.error(data?.message)
            }else{
               
                toast.success("Product Updated successfully")
                
                navigate('/dashboard/admin/products')
            }
            
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }
  
    //delete product
    const handleDelete = async() =>{

        try {
            let answer = window.prompt("Are you sure you want to delete this product ? (yes/no))")
            if(!answer) return
            
            const {data} = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`)
            toast.success("Product deleted successfully")
            navigate('/dashboard/admin/products')
            
            
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
            
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
            <h3>Update Product</h3>
            <div className='m-1 w-75'>
            <Select style={{cursor:'pointer'}} variant={false} placeholder="Select a category" size='large' showSearch  allowClear className='form-select border border-2 rounded-2 border-dark-subtle  mb-3 p-2 w-75 ' onChange={(value)=>{setCategory(value)}} value={category}>
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
                  {photo ? (
                    <div>
                      <img src={URL.createObjectURL(photo)} alt='product image' height={'300px'} className='img img-responsive' />
                    </div>
                  ):(
                    <div>
                      <img src={`${process.env.REACT_APP_API}/api/v1/product/get-productphoto/${id}`} alt='product image' height={'300px'} className='img img-responsive' />
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
                 <Select variant={false} placeholder='Select Shipping' size='large' showSearch className='sorm-select mb-3 border border-2 border-dark-subtle  rounded-2 ' onChange={(value)=>{setShipping(value)}} value={shipping?"yes":"No"}  >

                  <Option value='0'>NO</Option>
                  <Option value='1'>YES</Option>

                 </Select>

                </div>

                <button onClick={handleUpdate} className='btn btn-success rounded-1 '>Update</button>

                <button onClick={handleDelete} className='btn btn-danger rounded-1 ms-3 '>Delete</button>




            </div>
          </div>
        </div>
      </div>
      </Layout>
  )
}

export default UpdateProduct