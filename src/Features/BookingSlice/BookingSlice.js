import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  cancelBooking,
  createBooking,
  myBooking,
  singleBooking,
} from "./BookingAPI";
const initialState = {
  isLoading: false,
  myBooking: [],
  singleBooking: {},
};
export const singleBookingFn = createAsyncThunk(
  "booking/singleBookingFn",
  async (data, { rejectWithValue }) => {
    try {
      return await singleBooking(data);
    } catch (err) {
      if (!err.response) throw err;
      return rejectWithValue(err);
    }
  }
);
export const myBookingFn = createAsyncThunk(
  "booking/myBookingFn",
  async (data, { rejectWithValue }) => {
    try {
      return await myBooking(data);
    } catch (err) {
      if (!err.response) throw err;
      return rejectWithValue(err);
    }
  }
);
export const cancelBookingFn = createAsyncThunk(
  "booking/cancelBookingFn",
  async (data, { rejectWithValue }) => {
    try {
      return await cancelBooking(data);
    } catch (err) {
      if (!err.response) throw err;
      return rejectWithValue(err);
    }
  }
);
export const createBookingFn = createAsyncThunk(
  "booking/createBookingFn",
  async (data, { rejectWithValue }) => {
    try {
      return await createBooking(data);
    } catch (err) {
      if (!err.response) throw err;
      return rejectWithValue(err);
    }
  }
);

const BookingSlice = createSlice({
  name: "booking",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(singleBookingFn.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(singleBookingFn.fulfilled, (state, action) => {
        state.singleBooking = action.payload.data.data;
        state.isLoading = false;
      })
      .addCase(singleBookingFn.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(myBookingFn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(myBookingFn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myBooking = action.payload.data.data;
      })
      .addCase(myBookingFn.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createBookingFn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBookingFn.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Booking Successful");
      })
      .addCase(createBookingFn.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(cancelBookingFn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cancelBookingFn.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Booking Canceled Successfully");
      })
      .addCase(cancelBookingFn.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});
export default BookingSlice.reducer;
