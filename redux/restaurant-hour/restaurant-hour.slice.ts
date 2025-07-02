// store/slices/timming.slice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RestaurantHoursServices } from './restauranthour.services';

 interface RestaurantTiming {
  day: string;
  open: string;
  close: string;
  isClosed: boolean;
}

 interface TimmingState {
  timming: RestaurantTiming[];
}
const initialState: TimmingState = {
  timming: [],
};

// Thunk to get today's timing
export const getTodayTimming = createAsyncThunk<
  RestaurantTiming[], // return type
  { restaurantId: number; locationId: number }
>('timming/getTodayTimming', async ({ restaurantId, locationId }) => {
  const response = await RestaurantHoursServices.getRestaurantTodayTimming(restaurantId, locationId);
  return response ?? [];
});

const timmingSlice = createSlice({
  name: 'timming',
  initialState,
  reducers: {
    resetRestaurantTiming(state) {
      state.timming = [];
    },
    addTodayTime(state, action: PayloadAction<RestaurantTiming[]>) {
      state.timming = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTodayTimming.fulfilled, (state, action) => {
      state.timming = action.payload;
    });
  }
});

export const { resetRestaurantTiming, addTodayTime } = timmingSlice.actions;
export default timmingSlice.reducer;
