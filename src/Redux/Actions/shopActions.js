import axios from "axios";
import { shopConstant, BASE_URL_SERVER } from "../Constants/index";
const baseURL = BASE_URL_SERVER;
//TAO SHOP
export const createShop = (idUser,nameShop, phoneShop, addressShop) => async (dispatch) => {
    try {
        dispatch({type: shopConstant.CREATE_SHOP_REQUEST});
        const config = {
            headers: {
                "Content-Type":"application/json",
            }
        }
        const {data} = await axios.post(`${baseURL}shop/create-new`, {idUser, nameShop, phoneShop, addressShop}, config);
        console.log(data);
        dispatch({type: shopConstant.CREATE_SHOP_SUCCESS, payload:data})
        localStorage.setItem("shopInfo", JSON.stringify(data))
        
    } catch (error) {
        dispatch({ 
            type: shopConstant.CREATE_SHOP_FAIL,
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
        dispatch({type: shopConstant.GET_SHOP_REQUEST});
        const {
            shopDetail : {shopInfo}, 
        } = getState()
     
        const {data} = await axios.get(`${baseURL}shop/get-shop-by-user/${idUser}`);
        dispatch({type: shopConstant.GET_SHOP_SUCCESS, payload:data})
        
    } catch (error) {
        const message = error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
               
        dispatch({ 
            type: shopConstant.GET_SHOP_FAIL,
            payload: message
        })
    }
}

//product list
export const listProductByIdShop = (idShop="", pageNumber="") => async (dispatch) => {

    try {

        dispatch({type: shopConstant.PRODUCT_SHOP_LIST_REQUEST});
        const {data} = await axios.get( `${baseURL}product/get-product-idShop/${idShop}/${pageNumber}`)
        console.log("get data ")
        console.log(data)
        dispatch({type:shopConstant.PRODUCT_SHOP_LIST_SUCCESS, payload:data})
        
    } catch (error) {
        dispatch({ 
            type: shopConstant.PRODUCT_SHOP_LIST_FAIL,
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
        console.log(shopConstant) ; 
        dispatch({type: shopConstant.GET_SHOP_INFOR_REQUEST});
        const {data} = await axios.get( `${baseURL}shop/get-shop/${idShop}`)
        console.log("get data ")
        console.log(data)
        dispatch({type:shopConstant.GET_SHOP_INFOR_SUCCESS, payload:data})
        
    } catch (error) {
        dispatch({ 
            type: shopConstant.GET_SHOP_INFOR_FAIL,
            payload:
            error.response && error.response.data.message 
            ? error.response.data.message
            : error.message,
        });
    }
}
