import { configureStore } from '@reduxjs/toolkit' 
import { setupListeners } from '@reduxjs/toolkit/query' 
import { UserSlice } from './slice/User.slice'
import AdminSlice from "./slice/Admin.slice";


export const store = configureStore({
  reducer: { 
    [UserSlice.name]:UserSlice.reducer,
    admin: AdminSlice,
  }, 
  middleware: (getDefaultMiddleware) =>getDefaultMiddleware() 
})
 
setupListeners(store.dispatch)

