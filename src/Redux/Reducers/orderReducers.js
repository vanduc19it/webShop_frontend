
import {orderContant} from "../Constants/index";
// dat hang
export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case orderContant.ORDER_CREATE_REQUEST: 
            return {loading: true}

        case orderContant.ORDER_CREATE_SUCCESS: 
            return {loading: false,success: true, order: action.payload}

        case orderContant.ORDER_CREATE_FAIL: 
            return {loading: false, error: action.payload}

        case orderContant.ORDER_CREATE_RESET: 
            return {}

        default:
            return state;
    }
}

// get don dat hang theo id user
export const orderDetailReducer = (state = {loading: true, orderItems: [], shippingInfo: {}}, action) => {
    switch (action.type) {
        case orderContant.ORDER_DETAIL_REQUEST: 
            return {...state, loading: true}

        case orderContant.ORDER_DETAIL_SUCCESS: 
            return {loading: false,order: action.payload}

        case orderContant.ORDER_DETAIL_FAIL: 
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}


// get don dat hang theo id ORDER
export const orderSingleReducer = (state = {loading: true, orderItem: [], shippingInfo: {}}, action) => {
    switch (action.type) {
        case orderContant.GET_SINGLE_ORDER_REQUEST: 
            return {...state, loading: true}

        case orderContant.GET_SINGLE_ORDER_SUCCESS: 
            return {loading: false,order: action.payload}

        case orderContant.GET_SINGLE_ORDER_FAIL: 
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}