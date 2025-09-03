import {
  RewardPointState,
  UserInfo,
} from "@/types/rewardpoint-types/rewardpoint.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: RewardPointState = {
  rewardvalue: 0,
  rewardamount: 0,
  rewardPoint: 0,
  totalRewardPoints: 0,
  redeemPoint: 0,
};

// const initialState: RewardPointState = {
//     rewardvalue: 0,
//     rewardamount: 0,
//     rewardPoint: 0,
//     totalRewardPoints: 0,
//     redeemPoint: 0,
// };

const rewardpointSlice = createSlice({
  name: "rewardpoint",
  initialState,
  reducers: {
    // Equivalent to `setrewardpoint` action
    setrewardpoint: (state, action: PayloadAction<RewardPointState>) => {
      return { ...action.payload };
    },

    // Equivalent to `clearReedemPoint`
    clearredeempoint: (state) => {
      state.redeemPoint = 0;
    },

    // Equivalent to `setintialrewardpoints`
    setintialrewardpoints: (state, action: PayloadAction<UserInfo>) => {
      const userinfo = action.payload;
      const rewardamount =
        userinfo.rewardvalue > 0
          ? userinfo.totalRewardPoints / userinfo.rewardvalue
          : 0;

      return {
        rewardvalue: userinfo.rewardvalue,
        rewardamount,
        rewardPoint: userinfo.totalRewardPoints,
        totalRewardPoints: userinfo.totalRewardPoints,
        redeemPoint: 0,
      };
    },
  },
});

export const { setrewardpoint, clearredeempoint, setintialrewardpoints } =
  rewardpointSlice.actions;

export default rewardpointSlice.reducer;
