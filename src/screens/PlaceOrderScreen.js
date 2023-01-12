import React, { useEffect, useRef  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../Redux/Actions/orderActions";
import { orderContant } from "../Redux/Constants/index";
import Header from "./../components/Header";
import Message from "./../components/LoadingError/Error";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import {BASE_URL_SERVER} from "../Redux/Constants/index" ; 
import { getShopDetail } from "../Redux/Actions/shopActions";
const baseURL = BASE_URL_SERVER;

const PlaceOrderScreen = ({history}) => {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();
  const cart = useSelector((state)=> state.cart);
  const userLogin = useSelector((state)=> state.userLogin)
  const {userInfo} = userLogin;

  useEffect(()=> {
    dispatch(getShopDetail(userInfo.idUser));
  },[dispatch, userInfo.idUser])

  const shopDetail = useSelector((state)=> state.shopDetail )
  const { shopInfo } = shopDetail ;
   
  
  cart.itemsPrice  = cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  
  cart.shippingPrice = cart.itemsPrice > 300000 ? 0 : 15000;

  cart.totalPrice = cart.itemsPrice + cart.shippingPrice;

  const orderCreate = useSelector((state)=> state.orderCreate);
  const {order, success, error} = orderCreate;
  
console.log(shopInfo._id)
  
  useEffect(()=> {
    if (success) {
      // history.push(`/order/${order._id}`);
      dispatch({type: orderContant.ORDER_CREATE_RESET})
    }
  },[history,success,order,dispatch])

  const placeOrderHandler = (e) => {
    e.preventDefault();
    // if(accept) {
      dispatch( 
        createOrder({
          orderItems: cart.cartItems,
          idShop: shopInfo._id,
          shippingInfo: cart.shippingInfo,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          totalPrice: cart.totalPrice,
      }))
    // }else if(reject) {

    // }
    
    // confirm1()
    toast.current.show({severity:'success', summary: 'Đặt hàng', detail:'Đặt hàng thành công', life: 1000});
  };

  const toast = useRef(null);
//   const accept = () => {
//     toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
//   }

// const reject = () => {
//     toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
//   }

// const confirm1 = () => {
//     confirmDialog({
//         message: 'Are you sure you want to proceed?',
//         header: 'Confirmation',
//         icon: 'pi pi-exclamation-triangle',
//         accept,
//         reject
//     });
// };
  return (
    <>
     <Toast ref={toast} />
     <ConfirmDialog />
      <Header />
      <div className="container">
        <div className="row  order-detail">
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row ">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i class="fas fa-user"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Customer</strong>
                </h5>
                <p>{userInfo.username}</p>
                <p>{userInfo.email}</p>
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-truck-moving"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Order info</strong>
                </h5>
                <p>Shipping: J&T Express</p>
                <p>Pay method: {cart.paymentMethod}</p>
              </div>
            </div>
          </div>
          {/* 3 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Deliver to</strong>
                </h5>
                <p>
                  Address: {cart.shippingInfo.address}, {cart.shippingInfo.city}
                </p>
                <p>
                  SDT: {cart.shippingInfo.phone}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row order-products justify-content-between">
          <div className="col-lg-8">
            {
              cart.cartItems.length === 0 ? (
                <Message variant="alert-info mt-5">Your cart is empty</Message>
              ):
              (
                <>
                  {
                    cart.cartItems.map((item, index) => (
                      <div key={index} className="order-product row">
                      <div className="col-md-3 col-6">
                        <img src={`${baseURL}images/products/${item.image}`} alt={item.name} />
                      </div>
                      <div className="col-md-5 col-6 d-flex align-items-center">
                        <Link to={`/products/${item.product}`}>
                          <h6>{item.name}</h6>
                        </Link>
                      </div>
                      <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                        <h4>QUANTITY</h4>
                        <h6>{item.quantity}</h6>
                      </div>
                      <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                        <h4>TỔNG TIỀN</h4>
                        <h6>{ new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(item.quantity * item.price)}</h6>
                      </div>
                    </div>
                    ))
                  }
                </>
              )
            }
           
          </div>
          {/* total */}
          <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>
                    <strong>Products</strong>
                  </td>
                  <td>{cart.itemsPrice} đ</td>
                </tr>
                <tr>
                  <td>
                    <strong>Shipping</strong>
                  </td>
                  <td>{cart.shippingPrice === 0 ? "Freeship" : cart.shippingPrice +" đ" }</td>
                </tr>
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>{cart.totalPrice} đ</td>
                </tr>
              </tbody>
            </table>
            {
              cart.cartItems.length === 0 ? null : (
                <button type="submit" onClick={placeOrderHandler}>
                {/* <Link to="/order" className="text-white"> */}
                  Đặt hàng
                {/* </Link> */}
              </button>
              )
            }
           {
            error &&  (
              <div className="my-3 col-12">
                <Message variant="alert-danger">{error}</Message>
              </div> 
            )
           }
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
