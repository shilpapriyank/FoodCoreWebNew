import React from "react";
import { useReduxData } from "./useredux-data-hooks";

const useFutureOrder = () => {
  const { restaurantinfo, order } = useReduxData();
  const locationinfo = restaurantinfo?.defaultLocation;
  const futureDate = locationinfo?.enablefutureordering
    ? order?.futureOrderDay?.fullDay
    : "";
  const isFutureOrder = locationinfo?.enablefutureordering;
  const enabletimeslot = locationinfo?.enabletimeslot;
  const timeSlot =
    locationinfo?.enabletimeslot && !order?.isasap ? order?.checktime : "";
  const recievingDate = futureDate;
  const futureDay = order?.futureOrderDay;
  const futureDays = locationinfo?.futureOrderingDayDates ?? [];

  return {
    locationinfo,
    futureDate,
    isFutureOrder,
    timeSlot,
    recievingDate,
    futureDay,
    enabletimeslot,
    futureDays,
  };
};

export default useFutureOrder;
