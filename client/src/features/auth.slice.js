import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { clearChatState } from "./chat.slice";

const BASE_URL = `${import.meta.env.VITE_SERVER_URL}/api/v1`;

const initialState = {
  loading: "",
  data: {
    user: null,
    usersList: null,
    socket: null,
    onlineUsers: null,
  },
  error: "",
};

export const login = createAsyncThunk(
  "login",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, payload, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const signup = createAsyncThunk(
  "signup",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/signup`, payload, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk(
  "logout",
  async (payload, { rejectWithValue, dispatch, getState }) => {
    try {
      const socket = getState().auth.data.socket;
      const res = await axios.post(`${BASE_URL}/auth/logout`, payload, {
        withCredentials: true,
      });
      dispatch(clearChatState());

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const loadUser = createAsyncThunk(
  "loadUser",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const res = await axios.get(`${BASE_URL}/user/me`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getUsers = createAsyncThunk(
  "getUsers",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/user/all`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "updateUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/user/${payload.userId}`,
        payload,
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.data.socket = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.data.onlineUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data.user = action.payload.user;
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data.user = action.payload.user;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;

      state.data.user = action.payload.user;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(signup.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      state.data.user = action.payload.user;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(logout.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading = false;
      state.data = {
        user: null,
        usersList: null,
        socket: null,
        onlineUsers: null,
      };
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.data.usersList = action.payload.users;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setSocket, setOnlineUsers } = authSlice.actions;

export default authSlice.reducer;
