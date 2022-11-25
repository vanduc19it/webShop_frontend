import {shopContant} from "../Constants/index" ; 

export const shopInfornomal = (state = { shop: []}, action) => {
  
    switch (action.type) {
        case shopContant.GET_SHOP_INFOR_REQUEST: 
            return {loading: true, shop:[]}
        case shopContant.GET_SHOP_INFOR_SUCCESS: 
            return {loading: false, 
                pages: action.payload.pages,
                page: action.payload.page,
                shop: action.payload}

        case shopContant.GET_SHOP_INFOR_FAIL: 
            return {loading: false, error: action.payload}

        default:
            return state;
    }
}

export const productListShopReducer = (state = { products: []}, action) => {
    switch (action.type) {
        case shopContant.PRODUCT_SHOP_LIST_REQUEST: 
            return {loading: true, products:[]}
        case shopContant.PRODUCT_SHOP_LIST_SUCCESS: 
            return {loading: false, 
                pages: action.payload.pages,
                page: action.payload.page,
                products: action.payload}

        case shopContant.PRODUCT_SHOP_LIST_FAIL: 
            return {loading: false, error: action.payload}

        default:
            return state;
    }
}