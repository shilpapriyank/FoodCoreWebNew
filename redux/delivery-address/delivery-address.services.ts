import { ResponseModel } from "@/components/common/commonclass";
import { ERRORMESSAGE } from "@/components/common/commonerrormessage";
import { API_RESPONSE_STATUS } from "@/components/common/enums";
import { ENDPOINTS } from "@/components/default/config";
import handleNotify from "@/components/default/helpers/toaster/toaster-notify";
import { ToasterPositions } from "@/components/default/helpers/toaster/toaster-positions";
import { ToasterTypes } from "@/components/default/helpers/toaster/toaster-types";
import { handleAxiosPostAsync } from "@/components/default/helpers/utility";
import { DeliveryAddressInput, VerifyAddressInput } from "./delivery-address.types";

let responseclass = new ResponseModel();


export class DeliveryAddressServices {
    static async getDeliveryAddress(
        customerId: number | string,
        restaurantId: any,
        locationId: number | string
    ): Promise<any[] | null> {
        responseclass = new ResponseModel();
        const methodName = "getDeliveryAddress";
        const location = ENDPOINTS.GET_DELIVERY_ADDRESS;
        const data = {
            customerId: parseInt(customerId as string),
            restaurantId: parseInt(restaurantId as string),
            locationId: parseInt(locationId as string)
        };

        responseclass = await handleAxiosPostAsync(data, location, methodName, true, restaurantId);
        if (responseclass.result != null && responseclass.status === API_RESPONSE_STATUS.SUCCESS) {
            return responseclass.result;
        } else {
            return null;
        }
    }

    static async deleteDeliveryAddress(
        deliveryaddressId: number | string,
        restaurantId: any
    ): Promise<any | null> {
        responseclass = new ResponseModel();
        const methodName = "deleteDeliveryAddress";
        const location = ENDPOINTS.DELETE_DELIVERY_ADDRESS;
        const data = {
            deliveryaddressId: parseInt(deliveryaddressId as string),
            restaurantId: parseInt(restaurantId as string)
        };

        responseclass = await handleAxiosPostAsync(data, location, methodName, true, restaurantId);
        if (responseclass.result != null && responseclass.status === API_RESPONSE_STATUS.SUCCESS) {
            handleNotify('Address removed successfully!', ToasterPositions.TopRight, ToasterTypes.Success);
            return responseclass.result;
        } else {
            handleNotify('Address removed successfully!', ToasterPositions.TopRight, ToasterTypes.Error);
            return null;
        }
    }

    static async addDeliveryAddress(
        obj: DeliveryAddressInput,
        restaurantId: any,
        locationId: string
    ): Promise<any | null> {
        responseclass = new ResponseModel();
        const methodName = "addDeliveryAddress";
        const location = ENDPOINTS.ADD_DELIVERY_ADDRESS;
        const data = {
            deliveryAddressRequest: {
                customerId: parseInt(obj.customerId as string),
                othercustomerId: parseInt(obj.othercustomerId as string),
                deliveryaddressId: parseInt(obj.deliveryaddressId as string),
                address1: obj.address1,
                address2: obj.address2,
                landmark: obj.landmark,
                city: obj.city,
                zipcode: obj.zipcode,
                contactno: obj.contactno,
                contactname: obj.contactname,
                latitude: parseFloat(obj.latitude as string),
                longitude: parseFloat(obj.longitude as string),
                state: obj.state,
                country: obj.country,
                addresstype: obj.addresstype,
                businessname: obj.businessname
            },
            restaurantId: parseInt(restaurantId as string),
            locationId: parseInt(locationId as string)
        };

        responseclass = await handleAxiosPostAsync(data, location, methodName, true, restaurantId);
        if (responseclass.result != null && responseclass.status === API_RESPONSE_STATUS.SUCCESS) {
            handleNotify('Address added successfully!', ToasterPositions.TopRight, ToasterTypes.Success);
            return responseclass.result;
        } else {
            handleNotify(responseclass?.message ? responseclass.message : ERRORMESSAGE.TRYAGAIN, ToasterPositions.TopRight, ToasterTypes.Error);
            return null;
        }
    }

    static async verifyDeliveryAddresss(
        obj: VerifyAddressInput,
        restaurantId: number,
        locationId: number
    ): Promise<ResponseModel | null> {
        responseclass = new ResponseModel();
        const methodName = "validateDeliveryAddress";
        const location = ENDPOINTS.VERIFY_DELIVERY_ADDRESS_MAX_LIMIT;

        const data = {
            deliveryAddressRequest: {
                deliveryAddressId: obj?.deliveryaddressId ?? 0,
                restaurantId,
                locationId,
                address1: obj.address1,
                address2: obj.address2,
                landmark: obj.landmark,
                city: obj.city,
                zipcode: obj.zipcode,
                latitude: parseFloat(obj.latitude as string),
                longitude: parseFloat(obj.longitude as string),
                state: obj.state,
                country: obj.country
            }
        };

        responseclass = await handleAxiosPostAsync(data, location, methodName, true, restaurantId);
        if (responseclass.status === API_RESPONSE_STATUS.SUCCESS) {
            return responseclass;
        } else {
            handleNotify(responseclass?.message ? responseclass.message : ERRORMESSAGE.TRYAGAIN, ToasterPositions.TopRight, ToasterTypes.Error);
            return null;
        }
    }
}
