import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productCreateFeedbackReducer, productDetailReducer, productGetFeedbackReducer, productListReducer, productSearchReducer } from "./Reducers/ProductReducers";
import { checkPassReducer, userDetailReducer, userLoginReducer, userRegisterReducer, userUpdateImageReducer, userUpdateProfileReducer } from "./Reducers/userReducers";
import {shopInfornomal, productListShopReducer} from "./Reducers/ShopReducers";
import { cartReducer } from "./Reducers/CartReducers";
import { orderCreateReducer, orderDetailReducer, orderSingleReducer } from "./Reducers/orderReducers";
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
    orderCreate: orderCreateReducer,
    orderDetail: orderDetailReducer,
    orderSingle: orderSingleReducer,
    shopInfor: shopInfornomal, 
    productShop: productListShopReducer,
})

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
? JSON.parse(localStorage.getItem("userInfo"))
: null;

const  cartItemsFromLocalStorage = localStorage.getItem("cartItems")
? JSON.parse(localStorage.getItem("cartItems"))
: []

//giao hang info
const  shippingInfoFromLocalStorage = localStorage.getItem("shippingInfo")
? JSON.parse(localStorage.getItem("shippingInfo"))
: {}

const initialState = {
    userLogin: {userInfo:userInfoFromLocalStorage},
    cart: {
        cartItems: cartItemsFromLocalStorage,
        shippingInfo: shippingInfoFromLocalStorage
    },
    
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store