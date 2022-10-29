import axios from "axios";
import { CART_ADD_PRODUCTS, CART_REMOVE_PRODUCTS } from "../Constants/CartConstants";

//add product to cart
export const addToCart = (id, quantity) => async (dispatch, getState) => {
    const {data} = await axios.get(`http://localhost:5000/detail-product?idProduct=${id}`); 
    dispatch({
        type: CART_ADD_PRODUCTS,
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
}

//remove product to cart
export const removeFromCart = (id) => async (dispatch, getState) => {
    
    dispatch({
        type: CART_REMOVE_PRODUCTS,
        payload: id, 
    });
        
       localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}