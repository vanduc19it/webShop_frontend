import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer } from "./Reducers/ProductReducers";
import { userLoginReducer, userRegisterReducer } from "./Reducers/userReducers";
const reducer = combineReducers({
    productList: productListReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer
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