import React, { useEffect, useRef } from "react";
import Header from "./../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, removeFromCartDB } from "../Redux/Actions/CartActions";
import { Toast } from 'primereact/toast';
import {BASE_URL_SERVER} from "../Redux/Constants/index" ;
import Item from "antd/lib/list/Item";
import { getInforShop, getShopDetail } from "../Redux/Actions/shopActions";

const baseURL = BASE_URL_SERVER;
const CartScreen = ({match, location, history}) => {
  console.log("hello") ; 
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const productId = match.params.id;
  const quantity = location.search ? Number(location.search.split("=")[1]) : 1

  const userLogin = useSelector((state)=> state.userLogin)
  const {userInfo} = userLogin;

  const cart = useSelector((state)=> state.cart)
  const {cartItems} = cart;

  const totalPrice = cartItems.reduce((a,i) => a + i.quantity * i.price, 0).toFixed(2)
  const shopInfor = useSelector((state)=> state.shopInfor)
  useEffect(()=> {
    dispatch(getShopDetail(userInfo.idUser));
  },[dispatch, userInfo.idUser])

  const shopDetail = useSelector((state)=> state.shopDetail )
  const { shopInfo } = shopDetail ;
  console.log(shopInfo)
  useEffect(()=> {
    if(productId) {
      dispatch(addToCart(productId, quantity))
    }
  },[dispatch, productId, quantity])

  const handleCheckout = () => {
    history.push("/login?redirect=shipping");
  }
  const toast = useRef(null);
  const handleRemoveProduct = (id) => {
    dispatch(removeFromCartDB(userInfo.idUser, id))
    dispatch(removeFromCart(id))
    history.push(`/cart`)
    toast.current.show({severity:'success', summary: 'Xóa sản phẩm', detail:'Xóa sản phẩm thành công', life: 1000});

  }

  return (
    <>
      <Toast ref={toast} />
      <Header />
      {/* Cart */}
      <div className="container">
        {
          cartItems.length === 0 ? 
          (
            <div className=" alert alert-info text-center mt-3">
            Giỏ hàng trống
            <Link
              className="btn btn-success mx-5 px-5 py-3"
              to="/"
              style={{
                fontSize: "12px",
              }}
            >
              SHOPPING NOW
            </Link>
          </div>
          ) :
          (<>
            <div className=" alert alert-info text-center mt-3">
            Total Cart Products
            <Link className="text-success mx-2" to="/cart">
              ({cartItems.length})
            </Link>
          </div>
          {/* cartitem */}
          {
            cartItems.map((item)=> (

              
              <div key={item.product} className="cart-iterm row">
               
              <div
              onClick={() => handleRemoveProduct(item.product)} 
              className="remove-button d-flex justify-content-center align-items-center">
                <i className="fas fa-times"></i>
              </div>
              <div className="cart-image col-md-3">
                <img src={`${baseURL}images/products/${item.image}`} alt={item.name} />
              </div>
              <div className="cart-text col-md-5 d-flex align-items-center">
                <Link to={`/products/${item.product}`}>
                  <h4>{item.name}</h4>
                </Link>
              </div>
              <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
                <h6>QUANTITY</h6>
                <select value={item.quantity} onChange={(e)=> dispatch(addToCart(item.product, Number(e.target.value)))}>
                  {[...Array(item.Totalquantity).keys()].map((x) => (                          
                  <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
              </div>
              <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                <h6>Giá</h6>
               
                <h4>{ new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(item.price)}</h4>
              </div>
            </div>
            ))
          }
        
  
          {/* End of cart iterms */}
          <div className="total">
            <span className="sub">total:</span>
            <span className="total-price">{ new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(totalPrice)}</span>
          </div>
          <hr />
          <div className="cart-buttons d-flex align-items-center row">
            <Link to="/" className="col-md-6 ">
              <button>Continue To Shopping</button>
            </Link>
            {
              totalPrice > 0 && (
                <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                <button onClick={handleCheckout}>
                    Checkout
                </button>
              </div>
              )
            }
           
          </div>
        
        </>
          )
        }
        </div>
       
    </>
  );
};

export default CartScreen;
