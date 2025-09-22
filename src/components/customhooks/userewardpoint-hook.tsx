import { useMemo, useState } from "react";
import { ORDER_TYPE } from "../common/utility";
import handleNotify from "../default/helpers/toaster/toaster-notify";
import { ToasterPositions } from "../default/helpers/toaster/toaster-positions";
import { ToasterTypes } from "../default/helpers/toaster/toaster-types";
import useFutureOrder from "./usefuture-order-hook";
import {
  CartDetailOfCartTotal,
  CartTotal,
} from "@/types/cart-types/cartservice.type";
import { useReduxData } from "./useredux-data-hooks";
import { useAppDispatch } from "../../../redux/hooks";
import { decimalValidate, numberValidate } from "../default/helpers/validate";
import { CustomerServices } from "../../../redux/customer/customer.services";
import { setrewardpoint } from "../../../redux/rewardpoint/rewardpoint.slice";
import { carttotaldata } from "../../../redux/cart/cart.slice";

const useRewardPoint = (carttotal?: CartDetailOfCartTotal, inputRP?: any) => {
  const {
    rewardpoints,
    userinfo,
    sessionid,
    restaurantinfo,
    selecteddelivery,
    order,
    recievingTime,
    meredian,
    orderTimeType,
    cart,
  } = useReduxData();
  const dispatch = useAppDispatch();
  const [amount, setamount] = useState<any>(
    rewardpoints?.rewardamount > 0 ? rewardpoints?.rewardamount : 0
  );
  const [point, setpoint] = useState(rewardpoints?.rewardPoint);
  const [redeemamount, setredeemamount] = useState<any>();
  const [redeempoint, setredeempoint] = useState<any>();
  const [errorMessage, seterrorMessage] = useState<string>("");
  const [disabledText, setDisabledText] = useState<boolean>(false);
  let rewardvalue = rewardpoints?.rewardvalue;
  const ordertype =
    selecteddelivery?.pickupordelivery === ORDER_TYPE.DELIVERY.text
      ? ORDER_TYPE.DELIVERY.value
      : ORDER_TYPE.PICKUP.value;
  const deliveryaddressinfo = selecteddelivery?.selecteddeliveryaddress;
  let cartsubtotal =
    carttotal && carttotal?.subTotal > 0 ? carttotal?.subTotal : 0;
  let subTotalWithDiscount =
    carttotal && carttotal?.subTotalWithDiscount > 0
      ? carttotal.subTotalWithDiscount
      : 0;
  let customerId = userinfo ? userinfo.customerId : 0;
  let dcharges =
    cart &&
    selecteddelivery?.pickupordelivery === ORDER_TYPE.DELIVERY.text &&
    cart.carttotal != undefined &&
    cart.carttotal?.deliveryCharges &&
    JSON.parse(cart.carttotal?.deliveryCharges);
  let deliveryCharge =
    dcharges != undefined &&
    selecteddelivery?.pickupordelivery === ORDER_TYPE.DELIVERY.text &&
    dcharges?.DeliveryCharges &&
    parseFloat(dcharges.DeliveryCharges);
  let dCharge =
    selecteddelivery?.pickupordelivery === ORDER_TYPE.DELIVERY.text
      ? deliveryCharge ?? 0
      : 0;
  let minOrderAmount = carttotal?.minOrderAmountForRewardPoint;
  let customerOrderCount = carttotal?.customerOrderCount;
  const location = restaurantinfo?.defaultLocation;
  const totalRewardAmount = (
    rewardpoints?.totalRewardPoints / rewardpoints?.rewardvalue
  ).toFixed(2);
  const promotionValue = carttotal?.PromotionData?.promotionpercentagecal ?? 0;
  const maxRedeemAmount = useMemo(() => {
    let minAmount =
      carttotal &&
      (
        carttotal?.subTotal -
        (carttotal?.discountAmount + promotionValue) +
        dCharge -
        1
      ).toFixed(2);
    return minAmount;
  }, [dCharge, carttotal?.subTotal, carttotal?.discountAmount, promotionValue]);
  const { recievingDate, enabletimeslot } = useFutureOrder();

  const handleInitialPoint = () => {
    if (userinfo) {
      if (
        rewardpoints &&
        rewardpoints.totalRewardPoints == 0 &&
        rewardpoints.rewardamount == 0
      ) {
      } else {
        if (
          (rewardpoints?.rewardPoint > 0 && rewardvalue > 0) ||
          rewardpoints?.redeemPoint !== 0
        ) {
          setpoint(rewardpoints.rewardPoint);
          setamount(rewardpoints.rewardamount);
          setredeempoint(rewardpoints.redeemPoint as any);
          setredeemamount((rewardpoints.redeemPoint / rewardvalue) as any);
        }
      }
    }
  };

  const onchangerewardamount = (item: any) => {
    let objamount = item.target.value === "" ? 0 : item.target.value;
    let objTotalRewardAmount =
      rewardpoints?.totalRewardPoints > 0
        ? rewardpoints?.totalRewardPoints / rewardpoints?.rewardvalue
        : 0;

    //check only decimal and numeric value allowed
    if (!decimalValidate(objamount)) {
      return;
    }

    //check and set total rewardpoint value, if blank textbox
    if (
      rewardpoints?.rewardamount === 0 ||
      rewardpoints?.rewardamount === undefined
    ) {
      return;
    }

    if (
      redeemamount?.length <= 1 &&
      (item.target.value === "" || item.target.value === ".")
    ) {
      setredeemamount("");
      setredeempoint("");
      setamount((rewardpoints.totalRewardPoints / rewardvalue).toFixed(2));
      setpoint(rewardpoints.totalRewardPoints);
      return;
    }

    //chck if entered value is lessthan total reward point
    if (objamount > rewardpoints.totalRewardPoints / rewardpoints.rewardvalue) {
      return;
    }
    //check entered amount is less than cart sub total
    // if (parseFloat(objamount) > subTotalWithDiscount.toFixed(1) - 1) {
    if (maxRedeemAmount && objamount > maxRedeemAmount) {
      return;
    }

    if (objamount === 0) {
      setredeemamount("");
      setredeempoint("");
    } else {
      setamount((objTotalRewardAmount - objamount).toFixed(2));
      setpoint(rewardpoints.totalRewardPoints - objamount * rewardvalue);
      setredeemamount(objamount);
      setredeempoint(objamount * rewardvalue);
    }
  };

  const onchangerewardpoint = (item: any) => {
    let objPointOnLastDigitClear =
      item.target.value === "" && parseFloat(redeemamount) > 0
        ? parseFloat(redeemamount) * rewardvalue
        : 0;
    let objpoint =
      item.target.value === "" ? objPointOnLastDigitClear : item.target.value;
    let objTotalRewardpoint =
      rewardpoints?.totalRewardPoints > 0 ? rewardpoints.totalRewardPoints : 0;

    //check only decimal and numeric value allowed
    if (!numberValidate(objpoint)) {
      return;
    }
    let objamount = (rewardpoints?.totalRewardPoints / rewardvalue).toFixed(1);
    //check and set total rewardpoint value, if blank textbox
    if (
      rewardpoints?.rewardPoint === 0 ||
      rewardpoints?.rewardPoint === undefined
    ) {
      return;
    }
    if (redeempoint.length == 1 && item.target.value === "") {
      setredeemamount("");
      setredeempoint("");
      setpoint(rewardpoints.totalRewardPoints);
      setamount(objamount);
      return;
    }
    objpoint = objpoint > 0 ? parseInt(objpoint) : objpoint;
    //chck if entered value is lessthan total reward point
    if (objpoint > rewardpoints?.totalRewardPoints) {
      return;
    }

    //check entered amount is less than cart sub total
    if ((objpoint / rewardvalue).toFixed(1) > cartsubtotal.toFixed(1)) {
      return;
    }

    if (
      parseFloat((objpoint / rewardvalue).toFixed(1)) >
      subTotalWithDiscount - 1
    ) {
      return;
    }

    if (objpoint === 0) {
      setredeemamount("");
      setredeempoint("");
    } else if (objPointOnLastDigitClear > 0) {
      setpoint(objTotalRewardpoint);
      setamount((objTotalRewardpoint / rewardvalue).toFixed(2));
      setredeemamount("");
      setredeempoint("");
    } else {
      setpoint(objTotalRewardpoint - objpoint);
      setamount(((objTotalRewardpoint - objpoint) / rewardvalue).toFixed(2));
      setredeemamount(+(objpoint / rewardvalue).toFixed(2));
      setredeempoint(objpoint);
    }
  };

  const onClickRewardClear = () => {
    if (redeemamount > 0 && redeempoint > 0) {
      setredeemamount(0);
      setredeempoint(0);
      CustomerServices.checkCustomerRewardPointsLocationBase(
        restaurantinfo?.restaurantId as number,
        userinfo?.customerId as number,
        0,
        "0",
        restaurantinfo?.defaultlocationId as number
      ).then((response) => {
        if (response?.status == 1 && userinfo) {
          let rewards = {
            rewardvalue: rewardvalue,
            rewardamount: (
              (rewardpoints.totalRewardPoints
                ? rewardpoints.totalRewardPoints
                : userinfo.totalRewardPoints) /
                rewardvalue -
              0
            ).toFixed(2),
            rewardPoint:
              (rewardpoints.totalRewardPoints
                ? rewardpoints.totalRewardPoints
                : userinfo.totalRewardPoints) - 0,
            totalRewardPoints: rewardpoints.totalRewardPoints
              ? rewardpoints.totalRewardPoints
              : userinfo.totalRewardPoints,
            redeemPoint: 0,
          };

          setpoint(rewards.rewardPoint);
          setamount(rewards.rewardamount);
          dispatch(setrewardpoint(rewards as any));
          dispatch(
            carttotaldata({
              cartsessionId: sessionid as string,
              locationId: restaurantinfo?.defaultlocationId as number,
              restaurantId: restaurantinfo?.restaurantId as number,
              customerId: userinfo.customerId,
              cartId: 0,
              rewardpoints: "0",
              redeemamount: "0",
              tipPercentage: String(carttotal?.tipPercentage),
              tipAmount: carttotal?.tipAmount,
              deliveryaddressId:
                deliveryaddressinfo?.deliveryaddressId as number,
              ordertype: ordertype,
              requestId: order?.deliveryRequestId,
              recievingTime: recievingTime as string,
              recievingMeridian: meredian as string,
              ordertimetype: orderTimeType,
              recievingDate: recievingDate,
              enableTimeSlot: enabletimeslot as boolean,
            })
          );
        }
      });
      setDisabledText(false);
    }
    if (redeemamount <= 0 && redeempoint <= 0) {
      setredeemamount(0);
      setredeempoint(0);
    }
    inputRP?.current?.focus();
  };

  const onclickrewardsubmit = () => {
    if (
      redeempoint === null ||
      redeemamount === null ||
      redeempoint === undefined ||
      redeemamount === undefined ||
      redeempoint === "" ||
      redeemamount === ""
    ) {
      return;
    }
    if (redeempoint != undefined || redeemamount != undefined) {
      if (parseFloat(redeemamount) === 0) {
        setredeemamount("");
        return;
      }
      if (redeempoint === 0 && redeemamount === 0) {
        inputRP.current.focus();
        return;
      }
      if (!validateNewuserRewardPoint()) {
        return;
      } else if (
        redeempoint <= Number(userinfo?.totalRewardPoints) &&
        redeempoint > -1
      ) {
        CustomerServices.checkCustomerRewardPointsLocationBase(
          restaurantinfo?.restaurantId as number,
          userinfo?.customerId as number,
          redeempoint,
          redeemamount,
          restaurantinfo?.defaultlocationId as number
        ).then((response) => {
          if (response?.status == 1 && userinfo) {
            let rewards = {
              rewardvalue: rewardvalue,
              rewardamount: (
                (rewardpoints.totalRewardPoints
                  ? rewardpoints.totalRewardPoints
                  : userinfo?.totalRewardPoints) /
                  rewardvalue -
                redeemamount
              ).toFixed(2),
              rewardPoint:
                (rewardpoints.totalRewardPoints
                  ? rewardpoints.totalRewardPoints
                  : userinfo.totalRewardPoints) - redeempoint,
              totalRewardPoints: rewardpoints.totalRewardPoints
                ? rewardpoints.totalRewardPoints
                : userinfo.totalRewardPoints,
              redeemPoint: redeempoint,
            };

            setpoint(rewards.rewardPoint);
            setamount(rewards.rewardamount);
            dispatch(setrewardpoint(rewards as any));
            dispatch(
              carttotaldata({
                cartsessionId: sessionid as string,
                locationId: restaurantinfo?.defaultlocationId as number,
                restaurantId: restaurantinfo?.restaurantId as number,
                customerId: userinfo.customerId,
                cartId: 0,
                rewardpoints: redeempoint,
                redeemamount: redeemamount,
                tipPercentage: String(carttotal?.tipPercentage),
                tipAmount: carttotal?.tipAmount,
                deliveryaddressId: deliveryaddressinfo?.deliveryaddressId,
                ordertype: ordertype,
                requestId: order?.deliveryRequestId,
                recievingTime: recievingTime as string,
                recievingMeridian: meredian as string,
                ordertimetype: orderTimeType,
                recievingDate: recievingDate,
                enableTimeSlot: enabletimeslot as boolean,
              })
            );
          }
          setDisabledText(true);
        });
      } else if (redeempoint > point && redeemamount > amount) {
        seterrorMessage("Reward point must be less than you have earned");
      }
    }
  };

  const handleSetDisplayRewardPoint = () => {
    if (rewardpoints !== undefined && rewardpoints !== null) {
      setamount(rewardpoints.rewardamount);
      setpoint(rewardpoints.rewardPoint);
    } else if (userinfo != undefined && userinfo) {
      setamount(userinfo.totalRewardPoints / userinfo.rewardvalue);
      setpoint(userinfo.totalRewardPoints);
    }
  };

  const validateNewuserRewardPoint = () => {
    // if (customerOrderCount == 0 && minOrderAmount !== '' && parseFloat(subTotalWithDiscount) < parseFloat(minOrderAmount)) {
    if (
      customerOrderCount == 0 &&
      minOrderAmount !== "" &&
      cartsubtotal < Number(minOrderAmount)
    ) {
      handleNotify(
        `Minimum order for food items is ${carttotal?.currencySymbol}${minOrderAmount}. Please add more items.`,
        ToasterPositions.TopRight,
        ToasterTypes.Error
      );
      return false;
    } else return true;
  };

  return {
    point,
    amount,
    redeemamount,
    redeempoint,
    handleInitialPoint,
    onchangerewardamount,
    onchangerewardpoint,
    onclickrewardsubmit,
    disabledText,
    errorMessage,
    onClickRewardClear,
    handleSetDisplayRewardPoint,
    validateNewuserRewardPoint,
    maxRedeemAmount,
    totalRewardAmount,
  };
};

export default useRewardPoint;

// "use client";

// import React from "react";
// import { useReduxData } from "@/components/customhooks/useredux-data-hooks";

// const UseRewardPoint: React.FC = () => {
//   const { userinfo, rewardpoints } = useReduxData();

//   const totalPoints = userinfo?.totalRewardPoints ?? 0;
//   const rewardAmount = rewardpoints?.rewardamount ?? 0;

//   return (
//     <h1>
//       You have {totalPoints} reward points, worth ${rewardAmount.toFixed(2)}.
//     </h1>
//   );
// };

// export default UseRewardPoint;
