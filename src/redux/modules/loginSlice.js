import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from '../../shared/Request';
import axios from "axios";

export const __memberLogin = createAsyncThunk(
  'MEMBER_LOGIN',
  async (payload, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data, headers} = await axios.post('http://13.124.142.195/api/members/login', payload, config);
      sessionStorage.setItem('Authorization', headers.authorization)
      sessionStorage.setItem('Refresh-Token', headers['refresh-token'])
      return thunkAPI.fulfillWithValue({...data, ...headers});
      } catch (error) {
        alert(error.response.data.message);
    }
  }
);

export const __memberLogout = createAsyncThunk(
  "MEMBER_LOGOUT",
  async (payload, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem('Authorization'),
          'Refresh-Token': sessionStorage.getItem('Refresh-Token')
        },
      };
      const { data } = await axios.post("http://13.124.142.195/api/auth/members/logout", payload, config);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
  );

const initialState = {
  user: {
    data :{},
    authorization: null,
    refresh_token: null,
    isLoading: false,
    error: null,
  },
};

export const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [__memberLogin.pending]: (state) => {
      state.user.isLoading = true;
    },
    [__memberLogin.fulfilled]: (state, action) => {
      state.user.isLoading = false;
      state.user.data = action.payload.data;
      state.user.authorization = action.payload.authorization;
      state.user.refresh_token = action.payload['refresh-token'];
    },
    [__memberLogin.rejected]: (state, action) => {
      state.user.isLoading = false;
      state.error = action.payload;
    },
    [__memberLogout.pending]: (state) => {
      state.user.isLoading = true;
    },
    [__memberLogout.fulfilled]: (state) => {
      sessionStorage.clear();
      state.user.isLoading = false;
      state.user.data = {};
      state.user.authorization = null;
      state.user.refresh_token = null;
    },
    [__memberLogout.rejected]: (state, action) => {
      state.user.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default loginSlice.reducer;