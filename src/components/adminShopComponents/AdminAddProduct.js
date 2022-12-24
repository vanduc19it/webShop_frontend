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

const AdminAddProduct = () =>{

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
  ////





  const [category, setCategory] = React.useState([]);

  React.useEffect(()=> {
    const fetchCategory = async () => {
      const {data} = await axios.get(`${baseURL}category`);
      setCategory(data);
    };
    fetchCategory();
  },[]);
  console.log(category)






  const [product, setProduct] = React.useState({
    name:       "", 
    price:      "", 
    url_image:  `${baseURL}images/products/default-image.png`, 
    quanity:    0, 
    idCategory: "", 
    description:"", 
    image_product: null, 
  })
  const [inputFile, setInputFile] = React.useState({
    imgupload: "setShow",
    imguploadOke: "setHide",
    imguploadStop: "setHide",
    
  }); 
  const [alertFile, setAlertFile] = React.useState("(jpg,jpeg,bmp,png)")

  const [classify, setClassify] = React.useState([]);



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
      setProduct({ 
        ...product, 
        image_product: event.target.files[0]
      })
    }
  };
  const handleClassify = (event) => {
    const {
      target: { value },
    } = event;

    setClassify(
      
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    setProduct({ 
      ...product, 
      idCategory: classify
    })
  };

  const handleValueProduct = (event) => {
    console.log(event.target.id) ; 
    if(event.target.id === "name-product"){
      setProduct({ 
        ...product,
        name: event.target.value, 
      
      })
    }else if(event.target.id === "price-product"){
      setProduct({ 
        ...product,
        price: event.target.value, 
      })
    }else if(event.target.id === "quanity-product"){
      setProduct({ 
        ...product,
        quanity: event.target.value, 
      })
    }
  }

  const submitData = async() => {
    try {
      const formData = new FormData();
      formData.append("image_product", product.image_product) ; 
      formData.append("nameProduct", product.name) ; 
      formData.append("idCategory", product.idCategory) ; 
      formData.append("price", product.price) ; 
      formData.append("quantity", product.quanity) ; 
      formData.append("description", product.description) ; 
      formData.append("idShop",idShop ) ; 

      const config = {
        headers: {
            "Content-Type":"application/json"
        }
      }
      let result = await axios.post(`${baseURL}add-new-product`,formData,config);   
      console.log(result) ;  
      if(result.status == 200){
        openSnackBar(result.data, "success")
      }else{
        openSnackBar(result.data, "error")

      }
    } catch (error) {
      openSnackBar("error", "error")

    }
  }
return (
    <>
        <h3>Thêm sản phẩm mới</h3>
        <div className='row'>
        <div className="col-sm-7 ">
          <div className="page">
            <form name="upload" method="post" action="#" enctype="multipart/form-data" accept-charset="utf-8">


                <TextField id="name-product"  fullWidth label="Tên sản phẩm" variant="outlined"  onChange={handleValueProduct}/>
              <TextField id="price-product"  fullWidth label="Đơn giá sản phẩm" style={{marginTop:"20px"}}  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={handleValueProduct} />
              <div className='' style={{display: "-webkit-box"}}>
              <div className='col-sm-6'>
                <TextField id="quanity-product"   fullWidth label="Số lượng" variant="outlined" style={{marginTop:"20px"}} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={(e) => {
                 
                }} />
              </div>
              <div className='col-sm-6'>
              <FormControl fullWidth   sx={{ m: 1, minWidth: 80 }} style={{marginTop:"20px"}}>
                  <InputLabel id="demo-simple-select-autowidth-label">Phân loại sản phẩm</InputLabel>
                  <Select
                  
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={classify}
                    onChange={handleClassify}
                    autoWidth
                    input={<OutlinedInput label="Phân loại sản phẩm" />}
                  >
                    {category.map((item) =>(
                      
                      <MenuItem value={item._id}>{item.nameCategory}</MenuItem>

                    ))}

                  </Select>
                </FormControl>
              </div>
               
              </div>

             

              <div className="" style={{marginTop:"20px"}}>
                  <CKEditor
                      editor={ ClassicEditor }
                      data=""
                      config ={{placeholder:'Mô tả sản phẩm'}}
                      onReady={ editor => {
                          // You can store the "editor" and use when it is needed.
                          console.log( 'Editor is ready to use!', editor );
                      } }
                      onChange={ ( event, editor ) => {
                          const data = editor.getData();
                          setProduct({ 
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
                  Tạo sản phẩm mới
                </button>
              </div>
            </form>
          </div>

          
        </div>
        <div className='col-sm-5'>

            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
            
                  <div
                    className="shop col-lg-12 col-md-12 col-sm-12"
                  >
                    <div className="border-product">
                   
                        <div className="shopBack">
                          <img src={product.url_image}/>
                        </div>  

                      <div className="shoptext">
                        <p>
                            {product.name}
                        </p>

                        <Rating
                          value={5}
                          text={` reviews`}
                        /> 
                        <h3> {product.price}<sup>đ</sup></h3>
                      </div>
                    </div>
                  </div>

              :
            
              
                {/* Pagination */}
              </div>
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

export default AdminAddProduct ; 