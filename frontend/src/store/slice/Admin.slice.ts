import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
    isAdminAuth: boolean;
    admin: any | null;
    token: string | null;
}

const initialState: AdminState = {
    isAdminAuth: !!localStorage.getItem("adminToken"),
    admin: JSON.parse(localStorage.getItem("adminData") || "null"),
    token: localStorage.getItem("adminToken"),
};

const AdminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdmin: (state, action: PayloadAction<{ admin: any; token: string }>) => {
            state.isAdminAuth = true;
            state.admin = action.payload.admin;
            state.token = action.payload.token;

            // Persist
            localStorage.setItem("adminToken", action.payload.token);
            localStorage.setItem("adminData", JSON.stringify(action.payload.admin));
        },
        logoutAdmin: (state) => {
            state.isAdminAuth = false;
            state.admin = null;
            state.token = null;

            // Clear
            localStorage.removeItem("adminToken");
            localStorage.removeItem("adminData");
        },
    },
});

export const { setAdmin, logoutAdmin } = AdminSlice.actions;
export default AdminSlice.reducer;