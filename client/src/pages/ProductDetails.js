import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import toast from 'react-hot-toast';
import DropIn from "braintree-web-drop-in-react";

const ProductDetails = () => {

    const params = useParams()
    const [product,setProduct] = useState({})
    const [relatedProducts,setRelatedProducts] = useState([])
    const [cart ,setCart] = useCart();
    const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //get payment gateway
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async()=>{
    try {
      setLoading(true)
      const {nonce} = await instance.requestPaymentMethod()
      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,{
        nonce,cart
      })
      setLoading(false)
      localStorage.removeItem('cart')
      setCart([])
      navigate('/dashboard/user/orders')
      toast.success("Payment Successfully Completed")
      
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


   
  
    //add cart 
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

    

    const getProduct= async()=>{
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.products)

            getSimiliarProducts(data?.products._id,data?.products.category._id)
            
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(()=>{
        if(params?.slug) getProduct()
    },[params?.slug])

    //get similiar products
    const getSimiliarProducts = async(pid,cid)=>{
      try {
        const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`)

        setRelatedProducts(data?.products)
        
      } catch (error) {
        console.log(error)
      }
    }





  return (
   <Layout>
    <div className="container mt-5">
  <div className="row">
    <div className="col-md-6">
      <img
        src={`${process.env.REACT_APP_API}/api/v1/product/get-productphoto/${product._id}`}
        alt={product.name}
        className="img-fluid rounded"
        style={{ maxHeight: '600px' }}
      />
    </div>
    <div className="col-md-6 mt-3">
      <h1 className="fw-bold">{product.name}</h1>
      <p className="fs-3 green-clr-text fw-semibold">₹{product.price}</p>
      <p>{product.description}</p>
      <button onClick={() => addToCart(product)} className="btn green-clr-bg text-white px-5 rounded-0">Add to Cart</button>

      <div className='mt-4'>
        {auth?.user?.address ? (
                      <>
                        <div className="mb-3">
                        
                          <div className="d-flex ">
                            <h6 className="btn border ">{auth?.user?.address}</h6>
                            <h6
                              onClick={() => navigate("/dashboard/user/profile")}
                              className="btn   btn-outline-success ms-4 "
                            >
                              Update Address
                            </h6>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="mb-3">
                        {auth?.token ? (
                          <button
                            onClick={() => navigate("/dashboard/user/profile")}
                            className="btn   rounded-0 green-clr-bg text-white "
                          >
                            Update Address
                          </button>
                        ) : (
                          <div className="">
                            <button
                              onClick={() =>
                                navigate("/login", {
                                  state: "/cart",
                                })
                              }
                              className="btn   rounded-0 w-100 green-clr-bg text-white "
                            >
                              Please Login to Checkout
                            </button>
                          </div>
                        )}
                      </div>
                    )}
      </div>

<div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn w-100 green-clr-bg text-white"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Buy Now"}
                    </button>
                  </>
                )}
              </div>
    </div>
  </div>
  <hr className="mt-5" />
  <div className="row mt-5">
    {relatedProducts?.length > 0 && (
      <div className="col-12">
        <h3 className="text-center mb-4">Similar Products</h3>
      </div>
    )}
    <div className="d-flex flex-wrap justify-content-center">
      {relatedProducts?.map(p => (
        <div key={p._id} className="product-card card border-0 m-3 shadow-md" style={{ width: '16rem' }}>
          <Link to={`/product/${p.slug}`} className="text-decoration-none text-dark">
            <img
              src={`${process.env.REACT_APP_API}/api/v1/product/get-productphoto/${p._id}`}
              className="card-img-top"
              alt={p.name}
              style={{ height: '17rem', objectFit: 'cover' }}
            />
          </Link>
          <div className="card-body">
            <h6 className="card-title mb-2" style={{ fontSize: '15px', fontWeight: 'bold' }}>{p.name}</h6>
            <p className="card-text mb-3" style={{ fontSize: '12px' }}>{p.description.slice(0, 60) + '...'}</p>
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-muted">₹{p.price}</span>
              <button onClick={() => addToCart(p)} className="btn green-clr-bg text-white rounded-circle p-2"><HiOutlineShoppingBag size={20} /></button>
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

export default ProductDetails