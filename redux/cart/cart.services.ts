import { handleAxiosPostAsync } from "@/components/default/helpers/utility";
import { ToasterTypes } from "@/components/default/helpers/toaster/toaster-types";
import { ToasterPositions } from "@/components/default/helpers/toaster/toaster-positions";
import handleNotify from "@/components/default/helpers/toaster/toaster-notify";
import { ENDPOINTS } from "@/components/default/config";
import { API_RESPONSE_STATUS } from "@/components/common/enums";
import { ResponseModel } from "@/components/common/commonclass";
import { ERRORMESSAGE } from "@/components/common/commonerrormessage";
import { getDate, ORDER_TIME_TYPE } from "@/components/common/utility";
import { ParseArgsConfig } from "util";
import {
  CartTotal,
  GetCartItems,
  GetCartItemsCount,
  GetCartItemsList,
  OrderObjType,
} from "@/types/cart-types/cartservice.type";

let responseclass = new ResponseModel();

export class CartServices {
  static async getCartItemList({
    cartsessionId,
    locationId,
    restaurantId,
    cartId,
    customerId,
    rewardpoints,
    redeemamount,
    deliveryaddressId,
    tipPercentage,
    tipAmount,
    ordertype,
    selectedTime,
    requestId,
  }: {
    cartsessionId: string;
    locationId: number;
    restaurantId: number;
    cartId: number;
    customerId: number;
    rewardpoints?: number;
    redeemamount?: number;
    deliveryaddressId?: number;
    tipPercentage?: number;
    tipAmount?: number;
    ordertype?: number;
    selectedTime: string;
    requestId: string;
  }): Promise<GetCartItems | null> {
    responseclass = new ResponseModel();
    const methodName = "getCartItemList";
    const location = ENDPOINTS.GET_CART_ITEM;

    const data = {
      cartItem: {
        cartsessionId: cartsessionId,
        locationId: locationId,
        restaurantId: restaurantId,
        cartId: cartId,
        customerId: customerId,
        rewardpoints: rewardpoints != undefined ? rewardpoints : 0,
        redeemamount: redeemamount != undefined ? redeemamount : 0,
        tipPercentage: tipPercentage,
        tipAmount: tipAmount,
        deliveryaddressId:
          deliveryaddressId != undefined && deliveryaddressId > 0
            ? deliveryaddressId
            : 0,
        ordertype: ordertype,
        requestId: requestId,
        selectedTime: selectedTime,
        recievingDate: getDate(),
      },
    };

    responseclass = await handleAxiosPostAsync(
      data,
      location,
      methodName,
      true,
      restaurantId
    );
    if (
      responseclass.result != null &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      return responseclass.result as GetCartItems;
    } else {
      return null;
    }
  }

  static async getCartItemCount(
    cartsessionId: string,
    locationId: number,
    restaurantId: number,
    customerId: number
  ): Promise<GetCartItemsCount | 0> {
    responseclass = new ResponseModel();
    const methodName = "getCartItemCount";
    const location = ENDPOINTS.GET_CART_ITEM_COUNT;
    const data = {
      cartsessionId: cartsessionId,
      locationId: locationId,
      restaurantId: restaurantId,
      customerId: customerId,
    };
    responseclass = await handleAxiosPostAsync(
      data,
      location,
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
      return 0;
    }
  }

  static async deleteCartItem(
    cartsessionId: string,
    cartId: number,
    restaurantId: number,
    locationId: number
  ): Promise<string | null> {
    responseclass = new ResponseModel();
    const methodName = "deleteCartItem";
    const location = ENDPOINTS.DELETE_CART_ITEM;
    const data = {
      cartsessionId: cartsessionId,
      cartId: cartId,
      restaurantId: restaurantId,
      locationId: locationId,
    };
    responseclass = await handleAxiosPostAsync(
      data,
      location,
      methodName,
      true,
      restaurantId
    );
    if (responseclass.status === API_RESPONSE_STATUS.SUCCESS) {
      handleNotify(
        "Item removed successfully!",
        ToasterPositions.TopRight,
        ToasterTypes.Success
      );
      return responseclass.result;
    } else {
      handleNotify(
        responseclass.message ?? ERRORMESSAGE.TRYAGAIN,
        ToasterPositions.TopRight,
        ToasterTypes.Error
      );
      return null;
    }
  }

  static async checkCustomerRewardPoints(
    restaurantId: number,
    customerId: number,
    rewardpoints: number,
    amount: string
  ): Promise<ResponseModel | null> {
    responseclass = new ResponseModel();
    const methodName = "checkCustomerRewardPoints";
    const location = ENDPOINTS.CHECK_CUSTOMER_REWARD_POINTS;

    const data = {
      restaurantId: restaurantId,
      customerId: customerId,
      rewardpoints: rewardpoints,
      amount: parseFloat(amount),
    };

    responseclass = await handleAxiosPostAsync(
      data,
      location,
      methodName,
      true,
      restaurantId
    );
    if (responseclass.status === API_RESPONSE_STATUS.SUCCESS) {
      if (rewardpoints > 0) {
        handleNotify(
          `${rewardpoints}  Reward Points has been redeemed`,
          ToasterPositions.TopRight,
          ToasterTypes.Success
        );
      }
      return responseclass;
    } else {
      handleNotify(
        responseclass.message ?? ERRORMESSAGE.TRYAGAIN,
        ToasterPositions.TopRight,
        ToasterTypes.Error
      );
      return null;
    }
  }

  static async updatequantity(
    cartsessionId: string,
    cartId: number,
    qty: number,
    price: string,
    locationId: number,
    restaurantId: number
  ): Promise<GetCartItemsCount | number> {
    responseclass = new ResponseModel();
    const methodName = "updatequantity";
    const location = ENDPOINTS.UPDATE_QUANTITY;

    const data = {
      updateCartItem: {
        cartsessionId: cartsessionId,
        cartId: cartId,
        qty: qty,
        price: parseFloat(price),
        locationId: locationId,
        restaurantId: restaurantId,
      },
    };

    responseclass = await handleAxiosPostAsync(
      data,
      location,
      methodName,
      true,
      restaurantId
    );
    if (responseclass.status === API_RESPONSE_STATUS.SUCCESS) {
      handleNotify(
        responseclass.message,
        ToasterPositions.TopRight,
        ToasterTypes.Success
      );
      return responseclass.result;
    } else {
      handleNotify(
        responseclass.message ?? ERRORMESSAGE.TRYAGAIN,
        ToasterPositions.TopRight,
        ToasterTypes.Error
      );
      return 0;
    }
  }

  static async carttotal(
    cartsessionId: string,
    locationId: number,
    restaurantId: number,
    customerId: number,
    cartId: number,
    rewardpoints?: string,
    redeemamount?: string,
    tipPercentage?: string,
    tipAmount?: number,
    deliveryaddressId?: number,
    ordertype?: number,
    requestId?: string,
    recievingTime: string = "",
    recievingMeridian: string = "",
    ordertimetype: number = ORDER_TIME_TYPE.ASAP.value,
    recievingDate: string = "",
    enableTimeSlot: boolean = false
  ): Promise<CartTotal | null> {
    responseclass = new ResponseModel();
    const methodName = "carttotal";
    const location = ENDPOINTS.GET_CART_TOTAL;

    const data = {
      cartItem: {
        cartsessionId: cartsessionId != undefined ? cartsessionId : 0,
        locationId: locationId != undefined ? locationId : 0,
        restaurantId: restaurantId != undefined ? restaurantId : 0,
        customerId: customerId != undefined ? customerId : 0,
        cartId: cartId != undefined ? cartId : 0,
        rewardpoints: rewardpoints != undefined ? parseInt(rewardpoints) : 0,
        redeemamount: redeemamount != undefined ? parseFloat(redeemamount) : 0,
        tipPercentage:
          tipPercentage != undefined && tipPercentage != ""
            ? parseFloat(tipPercentage)
            : 0,
        tipAmount: tipAmount != undefined && tipAmount != null ? tipAmount : 0,
        deliveryaddressId:
          deliveryaddressId != undefined && deliveryaddressId > 0
            ? deliveryaddressId
            : 0,
        ordertype: ordertype,
        requestId: requestId,
        recievingTime: recievingTime,
        recievingMeridian: recievingMeridian,
        ordertimetype: ordertimetype,
        recievingDate: recievingDate,
      },
    };

    responseclass = await handleAxiosPostAsync(
      data,
      location,
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

  static async deliverycharges(
    restaurantId: number,
    locationId: number,
    isGeoFancing: boolean
  ): Promise<any | null> {
    responseclass = new ResponseModel();
    const methodName = "deliverycharges";
    const location = ENDPOINTS.GET_DELIVERY_CHARGES;

    const data = {
      restaurantId: restaurantId,
      locationId: locationId,
      isGeoFancing: isGeoFancing,
    };

    responseclass = await handleAxiosPostAsync(
      data,
      location,
      methodName,
      true,
      restaurantId
    );
    if (
      responseclass.result != null &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      //handleNotify(responseclass.message, ToasterPositions.TopRight, ToasterTypes.Success);
      return responseclass.result;
    } else {
      //handleNotify(responseclass.message, ToasterPositions.TopRight, ToasterTypes.Success);
      return null;
    }
  }

  static async cartcheckout(
    itemobj: OrderObjType,
    restaurantId: number
  ): Promise<any | null> {
    responseclass = new ResponseModel();
    const methodName = "cartcheckout";
    const location = ENDPOINTS.CART_CHECKOUT;

    const data = {
      obj: itemobj,
    };

    responseclass = await handleAxiosPostAsync(
      data,
      location,
      methodName,
      true,
      restaurantId
    );
    if (
      responseclass.result != null &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      //handleNotify(responseclass.message, ToasterPositions.TopRight, ToasterTypes.Success);
      return responseclass.result;
    } else {
      return null;
    }
  }

  static async getstripepaymentintentid(
    restaurantId: number,
    locationId: number,
    orderId: number,
    customerId: number,
    totalAmount: number
  ): Promise<any | null> {
    responseclass = new ResponseModel();
    const methodName = "getstripepaymentintentid";
    const location = ENDPOINTS.GET_PAYMENT_INTENT_ID;

    const data = {
      paymentIntent: {
        restaurantId: restaurantId,
        locationId: locationId,
        orderId: orderId,
        customerId: customerId,
        totalAmount: totalAmount,
      },
    };

    responseclass = await handleAxiosPostAsync(
      data,
      location,
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

  static async confirmstripepayment(
    restaurantId: number,
    locationId: number,
    orderId: number,
    customerId: number,
    totalAmount: number,
    paymentMethodId: string,
    paymentIntentId: string,
    cardname: string,
    cardnumber: string,
    cvv: string,
    expmonth: string,
    expyear: string,
    zipcode: string
  ): Promise<any | null> {
    responseclass = new ResponseModel();
    const methodName = "confirmstripepayment";
    const location = ENDPOINTS.CONFIRM_STRIPE_PAYMENT;

    const data = {
      paymentIntent: {
        restaurantId: restaurantId,
        locationId: locationId,
        orderId: orderId,
        customerId: customerId,
        totalAmount: totalAmount,
        paymentIntentId: paymentIntentId,
        paymentMethodId: paymentMethodId,
        cardname: cardname,
        cardnumber: cardnumber,
        cvv: cvv,
        expmonth: expmonth,
        expyear: expyear,
        zipcode: zipcode,
      },
    };

    responseclass = await handleAxiosPostAsync(
      data,
      location,
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

  static async deleteCartItemFromSessionId(
    cartsessionId: string,
    restaurantId: number,
    locationId: number
  ) {
    const responseclass = new ResponseModel();
    const methodName = "deleteCartItemFromSessionId";
    const location = ENDPOINTS.DELETE_CART_FROM_SESSIONID;

    const data = {
      cartsessionId: cartsessionId,
      restaurantId: restaurantId,
      locationId: locationId,
    };

    const response = await handleAxiosPostAsync(
      data,
      location,
      methodName,
      true,
      restaurantId
    );

    if (
      response.result != null &&
      response.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      return response.result;
    } else {
      return null;
    }
  }

  static async updateAndConfirmPayment(
    restaurantId: number,
    orderId: number,
    paymentIntentId: string,
    paymentMethodId: string,
    threeDPopupLoadPageURL: string,
    paymentIdRequire: boolean = false
  ): Promise<any> {
    responseclass = new ResponseModel();
    const paymenturl = ENDPOINTS.UPDATE_CONFIRM_PAYMENT;
    const methodName = "updateAndConfirmPayment";

    const data = {
      paymentRequest: {
        restaurantId: restaurantId,
        orderId: orderId,
        paymentIntentId: paymentIntentId,
        paymentMethodId: paymentMethodId,
        returnURL: threeDPopupLoadPageURL,
        paymentIdRequire: paymentIdRequire,
      },
    };

    responseclass = await handleAxiosPostAsync(
      data,
      paymenturl,
      methodName,
      true,
      restaurantId
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
      return responseclass.result;
    } else {
      return responseclass.result;
    }
  }

  static async afterPaymentSuccess(
    restaurantId: number,
    orderId: number,
    source: number = 0
  ): Promise<any> {
    const paymenturl = ENDPOINTS.AFTER_PAYMENT_SUCCESS;
    const methodName = "afterPaymentSuccess";

    const data = {
      afterPayment: {
        restaurantId: restaurantId,
        orderId: orderId,
        source: source,
      },
    };

    responseclass = await handleAxiosPostAsync(
      data,
      paymenturl,
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
      return responseclass.result;
    }
  }
}
