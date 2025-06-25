import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DeliveryAddressServices } from "./delivery-address.services";
import { DeliveryAddressTypes } from "./delivery-address.type";

interface DeliveryAddressState {
  deliveryaddressdata: any[] | null;
  updatedAddress: boolean | { isAddressUpdated: boolean };
  choosetime: Record<string, any>;
  registeraddress: Record<string, any>;
  addressId: Record<string, any>;
  tempDeliveryAddress: any | null;
  pickupordelivery: string | any;
  selecteddeliveryaddress: any;
}

const initialState: DeliveryAddressState = {
  deliveryaddressdata: null,
  updatedAddress: false,
  choosetime: {},
  registeraddress: {},
  addressId: {},
  tempDeliveryAddress: null,
  pickupordelivery: {},
  selecteddeliveryaddress: null,
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
    obj: any;
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
    registerAddress(state, action: PayloadAction<any>) {
      state.tempDeliveryAddress = null;
      state.registeraddress = action.payload;
    },
    insertAddressId(state, action: PayloadAction<any>) {
      state.addressId = action.payload;
    },
    AddTempDeliveryAddress(state, action: PayloadAction<any>) {
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
      (state, action: PayloadAction<any[]>) => {
        state.deliveryaddressdata = action.payload;
      }
    );
    builder.addCase(
      addAddress.fulfilled,
      (state, action: PayloadAction<any>) => {
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

// import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { DeliveryAddressServices } from './delivery-address.services';

// // --- Types ---

// export interface DeliveryAddressInput {
//   customerId?: number;
//   othercustomerId?: number;
//   deliveryaddressId?: number;
//   address1?: string;
//   address2?: string;
//   city?: string;
//   state?: string;
//   zip?: string;
//   zipcode?: string;
//   landmark?: string;
//   contactno?: string;
//   contactname?: string;
//   latitude?: string;
//   longitude?: string;
//   [key: string]: any;
// }

// export interface DeliveryAddressState {
//   deliveryaddressdata: DeliveryAddressInput[] | null;
//   updatedAddress: boolean;
//   choosetime: Record<string, any>;
//   registeraddress: DeliveryAddressInput;
//   addressId: DeliveryAddressInput;
//   tempDeliveryAddress: DeliveryAddressInput | null;
// }

// // --- Initial State ---

// const initialState: DeliveryAddressState = {
//   deliveryaddressdata: null,
//   updatedAddress: false,
//   choosetime: {},
//   registeraddress: {},
//   addressId: {},
//   tempDeliveryAddress: null,
// };

// // --- Async Thunks ---

// export const getAddress = createAsyncThunk<
//   DeliveryAddressInput[],
//   { customerId: number; restaurantId: number; locationId: number }
// >('deliveryAddress/getAddress', async ({ customerId, restaurantId, locationId }) => {
//   const response = await DeliveryAddressServices.getDeliveryAddress(customerId, restaurantId, locationId);
//   if (response) {
//     return response;
//   }
//   return [];
// }
// );

// export const deleteAddress = createAsyncThunk<
//   any,
//   { deliveryaddressId: number; restaurantId: number }
// >('deliveryAddress/deleteAddress', async ({ deliveryaddressId, restaurantId }) => {
//   const response = await DeliveryAddressServices.deleteDeliveryAddress(deliveryaddressId, restaurantId);
//   return response;
// });

// export const addAddress = createAsyncThunk<
//   DeliveryAddressInput,
//   { obj: any; restaurantId: number; locationId: number }
// >('deliveryAddress/addAddress', async ({ obj, restaurantId, locationId }) => {
//   const response = await DeliveryAddressServices.addDeliveryAddress(obj, restaurantId, locationId);
//   if (response) {
//     return response;
//   }
//   return [];
// }
// );

// // --- Slice ---

// const deliveryAddressSlice = createSlice({
//   name: 'deliveryAddress',
//   initialState,
//   reducers: {
//     updateAddressCheck(state, action: PayloadAction<boolean>) {
//       state.updatedAddress = action.payload;
//     },
//     registerAddress(state, action: PayloadAction<DeliveryAddressInput>) {
//       state.registeraddress = action.payload;
//       state.tempDeliveryAddress = null;
//     },
//     insertAddressId(state, action: PayloadAction<DeliveryAddressInput>) {
//       state.addressId = action.payload;
//     },
//     addTempDeliveryAddress(state, action: PayloadAction<DeliveryAddressInput | null>) {
//       state.tempDeliveryAddress = action.payload;
//     },
//     deleteTempDeliveryAddress(state) {
//       state.tempDeliveryAddress = null;
//     },
//     resetDeliveryAddress() {
//       return initialState;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getAddress.fulfilled, (state, action: PayloadAction<DeliveryAddressInput[]>) => {
//         state.deliveryaddressdata = action.payload;
//       })
//       .addCase(addAddress.fulfilled, (state, action: PayloadAction<DeliveryAddressInput>) => {
//         state.addressId = action.payload;
//       });
//   },
// });

// // --- Exports ---

// export const {
//   updateAddressCheck,
//   registerAddress,
//   insertAddressId,
//   addTempDeliveryAddress,
//   deleteTempDeliveryAddress,
//   resetDeliveryAddress,
// } = deliveryAddressSlice.actions;

// export default deliveryAddressSlice.reducer;
