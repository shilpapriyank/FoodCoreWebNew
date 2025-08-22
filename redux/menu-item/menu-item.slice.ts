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
  Category,
  DependantMenuList,
  GetMenuItemDetail,
  GetSerachResult,
  MenuItem,
  Menuitems,
} from "@/types/menuitem-types/menuitem.type";
import { RootState } from "../store";
import { OrderObjType } from "@/types/cart-types/cartservice.type";

// Types
export interface MenuItemState {
  selectedmenuitemdetail: Menuitems | null;
  menuitemdetaillist: GetMenuItemDetail | null;
  selecteditemquantity: number;
  updateitemoptionincart: number;
  searchtext: string;
  // searchdata: {
  //   menuItems: MenuItem[];
  //   categories: Category[];
  // };
  searchdata: GetSerachResult | null;
  dependentid: number;
  dependentitemids: DependantMenuList[];
  dependentqty: number;
}

const initialState: MenuItemState = {
  selectedmenuitemdetail: null,
  menuitemdetaillist: null,
  selecteditemquantity: 0,
  updateitemoptionincart: 0,
  searchtext: "",
  // searchdata: {
  //   menuItems: [],
  //   categories: [],
  // },
  searchdata: null,
  dependentid: 0,
  dependentitemids: [],
  dependentqty: 0,
};

export const getMenuItemDetailes = createAsyncThunk<
  GetMenuItemDetail, // You want to return a single object
  {
    restaurantId: number;
    locationId: number;
    customerId: number;
    menuitemId: number;
    cartsessionId: string;
    cartId: number;
  },
  { state: RootState }
>(
  "menuitem/getMenuItemDetailes",
  async ({
    restaurantId,
    locationId,
    customerId,
    menuitemId,
    cartsessionId,
    cartId,
  }) => {
    const response = await MenuItemServices.getMenuItemList({
      restaurantId,
      locationId,
      customerId,
      menuitemId,
      cartsessionId,
      cartId,
    });

    if (Array.isArray(response)) {
      return response as GetMenuItemDetail; // return only the first item
    }

    throw new Error("No menu item found");
  }
);

export const addFavorite = createAsyncThunk(
  MenuItemTypes.ADD_FAVORITE,
  async ({
    customerId,
    restaurantId,
    menuItemId,
  }: {
    customerId: string;
    restaurantId: number;
    menuItemId: string;
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
    customerId: string;
    restaurantId: number;
    menuItemId: string;
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
    orderobj: OrderObjType;
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
    orderobj: OrderObjType;
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
    setMenuCategoryData: (state, action: PayloadAction<GetMenuItemDetail>) => {
      state.menuitemdetaillist = action.payload;
    },
    // setMenuCategoryData: (state, action: PayloadAction<Menuitems>) => {
    //   state.selectedmenuitemdetail = action.payload;
    // },
    selectedMenuItem: (state, action: PayloadAction<Menuitems>) => {
      state.selectedmenuitemdetail = action.payload;
    },
    setMenuItemDetailList: (
      state,
      action: PayloadAction<GetMenuItemDetail>
    ) => {
      state.menuitemdetaillist = action.payload;
    },
    setSelectedMenuItemDetailList: (
      state,
      action: PayloadAction<Menuitems>
    ) => {
      state.selectedmenuitemdetail = action.payload;
    },
    removeMenuItemForFavorite: (state) => {
      state.selectedmenuitemdetail = null;
    },
    selectedItemSize: (state, action: PayloadAction<GetMenuItemDetail>) => {
      state.menuitemdetaillist = action.payload;
    },
    // selectedItemSize: (state, action: PayloadAction<Size[]>) => {
    //   if (state.menuitemdetaillist) {
    //     state.menuitemdetaillist.size = action.payload;
    //   }
    // },
    removeMenuItem: (state) => {
      state.menuitemdetaillist = null;
    },
    removeMenuItemSelectedData: (state) => {
      state.selectedmenuitemdetail = null;
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
    setSearchData: (
      state,
      // action: PayloadAction<{
      //   menuItems: MenuItem[];
      //   categories: Category[];
      // }>
      action: PayloadAction<GetSerachResult>
    ) => {
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
      (state, action: PayloadAction<GetMenuItemDetail>) => {
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
  setSelectedMenuItemDetailList,
} = menuItemSlice.actions;

export default menuItemSlice.reducer;
