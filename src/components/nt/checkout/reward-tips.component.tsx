import React, { useEffect, useRef } from "react";
import DriverTip from "./tips/driver-tip.component";
import useTipValue from "../../customhooks/use-tip-hook";
import useRewardPoint from "../../customhooks/userewardpoint-hook";
import {
  calulateTotal,
  GetCurrency,
  ORDER_TYPE,
  ORDERTYPE,
} from "../../common/utility";
import useUtility from "../../customhooks/utility-hook";
import useFutureOrder from "../../customhooks/usefuture-order-hook";
import { shallowEqual } from "react-redux";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { CartTotal } from "@/types/cart-types/cartservice.type";
import { clearredeempoint } from "../../../../redux/rewardpoint/rewardpoint.slice";
import { carttotaldata } from "../../../../redux/cart/cart.slice";
import RewardPoint from "./reward-point.component";

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
  const inputRP = useRef(null);
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
  } = useTipValue(true, carttotal as CartTotal, false, true);
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
  } = useRewardPoint(carttotal as CartTotal, inputRP);

  const totalprice = useAppSelector(
    ({ cart }) =>
      cart.cartitemdetail?.cartDetails?.cartItemDetails?.reduce(
        (sum, item) => sum + (item?.totalprice || 0),
        0
      ),
    shallowEqual
  );

  const totalQty = useAppSelector(
    ({ cart }) =>
      cart.cartitemdetail?.cartDetails?.cartItemDetails?.reduce(
        (sum, item) => sum + (item?.qty || 0),
        0
      ),
    shallowEqual
  );

  useEffect(() => {
    handleInitialPoint();
  }, [customerId]);

  useEffect(() => {
    //debugger;
    if (carttotal != undefined && carttotal != null) {
      if (
        carttotal?.tipPercentage !== undefined &&
        carttotal?.tipPercentage > 0
      ) {
        //debugger
        let data = [];
        tipdata?.forEach((element) => {
          if (parseFloat(element.text) == carttotal.tipPercentage) {
            if (isDefaulttip) {
              element.value = true;
            }
            data.push(element);
            settipdatanew(data as any);
            // TIP DESELECT NO CLEAR BUG
            let isCalTip = tipdata.some((item) => item.value === true);
            if (isCalTip) {
              tipText = Number(element.text);
              let subTotal = calulateTotal(cartdata as any);
              tipamountcal = calculateTip(element.text, subTotal) as number;
              settipamount(tipamountcal);
            }
          } else {
            data.push(element);
            settipamount(data as any);
          }
        });
      } else {
        //debugger
        let data = [];
        tipdata?.forEach((element) => {
          if (parseFloat(element.text) === 15 && isDefaulttip === true) {
            element.value = true;
            data.push(element);
            settipdatanew(data as any);
            tipText = Number(element.text);
            let subTotal = calulateTotal(cartdata as any);
            tipamountcal = calculateTip(element.text, subTotal) as number;
            settipamount(tipamountcal);
            settipvalue(tipamountcal);
          } else {
            data.push(element);
            settipdatanew(data as any);
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
    const subTotal = calulateTotal(cartdata as any);
    if (
      customerOrderCount == 0 &&
      minOrderAmount !== "" &&
      subTotal < Number(minOrderAmount) &&
      (carttotal?.reedemAmount as number) > 0
    ) {
      (document.querySelector(".reward-clear") as HTMLElement)?.click();
    } else {
      //debugger;
      dispatch(
        carttotaldata({
          cartsessionId: sessionId as string,
          locationId: restaurantinfo?.defaultlocationId as number,
          restaurantId: restaurantinfo?.restaurantId as number,
          customerId: customerId,
          cartId: 0,
          rewardpoints: String(carttotal?.reedemPoints),
          redeemamount: String(carttotal?.reedemAmount),
          tipPercentage: enableTip && isRewardTip ? String(tipText) : "0",
          tipAmount: tipText === 0 ? (tipamount as number) : tipamountcal,
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

  // useEffect(() => {
  //     if (carttotal) {
  //         let data = tipdata.map((element) => {
  //             // Check if the current tip matches the cart's tip percentage
  //             if (carttotal.tipPercentage && parseFloat(element.text) === carttotal.tipPercentage) {
  //                 if (isDefaulttip) {
  //                     element.value = true;
  //                 }
  //                 // Calculate tip if any tip is selected
  //                 if (tipdata.some((item) => item.value)) {
  //                     tipText = element.text;
  //                     const subTotal = calulateTotal(cartdata);
  //                     tipamountcal = calculateTip(element.text, subTotal);
  //                     settipamount(tipamountcal);
  //                 }
  //             } else if (parseFloat(element.text) === 15 && isDefaulttip) {
  //                 // Default tip percentage logic
  //                 element.value = true;
  //                 tipText = element.text;
  //                 const subTotal = calulateTotal(cartdata);
  //                 tipamountcal = calculateTip(element.text, subTotal);
  //                 settipamount(tipamountcal);
  //                 settipvalue(tipamountcal);
  //             }

  //             return element; // Ensure modified element is returned
  //         });

  //         settipdatanew(data);

  //         // Redeem value calculation and validation
  //         let reddemValue = (rewardpoints.redeemPoint / rewardpoints.rewardvalue).toFixed(2);
  //         if (reddemValue > 0 && parseFloat(reddemValue) > parseFloat(carttotal.subTotal)) {
  //             dispatch(clearReedemPoint());
  //         }

  //         // Minimum order amount validation
  //         const subTotal = calulateTotal(cartdata);
  //         if ( customerOrderCount === 0 && minOrderAmount && parseFloat(subTotal) < parseFloat(minOrderAmount) && carttotal.reedemAmount > 0 ) {
  //             document.querySelector(".reward-clear")?.click();
  //         } else {
  //             dispatch(carttotaldata(sessionId, restaurantinfo.defaultlocationId, restaurantinfo.restaurantId, customerId, 0, carttotal.reedemPoints, carttotal.reedemAmount, enableTip && isRewardTip ? parseInt(tipText) : 0, tipText === 0 ? tipamount : tipamountcal, pickupordelivery === ORDERTYPE.Delivery ? deliveryaddressinfo?.deliveryaddressId : 0, ordertype, order?.deliveryRequestId, recievingTime, meredian, orderTimeType, recievingDate, enabletimeslot));
  //         }
  //     }

  // }, [grandtotal, deliveryaddressinfo?.deliveryaddressId, totalItemCount,  cartdata?.cartDetails?.cartTotal?.subTotal, userinfo?.customerId, userinfo?.phone,order?.checktime, cartItemsAmountTotal,cartItemsQuantity]);

  //   const handleClickTipWarningContinue = () => {
  //     const selectedTip = tipdatanew.find((tipObj) => tipObj?.value === true);
  //     if (selectedTip) {
  //       addtipclick(selectedTip, false);
  //     }

  //     const minTipValue = calculateTip(
  //       restaurantinfo?.defaultLocation?.minTipPercentage,
  //       carttotal?.subTotal
  //     );
  //     settipamount(minTipValue);
  //     let reedemPoints = carttotal?.reedemPoints;
  //     let reedemAmount = carttotal?.reedemAmount;
  //     dispatch(
  //       carttotaldata({
  //         cartsessionId: sessionId as string,
  //         locationId: restaurantinfo?.defaultlocationId as number,
  //         restaurantId: restaurantinfo?.restaurantId as number,
  //         customerId: customerId,
  //         cartId: 0,
  //         rewardpoints: String(reedemPoints),
  //         redeemamount: String(reedemAmount),
  //         tipPercentage: "0",
  //         tipAmount: minTipValue as number,
  //         deliveryaddressId: deliveryaddressinfo?.deliveryaddressId,
  //         ordertype: ordertype as any,
  //         requestId: order?.deliveryRequestId,
  //         recievingTime: recievingTime as string,
  //         recievingMeridian: meredian as string,
  //         ordertimetype: orderTimeType,
  //         recievingDate: recievingDate,
  //         enableTimeSlot: enabletimeslot as boolean,
  //       })
  //     );

  //     // if (deliveryService === DELIVERYSERVICES.UBEREATS && displayUberTime && pickupordelivery === ORDER_TYPE.DELIVERY.text) {
  //     //     handleClickUberPopup(paymentType)
  //     // } else {
  //     //     handleClickPlaceOrder(paymentType)
  //     // }
  //   };

  return (
    <>
      {userinfo !== null &&
        restaurantinfo?.defaultLocation.enableRewardPoint &&
        isRewardTip && (
          <RewardPoint
            point={point}
            currency={currency}
            disabledText={disabledText}
            inputRP={inputRP}
            amount={amount}
            maxRedeemAmount={maxRedeemAmount}
            redeemamount={redeemamount}
            redeempoint={redeempoint}
            totalRewardAmount={totalRewardAmount}
            subTotalWithDiscount={carttotal?.subTotalWithDiscount}
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
          tipamount={tipamount}
          tipdatanew={tipdatanew}
          tipdata={tipdata}
          onchangetipamount={onchangetipamount}
          tipOnBlur={tipOnBlur}
          addtipclick={addtipclick}
        />
      )}
    </>
  );
};
export default RewardPointAndTips;
