import {configureStore} from "@reduxjs/toolkit"
import { apiSlice } from "./slices/apiSlice"
import authSlice from "./slices/authSlice"
import cartSliceReducer from '../src/slices/creatSlice'


export const store = configureStore({
    reducer:{
     [apiSlice.reducerPath]:apiSlice.reducer,  
     auth:authSlice,
     cart:cartSliceReducer
    },

    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(apiSlice.middleware),
})