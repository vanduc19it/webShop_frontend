import React, { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";

import Header from "./../components/Header";
import Rating from "../components/homeComponents/Rating";
import { Link } from "react-router-dom";
import Message from "./../components/LoadingError/Error";
import { useDispatch, useSelector } from "react-redux";
import { getProductFeedback, listProductDetail } from "../Redux/Actions/ProductActions";
import Loading from "./../components/LoadingError/Loading";
// import { Rating } from 'primereact/rating';
import 'primeicons/primeicons.css';
import { PRODUCT_CREATE_FEEDBACK_RESET } from "../Redux/Constants/ProductConstants";
import moment from "moment";
const baseURL = "http://localhost:5000/";


const SingleProduct = ({ match }) => {
  
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const productId = match.params.id;
 
  const dispatch = useDispatch();

  const productDetail = useSelector((state)=> state.productDetail)
  const {loading, error, product} = productDetail;

  const userLogin = useSelector((state)=> state.userLogin)
  const {userInfo} = userLogin;

  const productGetFeedback = useSelector((state)=> state.productGetFeedback)
  const {feedbacks} = productGetFeedback;
  
  


  

  const productCreateFeedback = useSelector((state)=> state.productCreateFeedback)
  const {loading: loadingCreateFeedback, error: errorCreateFeedback, success: successCreateFeedback } = productCreateFeedback;

  useEffect(()=> {
    if(successCreateFeedback) {
      alert("feedback submitted")
      setRating(0)
      setComment("")
      dispatch({type: PRODUCT_CREATE_FEEDBACK_RESET})
    }
    dispatch(listProductDetail(productId))
   
  }, [dispatch, productId, successCreateFeedback]);
    
  useEffect(()=> {
    dispatch(getProductFeedback(productId))
  },[dispatch,productId])
 


  return (
    <>
      <Header />
      <div className="container single-product">
      {
        loading ? (
          <Loading/>
        )
        : error ? (
          <Message variant="alert-danger">{error}</Message>
        )
        : (
          <>
          
        <div className="row">
          <div className="col-md-6">
            <div className="single-image">
              <img src={`${baseURL}images/products/${product.imageProduct}`} alt={product.name} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="product-dtl">
              <div className="product-info">
                <div className="product-name">{product.nameProduct}</div>
              </div>
              
              <div>{ReactHtmlParser(product.description)}</div>

              <div className="product-count col-lg-7 ">
                <div className="flex-box d-flex justify-content-between align-items-center">
                  <h6>Price</h6>
                  <span>${product.price}</span>
                </div>
                <div className="flex-box d-flex justify-content-between align-items-center">
                  <h6>Status</h6>
                  {product.countInStock > 0 ? (
                    <span>In Stock</span>
                  ) : (
                    <span>unavailable</span>
                  )}
                </div>
                <div className="flex-box d-flex justify-content-between align-items-center">
                  <h6>Reviews</h6>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </div>
                {product.countInStock > 0 ? (
                  <>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Quantity</h6>
                      <select>
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button className="round-black-btn">Add To Cart</button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* RATING */}
        <div className="row my-5">
          <div className="col-md-6">
            <h6 className="mb-3">FEEDBACKS</h6>

            {feedbacks.length === 0 && (
                <Message variant={"alert-info mt-3"}>No Reviews</Message>
              )}
            {feedbacks.map((feedback) => (
                <div key={feedback._id} className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded">
                  
                  <img src = {`${baseURL}images/users/${feedback.user.avatar}`} style={{"width": "42px","margin-top":"14px","margin-right":"10px"}} alt={feedback.user.username}/>
                 
                  <strong style={{}} >{feedback.user.username}</strong>
                  <span style={{marginTop:"30px",marginLeft:"-150px","position": "absolute","padding-top":"2px"}}>
                  <Rating  style={{"transform": "scale(1.6)"}} value={feedback.rate}/>
                  </span>
                  
                 
                  
                  <span style={{marginTop:"60px",marginBottom:"30px",marginLeft:"-150px","position": "absolute"}}>{moment(Number(feedback.createAt)).locale("vi").startOf("second").fromNow() }</span>
                  
                  <div className="alert alert-info mt-3" style={{}}>
                   {feedback.comment}
                  </div>
                </div>  
              ))
            }

           
            
          </div>
          <div className="col-md-6">
            {/* rate */}
            <h6>ĐỂ LẠI ĐÁNH GIÁ VỀ SẢN PHẨM</h6>
            <div className="my-4"></div>

            <form>
              <div className="my-4">
                <strong>Rating</strong>
                <select className="col-12 bg-light p-3 mt-2 border-0 rounded">
                  <option value="">Select...</option>
                  <option value="1">1 - Quá thất vọng</option>
                  <option value="2">2 - Thất vọng</option>
                  <option value="3">3 - Bình thường</option>
                  <option value="4">4 - Tốt</option>
                  <option value="5">5 - Tuyệt vời</option>
                </select>

                {/* <i className="pi pi-check mr-2"></i>
                <i className="pi pi-times"></i> */}
                {/* <Rating value="" onIcon="pi pi-circle-fill" cancel={false}  />
                <i className="pi pi-spin pi-spinner" style={{'fontSize': '2em'}}></i> */}
              </div>
              <div className="my-4">
                <strong>Comment</strong>
                <textarea
                  row="3"
                  className="col-12 bg-light p-3 mt-2 border-0 rounded"
                ></textarea>
              </div>
              <div className="my-3">
                <button className="col-12 bg-black border-0 p-3 rounded text-white">
                  SUBMIT
                </button>
              </div>
            </form>
            <div className="my-3">
              <Message variant={"alert-warning"}>
                Please{" "}
                <Link to="/login">
                  " <strong>Login</strong> "
                </Link>{" "}
                to write a review{" "}
              </Message>
            </div>
          </div>
        </div>
          </>
        )
      }
      </div>
    </>
  );
};

export default SingleProduct;
