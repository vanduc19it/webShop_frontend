import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import ProfileTabs from "../components/profileComponents/ProfileTabs";
import { logout, updateuserimage } from "../Redux/Actions/userActions";
import Orders from "./../components/profileComponents/Orders";
import moment from "moment";
import { Dialog } from 'primereact/dialog';
import Avatar from "react-avatar-edit"
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

const baseURL = "http://localhost:5000/";
const ProfileScreen = ({match}) => {
  window.scrollTo(0, 0);

  // const idUser = match.params.id;
  // console.log(idUser);
  
  const dispatch = useDispatch()

  const userLogin = useSelector((state)=> state.userLogin)
  const {userInfo} = userLogin;
  
  const logoutHandler = () => {
    dispatch(logout())
    console.log("logout sucess")
  }
  const [dialog, setDialog] = useState(false);
  const [userImage, setUserImage] = useState(`${baseURL}images/users/${userInfo.avatar}`);
  const [imagecrop, setImagecrop] = useState("");

  const userUpdateImage = useSelector((state) => state.userUpdateImage);
  const {loading: updateLoading} = userUpdateImage;

  const onCrop=(view)=> {
    setImagecrop(view)
  }
  const onClose= ()=> {
    setImagecrop(null)
  }
  const saveImage = ()=> {
    setUserImage(imagecrop)
    setDialog(false)
   
    dispatch(updateuserimage(userInfo.idUser,imagecrop))
  }
  // console.log(userInfo.idUser,userImage)

  

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
                    userInfo.avatar ?
                    (
                      <img src={userImage} alt="userprofileimage" 
                            onMouseOver={e => e.currentTarget.src = "https://bst.icons8.com/wp-content/uploads/2022/09/new_moose.webp"}
                            onMouseOut={e => e.currentTarget.src= `${baseURL}images/users/${userInfo.avatar}` } 
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
                    <span className="badge2">3</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

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
              class="tab-pane fade"
              id="v-pills-profile"
              role="tabpanel"
              aria-labelledby="v-pills-profile-tab"
            >
              <Orders />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
