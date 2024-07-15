import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { CiCircleRemove } from "react-icons/ci";
import { Button } from "antd";
import toast from "react-hot-toast";
import { MdOutlineDeleteOutline } from "react-icons/md";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [cartItem, setCartItem] = useState([])

  const navigate = useNavigate();

 


  

  const [totalPrice, setTotalPrice] = useState(() => {
    const storedPrice = localStorage.getItem("totalPrice");
    return storedPrice ? parseFloat(storedPrice) : 0;
  });

  const [quantities, setQuantities] = useState(() => {
    const storedQuantities = localStorage.getItem("quantities");
    return storedQuantities ? JSON.parse(storedQuantities) : {};
  });

  useEffect(() => {
    localStorage.setItem("totalPrice", totalPrice.toString());
    localStorage.setItem("quantities", JSON.stringify(quantities));
  }, [quantities, totalPrice]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleDecreaseQuantity = (itemId) => {
    setQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[itemId] || 1) - 1;
      const updatedQuantities = {
        ...prevQuantities,
        [itemId]: newQuantity >= 1 ? newQuantity : 1,
      };
      return updatedQuantities;
    });
  };

  const handleIncreaseQuantity = (itemId) => {
    setQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[itemId] || 1) + 1;
      const updatedQuantities = { ...prevQuantities, [itemId]: newQuantity };
      return updatedQuantities;
    });
  };

  const calculateTotalPrice = () => {
    let total = 0;
    for (const item of cart) {
      total += item.price * (quantities[item._id] || 1);
    }
    return total;
  };

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [cart, quantities]);

  //delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);

      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      toast.success("Item removed from cart");
    } catch (error) {
      console.log(error);
    }
  };

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

 

  return (
    <Layout>
      <div className="container my-5 w-100">
        <h4>{`Hello ${auth?.token && auth?.user?.name}`}</h4>
        <h6>{`You have ${cart.length} items in your cart`} </h6>

        {cart?.length === 0 ? (
          <div className="text-center mt-4">
            <img
              src="https://thumbs.dreamstime.com/b/empty-paper-bag-composition-shopping-basket-isolated-image-vector-illustration-216637010.jpg"
              alt="Empty Cart"
              className="img-fluid"
              width={"300px"}
            />
            <h5>Your cart is empty</h5>
            <Link to="/shop" className="text-decoration-none">
              Shop here
            </Link>
          </div>
        ) : (
          <div className="row w-100">
            <div className="col-md-8">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/get-productphoto/${item._id}`}
                          alt={item.name}
                          className="img-fluid rounded-1"
                          style={{ width: "80px", height: "80px" }}
                        />
                        <span className="">{item.name}</span>
                      </td>
                      <td>₹{item.price}</td>
                      <td>
                        <div className="border d-flex justify-content-between align-items-center">
                          <button
                            style={{ backgroundColor: "#F2EEE6" }}
                            onClick={() => handleDecreaseQuantity(item._id)}
                            className="btn rounded-0"
                          >
                            -
                          </button>
                          {quantities[item._id] || 1}
                          <button
                            style={{ backgroundColor: "#F2EEE6" }}
                            onClick={() => handleIncreaseQuantity(item._id)}
                            className="btn rounded-0"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        ₹
                        {
                          item.price
                          * (quantities[item._id] || 1)
                        }
                      </td>
                      <td>
                        <button
                          onClick={() => removeCartItem(item._id)}
                          className="border border-0 bg-white"
                        >
                          <MdOutlineDeleteOutline size={25} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-md-4">
              <div className="card p-3">
                <div className="card-body ">
                  <h6 className="card-title">Cart Summary</h6>
                  <hr />
                  <p>Total Items: {cart.length}</p>
                  <p className="fs-5">
                    Total price:{" "}
                    <span className="green-clr-text fw-bold">
                      {" "}
                      ₹ <span className=" fs-3">{totalPrice}</span>
                    </span>
                  </p>

                  {auth?.user?.address ? (
                    <>
                      <div className="mb-3">
                        <p>Address :</p>
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
                      {loading ? "Processing ...." : "Proceed to Buy"}
                    </button>
                  </>
                )}
              </div>

               
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>

     
  );
};


export default CartPage;