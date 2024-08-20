import cartReducer from "./features/cart/cartSlice";
import userReducer from "./features/user/userSlice";
import { configureStore } from '@reduxjs/toolkit';

const Store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
    },
})

export default Store;