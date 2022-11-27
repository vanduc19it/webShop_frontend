import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productCreateFeedbackReducer, productDetailReducer, productGetFeedbackReducer, productListReducer, productSearchReducer } from "./Reducers/ProductReducers";
import { checkPassReducer, userDetailReducer, userLoginReducer, userRegisterReducer, userUpdateImageReducer, userUpdateProfileReducer } from "./Reducers/userReducers";
import { cartReducer } from "./Reducers/CartReducers";
import { orderCreateReducer, orderDetailReducer, orderSingleReducer } from "./Reducers/orderReducers";
import { createShopReducer, shopDetailReducer, shopInfornomal, productListShopReducer} from "./Reducers/shopReducers";
const reducer = combineReducers({
    productList: productListReducer,
    productSearch: productSearchReducer,
    productDetail: productDetailReducer,
    productCreateFeedback: productCreateFeedbackReducer,
    productGetFeedback: productGetFeedbackReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetail: userDetailReducer,
    userUpdateImage: userUpdateImageReducer,
    userUpdateProfile: userUpdateProfileReducer,
    checkPass: checkPassReducer,
    orderCreate: orderCreateReducer,
    orderDetail: orderDetailReducer,
    orderSingle: orderSingleReducer,
    createShop: createShopReducer,
    shopDetail: shopDetailReducer,
    shopInfor: shopInfornomal, 
    productShop: productListShopReducer,
})

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
? JSON.parse(localStorage.getItem("userInfo"))
: null;

const shopInfoFromLocalStorage = localStorage.getItem("shopInfo")
? JSON.parse(localStorage.getItem("shopInfo"))
: null;

const  cartItemsFromLocalStorage = localStorage.getItem("cartItems")
? JSON.parse(localStorage.getItem("cartItems"))
: []

//giao hang info
const  shippingInfoFromLocalStorage = localStorage.getItem("shippingInfo")
? JSON.parse(localStorage.getItem("shippingInfo"))
: {}

console.log(localStorage.getItem("cartItems"))
const initialState = {
    userLogin: {
        userInfo:userInfoFromLocalStorage,
        
    },
    cart: {
        cartItems: cartItemsFromLocalStorage,
        shippingInfo: shippingInfoFromLocalStorage
    },
    shopDetail: {
        shopInfo:shopInfoFromLocalStorage
    }
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store