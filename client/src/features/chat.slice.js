import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { CHAT_API } from "../constants/constants";

const initialState = {
  loading: {
    chatsLoading: false,
    singleChatLoading: false,
    messageLoading: false,
  },
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
      const res = await axios.get(`${CHAT_API}/all`, {
        withCredentials: true,
      });
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
      const res = await axios.post(`${CHAT_API}/create`, payload, {
        withCredentials: true,
      });

      dispatch(getChats());
      dispatch(setModal(false));

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
      const res = await axios.get(`${CHAT_API}/${payload}`, {
        withCredentials: true,
      });
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
      const res = await axios.post(`${CHAT_API}/message/send`, payload, {
        withCredentials: true,
      });
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
    addNewMessage: (state, action) => {
      state.data.messages = [action.payload.msg, ...state.data.messages];
    },
    addNewChat: (state, action) => {
      const chats = current(state.data.chats);
      const existingChatIndex = chats.findIndex(
        (c) => c._id === action.payload._id
      );
      console.log(existingChatIndex);
      if (existingChatIndex !== -1) {
        state.data.chats = [
          action.payload,
          ...chats.filter((c) => c._id !== action.payload._id),
        ];
      } else {
        state.data.chats = [action.payload, ...chats];
      }
    },
    updateChatLastMessage: (state, action) => {
      const chats = current(state.data.chats);
      const { chatId, lastMessage } = action.payload;
      const chat = chats.find((c) => c._id === chatId);
      state.data.chats = [
        { ...chat, lastMessage },
        ...chats.filter((c) => c._id !== chatId),
      ];
    },
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
      state.loading.chatsLoading = true;
    });
    builder.addCase(getChats.fulfilled, (state, action) => {
      state.loading.chatsLoading = false;
      state.data.chats = action.payload.chats;
    });
    builder.addCase(getChats.rejected, (state, action) => {
      state.loading.chatsLoading = false;
      state.error = action.payload;
    });
    builder.addCase(createChat.pending, (state, action) => {
      state.loading.chatsLoading = true;
    });
    builder.addCase(createChat.fulfilled, (state, action) => {
      state.loading.chatsLoading = false;
    });
    builder.addCase(createChat.rejected, (state, action) => {
      state.loading.chatsLoading = false;
      state.error = action.payload;
    });
    builder.addCase(getChatById.pending, (state, action) => {
      state.loading.singleChatLoading = true;
    });
    builder.addCase(getChatById.fulfilled, (state, action) => {
      state.loading.singleChatLoading = false;
      state.data.singleChat = action.payload.chat;
      state.data.messages = action.payload.messages;
    });
    builder.addCase(getChatById.rejected, (state, action) => {
      state.loading.singleChatLoading = false;
      state.error = action.payload;
    });
    builder.addCase(sendMessage.pending, (state, action) => {
      state.loading.messageLoading = true;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.loading.messageLoading = false;
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      state.loading.messageLoading = false;
      state.error = action.payload;
    });
  },
});

export const {
  clearChatState,
  clearSingleChat,
  setModal,
  addNewMessage,
  updateChatLastMessage,
  addNewChat,
} = chatSlice.actions;

export default chatSlice.reducer;
