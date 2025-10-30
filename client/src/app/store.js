import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth.slice";
import chatReducer from "../features/chat.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
