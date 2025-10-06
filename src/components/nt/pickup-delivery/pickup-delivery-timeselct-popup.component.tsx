"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  emptyordertime,
  isasap,
  setordertime,
} from "../../../../redux/order/order.slice";
import { OrderServices } from "../../../../redux/order/order.services";
import { restaurantsdetail } from "../../../../redux/restaurants/restaurants.slice";
import {
  getLocationIdFromStorage,
  setLocationIdInStorage,
} from "@/components/common/localstore";
import { v4 as uuidv4 } from "uuid";
import { MonthList } from "../common/utility";
import { AsapLateronButtonComponent } from "./asap-lateron-button.component";
import { createSessionId } from "../../../../redux/session/session.slice";
import { deleteCartItemFromSessionId } from "../../../../redux/cart/cart.slice";
import PickupdeliveryWindowTime from "./pickup/pickup-delivery-window.component";
import { setpickupordelivery } from "../../../../redux/selected-delivery-data/selecteddelivery.slice";
import { LocationServices } from "../../../../redux/location/location.services";
import {
  DELIVERYSERVICES,
  GetThemeDetails,
  ORDER_TYPE,
  checkWindowTimeExpires,
  getAsapLaterOnState,
  getOrderTypeFromText,
} from "../../common/utility";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import handleNotify from "../../default/helpers/toaster/toaster-notify";
import { ERRORMESSAGE } from "../../common/commonerrormessage";
import { ToasterPositions } from "../../default/helpers/toaster/toaster-positions";
import { ToasterTypes } from "../../default/helpers/toaster/toaster-types";
import { RestaurantsServices } from "../../../../redux/restaurants/restaurants.services";
import { DELIVERYPAGEMESSAGE } from "../helpers/static-message/delivery-message";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../redux/hooks";
import {
  DefaultLocation,
  GetAllRestaurantInfo,
} from "@/types/restaurant-types/restaurant.type";
import {
  AddressList,
  DeliveryTime,
  PickupTime,
} from "@/types/location-types/location.type";
import { AsapLaterOnState } from "@/types/timeslot-types/timeslot.types";
import { RestaurantWindowTime } from "@/types/mainservice-types/mainservice.type";
import DateTimePickerWrapper from "@/components/common/datetimepicker-wrapper.component";
import {
  ASAP_LATER_BTN_ENUM,
  MERIDIEM_TIME_ENUM,
} from "@/components/common/enums";
import {
  AddressListType,
  ObjTypeForVerifyDeliveryAddressType,
} from "../../../../redux/delivery-address/delivery-address.types";
import { StripeIssuingCardCopyButtonElement } from "@stripe/stripe-js";

interface PickupDeliveryTimeSelectPopupProps {
  isOpenModal: boolean;
  handleToggleTimingModal: (value: boolean) => void;
  isRedirectMenu?: boolean;
  locationId: number;
  isload?: boolean;
  locationUrl?: string;
  clearMeaage?: () => void;
  clearData?: boolean;
}

const PickupDeliveryTimeSelectPopup: React.FC<
  PickupDeliveryTimeSelectPopupProps
> = ({
  isOpenModal,
  handleToggleTimingModal,
  clearData,
  isRedirectMenu = false,
  locationId,
  isload,
  locationUrl,
  clearMeaage,
}) => {
  const {
    restaurantinfo,
    sessionid,
    restaurant,
    selecteddelivery,
    userinfo,
    order,
    main,
    deliveryaddress,
  } = useReduxData();
  const dispatch = useAppDispatch();
  let load = false;
  const router = useRouter();
  const selectedTheme = GetThemeDetails(restaurantinfo!.themetype);
  const searchParams = useSearchParams();
  const dynamic = searchParams.get("dynamic") ?? "";
  const location = searchParams.get("location") ?? "";
  const id = searchParams.get("id") ?? "";
  const category = searchParams.get("category") ?? "";
  const items = searchParams.get("items") ?? "";
  let locationFullLink =
    "/" + selectedTheme?.url + "/" + dynamic + "/" + location + "/";
  let locationHrefLink = `/${selectedTheme?.url}/[dynamic]/[location]/`;
  const restaurantslocationlistwithtime =
    restaurant.restaurantslocationlistwithtime;
  const addressList = restaurantslocationlistwithtime.addressList ?? [];
  const pickupordelivery = selecteddelivery?.pickupordelivery
    ? Object.keys(selecteddelivery?.pickupordelivery).length > 0
      ? selecteddelivery?.pickupordelivery
      : ""
    : "";
  const defaultLocation = addressList?.find(
    (location: AddressList) => location.locationId === locationId
  );
  const pickupWindow = defaultLocation?.pickupTime as PickupTime[];
  const deliveryWindow = defaultLocation?.deliveryTime as DeliveryTime[];
  const isTakeOutAsap = defaultLocation?.isTakeOutAsap;
  const isTakeOutPickupTime = defaultLocation?.isTakeOutPickupTime;
  const isDeliveryPickupTime = defaultLocation?.isDeliveryPickupTime;
  const isDeliveryAsap = defaultLocation?.isDeliveryAsap;
  const selecetdtime = order.checktime;
  const lastPickupTIme = pickupWindow?.length
    ? pickupWindow[pickupWindow.length - 1]
    : undefined;
  const lastDeliveryTime = deliveryWindow?.[deliveryWindow.length - 1];
  const pickupEndTime: string | undefined = lastPickupTIme?.time?.split("-")[1];
  const deliveryEndTime: string | undefined =
    lastDeliveryTime?.time?.split("-")[1];
  let selectedAsap =
    clearData === false && order.isasap === true ? true : false;
  let selectedLateron =
    clearData === false && order.isasap === false ? true : false;
  const [isAsap, setisAsap] = useState<boolean>(selectedAsap);
  const [isLaterOn, setisLaterOn] = useState<boolean>(selectedLateron);
  // const [activeButtonClass, setActiveButtonClass] = useState(
  //   clearData === false ? (order.isasap === true ? "asap" : "lateron") : ""
  // );
  const [activeButtonClass, setActiveButtonClass] =
    useState<ASAP_LATER_BTN_ENUM>(
      clearData === false
        ? order.isasap === true
          ? ASAP_LATER_BTN_ENUM.ASAP
          : ASAP_LATER_BTN_ENUM.LATER_ON
        : ASAP_LATER_BTN_ENUM.NONE
    );
  const [timeOrErrorMessage, setTimeOrErrorMessage] = useState<string>("");
  const [orderTime, setOrderTime] = useState<string>("");
  const [currentDate, setcurrentDate] = useState<Date | undefined>();
  const [isConfirmDisable, setisConfirmDisable] = useState<boolean>(false);
  const [successMessage, setsuccessMessage] = useState<string>("");
  const [selectedDate, setselectedDate] = useState<string>(
    (order?.futureOrderDay?.futureDay as string) ?? ""
  );
  const [Hour, setHour] = useState<string>("");
  const [Minute, setMinute] = useState<string>("");
  const [Meridiem, setMeridiem] = useState<MERIDIEM_TIME_ENUM>();
  const [isTimeLoad, setisTimeLoad] = useState<boolean>(false);
  const customerId = userinfo?.customerId ?? 0;
  const [defaultLoactionId, setdefaultLoactionId] = useState<number>(
    restaurantinfo?.defaultlocationId as number
  );
  var ordertype =
    selecteddelivery.pickupordelivery === ORDER_TYPE.DELIVERY.text ? 2 : 1;
  let selectedAddress =
    userinfo === null
      ? deliveryaddress?.tempDeliveryAddress
      : selecteddelivery?.selecteddeliveryaddress;
  const { deliveryService } =
    restaurantinfo?.defaultLocation as DefaultLocation;
  let hour;
  let minute;
  let meridiem;
  load = true;

  const orderType = getOrderTypeFromText(selecteddelivery?.pickupordelivery);
  if (orderType === undefined) throw new Error("Invalid order type");
  const restaurantWindowTime = main.restaurantWindowTime;
  const asapLaterOnState: AsapLaterOnState = getAsapLaterOnState(
    restaurantinfo?.defaultLocation as DefaultLocation,
    orderType,
    restaurantWindowTime as RestaurantWindowTime
  );
  const redirectPrevPage = searchParams.get("redirectcart") === "true";
  const { deliveryRequestId } = order;
  const defaultRequestId = "";
  const [isPickupWindowAvailable, setisPickupWindowAvailable] = useState(true);
  const [isDeliveryWindowAvailable, setisDeliveryWindowAvailable] =
    useState(true);
  const enablefutureordering = defaultLocation?.enablefutureordering;

  useEffect(() => {
    if (Hour === "" && !isTimeLoad) {
      if (selecetdtime !== undefined && selecetdtime !== "") {
        let time = selecetdtime.split(" ");
        let newtime = time[0].split(":");
        setHour(newtime[0]);
        setMinute(newtime[1]);
        setMeridiem(time[1] as MERIDIEM_TIME_ENUM);
        setisTimeLoad(true);
      } else {
        handleCurrentTime();
      }
    }
    if (clearData === false) {
      return;
    } else {
      setisAsap(false);
      setTimeOrErrorMessage("");
      dispatch(isasap(false));
      setActiveButtonClass(ASAP_LATER_BTN_ENUM.NONE);
      dispatch(emptyordertime());
      setisLaterOn(false);
    }
  }, [locationId]);

  useEffect(() => {
    let date = new Date();
    setcurrentDate(date as Date);
    RestaurantsServices.getCurrentTime(
      restaurantinfo?.restaurantId as number,
      restaurantinfo?.defaultlocationId as number
    ).then((res) => {
      const responseTime = res?.datetime.split(" ").reverse()[0];
      if (pickupWindow?.length && pickupEndTime) {
        const isValid = checkWindowTimeExpires(
          pickupEndTime,
          responseTime as string,
          //isAsap
          //restaurantinfo as GetAllRestaurantInfo,
          lastPickupTIme?.isLastOrder
        );
        setisPickupWindowAvailable(isValid);
      }
      if (deliveryEndTime?.length > 0) {
        const isValid = checkWindowTimeExpires(
          deliveryEndTime,
          responseTime as string,
          // isAsap
          // restaurantinfo as GetAllRestaurantInfo,
          lastDeliveryTime?.isLastOrder
        );
        setisDeliveryWindowAvailable(isValid);
      }
    });
  }, [defaultLocation?.locationId]);

  const redirectOnTimeSelected = () => {
    if (isRedirectMenu) {
    } else {
    }
  };

  const handleAsapClick = () => {
    if (
      ordertype === ORDER_TYPE.DELIVERY.value &&
      deliveryService === DELIVERYSERVICES.UBEREATS &&
      selectedAddress === null
    ) {
      handleNotify(
        ERRORMESSAGE.SELECT_ADDRESS,
        ToasterPositions.TopRight,
        ToasterTypes.Warning
      );
      return;
    }
    setisConfirmDisable(true);
    setActiveButtonClass(ASAP_LATER_BTN_ENUM.ASAP);
    setisAsap(true);
    setisLaterOn(false);
    handleTimeClick();
  };

  const handleTimeClick = () => {
    OrderServices.getOrderTiming({
      restaurantId: Number(restaurantinfo?.restaurantId),
      locationId: Number(defaultLocation?.locationId),
      ordertype: ordertype,
      obj: selectedAddress as AddressListType,
      requestId: defaultRequestId,
    }).then((gettimeresponse) => {
      setTimeout(() => {
        if (gettimeresponse?.result) {
          if (gettimeresponse.result?.time) {
            let time = gettimeresponse.result.time.split(" ");
            let requestID: string = "";
            OrderServices.checkOrderTime({
              restaurantId: Number(restaurantinfo?.restaurantId),
              locationId: Number(defaultLocation?.locationId),
              recievingTime: time[0],
              recieving: time[1],
              flg: Number(ordertype),
              obj: selectedAddress as AddressListType,
              requestId: requestID,
            }).then((response) => {
              if (
                response.result.message &&
                response.result.message.length > 0 &&
                response.result.status !== "success"
              ) {
                setTimeOrErrorMessage(response.result.message);
                dispatch(emptyordertime());
                setisConfirmDisable(true);
                return;
              }
              if (response.result != undefined && response.result !== null) {
                if (response.result?.status === "success") {
                  let newtime = time[0] + " " + time[1];
                  setOrderTime(newtime);
                  dispatch(setordertime(newtime));
                  setisConfirmDisable(false);
                  setTimeOrErrorMessage("");
                } else {
                  setTimeOrErrorMessage(response.result.message);
                  setisConfirmDisable(true);
                }
              }
            });
          }
        }
      }, 500);
    });
  };

  const handleLaterOnClick = () => {
    if (
      ordertype === ORDER_TYPE.DELIVERY.value &&
      deliveryService === DELIVERYSERVICES.UBEREATS &&
      selectedAddress === null
    ) {
      handleNotify(
        ERRORMESSAGE.SELECT_ADDRESS,
        ToasterPositions.TopRight,
        ToasterTypes.Warning
      );
      return;
    }
    handleCurrentTime();
    setisLaterOn(true);
    let hour =
      Meridiem === MERIDIEM_TIME_ENUM.AM
        ? parseInt(Hour)
        : parseInt(Hour) + 12 === 24
        ? 12
        : parseInt(Hour) + 12;
    let Time = `${hour}:${parseInt(Minute)}`;
    setTimeOrErrorMessage("");
    setsuccessMessage("");
    setActiveButtonClass(ASAP_LATER_BTN_ENUM.LATER_ON);
    setisAsap(false);
    setisConfirmDisable(false);
  };

  function handleCurrentTime() {
    OrderServices.getOrderTiming({
      restaurantId: Number(restaurantinfo?.restaurantId),
      locationId: Number(defaultLocation?.locationId),
      ordertype: ordertype,
      obj: selectedAddress as AddressListType,
      requestId: defaultRequestId,
    }).then((gettimeresponse) => {
      if (gettimeresponse) {
        if (gettimeresponse?.result) {
          if (gettimeresponse.result?.time) {
            let time = gettimeresponse.result.time.split(" ");
            let newtime = time[0].split(":");
            setHour(newtime[0]);
            setMinute(newtime[1]);
            setMeridiem(time[1]);
            setisTimeLoad(true);
          }
        }
      }
    });
  }

  const handleLaterOnConfirmSelectionClick = () => {
    let datepickerwidge = document.querySelectorAll(
      ".bootstrap-datetimepicker-widget"
    );
    if (datepickerwidge.length > 1) {
      for (let index = 0; index < datepickerwidge.length; index++) {
        const element = datepickerwidge[index];
        if (index !== 0) {
          element.remove();
        }
      }
    }
    hour = $(".timepicker-hour").text();
    minute = $(".timepicker-minute").text();
    meridiem = $(".btn-primary").text();
    handlesave(hour, minute, meridiem);
  };

  const handleClick = async (
    lid: number,
    locationUrl: string,
    isPickup?: boolean
  ) => {
    LocationServices.changeRestaurantLocation(
      restaurantinfo?.restaurantId as number,
      lid
    ).then((res) => {
      if (res) {
        Object.keys(restaurantinfo as GetAllRestaurantInfo).map(
          (session: string) => {
            if (session && session === "defaultLocation") {
              Object.assign(
                restaurantinfo?.defaultLocation as DefaultLocation,
                res
              );
            }
            if (session && restaurantinfo && session === "defaultlocationId") {
              restaurantinfo.defaultlocationId = res.locationId;
            }
          }
        );
        dispatch(restaurantsdetail(null));
        dispatch(restaurantsdetail(restaurantinfo));
        let oldLocationId = getLocationIdFromStorage();
        if (oldLocationId !== restaurantinfo?.defaultlocationId) {
          // (dispatch as AppDispatch)(clearRedux(false));
          if (isPickup === true) {
            dispatch(
              setpickupordelivery(
                res?.defaultordertype
                  ? ORDER_TYPE.DELIVERY.text
                  : ORDER_TYPE.PICKUP.text
              )
            );
          }
          setLocationIdInStorage(restaurantinfo?.defaultlocationId as number);
          let id = uuidv4();
          dispatch(createSessionId(id));
          setdefaultLoactionId(lid);
          if (userinfo && userinfo?.customerId) {
            deleteCartItemFromSessionId({
              cartsessionId: sessionid as string,
              restaurantId: restaurantinfo?.restaurantId as number,
              locationId: defaultLocation?.locationId as number,
            });
          }
        }
        redirectOnTimeSelected();
      }
    });
  };

  const handlesave = (hour: string, minute: string, meridiem: string) => {
    OrderServices.checkOrderTime({
      restaurantId: restaurantinfo?.restaurantId as number,
      locationId: defaultLocation?.locationId as number,
      recievingTime: parseInt(hour) + ":" + parseInt(minute),
      recieving: meridiem,
      flg: ordertype,
      obj: selectedAddress as AddressListType,
      requestId: defaultRequestId,
    }).then((response) => {
      if (response.result != undefined && response.result !== null) {
        if (response.result.status !== "success") {
          setTimeOrErrorMessage(response.result.message);
          setisConfirmDisable(true);
          setsuccessMessage("");
          dispatch(setordertime(""));
        }
        if (response.result.status === "success") {
          dispatch(isasap(false));

          let timedisplay = hour + ":" + minute + " " + meridiem;
          if (ordertype == 1) {
            setTimeOrErrorMessage("");
            setsuccessMessage(response.result.message);
            dispatch(setordertime(timedisplay));
            if (isRedirectMenu === true) {
              // FROM THE PICKUP POPUP TIME SELCTION
              handleClick(locationId as number, locationUrl as string);
              handleToggleTimingModal(false);
            }
            handleToggleTimingModal(false);
          }
          if (ordertype == 2) {
            if (response.result?.message) {
              setTimeOrErrorMessage("");
              setsuccessMessage(response.result.message);
              dispatch(setordertime(timedisplay));
              if (isRedirectMenu === true) {
                // FROM THE PICKUP POPUP TIME SELCTION
                handleClick(locationId as number, locationUrl as string);
                handleToggleTimingModal(false);
              } else {
                setTimeout(() => {
                  handleToggleTimingModal(false);
                  redirectOnTimeSelected();
                }, 1000);
              }
            }
          }
        }
      }
    });
  };

  const handleAsapConfirmClick = () => {
    dispatch(isasap(true));

    handleToggleTimingModal(false);
    if (isRedirectMenu === true) {
      handleClick(locationId as number, locationUrl as string, true);
      handleToggleTimingModal(false);
      return;
    }
    redirectOnTimeSelected();
  };

  return (
    <>
      <div
        className={`modal fade modal-your-order address-modal ${
          isOpenModal ? "show d-block" : ""
        }`}
        style={{ display: "block" }}
        id="order-time-modal"
        aria-labelledby="order-time-modal-Label"
        aria-hidden="true"
      >
        <div
          className={`modal-dialog modal-dialog-centered ${
            false ? "modal-dialog-scrollable" : ""
          }`}
        >
          {load && (
            <div className="modal-content">
              <a>
                <h5 className="modal-title" id="login-modal-Label">
                  {" "}
                  {DELIVERYPAGEMESSAGE.CHOOSE_YOUR_TIME}{" "}
                  {pickupordelivery !== "" && `for ${pickupordelivery}`}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => handleToggleTimingModal(false)}
                  aria-label="Close"
                />
              </a>
              <div className="modal-body">
                <a>
                  {" "}
                  <p>{DELIVERYPAGEMESSAGE.PICK_A_DATE_MESSAGE}</p>{" "}
                </a>
                <a>
                  <p>
                    {DELIVERYPAGEMESSAGE.PREP_TIME}&nbsp;
                    <b>
                      {pickupordelivery === ORDER_TYPE.DELIVERY.text
                        ? defaultLocation?.ordersubmittime ?? 0
                        : defaultLocation?.takeawayextratime ?? 0}{" "}
                      minute
                    </b>
                  </p>{" "}
                </a>
                <AsapLateronButtonComponent
                  handleAsapClick={handleAsapClick}
                  handleLaterOnClick={handleLaterOnClick}
                  isTakeOutPickupTime={isTakeOutPickupTime as boolean}
                  pickupWindow={pickupWindow}
                  deliveryWindow={pickupWindow}
                  isTakeOutAsap={isTakeOutAsap as boolean}
                  defaultLocation={defaultLocation as AddressList}
                  activeButtonClass={activeButtonClass}
                  isDeliveryWindowAvailable={isDeliveryWindowAvailable}
                  isPickupWindowAvailable={isPickupWindowAvailable}
                />
                {((selecteddelivery.pickupordelivery ===
                  ORDER_TYPE.DELIVERY.text &&
                  isDeliveryWindowAvailable) ||
                  (selecteddelivery.pickupordelivery ===
                    ORDER_TYPE.PICKUP.text &&
                    isPickupWindowAvailable) ||
                  selecteddelivery.pickupordelivery === null) && ( // ""
                  <>
                    {" "}
                    {isAsap && (
                      <>
                        {/* hide-this */}
                        <form className="asap-date-form  my-3">
                          <div className="row justify-content-center">
                            <div className="col-lg-12 col-sm-12 col-12 text-center">
                              {timeOrErrorMessage !== "" && (
                                <h4 style={{ color: "red" }}>
                                  {timeOrErrorMessage}
                                </h4>
                              )}
                              {((timeOrErrorMessage === "" &&
                                orderTime !== "") ||
                                selecetdtime !== "") && (
                                <h4>
                                  {orderTime === "" ? selecetdtime : orderTime}
                                  ,&nbsp; Today,&nbsp; {currentDate?.getDate()}
                                  &nbsp;
                                  {MonthList(currentDate?.getMonth() as any)}
                                </h4>
                              )}
                              {isConfirmDisable ||
                              defaultLocation?.isOrderingDisable ? (
                                <a className=" greyColor non-cursor btn-default mt-3 px-5">
                                  {DELIVERYPAGEMESSAGE.CONFIRM_SELECTION}
                                </a>
                              ) : (
                                <a
                                  className="btn-default mt-3 px-5"
                                  onClick={handleAsapConfirmClick}
                                >
                                  {" "}
                                  {DELIVERYPAGEMESSAGE.CONFIRM_SELECTION}
                                </a>
                              )}
                            </div>
                          </div>
                        </form>
                      </>
                    )}
                    {isLaterOn && asapLaterOnState.isLateron && (
                      <form className="later-date-form ">
                        <div className="row">
                          <div
                            className="col-lg-12 col-sm-12 col-12 text-center"
                            id="datepicker"
                          >
                            <h4>{DELIVERYPAGEMESSAGE.SELECT_TIME}</h4>
                            {/* <div
                              className="d-block mx-auto"
                              id="datetimepicker4"
                            /> */}
                            <DateTimePickerWrapper
                              hour={Hour}
                              minute={Minute}
                              meridiem={Meridiem as MERIDIEM_TIME_ENUM}
                              isDisabled={
                                defaultLocation?.isOrderingDisable ?? false
                              }
                              setTimeOrErrorMessage={setTimeOrErrorMessage}
                              setIsConfirmDisable={setisConfirmDisable}
                            />
                          </div>
                          {timeOrErrorMessage !== "" && (
                            <h6 className="text-center error">
                              {timeOrErrorMessage}
                            </h6>
                          )}
                          {successMessage !== "" && (
                            <h6
                              style={{ color: "green" }}
                              className="text-center"
                            >
                              {successMessage}
                            </h6>
                          )}
                          {isConfirmDisable ||
                          defaultLocation?.isOrderingDisable ? (
                            <div className="col-lg-12 col-md-12 col-12 text-center">
                              <a className=" greyColor opacity-50 pe-none non-cursor btn-default mt-3 px-5">
                                {DELIVERYPAGEMESSAGE.CONFIRM_SELECTION}{" "}
                              </a>
                            </div>
                          ) : (
                            <div className="col-lg-12 col-md-12 col-12 text-center">
                              <a
                                className="btn-default px-5"
                                onClick={handleLaterOnConfirmSelectionClick}
                              >
                                {" "}
                                {DELIVERYPAGEMESSAGE.CONFIRM_SELECTION}{" "}
                              </a>
                            </div>
                          )}
                        </div>
                      </form>
                    )}
                  </>
                )}
                <PickupdeliveryWindowTime
                  defaultLocation={defaultLocation as AddressList}
                  isDeliveryAsap={isDeliveryAsap as boolean}
                  isTakeOutAsap={isTakeOutAsap as boolean}
                  isDeliveryPickupTime={isDeliveryPickupTime as boolean}
                  isTakeOutPickupTime={isTakeOutPickupTime as boolean} // Add this
                  pickupWindow={pickupWindow}
                  deliveryWindow={deliveryWindow}
                  isDeliveryWindowAvailable={isDeliveryWindowAvailable}
                  isPickupWindowAvailable={isPickupWindowAvailable}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};
export default PickupDeliveryTimeSelectPopup;
