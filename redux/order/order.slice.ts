import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { OrderServices } from "./order.services";
import {
  CheckOrderTimeArgsTypes,
  GetOrderTimeArgsTypes,
  OrderAddress,
} from "../../src/types/order-types/order.type";
import { FutureOrderingDayDateTypes } from "@/types/restaurant-types/restaurant.type";

export interface OrderState {
  checktime: string;
  isasap: boolean;
  orderId: number;
  isRedirectToCheckout: boolean;
  calculatedTotal: number;
  cardShowMessage: string;
  deliveryRequestId: string;
  futureOrderDay: FutureOrderingDayDateTypes | null;
}

const INITIAL_STATE: OrderState = {
  checktime: "",
  isasap: false,
  orderId: 0,
  isRedirectToCheckout: false,
  calculatedTotal: 0,
  cardShowMessage: "",
  deliveryRequestId: "",
  futureOrderDay: null,
};

export const checkOrderTime = createAsyncThunk(
  "order/checkOrderTime",
  async ({
    restaurantId,
    locationId,
    recievingTime,
    recieving,
    flg,
    obj,
    requestId,
  }: {
    restaurantId: number;
    locationId: number;
    recievingTime: string;
    recieving: string;
    flg: number;
    obj: OrderAddress;
    requestId: string;
  }) => {
    return await OrderServices.checkOrderTime({
      restaurantId,
      locationId,
      recievingTime,
      recieving,
      flg,
      obj,
      requestId,
    });
  }
);

export const getordertime = createAsyncThunk(
  "order/getOrderTime",
  async (args: GetOrderTimeArgsTypes) => {
    return await OrderServices.getOrderTime(args);
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: INITIAL_STATE,
  reducers: {
    setordertime: (state, action: PayloadAction<any>) => {
      state.checktime = action.payload;
    },
    isasap: (state, action: PayloadAction<boolean>) => {
      state.isasap = action.payload;
    },
    emptyorder: (state) => {
      state.checktime = "";
      state.isasap = false;
      state.orderId = 0;
      state.calculatedTotal = 0;
      state.deliveryRequestId = "";
    },
    setorderId: (state, action: PayloadAction<number>) => {
      state.orderId = action.payload;
    },
    isRedirectToCheckout: (state, action: PayloadAction<boolean>) => {
      state.isRedirectToCheckout = action.payload;
    },
    emptyordertime: (state) => {
      state.checktime = "";
    },
    addCalculatedTotal: (state, action: PayloadAction<number>) => {
      state.calculatedTotal = action.payload;
    },
    addCardShowMessage: (state, action: PayloadAction<string>) => {
      state.cardShowMessage = action.payload;
    },
    resetOrders: (state) => {
      state.checktime = "";
      state.isasap = false;
      state.isRedirectToCheckout = false;
      state.calculatedTotal = 0;
      state.cardShowMessage = "";
      state.deliveryRequestId = "";
      state.futureOrderDay = null;
    },
    resetOrdersData: (state) => {
      state.isRedirectToCheckout = false;
      state.calculatedTotal = 0;
      state.cardShowMessage = "";
    },
    setDeliveryRequestId: (state, action: PayloadAction<string>) => {
      state.deliveryRequestId = action.payload;
    },
    clearDeliveryRequestId: (state) => {
      state.deliveryRequestId = "";
    },
    setFutureOrderDay: (
      state,
      action: PayloadAction<FutureOrderingDayDateTypes | null>
    ) => {
      state.futureOrderDay = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkOrderTime.fulfilled, (state, action) => {
        state.checktime = action.payload;
      })
      .addCase(getordertime.fulfilled, (state, action) => {
        state.checktime = action.payload;
      });
  },
});

export const {
  setordertime,
  isasap,
  emptyorder,
  setorderId,
  isRedirectToCheckout,
  emptyordertime,
  addCalculatedTotal,
  addCardShowMessage,
  resetOrders,
  resetOrdersData,
  setDeliveryRequestId,
  clearDeliveryRequestId,
  setFutureOrderDay,
} = orderSlice.actions;

export default orderSlice.reducer;
