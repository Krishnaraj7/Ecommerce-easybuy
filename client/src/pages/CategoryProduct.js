import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';

const CategoryProduct = () => {
    const params = useParams()
    const [cart,setCart] = useCart()
    const [products,setProducts] = useState([])
    const [category,setCategory] = useState([])

    const getProductsByCategory = async()=>{
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`)

            setProducts(data?.products)
            setCategory(data?.category)
            
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(()=>{
        if(params?.slug) getProductsByCategory()
    },[params?.slug])



    const addToCart = (item) => {
      const existingItem = cart.find(cartItem => cartItem._id === item._id);
      if (existingItem) {
        toast.error('Item already in cart');
        return;
    }
    setCart([...cart,item])
    localStorage.setItem("cart",JSON.stringify([...cart,item]))
    
    toast.success('Item added to cart', {
      icon: (
        <div>
         {/* Cart icon */}
         <HiOutlineShoppingBag size={25} />{/* Green tick icon */}
        </div>
      ),
      style: {
        borderRadius: '5px',
        background: '#000000', // Dark background color
        color: '#FFF', // White text color
      },
    });
    
    
    
    
    }


  return (
    <Layout>
        <div className='container mt-3'>
            <div className='d-flex'>
                <h4>{category?.name}</h4><p className='ms-2 mt-1 '>({products?.length} result found)</p>
            </div>
            <div className='d-flex flex-wrap justify-content-sm-start ps-sm-2 justify-content-center'>
      {products?.map((p) => (
        <div key={p._id}  className="product-card card border-0 m-3 shadow-md m5-3" style={{ width: '14rem' }}>
        <Link to={`/product/${p.slug}`}>
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/get-productphoto/${p._id}`}
                    className='card-img-top'
                   alt={p.name}
                    style={{ height: '16rem' }}
                  />
                </Link>
     <div className="card-body">
       <h6 style={{ fontSize: '15px' }}>{p.name}</h6>
       <p style={{ fontSize: '10px' }}>{p.description.slice(0, 60) + '...'}</p>
      <div className='d-flex justify-content-between '>
        <span className='mt-3'>₹ {p.price}</span>
        {/* <button className='btn  '>see more</button> */}
        <button onClick={() => addToCart(p)} className='btn green-clr-bg text-white  rounded-circle text-center p-2  '><HiOutlineShoppingBag size={20} /></button>
      </div>
     </div>
     </div>
      ))}
    </div>

           

        </div>
    </Layout>
  )
}

export default CategoryProduct
