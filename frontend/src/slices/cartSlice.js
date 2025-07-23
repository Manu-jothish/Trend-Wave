import { updateCart } from '../../utils/cartutils'
import { createSlice } from '@reduxjs/toolkit'


const initialState = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : {
        cartItems: [],
        shippingAddress: { address: "", city: "", postalCode: "", country: "" },
        paymentMethod: ""
    }


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {

            const item = action.payload

            const existingItem = state.cartItems.find((x) => x._id == item._id)

            if (existingItem) {
                state.cartItems = state.cartItems.map((x) => {
                    return x._id === existingItem._id ? item : x
                })
            } else {
                state.cartItems = [...state.cartItems, item]
            }

            return updateCart(state)

        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload)
            return updateCart(state)
        },
        resetCart: (state) => {
            (state = {
                cartItems: [],
                shippingAddress: { address: "", city: "", postalCode: "", country: "" },
                paymentMethod: ""
            })
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload
            localStorage.setItem('cart', JSON.stringify(state))
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload
            localStorage.setItem('cart', JSON.stringify(state))
        },
        clearCartItems: (state, action) => {
            state.cartItems = []
            return updateCart(state)
        }
    }
})

export const { addToCart,
    clearCartItems,
    removeFromCart,
    resetCart,
    savePaymentMethod,
    saveShippingAddress } = cartSlice.actions

export default cartSlice.reducer