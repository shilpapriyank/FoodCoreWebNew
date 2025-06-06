import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CartServices } from './cart.services';

interface CartState {
    cartData: any;
    cartItemCount: number;
    cartTotal: any;
    deliveryCharges: any;
    rewardPoint: number | null;
    grandTotal: any;
    transactionId: string;
    orderInstruction: string;
    orderDeliveryInstruction: string;
    paymentIntentId: string;
}

const initialState: CartState = {
    cartData: {},
    cartItemCount: 0,
    cartTotal: {},
    deliveryCharges: {},
    rewardPoint: null,
    grandTotal: {},
    transactionId: '',
    orderInstruction: '',
    orderDeliveryInstruction: '',
    paymentIntentId: '',
};

export const getCartItem = createAsyncThunk(
    'cart/getCartItem',
    async (params: any, { dispatch }) => {
        const response = await CartServices.getCartItemList(
            params.cartsessionId,
            params.locationId,
            params.restaurantId,
            params.cartId,
            params.customerId,
            params.rewardpoints,
            params.redeemamount,
            params.deliveryaddressId,
            params.tipPercentage > 0 ? params.tipPercentage : 0,
            params.tipAmount ?? 0,
            params.ordertype,
            params.selectedtime,
            params.deliveryRequestId
        );
        if (response?.cartDetails?.cartTotal) {
            return response;
        }
        return {};
    }
);

export const getCartItemCount = createAsyncThunk(
    'cart/getCartItemCount',
    async (params: any) => {
        const response = await CartServices.getCartItemCount(
            params.cartsessionId ?? '',
            params.locationId,
            params.restaurantId,
            params.customerId
        );
        return response;
    }
);

export const deleteCartItem = createAsyncThunk(
    'cart/deleteCartItem',
    async (params: any) => {
        const response = await CartServices.deleteCartItem(
            params.cartsessionId,
            params.cartId,
            params.restaurantId,
            params.locationId
        );
        return response;
    }
);

export const updatequantity = createAsyncThunk(
    'cart/updatequantity',
    async (params: any) => {
        const response = await CartServices.updatequantity(
            params.cartsessionId,
            params.cartId,
            params.qty,
            params.price,
            params.locationId,
            params.restaurantId
        );
        return response;
    }
);

export const cartcheckout = createAsyncThunk(
    'cart/cartcheckout',
    async ({ obj, restaurantId }: any) => {
        const response = await CartServices.cartcheckout(obj, restaurantId);
        return response;
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateCartItemCount(state) {
            state.cartItemCount = 0;
        },
        updateCartItem(state) {
            state.cartData = {};
        },
        setCartItem(state, action: PayloadAction<any>) {
            state.cartData = action.payload;
        },
        setCartTotal(state, action: PayloadAction<any>) {
            state.cartTotal = action.payload;
        },
        updateCartTotalData(state) {
            state.cartTotal = {};
        },
        setRewardPoint(state, action: PayloadAction<number | null>) {
            state.rewardPoint = action.payload;
        },
        setGrandTotal(state, action: PayloadAction<any>) {
            state.grandTotal = action.payload;
        },
        setTransactionId(state, action: PayloadAction<string>) {
            state.transactionId = action.payload;
        },
        setOrderInstruction(state, action: PayloadAction<string>) {
            state.orderInstruction = action.payload;
        },
        setOrderDeliveryInstruction(state, action: PayloadAction<string>) {
            state.orderDeliveryInstruction = action.payload;
        },
        emptyCart(state) {
            state.cartData = {};
        },
        resetCart(state) {
            return initialState;
        },
        setPaymentIntentId(state, action: PayloadAction<string>) {
            state.paymentIntentId = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getCartItem.fulfilled, (state, action) => {
                state.cartData = action.payload;
            })
            .addCase(getCartItemCount.fulfilled, (state, action) => {
                state.cartItemCount = action.payload;
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                // implement if needed
            })
            .addCase(updatequantity.fulfilled, (state, action) => {
                // implement if needed
            })
            .addCase(cartcheckout.fulfilled, (state, action) => {
                // implement if needed
            });
    },
});

export const {
    updateCartItemCount,
    updateCartItem,
    setCartItem,
    setCartTotal,
    updateCartTotalData,
    setRewardPoint,
    setGrandTotal,
    setTransactionId,
    setOrderInstruction,
    setOrderDeliveryInstruction,
    emptyCart,
    resetCart,
    setPaymentIntentId,
} = cartSlice.actions;

export default cartSlice.reducer;