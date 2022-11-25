import {shopContant} from "../Constants/index";
import axios from "axios"
import { logout } from "./userActions";

const baseURL = "http://localhost:5000/";

//product list
export const listProductByIdShop = (idShop="", pageNumber="") => async (dispatch) => {

    try {

        dispatch({type: shopContant.PRODUCT_SHOP_LIST_REQUEST});
        const {data} = await axios.get( `${baseURL}product/get-product-idShop/${idShop}/${pageNumber}`)
        console.log("get data ")
        console.log(data)
        dispatch({type:shopContant.PRODUCT_SHOP_LIST_SUCCESS, payload:data})
        
    } catch (error) {
        dispatch({ 
            type: shopContant.PRODUCT_SHOP_LIST_FAIL,
            payload:
            error.response && error.response.data.message 
            ? error.response.data.message
            : error.message,
        });
    }
};

// get infor shop
export const getInforShop = (idShop) => async (dispatch) => {
    try {
        console.log("constant") ; 
        console.log(shopContant) ; 
        dispatch({type: shopContant.GET_SHOP_INFOR_REQUEST});
        const {data} = await axios.get( `${baseURL}shop/get-shop/${idShop}`)
        console.log("get data ")
        console.log(data)
        dispatch({type:shopContant.GET_SHOP_INFOR_SUCCESS, payload:data})
        
    } catch (error) {
        dispatch({ 
            type: shopContant.GET_SHOP_INFOR_FAIL,
            payload:
            error.response && error.response.data.message 
            ? error.response.data.message
            : error.message,
        });
    }
}
//get feedback

