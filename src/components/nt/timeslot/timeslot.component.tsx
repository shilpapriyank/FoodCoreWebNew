"use client";

import React, { useEffect, useState } from "react";
import TimeSlotSkeletonComponent from "../skeleton/timeslot-skeleton.component";
import ButtonComponent from "../../../components/common/button.component";
import { TimeSlotPillComponent } from "./timeslot-pill.component";
import "swiper/swiper-bundle.css";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { OrderServices } from "../../../../redux/order/order.services";
import { ORDER_TYPE, GetThemeDetails, getAsapLaterOnState, orderDisable, OrderType } from "../../common/utility";
import { emptyordertime, isasap, setFutureOrderDay, setordertime } from "../../../../redux/order/order.slice";
import { useDispatch } from "react-redux";
import {
  AsapLaterOnState,
  FutureOrderDay,
  OrderDisableData,
  TimeSlot,
  TimeSlotPopupComponentProps,
} from "@/types/timeslot-types/timeslot.types";
import { AppDispatch, RootState } from "../../../../redux/store";
import { RestaurantWindowTime } from "@/types/utility-types/utility.types";
import { useAppDispatch } from "../../../../redux/hooks";
import { OrderTypes } from "../../../../redux/order/order.type";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { setpickupordelivery } from "../../../../redux/selected-delivery-data/selecteddelivery.slice";
import { LocationServices } from "../../../../redux/location/location.services";
import { restaurantsdetail } from "../../../../redux/restaurants/restaurants.slice";
import {
  getLocationIdFromStorage,
  setLocationIdInStorage,
} from "@/components/common/localstore";
import { clearRedux } from "../../../../redux/clearredux/clearredux.slice";
import { createSessionId } from "../../../../redux/session/session.slice";
import {
  getSelectedRestaurantTime,
  refreshCategoryList,
} from "../../../../redux/main/main.slice";
import {
  deleteCartItemFromSessionId,
  emptycart,
} from "../../../../redux/cart/cart.slice";
import { setintialrewardpoints } from "../../../../redux/rewardpoint/rewardpoint.slice";
import { v4 as uuidv4 } from "uuid";
import { PAGES } from "../common/pages";
import FutureDayComponent from "./future-day.component";
import { DefaultLocation, GetAllRestaurantInfo } from "@/types/restaurant-types/restaurant.type";
import { RestaurantWindowTimeNew } from "@/types/mainservice-types/mainservice.type";
import { DeliveryAddressInput } from "../../../../redux/delivery-address/delivery-address.types";

const TimeSlotPopupComponent: React.FC<TimeSlotPopupComponentProps> = ({
  futureDateList,
  isOpenModal,
  handleToggleTimingModal,
  handleToggleTimeSlotModal,
  enablefutureordering,
  locationId,
  clearData,
  isRedirectMenu = false,
  isload,
  locationUrl,
  clearMeaage,
}) => {
  const [loadSwipe, setloadSwipe] = useState<boolean>(false);
  const {
    restaurantinfo,
    selecteddelivery,
    order,
    restaurant,
    main,
    userinfo,
    deliveryaddress,
    sessionid,
  } = useReduxData();
  const [selectedDate, setselectedDate] = useState<string>(
    order?.futureOrderDay?.futureDay ?? ""
  );
  const pickupordelivery = selecteddelivery?.pickupordelivery;
  const ordertype =
    pickupordelivery === ORDER_TYPE.DELIVERY.text
      ? ORDER_TYPE.DELIVERY.value
      : ORDER_TYPE.PICKUP.value;

  const [timeSlots, settimeSlots] = useState<TimeSlot[]>([]);
  const [loadTimeslot, setLoadTimeslot] = useState<boolean>(false);
  const [selectedTime, setselectedTime] = useState<string>(order.checktime);
  const restaurantslocationlistwithtime =
    restaurant.restaurantslocationlistwithtime;
  const addressList = restaurantslocationlistwithtime?.addressList ?? [];
  const selectedAddress =
    userinfo === null
      ? deliveryaddress?.tempDeliveryAddress
      : selecteddelivery?.selecteddeliveryaddress;
  const restaurantWindowTime = main.restaurantWindowTime;
  const defaultLocation = addressList?.find(
    (location: any) => location.locationId === locationId
  );
  const [timeOrErrorMessage, setTimeOrErrorMessage] = useState<string>("");
  const [isConfirmDisable, setisConfirmDisable] = useState<boolean>(false);
  const [orderTime, setOrderTime] = useState<string>("");
  const [currentDate, setcurrentDate] = useState<Date>();
  const [asapTime, setAsapTime] = useState<string>("");
  const [isAsap, setisAsap] = useState<boolean>(order.isasap);
  const router = useRouter();
  const selectedTheme = GetThemeDetails(restaurantinfo!.themetype);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const location = searchParams.get("location") || "";
  const dynamic = searchParams.get("dynamic") || "";
  const id = searchParams.get("id") || "";
  const category = searchParams.get("category") || "";
  const items = searchParams.get("items") || "";
  const redirectPrevPage = searchParams.get("redirectcart") === "true";
  const locationFullLink = `/${selectedTheme?.url}/${dynamic}/${locationUrl}/`;
  const dispatch = useAppDispatch();
  const asapLaterOnState: AsapLaterOnState = getAsapLaterOnState(restaurantinfo?.defaultLocation as any,
    selecteddelivery?.pickupordelivery as OrderType | any,
    restaurantWindowTime as RestaurantWindowTime | any);
  const orderDisableData: OrderDisableData = orderDisable(restaurantinfo as GetAllRestaurantInfo, selecteddelivery, restaurantWindowTime as RestaurantWindowTimeNew[] | any);
  const selectedDay: string = (order?.futureOrderDay as FutureOrderDay)?.futureDay || "";
  const [dayCloseError, setDayCloseError] = useState<string>("");

  useEffect(() => {
    let date = new Date();
    setcurrentDate(date as any);
  }, []);

  const handleClick = async (
    lid: number,
    locationUrl: string,
    isPickup: boolean
  ): Promise<void> => {
    LocationServices.changeRestaurantLocation(
      restaurantinfo?.restaurantId as number,
      lid
    ).then((res) => {
      if (res && restaurantinfo) {
        Object.keys(restaurantinfo).map((session) => {
          if (session === "defaultLocation") {
            Object.assign(restaurantinfo.defaultLocation, res);
          }
          if (session === "defaultlocationId") {
            restaurantinfo.defaultlocationId = res.locationId;
          }
        });
        dispatch(restaurantsdetail(null));
        dispatch(restaurantsdetail(restaurantinfo));
        let oldLocationId = getLocationIdFromStorage();
        if (oldLocationId !== restaurantinfo.defaultlocationId) {
          dispatch(clearRedux(false as any) as any);
          if (isPickup === true) {
            dispatch(setpickupordelivery(ORDER_TYPE.PICKUP.text));
          }
          setLocationIdInStorage(restaurantinfo.defaultlocationId);
          let id = uuidv4();
          dispatch(createSessionId(id));
          dispatch(
            refreshCategoryList({
              newselectedRestaurant: restaurantinfo,
              customerId: lid,
            }) as any
          );
          dispatch(
            getSelectedRestaurantTime({
              restaurantId: restaurantinfo.restaurantId,
              locationId: lid,
            })
          );
          if (userinfo && userinfo?.customerId) {
            deleteCartItemFromSessionId(
              sessionid,
              restaurantinfo.restaurantId,
              defaultLocation?.locationId
            );
            dispatch(emptycart() as any);
            dispatch(setintialrewardpoints(userinfo));
          }
        }
        redirectOnTimeSelected(locationUrl);
      }
    });
  };

  const redirectOnTimeSelected = (locationUrl: string): void => {
    if (pathname.includes(PAGES.DELIVERY)) {
      if (isRedirectMenu) {
        router.push(
          `/${selectedTheme?.url}/${dynamic}/${locationUrl}/${PAGES.MENU}`
        );
      } else {
        router.back();
      }
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setloadSwipe(true);
    }, 3500);
    if (
      selectedDate === "" &&
      (selectedDay === "" || selectedDay === undefined)
    ) {
      handleClickDate(futureDateList?.[0]);
    } else {
      handleClickDate(order?.futureOrderDay as any);
    }
  }, []);

  const handleClickDate = (
    day: {
      deliveryStatus?: string;
      takeoutStatus?: string;
      futureDate?: string;
      futureDay?: string;
    },
    isClose?: boolean
  ): void => {
    const isClosed =
      ordertype === ORDER_TYPE.DELIVERY.value
        ? day?.deliveryStatus === "Closed"
        : day?.takeoutStatus === "Closed";
    if (isClose || isClosed) {
      setDayCloseError(
        `${selecteddelivery.pickupordelivery} closed on ${day?.futureDate}`
      );
      dispatch(setFutureOrderDay(day as any));
      setselectedDate(day?.futureDay ?? "");
    } else {
      setDayCloseError("");
      setLoadTimeslot(true);
      setselectedDate(day?.futureDay ?? "");
      dispatch(setFutureOrderDay(day as any));
      settimeSlots([]);
      setselectedTime("");
      if (day?.futureDay !== selectedDay) {
        dispatch(emptyordertime());
      }
      const locationId = restaurantinfo?.defaultLocation?.locationId;
      const restaurantId = restaurantinfo?.restaurantId;
      if (!restaurantId || !locationId) {
        console.warn("❗ Missing restaurantId or locationId — API not called");
        return;
      }
      OrderServices.generateTimeSlot({
        restaurantId,
        locationId,
        ordertype: Number(ordertype),
        scheduleDateTime: day?.futureDate ?? "",
      }).then((res: TimeSlot[]) => {
        dispatch(isasap(false));
        settimeSlots(res);
        setLoadTimeslot(false);
      });
    }
  };

  const handleClickTimePill = (time: TimeSlot): void => {
    dispatch(isasap(false));
    setselectedTime(`${time?.StartSlotNew} - ${time?.EndSlotNew}`);
  };

  const handleTimeClick = (time: any): void => {
    OrderServices.getOrderTiming({
      restaurantId: Number(restaurantinfo?.restaurantId),
      locationId: Number(defaultLocation?.locationId),
      ordertype: Number(ordertype),
      obj: selectedAddress as DeliveryAddressInput,
      requestId: "",
    }).then((gettimeresponse) => {
      setTimeout(() => {
        if (gettimeresponse?.result) {
          if (gettimeresponse.result?.time) {
            let time = gettimeresponse.result.time.split(" ");
            let requestID;
            OrderServices.checkOrderTime({
              restaurantId: restaurantinfo?.restaurantId as number,
              locationId: defaultLocation?.locationId as number,
              recievingTime: time[0],
              recieving: time[1],
              flg: ordertype as any,
              obj: selectedAddress as DeliveryAddressInput,
              requestId: requestID as any,
            }).then((response) => {
              if (
                response.result.message &&
                response.result.message.length > 0 &&
                response.result.status !== "success"
              ) {
                setTimeOrErrorMessage(response.result.message);
                dispatch(emptyordertime());
                return;
              }
              if (response.result != undefined && response.result !== null) {
                if (response.result?.status === "success") {
                  let newtime = time[0] + " " + time[1];
                  setOrderTime(newtime);
                  dispatch(setordertime(newtime));
                  setAsapTime(newtime);
                  setisAsap(true);
                  setisConfirmDisable(false);
                  setTimeOrErrorMessage("");
                } else {
                  setTimeOrErrorMessage(response.result.message);
                }
              }
            });
          }
        }
      }, 500);
    });
  };

  const handleClickAsap = (time: TimeSlot): void => {
    dispatch(isasap(true));
    handleTimeClick(time as any);
    setselectedTime(`${time.StartSlotNew}-${time?.EndSlotNew}`);
  };

  const handleClickSchedule = (): void => {
    if (!order.isasap) {
      dispatch({
        type: OrderTypes.CHECK_ORDER_TIME,
        payload: selectedTime,
      });
    }
    redirectOnTimeSelected(locationUrl);
    handleToggleTimingModal(false);
  };

  const handleClose = (): void => {
    handleToggleTimeSlotModal?.();
    setloadSwipe(false);
  };

  return (
    <>
      <div
        className={`modal fade modal-your-order address-modal ${isOpenModal ? "show d-block" : ""
          }`}
        style={{ display: "block" }}
        id="order-time-modal"
        aria-labelledby="order-time-modal-Label"
        aria-hidden="true"
      >
        <div
          className={`modal-dialog modal-dialog-centered ${true ? "modal-dialog-scrollable" : ""
            }`}
        >
          <div className="modal-content pb-0">
            <h5 className="modal-title" id="login-modal-Label">{`Schedule ${ordertype === ORDER_TYPE.DELIVERY.value
              ? ORDER_TYPE.DELIVERY.text
              : ORDER_TYPE.PICKUP.text
              }`}</h5>
            <a
              className="btn-close close-time "
              id="close-modal "
              onClick={() => handleToggleTimingModal(false)}
            ></a>
            {/* </div> */}
            {enablefutureordering && (
              <div className="row">
                <div className="col-12 pe-0 mt-2">
                  <div className="swiper-container">
                    {loadSwipe && (
                      <FutureDayComponent
                        ordertype={ordertype}
                        order={order as any}
                        selectedDate={selectedDate}
                        enablefutureordering={enablefutureordering}
                        futureDateList={futureDateList}
                        handleClickDate={handleClickDate}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
            <div
              className={`modal-body ts-body ${dayCloseError !== "" ? "p-0 pb-2" : ""
                }`}
            >
              <div className="time-slot">
                <div className="row">
                  <div className="col-12 mb-2"></div>
                </div>
                {/* <div className="row">
                  {dayCloseError === '' ? <>  {
                     (asapLaterOnState.isAsap && selectedDate === "Today") &&
                    <TimeSlotPillComponent
                      time={{ StartSlotNew: "ASAP", EndSlotNew: "ASAP" }}
                      id={"C"}
                      name="ASAP - ASAP"
                      label="As Soon As Possible"
                      handleClickTimePill={handleClickAsap}
                      isDisable={asapLaterOnState.isDisableAsapLateron}
                      selectedTime={isAsap ? "ASAP - ASAP" : selectedTime}
                    />
                  }
                    {(!loadTimeslot && loadSwipe) ? <>
                      {timeSlots && timeSlots?.map((time, index) => {
                        return <>{time.StartSlotNew !== null &&
                          <TimeSlotPillComponent
                            time={time}
                            selectedTime={selectedTime || order.checktime}
                            name={`${time.StartSlotNew} - ${time.EndSlotNew}`}
                            id={`slot-${index}`}
                            handleClickTimePill={handleClickTimePill}
                            label={`${time.StartSlotNew} - ${time.EndSlotNew}`}
                            key={`A${time.StartSlotNew}-${time.EndSlotNew}`}
                          />
                        }
                        </>
                      })}
                    </> :
                      <TimeSlotSkeletonComponent />
                    }
                  </> : <>{<p className='red-text text-center p-0'>{dayCloseError}</p>}</>}
                </div> */}
                <div className="row">
                  {dayCloseError === '' ? (
                    <>
                      {(asapLaterOnState.isAsap && selectedDate === "Today") && (
                        <>
                          {/* {console.log("✅ Showing ASAP TimeSlotPillComponent")} */}
                          <TimeSlotPillComponent
                            time={{ StartSlotNew: "ASAP", EndSlotNew: "ASAP" }}
                            id={"C"}
                            name="ASAP - ASAP"
                            label="As Soon As Possible"
                            handleClickTimePill={handleClickAsap}
                            isDisable={asapLaterOnState.isDisableAsapLateron}
                            selectedTime={isAsap ? "ASAP - ASAP" : selectedTime}
                          />
                        </>
                      )}

                      {(!loadTimeslot && loadSwipe) ? (
                        <>
                          {Array.isArray(timeSlots) && timeSlots?.map((time, index) => {
                            return (
                              time.StartSlotNew !== null && (
                                <TimeSlotPillComponent
                                  key={`A${time.StartSlotNew}-${time.EndSlotNew}`}
                                  time={time}
                                  selectedTime={selectedTime || order.checktime}
                                  name={`${time.StartSlotNew} - ${time.EndSlotNew}`}
                                  id={`slot-${index}`}
                                  handleClickTimePill={handleClickTimePill}
                                  label={`${time.StartSlotNew} - ${time.EndSlotNew}`}
                                />
                              )
                            );
                          })}
                        </>
                      ) : (
                        <TimeSlotSkeletonComponent />
                      )}
                    </>
                  ) : (
                    <>
                      <p className="red-text text-center p-0">{dayCloseError}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="row modal-footer position-sticky sticky-bottom border-top-0 footer-top-shadow">
              {order.isasap && asapTime !== "" && dayCloseError === "" && (
                <h6 className="text-center fs-5">
                  { }
                  {selectedDay},&nbsp;
                  {(order?.futureOrderDay as any)?.futureDate}, {asapTime}
                </h6>
              )}
              {!order.isasap &&
                (selectedTime !== "" || order?.checktime !== "") &&
                timeOrErrorMessage === "" &&
                dayCloseError === "" && (
                  <h6 className="text-center fs-5">
                    { }
                    {selectedDay},&nbsp;
                    {(order?.futureOrderDay as any)?.futureDate},{" "}
                    {selectedTime || order?.checktime}
                  </h6>
                )}
              {timeOrErrorMessage !== "" && (
                <h6 className="text-center red-text fs-6">
                  {timeOrErrorMessage}
                </h6>
              )}
              {orderDisableData.isorderdisable &&
                (selectedDay === "Today" || selectedDay === "") && (
                  <h6 className="text-center red-text fs-6">
                    {orderDisableData.errormessage}
                  </h6>
                )}
              <div className="d-grid gap-2 col-md-6 col-12 mx-auto mt-2">
                {(selectedTime === "" && order?.checktime === "") ||
                  dayCloseError !== "" ? (
                  <ButtonComponent
                    classname=" btn-default btn-orange opacity-50 no-drop"
                    textName="Schedule"
                    isDisable={selectedTime === ""}
                  /> //Component
                ) : (
                  <ButtonComponent
                    classname=" btn-default btn-orange"
                    textName="Schedule"
                    handleClick={handleClickSchedule}
                    isDisable={false}
                  />
                )}
              </div>
              <div className="d-grid gap-2 col-md-6 col-12 mx-auto mt-2">
                <button
                  className=" btn-default btn-orange"
                  data-bs-dismiss="modal"
                  type="button"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default TimeSlotPopupComponent;
