import { ORDER_TYPE } from "@/components/common/utility";
import { SelectedDeliveryAddressType } from "@/types/selectdelivery-types/selectdelivery.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddressListType } from "../delivery-address/delivery-address.types";

interface SelectedDeliveryState {
  choosetime: ChooseTime;
  pickupordelivery: string;
  selecteddeliveryaddress: AddressListType | null;
}
export interface ChooseTime {
  selectedDate?: string;
  selectedTimeSlot?: string;
  isAsap?: boolean;
  isLaterOn?: boolean;
}

const initialState: SelectedDeliveryState = {
  choosetime: {},
  pickupordelivery: "",
  selecteddeliveryaddress: null,
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
    selecteddeliveryaddress(
      state,
      action: PayloadAction<AddressListType | null>
    ) {
      state.selecteddeliveryaddress = action.payload;
    },
    cleardeliveryaddress(state) {
      state.choosetime = {};
      state.pickupordelivery = ORDER_TYPE.PICKUP.text;
      state.selecteddeliveryaddress = null;
    },
    resetSelectedDelivery(state) {
      state.pickupordelivery = ORDER_TYPE.PICKUP.text;
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
