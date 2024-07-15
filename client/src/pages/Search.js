import React from 'react'
import { useSearch } from '../context/search'
import Layout from '../components/Layout/Layout'
import { HiOutlineShoppingBag } from "react-icons/hi2";

const Search = () => {

    const [values,setValues] = useSearch()
  return (
   <Layout>
    <div className='container mt-4 '>
        <div className='text-center mt-2'>
        <h4>Search results </h4>
        <h6>{values?.results.length < 1 ? "No products found" : ""}</h6>

        <div className=' d-flex  flex-wrap justify-content-sm-start ps-sm-2  justify-content-center mt-4  '>
  {values?.results.map(p => (
           
          <div  className="product-card card border-0 m-3 shadow-md m5-3" style={{ width: '13rem' }}>
            <img src={`${process.env.REACT_APP_API}/api/v1/product/get-productphoto/${p._id}`} className="card-img-top" alt={p.name} style={{ height: '16rem' }} />
            <div className="card-body">
              <h6 style={{ fontSize: '15px' }}>{p.name}</h6>
              <p style={{ fontSize: '10px' }}>{p.description.slice(0, 60) + '...'}</p>
             <div className='d-flex justify-content-between '>
               <span className='mt-3'>₹ {p.price}</span>
               {/* <button className='btn  '>see more</button> */}
               <button className='btn green-clr-bg text-white rounded-circle p-2  '><HiOutlineShoppingBag size={20} /></button>
             </div>
            </div>
          </div>
         
        ))}
  </div>


        </div>
    </div>
   </Layout>
  )
}

export default Search