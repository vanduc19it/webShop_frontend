import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash" ; 
import axios from "axios";
import Chartpie from "./chartPie";
import ChartLine from "./chartLine";

import { BASE_URL_SERVER } from "../../Redux/Constants";

const AdminHome = () => {

  const baseURL = BASE_URL_SERVER ; 
  const userLogin = useSelector((state)=> state.userLogin)
  const {userInfo} = userLogin;
  const [statiFeedBack, setFeedBack] = useState({
    quanityFeedback: 0,
    star: {
        star_1: 0,
        star_2: 0,
        star_3: 0,
        star_4: 0,
        star_5: 0
    }
  }) ; 

  const sortMethod = (a, b) => {
    return (Date(a.time) < Date(b.time))
  }
  const [quantiyUser, setQuantiyUser] = useState(0) ; 
  const [categories, setCategories] = useState([]) ; 
  const [countShop , setCountShop] = useState(0) ; 
  const [dateStati, setDateStati] = useState([]);
  const [priceStat, setPriceStat] = useState([]) ; 
  // get thống kê đánh giá
  React.useEffect(()=> {
    const fetchlistFeedBack = async () => {
      const {data} = await axios.get(`${baseURL}feedback/get-statistical-idshop/${userInfo.shopInfor._id}`);


      setFeedBack(data);
    };
    
    fetchlistFeedBack();
  },[]);
  React.useEffect(()=> {
    const fetchlistFeedBack = async () => {
      const {data} = await axios.get(`${baseURL}shop/count-shop`);


      setCountShop(data);
    };
    
    fetchlistFeedBack();
  },[]);

  React.useEffect(()=> {
    const fetchlistFeedBack = async () => {
      const {data} = await axios.get(`${baseURL}getQuanityUser`);
      if(data.result)
      setQuantiyUser(data.result);
    };
    
    fetchlistFeedBack();
  },[]);
  React.useEffect(()=> {
    const fetchlistFeedBack = async () => {
      const {data} = await axios.get(`${baseURL}category`);
      setCategories(data);
    };
    
    fetchlistFeedBack();
  },[]);


  console.log();


  const data_line1 = [100, 342,543 ,74 ,588,623 , 332,  ]
  const data = {
    labels: ['1 sao', '2 sao', '3 sao', '4 sao', '5 sao'],
    datasets: [
      {
        label: '# of Votes',  
        data: [statiFeedBack.star.star_1, statiFeedBack.star.star_2, statiFeedBack.star.star_3, statiFeedBack.star.star_4, statiFeedBack.star.star_5],
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
    labels: dateStati,
    datasets: [
      {
        label: 'Doanh thu',
        data: priceStat,
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
                  <p className="statistical-amount color-blue">{categories.length}</p>
                  <p className="statistical-deatil">DANH MỤC</p>
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
                  <p className="statistical-amount color-red">{quantiyUser}</p>
                  <p className="statistical-deatil">NGƯỜI DÙNG</p>
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
                  <p className="statistical-amount color-Violet">{countShop}</p>
                  <p className="statistical-deatil">CỬA HÀNG</p>
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
