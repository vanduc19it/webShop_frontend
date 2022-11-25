import {userConstant} from "../Constants/index"

//login
export const userLoginReducer = (state = { }, action) => {
    switch (action.type) {
        case userConstant.USER_LOGIN_REQUEST: 
            return {loading: true}

        case userConstant.USER_LOGIN_SUCCESS: 
            return {loading: false, userInfo: action.payload}

        case userConstant.USER_LOGIN_FAIL: 
            return {loading: false, error: action.payload}

        case userConstant.USER_LOGOUT: 
            return {};

        default:
            return state;
    }
}
// dangki
export const userRegisterReducer = (state = { }, action) => {
    switch (action.type) {
        case userConstant.USER_REGISTER_REQUEST: 
            return {loading: true}

        case userConstant.USER_REGISTER_SUCCESS: 
            return {loading: false, userInfo: action.payload}

        case userConstant.USER_REGISTER_FAIL: 
            return {loading: false, error: action.payload}

        default:
            return state;
    }
}
// DETAIL USER
export const userDetailReducer = (state = {user:{} }, action) => {
    switch (action.type) {
        case userConstant.USER_DETAIL_REQUEST: 
            return {...state, loading: true}

        case userConstant.USER_DETAIL_SUCCESS: 
            return {loading: false, user: action.payload}

        case userConstant.USER_DETAIL_FAIL: 
            return {loading: false, error: action.payload}

        case userConstant.USER_DETAIL_RESET: 
            return {user: {}}

        default:
            return state;
    }
}

//update user image 
export const userUpdateImageReducer = (state = { }, action) => {
    switch (action.type) {
        case userConstant.USER_UPDATE_USER_IMAGE_REQUEST: 
            return {loading: true}

        case userConstant.USER_UPDATE_USER_IMAGE_SUCCESS: 
            return {loading: false,success: true, userInfo: action.payload}

        case userConstant.USER_UPDATE_USER_IMAGE_FAIL: 
            return {loading: false, error: action.payload}

        default:
            return state;
    }
}

//update PROFILE 
export const userUpdateProfileReducer = (state = { }, action) => {
    switch (action.type) {
        case userConstant.USER_UPDATE_PROFILE_REQUEST: 
            return {loading: true}

        case userConstant.USER_UPDATE_PROFILE_SUCCESS: 
            return {loading: false,success: true, updateprofile: action.payload}

        case userConstant.USER_UPDATE_PROFILE_FAIL: 
            return {loading: false, error: action.payload}

        default:
            return state;
    }
}

export const checkPassReducer = (state = { }, action) => {
    switch (action.type) {
        case userConstant.USER_CHECK_PASS_REQUEST: 
            return {loading: true}

        case userConstant.USER_CHECK_PASS_SUCCESS: 
            return {loading: false, check: action.payload}

        case userConstant.USER_CHECK_PASS_FAIL: 
            return {loading: false, check: action.payload}

        default:
            return state;
    }
}