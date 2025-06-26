// redux/category/categorySlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CategoryServices } from "./category.services";
import { CategoryTypes } from "./category.types";
import { MainTypes } from "../main/main.type";
import {
  CategoryItem,
  CategoryItemType,
  SelectedCategoryDetail,
} from "@/types/category-types/category.services.type";
import { setMainCategoryList } from "../main/main.slice";
import { MainCategory } from "@/types/mainservice-types/mainservice.type";
import { RootState } from "../store";

type ThunkConfig = {
  state: RootState;
  rejectValue: string;
};

export const EMPTY_CATEGORY_ITEM: CategoryItemType = {
  catId: 0,
  catName: "",
  sortorder: 0,
  categoryslug: "",
  isdeliveryavailable: false,
  istakeoutavailable: false,
  imgurl: "",
};

export interface CategoryState {
  selectedcategorydetail: CategoryItemType;
  categoryitemlist: CategoryItemType[];
  categorylist: CategoryItem[];
}

const initialState: CategoryState = {
  selectedcategorydetail: EMPTY_CATEGORY_ITEM,
  categoryitemlist: [],
  categorylist: [],
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
      dispatch(setCategoryList(response as CategoryItemType[]));
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

// export const getAllCategoryMenuItems = createAsyncThunk(
//   //"category/getAllCategoryMenuItems",
//   CategoryTypes.ALL_CATEGORY_ITEM_LIST,
//   async (
//     {
//       restaurantId,
//       locationId,
//       customerId,
//       categories,
//       selectedCategoryUrl,
//     }: {
//       restaurantId: number;
//       locationId: number;
//       customerId: number;
//       categories: string;
//       selectedCategoryUrl?: string;
//     },
//     { dispatch }
//   ) => {
//     await CategoryServices.getAllCategoryMenuItems(
//       restaurantId,
//       locationId,
//       customerId,
//       categories
//     ).then((response) => {
//       let categoryList: MainCategory[] = [];
//       if (response) {
//         dispatch(setCategoryList(response));
//         categoryList = response.map(
//           ({
//             catId,
//             catName,
//             sortorder,
//             categoryslug,
//             isdeliveryavailable,
//             istakeoutavailable,
//             imgurl,
//           }) => ({
//             catId: catId,
//             catName: catName,
//             sortorder: sortorder,
//             categoryslug: categoryslug,
//             isdeliveryavailable: isdeliveryavailable,
//             istakeoutavailable: istakeoutavailable,
//             imgurl: imgurl,
//           })
//         );
//         dispatch(setMainCategoryList(categoryList as MainCategory[]));

//         if (categoryList.length > 0) {
//           if (
//             !selectedCategoryUrl &&
//             !categoryList?.some(
//               (cat) => cat?.categoryslug === selectedCategoryUrl
//             )
//           ) {
//             dispatch(selectedCategory(categoryList[0]));
//           }
//           return response;
//         }
//       } else {
//         dispatch(setMainCategoryList(categoryList as MainCategory[]));
//         return [];
//       }
//     });
//   }
// );

export const getAllCategoryMenuItems = createAsyncThunk<
  CategoryItemType[], // ✅ this defines the return (payload) type
  {
    restaurantId: number;
    locationId: number;
    customerId: number;
    categories: string;
    selectedCategoryUrl?: string;
  },
  ThunkConfig
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

    let categoryList: MainCategory[] = [];
    if (response) {
      dispatch(setCategoryList(response));

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
          imgurl,
        })
      );

      dispatch(setMainCategoryList(categoryList as MainCategory[]));

      if (
        categoryList.length > 0 &&
        (!selectedCategoryUrl ||
          !categoryList.some((cat) => cat.categoryslug === selectedCategoryUrl))
      ) {
        dispatch(selectedCategory(categoryList[0]));
      }

      return response; // ✅ return it here!
    } else {
      dispatch(setMainCategoryList(categoryList as MainCategory[]));
      return []; // ✅ still return a consistent empty array
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    selectedCategory: (state, action: PayloadAction<CategoryItemType>) => {
      state.selectedcategorydetail = action.payload;
    },
    removeCategoryList: (state) => {
      state.categoryitemlist = [];
    },
    setCategoryList: (state, action: PayloadAction<CategoryItem[]>) => {
      state.categorylist = action.payload;
    },
    resetCategory: (state) => {
      state.selectedcategorydetail = EMPTY_CATEGORY_ITEM;
      state.categoryitemlist = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getCategoryItemList.fulfilled,
      (state, action: PayloadAction<CategoryItemType[]>) => {
        state.categoryitemlist = action.payload;
        //state.categorylist = action.payload;
        // state.categoryitemlist = action.payload;
      }
    );
    builder.addCase(
      getCategoryItemListPOS.fulfilled,
      (state, action: PayloadAction<CategoryItemType[] | null>) => {
        state.categoryitemlist = action.payload ?? [];
        //state.categorylist = action.payload;
      }
    );
    builder.addCase(
      getAllCategoryMenuItems.fulfilled,
      (state, action: PayloadAction<CategoryItemType[]>) => {
        state.categoryitemlist = action.payload;
        //state.categorylist = action.payload;
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
