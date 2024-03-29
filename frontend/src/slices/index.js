import { configureStore } from "@reduxjs/toolkit";
import channelsReducer from "./channelsSlice.js";
import messagesReducer from "./messagesSlice.js";
import modalsReducer from "./modalsSlice.js";

export default configureStore({
  reducer: {
    channelsInfo: channelsReducer,
    messagesInfo: messagesReducer,
    modal: modalsReducer,
  },
});
