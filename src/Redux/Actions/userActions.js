import axios from "axios"

import {userConstant, BASE_URL_SERVER} from "../Constants/index"

// test thay đổi 
const baseURL = BASE_URL_SERVER;

//login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({type: userConstant.USER_LOGIN_REQUEST});
        const config = {
            headers: {
                "Content-Type":"application/json",
                Accept: 'application/json',
            }
        }
        const {data} = await axios.post(`${baseURL}login-user`, {email, password}, config);
        dispatch({type: userConstant.USER_LOGIN_SUCCESS, payload:data})
        localStorage.setItem("userInfo", JSON.stringify(data))
        
    } catch (error) {
        dispatch({ 
            type: userConstant.USER_LOGIN_FAIL,
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
        dispatch({type: userConstant.USER_REGISTER_REQUEST});
        const config = {
            headers: {
                "Content-Type":"application/json",

            }
        }
        const {data} = await axios.post(`${baseURL}register`, {username, email, password}, config);
        console.log(data);
        dispatch({type: userConstant.USER_REGISTER_SUCCESS, payload:data})
        localStorage.setItem("userInfo", JSON.stringify(data))
        
    } catch (error) {
        dispatch({ 
            type: userConstant.USER_REGISTER_FAIL,
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
    dispatch({type: userConstant.USER_LOGOUT});
    document.location.href= "/login";
}
//user detail
export const getUserDetail = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: userConstant.USER_DETAIL_REQUEST});
        const {
            userLogin : {userInfo}, 
        } = getState()
        
        const config = {
            headers: {
                "Authorization": `${userInfo.token}`,
                "Content-Type":"application/json",

            }
        }
        const {data} = await axios.get(`${baseURL}get-normal-user/${id}`, config);
        console.log(data);
        dispatch({type: userConstant.USER_DETAIL_SUCCESS, payload:data})
        
    } catch (error) {
        const message = error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
                if (message === "not author, token failed") {
                    dispatch(logout())
                }
        dispatch({ 
            type: userConstant.USER_DETAIL_FAIL,
            payload: message
        })
    }
}

// convert buffer base64 to file
const  dataURLtoFile = (dataurl, filename) => {
 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
}
//update userimage
export const updateuserimage = (idUser, avatar) => async (dispatch, getState) => {
    console.log(idUser, avatar)
    const imageFile = dataURLtoFile(avatar, "user.png" ); 
    const formData = new FormData();
    formData.append("avatarImg", imageFile) ; 
    try {
        dispatch({type: userConstant.USER_UPDATE_USER_IMAGE_REQUEST});
        const {
            userLogin: {userInfo},
        } = getState();
        const config = {
            headers: {
                "Content-Type":"application/json",
                Authorization: `${userInfo.token}`
            }
        }
        const {data} = await axios.post(`${baseURL}update-image-user/${idUser}`, formData, config);
        dispatch({type: userConstant.USER_UPDATE_USER_IMAGE_SUCCESS, payload:data})
        
        console.log(data)
        localStorage.setItem("updateImage", JSON.stringify(data))
        
    } catch (error) {
        dispatch({ 
            type: userConstant.USER_UPDATE_USER_IMAGE_FAIL,
            payload:
            error.response && error.response.data.message 
            ? error.response.data.message
            : error.message,
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({type: userConstant.USER_UPDATE_PROFILE_REQUEST});
        const {
            userLogin: {userInfo},
        } = getState();
        const config = {
            headers: {
                "Content-Type":"application/json",
                Authorization: `${userInfo.token}`
            }
        }
        const {data} = await axios.post(`${baseURL}update-user/${user.idUser}`, user, config);
        dispatch({type: userConstant.USER_UPDATE_PROFILE_SUCCESS, payload:data})
        localStorage.setItem("updateprofile", JSON.stringify(data))
        
    } catch (error) {
        dispatch({ 
            type: userConstant.USER_UPDATE_PROFILE_FAIL,
            payload:
            error.response && error.response.data.message 
            ? error.response.data.message
            : error.message,
        })
    }
}


//checkpass
export const checkPassUser = (idUser,password) => async (dispatch) => {
    console.log(idUser,password)
    try {
        dispatch({type: userConstant.USER_CHECK_PASS_REQUEST});
        const config = {
            headers: {
                "Content-Type":"application/json",
                Accept: 'application/json',
            }
        }
        const {data} = await axios.post(`${baseURL}check-pass-user/${idUser}`,{password}, config);
        
        if(data) {
            dispatch({type: userConstant.USER_CHECK_PASS_SUCCESS, payload:data})
            localStorage.setItem("check", JSON.stringify(data))
        }
        else {
            dispatch({type: userConstant.USER_CHECK_PASS_FAIL, payload:data})
            localStorage.setItem("check", JSON.stringify(data))
        }
        
        
    } catch (error) {
        dispatch({ 
            type: userConstant.USER_CHECK_PASS_FAIL,
            payload:
            error.response && error.response.data.message 
            ? error.response.data.message
            : error.message,
        })
    }
}