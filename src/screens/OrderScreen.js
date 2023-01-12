import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import { PayPalButton } from "react-paypal-button-v2";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetail, getOrderSingle } from "../Redux/Actions/orderActions";
import Message from "./../components/LoadingError/Error";
import Loading from "./../components/LoadingError/Loading";
import moment from "moment";
import {BASE_URL_SERVER} from "../Redux/Constants/index";

const baseURL = BASE_URL_SERVER;


const OrderScreen = ({match}) => {
  window.scrollTo(0, 0);
  const orderId = match.params.id

  const dispatch = useDispatch();

  const userLogin = useSelector((state)=> state.userLogin)
  const {userInfo} = userLogin;

  const orderSingle = useSelector((state)=> state.orderSingle)
  const {order, loading, error} = orderSingle;

  console.log(order)
  
  if(!loading) {
    order.itemsPrice  = order.productItems.reduce((acc, item) => acc + item.unit_price * item.quantity, 0)
  
    order.shippingPrice = order.itemsPrice > 300000 ? 0 : 15000;
  
    order.totalPrice = order.itemsPrice + order.shippingPrice;
  }
  useEffect(()=> {
    dispatch(getOrderSingle(orderId));
  },[dispatch, orderId])
  const [status, setStatus] = useState('')
 
  useEffect(()=> {
    if(order) {
      if(order.status == 1) 
      {
        setStatus('Đang chờ xác nhận')
      }else if(order.status == 2) 
      {
        setStatus('Đã xác nhận')
      }else if(order.status == 3) 
      {
        setStatus('Đang giao hàng')
      }else
      {
        setStatus('Đã giao hàng')
      }

    }
  },[order])
 

  return (
    <>
      <Header />
      <div className="container">
        {
          loading ? (<Loading/>): error ? ( <Message variant="alert-danger">{error}</Message>) :
          (
           
            <>
  <div className="row  order-detail">
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Customer</strong>
                </h5>
                <p>{order.namedReceiver}</p>
                <p>
                  <a href={`mailto:${userInfo.email}`}>{userInfo.email}</a>
                </p>
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
                <p>Pay method: {order.payment}</p>
                {
                  order.isPaid ? ( 
                  <div className="bg-info p-2 col-12">
                  <p className="text-white text-center text-sm-start">
                    Đã thanh toán: {moment(order.paidAt).calendar()}
                  </p>
                </div>
                ):(
                  <div className="bg-danger p-2 col-12">
                  <p className="text-white text-center text-sm-start">
                    Chưa thanh toán.
                  </p>
                </div>
                )
                }
               
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
                  Address: {order.addressReceiver}, {order.city}
                </p>
                <p>
                  SDT: {order.phoneReceiver}
                </p>
                {
                  order.isDelivered ? ( 
                  <div className="bg-info p-2 col-12">
                  <p className="text-white text-center text-sm-start">
                    Đã nhận được hàng: {moment(order.deliveredAt).calendar()}
                  </p>
                </div>
                ):(
                  <div className="bg-danger p-2 col-12">
                  <p className="text-white text-center text-sm-start">
                  Trạng thái đơn hàng: {status}
                  </p>
                </div>
                )
                }
              </div>
            </div>
          </div>
        </div>

        <div className="row order-products justify-content-between">
          <div className="col-lg-8">
           
                {
                  order.length === 0 ? (
                    <Message variant="alert-info mt-5">Your order is empty</Message>
                  ) : 
                  (
                    <>
                    {
                      order.productItems.map((item, index)=> (
                    <div key={index} className="order-product row">
                      <div className="col-md-3 col-6">
                        <img src={`${baseURL}images/products/${item.imgProduct}`} alt={item.nameProduct} />
                      </div>
                      <div className="col-md-5 col-6 d-flex align-items-center">
                        <Link to={`/products/${item.idProduct}`}>
                          <h6>{item.nameProduct}</h6>
                        </Link>
                      </div>
                      <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                        <h4>SỐ LƯỢNG</h4>
                        <h6>{item.quantity}</h6>
                      </div>
                      <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                        <h4>GIÁ</h4>
                        <h6>{item.quantity * item.unit_price} đ</h6>
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
                  <td>{order.itemsPrice} đ</td>
                </tr>
                <tr>
                  <td>
                    <strong>Shipping</strong>
                  </td>
                  <td>{order.shippingPrice == 0 ? "Freeship" : order.shippingPrice +" đ" }</td>
                </tr>
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>{order.totalPrice} đ</td>
                </tr>
              </tbody>
            </table>
            <div className="col-12">
              {/* <PayPalButton amount={345} /> */}
            </div>
          </div>
        </div>
            </>
          )
        }
      
      </div>
    </>
  );
};

export default OrderScreen;
