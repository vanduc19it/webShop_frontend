import React, { useEffect, useState } from "react";

import axios from "axios";
import Chartpie from "./chartPie";
import ChartLine from "./chartLine";


const AdminHome = () => {
  const data_line1 = [100, 342,543 ,74 ,588,623 , 332,  ]
  const data = {
    labels: ['1 sao', '2 sao', '3 sao', '4 sao', '5 sao'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const data_line = {
    labels: ['Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    datasets: [
      {
        label: 'Doanh thu',
        data: data_line1,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      
    ],
  };
  
  return (
    <>

        <div className="row" align="center">
          <div className="col-sm-1"></div>
          <div className="col-sm-3 card-statistical " >
            <div className="car-admin-statistical">
              <div className="col-sm-12 card-detail">
                <div className="statistical" align="center">
                  <p className="statistical-amount color-blue">7</p>
                  <p className="statistical-deatil">ĐƠN HÀNG</p>
                </div>
                
                <p className="icon"><i className="fas fa-shopping-cart color-blue"></i></p>
              </div>
              <div className="col-sm-12">
                <hr className="line-hr-admin line-hr-blue" />
                <a href=""><button className="btn-card-statistical"> XEM</button></a>
              </div>
            </div>
          </div>
          <div className="col-sm-3 card-statistical " >
            <div className="car-admin-statistical">
              <div className="col-sm-12 card-detail">
                <div className="statistical" align="center">
                  <p className="statistical-amount color-red">7</p>
                  <p className="statistical-deatil">DOANH THU</p>
                </div>
                
                <p className="icon"><i className="	fas fa-money-bill-wave color-red"></i></p>
              </div>
              <div className="col-sm-12">
                <hr className="line-hr-admin line-hr-red" />
                <a href=""><button className="btn-card-statistical"> XEM</button></a>
              </div>
            </div>
          </div>
          <div className="col-sm-3 card-statistical " >
            <div className="car-admin-statistical">
              <div className="col-sm-12 card-detail">
                <div className="statistical" align="center">
                  <p className="statistical-amount color-Violet">7</p>
                  <p className="statistical-deatil">SẢN PHẨM</p>
                </div>
                
                <p className="icon"><i className="	fab fa-wpforms color-Violet"></i></p>
              </div>
              <div className="col-sm-12">
                <hr className="line-hr-admin line-hr-Violet" />
                <a href=""><button className="btn-card-statistical"> XEM</button></a>
              </div>
            </div>
          </div>


        </div>
        <div className="row" style={{marginTop:"20px"}}>
          <div className="col-sm-6">
            <ChartLine data1={data_line}/>
          </div>
          <div className="col-sm-6">
            <Chartpie data1={data}/>
          </div>
 
        </div>
        {}
    </>
  );
};

export default AdminHome;
