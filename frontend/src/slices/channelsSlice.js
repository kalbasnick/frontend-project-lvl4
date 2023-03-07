import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channels: [],
  currentChannelId: null,
};

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState,
  reducers: {
    setInitialState: (state, { payload }) => {
      state.channels = payload.channels;
      state.currentChannelId = payload.currentChannelId;
    },
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload.id;
    },
    addChannel: (state, { payload }) => {
      state.channels.push(payload);
      state.currentChannelId = payload.id;
    },
    removeChannel: (state, { payload }) => {
      state.channels = state.channels.filter((channel) => channel.id !== payload.channelId);
      state.currentChannelId = state.channels[0].id;
    },
    renameChannel: (state, { payload }) => {
      state.channels = state.channels
        .map((channel) => {
          if (channel.id === payload.channelId) {
            return { ...channel, name: payload.channelName };
          }

          return channel;
      })

    },
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
