import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types
interface ChooseTime {
  [key: string]: any;
}

interface DeliveryAddress {
  address1?: string;
  address2?: string;
  addresstype?: number;
  businessname?: string;
  city?: string;
  contactname?: string;
  contactno?: string;
  country?: string | null;
  customerId?: number;
  deliveryaddressId?: number;
  landmark?: string;
  latitude?: number;
  longitude?: number;
  othercustomerId?: number;
  state?: string | null;
  zipcode?: string;
}

interface SelectedDeliveryState {
  choosetime: ChooseTime;
  pickupordelivery: string;
  selecteddeliveryaddress: DeliveryAddress | null;
}

const initialState: SelectedDeliveryState = {
  choosetime: {},
  pickupordelivery: "",
  selecteddeliveryaddress: {},
};

// Slice
const selecteddeliverySlice = createSlice({
  name: "selecteddelivery",
  initialState,
  reducers: {
    savechoosetime(state, action: PayloadAction<ChooseTime>) {
      state.choosetime = action.payload;
    },
    setpickupordelivery(state, action: PayloadAction<string>) {
      state.pickupordelivery = action.payload;
    },
    selecteddeliveryaddress(state, action: PayloadAction<DeliveryAddress>) {
      state.selecteddeliveryaddress = action.payload;
    },
    cleardeliveryaddress(state) {
      state.choosetime = {};
      state.pickupordelivery = "";
      state.selecteddeliveryaddress = {};
    },
    resetSelectedDelivery(state) {
      state.pickupordelivery = "";
      state.selecteddeliveryaddress = null;
    },
  },
});

// ✅ Export actions
export const {
  savechoosetime,
  setpickupordelivery,
  selecteddeliveryaddress,
  cleardeliveryaddress,
  resetSelectedDelivery,
} = selecteddeliverySlice.actions;

// ✅ Export reducer
export default selecteddeliverySlice.reducer;
