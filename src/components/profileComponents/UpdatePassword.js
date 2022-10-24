import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UpdatePassword = () => {

  const userLogin = useSelector((state)=> state.userLogin)
  const {userInfo} = userLogin;

  const [username, setName] = useState(userInfo.username)
  const [email, setEmail] = useState(userInfo.email)
  const [password, setPassword] = useState("")
  const [confirmpassword, setConfirmPassword] = useState("")

  const dispatch = useDispatch();

  // const userDetail = useSelector((state)=> state.userDetail)
  // const {loading, error, user} = userDetail;
 


  // useEffect(()=> {
  //   if(userInfo) {
  //     setName(userInfo.name)
  //     setEmail(userInfo.email)
  //     // setPassword(user.password)
  //     // setConfirmPassword(user.confirmpassword)
  //   }
  // },[dispatch, userInfo]);

  const submitHandler = (e) => {
      e.preventDefault();
      if(password !==confirmpassword) {
        alert("nhap lai mat khau bi sai")
      }
      else {
        alert("update thanh cong")
      }
  }

  return (
    <>
      <form className="row  form-container" onSubmit={submitHandler}>
       

        <div className="col-md-6">
          <div className="form">
            <label for="account-pass">New Password</label>
            <input className="form-control" type="password" required value={password} onChange={(e)=> setPassword(e.target.value)}/>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-confirm-pass">Confirm Password</label>
            <input className="form-control" type="password" required value={confirmpassword} onChange={(e)=> setConfirmPassword(e.target.value)}/>
          </div>
        </div>
        <button type="submit">Change Password</button>
      </form>
    </>
  );
};

export default UpdatePassword;
