import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios'

const Register = () => {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [phone,setPhone] = useState("")
    const [address,setAddress] = useState("")
    const [answer,setAnswer] = useState("")
    const navigate = useNavigate()

    //form function
    const handleSubmit = async(e)=>{
        e.preventDefault()
       try {
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{name,email,password,phone,address,answer});
        if(res.data.success){
           toast.success(res.data.message,{
            theme:"dark"
           }) 
          
            navigate('/login')
          
          
        }else{
            toast.error(res.data.message) 
        }
       } catch (error) {
        console.log(error)
        toast.error("something went wrong")
       }
    }

  return (
    <div>
        <Layout title={'Register'}>
            <div style={{height:'80vh', }} className=' d-flex align-items-center justify-content-center flex-column  '>
               <h5 className=' fw-bolder text-capitalize' >Create An Account</h5>


             <form style={{width:'350px'}} onSubmit={handleSubmit}  className=' border border-0 border border-black  px-5 py-0 shadow-lg    '>
             <div className="my-3 mt-4">
 
    <input type="text" 
    value={name}
    onChange={(e)=>setName(e.target.value)}
    className="form-control border border-black rounded-0 fst-italic " id="exampleInputName"
    placeholder='Name'
    required />
   
  </div>
  <div className="mb-3">
  
    <input type="email" 
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
    className="form-control border border-black rounded-0 fst-italic" id="exampleInputEmail1"
     placeholder='Email'
     required />
   
  </div>
  <div className="mb-3">
    
    <input type="password" 
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    className="form-control border border-black rounded-0 fst-italic" id="exampleInputPassword1"
     placeholder='Password' 
     required />
  </div>
  <div className="mb-3">
   
    <input type="text" 
    value={phone}
    onChange={(e)=>setPhone(e.target.value)}
    className="form-control border border-black rounded-0 fst-italic" id="exampleInputPhone"  placeholder='Phone' 
    required />
   
  </div>
  <div className="mb-3">
   
    <input type="text" 
    value={address}
    onChange={(e)=>setAddress(e.target.value)}
    className="form-control border border-black rounded-0 fst-italic" id="exampleInputAddress"
     placeholder='Address' 
     required />
  </div>

  <div className="mb-3">
   
    <input type="text" 
   
    value={answer}
    onChange={(e)=>setAnswer(e.target.value)}
    className="form-control border border-black rounded-0 fst-italic" id="exampleInputAnswer"
     placeholder='What is your Favorite sport' 
     required />
  </div>
  
  <button type="submit" className="btn btn-dark rounded-0 w-100 mt-1 ">Register</button>
  <p style={{fontSize:'13px'}} className='mt-1  text-center  '>Already have an account?
  <Link to={'/login'} className='ms-2 text-decoration-none '>Login</Link>
  </p>

</form>


            </div>
        </Layout>
    </div>
  )
}

export default Register