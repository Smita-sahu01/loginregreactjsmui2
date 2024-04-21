import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userAuthApi } from '../services/userAuthApi';
import authReducer from '../features/authSlice'; // Ensure this path is correct

export const store = configureStore({
 reducer: {
    auth: authReducer, // This is where the auth slice is added
    [userAuthApi.reducerPath]: userAuthApi.reducer,
 },
 middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthApi.middleware),
});

setupListeners(store.dispatch);