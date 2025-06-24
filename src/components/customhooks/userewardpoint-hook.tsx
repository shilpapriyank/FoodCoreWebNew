"use client";

import React from "react";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";

const UseRewardPoint: React.FC = () => {
  const { userinfo, rewardpoints } = useReduxData();

  const totalPoints = userinfo?.totalRewardPoints ?? 0;
  const rewardAmount = rewardpoints?.rewardamount ?? 0;

  return (
    <h1>
      You have {totalPoints} reward points, worth ${rewardAmount.toFixed(2)}.
    </h1>
  );
};

export default UseRewardPoint;
