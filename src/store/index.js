import { configureStore, combineReducers, } from "@reduxjs/toolkit";
import { walletReducer } from './wallet/wallet'
import { userReducer } from './user/user'



const rootReducer = combineReducers({
    wallet: walletReducer,
    user: userReducer
})

export default configureStore({
    reducer: rootReducer,
});