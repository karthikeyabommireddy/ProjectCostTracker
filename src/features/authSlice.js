import { createSlice } from "@reduxjs/toolkit";

// Initial auth state
const initialState = {
  user: null,
};

// Create slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set user after login/signup
    setUser: (state, action) => {
      state.user = action.payload;
    },

    // Clear user on logout
    clearUser: (state) => {
      state.user = null;
    },
  },
});

// Export actions
export const { setUser, clearUser } = authSlice.actions;

// Export selector (clean and correct)
export const selectCurrentUser = (state) => state.auth.user;

// Export reducer
export default authSlice.reducer;
