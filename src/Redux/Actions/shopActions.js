import axios from "axios";
import { CREATE_SHOP_FAIL, CREATE_SHOP_REQUEST, CREATE_SHOP_SUCCESS, GET_SHOP_FAIL, GET_SHOP_REQUEST, GET_SHOP_SUCCESS } from "../Constants/shopConstants";
const baseURL = "http://localhost:5000/";
//TAO SHOP
export const createShop = (idUser,nameShop, phoneShop, addressShop) => async (dispatch) => {
    try {
        dispatch({type: CREATE_SHOP_REQUEST});
        const config = {
            headers: {
                "Content-Type":"application/json",
            }
        }
        const {data} = await axios.post(`${baseURL}shop/create-new`, {idUser, nameShop, phoneShop, addressShop}, config);
        console.log(data);
        dispatch({type: CREATE_SHOP_SUCCESS, payload:data})
        localStorage.setItem("shopInfo", JSON.stringify(data))
        
    } catch (error) {
        dispatch({ 
            type: CREATE_SHOP_FAIL,
            payload:
            error.response && error.response.data.message 
            ? error.response.data.message
            : error.message,
        })
    }
}

//shop detail
export const getShopDetail = (idUser) => async (dispatch, getState) => {
    try {
        dispatch({type: GET_SHOP_REQUEST});
        const {
            shopDetail : {shopInfo}, 
        } = getState()
     
        const {data} = await axios.get(`${baseURL}shop/get-shop-by-user/${idUser}`);
        dispatch({type: GET_SHOP_SUCCESS, payload:data})
        
    } catch (error) {
        const message = error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
               
        dispatch({ 
            type: GET_SHOP_FAIL,
            payload: message
        })
    }
}