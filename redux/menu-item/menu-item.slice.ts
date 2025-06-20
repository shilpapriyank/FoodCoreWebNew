// redux/menuItem/menuItemSlice.ts
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  Action,
} from "@reduxjs/toolkit";
import { MenuItemServices } from "./menu-item.services";
import { MenuItemTypes } from "./menuitem.type";
import {
  MenuItemDetailList,
  SelectedMenuItemDetail,
} from "@/types/menuitem-types/menuitem.type";

// Types
export interface MenuItemState {
  selectedmenuitemdetail: SelectedMenuItemDetail[];
  menuitemdetaillist: MenuItemDetailList[];
  selecteditemquantity: number;
  updateitemoptionincart: number;
  searchtext: string;
  searchdata: Record<string, any>;
  dependentid: number;
  dependentitemids: number[];
  dependentqty: number;
}

const initialState: MenuItemState = {
  selectedmenuitemdetail: [],
  menuitemdetaillist: [],
  selecteditemquantity: 0,
  updateitemoptionincart: 0,
  searchtext: "",
  searchdata: {},
  dependentid: 0,
  dependentitemids: [],
  dependentqty: 0,
};

// Async Thunks
export const getMenuItemDetailes = createAsyncThunk(
  "menuitem/getMenuItemDetailes",
  //MenuItemTypes.MENU_ITEM_DETAIL_LIST,
  async ({
    restaurantId,
    locationId,
    customerId,
    menuitemId,
    cartsessionId,
    cartId,
  }: {
    restaurantId: number;
    locationId: number;
    customerId: number;
    menuitemId: number;
    cartsessionId: string;
    cartId: number;
  }) => {
    const response = await MenuItemServices.getMenuItemList({
      restaurantId,
      locationId,
      customerId,
      menuitemId,
      cartsessionId,
      cartId,
    });
    if (response) {
      return response;
    }
    return [];
  }
);

export const addFavorite = createAsyncThunk(
  MenuItemTypes.ADD_FAVORITE,
  async ({
    customerId,
    restaurantId,
    menuItemId,
  }: {
    customerId: number;
    restaurantId: number;
    menuItemId: number;
  }) => {
    const response = await MenuItemServices.addfavorite({
      customerId,
      restaurantId,
      menuItemId,
    });
    if (response) {
      return response;
    }
    return [];
  }
);

export const deleteFavorite = createAsyncThunk(
  MenuItemTypes.DELETE_FAVORITE,
  async ({
    customerId,
    restaurantId,
    menuItemId,
  }: {
    customerId: number;
    restaurantId: number;
    menuItemId: number;
  }) => {
    const response = await MenuItemServices.deletefavorite({
      customerId,
      restaurantId,
      menuItemId,
    });
    if (response) {
      return response;
    }
    return [];
  }
);

export const addItemToCart = createAsyncThunk(
  MenuItemTypes.ADD_ITEM_TO_CART,
  async ({
    orderobj,
    restaurantId,
  }: {
    orderobj: any;
    restaurantId: number;
  }) => {
    const response = await MenuItemServices.addItemToCart({
      orderobj,
      restaurantId,
    });
    return response;
  }
);

export const updateItemToCart = createAsyncThunk(
  MenuItemTypes.ADD_ITEM_TO_CART,
  async ({
    orderobj,
    restaurantId,
  }: {
    orderobj: any;
    restaurantId: number;
  }) => {
    const response = await MenuItemServices.updateCartOrdersItem({
      orderobj,
      restaurantId,
    });
    return response;
  }
);

// Slice
const menuItemSlice = createSlice({
  name: "menuitem",
  initialState,
  reducers: {
    setMenuCategoryData: (
      state,
      action: PayloadAction<MenuItemDetailList[]>
    ) => {
      state.menuitemdetaillist = action.payload;
    },
    selectedMenuItem: (state, action: PayloadAction<MenuItemDetailList[]>) => {
      state.menuitemdetaillist = action.payload;
    },
    setMenuItemDetailList: (
      state,
      action: PayloadAction<MenuItemDetailList[]>
    ) => {
      state.menuitemdetaillist = action.payload;
    },
    setSelectedMenuItemDetailList: (
      state,
      action: PayloadAction<SelectedMenuItemDetail[]>
    ) => {
      state.selectedmenuitemdetail = action.payload;
    },
    removeMenuItemForFavorite: (state) => {
      state.selectedmenuitemdetail = [];
    },
    selectedItemSize: (state, action: PayloadAction<MenuItemDetailList[]>) => {
      state.menuitemdetaillist = action.payload;
    },
    removeMenuItem: (state) => {
      state.menuitemdetaillist = [];
    },
    removeMenuItemSelectedData: (state) => {
      state.selectedmenuitemdetail = [];
    },
    selecteditemquantity: (state, action: PayloadAction<number>) => {
      state.selecteditemquantity = action.payload;
    },
    updateitemoption: (state) => {
      state.updateitemoptionincart = Math.random();
    },
    resetMenuitem: () => initialState,
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchtext = action.payload;
    },
    setSearchData: (state, action: PayloadAction<any>) => {
      state.searchdata = action.payload;
    },
    setDipendentId: (state, action: PayloadAction<number>) => {
      state.dependentid = action.payload;
    },
    setDipendentIds: (state, action: PayloadAction<any[]>) => {
      state.dependentitemids = action.payload;
    },
    setDipendentItemQty: (state, action: PayloadAction<number>) => {
      state.dependentqty = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getMenuItemDetailes.fulfilled,
      (state, action: PayloadAction<MenuItemDetailList[]>) => {
        state.menuitemdetaillist = action.payload;
      }
    );
  },
});

export const {
  selectedMenuItem,
  removeMenuItemForFavorite,
  selectedItemSize,
  removeMenuItem,
  removeMenuItemSelectedData,
  selecteditemquantity,
  updateitemoption,
  resetMenuitem,
  setSearchText,
  setSearchData,
  setDipendentId,
  setDipendentIds,
  setDipendentItemQty,
  setMenuCategoryData,
  setMenuItemDetailList,
  setSelectedMenuItemDetailList
} = menuItemSlice.actions;

export default menuItemSlice.reducer;
