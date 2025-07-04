// store/features/favorite/favoriteSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { FavouritesServices } from "./favourites.services";

// Define the type for a single favorite item (customize based on actual shape)
export interface FavoriteItem {
  menuitemId: number;
  name: string;
  // Add more fields based on your API response
}

// State type
interface FavoriteState {
  favouritesitemlist: FavoriteItem[];
}

// Initial state
const initialState: FavoriteState = {
  favouritesitemlist: [],
};

// Async thunk: get favorites list
export const getFavoritesList = createAsyncThunk(
  "favorites/getFavoritesList",
  async (
    {
      restaurantId,
      customerId,
      locationId,
    }: { restaurantId: number; customerId: number; locationId: number },
    thunkAPI
  ) => {
    try {
      const response = await FavouritesServices.getFavouritesList(
        restaurantId,
        customerId,
        locationId
      );
      return response as FavoriteItem[];
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Failed to fetch favorites.");
    }
  }
);

// Optional async thunk for resetting
export const resetFavorites = createAsyncThunk(
  "favorites/resetFavorites",
  async () => {
    return []; // reset to empty
  }
);

// Create slice
const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    // Add local sync reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getFavoritesList.fulfilled,
        (state, action: PayloadAction<FavoriteItem[]>) => {
          state.favouritesitemlist = action.payload;
        }
      )
      .addCase(resetFavorites.fulfilled, (state) => {
        state.favouritesitemlist = [];
      });
  },
});

export default favoriteSlice.reducer;
