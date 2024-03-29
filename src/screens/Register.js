import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login, register } from "../Redux/Actions/userActions";
import Header from "./../components/Header";
import Message from "./../components/LoadingError/Error";
import Loading from "./../components/LoadingError/Loading";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
const Register = ({location, history}) => {
  window.scrollTo(0, 0);
  const [username, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo} = userRegister;

  // useEffect(()=> {
  //   if (userInfo) {
  //     history.push(redirect);
  //   }
  // },[userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if(password == confirmPassword && password !="") {
      dispatch(register(username, email, password))
      history.push('/login')
    } else {
      alert("Vui lòng nhập thông tin chính xác")
    }
    
  }
  return (
    <>
      <Header />
      
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading/>}
        <form className="Login col-md-8 col-lg-4 col-11" onSubmit={submitHandler}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setName(e.target.value)}/>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" value= {password} onChange={(e) => setPassword(e.target.value)}/>
          <input type="password" placeholder="Confirm Password" value= {confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>

          <button type="submit" >Register</button>
          <div className="col-md-12" style={{marginTop: '30px', marginLeft: '80px'}}>
          {/* <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
          var decoded = jwt_decode(credentialResponse.credential);
          console.log(decoded);
          // if(decoded.name && decoded.email) {
          //   setName(decoded.name)
          //   setEmail(decoded.email)
          //   setPassword(123)
          //   console.log(username, email, password)
            
          // }
          
          if(decoded) {
            dispatch(register(decoded.name, decoded.email, 123))
            dispatch(login(decoded.email, 123))
            history.push("/")
          }
          
        }}
        onError={() => {
          console.log('Login Failed');
        }}
        useOneTap
      />; */}
          </div>
          <p>
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              I Have Account <strong>Login</strong>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
