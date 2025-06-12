import { CartTotal, TableOrderState } from '@/types/tableorder-types/tableorder.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: TableOrderState = {
  ishowtoorder: true,
  tablenumber: 0,
  cartcount: 0,
  customer: null,
  cartitems: null,
  firebasetablename: '',
  carttotal: {},
  tabledetail: {},
  printerdetails: {},
  kitchencomment: '',
  serverid: 0,
};

const tableOrderSlice = createSlice({
  name: 'tableOrder',
  initialState,
  reducers: {
    displayHowOrderModal(state, action: PayloadAction<boolean>) {
      state.ishowtoorder = action.payload;
    },
    addTableNumber(state, action: PayloadAction<number>) {
      state.tablenumber = action.payload;
    },
    addOtherCustomer(state, action: PayloadAction<any>) {
      state.customer = action.payload;
    },
    getCartData(state, action: PayloadAction<any>) {
      state.cartitems = action.payload;
    },
    addFirebaseTableName(state, action: PayloadAction<string>) {
      state.firebasetablename = action.payload;
    },
    getCartTotal(state, action: PayloadAction<CartTotal>) {
      const netTotal = (
        parseFloat(action.payload.subTotal) + parseFloat(action.payload.tipamount)
      ).toFixed(2);
      state.carttotal = { ...action.payload, nettotal: netTotal };
    },
    getTableDetails(state, action: PayloadAction<any>) {
      state.tabledetail = action.payload;
    },
    getPrinterDetails(state, action: PayloadAction<any>) {
      state.printerdetails = action.payload;
    },
    getCartItemCount(state, action: PayloadAction<any>) {
      state.cartcount = action.payload;
    },
    addKitchenComment(state, action: PayloadAction<string>) {
      state.kitchencomment = action.payload;
    },
    addServerId(state, action: PayloadAction<number>) {
      state.serverid = action.payload;
    },
    clearRedux(state) {
      state.ishowtoorder = false;
      state.cartcount = 0;
      state.cartitems = null;
      state.firebasetablename = '';
      state.carttotal = {};
      // state.tabledetail = {}; // You commented this in your original reducer
      state.printerdetails = {};
      state.kitchencomment = '';
      state.serverid = 0;
    },
  },
});

export const {
  displayHowOrderModal,
  addTableNumber,
  addOtherCustomer,
  getCartData,
  addFirebaseTableName,
  getCartTotal,
  getTableDetails,
  getPrinterDetails,
  getCartItemCount,
  addKitchenComment,
  addServerId,
  clearRedux,
} = tableOrderSlice.actions;

export default tableOrderSlice.reducer;
