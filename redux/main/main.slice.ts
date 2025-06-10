import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MainServices } from "./main.services";
import {
  // getAllCategoryMenuItems,
  getCategoryItemList,
  selectedCategory,
} from "../category/category.slice";
import { GetThemeDetails } from "@/components/common/utility";
import { MainTypes } from "./main.type";

// Initial state
const MAIN_INITIAL_STATE = {
  maincategoryList: [],
  promotioncategoryList: [],
  deliverypickuppopup: true,
  ischangelocation: false,
  restaurantWindowTime: null,
};

export const getMenuCategoryList = createAsyncThunk(
  "main/getMenuCategoryList",
  async ({ restaurantId, locationId }: any, { rejectWithValue }) => {
    try {
      return await MainServices.getMenuCategoryList(restaurantId, locationId);
    } catch (err) {
      return rejectWithValue([]);
    }
  }
);

export const getSelectedRestaurantTime = createAsyncThunk(
  MainTypes.GET_SELECTED_RESTAURANTTIME,
  async ({ restaurantId, locationId }: any, { rejectWithValue }) => {
    try {
      return await MainServices.getSelectedRestaurantWindowTime(
        restaurantId,
        locationId
      );
    } catch (err) {
      return rejectWithValue(null);
    }
  }
);

export const refreshCategoryList = createAsyncThunk(
  "main/refreshCategoryList",
  async (
    { newselectedRestaurant, customerId }: any,
    { dispatch, rejectWithValue }
  ) => {
    try {
      let selectedTheme = GetThemeDetails(newselectedRestaurant.themetype);

      if (selectedTheme.url === "nt") {
        // dispatch(getAllCategoryMenuItems({
        //   restaurantId: newselectedRestaurant.restaurantId,
        //   locationId: newselectedRestaurant.defaultlocationId,
        //   customerId,
        // }));
      } else {
        const catresponse = await MainServices.getMenuCategoryList(
          newselectedRestaurant.restaurantId,
          newselectedRestaurant.defaultlocationId
        );

        if (catresponse && catresponse.length > 0) {
          dispatch(setMenuCategoryData(catresponse));

          const firstCategory = catresponse[0];
          firstCategory.catSelected = true;
          dispatch(selectedCategory(firstCategory));

          //dispatch(
          // getCategoryItemList({
          //   restaurantId: newselectedRestaurant.restaurantId,
          //   catId: firstCategory.catId,
          //   customerId,
          //   locationId: newselectedRestaurant.defaultlocationId,
          // })
          // );

          const promotioncategories = catresponse.find(
            (x: any) => x.catName === "PROMOTION"
          );

          if (promotioncategories) {
            const promocatresponse =
              await MainServices.getPromotionCategoryList(
                newselectedRestaurant.restaurantId,
                promotioncategories.catId,
                customerId,
                newselectedRestaurant.defaultlocationId
              );

            if (promocatresponse) {
              dispatch(setPromotionCategoryData(promocatresponse));
            }
          }
        } else {
          dispatch(updateMenuCategoryData([]));
          dispatch(updatePromotionCategoryData([]));
        }
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const mainSlice = createSlice({
  name: "main",
  initialState: MAIN_INITIAL_STATE,
  reducers: {
    resetMain: (state, action) => {
      const resetCategory = action.payload;
      state.maincategoryList = resetCategory ? [] : state.maincategoryList;
      state.promotioncategoryList = [];
      state.deliverypickuppopup = true;
    },
    setDeliveryPickupPopup: (state, action) => {
      state.deliverypickuppopup = action.payload;
    },
    changeLocationModal: (state, action) => {
      state.ischangelocation = action.payload;
    },
    updatePromotionCategoryData: (state, action) => {
      state.promotioncategoryList = action.payload;
    },
    updateMenuCategoryData: (state, action) => {
      state.maincategoryList = action.payload;
    },
    setMenuCategoryData: (state, action) => {
      state.maincategoryList = action.payload;
    },
    setPromotionCategoryData: (state, action) => {
      state.promotioncategoryList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMenuCategoryList.fulfilled, (state, action) => {
      state.maincategoryList = action.payload;
    });
    builder.addCase(getSelectedRestaurantTime.fulfilled, (state, action) => {
      state.restaurantWindowTime = action.payload;
    });
  },
});

export const {
  resetMain,
  setDeliveryPickupPopup,
  changeLocationModal,
  updatePromotionCategoryData,
  updateMenuCategoryData,
  setMenuCategoryData,
  setPromotionCategoryData,
} = mainSlice.actions;

export default mainSlice.reducer;
