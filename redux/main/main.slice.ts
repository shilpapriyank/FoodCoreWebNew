import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { MainServices } from "./main.services";
import {
  getAllCategoryMenuItems,
  getCategoryItemList,
  selectedCategory,
} from "../category/category.slice"; // Ensure these are converted slices
import { MainTypes } from "./main.type";
import { RestaurantWindowTime } from "@/components/default/common/dominos/helpers/types/utility-type";
import { GetThemeDetails } from "@/components/common/utility";
import { MainCategory } from "@/types/mainservice-types/mainservice.type";

interface MainState {
  maincategoryList: MainCategory[];
  promotioncategoryList: MainCategory[];
  deliverypickuppopup: boolean;
  ischangelocation: boolean;
  restaurantWindowTime?: RestaurantWindowTime[];
}

const initialState: MainState = {
  maincategoryList: [],
  promotioncategoryList: [],
  deliverypickuppopup: true,
  ischangelocation: false,
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
    {
      restaurantId,
      locationId,
    }: {
      restaurantId: number;
      locationId: number;
    },
    { dispatch }
  ) => {
    const response = await MainServices.getSelectedRestaurantWindowTime(
      restaurantId,
      locationId
    );
    if (response) {
      dispatch(getSelectedRestaurantTime(response as any));
      return response;
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
        })
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

    builder.addCase(getSelectedRestaurantTime.fulfilled, (state, action) => {
      if (action.payload) {
        state.restaurantWindowTime = action.payload;
      }
    });
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

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { MainServices } from "./main.services";
// import {
//   // getAllCategoryMenuItems,
//   getCategoryItemList,
//   selectedCategory,
// } from "../category/category.slice";
// import { GetThemeDetails } from "@/components/common/utility";
// import { MainTypes } from "./main.type";

// // Initial state
// const MAIN_INITIAL_STATE = {
//   maincategoryList: [],
//   promotioncategoryList: [],
//   deliverypickuppopup: true,
//   ischangelocation: false,
//   restaurantWindowTime: null,
// };

// export const getMenuCategoryList = createAsyncThunk(
//   "main/getMenuCategoryList",
//   async ({ restaurantId, locationId }: any, { rejectWithValue }) => {
//     try {
//       return await MainServices.getMenuCategoryList(restaurantId, locationId);
//     } catch (err) {
//       return rejectWithValue([]);
//     }
//   }
// );

// export const getSelectedRestaurantTime = createAsyncThunk(
//   MainTypes.GET_SELECTED_RESTAURANTTIME,
//   async ({ restaurantId, locationId }: any, { rejectWithValue }) => {
//     try {
//       return await MainServices.getSelectedRestaurantWindowTime(
//         restaurantId,
//         locationId
//       );
//     } catch (err) {
//       return rejectWithValue(null);
//     }
//   }
// );

// export const refreshCategoryList = createAsyncThunk(
//   "main/refreshCategoryList",
//   async (
//     { newselectedRestaurant, customerId }: any,
//     { dispatch, rejectWithValue }
//   ) => {
//     try {
//       let selectedTheme = GetThemeDetails(newselectedRestaurant.themetype);

//       if (selectedTheme.url === "nt") {
//         // dispatch(getAllCategoryMenuItems({
//         //   restaurantId: newselectedRestaurant.restaurantId,
//         //   locationId: newselectedRestaurant.defaultlocationId,
//         //   customerId,
//         // }));
//       } else {
//         const catresponse = await MainServices.getMenuCategoryList(
//           newselectedRestaurant.restaurantId,
//           newselectedRestaurant.defaultlocationId
//         );

//         if (catresponse && catresponse.length > 0) {
//           dispatch(setMenuCategoryData(catresponse));

//           const firstCategory = catresponse[0];
//           firstCategory.catSelected = true;
//           dispatch(selectedCategory(firstCategory));

//           //dispatch(
//           // getCategoryItemList({
//           //   restaurantId: newselectedRestaurant.restaurantId,
//           //   catId: firstCategory.catId,
//           //   customerId,
//           //   locationId: newselectedRestaurant.defaultlocationId,
//           // })
//           // );

//           const promotioncategories = catresponse.find(
//             (x: any) => x.catName === "PROMOTION"
//           );

//           if (promotioncategories) {
//             const promocatresponse =
//               await MainServices.getPromotionCategoryList(
//                 newselectedRestaurant.restaurantId,
//                 promotioncategories.catId,
//                 customerId,
//                 newselectedRestaurant.defaultlocationId
//               );

//             if (promocatresponse) {
//               dispatch(setPromotionCategoryData(promocatresponse));
//             }
//           }
//         } else {
//           dispatch(updateMenuCategoryData([]));
//           dispatch(updatePromotionCategoryData([]));
//         }
//       }
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// const mainSlice = createSlice({
//   name: "main",
//   initialState: MAIN_INITIAL_STATE,
//   reducers: {
//     resetMain: (state, action) => {
//       const resetCategory = action.payload;
//       state.maincategoryList = resetCategory ? [] : state.maincategoryList;
//       state.promotioncategoryList = [];
//       state.deliverypickuppopup = true;
//     },
//     setDeliveryPickupPopup: (state, action) => {
//       state.deliverypickuppopup = action.payload;
//     },
//     changeLocationModal: (state, action) => {
//       state.ischangelocation = action.payload;
//     },
//     updatePromotionCategoryData: (state, action) => {
//       state.promotioncategoryList = action.payload;
//     },
//     updateMenuCategoryData: (state, action) => {
//       state.maincategoryList = action.payload;
//     },
//     setMenuCategoryData: (state, action) => {
//       state.maincategoryList = action.payload;
//     },
//     setPromotionCategoryData: (state, action) => {
//       state.promotioncategoryList = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(getMenuCategoryList.fulfilled, (state, action) => {
//       state.maincategoryList = action.payload;
//     });
//     builder.addCase(getSelectedRestaurantTime.fulfilled, (state, action) => {
//       state.restaurantWindowTime = action.payload;
//     });
//   },
// });

// export const {
//   resetMain,
//   setDeliveryPickupPopup,
//   changeLocationModal,
//   updatePromotionCategoryData,
//   updateMenuCategoryData,
//   setMenuCategoryData,
//   setPromotionCategoryData,
// } = mainSlice.actions;

// export default mainSlice.reducer;
