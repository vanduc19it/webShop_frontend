import * as React from 'react';
import NumberFormat from 'react-number-format';
import { TextField, MenuItem, Select , OutlinedInput, InputLabel ,FormControl  } from "@mui/material";
import { Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Dialog } from 'primereact/dialog';
import { useEffect, useRef, useState, useCallback } from "react";
import Avatar from "react-avatar-edit"
import { Button } from 'primereact/button';


import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {BASE_URL_SERVER} from "../../Redux/Constants/index" ; 

const ManageShop = (props) =>{
    const userInfor = props.userInfo; 
    const baseURL = BASE_URL_SERVER   ; 

    const userLogin = useSelector((state)=> state.userLogin)
    const [dialog, setDialog] = useState(false);
    const [shopImage, setShopImage] = useState( userInfor.shopInfor.imgShop);
    const [imagecrop, setImagecrop] = useState();

    // set snackBar
    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    
    const [nackBar, setNackBar] = React.useState({
      content: "", 
      status: "success" , // error, warning, info, succeess 
      open: false,
      vertical: 'bottom',
      horizontal: 'right',

    });
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setNackBar({
          ...nackBar, 
          open: false
        });
    };
    const openSnackBar = (content, status) => {
      setNackBar({
        content:content, 
        status: status , // error, warning, info, succeess
        open: true,
      })
    }


    //

    const [product, setShop] = React.useState({
      name:       userInfor.shopInfor.nameShop, 
      address:      userInfor.shopInfor.address, 
      phone:  userInfor.shopInfor.phone,
      url_image:  userInfor.shopInfor.imgShop, 
      description:"", 
      image_Shop: null, 
    })

    const onCrop=(view)=> {
      setImagecrop(view)
    }
    const onClose= ()=> {
      setImagecrop(null)
    }
    
    const saveImage = ()=> {
      setDialog(false)
    }



    const handleValueShop = (event) => {
      console.log(event.target.id) ; 
      if(event.target.id === "name-shop"){
        setShop({ 
          ...product,
          name: event.target.value, 
        
        })
      }else if(event.target.id === "address-shop"){
          setShop({ 
              ...product,
              address: event.target.value, 
          })
      }else if(event.targer.id === "phone-shop"){
          setShop({ 
              ...product,
              phone: event.target.value, 
          })
      }
    };

    // convert buffer base64 to file
    const  dataURLtoFile = (dataurl, filename) => {
    
      var arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), 
          n = bstr.length, 
          u8arr = new Uint8Array(n);
          
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      
      return new File([u8arr], filename, {type:mime});
    }
    const submitDataImage = async() => {
      if(!imagecrop) {
        openSnackBar("Bạn cần chọn lại file ảnh", "error")
      }else{
        const img_shop = dataURLtoFile(imagecrop, "shop.png" ); 
        console.log("hello wowrkd") ; 
       
        const formData = new FormData();
        formData.append("idUser", userInfor.idUser) ; 
        formData.append("idShop", userInfor.shopInfor._id) ; 
        formData.append("img_shop", img_shop) ; 

        const config = {
          headers: {
              "Content-Type":"application/json"
          }
        }
        let result = await axios.post(`${baseURL}shop/update-shop-image`,formData,config);   
        console.log(result) ;  

        if(result.status == 200){
          console.log(result.data.message) ; 
          if(result.data.result){
            // xử lý set lại data ở frontend
            openSnackBar(result.data.message, "success")

          }
          else{
            openSnackBar(result.data.message, "error")
          }
        }else{
          openSnackBar("Lỗi server", "error")

        }
      }

    }
    const submitData = async() => {
      try {
        
        

        let dataSubmit = {
          "nameShop":     product.name, 
          "address":     product.address, 
          "phone":  product.phone,
          "description": product.description,
          "idUser": userInfor.idUser,
          "idShop": userInfor.shopInfor._id
        }
        const config = {
          headers: {
              "Content-Type":"application/json"
          }
        }
        let result = await axios.post(`${baseURL}shop/update-shop-info`,dataSubmit,config);   
        if(result.status == 200){
          console.log(result.data.message) ; 
          if(result.data.result){
            // xử lý set lại data ở frontend
            localStorage.setItem("userInfo", JSON.stringify({
              ...userInfor,
              shopInfor: {
                ...userInfor.shopInfor, 
                "nameShop":     product.name, 
                "address":     product.address, 
                "phone":  product.phone,
                "description": product.description,
                "idUser": userInfor.idUser,
                "idShop": userInfor.shopInfor._id
              }
            }));

            openSnackBar(result.data.message, "success")

          }
          else{
            openSnackBar(result.data.message, "error")
          }
        }else{
          openSnackBar("Lỗi server", "error")

        }
      } catch (error) {
        openSnackBar("error", "error")

      }
    }
return (
    <>
        <div className='row' style={{textAlign: "center"}}>
            <h3>Quản lý Cửa hàng </h3>
            <div className='col-sm-12'>
              <div className="author-card-avatar col-sm-12">

                {
                  shopImage ?
                  (
                    <img  src={!imagecrop ? `${baseURL}images/shops/${shopImage}`: imagecrop } alt="shopImage" 
                          onMouseOver={e => e.currentTarget.src = "https://bst.icons8.com/wp-content/uploads/2022/09/new_moose.webp"}
                          onMouseOut={e => e.currentTarget.src= !imagecrop ? `${baseURL}images/shops/${shopImage}`: imagecrop } 
                          onClick={() => setDialog(true)}
                          style={{marginTop: "auto"}}
                          />
                  )
                  : (
                    <img src={`${baseURL}images/users/avatar-default.jpg`} alt="shopImage"  style={{marginTop: "auto"}}/>
                  )
                }

                <Dialog 
                  visible={dialog} 
                  header= {()=>(<p>Update shopImage</p>)}
                  breakpoints={{'960px': '75vw', '640px': '100vw'}} 
                  style={{width: '50vw'}}
                  onHide={() =>setDialog(false)} 

                >
                  <Avatar width={400} height={300} onClose= {onClose} onCrop={onCrop}/>
                  <Button onClick={saveImage} label="OK" icon="pi pi-check" />
                </Dialog>
                
                  <div class="btn-admin-addProduct" style={{marginTop:"10px"}}  onClick={submitDataImage}> <span>Lưu hình ảnh</span></div>


              </div> 
            </div>  
            <div className='col-sm-12' style={{marginTop: "40px"}}>

            </div>
            <div className="col-sm-2 ">
            </div>
            <div className="col-sm-8 ">
            <div className="page">
                <form name="upload" method="post" action="#" enctype="multipart/form-data" accept-charset="utf-8">


                <TextField id="name-shop"  defaultValue={product.name} fullWidth label="Tên cửa hàng" variant="outlined"  onChange={handleValueShop}/>
                <TextField id="address-shop" defaultValue={product.address} fullWidth label="Địa chỉ" style={{marginTop:"20px"}}   onChange={handleValueShop} />
                <TextField id="phone-shop" defaultValue={product.phone} fullWidth label="Điện thoại" style={{marginTop:"20px"}}  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={handleValueShop} />

                

                <div className="" style={{marginTop:"20px"}}>
                    <CKEditor
                        editor={ ClassicEditor }
                        data=""
                        config ={{placeholder:'Mô tả cửa hàng'}}
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            setShop({ 
                                ...product,
                                description: data, 
                            })                      } }
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                    />
                </div>
                <div className="col-md-12 center" style={{marginTop: "30px" }}>

                    <button type="button"  className="btn btn-primary btn-lg" onClick={submitData}>
                    Cập nhật lại sản phẩm
                    </button>
                </div>
                <div className='col-md-12' style={{height: "50px"}}>

                </div>
                </form>
            </div>

            
            </div>
            <div className="col-sm-2 " >
            </div>
        </div>
        <Stack spacing={2} sx={{ width: '100%' }}  >
        <Snackbar open={nackBar.open} autoHideDuration={6000} onClose={handleClose} >
            <Alert onClose={handleClose} severity={nackBar.status} sx={{ width: '100%' }}>
                {nackBar.content}
            </Alert>
        </Snackbar>
        </Stack>




    </>
  );
}

export default ManageShop ; 