import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DeliveryAddressServices } from "./delivery-address.services";
import { DeliveryAddressTypes } from "./delivery-address.type";
import {
  DeliveryAddressInput,
  DeliveryAddressState,
} from "./delivery-address.types";

const initialState: DeliveryAddressState = {
  deliveryaddressdata: null,
  updatedAddress: false,
  choosetime: {},
  registeraddress: {},
  addressId: {},
  tempDeliveryAddress: null,
};

// Async thunks
export const getAddress = createAsyncThunk(
  DeliveryAddressTypes.GET_ADDRESS,
  async ({
    customerId,
    restaurantId,
    locationId,
  }: {
    customerId: number;
    restaurantId: number;
    locationId: number;
  }) => {
    const response = await DeliveryAddressServices.getDeliveryAddress(
      customerId,
      restaurantId,
      locationId
    );
    if (response) {
      return response;
    }
    return [];
  }
);

export const deleteAddress = createAsyncThunk(
  DeliveryAddressTypes.DELETE_ADDRESS,
  async ({
    deliveryaddressId,
    restaurantId,
  }: {
    deliveryaddressId: number;
    restaurantId: number;
  }) => {
    const response = await DeliveryAddressServices.deleteDeliveryAddress(
      deliveryaddressId,
      restaurantId
    );
    if (response) {
      return response;
    }
    return [];
  }
);

export const addAddress = createAsyncThunk(
  DeliveryAddressTypes.ADD_ADDRESS,
  async ({
    obj,
    restaurantId,
    locationId,
  }: {
    obj: DeliveryAddressInput;
    restaurantId: number;
    locationId: number;
  }) => {
    const response = await DeliveryAddressServices.addDeliveryAddress(
      obj,
      restaurantId,
      locationId
    );
    if (response) {
      return response;
    }
    return [];
  }
);

const deliveryAddressSlice = createSlice({
  name: "deliveryAddress",
  initialState,
  reducers: {
    updateAddressCheck(state, action: PayloadAction<boolean>) {
      state.updatedAddress = { isAddressUpdated: action.payload };
    },
    registerAddress(state, action: PayloadAction<DeliveryAddressInput | {}>) {
      state.tempDeliveryAddress = null;
      state.registeraddress = action.payload;
    },
    insertAddressId(state, action: PayloadAction<DeliveryAddressInput>) {
      state.addressId = action.payload;
    },
    AddTempDeliveryAddress(
      state,
      action: PayloadAction<DeliveryAddressInput | null>
    ) {
      state.tempDeliveryAddress = action.payload;
    },
    DeleteTempDeliveryAddress(state) {
      state.tempDeliveryAddress = null;
    },
    resetDeliveryAddress() {
      return {
        deliveryaddressdata: null,
        updatedAddress: false,
        choosetime: {},
        registeraddress: {},
        addressId: {},
        tempDeliveryAddress: null,
        pickupordelivery: null,
        selecteddeliveryaddress: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getAddress.fulfilled,
      (state, action: PayloadAction<DeliveryAddressInput[]>) => {
        state.deliveryaddressdata = action.payload;
      }
    );
    builder.addCase(
      addAddress.fulfilled,
      (state, action: PayloadAction<number | any>) => {
        state.addressId = action.payload;
      }
    );
  },
});

export const {
  updateAddressCheck,
  registerAddress,
  insertAddressId,
  AddTempDeliveryAddress,
  DeleteTempDeliveryAddress,
  resetDeliveryAddress,
} = deliveryAddressSlice.actions;

export default deliveryAddressSlice.reducer;
