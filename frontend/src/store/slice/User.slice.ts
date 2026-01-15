import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false
};

export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        // This is the missing export logic
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

// FIX: Explicitly export the action
export const { setUser, clearUser } = UserSlice.actions;
export default UserSlice.reducer;
