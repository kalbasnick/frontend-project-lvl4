import { createSlice } from "@reduxjs/toolkit";

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
  }
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;