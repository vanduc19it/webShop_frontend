

import {productConstant} from "../Constants/index" ; 

export const productListReducer = (state = { products: []}, action) => {
    switch (action.type) {
        case productConstant.PRODUCT_LIST_REQUEST: 
            return {loading: true, products:[]}
        case productConstant.PRODUCT_LIST_SUCCESS: 
            return {loading: false, 
                pages: action.payload.pages,
                page: action.payload.page,
                products: action.payload}

        case productConstant.PRODUCT_LIST_FAIL: 
            return {loading: false, error: action.payload}

        default:
            return state;
    }
}

//product theo id
export const productDetailReducer = (state = { product: {reviews: []}}, action) => {
    switch (action.type) {
        case productConstant.PRODUCT_DETAIL_REQUEST: 
            return {...state, loading: true}

        case productConstant.PRODUCT_DETAIL_SUCCESS: 
            return {loading: false, product: action.payload}

        case productConstant.PRODUCT_DETAIL_FAIL: 
            return {loading: false, error: action.payload}

        default:
            return state;
    }
}
//PRODUCT SEARCH
export const productSearchReducer = (state = { products: []}, action) => {
    switch (action.type) {
        case productConstant.PRODUCT_SEARCH_REQUEST: 
            return {loading: true, products:[]}

        case productConstant.PRODUCT_SEARCH_SUCCESS: 
            return {loading: false, productsSearch: action.payload}

        case productConstant.PRODUCT_SEARCH_FAIL: 
            return {loading: false, error: action.payload}

        default:
            return state;
    }
}

//CREATE feedback
export const productCreateFeedbackReducer = (state = { }, action) => {
    switch (action.type) {
        case productConstant.PRODUCT_CREATE_FEEDBACK_REQUEST: 
            return {loading: true}

        case productConstant.PRODUCT_CREATE_FEEDBACK_SUCCESS: 
            return {loading: false, success: true}

        case productConstant.PRODUCT_CREATE_FEEDBACK_FAIL: 
            return {loading: false, error: action.payload}

        case productConstant.PRODUCT_CREATE_FEEDBACK_RESET: 
            return {}
        default:
            return state;
    }
}
//get Feedback
export const productGetFeedbackReducer = (state = { feedbacks: [] }, action) => {
    switch (action.type) {
        case productConstant.PRODUCT_GET_FEEDBACK_REQUEST: 
            return {...state, loading: true}

        case productConstant.PRODUCT_GET_FEEDBACK_SUCCESS: 
            return {loading: false, feedbacks: action.payload}

        case productConstant.PRODUCT_GET_FEEDBACK_FAIL: 
            return {loading: false, error: action.payload}

        default:
            return state;
    }
}