import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { MainServices } from "./main.services";
import {
  getAllCategoryMenuItems,
  getCategoryItemList,
  selectedCategory,
} from "../category/category.slice";
import { MainTypes } from "./main.type";
import { GetThemeDetails } from "@/components/common/utility";
import {
  MainCategoryList,
  RestaurantWindowTimeNew,
} from "@/types/mainservice-types/mainservice.type";
import { AppDispatch, RootState } from "../store";

interface MainState {
  maincategoryList: MainCategoryList[];
  promotioncategoryList: MainCategoryList[];
  deliverypickuppopup: boolean;
  ischangelocation: boolean;
  restaurantWindowTime: RestaurantWindowTimeNew[] | null;
}

const initialState: MainState = {
  maincategoryList: [],
  promotioncategoryList: [],
  deliverypickuppopup: true,
  ischangelocation: false,
  restaurantWindowTime: null,
};

export const getMenuCategoryList = createAsyncThunk<
  MainCategoryList[], // Return type
  { restaurantId: number; locationId: number } // Arg type
>(MainTypes.GET_MENU_CATEGORY_DATA, async ({ restaurantId, locationId }) => {
  const response = await MainServices.getMenuCategoryList(
    restaurantId,
    locationId
  );
  return response as MainCategoryList[];
});

export const getSelectedRestaurantTime = createAsyncThunk<
  RestaurantWindowTimeNew[], // Return type
  { restaurantId: number; locationId: number } // Arg type
>(
  MainTypes.GET_SELECTED_RESTAURANTTIME,
  async ({ restaurantId, locationId }) => {
    const response = await MainServices.getSelectedRestaurantWindowTime(
      restaurantId,
      locationId
    );
    return response as RestaurantWindowTimeNew[];
  }
);

// export const refreshCategoryList = createAsyncThunk(
//   "main/refreshCategoryList",
//   async (
//     {
//       newselectedRestaurant,
//       customerId,
//     }: {
//       newselectedRestaurant: any;
//       customerId: number;
//     },
//     { dispatch }
//   ) => {
//     const selectedTheme = GetThemeDetails(newselectedRestaurant.themetype as number);

//     if (selectedTheme?.url === "nt") {
//       dispatch(
//         getAllCategoryMenuItems({
//           restaurantId: newselectedRestaurant.restaurantId,
//           locationId: newselectedRestaurant.defaultlocationId,
//           customerId,
//           categories: "",
//           selectedCategoryUrl: "",
//         })
//       );
//     } else {
//       const response = await MainServices.getMenuCategoryList(
//         newselectedRestaurant.restaurantId,
//         newselectedRestaurant.defaultlocationId
//       );

//       if (response?.length) {
//         dispatch(setMainCategoryList(response));

//         const firstCategory = { ...response[0], catSelected: true };
//         dispatch(selectedCategory(firstCategory));

//         dispatch(
//           getCategoryItemList({
//             restaurantId: newselectedRestaurant.restaurantId,
//             categories: String(firstCategory.catId),
//             customerId,
//             locationId: newselectedRestaurant.defaultlocationId,
//           })
//         );

//         const promotion = response.find((x) => x.catName === "PROMOTION");
//         if (promotion) {
//           const promoResponse = await MainServices.getPromotionCategoryList(
//             newselectedRestaurant.restaurantId,
//             String(promotion.catId),
//             customerId,
//             newselectedRestaurant.defaultlocationId
//           );

//           if (promoResponse) {
//             dispatch(setPromotionCategoryList(promoResponse));
//           }
//         }
//       } else {
//         dispatch(updateMenuCategoryData([]));
//         dispatch(updatePromotionCategoryData([]));
//       }
//     }
//   }
// );

export const refreshCategoryList = createAsyncThunk<
  void, // return type
  { newselectedRestaurant: any; customerId: number }, // argument type
  { dispatch: AppDispatch; state: RootState } // thunkAPI config
>(
  "main/refreshCategoryList",
  async ({ newselectedRestaurant, customerId }, { dispatch }) => {
    const selectedTheme = GetThemeDetails(
      newselectedRestaurant.themetype as number
    );

    if (selectedTheme?.url === "nt") {
      await dispatch(
        getAllCategoryMenuItems({
          restaurantId: newselectedRestaurant.restaurantId,
          locationId: newselectedRestaurant.defaultlocationId,
          customerId,
          categories: "",
          selectedCategoryUrl: "",
        })
      );
    } else {
      const response = await MainServices.getMenuCategoryList(
        newselectedRestaurant.restaurantId,
        newselectedRestaurant.defaultlocationId
      );

      if (response?.length) {
        dispatch(setMainCategoryList(response));

        const firstCategory = { ...response[0], catSelected: true };
        dispatch(selectedCategory(firstCategory));

        await dispatch(
          getCategoryItemList({
            restaurantId: newselectedRestaurant.restaurantId,
            categories: String(firstCategory.catId),
            customerId,
            locationId: newselectedRestaurant.defaultlocationId,
          })
        );

        const promotion = response.find((x) => x.catName === "PROMOTION");
        if (promotion) {
          const promoResponse = await MainServices.getPromotionCategoryList(
            newselectedRestaurant.restaurantId,
            String(promotion.catId),
            customerId,
            newselectedRestaurant.defaultlocationId
          );

          if (promoResponse) {
            dispatch(setPromotionCategoryList(promoResponse));
          }
        }
      } else {
        dispatch(updateMenuCategoryData([]));
        dispatch(updatePromotionCategoryData([]));
      }
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
    setMainCategoryList(state, action: PayloadAction<MainCategoryList[]>) {
      state.maincategoryList = action.payload;
    },
    setPromotionCategoryList(state, action: PayloadAction<MainCategoryList[]>) {
      state.promotioncategoryList = action.payload;
    },
    getPromotionCategoryData(state, action: PayloadAction<any[]>) {
      state.promotioncategoryList = action.payload;
    },
    updateMenuCategoryData(state, action: PayloadAction<MainCategoryList[]>) {
      state.maincategoryList = action.payload;
    },
    updatePromotionCategoryData(
      state,
      action: PayloadAction<MainCategoryList[]>
    ) {
      state.promotioncategoryList = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      getMenuCategoryList.fulfilled,
      (state, action: PayloadAction<MainCategoryList[]>) => {
        state.maincategoryList = action.payload;
      }
    );
    builder.addCase(
      getSelectedRestaurantTime.fulfilled,
      (state, action: PayloadAction<RestaurantWindowTimeNew[]>) => {
        state.restaurantWindowTime = action.payload;
      }
    );
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
