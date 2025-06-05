import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ResponseModel } from "@/components/common/commonclass";
import { RegisterServices } from "./register.services";

export interface RegisterModel {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
  countrycode: string;
  isVerifiedPhone: boolean;
  businessName: string;
}

export interface AddressModel {
  address1?: string;
  address2?: string;
  landmark?: string;
  city?: string;
  state?: string;
  country?: string;
  zipcode?: string;
  addresstype?: number;
  businessname?: string;
}

interface RegisterState {
  registerUser?: ResponseModel | null;
}

const initialState: RegisterState = {
  registerUser: null,
};

// ✅ Async thunk for registration
export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (
    {
      registerModel,
      address,
    }: { registerModel: RegisterModel; address: AddressModel | null },
    { rejectWithValue }
  ) => {
    try {
      const response = await RegisterServices.registerUser(
        registerModel,
        address
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ✅ Slice
const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    resetRegister: (state) => {
      state.registerUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<ResponseModel>) => {
        state.registerUser = action.payload;
      }
    );
  },
});

export const { resetRegister } = registerSlice.actions;
export default registerSlice.reducer;
