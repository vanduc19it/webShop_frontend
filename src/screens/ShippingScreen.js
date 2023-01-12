import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { saveShippingInfo } from "../Redux/Actions/CartActions";

const ShippingScreen = ({history}) => {
  window.scrollTo(0, 0);

  const cart = useSelector((state)=> state.cart)
  const {shippingInfo} = cart;
  
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingInfo({address, city, phone, message}));
    history.push("/payment")
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>Thông Tin Giao Hàng</h6>
          <input type="text" required placeholder="Enter address" value={address} onChange={(e)=> setAddress(e.target.value)}/>
          <input type="text" required placeholder="Enter city" value={city} onChange={(e)=> setCity(e.target.value)}/>
          <input type="text" required placeholder="Enter your phone" value={phone} onChange={(e)=> setPhone(e.target.value)}/>
          <input type="text" required placeholder="Enter your message" value={message} onChange={(e)=> setMessage(e.target.value)}/>
          <button type="submit">
            {/* <Link to="/payment" className="text-white"> */}
              Tiếp tục
            {/* </Link> */}
          </button>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
