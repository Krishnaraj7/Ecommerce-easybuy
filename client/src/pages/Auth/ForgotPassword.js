import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import {  useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';


const ForgotPassword = () => {

   
    const [email,setEmail] = useState("")
   
    const [newPassword,setNewPassword] = useState("")
    const [answer,setAnswer] = useState("")
    const navigate = useNavigate()
    

    const handleSubmit = async(e)=>{
        e.preventDefault()
      try {
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,{email,newPassword,answer})
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
   <Layout>
     <div style={{height:'80vh', }} className=' d-flex align-items-center justify-content-center flex-column  '>
           <h5 className=' fw-bolder  text-capitalize  '>Reset your password</h5>


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
<div className="my-3   ">

<input type="text" 
 value={answer}
 onChange={(e)=>setAnswer(e.target.value)}
className="form-control border border-black rounded-0 fst-italic  " id="exampleInputName"
 placeholder='Your fav sport'
 required />

</div>
<div className="mb-2">

<input type="password" 
 value={newPassword}
 onChange={(e)=>setNewPassword(e.target.value)}
className="form-control border border-black rounded-0 fst-italic  " id="exampleInputPassword1"
 placeholder='New Password' 
 required />
</div>



<button type="submit" className="btn btn-dark rounded-0 w-100 mt-1 ">Reset</button>


</form>


        </div>
   </Layout>
  )
}

export default ForgotPassword