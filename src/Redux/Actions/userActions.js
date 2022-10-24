import {USER_LOGIN_REQUEST, 
        USER_LOGIN_FAIL, 
        USER_LOGIN_SUCCESS, 
        USER_REGISTER_REQUEST, 
        USER_REGISTER_SUCCESS,
        USER_REGISTER_FAIL,
        USER_LOGOUT,
        USER_UPDATE_USER_IMAGE_REQUEST,
        USER_UPDATE_USER_IMAGE_SUCCESS,
        USER_UPDATE_USER_IMAGE_FAIL} from "../Constants/UserConstants"
import axios from "axios"

const baseURL = "http://localhost:5000/";

//login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({type: USER_LOGIN_REQUEST});
        const config = {
            headers: {
                "Content-Type":"application/json",
                Accept: 'application/json',
            }
        }
        const {data} = await axios.post(`${baseURL}login-user`, {email, password}, config);
        dispatch({type:USER_LOGIN_SUCCESS, payload:data})
        localStorage.setItem("userInfo", JSON.stringify(data))
        
    } catch (error) {
        dispatch({ 
            type: USER_LOGIN_FAIL,
            payload:
            error.response && error.response.data.message 
            ? error.response.data.message
            : error.message,
        })
    }
}


//dangki
export const register = (username, email, password) => async (dispatch) => {
    try {
        dispatch({type: USER_REGISTER_REQUEST});
        const config = {
            headers: {
                "Content-Type":"application/json",

            }
        }
        const {data} = await axios.post(`${baseURL}register`, {username, email, password}, config);
        console.log(data);
        dispatch({type: USER_REGISTER_SUCCESS, payload:data})
        localStorage.setItem("userInfo", JSON.stringify(data))
        
    } catch (error) {
        dispatch({ 
            type: USER_REGISTER_FAIL,
            payload:
            error.response && error.response.data.message 
            ? error.response.data.message
            : error.message,
        })
    }
}

//logout 
export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo")
    dispatch({type: USER_LOGOUT});
    document.location.href= "/login";
}

//update userimage
export const updateuserimage = (idUser, avatar) => async (dispatch) => {
    console.log(idUser, avatar)
    try {
        dispatch({type: USER_UPDATE_USER_IMAGE_REQUEST});
        const config = {
            headers: {
                "Content-Type":"application/json",
                Accept: 'application/json',
            }
        }
        const {data} = await axios.post(`${baseURL}update-image-user/${idUser}`, {avatarImg: avatar}, config);
        dispatch({type:USER_UPDATE_USER_IMAGE_SUCCESS, payload:data})
        console.log(data)
        localStorage.setItem("userInfo", JSON.stringify(data))
        
    } catch (error) {
        dispatch({ 
            type: USER_UPDATE_USER_IMAGE_FAIL,
            payload:
            error.response && error.response.data.message 
            ? error.response.data.message
            : error.message,
        })
    }
}
