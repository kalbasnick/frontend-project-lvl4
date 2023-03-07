import { createSlice } from "@reduxjs/toolkit";
import { actions as channelsActions } from './channelsSlice';

const initialState = {
  messages: [],
}

const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
    removeMessage: (state, { payload }) => {
      console.log(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(channelsActions.removeChannel, (state, { payload }) => {
      state.messages = state.messages.filter((message) => message.channelId !== payload.channelId);
    });
  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;