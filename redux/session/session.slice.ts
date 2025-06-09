// src/redux/session/session.slice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SessionState {
  sessionid: string | null;
}

const initialState: SessionState = {
  sessionid: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    createSessionId: (state, action: PayloadAction<string>) => {
      if (action.payload) {
        state.sessionid = action.payload;
      }
    },
    clearSessionId: (state) => {
      state.sessionid = null;
    },
    resetSessionId: (state) => {
      state.sessionid = null;
    },
  },
});

export const {
  createSessionId,
  clearSessionId,
  resetSessionId,
} = sessionSlice.actions;

export default sessionSlice.reducer;
