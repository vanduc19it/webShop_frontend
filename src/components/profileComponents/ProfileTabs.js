import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkPassUser, updateUserProfile } from "../../Redux/Actions/userActions";
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from "axios";

import {BASE_URL_SERVER} from "../../Redux/Constants/index" ; 

const baseURL = BASE_URL_SERVER;
const ProfileTabs = () => {

  const userLogin = useSelector((state)=> state.userLogin)
  const {userInfo} = userLogin;

  const userDetail = useSelector((state)=> state.userDetail )
  const {loading, error, user } = userDetail ;
  
  

  const [username, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [gender, setGender] = useState("")

  const [checkpass, setCheckpass] = useState("")

  const checkPass = useSelector((state)=> state.checkPass)
  const {check} =checkPass;

  const dispatch = useDispatch();
  const [dialog, setDialog] = useState(false);

  
 
  const userUpdateProfile = useSelector((state)=> state.userUpdateProfile)
  const {loading: updateLoading} = userUpdateProfile;

  useEffect(()=> {
    if(user.result) {
      setName(user.result.username)
      setEmail(user.result.email)
      setAddress(user.result.address)
      setGender(user.result.gender)
    }
    
  },[dispatch, user]);

  const GenderItem = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
];

 const CheckPassHandler= (e) => {
   dispatch(checkPassUser(userInfo.idUser, checkpass))
   setDialog(false)
 }
 const submitHandler = (e) => {
  e.preventDefault();
  if(check) {  
    dispatch(updateUserProfile({idUser: userInfo.idUser, username, address, gender }))
    
   }else{
    
   }
}



  return (
    <>
      <form className="row  form-container" onSubmit={submitHandler}>
        <div className="col-md-6">
          <div className="form">
            <label for="account-fn">UserName</label>
            <input className="form-control" type="text" required value={username} onChange={(e) => setName(e.target.value)}/>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label for="account-email">E-mail Address</label>
            <input className="form-control" type="email" required value={email} onChange={(e)=> setEmail(e.target.value)}/>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-pass">Your Adrress</label>
            <input className="form-control" type="text" required value={address} onChange={(e)=> setAddress(e.target.value)}/>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-confirm-pass">Gender</label>
            <Dropdown className="form-control"id="dropdown" value={gender} options={GenderItem} onChange={(e) => setGender(e.target.value)} placeholder="Select Gender"/>
          </div>
        </div>
        <button type="submit" onClick={() => setDialog(true)}>Update Profile</button>
        <Dialog visible={dialog} header= {()=>(
                    <p>Nhập mật khẩu của bạn</p>
                  )}
                  onHide={() =>setDialog(false)} 
                  breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '50vw'}}
                  >
                    <InputText type="password" value={checkpass} onChange={(e) => setCheckpass(e.target.value)} />
                    <Button onClick={CheckPassHandler} label="Save" icon="pi pi-check" />
                  </Dialog>
      </form>
    </>
  );
};

export default ProfileTabs;
