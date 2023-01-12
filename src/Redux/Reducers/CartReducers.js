import {cartConstant} from "../Constants/index"; 
export const cartReducer = (state = { cartItems:[], shippingInfo:{} }, action) => {
    switch (action.type) {
        case cartConstant.CART_ADD_PRODUCTS: 
            const item = action.payload
            console.log(item)
            console.log("test")
            console.log(state.cartItems)
            console.log("test")
            const existItem = state.cartItems.find((x) => x.product === item.product)
            if (existItem) {
                return {
                ...state,
                cartItems: state.cartItems.map((x)=>
                x.product === existItem.product ? item : x
                ),
            };
            } else {
                return {
                    ...state, 
                    cartItems: [...state.cartItems, item]}
            }   
        case cartConstant.CART_REMOVE_PRODUCTS: 
                return {
                    ...state, 
                    cartItems: state.cartItems.filter((x) => x.product !== action.payload),
                }
        case cartConstant.CART_SAVE_SHIPPING_INFO: 
                return {
                    ...state, 
                    shippingInfo: action.payload,
                }
        case cartConstant.CART_SAVE_PAYMENT_METHOD: 
                return {
                    ...state, 
                    paymentMethod: action.payload,
                }
        case cartConstant.CART_CLEAR_PRODUCTS:
            return {
                ...state, 
                cartItems: [],
            }

        default:
            return state;
    }
}

