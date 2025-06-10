// redux/category/categorySlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CategoryServices } from "./category.services";
import { AppDispatch } from "../store";
import { MainTypes } from "../main/main.type";
import { CategoryTypes } from "./category.types";
import { GetAllCategoryMenuItemsArgsTypes, GetCategoryItemListArgsTypes, GetCategoryItemListPOSArgsTypes } from "@/types/category-types/category.services.type";

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
  async (args: GetCategoryItemListArgsTypes) => {
    const response = await CategoryServices.getCategoryItemList(args);
    if (response) {
      return response;
    }
    return [];
  }
);

export const getCategoryItemListPOS = createAsyncThunk(
   CategoryTypes.CATEGORY_ITEM_LIST,
  async (args: GetCategoryItemListPOSArgsTypes) => {
    const response = await CategoryServices.getCategoryItemListPOS(args);
    return response ?? [];
  }
);

// export const getAllCategoryMenuItems = createAsyncThunk(
//   CategoryTypes.CATEGORY_ITEM_LIST,
//   async (args: GetAllCategoryMenuItemsArgsTypes) => {
//     const response = await CategoryServices.getAllCategoryMenuItems(args);
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

//       if (
//         categoryList.length > 0 &&
//         (!selectedCategoryUrl ||
//           !categoryList.some((cat) => cat.categoryslug === selectedCategoryUrl))
//       ) {
//         dispatch(selectedCategory(categoryList[0]));
//       }

//       return response;
//     } else {
//       dispatch({ type: MainTypes.GET_MENU_CATEGORY_DATA, payload: [] });
//       return [];
//     }
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
    });
    // builder.addCase(getCategoryItemListPOS.fulfilled, (state, action) => {
    //   state.categoryitemlist = action.payload;
    // });
    // builder.addCase(getAllCategoryMenuItems.fulfilled, (state, action) => {
    //   state.categoryitemlist = action.payload;
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
