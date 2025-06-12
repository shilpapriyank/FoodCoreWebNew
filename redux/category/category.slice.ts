// redux/category/categorySlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CategoryServices } from "./category.services";
import { CategoryTypes } from "./category.types";
import { MainTypes } from "../main/main.type";
import { CategoryItem } from "@/types/category-types/category.services.type";

export interface CategoryState {
  selectedcategorydetail: Record<string, any>;
  categoryitemlist: CategoryItem[];
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
    categories: string;
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
      return response;
    }
    return [];
  }
);

export const getCategoryItemListPOS = createAsyncThunk(
  "category/categoryitemlist",
  //CategoryTypes.CATEGORY_ITEM_LIST,
  async ({
    restaurantId,
    categories,
    customerId,
    locationId,
  }: {
    restaurantId: number;
    categories: string;
    customerId: string;
    locationId: string;
  }) => {
    const response = await CategoryServices.getCategoryItemListPOS(
      restaurantId,
      true,
      categories,
      customerId,
      locationId
    );
    return response ?? [];
  }
);

export const getAllCategoryMenuItems = createAsyncThunk(
  "category/getAllCategoryMenuItems",
  async (
    {
      restaurantId,
      locationId,
      customerId,
      categories,
      selectedCategoryUrl,
    }: {
      restaurantId: number;
      locationId: string;
      customerId: string;
      categories: string;
      selectedCategoryUrl?: string | null;
    },
    { dispatch }
  ) => {
    const response = await CategoryServices.getAllCategoryMenuItems(
      restaurantId,
      locationId,
      customerId,
      categories
    );

    if (response) {
      dispatch({
        type: CategoryTypes.CATEGORY_ITEM_LIST,
        payload: response,
      });

      const categoryList = response.map(
        ({
          catId,
          catName,
          sortorder,
          categoryslug,
          isdeliveryavailable,
          istakeoutavailable,
          imgurl,
        }) => ({
          catId,
          catName,
          sortorder,
          categoryslug,
          isdeliveryavailable,
          istakeoutavailable,
          imgurl,
        })
      );

      dispatch({
        type: MainTypes.GET_MENU_CATEGORY_DATA,
        payload: categoryList,
      });

      if (
        categoryList.length > 0 &&
        (!selectedCategoryUrl ||
          !categoryList.some(
            (cat: any) => cat.categoryslug === selectedCategoryUrl
          ))
      ) {
        dispatch({
          type: CategoryTypes.SELECTED_CATEGORY_DATA,
          payload: categoryList[0],
        });
      }
    } else {
      dispatch({
        type: MainTypes.GET_MENU_CATEGORY_DATA,
        payload: [],
      });
    }

    return response;
  }
);

// export const getAllCategoryMenuItems = createAsyncThunk<
//   {
//     response: CategoryItem[];
//     categoryList: CategoryItem[];
//   }, // Return type
//   {
//     restaurantId: number;
//     locationId: string;
//     customerId: string;
//     categories: string[];
//     selectedCategoryUrl: string | null;
//   }
// >("category/getAllCategoryMenuItems", async (args, { dispatch }) => {
//   const {
//     restaurantId,
//     locationId,
//     customerId,
//     categories,
//     selectedCategoryUrl,
//   } = args;

//   const response = await CategoryServices.getAllCategoryMenuItems(
//     restaurantId,
//     locationId,
//     customerId,
//     categories
//   );

//   const categoryList = (response ?? []).map(
//     ({
//       catId,
//       catName,
//       sortorder,
//       categoryslug,
//       isdeliveryavailable,
//       istakeoutavailable,
//       imgurl,
//     }) => ({
//       catId,
//       catName,
//       sortorder,
//       categoryslug,
//       isdeliveryavailable,
//       istakeoutavailable,
//       imgurl,
//     })
//   );

//   dispatch({
//     type: MainTypes.GET_MENU_CATEGORY_DATA,
//     payload: categoryList,
//   });

//   if (
//     categoryList.length > 0 &&
//     (!selectedCategoryUrl ||
//       !categoryList.some(
//         (cat) => cat.categoryslug === selectedCategoryUrl
//       ))
//   ) {
//     dispatch({
//       type: CategoryTypes.SELECTED_CATEGORY_DATA,
//       payload: categoryList[0],
//     });
//   }

//   return {
//     response: response ?? [],
//     categoryList,
//   };
// });

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
    builder.addCase(getAllCategoryMenuItems.fulfilled, (state, action) => {
      if (action.payload) {
        state.categoryitemlist = action.payload;
        state.categorylist = action.payload;
      } else {
        state.categoryitemlist = [];
        state.categorylist = [];
      }
    });
  },
});

export const {
  selectedCategory,
  removeCategoryList,
  setCategoryList,
  resetCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
