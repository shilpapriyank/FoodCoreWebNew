// redux/category/categorySlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CategoryServices } from "./category.services";
import { AppDispatch } from "../store";
import { CategoryTypes } from "./category.types";
import {
  GetAllCategoryMenuItemsArgsTypes,
  GetCategoryItemListArgsTypes,
  GetCategoryItemListPOSArgsTypes,
} from "@/types/category-types/category.services.type";
import { MainTypes } from "../main/main.type";

// Types
export interface CategoryItem {
  catId: string;
  catName: string;
  sortorder: number;
  categoryslug: string;
  isdeliveryavailable: boolean;
  istakeoutavailable: boolean;
  imgurl: string;
}

export interface CategoryState {
  selectedcategorydetail: Record<string, any>;
  categoryitemlist: any[];
  categorylist: CategoryItem[];
}

const initialState: CategoryState = {
  selectedcategorydetail: {},
  categoryitemlist: [],
  categorylist: [],
};

export const getCategoryItemList = createAsyncThunk(
  CategoryTypes.CATEGORY_ITEM_LIST,
  async ({
    restaurantId,
    categories,
    customerId,
    locationId,
  }: {
    restaurantId: number;
    categories: string[];
    customerId: string;
    locationId: string;
  }) => {
    const response = await CategoryServices.getCategoryItemList(
      restaurantId,
      categories,
      customerId,
      locationId
    );
    if (response) {
      console.log("category item list from category slice", response);
      return response;
    }
    return [];
  }
);

export const getCategoryItemListPOS = createAsyncThunk(
  "category/categoryitemlist",
  //CategoryTypes.CATEGORY_ITEM_LIST,
  async (args: GetCategoryItemListPOSArgsTypes) => {
    const response = await CategoryServices.getCategoryItemListPOS(args);
    return response ?? [];
  }
);

// export const selectedCategory = (item) => {   
//     return async (dispatch) => {                                                     
//         dispatch({
//             type: CategoryTypes.SELECTED_CATEGORY_DATA,
//             payload: item                    
//         })                
//     }                            
// }

// export const getAllCategoryMenuItems = createAsyncThunk(
//   CategoryTypes.CATEGORY_ITEM_LIST,
//   async (
//     {
//       restaurantId,
//       locationId,
//       customerId,
//       categories,
//     }: {
//       restaurantId: number;
//       locationId: string;
//       customerId: string;
//       categories: string[];
//     },
//     { dispatch }
//   ) => {
//     const response = await CategoryServices.getAllCategoryMenuItems({
//       restaurantId,
//       locationId,
//       customerId,
//       categories,
//     });
//     if (response) {
//       const categoryList: CategoryItem[] = response.map(
//         ({
//           catId,
//           catName,
//           sortorder,
//           categoryslug,
//           isdeliveryavailable,
//           istakeoutavailable,
//           imgurl,
//         }: CategoryItem) => ({
//           catId,
//           catName,
//           sortorder,
//           categoryslug,
//           isdeliveryavailable,
//           istakeoutavailable,
//           imgurl,
//         })
//       );

//       dispatch({
//         type: MainTypes.GET_MENU_CATEGORY_DATA,
//         payload: categoryList,
//       });

//       // if (
//       //   categoryList.length > 0 &&
//       //   (!selectedCategoryUrl ||
//       //     !categoryList.some((cat) => cat.categoryslug === selectedCategoryUrl))
//       // ) {
//       //
//       // }

//       dispatch(selectedCategory(categoryList[0]));

//       return response;
//     } else {
//       //dispatch({ type: MainTypes.GET_MENU_CATEGORY_DATA, payload: [] });
//       return [];
//     }
//   }
// );

// export const getAllCategoryMenuItems = createAsyncThunk(
//   "category/getAllCategoryMenuItems",
//   async (
//     {
//       restaurantId,
//       locationId,
//       customerId,
//       categories,
//       selectedCategoryUrl,
//     }: {
//       restaurantId: number;
//       locationId: string;
//       customerId: string;
//       categories: string[];
//       selectedCategoryUrl?: string;
//     },
//     { dispatch }
//   ) => {
//     const response = await CategoryServices.getAllCategoryMenuItems({
//       restaurantId,
//       locationId,
//       customerId,
//       categories,
//     });

//     const categoryList = response.map(
//       ({
//         catId,
//         catName,
//         sortorder,
//         categoryslug,
//         isdeliveryavailable,
//         istakeoutavailable,
//         imgurl,
//       }: {
//         catId: number;
//         catName: string;
//         sortorder: number;
//         categoryslug: string;
//         isdeliveryavailable: boolean;
//         istakeoutavailable: boolean;
//         imgurl: string;
//       }) => ({
//         catId,
//         catName,
//         sortorder,
//         categoryslug,
//         isdeliveryavailable,
//         istakeoutavailable,
//         imgurl,
//       })
//     );

//     // Here you can dispatch other slices if needed
//     if (categoryList.length > 0) {
//       if (
//         !selectedCategory ||
//         !categoryList.some((cat: any) => cat.categoryslug === selectedCategory)
//       ) {
//         dispatch(selectedCategoryUrl(categoryList[0]));
//       }
//     }

//     return { response, categoryList };
//   }
// );

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    selectedCategory: (state, action: PayloadAction<any>) => {
      state.selectedcategorydetail = action.payload;
    },
    removeCategoryList: (state) => {
      state.categoryitemlist = [];
    },
    setCategoryList: (state, action: PayloadAction<any[]>) => {
      state.categoryitemlist = action.payload;
    },
    resetCategory: (state) => {
      state.selectedcategorydetail = {};
      state.categoryitemlist = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategoryItemList.fulfilled, (state, action) => {
      //state.categoryitemlist = action.payload;
      state.categorylist = action.payload;
      // state.categoryitemlist = action.payload;
    });
    builder.addCase(getCategoryItemListPOS.fulfilled, (state, action) => {
      state.categoryitemlist = action.payload;
    });
    // builder.addCase(getAllCategoryMenuItems.fulfilled, (state, action) => {
    //   state.categoryitemlist = action.payload.response;
    //   state.categorylist = action.payload.categoryList;
    // });
  },
});

export const {
  selectedCategory,
  removeCategoryList,
  setCategoryList,
  resetCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
