import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { savePaymentMethod } from "../Redux/Actions/CartActions";
import Header from "./../components/Header";

const PaymentScreen = ({ history}) => {
  window.scrollTo(0, 0);

  const cart = useSelector((state)=> state.cart)
  const {shippingInfo} = cart;

  if(!shippingInfo) {
    history.push("/shipping")
  }


  const [paymentMethod, setPaymentMethod] = useState("ShoppePay")

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod))
    history.push("/placeorder")
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login2 col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>Phương Thức Thanh Toán</h6>
          <div className="payment-container" required>
            <div className="radio-container">
              <input className="form-check-input" type="radio"  value="ShoppePay" onChange={(e)=> setPaymentMethod(e.target.value)}/>
              <label className="form-check-label">Ví ShoppePay</label>
              <img src="images/shoppepay.jpg" alt="" width="40px" height="20px"></img>
            </div>
            <div className="radio-container">
              <input className="form-check-input" type="radio" value="Momo" onChange={(e)=> setPaymentMethod(e.target.value)} />
              <label className="form-check-label">Ví Momo</label>
              <img src="images//momo.jpg" alt="" width="20px" height="20px"/>
            </div>
            <div className="radio-container">
              <input className="form-check-input" type="radio" value="Shipcod" onChange={(e)=> setPaymentMethod(e.target.value)}/>
              <label className="form-check-label">Thanh toán khi nhận hàng</label>
              <img src="images/shipcod.jpg" alt="" width="20px" height="20px"></img>
            </div>
          </div>

          <button type="submit">
            {/* <Link to="/placeorder" className="text-white"> */}
              Tiếp tục
            {/* </Link> */}
          </button>
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
