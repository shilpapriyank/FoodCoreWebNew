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

let responseclass = new ResponseModel();

export class CartServices {
    static async getCartItemList(
        cartsessionId: string,
        locationId: number,
        restaurantId: number,
        cartId: number,
        customerId: number,
        rewardpoints?: number,
        redeemamount?: number,
        deliveryaddressId?: number,
        tipPercentage?: number,
        tipAmount?: number,
        ordertype?: string,
        selectedTime: string = "",
        requestId: string = ""
    ): Promise<any | null> {
        responseclass = new ResponseModel();
        const methodName = "getCartItemList";
        const location = ENDPOINTS.GET_CART_ITEM;

        const data = {
            cartItem: {
                cartsessionId,
                locationId: parseInt(locationId.toString()),
                restaurantId: parseInt(restaurantId.toString()),
                cartId: parseInt(cartId.toString()),
                customerId: parseInt(customerId.toString()),
                rewardpoints: rewardpoints ?? 0,
                redeemamount: redeemamount ?? 0,
                tipPercentage,
                tipAmount,
                deliveryaddressId: deliveryaddressId && deliveryaddressId > 0 ? parseInt(deliveryaddressId.toString()) : 0,
                ordertype,
                requestId,
                selectedTime,
                recievingDate: getDate()
            }
        };

        responseclass = await handleAxiosPostAsync(data, location, methodName, true, restaurantId);
        if (responseclass.result != null && responseclass.status === API_RESPONSE_STATUS.SUCCESS) {
            return responseclass.result;
        } else {
            return null;
        }
    }

    static async getCartItemCount(
        cartsessionId: string,
        locationId: string,
        restaurantId: any,
        customerId: string
    ): Promise<number> {
        responseclass = new ResponseModel();
        const methodName = "getCartItemCount";
        const location = ENDPOINTS.GET_CART_ITEM_COUNT;
        const data = {
            cartsessionId: cartsessionId,
            locationId: parseInt(locationId),
            restaurantId: parseInt(restaurantId),
            customerId: parseInt(customerId)
        };
        responseclass = await handleAxiosPostAsync(data, location, methodName, true, restaurantId);

        if (responseclass.result != null && responseclass.status === API_RESPONSE_STATUS.SUCCESS) {
            return responseclass.result;
        } else {
            return 0;
        }
    }

    static async deleteCartItem(
        cartsessionId: string,
        cartId: string,
        restaurantId: any,
        locationId: string
    ): Promise<any | null> {
        responseclass = new ResponseModel();
        const methodName = "deleteCartItem";
        const location = ENDPOINTS.DELETE_CART_ITEM;
        const data = {
            cartsessionId: cartsessionId,
            cartId: parseInt(cartId),
            restaurantId: parseInt(restaurantId),
            locationId: parseInt(locationId)
        };
        responseclass = await handleAxiosPostAsync(data, location, methodName, true, restaurantId);
        if (responseclass.status === API_RESPONSE_STATUS.SUCCESS) {
            handleNotify("Item removed successfully!", ToasterPositions.TopRight, ToasterTypes.Success);
            return responseclass.result;
        } else {
            handleNotify(responseclass.message ?? ERRORMESSAGE.TRYAGAIN, ToasterPositions.TopRight, ToasterTypes.Error);
            return null;
        }
    }

    static async checkCustomerRewardPoints(
        restaurantId: any,
        customerId: string,
        rewardpoints: any,
        amount: string
    ): Promise<ResponseModel | null> {
        responseclass = new ResponseModel();
        const methodName = "checkCustomerRewardPoints";
        const location = ENDPOINTS.CHECK_CUSTOMER_REWARD_POINTS;

        const data = {
            restaurantId: restaurantId,
            customerId: parseInt(customerId),
            rewardpoints: parseInt(rewardpoints),
            amount: parseFloat(amount)
        };

        responseclass = await handleAxiosPostAsync(data, location, methodName, true, restaurantId);
        if (responseclass.status === API_RESPONSE_STATUS.SUCCESS) {
            if (rewardpoints > 0) {
                handleNotify(`${rewardpoints}  Reward Points has been redeemed`, ToasterPositions.TopRight, ToasterTypes.Success);
            }
            return responseclass;
        } else {
            handleNotify(responseclass.message ?? ERRORMESSAGE.TRYAGAIN, ToasterPositions.TopRight, ToasterTypes.Error);
            return null;
        }
    }

    static async updatequantity(
        cartsessionId: string,
        cartId: string,
        qty: string,
        price: string,
        locationId: string,
        restaurantId: any
    ): Promise<any | null> {
        responseclass = new ResponseModel();
        const methodName = "updatequantity";
        const location = ENDPOINTS.UPDATE_QUANTITY;

        const data = {
            updateCartItem: {
                cartsessionId: cartsessionId,
                cartId: parseInt(cartId),
                qty: parseInt(qty),
                price: parseFloat(price),
                locationId: parseInt(locationId),
                restaurantId: parseInt(restaurantId)
            }
        };

        responseclass = await handleAxiosPostAsync(data, location, methodName, true, restaurantId);
        if (responseclass.status === API_RESPONSE_STATUS.SUCCESS) {
            handleNotify(responseclass.message, ToasterPositions.TopRight, ToasterTypes.Success);
            return responseclass.result;
        } else {
            handleNotify(responseclass.message ?? ERRORMESSAGE.TRYAGAIN, ToasterPositions.TopRight, ToasterTypes.Error);
            return null;
        }
    }

    static async carttotal(
        cartsessionId: string,
        locationId: string,
        restaurantId: any,
        customerId: string,
        cartId: string,
        rewardpoints?: string,
        redeemamount?: string,
        tipPercentage?: string,
        tipAmount?: string,
        deliveryaddressId?: any,
        ordertype?: string,
        requestId?: string,
        recievingTime: string = "",
        recievingMeridian: string = "",
        ordertimetype: number = ORDER_TIME_TYPE.ASAP.value,
        recievingDate: string = "",
        enableTimeSlot: boolean = false
    ): Promise<any | null> {
        responseclass = new ResponseModel();
        const methodName = "carttotal";
        const location = ENDPOINTS.GET_CART_TOTAL;

        const data = {
            cartItem: {
                cartsessionId: cartsessionId != undefined ? cartsessionId : 0,
                locationId: locationId != undefined ? parseInt(locationId) : 0,
                restaurantId: restaurantId != undefined ? parseInt(restaurantId) : 0,
                customerId: customerId != undefined ? parseInt(customerId) : 0,
                cartId: cartId != undefined ? parseInt(cartId) : 0,
                rewardpoints: rewardpoints != undefined ? parseInt(rewardpoints) : 0,
                redeemamount: redeemamount != undefined ? parseFloat(redeemamount) : 0,
                tipPercentage: tipPercentage != undefined && tipPercentage != "" ? parseFloat(tipPercentage) : 0,
                tipAmount: tipAmount != undefined && tipAmount != "" ? parseFloat(tipAmount) : 0,
                deliveryaddressId: deliveryaddressId != undefined && deliveryaddressId > 0 ? parseInt(deliveryaddressId) : 0,
                ordertype: ordertype,
                requestId: requestId,
                recievingTime: recievingTime,
                recievingMeridian: recievingMeridian,
                ordertimetype: ordertimetype,
                recievingDate: recievingDate
            }
        };

        responseclass = await handleAxiosPostAsync(data, location, methodName, true, restaurantId);
        if (responseclass.result != null && responseclass.status === API_RESPONSE_STATUS.SUCCESS) {
            return responseclass.result;
        } else {
            return null;
        }
    }

    static async deliverycharges(
        restaurantId: number,
        locationId: number,
        isGeoFancing: boolean
    ): Promise<any[]> {
        responseclass = new ResponseModel();
        const methodName = "deliverycharges";
        const location = ENDPOINTS.GET_DELIVERY_CHARGES;

        const data = {
            restaurantId: restaurantId,
            locationId: locationId,
            isGeoFancing: isGeoFancing
        };

        responseclass = await handleAxiosPostAsync(data, location, methodName, true, restaurantId);
        if (responseclass.result != null && responseclass.status === API_RESPONSE_STATUS.SUCCESS) {
            //handleNotify(responseclass.message, ToasterPositions.TopRight, ToasterTypes.Success);
            return responseclass.result;
        } else {
            //handleNotify(responseclass.message, ToasterPositions.TopRight, ToasterTypes.Success);
            return [];
        }
    }

    static async cartcheckout(itemobj: any, restaurantId: number): Promise<any | null> {
        responseclass = new ResponseModel();
        const methodName = "cartcheckout";
        const location = ENDPOINTS.CART_CHECKOUT;

        const data = {
            obj: itemobj
        };

        responseclass = await handleAxiosPostAsync(data, location, methodName, true, restaurantId);
        if (responseclass.result != null && responseclass.status === API_RESPONSE_STATUS.SUCCESS) {
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
                totalAmount: totalAmount
            }
        };

        responseclass = await handleAxiosPostAsync(data, location, methodName, true, restaurantId);
        if (responseclass.result != null && responseclass.status === API_RESPONSE_STATUS.SUCCESS) {
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
                zipcode: zipcode
            }
        };

        responseclass = await handleAxiosPostAsync(data, location, methodName, true, restaurantId);
        if (responseclass.result != null && responseclass.status === API_RESPONSE_STATUS.SUCCESS) {
            return responseclass.result;
        } else {
            return null;
        }
    }


    static async deleteCartItemFromSessionId(
        cartsessionId: string,
        restaurantId: any,
        locationId: string
    ): Promise<any | null> {
        const responseclass = new ResponseModel();
        const methodName = "deleteCartItemFromSessionId";
        const location = ENDPOINTS.DELETE_CART_FROM_SESSIONID;

        const data = {
            cartsessionId: cartsessionId,
            restaurantId: parseInt(restaurantId),
            locationId: parseInt(locationId),
        };

        const response = await handleAxiosPostAsync(data, location, methodName, true, restaurantId);

        if (response.result != null && response.status === API_RESPONSE_STATUS.SUCCESS) {
            return response.result;
        } else {
            return null;
        }
    }

    static async updateAndConfirmPayment(
        restaurantId: any,
        orderId: string,
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
                restaurantId: parseInt(restaurantId),
                orderId: parseInt(orderId),
                paymentIntentId: paymentIntentId,
                paymentMethodId: paymentMethodId,
                returnURL: threeDPopupLoadPageURL,
                paymentIdRequire: paymentIdRequire,
            },
        };

        responseclass = await handleAxiosPostAsync(data, paymenturl, methodName, true, restaurantId);
        if (responseclass.result != null && responseclass.status === API_RESPONSE_STATUS.SUCCESS) {
            handleNotify(responseclass.result.message, ToasterPositions.TopRight, ToasterTypes.Success);
            return responseclass.result;
        } else {
            return responseclass.result;
        }
    }

    static async afterPaymentSuccess(
        restaurantId: any,
        orderId: string,
        source: number = 0
    ): Promise<any> {
        const paymenturl = ENDPOINTS.AFTER_PAYMENT_SUCCESS;
        const methodName = "afterPaymentSuccess";

        const data = {
            afterPayment: {
                restaurantId: parseInt(restaurantId),
                orderId: parseInt(orderId),
                source: source,
            },
        };

        responseclass = await handleAxiosPostAsync(data, paymenturl, methodName, true, restaurantId);
        if (responseclass.result != null && responseclass.status === API_RESPONSE_STATUS.SUCCESS) {
            return responseclass.result;
        } else {
            return responseclass.result;
        }
    }
};