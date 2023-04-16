import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import ProfileTabs from "../components/profileComponents/ProfileTabs";
import UpdatePassword from "../components/profileComponents/UpdatePassword";
import { getUserDetail, logout, updateuserimage } from "../Redux/Actions/userActions";
import Orders from "./../components/profileComponents/Orders";
import moment from "moment";
import { Dialog } from 'primereact/dialog';
import Avatar from "react-avatar-edit"
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import { getOrderDetail } from "../Redux/Actions/orderActions";

import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from '@atlaskit/modal-dialog';
import { Input } from "antd";
import { createShop, getShopDetail } from "../Redux/Actions/shopActions";
import {BASE_URL_SERVER} from "../Redux/Constants/index"; 

const baseURL = BASE_URL_SERVER;
const ProfileScreen = ({match, history}) => {
  window.scrollTo(0, 0);

  // const idUser = match.params.id;
  // console.log(idUser);
  
  const dispatch = useDispatch()

  const userLogin = useSelector((state)=> state.userLogin)
  const {userInfo} = userLogin;




  useEffect(()=> {
    dispatch(getOrderDetail(userInfo.idUser));
    dispatch(getUserDetail(userInfo.idUser));
    dispatch(getShopDetail(userInfo.idUser));
  },[dispatch, userInfo.idUser])
  

  const logoutHandler = () => {
    dispatch(logout())
    console.log("logout sucess")
  }
  const [dialog, setDialog] = useState(false);
  const [userImage, setUserImage] = useState("");
  
  const userDetail = useSelector((state)=> state.userDetail )
  const { user } = userDetail ;

  useEffect(()=> {
    if(user.result) {
      setUserImage(user.result.avatar) 
    }
  },[dispatch, user]);

 

  const [imagecrop, setImagecrop] = useState(userImage);

  const userUpdateImage = useSelector((state) => state.userUpdateImage);
  const {loading: updateLoading} = userUpdateImage;

  const onCrop=(view)=> {
    setImagecrop(view)
  }
  const onClose= ()=> {
    setImagecrop(null)
  }
  
  const saveImage = ()=> {
    setDialog(false)
    dispatch(updateuserimage(userInfo.idUser,imagecrop))
  }

  const orderDetail = useSelector((state)=> state.orderDetail)
  const {order} = orderDetail;
  console.log(order)

  const [nameShop, setNameShop] = useState("")
  const [phoneShop, setPhoneShop] = useState("")
  const [addressShop, setAddressShop] = useState("")
 

  const [modalOpen, setModalOpen] = useState(false)


  const closeModal = useCallback(() => setModalOpen(false), []);

  const shopDetail = useSelector((state)=> state.shopDetail )
  const { shopInfo } = shopDetail ;
  console.log(shopInfo)
  const handleOpenModal = () => {
    if(shopInfo._id) {
      //chuyen huong qua trang shop cua toi
      
      history.push("/admin/my-shop/");
    }else {
      //tao shop 
      setModalOpen(true);
    }
  }
  const handleCreateShop = (e) => {
    e.preventDefault();
    dispatch(createShop(userInfo.idUser,nameShop, phoneShop, addressShop))
    setModalOpen(false);
    alert("Tạo shop thành công. Vui lòng đăng nhập lại")
    dispatch(logout())
    history.push("/login");

  }

 






  return (
    <>
      <Header />
      <div className="container mt-lg-5 mt-3">
        <div className="row align-items-start">
          <div className="col-lg-4 p-0 shadow ">
            <div className="author-card pb-0 pb-md-3">
              <div className="author-card-cover"></div>
              <div className="author-card-profile row">
                <div className="author-card-avatar col-md-5">

                  {
                    userImage ?
                    (
                      <img src={!imagecrop ? `${baseURL}images/users/${userImage}`: imagecrop } alt="userprofileimage" 
                            onMouseOver={e => e.currentTarget.src = "https://bst.icons8.com/wp-content/uploads/2022/09/new_moose.webp"}
                            onMouseOut={e => e.currentTarget.src= !imagecrop ? `${baseURL}images/users/${userImage}`: imagecrop } 
                            onClick={() => setDialog(true)}
                            />
                    )
                    : (
                      <img src={`${baseURL}images/users/avatar-default.jpg`} alt="userprofileimage" />
                    )
                  }

                  <Dialog visible={dialog} header= {()=>(
                    <p>Update UserImage</p>
                  )}
                  onHide={() =>setDialog(false)} 
                  breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '50vw'}}
                  >
                    <Avatar width={400} height={300} onClose= {onClose} onCrop={onCrop}/>
                    <Button onClick={saveImage} label="Save" icon="pi pi-check" />
                  </Dialog>


                 
                </div>
                <div className="author-card-details col-md-7">
                  <h5 className="author-card-name mb-2">
                    <strong>{userInfo.username}</strong>
                  </h5>
                  <span className="author-card-position">
                    <>Joined {moment(userInfo.createAt).format("LL")}</>
                  </span>
                </div>
              </div>
            </div>
            <div className="wizard pt-3 ">
              <div class="d-flex align-items-start">
                <div
                  class="nav align-items-start flex-column col-12 nav-pills me-3 "
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    class="nav-link active"
                    id="v-pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-home"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                  >
                    Profile Settings
                  </button>
                  <button
                    class="nav-link"
                    id="v-pills-password-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-password"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-password"
                    aria-selected="true"
                  >
                    Change Password
                  </button>
                  <button
                    class="nav-link d-flex justify-content-between"
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    Orders List
                    <span className="badge2">{order ? order.length : 0 }</span>
                  </button>
                  
                  <button
                    class="nav-link d-flex justify-content-between"
                    onClick={handleOpenModal}
                  >
                    Shop của tôi 
                  </button>
                </div>
              </div>
            </div>
          </div>

          <ModalTransition>
        {modalOpen && (
          <Modal onClose={closeModal}>
            <form onSubmit={handleCreateShop}>
              <ModalHeader>
                <ModalTitle>Tạo Shop Bán Hàng</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <div className="mb-2">
                  <span>Tên shop</span>
                  <Input required placeholder="Tên shop" value={nameShop} onChange={(e)=> setNameShop(e.target.value)}/>
                </div>
                <div className="mb-2">
                  <span>Điện thoại liên hệ</span>
                  <Input required placeholder="Điện thoại liên hệ" value={phoneShop} onChange={(e)=> setPhoneShop(e.target.value)}/>
                </div>
                <div className="mb-2">
                  <span>Địa chỉ</span>
                  <Input required placeholder="Địa chỉ" value={addressShop} onChange={(e)=> setAddressShop(e.target.value)}/>
                </div>
               
             
              </ModalBody>
              <ModalFooter>
                <Button appearance="subtle" onClick={closeModal}>
                  Hủy
                </Button>
                <Button appearance="primary" type="submit">
                  Tạo shop
                </Button>
              </ModalFooter>
            </form>
          </Modal>
        )}
      </ModalTransition>

          {/* panels */}
          <div
            class="tab-content col-lg-8 pb-5 pt-lg-0 pt-3"
            id="v-pills-tabContent"
          >
            <div
              class="tab-pane fade show active"
              id="v-pills-home"
              role="tabpanel"
              aria-labelledby="v-pills-home-tab"
            >
              <ProfileTabs />
            </div>
            <div
              class="tab-pane fade show"
              id="v-pills-password"
              role="tabpanel"
              aria-labelledby="v-pills-password-tab"
            >
              <UpdatePassword />
            </div>
            <div
              class="tab-pane fade"
              id="v-pills-profile"
              role="tabpanel"
              aria-labelledby="v-pills-profile-tab"
            >
              <Orders order={order}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
