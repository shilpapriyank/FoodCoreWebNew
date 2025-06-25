import { SelectedDeliveryAddressType } from "@/types/selectdelivery-types/selectdelivery.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedDeliveryState {
  choosetime: any;
  pickupordelivery: string;
  // pickupordelivery: ORDER_TYPE_ENUM;
  selecteddeliveryaddress: SelectedDeliveryAddressType | any;
}

const initialState: SelectedDeliveryState = {
  choosetime: {},
  pickupordelivery: "",
  // pickupordelivery: ORDER_TYPE_ENUM.PICKUP,
  selecteddeliveryaddress: {},
};

// Slice
const selecteddeliverySlice = createSlice({
  name: "selecteddelivery",
  initialState,
  reducers: {
    savechoosetime(state, action: PayloadAction<any>) {
      state.choosetime = action.payload;
    },
    setpickupordelivery(state, action: PayloadAction<string>) {
      // console.log("🟢 setpickupordelivery reducer called:", action.payload);
      state.pickupordelivery = action.payload;
    },
    selecteddeliveryaddress(
      state,
      action: PayloadAction<SelectedDeliveryAddressType>
    ) {
      state.selecteddeliveryaddress = action.payload;
    },
    cleardeliveryaddress(state) {
      state.choosetime = {};
      state.pickupordelivery = "";
      state.selecteddeliveryaddress = null;
    },
    resetSelectedDelivery(state) {
      state.pickupordelivery = "";
      state.selecteddeliveryaddress = null;
    },
  },
});

// actions
export const {
  savechoosetime,
  setpickupordelivery,
  selecteddeliveryaddress,
  cleardeliveryaddress,
  resetSelectedDelivery,
} = selecteddeliverySlice.actions;

export default selecteddeliverySlice.reducer;