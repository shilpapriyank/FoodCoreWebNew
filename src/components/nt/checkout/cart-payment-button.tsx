"use client";

import React, { useEffect, useRef, useState } from "react";
import CustomanchortagComponent from "../../common/customanchortag.component";
import {
  bindPlaceOrderObject,
  checkCheckoutDisable,
  checkIntegerValue,
  DELIVERYSERVICES,
  GetCurrency,
  GetThemeDetails,
  handleSetDeliveryTypeError,
  ORDER_TYPE,
  orderDisable,
  ORDERTYPE,
  PAYMENT_TYPE,
} from "../../common/utility";
import { API_RESPONSE_STATUS } from "../../common/enums";
import handleNotify from "../../default/helpers/toaster/toaster-notify";
import useUtility from "../../customhooks/utility-hook";
import useFutureOrder from "../../customhooks/usefuture-order-hook";
import { ToasterTypes } from "../../default/helpers/toaster/toaster-types";
import { ToasterPositions } from "../../default/helpers/toaster/toaster-positions";
import VerifyPhoneComponent from "../login-register/verifyphone.component";
import Login from "../login-register/login.component";
import Register from "../login-register/register.component";
import AddAddress from "../common/add-address.component";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import useRewardPoint from "@/components/customhooks/userewardpoint-hook";
import {
  DefaultLocation,
  GetAllRestaurantInfo,
} from "@/types/restaurant-types/restaurant.type";
import { RestaurantWindowTime } from "@/types/mainservice-types/mainservice.type";
import {
  CartDetailOfCartTotal,
  CartDetails,
  PromotionData,
} from "@/types/cart-types/cartservice.type";
import { CartServices } from "../../../../redux/cart/cart.services";
import {
  addCalculatedTotal,
  addCardShowMessage,
  emptyorder,
  isRedirectToCheckout,
  setDeliveryRequestId,
  setorderId,
  setordertime,
} from "../../../../redux/order/order.slice";
import {
  carttotaldata,
  emptycart,
  setCartTotal,
} from "../../../../redux/cart/cart.slice";
import { OrderServices } from "../../../../redux/order/order.services";
import { PAGES } from "../common/pages";
import CommonModal from "../common/common-model.component";
import { useAppDispatch } from "../../../../redux/hooks";
import { useParams, useRouter } from "next/navigation";
import { DeliveryAddressInput } from "../../../../redux/delivery-address/delivery-address.types";
import { DeliveryAddressInfo } from "@/components/default/Common/dominos/helpers/types/utility-type";
import { SelectedDeliveryAddressType } from "@/types/selectdelivery-types/selectdelivery.types";

interface ModalState {
  openRegisterModal: boolean;
  openRewardModal: boolean;
  openOtpModal: boolean;
  openUserExistModal: boolean;
  openVerifyPhone: boolean;
}

const CartPaymentButton: React.FC<{
  errormessage: string;
  timeErrorMessage: string;
}> = ({ errormessage, timeErrorMessage }) => {
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
    // studentdata,
    recievingTime,
    meredian,
    orderTimeType,
  } = useReduxData();
  const { validateNewuserRewardPoint } = useRewardPoint(
    cart?.carttotal as CartDetailOfCartTotal
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useParams();
  const { dynamic } = params;

  const pickupordelivery = selecteddelivery.pickupordelivery;
  const deliveryaddressinfo = selecteddelivery?.selecteddeliveryaddress;
  // const studentname = studentdata?.studentname;
  const carttotal = cart?.carttotal && cart.carttotal;
  const cartdata = cart?.cartitemdetail && cart?.cartitemdetail;
  const locationinfo = restaurantinfo?.defaultLocation;
  const defaultLocation = restaurantinfo?.defaultLocation;
  const sessionId = session?.sessionid;
  const promotionData = carttotal?.PromotionData && carttotal.PromotionData;
  const ordertype =
    pickupordelivery === ORDER_TYPE.PICKUP.text
      ? ORDER_TYPE.PICKUP.value
      : ORDER_TYPE.DELIVERY.value;
  let tipPercentage =
    carttotal && carttotal?.tipPercentage > 0
      ? carttotal && carttotal?.tipPercentage
      : "";
  let customerId = userinfo ? userinfo.customerId : 0;
  const [isPaymentButtonDisable, setisPaymentButtonDisable] =
    useState<boolean>(false);
  const [deliveryaddressId, setDeliveryaddressId] = useState<number>(0);
  const [isDisableCheckout, setisDisableCheckout] = useState<boolean>(false);
  const [deliveryErrorMessage, setdeliveryErrorMessage] = useState<string>("");
  const [dropOfTime, setdropOfTime] = useState("");
  // const [timeErrorMessage, settimeErrorMessage] = useState("");
  const [displayUberTime, setdisplayUberTime] = useState<boolean>(true);
  const { deliveryService } =
    restaurantinfo?.defaultLocation as DefaultLocation;
  const tempDeliveryAddress = deliveryaddress?.tempDeliveryAddress;
  const [paymentType, setpaymentType] = useState<number>(1);
  let selectedTheme = GetThemeDetails(restaurantinfo?.themetype as number);
  let routepath = `/${selectedTheme?.url}/${dynamic}/${restaurantinfo?.defaultLocation.locationURL}`;
  const [opentimingModal, setopentimingModal] = useState<boolean>(false);
  const deliveryAddressInfo = selecteddelivery;
  const restaurantWindowTime = main.restaurantWindowTime;
  const { isDisplayPrice } = useUtility();
  const orderDisableData = orderDisable(
    restaurantinfo as GetAllRestaurantInfo,
    deliveryAddressInfo,
    restaurantWindowTime as RestaurantWindowTime
  );
  var dcharges =
    cart &&
    pickupordelivery === ORDERTYPE.Delivery &&
    cart.carttotal != undefined &&
    cart.carttotal?.deliveryCharges &&
    JSON.parse(cart.carttotal?.deliveryCharges);
  var dtotal =
    dcharges != undefined &&
    pickupordelivery === ORDERTYPE.Delivery &&
    dcharges?.DeliveryCharges &&
    parseFloat(dcharges.DeliveryCharges);
  const distance =
    dcharges != undefined &&
    pickupordelivery === ORDERTYPE.Delivery &&
    dcharges?.distance &&
    dcharges?.distance > 0
      ? parseFloat(dcharges.distance)
      : 0;
  const { deliveryRequestId } = order;
  let selectedAddress =
    userinfo === null
      ? tempDeliveryAddress
      : selecteddelivery?.selecteddeliveryaddress;
  const { futureDate, isFutureOrder, timeSlot, recievingDate, enabletimeslot } =
    useFutureOrder();

  let rewardpoint = rewardpoints;

  const [openVErifyPopup, setopenVErifyPopup] = useState<boolean>(true);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const [isOpenDeliveryModal, setIsOpenDeliveryModal] =
    useState<boolean>(false);
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const [openAccountConfirmModal, setopenAccountConfirmModal] =
    useState<boolean>(false);
  const [openAdressModal, setopenAdressModal] = useState<boolean>(false);

  const [modalState, setModalState] = useState<ModalState>({
    openRegisterModal: false,
    openRewardModal: false,
    openOtpModal: false,
    openUserExistModal: false,
    openVerifyPhone: false,
  });

  const handleToggleAll = (value: boolean, key: any) => {
    setModalState((pre) => ({
      ...pre,
      [key]: value,
    }));
  };

  //   useEffect(() => {
  //     //CHECK IF CART ITEMS IS EMPTY REDIRECT
  //         if (deliveryaddressinfo && ordertype === ORDER_TYPE.DELIVERY.value) {
  //             setDeliveryaddressId(deliveryaddressinfo.deliveryaddressId)
  //         }
  // }, []);

  useEffect(() => {
    // handleToggleAll(true,'openVerifyPhone')
    let address = userinfo !== null ? deliveryaddressinfo : tempDeliveryAddress;
    const deliveryError = handleSetDeliveryTypeError(
      pickupordelivery,
      address as any,
      carttotal as CartDetailOfCartTotal,
      dcharges,
      cart,
      cartdata as CartDetails,
      true
    );

    setdeliveryErrorMessage(deliveryError);
    //TO DO:OPEN THE PHONEVERIFY NUMBER
    // if (restaurantinfo?.deliveryServicePartnerEnable && (dcharges?.header !== undefined && dcharges?.header === "dropoff_phone_number") && openVErifyPopup && pickupordelivery === ORDER_TYPE.DELIVERY.text) {
    if (
      restaurantinfo?.deliveryServicePartnerEnable &&
      dcharges?.header !== undefined &&
      dcharges?.header === "dropoff_phone_number" &&
      modalState?.openVerifyPhone &&
      pickupordelivery === ORDER_TYPE.DELIVERY.text
    ) {
      setTimeout(() => {
        // setopenVErifyPopup(false)
        setTimeout(() => {
          //   let confirmPhoneVerify = document.getElementById("validphone-error");
          //   confirmPhoneVerify.click()

          handleToggleAll(true, "openVerifyPhone");
        }, 300);
      }, 200);
    }
    //TO DO:CHECK THE ITEM ADDDED IN THE CART IS AVAILABLE FOR THE DELIVERY AND TAKEOUT OR NOT
    let isCheckoutDisable = checkCheckoutDisable(
      cartdata as CartDetails,
      pickupordelivery,
      dtotal
    );
    if (isCheckoutDisable) {
      setisDisableCheckout(true);
    } else {
      setisDisableCheckout(false);
    }
  }, [
    dcharges,
    cart,
    deliveryaddressinfo,
    userinfo,
    carttotal,
    deliveryaddressinfo,
    dtotal,
    carttotal?.subTotal,
    order?.checktime,
  ]);

  const handleClickPlaceOrder = (paymentType: number) => {
    if (userinfo == null) {
      setpaymentType(paymentType);
      setOpenLoginModal(true);
      return;
    }

    var isValidated =
      rewardpoints?.redeemPoint > 0 ? validateNewuserRewardPoint() : true;
    if (!isValidated) return;
    else {
      if (!enabletimeslot) {
        // $('#commonbutton').click();
        setIsOpenModal(true);
      }
      setisPaymentButtonDisable(true);
      addorders(order.isasap, paymentType);
      setIsOpenModal(false);
      // closeModal('btn-close')
    }
  };

  const handleClickUberPopup = (payType: any) => {
    if (userinfo == null) {
      setpaymentType(payType);
      setOpenLoginModal(true);
      return;
    }

    //TO DO CALL THE GET CART TOTAL API
    CartServices.carttotal(
      sessionId as string,
      restaurantinfo?.defaultlocationId as number,
      restaurantinfo?.restaurantId as number,
      customerId,
      0,
      String(carttotal?.reedemPoints),
      String(carttotal?.reedemAmount),
      String(carttotal?.tipPercentage),
      checkIntegerValue(carttotal?.tipAmount as number),
      deliveryaddressinfo?.deliveryaddressId,
      ordertype,
      order?.deliveryRequestId,
      recievingTime,
      meredian,
      orderTimeType,
      recievingDate,
      enabletimeslot
    ).then((response) => {
      if (response) {
        if (
          ordertype === ORDER_TYPE.DELIVERY.value &&
          response?.cartDetails?.deliveryCharges
        ) {
          let dcharges = JSON.parse(response?.cartDetails?.deliveryCharges);
          let dropofTime =
            dcharges != undefined &&
            dcharges?.dropofTime &&
            dcharges.dropofTime;
          let requestId =
            dcharges != undefined && dcharges?.requestId && dcharges?.requestId;
          if (
            dropofTime &&
            requestId !== null &&
            dcharges?.returnMessage === "" &&
            !enabletimeslot
          ) {
            // dispatch({
            //   type: OrderTypes.CHECK_ORDER_TIME,
            //   payload: dropofTime,
            // });
            // dispatch({
            //   type: OrderTypes.DELIVERY_REQUEST_ID,
            //   payload: requestId,
            // });
            dispatch(setordertime(dropofTime));
            dispatch(setDeliveryRequestId(requestId));
            setpaymentType(payType);
            setTimeout(() => {
              // $('#commonbutton').click();
              setIsOpenModal(true);
            }, 300);
          }
        }

        dispatch(setCartTotal(response.cartDetails));
      }
    });
  };

  const handleClickOk = () => {
    setIsOpenModal(false);
    setTimeout(() => {
      setdisplayUberTime(false);
    }, 200);
    setTimeout(() => {
      handleClickPlaceOrder(paymentType);
    }, 500);
  };


  const handleOpenLoginModal = (value: boolean) => {
    setOpenLoginModal(value);
  };
  const handleToggle = (value: boolean, key?: any) => {
    setModalState((pre) => ({
      ...pre,
      [key]: value,
    }));
  };

  const handleToggleAddAddressModal = (value: boolean) => {
    setopenAdressModal(value);
  };

  // const handleClickPlaceOrderForNotLoggedinUser = () => {
  //     setOpenLoginModal(true)
  //     setTimeout(() => {
  //         setdisplayUberTime(false)
  //     }, 200)
  //     setTimeout(() => {
  //         handleClickPlaceOrder(paymentType);
  //     }, 500)
  // }

  function refreshCart(orderId: number) {
    OrderServices.getOrderInfo({
      restaurantId: restaurantinfo?.restaurantId as number,
      locationId: restaurantinfo?.defaultlocationId as number,
      orderId: orderId,
      customerId: customerId,
    }).then((response) => {
      if (response) {
        const result = response?.orderDetailInfo;
        if (result != undefined && result.OrderDetailCal !== undefined) {
          dispatch(addCalculatedTotal(result.OrderDetailCal?.calculatedTotal));
          dispatch(addCardShowMessage(result.OrderDetailCal?.cardShowMessage));
        }
      }
    });
    return;
  }

  const addorders = (isAsap: boolean, paymentType: number) => {
    let placeOrder = bindPlaceOrderObject(
      rewardpoints,
      cart,
      ordertype,
      sessionId as string,
      userinfo,
      deliveryaddressinfo?.deliveryaddressId as number,
      order,
      isAsap,
      paymentType,
      restaurantinfo as GetAllRestaurantInfo,
      promotionData as PromotionData,
      //studentname,
      distance,
      pickupordelivery,
      isFutureOrder as boolean,
      timeSlot,
      futureDate as string
    );

    OrderServices.addorders({
      placeOrder: placeOrder,
      restaurantId: restaurantinfo?.restaurantId as number,
    }).then((response) => {
      if (response?.status === API_RESPONSE_STATUS.SUCCESS) {
        if (response.result.orderId && response.result.orderId > 0) {
          dispatch(setorderId(response.result.orderId));
          //handleNotify('Order complete successfully! with OrderId: ' + response.result.orderId, ToasterPositions.TopRight, ToasterTypes.Success);

          if (paymentType === PAYMENT_TYPE.CASH.value) {
            dispatch(emptycart());
            //router.push(routepath + "/menu");
            // closeModal('btn-close')
            //dispatch(emptyorder());
            setIsOpenModal(false);
            router.push(routepath + "/" + PAGES.THANK_YOU);
          }
          if (paymentType === PAYMENT_TYPE.CARD.value) {
            dispatch(isRedirectToCheckout(true));
            refreshCart(response.result.orderId);
            // closeModal('btn-close')
            setIsOpenModal(false);
            router.push(routepath + "/" + PAGES.PAYMENT);
          }
        }
      } else if (response?.status === API_RESPONSE_STATUS.FAIL) {
        handleNotify(
          response.message,
          ToasterPositions.TopRight,
          ToasterTypes.Error
        );
      } else {
        handleNotify(
          response.message,
          ToasterPositions.TopRight,
          ToasterTypes.Error
        );
      }
      setTimeout(() => {
        //     closeModal('btn-close')
        setIsOpenModal(false);
      }, 300);
      setisPaymentButtonDisable(false);
    });
    dispatch(emptyorder());
  };

  let isButtonDisabled2 = false;

  if (
    isPaymentButtonDisable === true ||
    deliveryErrorMessage !== "" ||
    timeErrorMessage !== "" ||
    orderDisableData?.errormessage !== "" ||
    isDisableCheckout === true ||
    order.checktime === ""
  ) {
    isButtonDisabled2 = true;
  }

  const ErrorMessage = ({ message }: { message: string }) =>
    message ? (
      <div className="card mb-3">
        <div className="card-body">
          <div className="table-responsive">
            <b className="error">{message}</b>
          </div>
        </div>
      </div>
    ) : null;

  const handleToggleTimingModal = (value: boolean) => {
    setopentimingModal(value);
  };

  const handleToggleAccountConfirm = (value: boolean) => {
    setopenAccountConfirmModal(value);
  };

  return (
    <>
      <ErrorMessage message={deliveryErrorMessage} />
      <ErrorMessage message={timeErrorMessage} />
      <ErrorMessage message={orderDisableData?.errormessage} />
      {/* <ErrorMessage message={userinfo === null && 'User is not logged in'} /> */}
      {!isDisplayPrice && (
        <>
          {isButtonDisabled2 === true ? (
            <CustomanchortagComponent
              buttonText={"Place Order"}
              buttonclass={"mt-1 btn-default w-100 greyColor"}
              isDisable={true}
            >
              {" "}
              <i className="fa fa-angle-right" />{" "}
            </CustomanchortagComponent>
          ) : // HANDLE TIP WARNING ON CLICK PAY BY CARD
          deliveryService === DELIVERYSERVICES.UBEREATS &&
            displayUberTime &&
            pickupordelivery === ORDER_TYPE.DELIVERY.text &&
            !enabletimeslot &&
            isDisplayPrice ? (
            <a
              className={"btn-default w-100"}
              // isDisable={false}
              onClick={() => handleClickUberPopup(1)}
            >
              {" "}
              Place Order <i className="fa fa-angle-right" />
            </a>
          ) : (
            <CustomanchortagComponent
              buttonText={"Place Order"}
              buttonclass={`btn-default w-100`}
              isDisable={false}
              buttonMethod={handleClickPlaceOrder}
              buttonParam={1}
            >
              {" "}
              <i className="fa fa-angle-right" />{" "}
            </CustomanchortagComponent>
          )}
        </>
      )}
      {locationinfo?.IsPayByCash === true &&
      isDisplayPrice &&
      pickupordelivery === ORDER_TYPE.PICKUP.text ? (
        orderDisableData.isorderdisable || isDisableCheckout === true ? (
          <CustomanchortagComponent
            buttonText={"Pay By Cash"}
            buttonclass={"mt-1 btn-default w-100 greyColor"}
            isDisable={true}
          >
            {" "}
            <i className="fa fa-angle-right" />{" "}
          </CustomanchortagComponent>
        ) : isButtonDisabled2 ? (
          <CustomanchortagComponent
            buttonText={"Pay By Cash"}
            buttonclass={"mt-1 btn-default w-100 greyColor"}
            isDisable={true}
          >
            {" "}
            <i className="fa fa-angle-right" />{" "}
          </CustomanchortagComponent>
        ) : //check for button disable once order placed{}
        // HANDLE TIP WARNING ON CLICK PAY BY CARD
        deliveryService === DELIVERYSERVICES.UBEREATS &&
          displayUberTime &&
          pickupordelivery === ORDER_TYPE.DELIVERY.text.toLowerCase() &&
          !enabletimeslot ? (
          <a
            className={"btn-default w-100"}
            //isDisable={false}
            onClick={() => handleClickUberPopup(1)}
          >
            Pay By Cash <i className="fa fa-angle-right" />{" "}
          </a>
        ) : (
          <CustomanchortagComponent
            buttonText={"Pay By Cash"}
            buttonclass={`btn-default w-100`}
            isDisable={false}
            buttonMethod={handleClickPlaceOrder}
            buttonParam={1}
          >
            {" "}
            <i className="fa fa-angle-right" />
          </CustomanchortagComponent>
        )
      ) : (
        <></>
      )}
      {/* //not display for subscribe */}
      {isDisplayPrice && (
        <>
          {locationinfo?.IsPayByCard === true &&
          isDisplayPrice &&
          (orderDisableData.isorderdisable || isDisableCheckout === true) ? (
            <CustomanchortagComponent
              buttonText={"Pay By Card"}
              buttonclass={"mt-1 btn-default w-100 greyColor margin-top-15 1"}
              isDisable={true}
            >
              {" "}
              <i className="fa fa-angle-right" />
            </CustomanchortagComponent>
          ) : isButtonDisabled2 === true ? (
            //(isPaymentButtonDisable === true || deliveryErrorMessage !== "" || timeErrorMessage !== "") ?
            <CustomanchortagComponent
              buttonText={`${
                locationinfo?.IsPayByCash == true
                  ? "Pay By Card"
                  : "Place Order"
              }`}
              buttonclass={"mt-1 btn-default w-100 greyColor margin-top-15 2"}
              isDisable={true}
            >
              {" "}
              <i className="fa fa-angle-right" />{" "}
            </CustomanchortagComponent>
          ) : deliveryService === DELIVERYSERVICES.UBEREATS &&
            displayUberTime &&
            pickupordelivery === ORDER_TYPE.DELIVERY.text &&
            !enabletimeslot ? (
            <CustomanchortagComponent
              buttonText={`${
                locationinfo?.IsPayByCash == true
                  ? "Pay By Card"
                  : "Place Order"
              }`}
              buttonclass={"mt-1 btn-default w-100 margin-top-15"}
              isDisable={false}
              buttonMethod={() => handleClickUberPopup(2)}
            >
              {" "}
              <i className="fa fa-angle-right" />{" "}
            </CustomanchortagComponent>
          ) : (
            <CustomanchortagComponent
              buttonText={`${
                locationinfo?.IsPayByCash == true
                  ? "Pay By Card"
                  : "Place Order"
              }`}
              buttonclass={"mt-1 btn-default w-100 margin-top-15 4"}
              isDisable={false}
              buttonMethod={handleClickPlaceOrder}
              buttonParam={2}
            >
              {" "}
              <i className="fa fa-angle-right" />{" "}
            </CustomanchortagComponent>
          )}
          {deliveryService === DELIVERYSERVICES.UBEREATS &&
          displayUberTime &&
          ORDER_TYPE.DELIVERY.text === pickupordelivery
            ? isOpenModal && (
                <CommonModal
                  title="Delivery Time Update"
                  text={`Updated delivery time for your order is ${order?.checktime}`}
                  btn1Name="Ok"
                  btn2Name=""
                  isbtn2={false}
                  handleClickBtn1={handleClickOk}
                  handleClickBtn2={() => handleToggle(false)}
                  isOpenModal={isOpenModal}
                />
              )
            : isOpenModal && (
                <CommonModal
                  title="Thank You"
                  text={"Please wait while we are processing your request..."}
                  btn1Name=""
                  btn2Name=""
                  isbtn2={false}
                  handleClickBtn1={handleClickOk}
                  handleClickBtn2={() => handleToggle(false)}
                  handleToggle={handleToggle}
                  isOpenModal={isOpenModal}
                />
              )}
        </>
      )}
      {
        // modalState.openVerifyPhone && <VerifyPhoneComponent isOpenModal={modalState.openVerifyPhone} handleToggle={handleToggleAll}/>
        modalState.openVerifyPhone && (
          <VerifyPhoneComponent
            isOpenModal={modalState.openVerifyPhone}
            handleToggle={handleToggleAll}
          />
        )
      }

      {openLoginModal && (
        <Login
          handleToggle={handleToggle}
          handleToggleAccountConfirm={handleToggleAccountConfirm}
          isOpenModal={openLoginModal}
          handleOpenLoginModal={handleOpenLoginModal}
        />
      )}
      {/* {modalState.openRegisterModal && (
        <Register
          handleOpenLoginModal={handleOpenLoginModal}
          handleToggleAccountConfirm={handleToggleAccountConfirm}
          isOpenModal={true}
          handleToggle={handleToggle}
          openAdressModal={openAdressModal}
          handleToggleAddAddressModal={handleToggleAddAddressModal}
        />
      )} */}
      {openAdressModal && (
        <AddAddress
          isRegister={modalState.openRegisterModal}
          handleToggleTimingModal={handleToggleTimingModal}
          isOpenModal={openAdressModal}
          handleToggleAddAddressModal={handleToggleAddAddressModal}
        />
      )}

      {/* {openAccountConfirmModal && <AccountConfirmation handleToggleAddAddressModal={handleToggleAddAddressModal} handleToggle={handleToggle} isAddressModalOnBcChemical={modalState.isAddressModalOnBcChemical} isOpenModal={openAccountConfirmModal} handleToggleAccountConfirm={handleToggleAccountConfirm} />} */}

      {/* {openLoginModal && <Login handleToggle={handleOpenLoginModal} handleToggleAccountConfirm={handleToggleAccountConfirm} isOpenModal={openLoginModal} handleOpenLoginModal={null} />} */}
    </>
  );
};
export default CartPaymentButton;
