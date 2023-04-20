import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/cart.css";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "../styles/cart.css"

const Cart = () => {
  const [auth, setAuth] = useAuth();
  const [carts, setCarts] = useState([]);
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      carts?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const saveCart = async (cartItems) => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  const getCartfromLocalStorage = () => {
    const cartItems = localStorage.getItem("cart");
    return cartItems ? JSON.parse(cartItems) : {};
  };

  const getCart = async () => {
    try {
      if (auth?.user) {
        const { data } = await axios.get(
          "http://localhost:8000/api/cart/carts"
        );

        console.log(data.cartItem);
        setCarts(data.cartItem);
        console.log(carts);
        saveCart(data.cartItem);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
    const cartData = getCartfromLocalStorage();
    if (cartData.length > 0) {
      setCarts(cartData);
    } else {
      getCart();
    }
  }, [auth?.user?.token]);

  //detele item

  const removeItem = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8000/api/cart/cart-delete/${id}`
      );

      // console.log(data.updatedCart);
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        "http://localhost:8000/api/product/braintree/payment",
        {
          nonce,
          // cart,
        }
      );
      setLoading(false);
      // localStorage.removeItem("cart");
      // setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div>
        <h1 className="text-center">Cart of {auth?.user?.name}</h1>
        <div className="row">
          <div className="col-md-7 border shadow">
            {carts.length > 0 ? (
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {carts?.map((item) => (
                    <tr key={item._id} className="mb-3">
                      <td>
                        <img
                          src={`http://localhost:8000/api/product/product-photo/${item.products._id}`}
                          width="100"
                          height="130"
                          alt={item.products.name}
                        />
                      </td>
                      <td>{item.products.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                      <button
                        className="btn btn-danger btn-outline-danger"
                        onClick={() => {
                          removeItem(item._id);
                        }}
                      >
                        Remove
                      </button>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h2 className="text-center">No items in cart</h2>
            )}
          </div>
          <div className="col-md-5 cart-summary text-center">
           <h2>Cart Summary</h2>
           <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : {totalPrice()}</h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-2">
                {!clientToken || !auth?.token || !carts?.length ? (
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
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>   
        </div>
      
      
    </Layout>
  );
};

export default Cart;
