import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios  from 'axios';
import { Link} from "react-router-dom";
import { BASE_URL_SERVER } from "../../Redux/Constants";

const AdminCategoies = () => {

    const baseURL = BASE_URL_SERVER   ; 

    const [listCategory, setlistCategory] = React.useState([]) ; 
   // React.useEffect(()=> {
    const fetchListOrder = async () => {
        const {data} = await axios.get(`${baseURL}category`);
        setlistCategory(data);
      };
      fetchListOrder();
    // },[]);
    console.log(listCategory) ; 
  return (
    <>


<div className="row" align="center">
    <div className='col-sm-11' >
        <a href="/web/admin/add-category" style={{float: "right"}}> 
            <div className='btn-admin-addProduct'><span>Thêm danh mục</span></div>
        </a>
    </div>
    <div className='col-sm-1'></div>
        <table class="GeneratedTable" align="center" >
          <thead>
            <tr>
              <th style={{textAlignLast: "center" }}>STT</th>
              <th style={{textAlignLast: "center" }}>Tên phân loại</th>
              <th>Ảnh </th>
              <th>Ngày đăng</th>
              <th></th>

              <th></th> 
             
            </tr>
          </thead>
          <tbody>	
            {listCategory.map((item, index) => (  
                            // #eaeff7cc

              <tr>
                <td style={{textAlignLast: "center" }}>{index + 1}</td>
                <td >{item.nameCategory}</td>
                <td style={{textAlignLast: "center" }} >
                    <img src={`${baseURL}images/categories/${item.imageCategory}`} style={{width:"50%"}}  />

                </td>
                <td >{ new Date(item.createAt).toLocaleString()}</td>
                <td>    
                  <div className='col-sm-11' >
                    <a href={``} style={{float: "right"}}> 
                          <div className='btn-admin-editProduct'><span>Sửa</span></div>
                    </a>
                  </div>
                </td> 
                <td style={{textAlignLast: "center" }}> 
                    <div >
                        <Link > 
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

export default AdminCategoies;
