// selecteddelivery.slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChooseTime {
  // define the shape, e.g.
  [key: string]: any;
}

interface DeliveryAddress {
  // define your delivery address shape here
  [key: string]: any;
}

interface SelectedDeliveryState {
  choosetime: ChooseTime;
  pickupordelivery: string;
  selecteddeliveryaddress: DeliveryAddress | null;
}

const initialState: SelectedDeliveryState = {
  choosetime: {},
  pickupordelivery: "",
  selecteddeliveryaddress: null,
};

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
      state.selecteddeliveryaddress = null;
    },
    resetSelectedDelivery(state) {
      state.pickupordelivery = "";
      state.selecteddeliveryaddress = null;
      // optionally clear choosetime? depends on your use case
    },
  },
});

export const {
  savechoosetime,
  setpickupordelivery,
  selecteddeliveryaddress,
  cleardeliveryaddress,
  resetSelectedDelivery,
} = selecteddeliverySlice.actions;

export default selecteddeliverySlice.reducer;

// // selecteddelivery.slice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface ChooseTime {
//     // define the shape, e.g.
//     [key: string]: any;
// }

// interface DeliveryAddress {
//     // define your delivery address shape here
//     [key: string]: any;
// }

// interface SelectedDeliveryState {
//     choosetime: ChooseTime;
//     pickupordelivery: string;
//     selecteddeliveryaddress: DeliveryAddress | null;
// }

// const initialState: SelectedDeliveryState = {
//     choosetime: {},
//     pickupordelivery: '',
//     selecteddeliveryaddress: null,
// };

// const selecteddeliverySlice = createSlice({
//     name: 'selecteddelivery',
//     initialState,
//     reducers: {
//         savechoosetime(state, action: PayloadAction<ChooseTime>) {
//             state.choosetime = action.payload;
//         },
//         setpickupordelivery(state, action: PayloadAction<string>) {
//             state.pickupordelivery = action.payload;
//         },
//         selecteddeliveryaddress(state, action: PayloadAction<DeliveryAddress>) {
//             state.selecteddeliveryaddress = action.payload;
//         },
//         cleardeliveryaddress(state) {
//             state.choosetime = {};
//             state.pickupordelivery = '';
//             state.selecteddeliveryaddress = null;
//         },
//         resetSelectedDelivery(state) {
//             state.pickupordelivery = '';
//             state.selecteddeliveryaddress = null;
//             // optionally clear choosetime? depends on your use case
//         },
//     },
// });

// export const {
//     savechoosetime,
//     setpickupordelivery,
//     selecteddeliveryaddress,
//     cleardeliveryaddress,
//     resetSelectedDelivery,
// } = selecteddeliverySlice.actions;

// export default selecteddeliverySlice.reducer;
