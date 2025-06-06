import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { LocationServices } from '../location/location.services';
import { RestaurantsServices } from './restaurants.services';
import { RestaurantHoursServices } from '../restaurant-hour/restauranthour.services';

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
  appversion: '',
};

export const getRestaurantsList = createAsyncThunk(
  'restaurant/getRestaurantsList',
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
    return response;
  }
);

export const updaterestaurantsdetail = createAsyncThunk(
  'restaurant/updaterestaurantsdetail',
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
    return response ? response[0] : null;
  }
);


export const restaurantAllLocation = createAsyncThunk(
  'restaurant/restaurantAllLocation',
  async (restaurantId: number) => {
    const response = await LocationServices.getAllLoaction(restaurantId);
    return response;
  }
);

export const restaurantstiming = createAsyncThunk(
  'restaurant/restaurantstiming',
  async ({ locationId, restaurantId }: { locationId: number; restaurantId: number }) => {
    const response = await RestaurantHoursServices.getRestaurantHourList(locationId, restaurantId);
    return response;
  }
);

export const getHomepageBannerDetails = createAsyncThunk(
  'restaurant/getHomepageBannerDetails',
  async ({ frompage, restaurantId, locationId }: { frompage: string; restaurantId: number; locationId: number }) => {
    const response = await RestaurantsServices.getHomepageBannerDetails(frompage, restaurantId, locationId);
    return response;
  }
);

const restaurantSlice = createSlice({
  name: 'restaurant',
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
    builder.addCase(getRestaurantsList.fulfilled, (state, action: PayloadAction<any[]>) => {
      state.restaurantsList = action.payload;
    });
    builder.addCase(updaterestaurantsdetail.fulfilled, (state, action: PayloadAction<any>) => {
      state.restaurantdetail = action.payload;
    });
    builder.addCase(restaurantAllLocation.fulfilled, (state, action: PayloadAction<any[]>) => {
      state.restaurantslocationlistwithtime = action.payload;
    });
    builder.addCase(restaurantstiming.fulfilled, (state, action: PayloadAction<any[]>) => {
      state.restaurantstiminglist = action.payload;
    });
    builder.addCase(getHomepageBannerDetails.fulfilled, (state, action: PayloadAction<any[]>) => {
      state.bannerDetails = action.payload;
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


// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { LocationServices } from "../location/location.services";
// import { RestaurantHoursServices } from "../restaurant-hour/restauranthour.services";
// import { RestaurantsServices } from "./restaurants.services";

// interface RestaurantDetail {
//   id: number;
//   name: string;
//   defaultLocation?: {
//     displaylistview?: string;
//   }
//   isSchoolProgramEnabled?: boolean;
// }

// const initialState = {
//   restaurantsList: [],
//   restaurantsdetail: null,
//   leftmenutoggle: false,
//   restaurantslocationlist: [],
//   restaurantslocationlistwithtime: [],
//   restaurantstiminglist: [],
//   ischangeurl: false,
//   bannerDetails: [],
//   appversion: "",
// };

// //Async thunks for API calls
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

// export const getHomepageBannerDetails = createAsyncThunk(
//   "restaurants/getHomepageBannerDetails",
//   async (params: {
//     frompage: string;
//     restaurantId: number;
//     locationId: number;
//   }) => {
//     return await RestaurantsServices.getHomepageBannerDetails(
//       params.frompage,
//       params.restaurantId,
//       params.locationId
//     );
//   }
// );

// export const restaurantAllLocation = createAsyncThunk(
//   "restaurants/restaurantAllLocation",
//   async (restaurantId: number) => {
//     return await LocationServices.getAllLoaction(restaurantId);
//   }
// );

// export const restaurantstiming = createAsyncThunk(
//   "restaurants/restaurantstiming",
//   async (params: { locationId: number; restaurantId: number }) => {
//     return await RestaurantHoursServices.getRestaurantHourList(
//       params.locationId,
//       params.restaurantId
//     );
//   }
// );

// const restaurantsSlice = createSlice({
//   name: "restaurants",
//   initialState,
//   reducers: {
//     // setRestaurantDetail(state, action: PayloadAction<any>) {
//     restaurantsdetail(state, action: any) {
//       state.restaurantsdetail = action.payload;
//     },
//     updateRestaurantDetail(state, action: PayloadAction<any>) {
//       state.restaurantsdetail = action.payload;
//     },
//     leftMenuToggle(state, action: PayloadAction<boolean>) {
//       state.leftmenutoggle = action.payload;
//     },
//     changeUrl(state, action: PayloadAction<boolean>) {
//       state.ischangeurl = action.payload;
//     },
//     restaurantsLocation(state, action) {
//       state.restaurantslocationlist = action.payload;
//     },
//     resetRestaurant(state) {
//       state.restaurantsList = [];
//       state.restaurantsdetail = null;
//       state.leftmenutoggle = false;
//       state.restaurantslocationlist = [];
//       state.restaurantstiminglist = [];
//     },
//     resetBannerDetails(state) {
//       state.bannerDetails = [];
//     },
//     displayViewUpdate(state, action: any) {
//       if (state.restaurantsdetail) {
//         state.restaurantsdetail = action.payload;
//       }
//     },
//     setAppVersion(state, action: PayloadAction<string>) {
//       state.appversion = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getRestaurantsList.fulfilled, (state: any, action: any) => {
//         state.restaurantsList = action.payload;
//       })
//       .addCase(
//         getHomepageBannerDetails.fulfilled,
//         (state: any, action: any) => {
//           state.bannerDetails = action.payload;
//         }
//       )
//       .addCase(restaurantAllLocation.fulfilled, (state: any, action: any) => {
//         state.restaurantslocationlistwithtime = action.payload;
//       })
//       .addCase(restaurantstiming.fulfilled, (state: any, action: any) => {
//         state.restaurantstiminglist = action.payload;
//       });
//   },
// });

// export const {
//   restaurantsdetail,
//   updateRestaurantDetail,
//   restaurantsLocation,
//   leftMenuToggle,
//   changeUrl,
//   resetRestaurant,
//   resetBannerDetails,
//   displayViewUpdate,
//   setAppVersion,
// } = restaurantsSlice.actions;

// export default restaurantsSlice.reducer;
