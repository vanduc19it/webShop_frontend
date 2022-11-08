import { CREATE_SHOP_FAIL, CREATE_SHOP_REQUEST, CREATE_SHOP_SUCCESS, GET_SHOP_FAIL, GET_SHOP_REQUEST, GET_SHOP_SUCCESS } from "../Constants/shopConstants";

// tao shop
export const createShopReducer = (state = { }, action) => {
    switch (action.type) {
        case CREATE_SHOP_REQUEST: 
            return {loading: true}

        case CREATE_SHOP_SUCCESS: 
            return {loading: false, shopInfo: action.payload}

        case CREATE_SHOP_FAIL: 
            return {loading: false, error: action.payload}

        default:
            return state;
    }
}

// get info shop
export const shopDetailReducer = (state = {shopInfo:{} }, action) => {
    switch (action.type) {
        case GET_SHOP_REQUEST: 
            return {...state, loading: true}

        case GET_SHOP_SUCCESS: 
            return {loading: false, shopInfo: action.payload}

        case GET_SHOP_FAIL: 
            return {loading: false, error: action.payload}

        default:
            return state;
    }
}