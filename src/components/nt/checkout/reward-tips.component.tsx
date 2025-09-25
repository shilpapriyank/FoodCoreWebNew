import React, { RefObject, useEffect, useRef } from "react";
import DriverTip from "./tips/driver-tip.component";
import useTipValue from "../../customhooks/use-tip-hook";
import useRewardPoint from "../../customhooks/userewardpoint-hook";
import { calulateTotal, GetCurrency, ORDER_TYPE } from "../../common/utility";
import useUtility from "../../customhooks/utility-hook";
import useFutureOrder from "../../customhooks/usefuture-order-hook";
import { shallowEqual } from "react-redux";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  CartDetailOfCartTotal,
  CartItemDetails,
  CartTotal,
} from "@/types/cart-types/cartservice.type";
import { clearredeempoint } from "../../../../redux/rewardpoint/rewardpoint.slice";
import { carttotaldata } from "../../../../redux/cart/cart.slice";
import RewardPoint from "./rewardpoint/reward-point.component";
import { TipObjectType } from "@/types/usetip-types/usetiphook.type";

const RewardPointAndTips = () => {
  const {
    restaurantinfo,
    userinfo,
    cart,
    sessionid,
    rewardpoints,
    selecteddelivery,
    order,
    deliveryaddress,
    main,
    orderTimeType,
    recievingTime,
    meredian,
    cartItemsAmountTotal,
    cartItemsQuantity,
  } = useReduxData();
  let sessionId = sessionid;
  let carttotal = cart?.carttotal && cart.carttotal;
  const pickupordelivery = selecteddelivery.pickupordelivery;
  const deliveryaddressinfo = selecteddelivery?.selecteddeliveryaddress;
  const inputRP = useRef<HTMLInputElement>(null);
  const cartdata = cart?.cartitemdetail && cart?.cartitemdetail;
  let totalItemCount = cartdata?.cartDetails?.cartItemDetails?.length;

  const ordertype =
    pickupordelivery === ORDER_TYPE.DELIVERY.text
      ? ORDER_TYPE.DELIVERY.value
      : ORDER_TYPE.PICKUP.value;
  const isDefaultTip = pickupordelivery === ORDER_TYPE.DELIVERY.text;
  const { isRewardTip } = useUtility();
  let tipamountcal = 0;
  let tipText = 0;
  let minOrderAmount = carttotal?.minOrderAmountForRewardPoint;
  let customerOrderCount = carttotal?.customerOrderCount;
  const location = restaurantinfo?.defaultLocation;
  const enableTip = location?.enableTip;

  let customerId = userinfo ? userinfo?.customerId : 0;
  const dispatch = useAppDispatch();

  const currency = GetCurrency();
  const {
    tipdata,
    tipdatanew,
    settipdatanew,
    calculateTip,
    isDefaulttip,
    onchangetipamount,
    settipvalue,
    settipamount,
    tipamount,
    grandtotal,
    tipOnBlur,
    addtipclick,
    tipWarningMessage,
    isTipWarning,
  } = useTipValue(true, carttotal as CartDetailOfCartTotal, false, true);
  const { recievingDate, enabletimeslot } = useFutureOrder();

  const {
    handleInitialPoint,
    errorMessage,
    disabledText,
    redeemamount,
    redeempoint,
    point,
    amount,
    onchangerewardamount,
    onchangerewardpoint,
    maxRedeemAmount,
    onclickrewardsubmit,
    onClickRewardClear,
    totalRewardAmount,
  } = useRewardPoint(
    carttotal as CartDetailOfCartTotal,
    inputRP as RefObject<HTMLInputElement>
  );

  const totalprice = useAppSelector(
    ({ cart }) =>
      cart.cartitemdetail?.cartDetails?.cartItemDetails?.reduce(
        (sum: number, item: CartItemDetails) => sum + (item?.totalprice || 0),
        0
      ),
    shallowEqual
  );

  const totalQty = useAppSelector(
    ({ cart }) =>
      cart.cartitemdetail?.cartDetails?.cartItemDetails?.reduce(
        (sum: number, item: CartItemDetails) => sum + (item?.qty || 0),
        0
      ),
    shallowEqual
  );

  useEffect(() => {
    handleInitialPoint();
  }, [customerId]);

  useEffect(() => {
    if (carttotal != undefined && carttotal != null) {
      if (
        carttotal?.tipPercentage !== undefined &&
        carttotal?.tipPercentage > 0
      ) {
        let data = [];
        tipdata?.forEach((element) => {
          if (parseFloat(element.text) == carttotal.tipPercentage) {
            if (isDefaulttip) {
              element.value = true;
            }
            data.push(element);
            settipdatanew(data);
            // TIP DESELECT NO CLEAR BUG
            let isCalTip = tipdata.some((item) => item.value === true);
            if (isCalTip) {
              tipText = Number(element.text);
              let subTotal = calulateTotal(cartdata);
              tipamountcal = calculateTip(element.text, subTotal) as number;
              settipamount(tipamountcal);
            }
          } else {
            data.push(element);
            settipamount(data as any);
          }
        });
      } else {
        let data = [];
        tipdata?.forEach((element) => {
          if (parseFloat(element.text) === 15 && isDefaulttip === true) {
            element.value = true;
            data.push(element);
            settipdatanew(data);
            tipText = Number(element.text);
            let subTotal = calulateTotal(cartdata);
            tipamountcal = calculateTip(element.text, subTotal) as number;
            settipamount(tipamountcal);
            settipvalue(tipamountcal);
          } else {
            data.push(element);
            settipdatanew(data);
          }
        });
      }
    }
    let reddemValue = (
      rewardpoints.redeemPoint / rewardpoints?.rewardvalue
    ).toFixed(2);
    if (Number(reddemValue) > 0) {
      if (parseFloat(reddemValue) > Number(carttotal?.subTotal)) {
        dispatch(clearredeempoint());
      }
    }
    const subTotal = calulateTotal(cartdata);
    if (
      carttotal &&
      customerOrderCount == 0 &&
      minOrderAmount !== "" &&
      parseFloat(subTotal) < parseFloat(minOrderAmount as string) &&
      Number(carttotal.reedemAmount) > 0
    ) {
      (document.querySelector(".reward-clear") as HTMLElement)?.click();
    } else {
      dispatch(
        carttotaldata({
          cartsessionId: sessionId as string,
          locationId: restaurantinfo?.defaultlocationId as number,
          restaurantId: restaurantinfo?.restaurantId as number,
          customerId: customerId,
          cartId: 0,
          rewardpoints: carttotal?.reedemPoints,
          redeemamount: carttotal?.reedemAmount,
          tipPercentage: enableTip && isRewardTip ? String(tipText) : "0",
          tipAmount: tipText === 0 ? (tipamount as number) : tipamountcal,
          deliveryaddressId: deliveryaddressinfo?.deliveryaddressId,
          ordertype: ordertype,
          requestId: order?.deliveryRequestId,
          recievingTime: recievingTime as string,
          recievingMeridian: meredian as string,
          ordertimetype: orderTimeType,
          recievingDate: recievingDate as string,
          enableTimeSlot: enabletimeslot as boolean,
        })
      );
    }
  }, [
    grandtotal,
    deliveryaddressinfo?.deliveryaddressId,
    totalItemCount,
    cartdata?.cartDetails?.cartTotal?.subTotal,
    userinfo?.customerId,
    userinfo?.phone,
    order?.checktime,
    totalprice || totalQty,
  ]);

  return (
    <>
      {userinfo !== null &&
        restaurantinfo?.defaultLocation.enableRewardPoint &&
        isRewardTip && (
          <RewardPoint
            point={point}
            currency={currency as string}
            disabledText={disabledText}
            inputRP={inputRP as RefObject<HTMLInputElement>}
            amount={amount}
            maxRedeemAmount={maxRedeemAmount as string}
            redeemamount={redeemamount}
            redeempoint={redeempoint}
            totalRewardAmount={totalRewardAmount}
            subTotalWithDiscount={carttotal?.subTotalWithDiscount as number}
            onchangerewardamount={onchangerewardamount}
            onchangerewardpoint={onchangerewardpoint}
            onclickrewardsubmit={onclickrewardsubmit}
            onClickRewardClear={onClickRewardClear}
            errorMessage={errorMessage}
          />
        )}
      {restaurantinfo?.defaultLocation?.enableTip && isRewardTip && (
        <DriverTip
          pickupordelivery={pickupordelivery}
          tipWarningMessage={tipWarningMessage}
          tipamount={tipamount as string}
          tipdatanew={tipdatanew}
          tipdata={tipdata as TipObjectType[]}
          onchangetipamount={onchangetipamount}
          tipOnBlur={tipOnBlur}
          addtipclick={addtipclick}
        />
      )}
    </>
  );
};
export default RewardPointAndTips;
