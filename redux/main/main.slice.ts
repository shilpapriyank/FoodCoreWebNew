import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { MainServices } from "./main.services";
import {
  getAllCategoryMenuItems,
  getCategoryItemList,
  selectedCategory,
} from "../category/category.slice"; // Ensure these are converted slices
import { MainTypes } from "./main.type";
import { GetThemeDetails } from "@/components/common/utility";
import {
  DeliveryTimeSlot,
  MainCategory,
  RestaurantWindowTime,
} from "@/types/mainservice-types/mainservice.type";
import { RootState } from "../store";
import { GetSelectedRestaurantTime } from "@/types/restaurant-types/restaurant.type";

interface MainState {
  maincategoryList: MainCategory[];
  promotioncategoryList: MainCategory[];
  deliverypickuppopup: boolean;
  ischangelocation: boolean;
  restaurantWindowTime: RestaurantWindowTime[] | null;
  // restaurantWindowTime?: {
  //   OrdDeliveryClosingTime: DeliveryTimeSlot[];
  //   OrdDeliveryClosingTimeV1: DeliveryTimeSlot[];
  //   OrdDeliveryOpeningTime: DeliveryTimeSlot[];
  //   OrdDeliveryOpeningTimeV1: DeliveryTimeSlot[];
  //   TakeoutDeliveryClosingTime: DeliveryTimeSlot[];
  //   TakeoutDeliveryClosingTimeV1: DeliveryTimeSlot[];
  //   TakeoutDeliveryOpeningTime: DeliveryTimeSlot[];
  //   TakeoutDeliveryOpeningTimeV1: DeliveryTimeSlot[];
  //   deliveryClosingWindowTime: string | null;
  //   deliveryOpeningWindowTime: string | null;
  //   deliveryTime: string[];
  //   pickupTime: string[];
  //   isDeliveryClosed: boolean;
  //   isPickupClosed: boolean;
  // };
}

const initialState: MainState = {
  maincategoryList: [],
  promotioncategoryList: [],
  deliverypickuppopup: true,
  ischangelocation: false,
  restaurantWindowTime: null,
  // restaurantWindowTime: {
  //   OrdDeliveryClosingTime: [],
  //   OrdDeliveryClosingTimeV1: [],
  //   OrdDeliveryOpeningTime: [],
  //   OrdDeliveryOpeningTimeV1: [],
  //   TakeoutDeliveryClosingTime: [],
  //   TakeoutDeliveryClosingTimeV1: [],
  //   TakeoutDeliveryOpeningTime: [],
  //   TakeoutDeliveryOpeningTimeV1: [],
  //   deliveryClosingWindowTime: "",
  //   deliveryOpeningWindowTime: "",
  //   deliveryTime: [],
  //   pickupTime: [],
  //   isDeliveryClosed: false,
  //   isPickupClosed: false,
  // },
};

export const getMenuCategoryList = createAsyncThunk(
  MainTypes.GET_MENU_CATEGORY_DATA,
  async (
    { restaurantId, locationId }: { restaurantId: number; locationId: number },
    { dispatch }
  ) => {
    const response = await MainServices.getMenuCategoryList(
      restaurantId,
      locationId
    );
    if (response) {
      // dispatch({
      //   type: MainTypes.GET_MENU_CATEGORY_DATA,
      //   payload: response,
      // });
      dispatch(setMainCategoryList(response as MainCategory[]));

      return response;
    }
    return [];
  }
);

export const getSelectedRestaurantTime = createAsyncThunk(
  MainTypes.GET_SELECTED_RESTAURANTTIME,
  async (
    { restaurantId, locationId }: { restaurantId: number; locationId: number },
    { dispatch }
  ) => {
    const response = await MainServices.getSelectedRestaurantWindowTime(
      restaurantId,
      locationId
    );
    if (response) {
      // dispatch({
      //   type: MainTypes.GET_MENU_CATEGORY_DATA,
      //   payload: response,
      // });
      //dispatch(setMainCategoryList(response as RestaurantWindowTime));

      return response as RestaurantWindowTime[];
    }
    return [];
  }
);

export const refreshCategoryList = createAsyncThunk(
  "main/refreshCategoryList",
  async (
    {
      newselectedRestaurant,
      customerId,
    }: { newselectedRestaurant: any; customerId: number },
    { dispatch }
  ) => {
    const selectedTheme = GetThemeDetails(newselectedRestaurant.themetype);

    if (selectedTheme.url === "nt") {
      dispatch(
        getAllCategoryMenuItems({
          restaurantId: newselectedRestaurant.restaurantId,
          locationId: newselectedRestaurant.defaultlocationId,
          customerId,
          categories: "",
        }) as any
      );
    } else {
      let catresponse;
      await MainServices.getMenuCategoryList(
        newselectedRestaurant.restaurantId,
        newselectedRestaurant.defaultlocationId
      ).then((catresponsedata) => {
        catresponse = catresponsedata;
        if (
          catresponse &&
          catresponse !== null &&
          catresponse !== undefined &&
          catresponse.length > 0
        ) {
          let categoryresponse = catresponse;
          // dispatch({
          //   type: MainTypes.GET_MENU_CATEGORY_DATA,
          //   payload: categoryresponse,
          // });
          dispatch(mainSlice.actions.setMainCategoryList(categoryresponse));

          const firstCategory = { ...catresponse[0], catSelected: true };
          dispatch(selectedCategory(firstCategory));
          dispatch(
            getCategoryItemList({
              restaurantId: newselectedRestaurant.restaurantId,
              categories: String(firstCategory.catId),
              customerId,
              locationId: newselectedRestaurant.defaultlocationId,
            })
          );

          const promotioncategories = catresponse.find(
            (x) => x.catName === "PROMOTION"
          );
          let promotionCatId: string = "0";
          if (promotioncategories) {
            promotionCatId = String(promotioncategories.catId);
            MainServices.getPromotionCategoryList(
              newselectedRestaurant.restaurantId,
              promotionCatId,
              customerId,
              newselectedRestaurant.defaultlocationId
            ).then((promocatresponse) => {
              if (promocatresponse && promocatresponse != null) {
                dispatch(
                  mainSlice.actions.setPromotionCategoryList(promocatresponse)
                );
              }
            });
          }
        } else {
          dispatch(mainSlice.actions.updateMenuCategoryData([]));
          dispatch(mainSlice.actions.updatePromotionCategoryData([]));
          // dispatch({
          //   type: MainTypes.UPDATE_MENU_CATEGORY_DATA,
          //   payload: [],
          // });
          // dispatch({
          //   type: MainTypes.UPDATE_PROMOTION_CATEGORY_DATA,
          //   payload: [],
          // });
        }
      });
    }
  }
);

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    resetMain(state, action: PayloadAction<boolean>) {
      state.maincategoryList = action.payload ? [] : state.maincategoryList;
      state.promotioncategoryList = [];
      state.deliverypickuppopup = true;
    },
    setDeliveryPickupPopup(state, action: PayloadAction<boolean>) {
      state.deliverypickuppopup = action.payload;
    },
    changeLocationModal(state, action: PayloadAction<boolean>) {
      state.ischangelocation = action.payload;
    },
    setMainCategoryList(state, action: PayloadAction<MainCategory[]>) {
      state.maincategoryList = action.payload;
    },
    setPromotionCategoryList(state, action: PayloadAction<MainCategory[]>) {
      state.promotioncategoryList = action.payload;
    },
    getPromotionCategoryData(state, action: PayloadAction<any[]>) {
      state.promotioncategoryList = action.payload;
    },
    updateMenuCategoryData(state, action: PayloadAction<MainCategory[]>) {
      state.maincategoryList = action.payload;
    },
    updatePromotionCategoryData(state, action: PayloadAction<MainCategory[]>) {
      state.promotioncategoryList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMenuCategoryList.fulfilled, (state, action) => {
      state.maincategoryList = action.payload;
    });

    builder.addCase(
      getSelectedRestaurantTime.fulfilled,
      (state, action: PayloadAction<RestaurantWindowTime[]>) => {
        state.restaurantWindowTime = action.payload;
      }
    );

    // builder.addCase(getSelectedRestaurantTime.fulfilled, (state, action) => {
    //   state.restaurantWindowTime = action.payload;
    // });
  },
});

export const {
  resetMain,
  setDeliveryPickupPopup,
  changeLocationModal,
  setMainCategoryList,
  setPromotionCategoryList,
  updateMenuCategoryData,
  updatePromotionCategoryData,
  getPromotionCategoryData,
} = mainSlice.actions;

export default mainSlice.reducer;
