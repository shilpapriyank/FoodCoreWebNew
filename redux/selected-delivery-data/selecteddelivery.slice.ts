import { ORDER_TYPE } from "@/components/common/utility";
import { SelectedDeliveryAddressType } from "@/types/selectdelivery-types/selectdelivery.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedDeliveryState {
  choosetime: any;
  pickupordelivery: string;
  selecteddeliveryaddress: SelectedDeliveryAddressType | null;
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
    savechoosetime(state, action: PayloadAction<any>) {
      state.choosetime = action.payload;
    },
    setpickupordelivery(state, action: PayloadAction<any>) {
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