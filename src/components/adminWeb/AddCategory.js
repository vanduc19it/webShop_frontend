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


import Rating from "../ShopComponents/Rating" ; 
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {BASE_URL_SERVER} from "../../Redux/Constants/index" ; 

const AddCategory = () =>{

  const baseURL = BASE_URL_SERVER   ; 

  const userLogin = useSelector((state)=> state.userLogin)
  const {userInfo} = userLogin;
  const idShop = userInfo.shopInfor._id  ; 

  // set snackBar
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  const [nackBar, setNackBar] = React.useState({
    content: "", 
    status: "success" , // error, warning, info, succeess 
    open: false

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
      open: true
    })
  }


  const [inputFile, setInputFile] = React.useState({
    imgupload: "setShow",
    imguploadOke: "setHide",
    imguploadStop: "setHide",
    
  }); 
  const [alertFile, setAlertFile] = React.useState("(jpg,jpeg,bmp,png)")




  const handleChageImage = (event) => {
    console.log({value: event.target.value});
    console.log({value: event.target.files[0]});

    let arr = event.target.value.split("\\");
    let filextension= arr.slice(-1)[0].split(".");
    let filext= "."+filextension.slice(-1)[0];
    let valid=[".jpg",".png",".jpeg",".bmp"];
    if (valid.indexOf(filext.toLowerCase())==-1){
      setAlertFile(`${arr.slice(-1)[0]} không đúng định dạng`)
      setInputFile({
        imgupload: "setHide",
        imguploadOke: "setHide",
        imguploadStop: "setShow"
      })
    }else{
      setAlertFile(arr.slice(-1)[0] )
      setInputFile({
        imgupload: "setHide",
        imguploadOke: "setShow",
        imguploadStop: "setHide"
      }) 
      setImage({ 
        image_category: event.target.files[0]
      })
     
    }
  };
  const [image, setImage] = React.useState('')
  const [category, setCategory] = React.useState('');

  const submitData = async() => {
    console.log("chào")
    console.log(image); 
    console.log(category) ; 
    try {
      const formData = new FormData();
      formData.append("image_category", image.image_category) ; 
      formData.append("nameCategory", category) ; 

      const config = {
        headers: {
            "Content-Type":"application/json"
        }
      }
      let result = await axios.post(`${baseURL}add-new-category`,formData,config);   
      console.log(result);  
      if(result.status == 200){
        openSnackBar(result.data, "success")
      }else{
        openSnackBar(result.data, "error")

      }
    } catch (error) {
      openSnackBar("error", "error")

    }
  }
  console.log(category)
return (
    <>
        <h3 style={{textAlign: 'center'}}>Thêm danh mục mới</h3>
        <div className='row'>
        <div className='col-sm-3'></div>
        <div className="col-sm-6 ">
          <div className="page">
            <form name="upload" method="post" action="#" enctype="multipart/form-data" accept-charset="utf-8">


                <TextField id="name-product"  fullWidth label="Tên danh mục" variant="outlined"  onChange={(e)=> setCategory(e.target.value)}/>

              
              <div className="col-md-12 center">
                <div className="btn-container">
                  <h1 className={`imgupload ${inputFile.imgupload}` }><i className="far fa-file-image"></i></h1>
                  <h1 className={`imgupload ok ${inputFile.imguploadOke}` }><i className="fas fa-check"></i></h1>
                  <h1 className={`imgupload stop ${inputFile.imguploadStop}` }><i className="fas fa-times"></i></h1>
                  <p id="namefile">{alertFile}</p>
                  <button type="button" id="btnup" className="btn btn-primary btn-lg">Chọn file ảnh!
                  <input type="file" value="" name="fileup" id="fileup" onChange={handleChageImage}/>

                  </button>
                </div>
                <button type="button"  className="btn btn-primary btn-lg" onClick={submitData}>
                  Tạo danh mục
                </button>
              </div>
            </form>
          </div>

          
        </div>
       
        </div>
        <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={nackBar.open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={nackBar.status} sx={{ width: '100%' }}>
                {nackBar.content}
            </Alert>
        </Snackbar>
        </Stack>




    </>
  );
}

export default AddCategory; 