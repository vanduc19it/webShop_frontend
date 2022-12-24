import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {BASE_URL_SERVER} from "../../Redux/Constants/index" ; 
import { listProductByIdShop } from "../../Redux/Actions/shopActions";

const ManageProducts = () =>{
  const baseURL = BASE_URL_SERVER ; 
  const userLogin = useSelector((state)=> state.userLogin)
  const {userInfo} = userLogin;
  const idShop = userInfo.shopInfor._id  ; 
  console.log(idShop) ; 
  const dispatch = useDispatch();


  
  const productShop = useSelector((state)=> state.productShop);
  console.log(productShop) ;  
  const {loading, error, page,products, pages} = productShop;
  const pagenumber = 1 ; 
  useEffect(()=> {
    dispatch(listProductByIdShop(idShop,pagenumber))
  },[dispatch,idShop, pagenumber])
  console.log("choaoaoa") ; 
  console.log(products);  
  console.log("l--------------") ; 
  return (
    <>
    <div className='col-sm-11' >
      <Link to="/admin/my-shop/add-product" style={{float: "right"}}> 
            <div className='btn-admin-addProduct'><span>Thêm sản phẩm</span></div>
      </Link>
    </div>
    <div className='col-sm-1'></div>
    <div className='col-sm-12' style={{    marginTop: "47px"}}>
    <table class="GeneratedTable" align="center" >
          <thead>
            <tr>
              <th style={{textAlignLast: "center" }}>STT</th>
              <th style={{textAlignLast: "center" }}>Ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Ngày đăng</th>
              <th style={{width:"70px"}}>Số lượng còn lại </th>
              <th>đơn giá</th>
              <th></th> 
              <th></th>
             
            </tr>
          </thead>
          <tbody>	
            {products.map((item, index) => (  
                            // #eaeff7cc

              <tr>
                <td style={{textAlignLast: "center" }}>{index + 1}</td>
                <td style={{width:"100px",textAlignLast: "center" }}>              
                  {/* <img src={`${baseURL}images/products/${product.imageProduct}`} alt={product.name} /> */}
                  <img src={`${baseURL}images/products/${item.imageProduct}`} style={{width:"50%"}}  />

                </td>
                <td>{item.nameProduct}</td>
                <td>{ new Date(item.createAt).toLocaleString()}</td>
                <td>{item.quantity}</td> 
                <td>{item.price}</td>
                <td>    
                  <div className='col-sm-11' >
                    <Link style={{float: "right"}}> 
                          <div className='btn-admin-editProduct'><span>Sửa</span></div>
                    </Link>
                  </div>
                </td> 
                <td>    
                  <div className='col-sm-11' >
                    <Link style={{float: "right"}}> 
                          <div className='btn-admin-deleteProduct'><span>Xóa</span></div>
                    </Link>
                  </div>
                </td> 
              </tr>
              
            ))}


            </tbody>
          <tfoot>
            
          </tfoot>
    </table>
    </div>

    </>
  );
}

export default ManageProducts ; 
