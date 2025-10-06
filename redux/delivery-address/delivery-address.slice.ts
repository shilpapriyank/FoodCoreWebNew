import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DeliveryAddressServices } from "./delivery-address.services";
import { DeliveryAddressTypes } from "./delivery-address.type";
import {
  AddDeliveryAddressServiceResultType,
  AddressListType,
} from "./delivery-address.types";
import { ChooseTime } from "@/types/selectdelivery-types/selectdelivery.types";

export interface DeliveryAddressState {
  deliveryaddressdata: AddressListType[] | null;
  updatedAddress: boolean;
  choosetime: ChooseTime;
  registeraddress: Record<string, any>;
  addressId: AddDeliveryAddressServiceResultType | null;
  tempDeliveryAddress: AddressListType | null;
}
const initialState: DeliveryAddressState = {
  deliveryaddressdata: null,
  updatedAddress: false,
  choosetime: {},
  registeraddress: {},
  addressId: null,
  tempDeliveryAddress: null,
};

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
    obj: AddressListType;
    restaurantId: number;
    locationId: number;
  }) => {
    await DeliveryAddressServices.addDeliveryAddress(
      obj,
      restaurantId,
      locationId
    ).then((response) => {
      if (response) {
        return response;
      } else {
        return null;
      }
    });
  }
);
const deliveryAddressSlice = createSlice({
  name: "deliveryAddress",
  initialState,
  reducers: {
    setDeliveryAddressData(
      state,
      action: PayloadAction<AddressListType[] | null>
    ) {
      state.deliveryaddressdata = action.payload;
    },
    updateAddressCheck(state, action: PayloadAction<boolean>) {
      state.updatedAddress = action.payload;
    },
    updateAddressId(
      state,
      action: PayloadAction<AddDeliveryAddressServiceResultType>
    ) {
      state.addressId = action.payload;
    },
    registerAddress(state, action: PayloadAction<AddressListType | {}>) {
      state.tempDeliveryAddress = null;
      state.registeraddress = action.payload;
    },
    insertAddressId(
      state,
      action: PayloadAction<AddDeliveryAddressServiceResultType>
    ) {
      state.addressId = action.payload;
    },
    AddTempDeliveryAddress(
      state,
      action: PayloadAction<AddressListType | null>
    ) {
      state.tempDeliveryAddress = action.payload;
    },
    DeleteTempDeliveryAddress(state) {
      state.tempDeliveryAddress = null;
    },
    resetDeliveryAddress: () => initialState,
  },
  extraReducers: (builder) => {
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
  updateAddressId,
  registerAddress,
  insertAddressId,
  AddTempDeliveryAddress,
  DeleteTempDeliveryAddress,
  resetDeliveryAddress,
  setDeliveryAddressData,
} = deliveryAddressSlice.actions;
export default deliveryAddressSlice.reducer;
