import axios from "axios";
import {cartConstant, BASE_URL_SERVER} from "../Constants/index"; 

const base_url = BASE_URL_SERVER ; 
//add product to cart
export const addToCart = (id, quantity) => async (dispatch, getState) => {
    const {data} = await axios.get(`${base_url}detail-product?idProduct=${id}`); 
    dispatch({
        type: cartConstant.CART_ADD_PRODUCTS,
        payload: {
            product: data._id,
            name: data.nameProduct,
            image: data.imageProduct,
            price: data.price,
            Totalquantity: data.quantity,
            quantity, 
        }    
    });
        
       localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
       console.log(getState());
}

//remove product to cart
export const removeFromCart = (id) => async (dispatch, getState) => {
    
    dispatch({
        type: cartConstant.CART_REMOVE_PRODUCTS,
        payload: id, 
    });
        
       localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

//luu thong tin giao hang
export const saveShippingInfo = (data) => async (dispatch) => {
    
    dispatch({
        type: cartConstant.CART_SAVE_SHIPPING_INFO,
        payload: data, 
    });
        
       localStorage.setItem("shippingInfo", JSON.stringify(data));
}

//luu phuong thuc thanh toan
export const savePaymentMethod = (data) => async (dispatch) => {
    
    dispatch({
        type: cartConstant.CART_SAVE_PAYMENT_METHOD,
        payload: data, 
    });
        
       localStorage.setItem("paymentMethod", JSON.stringify(data));
}