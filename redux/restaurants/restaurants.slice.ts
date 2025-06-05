import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocationServices } from "../location/location.services";
import { RestaurantHoursServices } from "../restaurant-hour/restauranthour.services";
import { RestaurantsServices } from "./restaurants.services";

//import { RestaurantsServices } from "./restaurants.service";

// interface Restaurant {
//   id: number;
//   name: string;
//   url: string;
//   // Add more fields
// }

// interface RestaurantDetail {
//   id: number;
//   name: string;
//   defaultLocation?: {
//     displaylistview?: string;
//     // Add more fields
//   };
// }
interface RestaurantDetail {
  id: number;
  name: string;
  defaultLocation?: {
    displaylistview?: string;
  }
   isSchoolProgramEnabled?: boolean;
}

// interface BannerDetail {
//   image: string;
//   link: string;
// }

// interface RestaurantState {
//   //restaurantsList: any[];
//   restaurantsList: Restaurant[];
//   restaurantsdetail: RestaurantDetail | null;
//   leftmenutoggle: boolean;
//   restaurantslocationlist: any[];
//   restaurantslocationlistwithtime: any[];
//   restaurantstiminglist: any[];
//   ischangeurl: boolean;
//   //bannerDetails: any[];
//   bannerDetails: BannerDetail[];
//   appversion: string;
// }

const initialState = {
  restaurantsList: [],
  restaurantsdetail: null,
  leftmenutoggle: false,
  restaurantslocationlist: [],
  restaurantslocationlistwithtime: [],
  restaurantstiminglist: [],
  ischangeurl: false,
  bannerDetails: [],
  appversion: "",
};

//Async thunks for API calls
export const getRestaurantsList = createAsyncThunk(
  "restaurants/getRestaurantsList",
  async (params: {
    restauranturl?: string;
    locationurl?: string | undefined;
    defaultLocationId?: number;
  }) => {
    const res = await RestaurantsServices.getRestaurantsList(
      params.restauranturl ?? "",
      params.locationurl ?? "",
      params.defaultLocationId ?? 0
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
    // setRestaurantDetail(state, action: PayloadAction<any>) {
    restaurantsdetail(state, action: any) {
      state.restaurantsdetail = action.payload;
    },
    updateRestaurantDetail(state, action: PayloadAction<any>) {
      state.restaurantsdetail = action.payload;
    },
    leftMenuToggle(state, action: PayloadAction<boolean>) {
      state.leftmenutoggle = action.payload;
    },
    changeUrl(state, action: PayloadAction<boolean>) {
      state.ischangeurl = action.payload;
    },
    restaurantsLocation(state, action) {
      state.restaurantslocationlist = action.payload;
    },
    resetRestaurant(state) {
      state.restaurantsList = [];
      state.restaurantsdetail = null;
      state.leftmenutoggle = false;
      state.restaurantslocationlist = [];
      state.restaurantstiminglist = [];
    },
    resetBannerDetails(state) {
      state.bannerDetails = [];
    },
    displayViewUpdate(state, action: any) {
      if (state.restaurantsdetail) {
        state.restaurantsdetail = action.payload;
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
  restaurantsdetail,
  updateRestaurantDetail,
  restaurantsLocation,
  leftMenuToggle,
  changeUrl,
  resetRestaurant,
  resetBannerDetails,
  displayViewUpdate,
  setAppVersion,
} = restaurantsSlice.actions;

export default restaurantsSlice.reducer;
