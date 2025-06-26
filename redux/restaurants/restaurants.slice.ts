import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { LocationServices } from "../location/location.services";
import { RestaurantsServices } from "./restaurants.services";
import { RestaurantHoursServices } from "../restaurant-hour/restauranthour.services";
import { RestaurantsTypes } from "./restaurants.types";
import {
  GetAllRestaurantInfo,
  GetSelectedRestaurantTime,
} from "@/types/restaurant-types/restaurant.type";
import { RootState } from "../store";
import {
  AddressList,
  GetAllLocationInfoNew,
  ParameterByColorList,
  ParameterByTextSizeList,
} from "@/types/location-types/location.type";

type ThunkConfig = {
  state: RootState;
  rejectValue: string;
};

export interface RestaurantState {
  restaurantsList: any;
  restaurantdetail: GetAllRestaurantInfo | null;
  leftmenutoggle: boolean;
  restaurantslocationlist: {
    addressList: AddressList[] | null;
    issupplychainenable: boolean;
    parameterByColorList: ParameterByColorList[] | null;
    parameterByTextSizeList: ParameterByTextSizeList[] | null;
    restaurantId: number;
  };
  restaurantslocationlistwithtime: {
    addressList: AddressList[] | null;
    issupplychainenable: boolean;
    parameterByColorList: ParameterByColorList[] | null;
    parameterByTextSizeList: ParameterByTextSizeList[] | null;
    restaurantId: number;
  };
  restaurantstiminglist: GetSelectedRestaurantTime | null;
  ischangeurl: boolean;
  bannerDetails: any;
  appversion: string;
}

const initialState: RestaurantState = {
  restaurantsList: [],
  restaurantdetail: null,
  leftmenutoggle: false,
  restaurantslocationlist: {
    addressList: [],
    issupplychainenable: false,
    parameterByColorList: [],
    parameterByTextSizeList: [],
    restaurantId: 0,
  },
  restaurantslocationlistwithtime: {
    addressList: [],
    issupplychainenable: false,
    parameterByColorList: [],
    parameterByTextSizeList: [],
    restaurantId: 0,
  },
  restaurantstiminglist: null,
  ischangeurl: false,
  bannerDetails: [],
  appversion: "",
};
// Async actions
export const getRestaurantsList = createAsyncThunk(
  "restaurant/getRestaurantsList",
  //RestaurantsTypes.GET_RESTAURANTS_DATA,
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
    return response as GetAllRestaurantInfo[];
  }
);

export const updaterestaurantsdetail = createAsyncThunk(
  "restaurant/updaterestaurantsdetail",
  //RestaurantsTypes.UPDATE_RESTAURANT_DETAIL,
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

// export const restaurantAllLocation = createAsyncThunk<
//   GetAllLocationInfoNew | null, // ✅ Return type
//   number // ✅ Argument type
// >(
//   RestaurantsTypes.RESTAURANT_LOCATION_LIST_WITH_TIME,
//   async (restaurantId: number) => {
//     const response = await LocationServices.getAllLoaction(restaurantId);
//     return response;
//   }
// );

export const restaurantAllLocation = createAsyncThunk<
  {
    addressList: AddressList[];
    issupplychainenable: boolean;
    parameterByColorList: ParameterByColorList[] | null;
    parameterByTextSizeList: ParameterByTextSizeList[] | null;
    restaurantId: number;
  },
  number,
  ThunkConfig
>(RestaurantsTypes.RESTAURANT_LOCATION_LIST_WITH_TIME, async (restaurantId) => {
  const response = await LocationServices.getAllLoaction(restaurantId);
  return response as GetAllLocationInfoNew;
});

export const restaurantsLocation = async (restaurantId: number) => {
  return await LocationServices.getLocationInfo(restaurantId);
};

export const restaurantsAllLocation = async (restaurantId: number) => {
  return await LocationServices.getAllLoaction(restaurantId);
};

export const restaurantstiming = createAsyncThunk(
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
    restaurantsdetail: (
      state,
      action: PayloadAction<GetAllRestaurantInfo | null>
    ) => {
      state.restaurantdetail = action.payload;
    },
    leftMenuToggle: (state, action: PayloadAction<boolean>) => {
      state.leftmenutoggle = action.payload;
    },
    ChangeUrl: (state, action: PayloadAction<boolean>) => {
      state.ischangeurl = action.payload;
    },
    resetRestaurant: (state) => {
      state.restaurantsList = null;
      state.restaurantdetail = initialState.restaurantdetail;
      state.leftmenutoggle = false;
      state.restaurantslocationlist = initialState.restaurantslocationlist;
      state.restaurantstiminglist = null;
    },
    resetBannerDetails: (state) => {
      state.bannerDetails = [];
    },
    displayViewUpdate: (state, action: PayloadAction<boolean>) => {
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
      (state, action: PayloadAction<any>) => {
        state.restaurantsList = action.payload;
      }
    );
    builder.addCase(
      updaterestaurantsdetail.fulfilled,
      (state, action: PayloadAction<GetAllRestaurantInfo | null>) => {
        state.restaurantdetail = action.payload;
      }
    );
    builder.addCase(
      restaurantAllLocation.fulfilled,
      (
        state,
        action: PayloadAction<{
          addressList: AddressList[];
          issupplychainenable: boolean;
          parameterByColorList: ParameterByColorList[] | null;
          parameterByTextSizeList: ParameterByTextSizeList[] | null;
          restaurantId: number;
        }>
      ) => {
        state.restaurantslocationlistwithtime = action.payload;
      }
    );
    builder.addCase(
      restaurantstiming.fulfilled,
      (state, action: PayloadAction<GetSelectedRestaurantTime | null>) => {
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

// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import { LocationServices } from "../location/location.services";
// import { RestaurantsServices } from "./restaurants.services";
// import { RestaurantHoursServices } from "../restaurant-hour/restauranthour.services";
// import { RestaurantsTypes } from "./restaurants.types";
// import {
//   AddressListItem,
//   ColorParameter,
//   RestaurantDetails,
//   RestaurantsTimingList,
//   TextSizeParameter,
// } from "@/types/restaurant-types/restaurant.type";
// import { RootState } from "../store";

// type ThunkConfig = {
//   state: RootState;
//   rejectValue: string;
// };

// export interface RestaurantState {
//   restaurantsList: any;
//   restaurantdetail: RestaurantDetails | null;
//   leftmenutoggle: boolean;
//   restaurantslocationlist: {
//     addressList: AddressListItem[] | null;
//     issupplychainenable: boolean;
//     parameterByColorList: ColorParameter | null;
//     parameterByTextSizeList: TextSizeParameter | null;
//     restaurantId: number;
//   };
//   restaurantslocationlistwithtime: {
//     addressList: AddressListItem[] | null;
//     issupplychainenable: boolean;
//     parameterByColorList: ColorParameter | null;
//     parameterByTextSizeList: TextSizeParameter | null;
//     restaurantId: number;
//   };
//   restaurantstiminglist: RestaurantsTimingList | null;
//   ischangeurl: boolean;
//   bannerDetails: any;
//   appversion: string;
// }

// const initialState: RestaurantState = {
//   restaurantsList: [],
//   restaurantdetail: null,
//   leftmenutoggle: false,
//   restaurantslocationlist: {
//     addressList: [],
//     issupplychainenable: false,
//     parameterByColorList: null,
//     parameterByTextSizeList: null,
//     restaurantId: 0,
//   },
//   restaurantslocationlistwithtime: {
//     addressList: [],
//     issupplychainenable: false,
//     parameterByColorList: null,
//     parameterByTextSizeList: null,
//     restaurantId: 0,
//   },
//   restaurantstiminglist: null,
//   ischangeurl: false,
//   bannerDetails: [],
//   appversion: "",
// };
// // Async actions
// export const getRestaurantsList = createAsyncThunk(
//   "restaurant/getRestaurantsList",
//   //RestaurantsTypes.GET_RESTAURANTS_DATA,
//   async ({
//     restauranturl,
//     locationurl,
//     defaultLocationId,
//   }: {
//     restauranturl: string;
//     locationurl: string;
//     defaultLocationId: number;
//   }) => {
//     const response = await RestaurantsServices.getRestaurantsList(
//       restauranturl,
//       locationurl,
//       defaultLocationId
//     );
//     return response;
//   }
// );

// // export const updaterestaurantsdetail = createAsyncThunk(
// //   "restaurant/updaterestaurantsdetail",
// //   //RestaurantsTypes.UPDATE_RESTAURANT_DETAIL,
// //   async ({
// //     restauranturl,
// //     defaultLocationId,
// //     locationurl,
// //   }: {
// //     restauranturl: string;
// //     locationurl: string;
// //     defaultLocationId: number;
// //   }) => {
// //     const response = await RestaurantsServices.getRestaurantsList(
// //       restauranturl,
// //       locationurl,
// //       defaultLocationId
// //     );
// //     return response ? response[0] : null;
// //   }
// // );

// export const updaterestaurantsdetail = createAsyncThunk<
//   RestaurantDetails | null,
//   {
//     restauranturl: string;
//     locationurl: string;
//     defaultLocationId: number;
//   },
//   ThunkConfig
// >(
//   "restaurant/updaterestaurantsdetail",
//   async ({ restauranturl, locationurl, defaultLocationId }) => {
//     const response = await RestaurantsServices.getRestaurantsList(
//       restauranturl,
//       locationurl,
//       defaultLocationId
//     );
//     return response ? response[0] : null;
//   }
// );

// // export const restaurantAllLocation = createAsyncThunk(
// //   //"restaurant/restaurantAllLocation",
// //   RestaurantsTypes.RESTAURANT_LOCATION_LIST_WITH_TIME,
// //   async (restaurantId: number) => {
// //     const response = await LocationServices.getAllLoaction(restaurantId);
// //     return response;
// //   }
// // );

// // Sync helper functions

// export const restaurantAllLocation = createAsyncThunk<
//   {
//     addressList: AddressListItem[];
//     issupplychainenable: boolean;
//     parameterByColorList: ColorParameter | null;
//     parameterByTextSizeList: TextSizeParameter | null;
//     restaurantId: number;
//   },
//   number,
//   ThunkConfig
// >(RestaurantsTypes.RESTAURANT_LOCATION_LIST_WITH_TIME, async (restaurantId) => {
//   const response = await LocationServices.getAllLoaction(restaurantId);
//   return response;
// });

// export const restaurantsLocation = async (restaurantId: number) => {
//   return await LocationServices.getLocationInfo(restaurantId);
// };

// export const restaurantsAllLocation = async (restaurantId: number) => {
//   return await LocationServices.getAllLoaction(restaurantId);
// };

// export const restaurantstiming = createAsyncThunk(
//   RestaurantsTypes.RESTAURANT_TIMING,
//   async ({
//     locationId,
//     restaurantId,
//   }: {
//     locationId: number;
//     restaurantId: number;
//   }) => {
//     const response = await RestaurantHoursServices.getRestaurantHourList(
//       locationId,
//       restaurantId
//     );
//     return response;
//   }
// );

// export const getHomepageBannerDetails = createAsyncThunk(
//   "restaurant/getHomepageBannerDetails",
//   async ({
//     frompage,
//     restaurantId,
//     locationId,
//   }: {
//     frompage: string;
//     restaurantId: number;
//     locationId: number;
//   }) => {
//     const response = await RestaurantsServices.getHomepageBannerDetails(
//       frompage,
//       restaurantId,
//       locationId
//     );
//     return response;
//   }
// );

// const restaurantSlice = createSlice({
//   name: "restaurant",
//   initialState,
//   reducers: {
//     restaurantsdetail: (
//       state,
//       action: PayloadAction<RestaurantDetails | null>
//     ) => {
//       state.restaurantdetail = action.payload;
//     },
//     leftMenuToggle: (state, action: PayloadAction<boolean>) => {
//       state.leftmenutoggle = action.payload;
//     },
//     ChangeUrl: (state, action: PayloadAction<boolean>) => {
//       state.ischangeurl = action.payload;
//     },
//     resetRestaurant: (state) => {
//       state.restaurantsList = null;
//       state.restaurantdetail = initialState.restaurantdetail;
//       state.leftmenutoggle = false;
//       state.restaurantslocationlist = initialState.restaurantslocationlist;
//       state.restaurantstiminglist = null;
//     },
//     resetBannerDetails: (state) => {
//       state.bannerDetails = [];
//     },
//     displayViewUpdate: (state, action: PayloadAction<boolean>) => {
//       if (state.restaurantdetail) {
//         state.restaurantdetail = {
//           ...state.restaurantdetail,
//           defaultLocation: {
//             ...state.restaurantdetail.defaultLocation,
//             displaylistview: action.payload,
//           },
//         };
//       }
//     },
//     setAppVersion: (state, action: PayloadAction<string>) => {
//       state.appversion = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(
//       getRestaurantsList.fulfilled,
//       (state, action: PayloadAction<any>) => {
//         state.restaurantsList = action.payload;
//       }
//     );
//     builder.addCase(
//       updaterestaurantsdetail.fulfilled,
//       (state, action: PayloadAction<RestaurantDetails | null>) => {
//         state.restaurantdetail = action.payload;
//       }
//     );
//     builder.addCase(
//       restaurantAllLocation.fulfilled,
//       (
//         state,
//         action: PayloadAction<{
//           addressList: AddressListItem[];
//           issupplychainenable: boolean;
//           parameterByColorList: ColorParameter | null;
//           parameterByTextSizeList: TextSizeParameter | null;
//           restaurantId: number;
//         }>
//       ) => {
//         state.restaurantslocationlistwithtime = action.payload;
//       }
//     );
//     builder.addCase(
//       restaurantstiming.fulfilled,
//       (state, action: PayloadAction<RestaurantsTimingList | null>) => {
//         state.restaurantstiminglist = action.payload;
//       }
//     );
//     builder.addCase(
//       getHomepageBannerDetails.fulfilled,
//       (state, action: PayloadAction<any[]>) => {
//         state.bannerDetails = action.payload;
//       }
//     );
//   },
// });

// export const {
//   restaurantsdetail,
//   leftMenuToggle,
//   ChangeUrl,
//   resetRestaurant,
//   resetBannerDetails,
//   displayViewUpdate,
//   setAppVersion,
// } = restaurantSlice.actions;

// export default restaurantSlice.reducer;
