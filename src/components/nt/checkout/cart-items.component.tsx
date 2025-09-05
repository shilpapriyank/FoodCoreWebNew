import React from "react";
import CartItemsDetailComponent from "./cart-items-details.component";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";

const CartItems = () => {
  const {
    restaurantinfo,
    userinfo,
    selecteddelivery,
    sessionid,
    rewardpoints,
    main,
    orderTimeType,
    recievingTime,
    meredian,
    order,
  } = useReduxData();
  return (
    <>
      <CartItemsDetailComponent />
    </>
  );
};
export default CartItems;
