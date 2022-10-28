import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { searchProduct } from "../Redux/Actions/ProductActions";
import { logout } from "../Redux/Actions/userActions";

const Header = () => {
  // const cart = useSelector((state)=> state.cart)
  // const {cartItems} = cart;
  const [keyword, setKeyword] = useState();
  

  const dispatch = useDispatch()
  let history = useHistory();

  

  // const productList = useSelector((state)=> state.productList);
  // const {products} = productList;
  

  // const productSearch = useSelector((state)=> state.productSearch);
  // const {productsSearch} = productSearch;
  // console.log(productsSearch)

  

  // localStorage.setItem("handleproducts", JSON.stringify(products));

  

  const userLogin = useSelector((state)=> state.userLogin)
  const {userInfo} = userLogin;

  const logoutHandler = () => {
    dispatch(logout())
    console.log("logout sucess")
  }

  const submitHandler =(e) => {
    e.preventDefault()
    // dispatch(searchProduct(keyword))
    // localStorage.setItem("handleproducts", JSON.stringify(productsSearch));
    if(keyword.trim()) {  
      history.push(`/search/${keyword}`)
    }else {
      history.push("/")
      // setHandleProduct(products)
    }
  } 
  // var handleproducts = JSON.parse(localStorage.getItem("handleproducts"));
  // console.log(handleproducts)
  
  return (
    <div>
      {/* Top Header */}
      <div className="Announcement ">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center display-none">
              <p>+84123456789</p>
              <p>cvducpvphung@gmail.com</p>
            </div>
            <div className=" col-12 col-lg-6 justify-content-center justify-content-lg-end d-flex align-items-center">
              <Link to="">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="">
                <i className="fab fa-linkedin-in"></i>
              </Link>
              <Link to="">
                <i className="fab fa-youtube"></i>
              </Link>
              <Link to="">
                <i className="fab fa-pinterest-p"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Header */}
      <div className="header">
        <div className="container">
          {/* MOBILE HEADER */}
          <div className="mobile-header">
            <div className="container ">
              <div className="row ">
                <div className="col-6 d-flex align-items-center">
                  <Link className="navbar-brand" to="/">
                    <img alt="logo" src="/images/logo.png" />
                  </Link>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                  {
                    userInfo ? (
                      <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                      <i class="fas fa-user"></i>
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to={`/profile/${userInfo.idUser}`} >
                          Profile
                        </Link>

                        <Link className="dropdown-item" to="#" onClick={logoutHandler}>
                          Logout
                        </Link>
                      </div>
                  </div>
                    )
                    :
                    (
                    <div className="btn-group">
                      <button
                      type="button"
                      className="name-button dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      >
                      <i class="fas fa-user"></i>
                      </button>
                      <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/login">
                        Login
                      </Link>

                      <Link className="dropdown-item" to="/register">
                        Register
                      </Link>
                    </div>
                  </div>
                    )
                  }
                  
                  <Link to="/cart" className="cart-mobile-icon">
                    <i className="fas fa-shopping-bag"></i>
                    <span className="badge">4</span>
                  </Link>
                </div>
                <div className="col-12 d-flex align-items-center">
                  <form className="input-group" onSubmit={submitHandler}>
                    <input
                      type="search"
                      className="form-control rounded search"
                      placeholder="Search"
                      onChange={(e)=> setKeyword(e.target.value)}
                    />
                    <button type="submit" className="search-button">
                      search
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* PC HEADER */}
          <div className="pc-header">
            <div className="row">
              <div className="col-md-3 col-4 d-flex align-items-center">
                <Link className="navbar-brand" to="/">
                  <img alt="logo" src="/images/logo.png" />
                </Link>
              </div>
              <div className="col-md-6 col-8 d-flex align-items-center">
                <form className="input-group" onSubmit={submitHandler}>
                  <input
                    type="search"
                    className="form-control rounded search"
                    placeholder="Search"
                    onChange={(e)=> setKeyword(e.target.value)}
                  />
                  <button type="submit" className="search-button">
                    search
                  </button>
                </form>
              </div>
              <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                {
                  userInfo ?
                  (
                    <div className="btn-group">
                    <button
                    type="button"
                    className="name-button dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                     >
                    Hi, {userInfo.username}
                    </button>
                    <div className="dropdown-menu">
                    <Link className="dropdown-item" to={`/profile/${userInfo.idUser}`}>
                      Profile
                    </Link>

                    <Link className="dropdown-item" to="#" onClick={logoutHandler}>
                      Logout
                    </Link>
                    </div>
                </div>
                  )
                  : 
                  (
                  <>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                  </>
                    
                 
                  )
                }

                <Link to="/cart">
                  <i className="fas fa-shopping-bag"></i>
                  <span className="badge">4</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
