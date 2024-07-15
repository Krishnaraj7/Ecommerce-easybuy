import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth'


const Login = () => {

    const [auth,setAuth] = useAuth()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    const location = useLocation()

    const handleSubmit = async(e)=>{
        e.preventDefault()
      try {
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{email,password})

        if(res.data.success){
            toast.success(res.data.message) 

            setAuth({
              ...auth,
              user:res.data.user,
              token:res.data.token
            })
            localStorage.setItem("auth",JSON.stringify(res.data))

           
            navigate(location.state ||'/')
          
            
            
           
         }else{
             toast.error(res.data.message) 
         }
        
      } catch (error) {
        console.log(error.message)
        toast.error("something went wrong")
      }
    }


  return (
    <div>
    <Layout title={'Login'}>
        <div style={{height:'80vh', }} className=' d-flex align-items-center justify-content-center flex-column  '>
           <h5 className=' fw-bolder  text-capitalize  '>Log in to your Account</h5>


         <form style={{width:'400px'}}
         onSubmit={handleSubmit}   className=' border    px-5 py-4  shadow-lg      '>
         
<div className="my-3   ">

<input type="email" 
 value={email}
 onChange={(e)=>setEmail(e.target.value)}
className="form-control border border-black rounded-0 fst-italic  " id="exampleInputEmail1"
 placeholder='Email'
 required />

</div>
<div className="mb-2">

<input type="password" 
 value={password}
 onChange={(e)=>setPassword(e.target.value)}
className="form-control border border-black rounded-0 fst-italic  " id="exampleInputPassword1"
 placeholder='Password' 
 required />
</div>

<p  style={{cursor:'pointer',fontSize:'12px'}} className=' text-primary   '><Link className='text-decoration-none' to={'/forgot-password'}>
forgot password?
</Link></p>

<button type="submit" className="btn btn-dark rounded-0 w-100 mt-1 ">Login</button>
<p className='mt-1 fs-6 text-center  '>New here?
<Link to={'/register'} className='ms-2 text-decoration-none '>Register</Link>
</p>

</form>


        </div>
    </Layout>
</div>
  )
}

export default Login