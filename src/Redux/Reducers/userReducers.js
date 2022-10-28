import {USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_UPDATE_USER_IMAGE_REQUEST, USER_UPDATE_USER_IMAGE_SUCCESS, USER_UPDATE_USER_IMAGE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_SUCCESS, USER_CHECK_PASS_REQUEST, USER_CHECK_PASS_SUCCESS, USER_CHECK_PASS_FAIL, USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS, USER_DETAIL_FAIL, USER_DETAIL_RESET} from "../Constants/UserConstants"

//login
export const userLoginReducer = (state = { }, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST: 
            return {loading: true}

        case USER_LOGIN_SUCCESS: 
            return {loading: false, userInfo: action.payload}

        case USER_LOGIN_FAIL: 
            return {loading: false, error: action.payload}

        case USER_LOGOUT: 
            return {};

        default:
            return state;
    }
}
// dangki
export const userRegisterReducer = (state = { }, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST: 
            return {loading: true}

        case USER_REGISTER_SUCCESS: 
            return {loading: false, userInfo: action.payload}

        case USER_REGISTER_FAIL: 
            return {loading: false, error: action.payload}

        default:
            return state;
    }
}
// DETAIL USER
export const userDetailReducer = (state = {user:{} }, action) => {
    switch (action.type) {
        case USER_DETAIL_REQUEST: 
            return {...state, loading: true}

        case USER_DETAIL_SUCCESS: 
            return {loading: false, user: action.payload}

        case USER_DETAIL_FAIL: 
            return {loading: false, error: action.payload}

        case USER_DETAIL_RESET: 
            return {user: {}}

        default:
            return state;
    }
}

//update user image 
export const userUpdateImageReducer = (state = { }, action) => {
    switch (action.type) {
        case USER_UPDATE_USER_IMAGE_REQUEST: 
            return {loading: true}

        case USER_UPDATE_USER_IMAGE_SUCCESS: 
            return {loading: false,success: true, userInfo: action.payload}

        case USER_UPDATE_USER_IMAGE_FAIL: 
            return {loading: false, error: action.payload}

        default:
            return state;
    }
}

//update PROFILE 
export const userUpdateProfileReducer = (state = { }, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST: 
            return {loading: true}

        case USER_UPDATE_PROFILE_SUCCESS: 
            return {loading: false,success: true, updateprofile: action.payload}

        case USER_UPDATE_PROFILE_FAIL: 
            return {loading: false, error: action.payload}

        default:
            return state;
    }
}

export const checkPassReducer = (state = { }, action) => {
    switch (action.type) {
        case USER_CHECK_PASS_REQUEST: 
            return {loading: true}

        case USER_CHECK_PASS_SUCCESS: 
            return {loading: false, check: action.payload}

        case USER_CHECK_PASS_FAIL: 
            return {loading: false, check: action.payload}

        default:
            return state;
    }
}