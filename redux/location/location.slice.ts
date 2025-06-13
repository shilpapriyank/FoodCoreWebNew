// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { LocationServices } from "./location.services";
// import { RootState } from "../store";

// export interface LocationState {
//   location: any[];
// }

// const initialState: LocationState = {
//   location: [],
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocationServices } from "./location.services";
import { RootState } from "../store";

interface LocationState {
  location: any[];
}

const initialState: LocationState = {
  location: [],
};

// Thunk to get locations
export const getLocations = createAsyncThunk(
  "location/getAll",
  async ({ restaurantId }: { restaurantId: number }, { rejectWithValue }) => {
    try {
      const response = await LocationServices.getLocationInfo(restaurantId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    resetLocations: (state) => {
      state.location = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getLocations.fulfilled,
      (state, action: PayloadAction<any[]>) => {
        state.location = action.payload;
      }
    );
  },
});

// Export actions
export const { resetLocations } = locationSlice.actions;

// Export reducer
export default locationSlice.reducer;

// Selector (optional, for use in components)
//export const selectLocation = (state: RootState) => state.location.location;
