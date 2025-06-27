// redux/category/categorySlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CategoryServices } from "./category.services";
import { CategoryTypes } from "./category.types";
import { setMainCategoryList } from "../main/main.slice";
import { MainCategoryList } from "@/types/mainservice-types/mainservice.type";
import { GetAllMenuCategoryItems } from "@/types/menuitem-types/menuitem.type";

export interface CategoryState {
  selectedcategorydetail: MainCategoryList | null;
  categoryitemlist: GetAllMenuCategoryItems[];
  categorylist: MainCategoryList | null;
}

const initialState: CategoryState = {
  selectedcategorydetail: null,
  categoryitemlist: [],
  categorylist: null,
};

export const getCategoryItemList = createAsyncThunk(
  CategoryTypes.CATEGORY_ITEM_LIST,
  async (
    {
      restaurantId,
      categories,
      customerId,
      locationId,
    }: {
      restaurantId: number;
      categories: string;
      customerId: number;
      locationId: number;
    },
    { dispatch }
  ) => {
    const response = await CategoryServices.getCategoryItemList(
      restaurantId,
      categories,
      customerId,
      locationId
    );
    if (response) {
      //return response;
      dispatch(setCategoryList(response as GetAllMenuCategoryItems[]));
    }
    return [];
  }
);

export const getCategoryItemListPOS = createAsyncThunk(
  "category/categoryitemlist",
  //CategoryTypes.CATEGORY_ITEM_LIST,
  async (
    {
      restaurantId,
      categories,
      customerId,
      locationId,
    }: {
      restaurantId: number;
      categories: string;
      customerId: number;
      locationId: number;
    },
    { dispatch }
  ) => {
    const response = await CategoryServices.getCategoryItemListPOS(
      restaurantId,
      true,
      categories,
      customerId,
      locationId
    );
    if (response) {
      dispatch(setCategoryList(response));
      //return response;
    }
    return [];
  }
);

export const getAllCategoryMenuItems = createAsyncThunk<
  GetAllMenuCategoryItems[], // ✅ this defines the return (payload) type
  {
    restaurantId: number;
    locationId: number;
    customerId: number;
    categories: string;
    selectedCategoryUrl?: string;
  }
>(
  CategoryTypes.ALL_CATEGORY_ITEM_LIST,
  async (
    { restaurantId, locationId, customerId, categories, selectedCategoryUrl },
    { dispatch }
  ) => {
    const response = await CategoryServices.getAllCategoryMenuItems(
      restaurantId,
      locationId,
      customerId,
      categories
    );

    let categoryList: MainCategoryList[] = [];
    if (response) {
      categoryList = response.map(
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
          imgurl: imgurl || "",
        })
      );
      dispatch(setMainCategoryList(categoryList as MainCategoryList[]));
      if (
        categoryList.length > 0 &&
        (!selectedCategoryUrl ||
          !categoryList.some((cat) => cat.categoryslug === selectedCategoryUrl))
      ) {
        dispatch(selectedCategory(categoryList[0]));
      }

      return response; // ✅ return it here!
    } else {
      dispatch(setMainCategoryList(categoryList as MainCategoryList[]));
      return []; // ✅ still return a consistent empty array
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    selectedCategory: (state, action: PayloadAction<MainCategoryList>) => {
      state.selectedcategorydetail = action.payload;
    },
    removeCategoryList: (state) => {
      state.categoryitemlist = [];
    },
    setCategoryList: (
      state,
      action: PayloadAction<GetAllMenuCategoryItems[]>
    ) => {
      state.categoryitemlist = action.payload;
    },
    resetCategory: (state) => {
      state.selectedcategorydetail = null;
      state.categoryitemlist = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getCategoryItemList.fulfilled,
      (state, action: PayloadAction<GetAllMenuCategoryItems[]>) => {
        state.categoryitemlist = action.payload;
      }
    );
    builder.addCase(
      getCategoryItemListPOS.fulfilled,
      (state, action: PayloadAction<GetAllMenuCategoryItems[] | null>) => {
        state.categoryitemlist = action.payload ?? [];
      }
    );

    builder.addCase(
      getAllCategoryMenuItems.fulfilled,
      (state, action: PayloadAction<GetAllMenuCategoryItems[]>) => {
        state.categoryitemlist = action.payload;
      }
    );
  },
});

export const {
  selectedCategory,
  removeCategoryList,
  setCategoryList,
  resetCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
