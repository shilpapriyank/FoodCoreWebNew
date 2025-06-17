import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { DeliveryAddressServices } from './delivery-address.services';
import { DeliveryAddressTypes } from './delivery-address.type';

// interface DeliveryAddressState {
//   deliveryaddressdata: any[] | null;
//   updatedAddress: boolean | { isAddressUpdated: boolean };
//   choosetime: Record<string, any>;
//   registeraddress: Record<string, any>;
//   addressId: Record<string, any>;
//   tempDeliveryAddress: any | null;
//   pickupordelivery: any | null;
//   selecteddeliveryaddress: any;
// }

// const initialState: DeliveryAddressState = {
//   deliveryaddressdata: null,
//   updatedAddress: false,
//   choosetime: {},
//   registeraddress: {},
//   addressId: {},
//   tempDeliveryAddress: null,
//   pickupordelivery: "",
//   selecteddeliveryaddress: null
// };

interface DeliveryAddressState {
  deliveryaddressdata: any[] | null;
  updatedAddress: boolean | { isAddressUpdated: boolean };
  choosetime: Record<string, any>;
  registeraddress: Record<string, any>;
  addressId: Record<string, any>;
  tempDeliveryAddress: any | null;
  pickupordelivery: string | any;
  selecteddeliveryaddress: any
}

const initialState: DeliveryAddressState = {
  deliveryaddressdata: null,
  updatedAddress: false,
  choosetime: {},
  registeraddress: {},
  addressId: {},
  tempDeliveryAddress: null,
  pickupordelivery: {},
  selecteddeliveryaddress:null,
};

// Async thunks
export const getAddress = createAsyncThunk(
  DeliveryAddressTypes.GET_ADDRESS,
  async ({
    customerId,
    restaurantId,
    locationId
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
    restaurantId
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
    locationId
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
  name: 'deliveryAddress',
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
    addTempDeliveryAddress(state, action: PayloadAction<any>) {
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
        selecteddeliveryaddress: null
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAddress.fulfilled, (state, action: PayloadAction<any[]>) => {
      state.deliveryaddressdata = action.payload;
    });
    builder.addCase(addAddress.fulfilled, (state, action: PayloadAction<any>) => {
      state.addressId = action.payload;
    });
  },
});

export const {
  updateAddressCheck,
  registerAddress,
  insertAddressId,
  addTempDeliveryAddress,
  DeleteTempDeliveryAddress,
  resetDeliveryAddress,
} = deliveryAddressSlice.actions;

export default deliveryAddressSlice.reducer;
