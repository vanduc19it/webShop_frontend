import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ProductSection from "../components/shopComponents/ProductSection";
import {getInforShop} from "../Redux/Actions/shopAction" ; 
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";


const baseURL = "http://localhost:5000/";
const ProfileScreen = ({match}) => {
  window.scrollTo(0, 0);
  const idShop = match.params.idShop; 
  const dispatch = useDispatch();


  const shopInfor = useSelector((state)=> state.shopInfor)
  const {loading, error, shop} = shopInfor;
  console.log("shopppp"); 
  console.log(shop); 
  // const {loading, error, shop, page, pages} = shopInfor;
  console.log("shopvip") ; 
  console.log(shopInfor) ; 

  useEffect(()=> {

    dispatch(getInforShop(idShop))
  },[dispatch,idShop])



  return (
    <>
      <Header />
      <div className="container mt-lg-5 mt-3">
        <div className="row align-items-start">
          <div className="col-lg-4 p-0 shadow">
            <div className="shop-card pb-0 pb-md-3">
              <div className="shop-card-cover row">  
                <div div className="shop-card-avatar col-md-5">                

                </div>
                <div className="shop-card-details col-md-7">
                  <h5 className="shop-card-name mb-2">
                  {shop.nameShop}
                  </h5>
                 
                </div>
              </div>
              <div className="shop-card-profile row">
                <div className="shop-card-avatar col-md-5">

                <img src={`${baseURL}images/shops/shop-default.png`} alt="userprofileimage" />



                 
                </div>
                <div className=" col-md-7">
                  <span>Địa chỉ: {shop.address} </span>
                </div>
                <div className="row shop-card-control">

                </div>
                <div className=" col-md-6">
                  <button type="button" className="btn-follow-shop"><b>Follow</b> <i className="pi pi-plus"> </i>
                  </button>
  
                </div>
                <div className=" col-md-6">
                <button type="button" className="btn-follow-shop"><b>Chat</b> <i className="pi pi-comment"></i>
                  </button>
                </div>
              </div>
            </div>

          </div>
          <div className="col-lg-1"></div>
          <div className="col-lg-7 p-0 ">
            <div className="row infor-card-shop">
              <div className="col-lg-6">
                <p className="infor-shop-child"><i class="pi pi-shopping-bag"></i>&nbsp;&nbsp;Sản phẩm:</p>
              </div>
              <div className="col-lg-6">
                <p className="infor-shop-child"><i class="pi pi-users"></i>&nbsp;&nbsp;Người Theo dõi: {shop.followers}</p>
              </div>
              <div className="col-lg-6">
                <p className="infor-shop-child"><i class="pi pi-star"></i>&nbsp;&nbsp;Đánh giá: 5.7(8,8k đánh giá)</p>
              </div>
              <div className="col-lg-6">
                <p className="infor-shop-child"><i class="pi pi-comments"></i>&nbsp;&nbsp;Bình luận: 100 </p>
              </div> 

              <div className="col-lg-6">
                <p className="infor-shop-child"><i class="pi pi-calendar-minus"></i>&nbsp;&nbsp;Tham gia: {moment(Number(shop.createAt)).locale("vi").startOf("second").fromNow() }</p>
              </div>

            </div>
          </div>
        </div>
        <div className="row shop-product">
        <ProductSection idShop={idShop} pagenumber="1" />

        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
