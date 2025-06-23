// redux/login/loginSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { LoginServices } from './login.services';
import { AppDispatch } from '../store';
import { RewardPointTypes } from '../rewardpoint/rewardpoint.types';
import { LoggedInUser, LoginParams, LoginState } from './login.types';

const initialState: LoginState = {
    loggedinuser: null,
};

export const getLoginUserDetails = createAsyncThunk<
    LoggedInUser | null,
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
            locationid: Number(locationid),
        });

        return response && 'customerId' in response ? response : null;
    }
);

// Thunk: Fetch customer details & reward points
export const getCustomerDetails = createAsyncThunk<
    void,
    { restaurantId: number; customerId: number; rewardvalue: number; lid: number },
    { dispatch: AppDispatch }
>(
    'login/getCustomerDetails',
    async ({ restaurantId, customerId, rewardvalue, lid }, { dispatch }) => {
        const response = await LoginServices.getCustomerDetails(customerId, restaurantId, lid);
        if (response?.customerDetails) {
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
        updateUserTotalRewardPoint: (state, action: PayloadAction<LoggedInUser>) => {
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
