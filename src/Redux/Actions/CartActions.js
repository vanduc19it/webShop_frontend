import axios from "axios";
import {cartConstant, BASE_URL_SERVER} from "../Constants/index"; 
import {CART_ADD_PRODUCTS_REQUEST, CART_ADD_PRODUCTS_SUCCESS, CART_ADD_PRODUCTS_FAIL, CART_REMOVE_PRODUCTS_REQUEST, CART_REMOVE_PRODUCTS_SUCCESS, CART_REMOVE_PRODUCTS_FAIL} from '../Constants/CartConstants'
const base_url = BASE_URL_SERVER ; 
//add product to cart (localstorage)
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

//add product to cart luu database
export const addToCartDB = (idUser, product, quantity) => async (dispatch) => {
    console.log(product)
    try {
        dispatch({type: CART_ADD_PRODUCTS_REQUEST});
        const {data} = await axios.post( `${base_url}cart/add-new-product`, {
            idUser: idUser, 
            idProduct: product._id,
            nameProduct: product.nameProduct,
            imgProduct: product.imageProduct,
            quantity: quantity, 
            unit_price: product.price
        });
        dispatch({type:CART_ADD_PRODUCTS_SUCCESS, payload:data})
        
        
    } catch (error) {
        dispatch({ 
            type: CART_ADD_PRODUCTS_FAIL,
            payload:
            error.response && error.response.data.message 
            ? error.response.data.message
            : error.message,
        });
    }
};

//remove product to cart
export const removeFromCart = (id) => async (dispatch, getState) => {
    
    dispatch({
        type: cartConstant.CART_REMOVE_PRODUCTS,
        payload: id, 
    });
        
       localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

//remove product to cart (database)
export const removeFromCartDB = (idUser, idProduct) => async (dispatch) => {
    
    try {
        dispatch({type: CART_REMOVE_PRODUCTS_REQUEST});
        const {data} = await axios.post( `${base_url}cart/remove-product-cart`, {
            idUser: idUser, 
            idProduct: idProduct,
            
        });
        dispatch({type:CART_REMOVE_PRODUCTS_SUCCESS, payload:data})    
        
    } catch (error) {
        dispatch({ 
            type: CART_REMOVE_PRODUCTS_FAIL,
            payload:
            error.response && error.response.data.message 
            ? error.response.data.message
            : error.message,
        });
    }
        
    //   AsyncStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
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