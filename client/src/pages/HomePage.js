import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { HiOutlineShoppingBag,HiCheckCircle, HiOutlineShoppingCart } from "react-icons/hi2";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { LiaShippingFastSolid } from "react-icons/lia";
import { AiOutlineDollar } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import { GoPackageDependencies } from "react-icons/go";
import { Checkbox,Radio} from "antd";
import { Prices } from '../components/Prices';
import { AiOutlineReload } from "react-icons/ai";
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';
import { useAuth } from '../context/auth';

const HomePage = () => {

 const [cart,setCart] = useCart()
 const [auth,setAuth] = useAuth()
  const [products,setProducts] = useState([])
  const [categories,setCategories] = useState([])
  const [checked,setChecked] = useState([])
  const [radio,setRadio] = useState([])
  const [showFilters, setShowFilters] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  
  





// Toggle function
const toggleFilters = () => {
  setShowFilters(prevState => !prevState);
};


//add cart 
const addToCart = (item) => {
  const existingItem = cart.find(cartItem => cartItem._id === item._id);
  if (existingItem) {
    toast.error('Item already in cart');
    return;
  }

  const updatedCart = [...cart, item];
  setCart(updatedCart);
  localStorage.setItem(`cart_${auth.user._id}`, JSON.stringify(updatedCart)); // Include user ID in local storage key

  toast.success('Item added to cart', {
    icon: <HiOutlineShoppingBag size={25} />,
    style: {
      borderRadius: '5px',
      background: '#000000',
      color: '#FFF',
    },
  });
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
     
      
    }
  }

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };








  //filter catgory
  const handleFilter = (value,id)=>{
    let all = [...checked]
    if(value){
      all.push(id)
    }else{
      all = all.filter((c)=>c!==id)
    }
    setChecked(all)
  }



  useEffect(()=>{
   if(!checked.length || !radio.length) getAllProducts()
  },[checked.length,radio.length])

  useEffect(()=>{
   if(checked.length || radio.length) filterProduct()
  },[checked,radio])

  //filter product
  const filterProduct = async()=>{
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filter`,{checked,radio})
      setProducts(data?.products)
    } catch (error) {
      console.log(error)
      
    }
  }


  return (
    <Layout title={'Best Offers'}>
     <div  className='w-100 mb-3'>
      <img src='/images/banner1.png' style={{width:'100%',height:' auto'}}  />
     </div>

     <div className='d-flex flex-wrap justify-content-between align-items-center container-fluid'>
  <img src='/images/banner-3.jpg' className='img-fluid mb-3 rounded-0 ' style={{ width: '30%', height: 'auto' }} />
  <img src='/images/banner-4.jpg' className='img-fluid mb-3 rounded-0 ' style={{ width: '30%', height: 'auto' }} />
  <img src='/images/banner-5.jpg' className='img-fluid mb-3 rounded-0 ' style={{ width: '30%', height: 'auto' }} />
</div>

     <div className='row w-100'>
  <h5 className='text-center mt-3'>Products</h5>
  <div className=' my-3 text-center  '>
    <button onClick={toggleFilters} className='btn   w-50 border rounded-0 d-sm-none'>
              {showFilters ? <>
                Filters <MdOutlineKeyboardArrowUp />
              </>:  <>
                Filters <MdKeyboardArrowDown />
              </>} 
            </button>
  </div>
  <div className={`col-md-2 mt-sm-5 ms-2 order-sm-1 ${showFilters ? '' : 'd-none d-sm-block'}`}>

  <div className='border rounded p-3'>
    <h6 className='ps-3 mb-3'>Filter by Category</h6>
    <div className='d-flex flex-column'>
      {categories?.map((c) => (
        <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)} className='mb-2'>
          {c.name}
        </Checkbox>
      ))}
    </div>

    <h6 className='ps-3 mt-3 mb-3'>Filter by Price</h6>
    <div className='d-flex flex-column'>
      <Radio.Group onChange={(e) => setRadio(e.target.value)}>
        {Prices.map((p) => (
          <div key={p._id}>
            <Radio value={p.array} className='mb-2'>{p.name}</Radio>
          </div>
        ))}
      </Radio.Group>
    </div>

    <div className='d-flex justify-content-center mt-4'>
      <button onClick={() => window.location.reload()} className='btn green-clr-bg text-white w-75 '>
        Reset
      </button>
    </div>
  </div>
</div>

<div className='col-md-9 ps-5 mx-auto order-sm-2'>
  <div className='d-flex flex-wrap justify-content-sm-start justify-content-center'>
    {products?.map((p) => (
      <div key={p._id} className="product-card card rounded-0 border-0 m-3 shadow-md" style={{ width: '14rem' }}>
        <Link to={`/product/${p.slug}`} className="text-decoration-none text-dark">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/get-productphoto/${p._id}`}
            className='card-img-top'
            alt={p.name}
            style={{ height: '16rem', objectFit: 'cover' }}
          />
        </Link>
        <div className="card-body">
          <h6 className="card-title mb-2" style={{ fontSize: '16px', fontWeight: 'bold' }}>{p.name}</h6>
          <p className="card-text mb-3" style={{ fontSize: '14px' }}>{p.description.slice(0, 60) + '...'}</p>
          <div className='d-flex justify-content-between align-items-center'>
            <span className='text-muted'>₹{p.price}</span>
            <button onClick={() => addToCart(p)} className='btn green-clr-bg text-white rounded-circle p-2'><HiOutlineShoppingBag size={20} /></button>
          </div>
        </div>
      </div>
    ))}
  </div>

  


 
{/* loadmore */}
  <div className="m-2 p-3 text-center   ">
            {products && products.length < total && (
              <button
                className="btn border-0 shadow-lg  "
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>


</div>

     </div>

     <div  className='w-100 my-5'>
      <img src='/images/bannerad.jpg' style={{width:'100%',height:' 80%'}}  />
     </div>

     <div className="container text-center my-4">
  <div className="d-flex flex-column flex-md-row justify-content-between gap-4">
    <div className="border p-4 flex-fill">
      <LiaShippingFastSolid size={50} />
      <h5 className="mt-2">Free shipping</h5>
      <p>Free Shipping available for most exciting products</p>
    </div>
    <div className="border p-4 flex-fill">
      <BiSupport size={50} />
      <h5 className="mt-2">24X7 Support</h5>
      <p>Contact us 24 hours a day, 7 days a week</p>
    </div>
    <div className="border p-4 flex-fill">
      <GoPackageDependencies size={50} />
      <h5 className="mt-2">30 Days return</h5>
      <p>Simply return within 30 days for an exchange</p>
    </div>
    <div className="border p-4 flex-fill">
      <AiOutlineDollar size={50} />
      <h5 className="mt-2">Secure Payment</h5>
      <p>100% secure payment with various payment options</p>
    </div>
  </div>
</div>
     
      </Layout>
  )
}

export default HomePage
