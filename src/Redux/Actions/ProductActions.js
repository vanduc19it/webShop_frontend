import {PRODUCT_LIST_REQUEST, PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESS, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL} from "../Constants/ProductConstants"
import axios from "axios"

const baseURL = "http://localhost:5000/";

export const listProduct = () => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST});
        const {data} = await axios.get(`${baseURL}all-product/all`);
        console.log(data)
        dispatch({type:PRODUCT_LIST_SUCCESS, payload:data})
        
    } catch (error) {
        dispatch({ 
            type: PRODUCT_LIST_FAIL,
            payload:
            error.response && error.response.data.message 
            ? error.response.data.message
            : error.message,
        })
    }
}

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