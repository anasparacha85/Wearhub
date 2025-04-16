import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../Slices/ProductSlice"; 
import AuthReducer from '../Slices/AuthSLice'

const store = configureStore({
    reducer: {
        products: productReducer,
        auth:AuthReducer
    },
    devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools for debugging
});

export default store;
