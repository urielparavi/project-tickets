import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import presentService from './presentService';

const initialState = {
  presents: [],
  present: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

// Create new present
export const createPresent = createAsyncThunk(
  'presents/create',
  async (presentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await presentService.createPresent(presentData, token);
    } catch (error) {
      const message = (
        error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message);
    }
  });

// Get user Presents
export const getPresents = createAsyncThunk(
  'presents/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await presentService.getPresents(token);
    } catch (error) {
      const message = (
        error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message);
    }
  });

// Get user present
export const getPresent = createAsyncThunk(
  'presents/get',
  async (presentId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await presentService.getPresent(presentId, token);
    } catch (error) {
      const message = (
        error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message);
    }
  });

// Close present
export const closePresent = createAsyncThunk(
  'presents/close',
  async (presentId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await presentService.closePresent(presentId, token);
    } catch (error) {
      const message = (
        error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message);
    }
  });

export const presentSlice = createSlice({
  name: 'present',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPresent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPresent.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createPresent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPresents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPresents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.presents = action.payload;
      })
      .addCase(getPresents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPresent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPresent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.present = action.payload;
      })
      .addCase(getPresent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(closePresent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.presents.map((present) =>
          present._id === action.payload._id ? (present.status = 'closed') : present
        )
      })
  },
});

export const { reset } = presentSlice.actions;
export default presentSlice.reducer;