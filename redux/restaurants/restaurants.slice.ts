import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { LocationServices } from "../location/location.services";
import { RestaurantsServices } from "./restaurants.services";
import { RestaurantHoursServices } from "../restaurant-hour/restauranthour.services";
import { RestaurantsTypes } from "./restaurants.types";

export interface RestaurantState {
  restaurantsList: any[];
  restaurantdetail: any | null;
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
    const response = await RestaurantsServices.getRestaurantsList(
      restauranturl,
      locationurl,
      defaultLocationId
    );
    console.log("restaurantlist response  from slice", response);
    return response;
  }
);

export const updaterestaurantsdetail = createAsyncThunk(
  //"restaurant/updaterestaurantsdetail",
  RestaurantsTypes.UPDATE_RESTAURANT_DETAIL,
  async ({
    restauranturl,
    defaultLocationId,
    locationurl,
  }: {
    restauranturl: string;
    locationurl: string;
    defaultLocationId: number;
  }) => {
    const response = await RestaurantsServices.getRestaurantsList(
      restauranturl,
      locationurl,
      defaultLocationId
    );
    return response ? response[0] : null;
  }
);

export const restaurantAllLocation = createAsyncThunk(
  //"restaurant/restaurantAllLocation",
  RestaurantsTypes.RESTAURANT_LOCATION_LIST_WITH_TIME,
  async (restaurantId: number) => {
    const response = await LocationServices.getAllLoaction(restaurantId);
    return response;
  }
);

// Sync helper functions
export const restaurantsLocation = async (restaurantId: number) => {
  return await LocationServices.getLocationInfo(restaurantId);
};

export const restaurantsAllLocation = async (restaurantId: number) => {
  return await LocationServices.getAllLoaction(restaurantId);
};

export const restaurantstiming = createAsyncThunk(
  "restaurant/restaurantstiming",
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
  "restaurant/getHomepageBannerDetails",
  async ({
    frompage,
    restaurantId,
    locationId,
  }: {
    frompage: string;
    restaurantId: number;
    locationId: number;
  }) => {
    const response = await RestaurantsServices.getHomepageBannerDetails(
      frompage,
      restaurantId,
      locationId
    );
    return response;
  }
);

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    restaurantsdetail: (state, action: PayloadAction<any>) => {
      state.restaurantdetail = action.payload;
    },
    leftMenuToggle: (state, action: PayloadAction<boolean>) => {
      state.leftmenutoggle = action.payload;
    },
    ChangeUrl: (state, action: PayloadAction<boolean>) => {
      state.ischangeurl = action.payload;
    },
    resetRestaurant: (state) => {
      state.restaurantsList = [];
      state.restaurantdetail = null;
      state.leftmenutoggle = false;
      state.restaurantslocationlist = [];
      state.restaurantstiminglist = [];
    },
    resetBannerDetails: (state) => {
      state.bannerDetails = [];
    },
    displayViewUpdate: (state, action: PayloadAction<string>) => {
      if (state.restaurantdetail) {
        state.restaurantdetail = {
          ...state.restaurantdetail,
          defaultLocation: {
            ...state.restaurantdetail.defaultLocation,
            displaylistview: action.payload,
          },
        };
      }
    },
    setAppVersion: (state, action: PayloadAction<string>) => {
      state.appversion = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getRestaurantsList.fulfilled,
      (state, action: PayloadAction<any[]>) => {
        state.restaurantsList = action.payload;
      }
    );
    builder.addCase(
      updaterestaurantsdetail.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.restaurantdetail = action.payload;
      }
    );
    builder.addCase(
      restaurantAllLocation.fulfilled,
      (state, action: PayloadAction<any[]>) => {
        state.restaurantslocationlistwithtime = action.payload;
      }
    );
    builder.addCase(
      restaurantstiming.fulfilled,
      (state, action: PayloadAction<any[]>) => {
        state.restaurantstiminglist = action.payload;
      }
    );
    builder.addCase(
      getHomepageBannerDetails.fulfilled,
      (state, action: PayloadAction<any[]>) => {
        state.bannerDetails = action.payload;
      }
    );
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
