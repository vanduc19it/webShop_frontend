import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from 'primereact/carousel';
import { Button } from "primereact/button";
import  { Component } from "react";

import Slider from "react-slick";

import '../../../src/carousel.css';
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

// import "~slick-carousel/slick/slick.css"; 
// import "~slick-carousel/slick/slick-theme.css";
import axios from "axios";
const baseURL = "http://localhost:5000/";
const Category = () => {

    const [category, setCategory] = useState({});
    useEffect(()=> {
        const fetchCategory = async () => {
          const {data} = await axios.get(`${baseURL}category`);
          setCategory(data);
        };
        fetchCategory();
      },[]);
    
 
    
        const settings = {
          className: "center",
          centerMode: true,
          infinite: true,
          centerPadding: "60px",
          slidesToShow: 3,
          speed: 500,
          rows: 2,
          slidesPerRow: 2
        };
   

    

        return (
            <div>
              <h2>Multiple Rows</h2>
              <Slider {...settings}>
                <div>
                  <h3>1</h3>
                </div>
                <div>
                  <h3>2</h3>
                </div>
                <div>
                  <h3>3</h3>
                </div>
                <div>
                  <h3>4</h3>
                </div>
                <div>
                  <h3>5</h3>
                </div>
                <div>
                  <h3>6</h3>
                </div>
                <div>
                  <h3>7</h3>
                </div>
                <div>
                  <h3>8</h3>
                </div>
                <div>
                  <h3>9</h3>
                </div>
                <div>
                  <h3>10</h3>
                </div>
                <div>
                  <h3>11</h3>
                </div>
                <div>
                  <h3>12</h3>
                </div>
                <div>
                  <h3>13</h3>
                </div>
                <div>
                  <h3>14</h3>
                </div>
                <div>
                  <h3>15</h3>
                </div>
                <div>
                  <h3>16</h3>
                </div>
              </Slider>
            </div>
          );
        }
export default Category;