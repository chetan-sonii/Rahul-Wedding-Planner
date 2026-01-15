import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slice/User.slice"; // Ensure path is correct

const store = configureStore({
    reducer: {
        // The key here MUST match what you use in useSelector
        UserSlice: UserSlice,
    },
});

export default store;