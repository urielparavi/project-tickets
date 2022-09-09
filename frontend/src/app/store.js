import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import presentReducer from '../features/presents/presentSlice';
import noteReducer from '../features/notes/noteSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    presents: presentReducer,
    notes: noteReducer,
  },
});
