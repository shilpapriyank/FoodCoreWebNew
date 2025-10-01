import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CategoryServices } from "./category.services";
import { setMainCategoryList } from "../main/main.slice";
import { MainCategoryList } from "@/types/mainservice-types/mainservice.type";
import { GetAllMenuCategoryItems } from "@/types/menuitem-types/menuitem.type";
import { RootState } from "../store";

type ThunkConfig = {
  state: RootState;
  rejectValue: string;
};

export interface CategoryState {
  selectedcategorydetail: MainCategoryList | null;
  categoryitemlist: GetAllMenuCategoryItems[];
  //categorylist: MainCategoryList[];
}

const initialState: CategoryState = {
  selectedcategorydetail: null,
  categoryitemlist: [],
  //categorylist: [],
};

export const getCategoryItemList = createAsyncThunk<
  GetAllMenuCategoryItems[],
  {
    restaurantId: number;
    categories: string;
    customerId: number;
    locationId: number;
  },
  ThunkConfig
>("category/getCategoryItemList", async (params) => {
  const response = await CategoryServices.getCategoryItemList(
    params.restaurantId,
    params.categories,
    params.customerId,
    params.locationId
  );
  return (response as GetAllMenuCategoryItems[]) ?? [];
});

export const getCategoryItemListPOS = createAsyncThunk<
  GetAllMenuCategoryItems[],
  {
    restaurantId: number;
    categories: string;
    customerId: number;
    locationId: number;
  },
  ThunkConfig
>("category/getCategoryItemListPOS", async (params) => {
  const response = await CategoryServices.getCategoryItemListPOS(
    params.restaurantId,
    true,
    params.categories,
    params.customerId,
    params.locationId
  );
  return (response as GetAllMenuCategoryItems[]) ?? [];
});

export const getAllCategoryMenuItems = createAsyncThunk<
  GetAllMenuCategoryItems[],
  {
    restaurantId: number;
    locationId: number;
    customerId: number;
    categories: string;
    selectedCategoryUrl?: string;
  },
  ThunkConfig
>("category/getAllCategoryMenuItems", async (params, { dispatch }) => {
  const response = await CategoryServices.getAllCategoryMenuItems(
    params.restaurantId,
    params.locationId,
    params.customerId,
    params.categories
  );

  if (response) {
    dispatch(setCategoryList(response));
    const categoryList: MainCategoryList[] = response.map(
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

    // update main slice category list
    dispatch(setMainCategoryList(categoryList));
    // also keep our own categorylist like old reducer
    //dispatch(setAllCategoryList(categoryList));

    if (
      categoryList.length > 0 &&
      (!params.selectedCategoryUrl ||
        !categoryList.some(
          (cat) => cat.categoryslug === params.selectedCategoryUrl
        ))
    ) {
      dispatch(setSelectedCategory(categoryList[0]));
    }

    return response as GetAllMenuCategoryItems[];
  } else {
    dispatch(setMainCategoryList([]));
    //dispatch(setAllCategoryList([]));
    return [];
  }
});

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<MainCategoryList>) => {
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
    // setAllCategoryList: (state, action: PayloadAction<MainCategoryList[]>) => {
    //   state.categorylist = action.payload;
    // },
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
      (state, action: PayloadAction<GetAllMenuCategoryItems[]>) => {
        state.categoryitemlist = action.payload;
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
  setSelectedCategory,
  removeCategoryList,
  setCategoryList,
  resetCategory,
  //setAllCategoryList,
} = categorySlice.actions;

export default categorySlice.reducer;
