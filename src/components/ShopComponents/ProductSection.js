import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { listProductByIdShop } from "../../Redux/Actions/shopActions";
import {useHistory} from "react-router-dom"
const baseURL = "http://localhost:5000/";

const ProductSection = (props) => {
  const {idShop} = props
  const {pagenumber} = props;
  console.log(pagenumber)
  
  const dispatch = useDispatch();

  const productShop = useSelector((state)=> state.productShop);
  console.log(productShop) ; 
  const {loading, error, page,products, pages} = productShop;
  

  console.log("product===============") ; 
  console.log(products)
 
  
  const [totalPage, setTotalPage] = useState({});
  const product1 = listProductByIdShop(idShop, pagenumber);
  console.log("get product") ; 
  console.log(product1); 
  // useEffect(()=> {
  //   const fetchTotalPage = async () => {
  //     const {data} = await axios.get(`${baseURL}count-all-product`);
  //     setTotalPage(data.result.total_page);
  //   };
  //   fetchTotalPage();
  // },[]);

  useEffect(()=> {
    dispatch(listProductByIdShop(idShop,pagenumber))
  },[dispatch,idShop, pagenumber])

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
                          value={product.rating ? product.rating : 5 }
                          text={`5.5k reviews`}
                        />
                        <h3> { new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(product.price)}</h3>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
 
  
};

export default ProductSection;
