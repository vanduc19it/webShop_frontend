import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productCreateFeedbackReducer, productDetailReducer, productGetFeedbackReducer, productListReducer, productSearchReducer } from "./Reducers/ProductReducers";
import { checkPassReducer, userDetailReducer, userLoginReducer, userRegisterReducer, userUpdateImageReducer, userUpdateProfileReducer } from "./Reducers/userReducers";
import { cartReducer } from "./Reducers/CartReducers";
const reducer = combineReducers({
    productList: productListReducer,
    productSearch: productSearchReducer,
    productDetail: productDetailReducer,
    productCreateFeedback: productCreateFeedbackReducer,
    productGetFeedback: productGetFeedbackReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userDetail: userDetailReducer,
    userUpdateImage: userUpdateImageReducer,
    userUpdateProfile: userUpdateProfileReducer,
    checkPass: checkPassReducer,
})

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
? JSON.parse(localStorage.getItem("userInfo"))
: null;

const  cartItemsFromLocalStorage = localStorage.getItem("cartItems")
? JSON.parse(localStorage.getItem("cartItems"))
: []

const initialState = {
    userLogin: {userInfo:userInfoFromLocalStorage},
    cart: {cartItems:cartItemsFromLocalStorage}
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store