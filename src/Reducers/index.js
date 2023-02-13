//1. config store
import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authReducer";
import reduxThunk from "redux-thunk"

export const globalStore = configureStore({
    reducer: {
        // mendefine reducer yang dimiliki
        auth : authReducer
        // authReducer //-> ini jika nama property nya mau disamain dengan nama function nya
    }
}, applyMiddleware(reduxThunk));