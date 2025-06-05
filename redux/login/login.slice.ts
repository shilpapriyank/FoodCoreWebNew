// redux/login/loginSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { LoginServices } from './login.services';
import { AppDispatch } from '../store';
import { RewardPointTypes } from '../rewardpoint/rewardpoint.types';
import { LoggedInUser, LoginParams, LoginState } from './login.types';

const initialState: LoginState = {
    loggedinuser: null,
};

// Thunk: Fetch login user details
export const getLoginUserDetails = createAsyncThunk<
  any, // You can replace this with `LoggedInUser | null` if you have a proper type
  LoginParams,
  { dispatch: AppDispatch }
>(
  'login/getLoginUserDetails',
  async ({ username, password, restaurantId, dialCode, locationid }, { dispatch }) => {
    const response = await LoginServices.getLoginUserDetails({
      username,
      password,
      restaurantId,
      dialCode,
      locationid,
    });

    return response || null;
  }
);

// Thunk: Fetch customer details & reward points
export const getCustomerDetails = createAsyncThunk<
    void,
    { restaurantId: any; customerId: any; rewardvalue: number; lid: any },
    { dispatch: AppDispatch }
>('login/getCustomerDetails', async ({ restaurantId, customerId, rewardvalue, lid }, { dispatch }) => {
    const response = await LoginServices.getCustomerDetails(customerId, restaurantId, lid);
    if (response) {
        const totalRewardPoints = response?.customerDetails?.totalRewardPoints || 0;
        const rewardamount = rewardvalue > 0 ? totalRewardPoints / rewardvalue : 0;

        const rewardpoints = {
            rewardvalue,
            rewardamount,
            rewardPoint: totalRewardPoints,
            totalRewardPoints,
            redeemPoint: 0,
        };

        dispatch({
            type: RewardPointTypes.SET_REWARD_POINT,
            payload: rewardpoints,
        });
    }
});

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logout: (state) => {
            state.loggedinuser = null;
        },
        updateUserTotalRewardPoint: (state, action: PayloadAction<any>) => {
            state.loggedinuser = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getLoginUserDetails.fulfilled, (state, action) => {
            state.loggedinuser = action.payload;
        });
    },
});

export const { logout, updateUserTotalRewardPoint } = loginSlice.actions;

export default loginSlice.reducer;
