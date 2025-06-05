// src/store/slices/orderSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { OrderServices } from './order.services';
import { OrderAddress, OrderState } from '../../src/types/order-types/order.types';

const initialState: OrderState = {
    checktime: '',
    isasap: false,
    orderId: 0,
    isRedirectToCheckout: false,
    calculatedTotal: 0,
    cardShowMessage: '',
    deliveryRequestId: '',
    futureOrderDay: ''
};

// Example Thunks
export const checkOrderTime = createAsyncThunk(
    'order/checkOrderTime',
    async (
        {
            restaurantId,
            locationId,
            recievingTime,
            recieving,
            flg,
            obj,
            requestId = ""
        }: {
            restaurantId: number,
            locationId: number,
            recievingTime: string,
            recieving: string,
            flg: number,
            obj: OrderAddress,
            requestId?: string
        }
    ) => {
        const result = await OrderServices.checkOrderTime(
            restaurantId,
            locationId,
            recievingTime,
            recieving,
            flg,
            obj,
            requestId
        );
        return result;
    }
);

export const getOrderTime = createAsyncThunk(
    'order/getOrderTime',
    async (params: { restaurantId: number, locationId: number, ordertype: string }) => {
        return await OrderServices.getOrderTime(params.locationId, params.restaurantId, params.ordertype);
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrderTime: (state, action: PayloadAction<any>) => {
            state.checktime = action.payload;
        },
        setIsAsap: (state, action: PayloadAction<boolean>) => {
            state.isasap = action.payload;
        },
        emptyOrder: (state) => {
            state.checktime = '';
            state.isasap = false;
            state.orderId = 0;
            state.calculatedTotal = 0;
            state.deliveryRequestId = '';
        },
        setOrderId: (state, action: PayloadAction<number>) => {
            state.orderId = action.payload;
        },
        setRedirectToCheckout: (state, action: PayloadAction<boolean>) => {
            state.isRedirectToCheckout = action.payload;
        },
        emptyOrderTime: (state) => {
            state.checktime = '';
        },
        addCalculatedTotal: (state, action: PayloadAction<number>) => {
            state.calculatedTotal = action.payload;
        },
        addCardShowMessage: (state, action: PayloadAction<string>) => {
            state.cardShowMessage = action.payload;
        },
        resetOrder: (state) => {
            state.checktime = '';
            state.isasap = false;
            state.isRedirectToCheckout = false;
            state.calculatedTotal = 0;
            state.cardShowMessage = '';
            state.deliveryRequestId = '';
            state.futureOrderDay = '';
        },
        resetOrderData: (state) => {
            state.isRedirectToCheckout = false;
            state.calculatedTotal = 0;
            state.cardShowMessage = '';
        },
        setDeliveryRequestId: (state, action: PayloadAction<string>) => {
            state.deliveryRequestId = action.payload;
        },
        clearDeliveryRequestId: (state) => {
            state.deliveryRequestId = '';
        },
        setFutureOrderDay: (state, action: PayloadAction<string>) => {
            state.futureOrderDay = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkOrderTime.fulfilled, (state, action) => {
                state.checktime = action.payload;
            })
            .addCase(getOrderTime.fulfilled, (state, action) => {
                state.checktime = action.payload;
            });
    }
});

export const {
    setOrderTime,
    setIsAsap,
    emptyOrder,
    setOrderId,
    setRedirectToCheckout,
    emptyOrderTime,
    addCalculatedTotal,
    addCardShowMessage,
    resetOrder,
    resetOrderData,
    setDeliveryRequestId,
    clearDeliveryRequestId,
    setFutureOrderDay
} = orderSlice.actions;

export default orderSlice.reducer;
