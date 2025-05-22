import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import itemsReducer from "../features/itemsSlice";
import otherCostsReducer from "../features/otherCostsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,         // ✅ for auth
    items: itemsReducer,       // ✅ for items list
    otherCosts: otherCostsReducer // ✅ for other costs list
  },
});
