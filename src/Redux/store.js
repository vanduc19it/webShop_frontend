import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailReducer, productListReducer, productSearchReducer } from "./Reducers/ProductReducers";
import { checkPassReducer, userDetailReducer, userLoginReducer, userRegisterReducer, userUpdateImageReducer, userUpdateProfileReducer } from "./Reducers/userReducers";
const reducer = combineReducers({
    productList: productListReducer,
    productSearch: productSearchReducer,
    productDetail: productDetailReducer,
    userLogin: userLoginReducer,
    userDetail: userDetailReducer,
    userUpdateImage: userUpdateImageReducer,
    userUpdateProfile: userUpdateProfileReducer,
    checkPass: checkPassReducer,
})

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
? JSON.parse(localStorage.getItem("userInfo"))
: null;

const initialState = {
    userLogin: {userInfo:userInfoFromLocalStorage}
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store