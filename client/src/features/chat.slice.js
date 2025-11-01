import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: {
    chats: [],
    singleChat: {},
    modalOpen: false,
  },
  error: "",
};

export const getChats = createAsyncThunk(
  "getChats",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/chat/all`,
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

export const createChat = createAsyncThunk(
  "createChat",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/chat/create`,
        payload,
        {
          withCredentials: true,
        }
      );

      dispatch(getChats());
      dispatch(setModal(false))

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getChatById = createAsyncThunk(
  "getChatById",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/chat/${payload}`,
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

export const sendMessage = createAsyncThunk(
  "sendMessage",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/chat/message/send`,
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

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    clearSingleChat: (state, action) => {
      state.data.singleChat = {};
    },
    clearChatState: (state, action) => {
      state.data = {
        chats: [],
        singleChat: {},
        modalOpen: false,
      };
    },
    setModal: (state, action) => {
      state.data.modalOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChats.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getChats.fulfilled, (state, action) => {
      state.loading = false;
      state.data.chats = action.payload.chats;
    });
    builder.addCase(getChats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(createChat.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createChat.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createChat.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getChatById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getChatById.fulfilled, (state, action) => {
      state.loading = false;
      state.data.singleChat = action.payload.chat;
      state.data.messages = action.payload.messages;
    });
    builder.addCase(getChatById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(sendMessage.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearChatState, clearSingleChat, setModal } = chatSlice.actions;

export default chatSlice.reducer;
