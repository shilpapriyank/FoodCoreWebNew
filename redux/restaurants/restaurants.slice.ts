import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocationServices } from "../location/location.services";
import { RestaurantHoursServices } from "../restaurant-hour/restauranthour.services";
import { RestaurantsServices } from "./restaurants.services";

//import { RestaurantsServices } from "./restaurants.service";

interface Restaurant {
  id: number;
  name: string;
  url: string;
  // Add more fields
}

interface RestaurantDetail {
  id: number;
  name: string;
  defaultLocation?: {
    displaylistview?: string;
  }
   isSchoolProgramEnabled?: boolean;
}

interface BannerDetail {
  image: string;
  link: string;
}

interface RestaurantState {
  //restaurantsList: any[];
  restaurantsList: Restaurant[];
  // restaurantdetail: any;
  restaurantdetail: RestaurantDetail | null;
  leftmenutoggle: boolean;
  restaurantslocationlist: any[];
  restaurantslocationlistwithtime: any[];
  restaurantstiminglist: any[];
  ischangeurl: boolean;
  //bannerDetails: any[];
  bannerDetails: BannerDetail[];
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
// export const getRestaurantsList = createAsyncThunk(
//   "restaurants/getRestaurantsList",
//   async (params: {
//     restauranturl?: string;
//     locationurl?: string | undefined;
//     defaultLocationId?: number;
//   }) => {
//     const res = await RestaurantsServices.getRestaurantsList(
//       params.restauranturl ?? "",
//       params.locationurl ?? "",
//       params.defaultLocationId ?? 0
//     );
//     return res;
//   }
// );
export const getRestaurantsList = createAsyncThunk<
  Restaurant[],
  {
    restauranturl?: string;
    locationurl?: string;
    defaultLocationId?: number;
  }
>("restaurants/getRestaurantsList", async (params) => {
  console.log("Calling getRestaurantsList with params:", params);
  const res = await RestaurantsServices.getRestaurantsList(
    params.restauranturl ?? "",
    params.locationurl ?? "",
    params.defaultLocationId ?? 0
  );
  console.log("Response:", res);
  return res;
});

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
    setRestaurantDetail(state, action: PayloadAction<RestaurantDetail | null>) {
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
