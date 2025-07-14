import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { OrderServices } from "./order.services";
import {
  CheckOrderTimeArgsTypes,
  GetOrderTimeArgsTypes,
  OrderState,
} from "../../src/types/order-types/order.type";

const INITIAL_STATE: OrderState = {
  checktime: "",
  isasap: false,
  orderId: 0,
  isRedirectToCheckout: false,
  calculatedTotal: 0,
  cardShowMessage: "",
  deliveryRequestId: "",
  futureOrderDay: "",
};

export const checkOrderTime = createAsyncThunk(
  "order/checkOrderTime",
  async (args: CheckOrderTimeArgsTypes) => {
    debugger;
    return await OrderServices.checkOrderTime(args);
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
      state.futureOrderDay = "";
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
    setFutureOrderDay: (state, action: PayloadAction<string>) => {
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
