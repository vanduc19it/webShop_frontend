import {shopConstant} from "../Constants/index";

// tao shop
export const createShopReducer = (state = { }, action) => {
    switch (action.type) {
        case shopConstant.CREATE_SHOP_REQUEST: 
            return {loading: true}

        case shopConstant.CREATE_SHOP_SUCCESS: 
            return {loading: false, shopInfo: action.payload}

        case shopConstant.CREATE_SHOP_FAIL: 
            return {loading: false, error: action.payload}

        default:
            return state;
    }
}

// get info shop
export const shopDetailReducer = (state = {shopInfo:{} }, action) => {
    switch (action.type) {
        case shopConstant.GET_SHOP_REQUEST: 
            return {...state, loading: true}

        case shopConstant.GET_SHOP_SUCCESS: 
            return {loading: false, shopInfo: action.payload}

        case shopConstant.GET_SHOP_FAIL: 
            return {loading: false, error: action.payload}

        default:
            return state;
    }
}

export const shopInfornomal = (state = { shop: []}, action) => {
  
    switch (action.type) {
        case shopConstant.GET_SHOP_INFOR_REQUEST: 
            return {loading: true, shop:[]}
        case shopConstant.GET_SHOP_INFOR_SUCCESS: 
            return {loading: false, 
                pages: action.payload.pages,
                page: action.payload.page,
                shop: action.payload}

        case shopConstant.GET_SHOP_INFOR_FAIL: 
            return {loading: false, error: action.payload}

        default:
            return state;
    }
}

export const productListShopReducer = (state = { products: []}, action) => {
    switch (action.type) {
        case shopConstant.PRODUCT_SHOP_LIST_REQUEST: 
            return {loading: true, products:[]}
        case shopConstant.PRODUCT_SHOP_LIST_SUCCESS: 
            return {loading: false, 
                pages: action.payload.pages,
                page: action.payload.page,
                products: action.payload}

        case shopConstant.PRODUCT_SHOP_LIST_FAIL: 
            return {loading: false, error: action.payload}

        default:
            return state;
    }
}
