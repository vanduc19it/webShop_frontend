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

const Update = (props) =>{

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    console.log(urlParams.get('id'));
    const idProduct = urlParams.get('id');
    const baseURL = BASE_URL_SERVER   ; 
    const [category, setCategory] = React.useState(null);
    const [imagecrop, setImagecrop] = useState();
    
    const [product, setProduct] = React.useState(null)
    const [shopImage, setShopImage] = useState(null);
    const [dialog, setDialog] = useState(false);

    React.useEffect(()=> {
      const getDataProductById = async () => {
          let result = await axios.get(`${baseURL}detail-product?idProduct=${idProduct}`) ; 
            console.log(result); 
          setProduct({
              ...product, 
              idShop: result.data.Shop.idShop,
              nameProduct:result.data.nameProduct, 
              idCategory: result.data.idCategory, 
              price:      result.data.price,
              quantity:   result.data.quantity, 
              description:result.data.description, 
          })
          setShopImage(result.data.imageProduct)
      };
     
      getDataProductById();
    },[]);
    React.useEffect(()=> {
      const fetchCategory = async () => {
        const {data} = await axios.get(`${baseURL}category`);
        setCategory(data);
      };
      fetchCategory();
    },[]);


      
    console.log(product) ;
    
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
    const onCrop=(view)=> {
      setImagecrop(view)
    }
    const onClose= ()=> {
      setImagecrop(null)
    }
    
    const saveImage = ()=> {
      setDialog(false)
    }
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
        const img_shop = dataURLtoFile(imagecrop, "product.png" ); 
        console.log("hello wowrkd") ; 
       
        const formData = new FormData();
        formData.append("idShop",product.idShop) ; 
        formData.append("image_product", img_shop) ; 

        const config = {
          headers: {
              "Content-Type":"application/json"
          }
        }
        let result = await axios.post(`${baseURL}updae-image-product/${idProduct}`,formData,config);   
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
    const [classify, setClassify] = React.useState([]);


    const handleClassify = (event) => {
        const {
            target: { value },
        } = event;

        setClassify(
      
        // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        console.log(classify) ; 
        setProduct({ 
            ...product, 
            idCategory: classify[0]
        })
    };

    const handleValueProduct = (event) => {
        if(event.target.id === "name-product"){
          setProduct({ 
            ...product,
            nameProduct: event.target.value, 
          
          })
        }else if(event.target.id === "price-product"){
          setProduct({ 
            ...product,
            price: event.target.value, 
          })
        }else if(event.target.id === "quanity-product"){
          setProduct({ 
            ...product,
            quantity: event.target.value, 
          })
        }
        console.log(product)
      }
    
      const submitData = async() => {
        console.log(product) ; 
        try {
          let dataSubmit = product; 
          const config = {
            headers: {
                "Content-Type":"application/json"
            }
          }
          let result = await axios.post(`${baseURL}update-product/${idProduct}`,dataSubmit,config);   
          console.log(result) ; 
          if(result.status == 200){
            console.log(result.data.message) ; 
            if(result.data.result){
              
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
            <div className='row'>
                <div className='col-sm-12'>
                <div className="author-card-avatar col-sm-12">
                    

                    {
                    (product!== null & category !== null) && (
                    shopImage ?
                    (
                        <img  src={!imagecrop ? `${baseURL}images/products/${shopImage}`: imagecrop } alt="shopImage" 
                            onMouseOver={e => e.currentTarget.src = "https://bst.icons8.com/wp-content/uploads/2022/09/new_moose.webp"}
                            onMouseOut={e => e.currentTarget.src= !imagecrop ? `${baseURL}images/shops/${shopImage}`: imagecrop } 
                            onClick={() => setDialog(true)}
                            style={{marginTop: "auto", borderRadius: "0"}}
                            />
                    )
                    : (
                        <img src={`${baseURL}images/users/avatar-default.jpg`} alt="shopImage"  style={{marginTop: "auto", borderRadius: "0"}}/>
                    ))

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
                    
                    <div class="btn-admin-addShop" style={{marginTop:"10px"}}  onClick={submitDataImage} > <span>Lưu hình ảnh</span></div>


                </div> 
                </div> 
                <div className='col-sm-12' style={{marginTop: "40px"}}></div>
                <div className='col-sm-3'></div>
                <div className="col-sm-6 ">
                    <div className="page">
                    {(product!== null & category !== null) && (
                            <form name="upload" method="post" action="#" enctype="multipart/form-data" accept-charset="utf-8">
                
                            <TextField id="name-product"  defaultValue={product.nameProduct} fullWidth label="Tên sản phẩm" variant="outlined"  onChange={handleValueProduct}/>
                            <TextField id="price-product" defaultValue={product.price}  fullWidth label="Đơn giá sản phẩm" style={{marginTop:"20px"}}  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={handleValueProduct} />
                            <div className='' style={{display: "-webkit-box"}}>
                            <div className='col-sm-6'>
                                <TextField id="quanity-product" defaultValue={product.quantity}   fullWidth label="Số lượng" variant="outlined" style={{marginTop:"20px"}} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={(e) => {
                                
                                }} />
                            </div>
                            <div className='col-sm-6'>
                            <FormControl fullWidth   sx={{ m: 1, minWidth: 80 }} style={{marginTop:"20px"}}>
                                <InputLabel   id="demo-simple-select-autowidth-label">Phân loại sản phẩm</InputLabel>
                                <Select
                                
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={classify}
                                onChange={handleClassify}
                                autoWidth
                                input={<OutlinedInput   label="Phân loại sản phẩm" />}
                                >
                                {category.map((item) =>(
                                    
                                    <MenuItem  value={item._id}>{item.nameCategory}</MenuItem>
            
                                ))}
            
                                </Select>
                            </FormControl>
                            </div>
                            
                            </div>
            
                            
            
                            <div className="" style={{marginTop:"20px"}}>
                                <CKEditor
                                    editor={ ClassicEditor }
                                    data={product.description}
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
            
                            <button type="button"  className="btn btn-primary btn-lg" onClick={submitData}>
                                Cập nhật sản phẩm
                            </button>
                            </div>
                        </form>
                        )}

                    </div>

                
                </div>
              <div className='col-sm-3'></div>
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

export default Update ; 