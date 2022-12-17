import { configureStore } from "@reduxjs/toolkit";

import { channelsSlice } from './slices/channels';

export const store = configureStore({
  reducer: channelsSlice.reducer
})
