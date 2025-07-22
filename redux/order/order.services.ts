import { ResponseModel } from "@/components/common/commonclass";
import { ERRORMESSAGE } from "@/components/common/commonerrormessage";
import { API_RESPONSE_STATUS } from "@/components/common/enums";
import { ENDPOINTS } from "@/components/default/config";
import handleNotify from "@/components/default/helpers/toaster/toaster-notify";
import { ToasterPositions } from "@/components/default/helpers/toaster/toaster-positions";
import { ToasterTypes } from "@/components/default/helpers/toaster/toaster-types";
import { handleAxiosPostAsync } from "@/components/default/helpers/utility";
let responseclass = new ResponseModel();
import {
  AddOrderArgsTypes,
  CardPayment,
  CheckOrderTimeArgsTypes,
  CheckTimeBySlotArgsTypes,
  GenerateTimeSlotArgsTypes,
  GetOrderDeliveryServiceDetailsArgsTypes,
  GetOrderInfoArgsTypes,
  GetOrderTimeArgsTypes,
  GetOrderTimingArgsTypes,
  GetPaymentDetailsArgsTypes,
  OrderAddress,
  PlaceOrderArgsTypes,
  RepeatOrderArgsTypes,
} from "@/types/order-types/order.type";
import { TimeSlot } from "@/types/timeslot-types/timeslot.types";

export class OrderServices {
  static async checkOrderTime({
    restaurantId,
    locationId,
    recievingTime,
    recieving,
    flg,
    obj,
    requestId = "",
  }: CheckOrderTimeArgsTypes) {
    responseclass = new ResponseModel();
    const selectedAddress = {
      deliveryAddressId: obj?.deliveryaddressId ?? 0,
      restaurantId: restaurantId,
      locationId: locationId,
      address1: obj?.address1,
      address2: obj?.address2,
      landmark: obj?.landmark,
      city: obj?.city,
      zipcode: obj?.zipcode,
      latitude: 0,
      longitude: 0,
      state: obj?.state,
      country: obj?.country,
      requestId,
    };
    const methodName = "checkOrderTime";
    const checktimeurl = ENDPOINTS.CHECK_ORDER_TIME;
    const data = {
      model: {
        ...selectedAddress,
        restaurantId: restaurantId,
        locationId: locationId,
        recievingTime: recievingTime,
        recieving: recieving,
        flg: flg,
      },
    };

    responseclass = await handleAxiosPostAsync(
      data,
      checktimeurl,
      methodName,
      true,
      restaurantId
    );
    if (
      responseclass.result != null &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      return responseclass.result;
    } else {
      return responseclass;
    }
  }

  static async getOrderInfo({
    restaurantId,
    locationId,
    orderId,
    customerId,
  }: GetOrderInfoArgsTypes) {
    responseclass = new ResponseModel();
    const methodName = "getOrderInfo";
    const orderInfo = ENDPOINTS.GET_ORDER_INFO;

    const data = {
      orderDetailRequest: {
        restaurantId: restaurantId,
        locationId: locationId,
        orderId: orderId,
        customerId: customerId,
      },
    };
    responseclass = await handleAxiosPostAsync(
      data,
      orderInfo,
      methodName,
      true,
      restaurantId
    );
    if (
      responseclass.result != null &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      return responseclass.result;
    } else {
      return null;
    }
  }

  static async repeatOrder({
    restaurantId,
    locationId,
    orderId,
    orderDetailId,
    isFullOrder,
    cartsessionid,
  }: RepeatOrderArgsTypes) {
    responseclass = new ResponseModel();
    const methodName = "repeatOrder";
    const orderPlace = ENDPOINTS.REPEAT_ORDER;
    const data = {
      placeOrder: {
        restaurantId: restaurantId,
        locationId: locationId,
        orderId: orderId,
        orderDetailId: orderDetailId,
        isFullOrder: isFullOrder,
        sessionId: cartsessionid,
      },
    };
    responseclass = await handleAxiosPostAsync(
      data,
      orderPlace,
      methodName,
      true,
      restaurantId
    );
    return responseclass;
  }

  static async placeOrder({ order, restaurantId }: PlaceOrderArgsTypes) {
    responseclass = new ResponseModel();
    const methodName = "placeOrder";
    const orderPlace = ENDPOINTS.PLACE_ORDER;
    const data = {
      order: order,
    };
    responseclass = await handleAxiosPostAsync(
      data,
      orderPlace,
      methodName,
      true,
      restaurantId
    );
    if (
      responseclass.result != null &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      return responseclass.result;
    } else {
      return responseclass;
    }
  }

  static async getOrderTime({
    restaurantId,
    locationId,
    ordertype,
  }: {
    restaurantId: number;
    locationId: number;
    ordertype: number;
  }) {
    responseclass = new ResponseModel();
    const methodName = "getOrderTime";
    const checktimeurl = ENDPOINTS.GET_ORDER_TIME;
    const data = {
      restaurantId: restaurantId,
      locationId: locationId,
      ordertype: ordertype,
    };
    responseclass = await handleAxiosPostAsync(
      data,
      checktimeurl,
      methodName,
      true,
      restaurantId
    );
    if (
      responseclass.result != null &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      return responseclass.result;
    } else {
      return responseclass;
    }
  }

  static async addOrder({ placeOrder, restaurantId }: AddOrderArgsTypes) {
    responseclass = new ResponseModel();
    const methodName = "addOrder";
    const addorderurl = ENDPOINTS.ADD_ORDER;
    const data = {
      placeOrder: placeOrder,
    };
    responseclass = await handleAxiosPostAsync(
      data,
      addorderurl,
      methodName,
      true,
      restaurantId
    );
    if (
      responseclass.result != null &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      // handleNotify('Order complete successfully!', ToasterPositions.TopRight, ToasterTypes.Success);
      return responseclass.result;
    } else {
      handleNotify(
        responseclass?.message ? responseclass.message : ERRORMESSAGE.TRYAGAIN,
        ToasterPositions.TopRight,
        ToasterTypes.Error
      );
      return responseclass;
    }
  }

  static async addorders({ placeOrder, restaurantId }: AddOrderArgsTypes) {
    responseclass = new ResponseModel();
    const methodName = "addorders";
    const addorderurl = ENDPOINTS.ADD_ORDER;
    const data = {
      placeOrder: placeOrder,
    };
    responseclass = await handleAxiosPostAsync(
      data,
      addorderurl,
      methodName,
      true,
      restaurantId
    );
    if (
      responseclass.result != null &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      //handleNotify('Order complete successfully!', ToasterPositions.TopRight, ToasterTypes.Success);
      //return responseclass;
    } else {
      //handleNotify(responseclass, ToasterPositions.TopRight, ToasterTypes.Error);
      // return [];
      return responseclass;
    }
    return responseclass;
  }

  static async getAllCountry() {
    responseclass = new ResponseModel();
    const methodName = "getAllCountry";
    const countryurl = ENDPOINTS.COUNTRY_LIST;
    const data = {};
    responseclass = await handleAxiosPostAsync(
      data,
      countryurl,
      methodName,
      false,
      0
    );
    if (
      responseclass.result != null &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      return responseclass.result;
    } else {
      return responseclass;
    }
  }

  static async getAllCountries() {
    responseclass = new ResponseModel();
    const methodName = "getAllCountry";
    const countryurl = ENDPOINTS.COUNTRY_LIST;
    const data = {};
    responseclass = await handleAxiosPostAsync(
      data,
      countryurl,
      methodName,
      false,
      0
    );
    if (
      responseclass.result != null &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      return responseclass.result;
    } else {
      return responseclass;
    }
  }

  static async confirmStripePayment(cardPayment: CardPayment) {
    responseclass = new ResponseModel();
    const methodName = "confirmStripePayment";
    const paymenturl = ENDPOINTS.CONFIRM_STRIPE_PAYMENT;
    const data = {
      cardPayment: {
        restaurantId: cardPayment.restaurantId,
        locationId: cardPayment.locationId,
        paymentIntentId: cardPayment.paymentIntentId,
        orderId: cardPayment.orderId,
        paymentMethodId: cardPayment.paymentMethodId,
        totalAmount: cardPayment.totalAmount,
        customerId: cardPayment.customerId,
        cardname: cardPayment.cardname,
        emailId: cardPayment.emailId,
        cardnumber: cardPayment.cardnumber,
        expmonth: cardPayment.expmonth,
        expyear: cardPayment.expyear,
        cvv: cardPayment.cvv,
        zipcode: cardPayment.zipcode,
        countryId: cardPayment.countryId,
        sessionId: cardPayment.cartsessionid,
      },
    };
    responseclass = await handleAxiosPostAsync(
      data,
      paymenturl,
      methodName,
      true,
      cardPayment.restaurantId
    );
    if (
      responseclass.result != null &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      handleNotify(
        responseclass.result.message,
        ToasterPositions.TopRight,
        ToasterTypes.Success
      );
      return responseclass;
    } else {
      return responseclass;
    }
  }

  static async getOrderTiming({
    restaurantId,
    locationId,
    ordertype,
    obj,
    requestId = "",
  }: GetOrderTimingArgsTypes) {
    console.log("loactionId from order services:", locationId);
    responseclass = new ResponseModel();
    const methodName = "getOrderTiming";
    const checktimeurl = ENDPOINTS.GET_TIMING;

    const selectedAddress = {
      deliveryAddressId: obj?.deliveryaddressId ?? 0,
      restaurantId: restaurantId,
      locationId: locationId,
      address1: obj?.address1,
      address2: obj?.address2,
      landmark: obj?.landmark,
      city: obj?.city,
      zipcode: obj?.zipcode,
      latitude: 0,
      longitude: 0,
      state: obj?.state,
      country: obj?.country,
      requestId,
    };

    const data = {
      request: {
        ...selectedAddress,
        restaurantId: restaurantId,
        locationId: locationId,
        ordertype: ordertype,
      },
    };
    responseclass = await handleAxiosPostAsync(
      data,
      checktimeurl,
      methodName,
      true,
      restaurantId
    );
    if (
      responseclass.result != null &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      return responseclass;
    } else if (responseclass.status === API_RESPONSE_STATUS.FAIL) {
      handleNotify(
        responseclass.message,
        ToasterPositions.TopRight,
        ToasterTypes.Error
      );
      return;
    } else {
      return responseclass;
    }
  }

  static async getOrderDeliveryServiceDetails({
    restaurantId,
    locationId,
    orderId,
  }: GetOrderDeliveryServiceDetailsArgsTypes) {
    responseclass = new ResponseModel();
    const methodName = "getDeliveryDetailService";
    const orderInfo = ENDPOINTS.GET_DELIVERY_DETAILS;
    const data = {
      orderId: orderId,
      locationId: locationId,
      restaurantId: restaurantId,
    };
    responseclass = await handleAxiosPostAsync(
      data,
      orderInfo,
      methodName,
      true,
      restaurantId
    );
    if (
      responseclass.result != null &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      return responseclass.result;
    } else {
      return null;
    }
  }

  static async getPaymentDetails({ GUID }: GetPaymentDetailsArgsTypes) {
    responseclass = new ResponseModel();
    const methodName = "getPaymentDetails";
    const endPoint = ENDPOINTS.GET_PAYMENT_DETAILS;
    const data = { GUID };
    responseclass = await handleAxiosPostAsync(
      data,
      endPoint,
      methodName,
      false,
      0
    );
    if (
      responseclass.result != null &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      return responseclass.result;
    } else {
      return null;
    }
  }

  static async getOrderDetailsInfoByGUID({ GUID }: GetPaymentDetailsArgsTypes) {
    responseclass = new ResponseModel();
    const methodName = "getOrderDetailsInfoByGUID";
    const endPoint = ENDPOINTS.ORDER_DETAIL_INFO_GUID;
    const data = { GUID };
    responseclass = await handleAxiosPostAsync(
      data,
      endPoint,
      methodName,
      false,
      0
    );
    if (
      responseclass.result != null &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      return responseclass.result;
    } else {
      return null;
    }
  }

  // static async generateTimeSlot({
  //   restaurantId,
  //   locationId,
  //   ordertype,
  //   scheduleDateTime,
  // }: GenerateTimeSlotArgsTypes) {
  //   responseclass = new ResponseModel();
  //   const methodName = "generateTimeSlot";
  //   const checktimeurl = ENDPOINTS.GENERATE_TIMESLOT;
  //   const data = {
  //     request: {
  //       restaurantId: restaurantId,
  //       locationId: locationId,// 32
  //       orderType: ordertype,
  //       scheduleDateTime: scheduleDateTime,
  //     },
  //   };
  //   responseclass = await handleAxiosPostAsync(
  //     data,
  //     checktimeurl,
  //     methodName,
  //     true,
  //     restaurantId
  //   );

  //   if (responseclass.result != null && responseclass.status === API_RESPONSE_STATUS.SUCCESS) {
  //     return responseclass?.result;
  //   }
  //   else if (responseclass.status === API_RESPONSE_STATUS.FAIL) {
  //     handleNotify(
  //       responseclass.message,
  //       ToasterPositions.TopRight,
  //       ToasterTypes.Error
  //     );
  //     return;
  //   } else {
  //     return responseclass?.result;
  //   }
  // }

  private static timeslotCache = new Map<string, Promise<TimeSlot[]>>();

  //  generateTimeSlot calling only ones changes
  static async generateTimeSlot({
    restaurantId,
    locationId,
    ordertype,
    scheduleDateTime,
  }: GenerateTimeSlotArgsTypes): Promise<TimeSlot[]> {
    const key = `${restaurantId}-${locationId}-${ordertype}-${scheduleDateTime}`;
    if (OrderServices.timeslotCache.has(key)) {
      return OrderServices.timeslotCache.get(key)!;
    }

    const promise = (async () => {
      const methodName = "generateTimeSlot";
      const checktimeurl = ENDPOINTS.GENERATE_TIMESLOT;
      const data = {
        request: {
          restaurantId: restaurantId,
          locationId: locationId,
          orderType: ordertype,
          scheduleDateTime: scheduleDateTime,
        },
      };

      const res: ResponseModel = await handleAxiosPostAsync(
        data,
        checktimeurl,
        methodName,
        true,
        restaurantId
      );

      if (res.status === API_RESPONSE_STATUS.SUCCESS && res.result != null) {
        return res.result as TimeSlot[];
      }

      if (res.status === API_RESPONSE_STATUS.FAIL) {
        handleNotify(
          res.message,
          ToasterPositions.TopRight,
          ToasterTypes.Error
        );
      }

      return [];
    })();

    OrderServices.timeslotCache.set(key, promise);

    promise.catch(() => {
      OrderServices.timeslotCache.delete(key);
    });

    return promise;
  }

  static async checkTimeBySlot({
    restaurantId,
    locationId,
    recievingTime,
    recieving,
    flg,
    obj,
    requestId = "",
    timeSlot,
    date,
  }: CheckTimeBySlotArgsTypes) {
    responseclass = new ResponseModel();
    const selectedAddress = {
      deliveryAddressId: obj?.deliveryaddressId ?? 0,
      restaurantId: restaurantId,
      locationId: locationId as number,
      address1: obj?.address1,
      address2: obj?.address2,
      landmark: obj?.landmark,
      city: obj?.city,
      zipcode: obj?.zipcode,
      latitude: 0,
      longitude: 0,
      state: obj?.state,
      country: obj?.country,
      requestId,
      slotDate: date,
      timeSlot: timeSlot,
    };
    const methodName = "checkTimeBySlot";
    const checktimeurl = ENDPOINTS.CHECKTIMEBYSLOT;
    const data = {
      model: {
        ...selectedAddress,
        restaurantId: restaurantId,
        locationId: locationId,
        recievingTime: recievingTime,
        recieving: recieving,
        flg: flg,
      },
    };
    responseclass = await handleAxiosPostAsync(
      data,
      checktimeurl,
      methodName,
      true,
      restaurantId
    );
    if (
      responseclass.result != null &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      return responseclass.result;
    } else {
      return responseclass;
    }
  }
}
