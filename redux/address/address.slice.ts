import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the address
export interface Address {
  address1: string;
  address2: string;
  address3: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  addressType: number;
}

// Define the slice state
export interface AddressState {
  address: Address;
  getaddress?: Address; 
}

// Initial state
const initialState: AddressState = {
  address: {
    address1: "",
    address2: "",
    address3: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    addressType: 0,
  },
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    addAddress: (state, action: PayloadAction<Address>) => {
      state.address = action.payload;
    },
    getAddress: (state, action: PayloadAction<Address>) => {
      state.getaddress = action.payload;
    },
    resetAddress: (state) => {
      state.address = {
        address1: "",
        address2: "",
        address3: "",
        city: "",
        state: "",
        country: "",
        zipcode: "",
        addressType: 0,
      };
    },
  },
});

export const { addAddress, getAddress, resetAddress } = addressSlice.actions;
export default addressSlice.reducer;
