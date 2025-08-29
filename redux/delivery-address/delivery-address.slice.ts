import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DeliveryAddressServices } from "./delivery-address.services";
import { DeliveryAddressTypes } from "./delivery-address.type";
import {
  DeliveryAddressInput,
  DeliveryAddressListNewType,
} from "./delivery-address.types";
import { ChooseTime } from "@/types/selectdelivery-types/selectdelivery.types";

export interface DeliveryAddressState {
  deliveryaddressdata: DeliveryAddressInput | null;
  updatedAddress: boolean;
  choosetime: ChooseTime;
  registeraddress: any;
  addressId: any | null;
  tempDeliveryAddress: DeliveryAddressInput | null;
}
const initialState: DeliveryAddressState = {
  deliveryaddressdata: null,
  updatedAddress: false,
  choosetime: {},
  registeraddress: {},
  addressId: null,
  tempDeliveryAddress: null,
};
//Async thunks
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
    return null;
  }
);

// export const getAddress = createAsyncThunk<
//   DeliveryAddressListNewType | null,
//   { customerId: number; restaurantId: number; locationId: number }
// >(
//   DeliveryAddressTypes.GET_ADDRESS,
//   ({ customerId, restaurantId, locationId }) => {
//     return DeliveryAddressServices.getDeliveryAddress(
//       customerId,
//       restaurantId,
//       locationId
//     ).then((response) => {
//       return response ?? null;
//     });
//   }
// );

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
    obj: any;
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
    setDeliveryAddressData(state, action: PayloadAction<DeliveryAddressInput>) {
      state.deliveryaddressdata = action.payload;
    },
    updateAddressCheck(state, action: PayloadAction<boolean>) {
      state.updatedAddress = action.payload;
    },
    updateAddressId(state, action: PayloadAction<any>){
      state.addressId = action.payload
    },
    registerAddress(
      state,
      action: PayloadAction<DeliveryAddressListNewType | {}>
    ) {
      state.tempDeliveryAddress = null;
      state.registeraddress = action.payload;
    },
    insertAddressId(state, action: PayloadAction<number>) {
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
    resetDeliveryAddress: () => initialState,
  },
  extraReducers: (builder) => {
    // builder.addCase(
    //   getAddress.fulfilled,
    //   (state, action: PayloadAction<DeliveryAddressListNewType>) => {
    //     state.deliveryaddressdata = action.payload;
    //   }
    // );
    builder.addCase(
      getAddress.fulfilled,
      (state, action: PayloadAction<DeliveryAddressInput | null>) => {
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
  updateAddressId,
  registerAddress,
  insertAddressId,
  AddTempDeliveryAddress,
  DeleteTempDeliveryAddress,
  resetDeliveryAddress,
  setDeliveryAddressData,
} = deliveryAddressSlice.actions;
export default deliveryAddressSlice.reducer;
