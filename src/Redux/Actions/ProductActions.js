import axios from "axios"
import { logout } from "./userActions";

import {productConstant, BASE_URL_SERVER} from "../Constants/index" ; 

const baseURL = BASE_URL_SERVER;

//product list
export const listProduct = (keyword="", pageNumber="") => async (dispatch) => {

    try {
        dispatch({type: productConstant.PRODUCT_LIST_REQUEST});
        const {data} = await axios.get( `${baseURL}all-product/${pageNumber}/?search=${keyword}`)
        console.log(data)
        dispatch({type: productConstant.PRODUCT_LIST_SUCCESS, payload:data})
        
    } catch (error) {
        dispatch({ 
            type: productConstant.PRODUCT_LIST_FAIL,
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
        dispatch({type: productConstant.PRODUCT_SEARCH_REQUEST});
        const {data} = await axios.get( `${baseURL}product-search/?search=${keyword}`)
        dispatch({type: productConstant.PRODUCT_SEARCH_SUCCESS, payload:data})
        
    } catch (error) {
        dispatch({ 
            type: productConstant.PRODUCT_SEARCH_FAIL,
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
        dispatch({type: productConstant.PRODUCT_DETAIL_REQUEST});
        const {data} = await axios.get(`${baseURL}detail-product?idProduct=${id}`);
        console.log(data)
        dispatch({type: productConstant.PRODUCT_DETAIL_SUCCESS, payload:data})
        
    } catch (error) {
        dispatch({ 
            type: productConstant.PRODUCT_DETAIL_FAIL,
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
        dispatch({type: productConstant.PRODUCT_GET_FEEDBACK_REQUEST});
        const {data} = await axios.get(`${baseURL}get-feedback/${idProduct}/all`);
        dispatch({type: productConstant.PRODUCT_GET_FEEDBACK_SUCCESS, payload:data})
        console.log(data)
        
        
    } catch (error) {
        dispatch({ 
            type: productConstant.PRODUCT_GET_FEEDBACK_FAIL,
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
        dispatch({type: productConstant.PRODUCT_CREATE_FEEDBACK_REQUEST});
        const {
            userLogin: {userInfo},
        } = getState();
        const config = {
            headers: {
                "Content-Type":"application/json",
                Authorization:  `${userInfo.token}`
            }
        }
        await axios.post(`${baseURL}feedback-user`,{ 
            "idProduct":idProduct,
            "idUser": idUser,
            "rate":  rate,
            "comment": comment,
            },config);
        dispatch({type: productConstant.PRODUCT_CREATE_FEEDBACK_SUCCESS})
        
    } catch (error) {
          const message = error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
                if (message === "not author, token failed") {
                    dispatch(logout())
                }
        dispatch({ 
            type: productConstant.PRODUCT_CREATE_FEEDBACK_FAIL,
            payload: message
        })
    }
}

// export const addNewProduct = (data) => async (dispatch, getState) => {
//     dispatch({ type: categoryConstant.CATEGORY_GET_SUCCESS});
    
//     const config = {
//         headers: {
//             "Authorization": `${userInfo.token}`,
//             "Content-Type":"application/json",

//         }
//     }
//     const {result} = await axios.post(`${base_url}add-new-product`,data, config); 
//     console.log(result);
//     dispatch({type: categoryConstant.CATEGORY_GET_SUCCESS, payload:result}) ; 

// }
