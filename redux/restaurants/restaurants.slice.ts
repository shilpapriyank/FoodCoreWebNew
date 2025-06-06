import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RestaurantsServices } from "./restaurants.services";
import { LocationServices } from "../location/location.services";
import { RestaurantHoursServices } from "../restaurant-hour/restauranthour.services";
import { RestaurantsTypes } from "./restaurants.types";

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

// Async actions
export const getRestaurantsList = createAsyncThunk(
  // "restaurant/getRestaurantsList",
  RestaurantsTypes.GET_RESTAURANTS_DATA,
  async ({
    restauranturl,
    locationurl,
    defaultLocationId,
  }: {
    restauranturl: string;
    locationurl: string;
    defaultLocationId: number;
  }) => {
    return await RestaurantsServices.getRestaurantsList(
      restauranturl,
      locationurl,
      defaultLocationId
    );
  }
);

export const updaterestaurantsdetail = createAsyncThunk(
  //"restaurant/updaterestaurantsdetail",
  RestaurantsTypes.UPDATE_RESTAURANT_DETAIL,
  async ({
    restauranturl,
    defaultLocationId,
  }: {
    restauranturl: string;
    defaultLocationId: number;
  }) => {
    const response = await RestaurantsServices.getRestaurantsList(
      restauranturl,
      "",
      defaultLocationId
    );
    return response?.[0] || null;
  }
);

export const restaurantAllLocation = createAsyncThunk(
  //"restaurant/restaurantAllLocation",
  RestaurantsTypes.RESTAURANT_LOCATION_LIST_WITH_TIME,
  async (restaurantId: number) => {
    return await LocationServices.getAllLoaction(restaurantId);
  }
);

export const restaurantstiming = createAsyncThunk(
  // "restaurant/restaurantstiming",
  RestaurantsTypes.RESTAURANT_TIMING,
  async ({
    locationId,
    restaurantId,
  }: {
    locationId: number;
    restaurantId: number;
  }) => {
    const response = await RestaurantHoursServices.getRestaurantHourList(
      locationId,
      restaurantId
    );
    return response;
  }
);

export const getHomepageBannerDetails = createAsyncThunk(
  //"restaurant/getHomepageBannerDetails",
  RestaurantsTypes.BANNER_DETAILS_LIST,
  async ({
    frompage,
    restaurantId,
    locationId,
  }: {
    frompage: string;
    restaurantId: number;
    locationId: number;
  }) => {
    return await RestaurantsServices.getHomepageBannerDetails(
      frompage,
      restaurantId,
      locationId
    );
  }
);

// Sync helper functions
export const restaurantsLocation = async (restaurantId: number) => {
  return await LocationServices.getLocationInfo(restaurantId);
};

export const restaurantsAllLocation = async (restaurantId: number) => {
  return await LocationServices.getAllLoaction(restaurantId);
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    restaurantsdetail(state, action: PayloadAction<any>) {
      state.restaurantdetail = action.payload;
    },
    leftMenuToggle(state, action: PayloadAction<boolean>) {
      state.leftmenutoggle = action.payload;
    },
    ChangeUrl(state, action: PayloadAction<boolean>) {
      state.ischangeurl = action.payload;
    },
    resetRestaurant(state) {
      return {
        ...initialState,
        restaurantslocationlist: [],
        restaurantstiminglist: [],
      };
    },
    resetBannerDetails(state) {
      state.bannerDetails = [];
    },
    displayViewUpdate(state, action: PayloadAction<boolean>) {
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
      .addCase(getRestaurantsList.fulfilled, (state, action) => {
        state.restaurantsList = action.payload || [];
      })
      .addCase(updaterestaurantsdetail.fulfilled, (state, action) => {
        state.restaurantdetail = action.payload;
      })
      .addCase(restaurantAllLocation.fulfilled, (state, action) => {
        state.restaurantslocationlistwithtime = action.payload || [];
      })
      .addCase(restaurantstiming.fulfilled, (state, action) => {
        state.restaurantstiminglist = action.payload || [];
      })
      .addCase(getHomepageBannerDetails.fulfilled, (state, action) => {
        state.bannerDetails = action.payload || [];
      });
  },
});

export const {
  restaurantsdetail,
  leftMenuToggle,
  ChangeUrl,
  resetRestaurant,
  resetBannerDetails,
  displayViewUpdate,
  setAppVersion,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
