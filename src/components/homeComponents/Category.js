import React, { useEffect, useState } from "react";
import  { Component } from "react";
import Slider from "react-slick";
import axios from "axios";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../src/carousel.css";
import {BASE_URL_SERVER} from "../../Redux/Constants/index" ; 

const baseURL = BASE_URL_SERVER;

const Category = () => {

    const [category, setCategory] = useState([]);

      useEffect(()=> {
        const fetchCategory = async () => {
          const {data} = await axios.get(`${baseURL}category`);
          setCategory(data);
        };
        fetchCategory();
      },[]);
      console.log(category)
      
   
  const [defaultImage, setDefaultImage] = useState({});
  const settings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 8,
    slidesToScroll: 3,
    initialSlide: 0,
    rows: 2,
    slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

 

  return (
    <div className="App">
      <Slider {...settings}>
        {category.map((item) => (
          <div className="card">
            <div className="card-top">
              <img
                src={
                  `${baseURL}images/categories/${item.imageCategory}`}
                alt={item.title}
                
              />
              <h1>{item.nameCategory}</h1>
            </div>
            <div className="card-bottom">
              <h3>{item.price}</h3>
              <span className="category">{item.category}</span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
        }
export default Category;
