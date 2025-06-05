// redux/menuItem/menuItemSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MenuItemServices } from './menu-item.services';

// Types
export interface MenuItemState {
    selectedmenuitemdetail: Record<string, any>
    menuitemdetaillist: Record<string, any>
    selecteditemquantity: number
    updateitemoptionincart: number
    searchtext: string
    searchdata: Record<string, any>
    dependentid: number
    dependentitemids: any[]
    dependentqty: number
}

const initialState: MenuItemState = {
    selectedmenuitemdetail: {},
    menuitemdetaillist: {},
    selecteditemquantity: 0,
    updateitemoptionincart: 0,
    searchtext: '',
    searchdata: {},
    dependentid: 0,
    dependentitemids: [],
    dependentqty: 0,
};

// Async Thunks
export const getMenuItemDetailes = createAsyncThunk(
    'menuItem/getMenuItemDetailes',
    async (
        {
            restaurantId,
            locationId,
            customerId,
            menuitemId,
            cartsessionId,
            cartId,
        }: {
            restaurantId: any
            locationId: any
            customerId: any
            menuitemId: string
            cartsessionId: string
            cartId: string
        }
    ) => {
        const response = await MenuItemServices.getMenuItemList(
            restaurantId,
            locationId,
            customerId,
            menuitemId,
            cartsessionId,
            cartId
        )
        return response
    }
)

export const addFavorite = createAsyncThunk(
    'menuItem/addFavorite',
    async ({ customerId, restaurantId, menuItemId }: { customerId: string; restaurantId: string; menuItemId: string }) => {
        const response = await MenuItemServices.addfavorite(customerId, restaurantId, menuItemId)
        return response
    }
)

export const deleteFavorite = createAsyncThunk(
    'menuItem/deleteFavorite',
    async ({ customerId, restaurantId, menuItemId }: { customerId: string; restaurantId: string; menuItemId: string }) => {
        const response = await MenuItemServices.deletefavorite(customerId, restaurantId, menuItemId)
        return response
    }
)

export const addItemToCart = createAsyncThunk(
    'menuItem/addItemToCart',
    async ({ orderobj, restaurantId }: { orderobj: any; restaurantId: any }) => {
        const response = await MenuItemServices.addItemToCart(orderobj, restaurantId)
        return response
    }
)

export const updateItemToCart = createAsyncThunk(
    'menuItem/updateItemToCart',
    async ({ orderobj, restaurantId }: { orderobj: any; restaurantId: any }) => {
        const response = await MenuItemServices.updateCartOrdersItem(orderobj, restaurantId)
        return response
    }
)

// Slice
const menuItemSlice = createSlice({
    name: 'menuItem',
    initialState,
    reducers: {
        selectedMenuItem: (state, action: PayloadAction<any>) => {
            state.selectedmenuitemdetail = action.payload
        },
        removeMenuItemForFavorite: (state) => {
            state.selectedmenuitemdetail = {}
        },
        selectedItemSize: (state, action: PayloadAction<any>) => {
            state.menuitemdetaillist = action.payload
        },
        removeMenuItem: (state) => {
            state.menuitemdetaillist = {}
        },
        removeMenuItemSelectedData: (state) => {
            state.selectedmenuitemdetail = {}
        },
        selecteditemquantity: (state, action: PayloadAction<number>) => {
            state.selecteditemquantity = action.payload
        },
        updateitemoption: (state) => {
            state.updateitemoptionincart = Math.random()
        },
        resetMenuitem: () => initialState,
        setSearchText: (state, action: PayloadAction<string>) => {
            state.searchtext = action.payload
        },
        setSearchData: (state, action: PayloadAction<any>) => {
            state.searchdata = action.payload
        },
        setDipendentId: (state, action: PayloadAction<number>) => {
            state.dependentid = action.payload
        },
        setDipendentIds: (state, action: PayloadAction<any[]>) => {
            state.dependentitemids = action.payload
        },
        setDipendentItemQty: (state, action: PayloadAction<number>) => {
            state.dependentqty = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getMenuItemDetailes.fulfilled, (state, action) => {
            if (action.payload) {
                state.menuitemdetaillist = action.payload
            }
        })
    },
})

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
} = menuItemSlice.actions

export default menuItemSlice.reducer
