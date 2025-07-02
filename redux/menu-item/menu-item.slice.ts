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
  GetAllMenuCategoryItems,
  GetMenuItemDetail,
  GetSerachResult,
  MenuItem,
  MenuStausList,
  SelectedMenuItemDetail,
  Size,
  Topping,
} from "@/types/menuitem-types/menuitem.type";
import { RootState } from "../store";

type ThunkConfig = {
  state: RootState;
  rejectValue: string;
};

// Types
export interface MenuItemState {
  selectedmenuitemdetail: SelectedMenuItemDetail | null;
  // menuitemdetaillist: {
  //   menuItemId: number;
  //   itemName: string;
  //   image: string;
  //   description: string;
  //   isFavourite: boolean;
  //   size: Size[];
  //   topping: Topping[];
  //   MenuStausList: MenuStausList[];
  //   dependantMenuList: DependantMenuList[];
  // };
  menuitemdetaillist: GetMenuItemDetail | null;
  selecteditemquantity: number;
  updateitemoptionincart: number;
  searchtext: string;
  searchdata: {
    menuItems: MenuItem[];
    categories: Category[];
  };
  dependentid: number;
  dependentitemids: number[];
  dependentqty: number;
}

const initialState: MenuItemState = {
  selectedmenuitemdetail: null,
  // menuitemdetaillist: {
  //   menuItemId: 0,
  //   itemName: "",
  //   image: "",
  //   description: "",
  //   isFavourite: false,
  //   size: [],
  //   topping: [],
  //   MenuStausList: [],
  //   dependantMenuList: [],
  // },
  menuitemdetaillist: null,
  selecteditemquantity: 0,
  updateitemoptionincart: 0,
  searchtext: "",
  searchdata: {
    menuItems: [],
    categories: [],
  },
  dependentid: 0,
  dependentitemids: [],
  dependentqty: 0,
};

//Async Thunks
// export const getMenuItemDetailes = createAsyncThunk(
//   //"menuitem/getMenuItemDetailes",
//   MenuItemTypes.MENU_ITEM_DETAIL_LIST,
//   async ({
//     restaurantId,
//     locationId,
//     customerId,
//     menuitemId,
//     cartsessionId,
//     cartId,
//   }: {
//     restaurantId: number;
//     locationId: number;
//     customerId: number;
//     menuitemId: number;
//     cartsessionId: string;
//     cartId: number;
//   }) => {
//     const response = await MenuItemServices.getMenuItemList({
//       restaurantId,
//       locationId,
//       customerId,
//       menuitemId,
//       cartsessionId,
//       cartId,
//     });
//     if (response) {
//       return response;
//     }
//     return null;
//   }
// );

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

    //✅ Just return the first item, or throw an error
    if (Array.isArray(response)) {
      return response[0] as GetMenuItemDetail; // return only the first item
    }
    //return response;

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
// export const getSerachResult = createAsyncThunk(
//   MenuItemTypes.SET_SEARCHDATA,
//   async (
//     {
//       locationId,
//       restaurantId,
//       customerId,
//       serchQuery,
//     }: {
//       locationId: number;
//       restaurantId: number;
//       customerId: number;
//       serchQuery: string;
//     },
//     { dispatch }
//   ) => {
//     const response = await MenuItemServices.getSerachResult({
//       locationId,
//       restaurantId,
//       customerId,
//       serchQuery,
//     });
//     if (response) {
//       return response as GetSerachResult[];
//     }
//     return [];
//   }
// );

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
    setMenuCategoryData: (state, action: PayloadAction<GetMenuItemDetail>) => {
      state.menuitemdetaillist = action.payload;
    },
    selectedMenuItem: (
      state,
      action: PayloadAction<SelectedMenuItemDetail>
    ) => {
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
      action: PayloadAction<SelectedMenuItemDetail>
    ) => {
      state.selectedmenuitemdetail = action.payload;
    },
    removeMenuItemForFavorite: (state) => {
      state.selectedmenuitemdetail = null;
    },
    selectedItemSize: (state, action: PayloadAction<GetMenuItemDetail>) => {
      state.menuitemdetaillist = action.payload;
    },
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
      action: PayloadAction<{
        menuItems: MenuItem[];
        categories: Category[];
      }>
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

// // redux/menuItem/menuItemSlice.ts
// import {
//   createSlice,
//   createAsyncThunk,
//   PayloadAction,
//   Action,
// } from "@reduxjs/toolkit";
// import { MenuItemServices } from "./menu-item.services";
// import { MenuItemTypes } from "./menuitem.type";
// import {
//   GetMenuItemDetail,
//   GetSerachResult,
//   SelectedMenuItemDetail,
// } from "@/types/menuitem-types/menuitem.type";

// // Types
// export interface MenuItemState {
//   selectedmenuitemdetail: SelectedMenuItemDetail[];
//   menuitemdetaillist: GetMenuItemDetail[];
//   selecteditemquantity: number;
//   updateitemoptionincart: number;
//   searchtext: string;
//   searchdata: GetSerachResult[];
//   dependentid: number;
//   dependentitemids: number[];
//   dependentqty: number;
// }

// const initialState: MenuItemState = {
//   selectedmenuitemdetail: [],
//   menuitemdetaillist: [],
//   selecteditemquantity: 0,
//   updateitemoptionincart: 0,
//   searchtext: "",
//   searchdata: [],
//   dependentid: 0,
//   dependentitemids: [],
//   dependentqty: 0,
// };

// // Async Thunks
// export const getMenuItemDetailes = createAsyncThunk(
//   "menuitem/getMenuItemDetailes",
//   //MenuItemTypes.MENU_ITEM_DETAIL_LIST,
//   async ({
//     restaurantId,
//     locationId,
//     customerId,
//     menuitemId,
//     cartsessionId,
//     cartId,
//   }: {
//     restaurantId: number;
//     locationId: number;
//     customerId: number;
//     menuitemId: number;
//     cartsessionId: string;
//     cartId: number;
//   }) => {
//     const response = await MenuItemServices.getMenuItemList({
//       restaurantId,
//       locationId,
//       customerId,
//       menuitemId,
//       cartsessionId,
//       cartId,
//     });
//     if (response) {
//       return response;
//     }
//     return [];
//   }
// );

// export const addFavorite = createAsyncThunk(
//   MenuItemTypes.ADD_FAVORITE,
//   async ({
//     customerId,
//     restaurantId,
//     menuItemId,
//   }: {
//     customerId: number;
//     restaurantId: number;
//     menuItemId: number;
//   }) => {
//     const response = await MenuItemServices.addfavorite({
//       customerId,
//       restaurantId,
//       menuItemId,
//     });
//     if (response) {
//       return response;
//     }
//     return [];
//   }
// );

// export const deleteFavorite = createAsyncThunk(
//   MenuItemTypes.DELETE_FAVORITE,
//   async ({
//     customerId,
//     restaurantId,
//     menuItemId,
//   }: {
//     customerId: number;
//     restaurantId: number;
//     menuItemId: number;
//   }) => {
//     const response = await MenuItemServices.deletefavorite({
//       customerId,
//       restaurantId,
//       menuItemId,
//     });
//     if (response) {
//       return response;
//     }
//     return [];
//   }
// );

// export const addItemToCart = createAsyncThunk(
//   MenuItemTypes.ADD_ITEM_TO_CART,
//   async ({
//     orderobj,
//     restaurantId,
//   }: {
//     orderobj: any;
//     restaurantId: number;
//   }) => {
//     const response = await MenuItemServices.addItemToCart({
//       orderobj,
//       restaurantId,
//     });
//     return response;
//   }
// );

// export const updateItemToCart = createAsyncThunk(
//   MenuItemTypes.ADD_ITEM_TO_CART,
//   async ({
//     orderobj,
//     restaurantId,
//   }: {
//     orderobj: any;
//     restaurantId: number;
//   }) => {
//     const response = await MenuItemServices.updateCartOrdersItem({
//       orderobj,
//       restaurantId,
//     });
//     return response;
//   }
// );

// // Slice
// const menuItemSlice = createSlice({
//   name: "menuitem",
//   initialState,
//   reducers: {
//     setMenuCategoryData: (
//       state,
//       action: PayloadAction<GetMenuItemDetail[]>
//     ) => {
//       state.menuitemdetaillist = action.payload;
//     },
//     selectedMenuItem: (state, action: PayloadAction<GetMenuItemDetail[]>) => {
//       state.menuitemdetaillist = action.payload;
//     },
//     setMenuItemDetailList: (
//       state,
//       action: PayloadAction<GetMenuItemDetail[]>
//     ) => {
//       state.menuitemdetaillist = action.payload;
//     },
//     setSelectedMenuItemDetailList: (
//       state,
//       action: PayloadAction<SelectedMenuItemDetail[]>
//     ) => {
//       state.selectedmenuitemdetail = action.payload;
//     },
//     removeMenuItemForFavorite: (state) => {
//       state.selectedmenuitemdetail = [];
//     },
//     selectedItemSize: (state, action: PayloadAction<GetMenuItemDetail[]>) => {
//       state.menuitemdetaillist = action.payload;
//     },
//     removeMenuItem: (state) => {
//       state.menuitemdetaillist = [];
//     },
//     removeMenuItemSelectedData: (state) => {
//       state.selectedmenuitemdetail = [];
//     },
//     selecteditemquantity: (state, action: PayloadAction<number>) => {
//       state.selecteditemquantity = action.payload;
//     },
//     updateitemoption: (state) => {
//       state.updateitemoptionincart = Math.random();
//     },
//     resetMenuitem: () => initialState,
//     setSearchText: (state, action: PayloadAction<string>) => {
//       state.searchtext = action.payload;
//     },
//     setSearchData: (state, action: PayloadAction<GetSerachResult[]>) => {
//       state.searchdata = action.payload;
//     },
//     setDipendentId: (state, action: PayloadAction<number>) => {
//       state.dependentid = action.payload;
//     },
//     setDipendentIds: (state, action: PayloadAction<any[]>) => {
//       state.dependentitemids = action.payload;
//     },
//     setDipendentItemQty: (state, action: PayloadAction<number>) => {
//       state.dependentqty = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(
//       getMenuItemDetailes.fulfilled,
//       (state, action: PayloadAction<GetMenuItemDetail[]>) => {
//         state.menuitemdetaillist = action.payload;
//       }
//     );
//   },
// });

// export const {
//   selectedMenuItem,
//   removeMenuItemForFavorite,
//   selectedItemSize,
//   removeMenuItem,
//   removeMenuItemSelectedData,
//   selecteditemquantity,
//   updateitemoption,
//   resetMenuitem,
//   setSearchText,
//   setSearchData,
//   setDipendentId,
//   setDipendentIds,
//   setDipendentItemQty,
//   setMenuCategoryData,
//   setMenuItemDetailList,
//   setSelectedMenuItemDetailList,
// } = menuItemSlice.actions;

// export default menuItemSlice.reducer;
