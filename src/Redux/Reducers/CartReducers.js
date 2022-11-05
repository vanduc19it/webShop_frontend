import { CART_ADD_PRODUCTS, CART_CLEAR_PRODUCTS, CART_REMOVE_PRODUCTS, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_INFO } from "../Constants/CartConstants"

export const cartReducer = (state = { cartItems:[], shippingInfo:{} }, action) => {
    switch (action.type) {
        case CART_ADD_PRODUCTS: 
            const item = action.payload
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
        case CART_REMOVE_PRODUCTS: 
                return {
                    ...state, 
                    cartItems: state.cartItems.filter((x) => x.product !== action.payload),
                }
        case CART_SAVE_SHIPPING_INFO: 
                return {
                    ...state, 
                    shippingInfo: action.payload,
                }
        case CART_SAVE_PAYMENT_METHOD: 
                return {
                    ...state, 
                    paymentMethod: action.payload,
                }
        case CART_CLEAR_PRODUCTS:
            return {
                ...state, 
                cartItems: [],
            }

        default:
            return state;
    }
}