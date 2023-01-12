import axios from "axios";
import { cartConstant, orderContant , BASE_URL_SERVER} from "../Constants/index";
import { logout } from "./userActions";

const baseURL = BASE_URL_SERVER;
//dat hang
export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({type: orderContant.ORDER_CREATE_REQUEST});
        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                "Content-Type":"application/json",
                Authorization: `${userInfo.token}`
            }
        }
      
        let dataa = {
            cartItems: [ ], 
            shippintInfor:
                {
                idUser: userInfo.idUser,
                namedReceiver: userInfo.username,
                idShop: order.idShop,
                addressReceiver: order.shippingInfo.address, 
                phoneReceiver: order.shippingInfo.phone,  
                payment: order.paymentMethod,             
                totalPrice: order.totalPrice,
                message: order.shippingInfo.message,
                }, 
        }; 

        order.orderItems.map((item) => {
              dataa.cartItems.push(
                {
                    idProduct: item.product, 
                    nameProduct: item.name,
                    imgProduct: item.image,
                    quantity: item.quantity,
                    unit_price: item.price,
                  }
              )        
        })

        const {data} = await axios.post(`${baseURL}order/create-new`, dataa, config);

        dispatch({type:orderContant.ORDER_CREATE_SUCCESS, payload:data})
        dispatch({type: cartConstant.CART_CLEAR_PRODUCTS, payload:data})

        localStorage.removeItem("cartItems")
        
    } catch (error) {
        const message = error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "not author, token failed") {
            dispatch(logout());
        }
        dispatch({ 
            type: orderContant.ORDER_CREATE_FAIL,
            payload: message
        })
    }
}

// lay thong tin don hang theo iduser
export const getOrderDetail = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: orderContant.ORDER_DETAIL_REQUEST});
        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                "Content-Type":"application/json",
                Authorization: `${userInfo.token}`
            }
        }
        const {data} = await axios.get(`${baseURL}order/getall/${id}`, config);
        dispatch({type: orderContant.ORDER_DETAIL_SUCCESS, payload:data})
            
        
    } catch (error) {
        const message = error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "not author, token failed") {
            dispatch(logout());
        }
        dispatch({ 
            type: orderContant.ORDER_DETAIL_FAIL,
            payload: message
        })
    }
}


// lay thong tin don hang theo idorder
export const getOrderSingle = (idOrder) => async (dispatch, getState) => {
    try {
        dispatch({type: orderContant.GET_SINGLE_ORDER_REQUEST});
        const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
                "Content-Type":"application/json",
                Authorization: `${userInfo.token}`
            }
        }
        const {data} = await axios.get(`${baseURL}order/get-id/${idOrder}`, config);
        dispatch({type: orderContant.GET_SINGLE_ORDER_SUCCESS, payload:data})
            
        
    } catch (error) {
        const message = error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "not author, token failed") {
            dispatch(logout());
        }
        dispatch({ 
            type: orderContant.GET_SINGLE_ORDER_FAIL,
            payload: message
        })
    }
}

