import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from "react-router-dom"; 

import { listProduct, productSearch, searchProduct } from "../../Redux/Actions/ProductActions";
import {BASE_URL_SERVER} from "../../Redux/Constants/index" ; 

const baseURL = BASE_URL_SERVER;

const ShopSection = (props) => {
  const {keyword} = props
  const {pagenumber} = props;
  console.log(pagenumber)
  
  const dispatch = useDispatch();

  const productList = useSelector((state)=> state.productList);
  const {loading, error, products, page, pages} = productList;
  console.log(products)
 
  const productGetFeedback = useSelector((state)=> state.productGetFeedback)
  const {feedbacks} = productGetFeedback;
 
  
  const [totalPage, setTotalPage] = useState({});

  
  useEffect(()=> {
    const fetchTotalPage = async () => {
      const {data} = await axios.get(`${baseURL}count-all-product`);
      setTotalPage(data.result.total_page);
    };
    fetchTotalPage();
  },[]);

  useEffect(()=> {
    dispatch(listProduct(keyword,pagenumber))
  },[dispatch,keyword, pagenumber])

  const history = useHistory();
  
  if(pagenumber > totalPage || Number(pagenumber) === 'NaN') history.push("/notfound")

  return (
    <>
     <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
              {products.length > 0 ? 
              (
                products.map((product) => (
                  <div
                    className="shop col-lg-3 col-md-6 col-sm-6"
                    key={product._id}
                  >
                    <div className="border-product">
                      <Link to={`/products/${product._id}`}>
                        <div className="shopBack">
                          <img src={`${baseURL}images/products/${product.imageProduct}`} alt={product.name} />
                        </div>
                      </Link>

                      <div className="shoptext">
                        <p>
                          <Link to={`/products/${product._id}`}>
                            {product.nameProduct}
                          </Link>
                        </p>

                        <Rating
                          value={product.rating}
                          text={`${product.numReviews} reviews`}
                        />
                        <h3>${product.price}</h3>
                      </div>
                    </div>
                  </div>
                ))
            

              ) 
              :
              (
                <h3 style={{"text-align":"center", "margin-bottom":"100px","margin-top":"80px" }}>Không có sản phẩm nào!</h3>
              )
              }
             
              
                {/* Pagination */}
                <Pagination pages={totalPage} page={pagenumber} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
 
  
};

export default ShopSection;
