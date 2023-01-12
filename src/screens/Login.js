import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../Redux/Actions/userActions";
import Header from "./../components/Header";
import Message from "./../components/LoadingError/Error";
import Loading from "./../components/LoadingError/Loading";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

//591909428129-7sqneikm8mv6m21p9kcasetg3vdhtt71.apps.googleusercontent.com
const Login = ({location, history}) => {
  window.scrollTo(0, 0);
  

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo} = userLogin;

  useEffect(()=> {
    if (userInfo) {
      history.push(redirect);
    }
  },[userInfo, history, redirect]);


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password))
  }

  return (
    <>
      <Header />

            
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
      {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading/>}
        <form className="Login col-md-8 col-lg-4 col-11" onSubmit={submitHandler}>
          <input type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} />
          <button type="submit">Login</button>
          <div className="col-md-12" style={{marginTop: '30px', marginLeft: '80px'}}>
          <GoogleLogin
              onSuccess={credentialResponse => {
                console.log(credentialResponse);
                var decoded = jwt_decode(credentialResponse.credential);
                console.log(decoded);
                setEmail(decoded.email)
                setPassword(123)
                dispatch(login(email, password))
              
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              useOneTap
          />
          </div>
          

          <p>
            <Link to={redirect ? `/register?redirect=${redirect}` :"/register"}>Create Account</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
