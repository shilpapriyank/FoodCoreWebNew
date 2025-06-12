import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { DeliveryAddressServices } from "./delivery-address.services";

interface ChooseTime {
  [key: string]: any;
}

interface DeliveryState {
  choosetime: ChooseTime;
  pickupordelivery: string;
  selecteddeliveryaddress: Record<string, any> | null;
  tempDeliveryAddress?: Record<string, any> | null;
  addressId: string | number | any;
}

const initialState: DeliveryState = {
  choosetime: {},
  pickupordelivery: "",
  selecteddeliveryaddress: {},
  addressId: 0,
};

export const getAddress = createAsyncThunk(
  "deliveryAddress/getAddress",
  async ({
    customerId,
    restaurantId,
    locationId,
  }: {
    customerId: string;
    restaurantId: number;
    locationId: string;
  }) => {
    const response = await DeliveryAddressServices.getDeliveryAddress(
      customerId,
      restaurantId,
      locationId
    );
    return response ?? [];
  }
);

export const deleteAddress = createAsyncThunk(
  "deliveryAddress/deleteAddress",
  async ({
    deliveryaddressId,
    restaurantId,
  }: {
    deliveryaddressId: string;
    restaurantId: number;
  }) => {
    const response = await DeliveryAddressServices.deleteDeliveryAddress(
      deliveryaddressId,
      restaurantId
    );
    return response;
  }
);

export const addAddress = createAsyncThunk(
  "deliveryAddress/addAddress",
  async ({
    obj,
    restaurantId,
    locationId,
  }: {
    obj: any;
    restaurantId: number;
    locationId: any;
  }) => {
    const response = await DeliveryAddressServices.addDeliveryAddress(
      obj,
      restaurantId,
      locationId
    );
    return response;
  }
);

export const updateAddressCheck = createAsyncThunk(
  "deliveryAddress/updateAddressCheck",
  async (check: any) => check
);

export const registerAddress = createAsyncThunk(
  "deliveryAddress/registerAddress",
  async (address: any) => address
);

export const InsertAddressId = createAsyncThunk(
  "deliveryAddress/InsertAddressId",
  async (addressId: any) => addressId
);

export const AddTempDeliveryAddress = createAsyncThunk(
  "deliveryAddress/AddTempDeliveryAddress",
  async (address: any) => address
);

export const DeleteTempDeliveryAddress = createAsyncThunk(
  "deliveryAddress/DeleteTempDeliveryAddress",
  async () => null
);

export const resetDeliveryAddress = createAsyncThunk(
  "deliveryAddress/resetDeliveryAddress",
  async () => null
);

// ---------- Slice ----------

const deliveryAddressSlice = createSlice({
  name: "deliveryAddress",
  initialState,
  reducers: {
    SAVE_CHOOSE_TIME: (state, action: PayloadAction<ChooseTime>) => {
      state.choosetime = action.payload;
    },
    SET_PICKUP_OR_DELIVERY: (state, action: PayloadAction<string>) => {
      state.pickupordelivery = action.payload;
    },
    SELECTED_DELIVERY_ADDRESS: (
      state,
      action: PayloadAction<Record<string, any> | null>
    ) => {
      state.selecteddeliveryaddress = action.payload;
    },
    CLEAR_DELIVERY_ADDRESS: (state) => {
      state.choosetime = {};
      state.pickupordelivery = "";
      state.selecteddeliveryaddress = {};
    },
    RESET_SELECTDELIVERY: (state) => {
      state.pickupordelivery = "";
      state.selecteddeliveryaddress = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAddress.fulfilled, (state, action) => {
        // You can store address list in a new state property if needed
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        // You can update state.selecteddeliveryaddress = action.payload;
      })
      .addCase(updateAddressCheck.fulfilled, (state, action) => {
        state.selecteddeliveryaddress = action.payload;
      })
      .addCase(registerAddress.fulfilled, (state, action) => {
        state.selecteddeliveryaddress = action.payload;
      })
      .addCase(InsertAddressId.fulfilled, (state, action) => {
        state.addressId = action.payload;
      })
      .addCase(AddTempDeliveryAddress.fulfilled, (state, action) => {
        state.tempDeliveryAddress = action.payload;
      })
      .addCase(DeleteTempDeliveryAddress.fulfilled, (state) => {
        state.tempDeliveryAddress = null;
      })
      .addCase(resetDeliveryAddress.fulfilled, (state) => {
        state.choosetime = {};
        state.pickupordelivery = "";
        state.selecteddeliveryaddress = null;
        state.tempDeliveryAddress = null;
        state.addressId = 0;
      });
  },
});

// ---------- Exports ----------

export const {
  SAVE_CHOOSE_TIME,
  SET_PICKUP_OR_DELIVERY,
  SELECTED_DELIVERY_ADDRESS,
  CLEAR_DELIVERY_ADDRESS,
  RESET_SELECTDELIVERY,
} = deliveryAddressSlice.actions;

export default deliveryAddressSlice.reducer;
