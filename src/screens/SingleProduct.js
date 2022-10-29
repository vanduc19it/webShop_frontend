import React, { useEffect, useState, useRef } from "react";
import ReactHtmlParser from "react-html-parser";
import { Toast } from 'primereact/toast';
import 'antd/dist/antd.css';
import { Rate } from 'antd';
import Header from "./../components/Header";
import Rating from "../components/homeComponents/Rating";
import { Link } from "react-router-dom";
import Message from "./../components/LoadingError/Error";
import { useDispatch, useSelector } from "react-redux";
import { createProductFeedback, getProductFeedback, listProductDetail } from "../Redux/Actions/ProductActions";
import Loading from "./../components/LoadingError/Loading";
// import { Rating } from 'primereact/rating';
import 'primeicons/primeicons.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { PRODUCT_CREATE_FEEDBACK_RESET } from "../Redux/Constants/ProductConstants";
import moment from "moment";
import { addToCart } from "../Redux/Actions/CartActions";
const baseURL = "http://localhost:5000/";


const SingleProduct = ({ history, match }) => {
  
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [quantity, setQuantity] = useState(1)

  const productId = match.params.id;
 
  const dispatch = useDispatch();

  const productDetail = useSelector((state)=> state.productDetail)
  const {loading, error, product} = productDetail;

  const userLogin = useSelector((state)=> state.userLogin)
  const {userInfo} = userLogin;

  const productGetFeedback = useSelector((state)=> state.productGetFeedback)
  const {feedbacks} = productGetFeedback;
  console.log(feedbacks)

  const desc = ['Quá thất vọng🤬🤬🤬', 'Không hài lòng😒😫🥴', 'Bình thường🥲🥲🥲', 'Hài lòng👍👍👍', 'Tuyệt vời😍😍😍'];

  const productCreateFeedback = useSelector((state)=> state.productCreateFeedback)
  const {loading: loadingCreateFeedback, error: errorCreateFeedback, success: successCreateFeedback } = productCreateFeedback;
  const toast = useRef(null);
  useEffect(()=> {
    if(successCreateFeedback) {
      toast.current.show({severity:'success', summary: 'Đánh giá sản phẩm', detail:'Đánh giá sản phẩm thành công', life: 3000});
      setRating(0)
      setComment("")
      dispatch({type: PRODUCT_CREATE_FEEDBACK_RESET})
      dispatch(getProductFeedback(productId))
    }
    dispatch(listProductDetail(productId))
   
  }, [dispatch, productId, successCreateFeedback]);
    
  useEffect(()=> {
    dispatch(getProductFeedback(productId))
  },[dispatch,productId])

  const submitHandler =(e) => {
    e.preventDefault();
    dispatch(createProductFeedback(productId, userInfo.idUser, rating, comment));
    console.log(productId, userInfo.idUser, rating, comment)
  }

  //them san pham vao gio hang
  const HandleAddtoCart = (e) => {
    e.preventDefault()
    // dispatch(addToCart(productId, quantity))
    history.push(`/cart/${productId}?quantity=${quantity}`)
    // toast.current.show({severity:'success', summary: 'Thêm sản phẩm', detail:'Thêm sản phẩm thành công', life: 1000});
  }
  return (
    
    <>
    <Toast ref={toast} />
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
              
              <div style={{ textAlign:"justify"}}>{ReactHtmlParser(product.description)}</div>

              <div className="product-count col-lg-12 ">
                <div className="flex-box d-flex justify-content-between align-items-center">
                  <h6>Price</h6>
                  <span>${product.price}</span>
                </div>
                <div className="flex-box d-flex justify-content-between align-items-center">
                  <h6>Status</h6>
                  {product.quantity > 0 ? (
                    <span>In Stock</span>
                  ) : (
                    <span>unavailable</span>
                  )}
                </div>
                <div className="flex-box d-flex justify-content-between align-items-center">
                  <h6>Reviews</h6>
                  {/* <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  /> */}
                  <span>{feedbacks.length} đánh giá</span>
                </div>
                {product.quantity > 0 ? (
                  <>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Quantity</h6>
                      <select value={quantity} onChange={(e)=> setQuantity(e.target.value)}>
                        {[...Array(product.quantity).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <div className="col-lg-6">
                        <button className="round-black-btn" onClick={HandleAddtoCart}>Thêm vào giỏ hàng</button>
                      </div>
                      <div className="col-lg-5">
                        <button className="round-black-btn">Mua ngay</button>
                      </div>
                    </div>
                    
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
                  <span style={{marginTop:"30px","margin-left":"-130px","position": "absolute","padding-top":"2px"}}>
                  <Rating  style={{"transform": "scale(1.6)"}} value={feedback.rate}/>
                  </span>
                  
                 
                  
                  <span style={{marginTop:"60px",marginBottom:"30px",marginLeft:"-130px","position": "absolute"}}>{moment(Number(feedback.createAt)).locale("vi").startOf("second").fromNow() }</span>
                  
                  <div className="alert alert-info mt-3" style={{}}>
                   {feedback.comment}
                  </div>
                </div>  
              ))
            }

           
            
          </div>
          <div className="col-md-6">
            {/* rate */}
            <h6>ĐÁNH GIÁ SẢN PHẨM</h6>
            <div className="my-4">
                {loadingCreateFeedback && <Loading/>}
                {errorCreateFeedback && (<Message variant="alert-danger">{errorCreateFeedback}</Message>)}
            </div>
            {
              userInfo ? (
              <form onSubmit={submitHandler}>
              <div className="my-4">
                <strong><p>Rating</p></strong>
                {/* <select className="col-12 bg-light p-3 mt-2 border-0 rounded">
                  <option value="" data-icon = "../../public/hoantoankhongdongy.png">Select...</option>
                  <option value="1">1 - Quá thất vọng</option>
                  <option value="2">2 - Thất vọng</option>
                  <option value="3">3 - Bình thường</option>
                  <option value="4">4 - Tốt</option>
                  <option value="5">5 - Tuyệt vời</option>
                </select> */}
                  <span>
                     <Rate tooltips={desc} onChange={setRating} value={rating} />
                    {rating? <span className="ant-rate-text">{desc[rating - 1]}</span> : ''}
                  </span>
              </div>
              <div className="my-4">
                <strong>Comment</strong>
                <textarea
                  value={comment}
                  onChange={(e)=> setComment(e.target.value)}
                  row="3"
                  className="col-12 bg-light p-3 mt-2 border-0 rounded"
                ></textarea>
              </div>
              <div className="my-3">
                <button disabled={loadingCreateFeedback} className="col-12 bg-black border-0 p-3 rounded text-white">
                  ĐĂNG
                </button>
              </div>
            </form>
              )
              :
              (
              <div className="my-3">
              <Message variant={"alert-warning"}>
                Bạn vui lòng{" "}
                <Link to="/login">
                  " <strong>đăng nhập tài khoản</strong> "
                </Link>{" "}
                để đánh giá sản phẩm{" "}
              </Message>
            </div>
              )
            }
 
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
