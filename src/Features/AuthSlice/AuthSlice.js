import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, register } from "./AuthAPI";
import { toast } from "react-toastify";
const initialState = {
  isLoading: false,
  isLoggedIn: false,
  currentUser: {},
};

export const loginFn = createAsyncThunk(
  "auth/loginFn",
  async (data, { rejectWithValue }) => {
    try {
      return await login(data);
    } catch (err) {
      if (!err.response) throw err;
      return rejectWithValue(err);
    }
  }
);

export const registerFn = createAsyncThunk(
  "auth/registerFn",
  async (data, { rejectWithValue }) => {
    try {
      return await register(data);
    } catch (err) {
      if (!err.response) throw err;
      return rejectWithValue(err);
    }
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = {};
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginFn.pending, (state, action) => {
        state.isLoading = true;
        state.isLoggedIn = false;
        state.currentUser = "";
      })
      .addCase(loginFn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.currentUser = action.payload.data;
        toast.success("Login Successful");
      })
      .addCase(loginFn.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.currentUser = "";
        toast.error("Login Unsuccessful");
      })
      .addCase(registerFn.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerFn.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("User Registered Successfully");
      })
      .addCase(registerFn.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;
