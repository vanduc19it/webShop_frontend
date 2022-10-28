import {PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL, PRODUCT_SEARCH_REQUEST, PRODUCT_SEARCH_SUCCESS, PRODUCT_SEARCH_FAIL} from "../Constants/ProductConstants"

export const productListReducer = (state = { products: []}, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST: 
            return {loading: true, products:[]}
        case PRODUCT_LIST_SUCCESS: 
            return {loading: false, 
                pages: action.payload.pages,
                page: action.payload.page,
                products: action.payload}

        case PRODUCT_LIST_FAIL: 
            return {loading: false, error: action.payload}

        default:
            return state;
    }
}

//product theo id
export const productDetailReducer = (state = { product: {reviews: []}}, action) => {
    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST: 
            return {...state, loading: true}

        case PRODUCT_DETAIL_SUCCESS: 
            return {loading: false, product: action.payload}

        case PRODUCT_DETAIL_FAIL: 
            return {loading: false, error: action.payload}

        default:
            return state;
    }
}
//PRODUCT SEARCH
export const productSearchReducer = (state = { products: []}, action) => {
    switch (action.type) {
        case PRODUCT_SEARCH_REQUEST: 
            return {loading: true, products:[]}

        case PRODUCT_SEARCH_SUCCESS: 
            return {loading: false, productsSearch: action.payload}

        case PRODUCT_SEARCH_FAIL: 
            return {loading: false, error: action.payload}

        default:
            return state;
    }
}