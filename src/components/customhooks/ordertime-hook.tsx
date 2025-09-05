import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { OrderServices } from "../../../redux/order/order.services";
import { emptyordertime, setordertime } from "../../../redux/order/order.slice";

const useOrderTime = (data: any, ordertype: any) => {
  const [timeOrErrorMessage, setTimeOrErrorMessage] = useState("");
  const restaurantinfo = useSelector(
    ({ restaurant }: { restaurant: any }) => restaurant.restaurantdetail,
    shallowEqual
  );
  const { defaultLocation } = restaurantinfo;
  const [isTimeDisplay, setisTimeDisplay] = useState(true);
  const dispatch = useDispatch();

  function resetTimeError(value: any) {
    setTimeOrErrorMessage(value);
  }
  function CheckOrderTime(
    time: any,
    meridian: any,
    timeType: any,
    slectedtime: any,
    target: any
  ) {
    OrderServices.checkOrderTime({
      restaurantId: restaurantinfo?.restaurantId,
      locationId: defaultLocation?.locationId,
      recievingTime: time,
      recieving: meridian,
      obj: ordertype,
    }).then((response: any) => {
      if (
        response.result.message &&
        response.result.message.length > 0 &&
        response.result.status !== "success"
      ) {
        setTimeOrErrorMessage(response.result.message);
        dispatch(emptyordertime());
        // setisConfirmDisable(true)
        // console.log(response)
        return;
      }
      if (response.result != undefined && response.result !== null) {
        if (response.result?.status === "success") {
          setisTimeDisplay(true);
          if (timeType === "Asap") {
            dispatch(setordertime(data?.result?.standarddatetime));
          } else {
            dispatch(setordertime(slectedtime));
          }
          //   setisConfirmDisable(false)
          setTimeOrErrorMessage("");
          setTimeout(() => {
            $(`.${target}`)[0].click();
          }, 1000);
        } else {
          setTimeOrErrorMessage(response.result.message);
          //   setisConfirmDisable(true)
        }
      }
    });
  }
  return {
    timeOrErrorMessage,
    CheckOrderTime,
    resetTimeError,
    isTimeDisplay,
    setisTimeDisplay,
  };
};

export default useOrderTime;
