import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios  from 'axios';
import { Link} from "react-router-dom";


import { BASE_URL_SERVER } from "../../Redux/Constants";

const AdminUser = () => {
    const baseURL = BASE_URL_SERVER   ; 

    const [listUser, setListUser] = React.useState([]) ; 
   // React.useEffect(()=> {
    const fetchListOrder = async () => {
        const {data} = await axios.get(`${baseURL}get-list-user`);
        if(data.result)
            setListUser(data.result);
      };
      fetchListOrder();
    // },[]);
    console.log(listUser) ; 
  return (
    <>

        <div className="row" align="center">
        <table class="GeneratedTable" align="center" >
          <thead>
            <tr>
              <th style={{textAlignLast: "center" }}>STT</th>
              <th style={{textAlignLast: "center" }}>idUser</th>
              <th>Tên người dùng</th>
              <th>Ảnh người dùng</th>
              <th>Giới tính</th>
              <th>Email</th>
              <th>Phone</th>

              <th>Ngày đăng ký</th>

              <th></th> 
             
            </tr>
          </thead>
          <tbody>	
            {listUser.map((item, index) => (  
                            // #eaeff7cc

              <tr>
                <td style={{textAlignLast: "center" }}>{index + 1}</td>
                <td >{item._id}</td>
                <td >{item.username}</td>
                <td style={{textAlignLast: "center" }} >
                    <img src={`${baseURL}images/users/${item.avatar}`} style={{width:"50%"}}  />

                </td>
                <td >{item.gender}</td>

                <td >{item.local.email}</td>
                <td >{item.phone}</td>
                <td >{ new Date(item.createAt).toLocaleString()}</td>
                <td style={{textAlignLast: "center" }}> 
                    <div >
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
        {}
    </>
  );
};

export default AdminUser;
