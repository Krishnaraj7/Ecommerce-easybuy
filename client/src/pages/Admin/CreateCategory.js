import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { NavLink } from 'react-router-dom';
import { VscThreeBars } from "react-icons/vsc";
import toast from 'react-hot-toast';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import CategoryForm from '../../components/Form/CategoryForm';
import {Modal} from 'antd'

 



const CreateCategory = () => {

  const [categories,setCategories] = useState([])
  const [name,setName] = useState("");
  const [visible,setVisible] = useState(false)
  const [selected,setSelected] = useState(null)
  const [updatedName,setUpdatedName ] = useState("")
 

  //handle form
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`,{name})

      if(data?.success){
        toast.success(`${name} is created`)
        getAllCategory();
        setName("")
      }else{
        console.log(data?.message)
        toast.error(data?.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error("error in input form")
      
    }
  }

  //get categoriees
  const getAllCategory = async()=>{
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
      if(data.success){
        setCategories(data.category)
        
        
      }
      
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
      
    }
  }

    const [showNav, setShowNav] = useState(false);

    const toggleNav = () => {
      setShowNav(!showNav);
    };

    useEffect(()=>{
      getAllCategory()
    },[])


    const handleUpdate = async(e)=>{
      e.preventDefault()
      try {
       const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,{name:updatedName})
       if(data.success){
        toast.success("Category Updated")
        setSelected(null)
        setUpdatedName("")
        setVisible(false)
        getAllCategory()
       }else{
        toast.error(data.message)
       }
      } catch (error) {
        toast.error("Something went wrong")
      }
    }

    const handleDelete = async(pId)=>{
     
      try {
       const {data} = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`)
       if(data.success){
        toast.success(`${name} Deleted`)
       
        getAllCategory()
       }else{
        toast.error(data.message)
       }
      } catch (error) {
        toast.error("Something went wrong")
      }
    }


  return (
    <Layout title={'Dashboard - Category'}>
  
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
                <NavLink className="nav-link" to="/dashboard/admin/create-category" style={{ color: '#007bff', padding: '10px 15px' }}>
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
            <h3>Manage category</h3>

            <div>
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
            </div>


            <div>
        <table className="table border table-hover p-2   ">
  <thead>
    <tr>
     
      <th scope="col">Category Name</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
   
     {categories?.map(c=>(
      <>
       <tr>
      <td key={c._id}>{c.name}</td>
      <td><button onClick={()=>{setVisible(true); setUpdatedName(c.name); setSelected(c)}} className='btn text-success '><FaEdit /></button>
      <button onClick={()=>handleDelete(c._id)} className='btn text-danger '><MdDelete /></button>
      </td>
     
    
    </tr>
      </>
      
     ))}
   
  </tbody>
</table>

            </div>

        <Modal  onCancel={()=>setVisible(false)} open={visible} footer={null}>
          <h5>Edit Category</h5>

         <div className=' ms-5  '>
           <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
         </div>

        </Modal>
           
          </div>
        </div>
      </div>
      </Layout>
  )
}

export default CreateCategory