import {USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_UPDATE_USER_IMAGE_REQUEST, USER_UPDATE_USER_IMAGE_SUCCESS, USER_UPDATE_USER_IMAGE_FAIL} from "../Constants/UserConstants"

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
//update user image 
export const userUpdateImageReducer = (state = { }, action) => {
    switch (action.type) {
        case USER_UPDATE_USER_IMAGE_REQUEST: 
            return {loading: true}

        case USER_UPDATE_USER_IMAGE_SUCCESS: 
            return {loading: false, userInfo: action.payload}

        case USER_UPDATE_USER_IMAGE_FAIL: 
            return {loading: false, error: action.payload}

        default:
            return state;
    }
}