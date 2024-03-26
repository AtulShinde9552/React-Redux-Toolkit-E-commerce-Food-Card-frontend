import React, { useState, useEffect } from "react";
import "./Cartstyle.css";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {addToCart,removeToCart,removeSigleItem,emptycartItem,} from "../redux/features/cartSlice";
import {loadStripe} from '@stripe/stripe-js';


const CartDetails = () => {
  const [totalprice, setPrice] = useState(0);
  const [totalquantity, setTotalQuantity] = useState(0);
  const dispatch = useDispatch();

  const { carts } = useSelector((state) => state.allCart);

  const InCrement = (i) => {
    dispatch(addToCart(i));
  };

  // remove cart
  const deleteHandle = (e) => {
    dispatch(removeToCart(e));
    toast.success("Item Remove In Your Cart");
  };

  // remove single item
  const handleSingleDelete = (e) => {
    dispatch(removeSigleItem(e));
  };

  // empty cart
  const emptyCart = () => {
    dispatch(emptycartItem());
    toast.success("Your Cart is Empty");
  };

  // count total price
  const total = () => {
    let totalPrice = 0;
    carts.map((ele, ind) => {
      totalPrice = ele.price * ele.qnty + totalPrice;
    });
    setPrice(totalPrice);
  };

  // count total quantity
  const countquantity = () => {
    let totalquantity = 0;
    carts.map((ele, ind) => {
      totalquantity = ele.qnty + totalquantity;
    });
    setTotalQuantity(totalquantity);
  };

  useEffect(() => {
    total();
  }, [total]);

  useEffect(() => {
    countquantity();
  }, [countquantity]);


  // payment integration
  const makePayment = async()=>{
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLICKEY);

    const body = {
    products: carts
    }

    const headers = {
    "Content-Type": "application/json"
    }
    const response = await fetch("https://react-redux-toolkit-e-commerce-food-card-backend.vercel.app/api/create-checkout-session",{
  
    method: "Post",
    headers: headers,
    body: JSON.stringify(body)
  })

  const session = await response.json()

  const result = stripe.redirectToCheckout({
    sessionId : session.id
  })
  
  if (result.error) {
    console.log(result.error);
  }
    
  }

  return (
    <div className="row justify-content-center m-0">
      <div className="col-md-8 mt-5 mb-5 cardsdetails">
        <div className="card">
          <div className="card-header bg-dark p-3">
            <div className="card-header-flex">
              <h5 className="text-white m-0">
                Cart Calculation{carts.length > 0 ? `${carts.length}` : ""}
              </h5>
              {carts.length > 0 ? (
                <button
                  className="btn btn-danger mt-0 btn-sm"
                  onClick={emptyCart}
                >
                  <i className="fa fa-trash-alt mr-2"></i>
                  <span>EmptyCart</span>
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="card-body p-0">
            {carts.length === 0 ? (
              <table className="table cart-table mb-0">
                <tbody>
                  <tr>
                    <td colSpan={6}>
                      <div className="cart-empty">
                        <i className="fa-solid fa-cart-shopping"></i>
                        <p>our Cart Is Empty</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <table className="table cart-table mb-0 table-responsive-sm">
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th className="text-right">
                      <span id="amount" className="amount">
                        Total Amount
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {carts.map((data, index) => {
                    return (
                      <>
                        <tr>
                          <td>
                            <button
                              className="prdct-delete"
                              onClick={() => deleteHandle(data.id)}
                            >
                              {" "}
                              <i className="fa fa-trash-alt mr-2"></i>
                            </button>
                          </td>
                          <td>
                            <div className="product-img">
                              <img src={data.imgdata} alt="" />
                            </div>
                          </td>
                          <td>
                            <div className="product-name">
                              <p>{data.dish}</p>
                            </div>
                          </td>
                          <td>{data.price}</td>
                          <td>
                            <div className="prdct-qty-container">
                              <button
                                className="prdct-qty-btn"
                                type="button"
                                onClick={
                                  data.qnty <= 1
                                    ? () => deleteHandle(data.id)
                                    : () => handleSingleDelete(data)
                                }
                              >
                                <i className="fa fa-minus"></i>
                              </button>
                              <input
                                type="text"
                                className="qty-input-box"
                                value={data.qnty}
                                disabled
                              />
                              <button
                                className="prdct-qty-btn"
                                type="button"
                                onClick={() => InCrement(data)}
                              >
                                <i className="fa fa-plus"></i>
                              </button>
                            </div>
                          </td>
                          <td className="text-right">
                            {data.qnty * data.price}
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <th>&nbsp;</th>
                    <th colSpan={2}>&nbsp;</th>
                    <th>
                      Item In Cart <span className="ml-2 mr-2">:</span>{" "}
                      <span className="text-danger">{totalquantity}</span>
                    </th>
                    <th className="text-right">
                      Total Price<span className="ml-2 mr-2">:</span>{" "}
                      <span className="text-danger">{totalprice}</span>
                    </th>
                    <th className="text-right"><button className="btn btn-success" type="button" onClick={makePayment}>Checkout</button></th>
                  </tr>
                </tfoot>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
