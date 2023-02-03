
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { optionsSlice } from './options';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    options: optionsSlice.reducer
  },
});