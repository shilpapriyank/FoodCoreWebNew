import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RestaurantsServices } from "./restaurant.service";
import { LocationServices } from "../locations/location.service";
import { RestaurantHoursServices } from "../restaurant-hour/restauranthour.services";

interface RestaurantState {
  restaurantsList: any[];
  restaurantdetail: any;
  leftmenutoggle: boolean;
  restaurantslocationlist: any[];
  restaurantslocationlistwithtime: any[];
  restaurantstiminglist: any[];
  ischangeurl: boolean;
  bannerDetails: any[];
  appversion: string;
}

const initialState: RestaurantState = {
  restaurantsList: [],
  restaurantdetail: null,
  leftmenutoggle: false,
  restaurantslocationlist: [],
  restaurantslocationlistwithtime: [],
  restaurantstiminglist: [],
  ischangeurl: false,
  bannerDetails: [],
  appversion: "",
};

// Async thunks for API calls
export const getRestaurantsList = createAsyncThunk(
  "restaurants/getRestaurantsList",
  async (params: {
    restauranturl?: string;
    locationurl?: string;
    defaultLocationId?: number;
  }) => {
    const res = await RestaurantsServices.getRestaurantsList(
      params.restauranturl,
      params.locationurl,
      params.defaultLocationId
    );
    return res;
  }
);

export const getHomepageBannerDetails = createAsyncThunk(
  "restaurants/getHomepageBannerDetails",
  async (params: {
    frompage: string;
    restaurantId: number;
    locationId: number;
  }) => {
    return await RestaurantsServices.getHomepageBannerDetails(
      params.frompage,
      params.restaurantId,
      params.locationId
    );
  }
);

export const restaurantAllLocation = createAsyncThunk(
  "restaurants/restaurantAllLocation",
  async (restaurantId: number) => {
    return await LocationServices.getAllLoaction(restaurantId);
  }
);

export const restaurantstiming = createAsyncThunk(
  "restaurants/restaurantstiming",
  async (params: { locationId: number; restaurantId: number }) => {
    return await RestaurantHoursServices.getRestaurantHourList(
      params.locationId,
      params.restaurantId
    );
  }
);

const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    setRestaurantDetail(state, action: PayloadAction<any>) {
      state.restaurantdetail = action.payload;
    },
    updateRestaurantDetail(state, action: PayloadAction<any>) {
      state.restaurantdetail = action.payload;
    },
    leftMenuToggle(state, action: PayloadAction<boolean>) {
      state.leftmenutoggle = action.payload;
    },
    changeUrl(state, action: PayloadAction<boolean>) {
      state.ischangeurl = action.payload;
    },
    resetRestaurant(state) {
      state.restaurantsList = [];
      state.restaurantdetail = null;
      state.leftmenutoggle = false;
      state.restaurantslocationlist = [];
      state.restaurantstiminglist = [];
    },
    resetBannerDetails(state) {
      state.bannerDetails = [];
    },
    displayViewUpdate(state, action: PayloadAction<string>) {
      if (state.restaurantdetail?.defaultLocation) {
        state.restaurantdetail.defaultLocation.displaylistview = action.payload;
      }
    },
    setAppVersion(state, action: PayloadAction<string>) {
      state.appversion = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRestaurantsList.fulfilled, (state: any, action: any) => {
        state.restaurantsList = action.payload;
      })
      .addCase(
        getHomepageBannerDetails.fulfilled,
        (state: any, action: any) => {
          state.bannerDetails = action.payload;
        }
      )
      .addCase(restaurantAllLocation.fulfilled, (state: any, action: any) => {
        state.restaurantslocationlistwithtime = action.payload;
      })
      .addCase(restaurantstiming.fulfilled, (state: any, action: any) => {
        state.restaurantstiminglist = action.payload;
      });
  },
});

export const {
  setRestaurantDetail,
  updateRestaurantDetail,
  leftMenuToggle,
  changeUrl,
  resetRestaurant,
  resetBannerDetails,
  displayViewUpdate,
  setAppVersion,
} = restaurantsSlice.actions;

export default restaurantsSlice.reducer;
