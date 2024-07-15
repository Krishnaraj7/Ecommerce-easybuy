import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { NavLink } from 'react-router-dom';
import { VscThreeBars } from "react-icons/vsc";
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import axios from 'axios';

const Profile = () => {

  const [auth,setAuth] = useAuth()

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [phone,setPhone] = useState("")
  const [address,setAddress] = useState("")

    const [showNav, setShowNav] = useState(false);

    const toggleNav = () => {
      setShowNav(!showNav);
    };

    //get initial user data
    useEffect(()=>{
      const {name,email,address,phone} = auth?.user
      setName(name)
      setEmail(email)
      setAddress(address)
      setPhone(phone)
    },[auth?.user])

    //form submition
    const handleSubmit = async(e)=>{
      e.preventDefault()
     try {
      const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`,{name,email,password,phone,address});

      if(data.error){
         toast.error(data.error,{
          theme:"dark"
         }) 
        
         
        
        
      }else{
        setAuth({...auth,user:data?.updatedUser})
        let ls = localStorage.getItem("auth")
        ls = JSON.parse(ls)
        ls.user = data.updatedUser
        localStorage.setItem('auth',JSON.stringify(ls))



          toast.success("Profile updated") 
         
      }
     } catch (error) {
      console.log(error)
      toast.error("something went wrong")
     }
  }


  return (
    
    <Layout title={'Dashboard - profile'}>
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
          <NavLink className="nav-link active"  to="/dashboard/user"  style={{ color: '#555', padding: '10px 15px' }}>
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/dashboard/user/profile" style={{ color: '#007bff', padding: '10px 15px' }}>
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
      <h3>Profile</h3>

      <form onSubmit={handleSubmit} className='w-75 border p-4 rounded-2   '>
        <div className="mb-3 ">
         <label className='form-label'>Name</label>
          <input type="text"  value={name}
    onChange={(e)=>setName(e.target.value)} className="form-control " id="name" name="name" placeholder="Name"  />
        </div>

        <div className="mb-3">
        <label className='form-label'>Email</label>
          <input type="email" value={email}
    onChange={(e)=>setEmail(e.target.value)} className="form-control" id="email" name="email" placeholder="Email"  />
        </div>

        <div className="mb-3">
        <label className='form-label'>Password</label>
          <input type="password"  value={password}
    onChange={(e)=>setPassword(e.target.value)} className="form-control" id="password" name="password" placeholder="Password"  />
        </div>

        <div className="mb-3">
        <label className='form-label'>Phone</label>
          <input type="text"  value={phone}
    onChange={(e)=>setPhone(e.target.value)}className="form-control" id="phone" name="phone" placeholder="Phone"  />
        </div>
        
        <div className="mb-3">
        <label className='form-label'>Address</label>
          <input type="text" 
    value={address}
    onChange={(e)=>setAddress(e.target.value)}
    className="form-control " 
    id="address" name="address" placeholder="Address"
      />
        </div>

        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
      {/* <p style={{ fontSize: '1rem', lineHeight: '1.5' }}>
        Here you can manage all the aspects of your e-commerce platform.
      </p> */}
     
    </div>
  </div>
</div>
</Layout>

  )
}

export default Profile