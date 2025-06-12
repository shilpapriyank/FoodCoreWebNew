// import { createSlice } from "@reduxjs/toolkit";
// import { SelectedDeliveryTypes } from "./selecteddelivery.types";

// // ChooseTime and DeliveryAddress types
// interface ChooseTime {
//   [key: string]: any;
// }

// interface DeliveryAddress {
//   address1: string;
//   address2: string;
//   addresstype: number;
//   businessname: string;
//   city: string;
//   contactname: string;
//   contactno: string;
//   country: string | null;
//   customerId: number;
//   deliveryaddressId: number;
//   landmark: string;
//   latitude: number;
//   longitude: number;
//   othercustomerId: number;
//   state: string | null;
//   zipcode: string;
// }

// interface SelectedDeliveryState {
//   choosetime: ChooseTime;
//   pickupordelivery: string;
//   selecteddeliveryaddress: DeliveryAddress | null;
// }

// const initialState: SelectedDeliveryState = {
//   choosetime: {},
//   pickupordelivery: "",
//   selecteddeliveryaddress: null,
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
//         state.selecteddeliveryaddress = null;
//       })
//       .addCase(SelectedDeliveryTypes.RESET_SELECTDELIVERY as any, (state) => {
//         state.pickupordelivery = "";
//         state.selecteddeliveryaddress = null;
//       });
//   },
// });

// export default selecteddeliverySlice.reducer;


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


//deliveryaddressdata(mine)
//selecteddeliveryaddress