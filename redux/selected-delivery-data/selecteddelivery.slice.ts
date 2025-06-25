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
    setpickupordelivery(state, action: PayloadAction<string>) {
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

// export const SelectedDeliveryTypes = {
//   SAVE_CHOOSE_TIME: selecteddeliverySlice.actions.savechoosetime.type,
//   SET_PICKUP_OR_DELIVERY:
//     selecteddeliverySlice.actions.setpickupordelivery.type,
//   SELECTED_DELIVERY_ADDRESS:
//     selecteddeliverySlice.actions.selecteddeliveryaddress.type,
//   CLEAR_DELIVERY_ADDRESS:
//     selecteddeliverySlice.actions.cleardeliveryaddress.type,
//   RESET_SELECTDELIVERY:
//     selecteddeliverySlice.actions.resetSelectedDelivery.type,
// };

// import { createSlice } from "@reduxjs/toolkit";
// import { SelectedDeliveryTypes } from "./selecteddelivery.types";

// // ChooseTime and DeliveryAddress types
// interface ChooseTime {
//   [key: string]: any;
// }

// interface DeliveryAddress {
//   address1?: string;
//   address2?: string;
//   addresstype?: number;
//   businessname?: string;
//   city?: string;
//   contactname?: string;
//   contactno?: string;
//   country?: string | null;
//   customerId?: number;
//   deliveryaddressId?: number;
//   landmark?: string;
//   latitude?: number;
//   longitude?: number;
//   othercustomerId?: number;
//   state?: string | null;
//   zipcode?: string;
// }

// interface SelectedDeliveryState {
//   choosetime: ChooseTime;
//   pickupordelivery: string;
//   selecteddeliveryaddress: DeliveryAddress | null | Record<string, any>;
// }

// const initialState: SelectedDeliveryState = {
//   choosetime: {},
//   pickupordelivery: "",
//   selecteddeliveryaddress: {},
// };

// const selecteddeliverySlice = createSlice({
//   name: "selecteddelivery",
//   initialState,
//   reducers: {}, // No auto-generated actions
//   extraReducers: (builder) => {
//     builder
//       .addCase(SelectedDeliveryTypes.SAVE_CHOOSE_TIME as any, (state, action: any) => {
//         state.choosetime = action.payload;
//       })
//       .addCase(SelectedDeliveryTypes.SET_PICKUP_OR_DELIVERY as any, (state, action: any) => {
//         state.pickupordelivery = action.payload;
//       })
//       .addCase(SelectedDeliveryTypes.SELECTED_DELIVERY_ADDRESS as any, (state, action: any) => {
//         state.selecteddeliveryaddress = action.payload;
//       })
//       .addCase(SelectedDeliveryTypes.CLEAR_DELIVERY_ADDRESS as any, (state) => {
//         state.choosetime = {};
//         state.pickupordelivery = "";
//         state.selecteddeliveryaddress = {};
//       })
//       .addCase(SelectedDeliveryTypes.RESET_SELECTDELIVERY as any, (state) => {
//         state.pickupordelivery = "";
//         state.selecteddeliveryaddress = null;
//       });
//   },
// });

// // ✅ Only export reducer since no actions were created
// export default selecteddeliverySlice.reducer;
