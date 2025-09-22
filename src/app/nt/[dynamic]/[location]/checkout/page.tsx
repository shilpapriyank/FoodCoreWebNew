"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import { useAppDispatch } from "../../../../../../redux/hooks";
import { useParams, useRouter } from "next/navigation";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { ORDER_TYPE } from "@/components/nt/common/utility";
import useFutureOrder from "@/components/customhooks/usefuture-order-hook";
import useUtility from "@/components/customhooks/utility-hook";
import { OrderServices } from "../../../../../../redux/order/order.services";
import { DeliveryAddressInfo } from "@/components/default/Common/dominos/helpers/types/utility-type";
import {
  checkOrderTime,
  emptyordertime,
  isasap,
  setordertime,
} from "../../../../../../redux/order/order.slice";
import Layout from "@/components/nt/layout/layout";
import YourInfo from "@/components/nt/checkout/your-info.component";
import CartItemsDetailComponent from "@/components/nt/checkout/cart-items-details.component";
import { RelatedItemsList } from "@/components/nt/common/related-items/related-items-list";
import { OrderPreparationDetail } from "@/components/nt/category/category-sidebar/order-preparation-detail.component";
import Instructions from "@/components/nt/checkout/instructions.component";
import OrderTotalDetails from "@/components/nt/category/category-sidebar/order-total-details.component";
import CartPaymentButton from "@/components/nt/checkout/cart-payment-button";
import RewardPointAndTips from "@/components/nt/checkout/reward-tips.component";

const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useParams();
  const { dynamic } = params;
  const {
    userinfo,
    cart,
    restaurantinfo,
    order,
    rewardpoints,
    session,
    selecteddelivery,
    deliveryaddress,
    main,
    recievingTime,
    meredian,
    orderTimeType,
  } = useReduxData();
  const restaurantWindowTime = main.restaurantWindowTime;
  const pickupWindow =
    restaurantWindowTime &&
    restaurantWindowTime.pickupTime &&
    restaurantWindowTime.pickupTime;
  const deliveryWindow =
    restaurantWindowTime &&
    restaurantWindowTime.deliveryTime &&
    restaurantWindowTime.deliveryTime;
  const defaultLocation = restaurantinfo
    ? restaurantinfo.defaultLocation
    : null;
  const [timeErrorMessage, settimeErrorMessage] = useState<string>("");
  const pickupordelivery = selecteddelivery.pickupordelivery;
  const deliveryaddressinfo = selecteddelivery?.selecteddeliveryaddress;
  const tempDeliveryAddress = deliveryaddress?.tempDeliveryAddress;
  const isSchoolProgramEnabled = restaurantinfo?.isSchoolProgramEnabled;
  const ordertype =
    pickupordelivery === ORDER_TYPE.PICKUP.text
      ? ORDER_TYPE.PICKUP.value
      : ORDER_TYPE.DELIVERY.value;
  let selectedAddress =
    userinfo === null
      ? tempDeliveryAddress
      : selecteddelivery?.selecteddeliveryaddress;
  const { deliveryRequestId } = order;
  const { futureDate, isFutureOrder, timeSlot, recievingDate, enabletimeslot } =
    useFutureOrder();
  const { isDisplayPrice, isRewardTip } = useUtility();
  const [errormessage, seterrormessage] = useState<string>("");
  const orderTime = useMemo(() => order?.checktime, [order?.checktime]);

  useEffect(() => {
    if (order?.checktime === "") {
      settimeErrorMessage("Please select order timming");
    } else {
      settimeErrorMessage("");
    }
    if (
      order?.deliveryRequestId === "" ||
      pickupordelivery === ORDER_TYPE.PICKUP.text
    ) {
      if (
        ((defaultLocation?.istakeaway === true &&
          pickupWindow &&
          pickupWindow.length > 0) ||
          (defaultLocation?.isdelivery === true &&
            deliveryWindow &&
            deliveryWindow.length > 0)) &&
        selecteddelivery?.pickupordelivery !== ""
      ) {
        if (order.isasap === true && order.checktime !== "") {
          OrderServices.getOrderTiming({
            restaurantId: restaurantinfo?.restaurantId as number,
            locationId: restaurantinfo?.defaultLocation.locationId as number,
            ordertype: ordertype,
            obj: selectedAddress as any,
            requestId: deliveryRequestId,
          }).then((gettimeresponse) => {
            if (gettimeresponse?.result) {
              if (gettimeresponse.result?.time) {
                let time = gettimeresponse.result.time.split(" ");
                OrderServices.checkOrderTime({
                  restaurantId: restaurantinfo?.restaurantId as number,
                  locationId: restaurantinfo?.defaultLocation
                    .locationId as number,
                  recievingTime: time[0],
                  recieving: time[1],
                  flg: ordertype,
                  obj: selectedAddress as any,
                  requestId: deliveryRequestId,
                }).then((response) => {
                  if (
                    response.result.message &&
                    response.result.message.length > 0 &&
                    response.result.status !== "success"
                  ) {
                    settimeErrorMessage(response.result.message);
                    dispatch(emptyordertime());
                    return;
                  }
                  if (
                    response.result != undefined &&
                    response.result !== null
                  ) {
                    if (response.result?.status === "success") {
                      let newtime = time[0] + " " + time[1];
                      dispatch(setordertime(newtime));
                    } else {
                    }
                    settimeErrorMessage("");
                    dispatch(isasap(true));
                  }
                });
              }
            }
          });
        }
        if (order.isasap === false && order.checktime !== "") {
          //ENABLE TIMESLOT NEED TO CALL THE DIFFERENT API
          if (defaultLocation?.enableTimeSlot) {
            OrderServices.checkTimeBySlot({
              restaurantId: restaurantinfo?.restaurantId as number,
              locationId: defaultLocation.locationId,
              recievingTime: "",
              recieving: "",
              flg: ordertype,
              obj: selectedAddress as any,
              requestId: deliveryRequestId,
              timeSlot: order?.checktime,
              date: futureDate,
            }).then((response) => {
              if (response.result != undefined && response.result !== null) {
                if (response.result.status !== "success") {
                  settimeErrorMessage(response.result.message);
                }
                if (response.result.status === "success") {
                  settimeErrorMessage("");
                }
              }
            });
          } else {
            let time = order.checktime.split(" ");
            let newtime = time[0].split(":");
            OrderServices.checkOrderTime({
              restaurantId: restaurantinfo?.restaurantId as number,
              locationId: defaultLocation.locationId,
              recievingTime: newtime[0] + ":" + newtime[1],
              recieving: time[1],
              flg: ordertype,
              obj: selectedAddress as any,
              requestId: deliveryRequestId,
            }).then((response) => {
              if (response.result != undefined && response.result !== null) {
                if (response.result.status !== "success") {
                  settimeErrorMessage(response.result.message);
                }
                if (response.result.status === "success") {
                  settimeErrorMessage("");
                }
              }
            });
          }
        }
      }
    }
  }, [order.isasap, orderTime]);

  useEffect(() => {
    //if b2b restaurant
    if (isSchoolProgramEnabled && order?.checktime === "") {
      // dispatch(setpickupordelivery(ORDER_TYPE.PICKUP.text));
      OrderServices.getOrderTime({
        restaurantId: restaurantinfo?.restaurantId as number,
        locationId: restaurantinfo.defaultlocationId as number,
        ordertype: 1,
      }).then((response) => {
        dispatch(isasap(true));
        if (response) {
          //   dispatch({
          //     type: OrderTypes.CHECK_ORDER_TIME,
          //     payload: response?.ordertime,
          //   });
          dispatch(checkOrderTime(response.ordertime));
          dispatch(setordertime(response?.ordertime));
          return;
        }
      });
    }
  }, [userinfo?.customerId]);

  return (
    <>
      <Head>
        <title>
          Checkout || {restaurantinfo?.restaurantname}: Ordering Online
        </title>
        <meta name="description" content="Online description" />
      </Head>
      <Layout>
        <section className="categories-info">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-9 col-md-8 col-12">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-12">
                    <div className=" d-flex justify-content-between mb-1">
                      <h4 className="large-heading color-green ">
                        <strong>Checkout</strong>
                      </h4>
                    </div>

                    {userinfo === null && <YourInfo />}
                    <CartItemsDetailComponent />
                    <RelatedItemsList />
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-12 checkout-sidebar">
                <div className="sidebar">
                  {!isSchoolProgramEnabled && <OrderPreparationDetail />}
                  <div className="card totalbox mb-1 pb-1 ">
                    <Instructions />
                    <RewardPointAndTips />
                    <hr className="my-2" />
                    {isDisplayPrice && <OrderTotalDetails />}
                  </div>
                  <CartPaymentButton
                    errormessage={errormessage}
                    timeErrorMessage={timeErrorMessage}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default CheckoutPage;
