import {PRODUCT_LIST_REQUEST, PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESS, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL, PRODUCT_SEARCH_REQUEST, PRODUCT_SEARCH_SUCCESS, PRODUCT_SEARCH_FAIL, PRODUCT_CREATE_FEEDBACK_REQUEST, PRODUCT_CREATE_FEEDBACK_SUCCESS, PRODUCT_CREATE_FEEDBACK_FAIL, PRODUCT_GET_FEEDBACK_REQUEST, PRODUCT_GET_FEEDBACK_SUCCESS, PRODUCT_GET_FEEDBACK_FAIL} from "../Constants/ProductConstants"
import axios from "axios"
import { logout } from "./userActions";

const baseURL = "http://localhost:5000/";

//product list
export const listProduct = (keyword="", pageNumber="") => async (dispatch) => {

    try {
        dispatch({type: PRODUCT_LIST_REQUEST});
        const {data} = await axios.get( `${baseURL}all-product/${pageNumber}/?search=${keyword}`)
        console.log(data)
        dispatch({type:PRODUCT_LIST_SUCCESS, payload:data})
        
    } catch (error) {
        dispatch({ 
            type: PRODUCT_LIST_FAIL,
            payload:
            error.response && error.response.data.message 
            ? error.response.data.message
            : error.message,
        });
    }
};

//products search
export const searchProduct = (keyword="") => async (dispatch) => {
    
    try {
        dispatch({type: PRODUCT_SEARCH_REQUEST});
        const {data} = await axios.get( `${baseURL}product-search/?search=${keyword}`)
        dispatch({type:PRODUCT_SEARCH_SUCCESS, payload:data})
        
    } catch (error) {
        dispatch({ 
            type: PRODUCT_SEARCH_FAIL,
            payload:
            error.response && error.response.data.message 
            ? error.response.data.message
            : error.message,
        });
    }
};

//product theo id
export const listProductDetail = (id) => async (dispatch) => {
    try {
        console.log(id);
        dispatch({type: PRODUCT_DETAIL_REQUEST});
        const {data} = await axios.get(`http://localhost:5000/detail-product?idProduct=${id}`);
        console.log(data)
        dispatch({type:PRODUCT_DETAIL_SUCCESS, payload:data})
        
    } catch (error) {
        dispatch({ 
            type: PRODUCT_DETAIL_FAIL,
            payload:
            error.response && error.response.data.message 
            ? error.response.data.message
            : error.message,
        })
    }
}
//get feedback
export const getProductFeedback = (idProduct) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_GET_FEEDBACK_REQUEST});
        const {data} = await axios.get(`http://localhost:5000/get-feedback/${idProduct}/all`);
        dispatch({type:PRODUCT_GET_FEEDBACK_SUCCESS, payload:data})
        console.log(data)
        
        
    } catch (error) {
        dispatch({ 
            type: PRODUCT_GET_FEEDBACK_FAIL,
            payload:
            error.response && error.response.data.message 
            ? error.response.data.message
            : error.message,
        })
    }
}

//create feedback
export const createProductFeedback = (idProduct, idUser, rate,comment) => async (dispatch,getState) => {
    try {
        dispatch({type: PRODUCT_CREATE_FEEDBACK_REQUEST});
        const {
            userLogin: {userInfo},
        } = getState();
        const config = {
            headers: {
                "Content-Type":"application/json",
                Authorization:  `${userInfo.token}`
            }
        }
        await axios.post(`http://localhost:5000/feedback-user`,{ 
            "idProduct":idProduct,
            "idUser": idUser,
            "rate":  rate,
            "comment": comment,
            },config);
        dispatch({type:PRODUCT_CREATE_FEEDBACK_SUCCESS})
        
    } catch (error) {
          const message = error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
                if (message === "not author, token failed") {
                    dispatch(logout())
                }
        dispatch({ 
            type: PRODUCT_CREATE_FEEDBACK_FAIL,
            payload: message
        })
    }
}