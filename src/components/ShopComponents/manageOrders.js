import * as React from 'react'
import { Button, Box, Modal, Fade ,Backdrop  } from '@mui/material'; 

import {BASE_URL_SERVER} from "../../Redux/Constants/index" ;
import axios  from 'axios';
import { Dropdown } from 'primereact/dropdown';
const ManageOrders = (props) => {
  
  const baseURL = BASE_URL_SERVER;
  const idShop  = props.idShop; 
  const [listOrder, setListOrder] = React.useState([]) ; 
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = (event) => {
    console.log(event.target.id); 

    let orderModal = listOrder.filter((item) => {
      return item._id === event.target.id ; 
    });
    setProductModal({
      addressReceiver:  orderModal[0].addressReceiver,
      createAt:  orderModal[0].creatAt,
      idUser:  orderModal[0].idUser,
      message:  orderModal[0].message,
      namedReceiver:  orderModal[0].namedReceiver,
      payment:  orderModal[0].payment,
      phoneReceiver:  orderModal[0].phoneReceiver,
      productItems:  orderModal[0].productItems,
      status:  orderModal[0].status,
      totalPrice:  orderModal[0].totalPrice

    })
    setOpen(true);
  }
  const handleClose = () => setOpen(false);
  const [productmodal, setProductModal] = React.useState({
    addressReceiver: "",
    createAt: null,
    idUser: "",
    message: "",
    namedReceiver: "",
    payment: "",
    phoneReceiver: null,
    productItems: [],
    status: null,
    totalPrice: ""
  })

    // React.useEffect(()=> {
      const fetchListOrder = async () => {
        const {data} = await axios.get(`${baseURL}order/get-listorder-by-idshop/${idShop}`);
        setListOrder(data);
      };
      fetchListOrder();
    // },[]);
    console.log(listOrder) ; 
  
    const StatusItem = [
      {label: 'CHỜ XÁC NHẬN', value: '1'},
      {label: 'ĐÃ XÁC NHẬN', value: '2'},
      {label: 'ĐANG GIAO HÀNG', value: '3'},
      {label: 'ĐÃ GIAO HÀNG', value: '4'},
  ];
  const [status, setStatus] = React.useState("")
  return (
    <>
    <table class="GeneratedTable" align="center" >
          <thead>
            <tr>
              <th style={{textAlignLast: "center" }}>STT</th>
              <th style={{textAlignLast: "center" }}>idUser</th>
              <th>Tổng giá </th>
              <th>Ngày đặt hàng</th>
              <th >Lưu ý người bán</th>
              {/* <th>status</th> */}
              <th>Trạng thái đơn hàng</th>
              <th>View</th> 
             
            </tr>
          </thead>
          <tbody>	
            {listOrder.map((item, index) => (  
                            // #eaeff7cc

              <tr>
                <td style={{textAlignLast: "center" }}>{index + 1}</td>
                <td>{item.idUser}</td>
                <td>{item.totalPrice}</td>
                <td>{item.createAt}</td>
                <td>{item.message}</td>
                {/* <td>{item.status}</td> */}
                <td><Dropdown className="form-control"id="dropdown" value={status} options={StatusItem} onChange={(e) => setStatus(e.target.value)} placeholder="Manage"/></td>
                <td style={{    textAlign: "center"}}>
                  <Button id={item._id} variant="outlined" size="small" style={{fontSize:"9px"}}  onClick={handleOpen}>xem chi tiết</Button>
                </td>

              </tr>
              
            ))}


            </tbody>
          <tfoot>
            
          </tfoot>
    </table>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className='row'>
              <div className='col-sm-12'>
              <h4>Chi tiết đơn hàng</h4>

              </div>

              <div className='col-sm-12'>
               
                <div className="col-sm-6"  style={{float: "right"}}>
                <p>Số điện thoại: {productmodal.phoneReceiver}</p>
                <p>Ngày đặt hàng:{productmodal.createAt}</p>

                </div>
                <div className='col-sm-6'  style={{float: "right"}}>
                  <p>Tên người nhận hàng: {productmodal.namedReceiver}</p>
                  <p>Địa chỉ nhận hàng: {productmodal.addressReceiver}</p>
                </div>
                <p>Tổng giá: {productmodal.totalPrice}</p>
                <hr />
                <div style={{overflow: "auto", height: "200px"}}>
                  {
                    productmodal.productItems.map((item) => (
                        <div className='col-sm-12' >
                          <div className='col-sm-2' style={{float: "left"}}>
                            <img src={`${baseURL}images/products/${item.imgProduct}`} style={{width:"70%"}}  />
                          </div>
                          <div className='col-sm-10' style={{float: "left"}}>
                            <p style={{margin: "0px"}}>{item.nameProduct}</p>
                            <p style={{margin: "0px"}} >{item.unit_price} đ</p>
                            <p >x {item.quantity}</p>
                          </div>
                          
                        </div>
                      
                    ))
                  }
                </div>

                

                
                 
                 
                
                
              </div>
              
            </div>
          
          </Box>
        </Fade>
      </Modal>
    </>
   

  )
}

export default ManageOrders;