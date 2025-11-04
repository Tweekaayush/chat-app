import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { clearChatState } from "./chat.slice";
import { AUTH_API, USER_API } from "../constants/constants";

const initialState = {
  loading: "",
  data: {
    user: null,
    usersList: null,
    socket: null,
    onlineUsers: null,
  },
  success: "",
  error: "",
};

export const login = createAsyncThunk(
  "login",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const res = await axios.post(`${AUTH_API}/login`, payload, {
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
      const res = await axios.post(`${AUTH_API}/signup`, payload, {
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
      const res = await axios.post(`${AUTH_API}/logout`, payload, {
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
      const res = await axios.get(`${USER_API}/me`, {
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
      const res = await axios.get(`${USER_API}?search=${payload}`, {
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
      const res = await axios.put(`${USER_API}/${payload.userId}`, payload, {
        withCredentials: true,
      });
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
    clearAuthSuccessAndError: (state, action) => {
      state.success = "";
      state.error = "";
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
    });
    builder.addCase(updateUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data.user = action.payload.user;
      state.success = "User updated";
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
      state.success = "Logged In";
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
      state.success = "Sign Up Successfull";
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
      state.success = "Logged Out";
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

export const { setSocket, setOnlineUsers, clearAuthSuccessAndError } =
  authSlice.actions;

export default authSlice.reducer;
