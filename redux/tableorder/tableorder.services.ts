import { ResponseModel } from "@/components/common/commonclass";
import { API_RESPONSE_STATUS } from "@/components/common/enums";
import { ENDPOINTS } from "@/components/default/config";
import handleNotify from "@/components/default/helpers/toaster/toaster-notify";
import { ToasterPositions } from "@/components/default/helpers/toaster/toaster-positions";
import { ToasterTypes } from "@/components/default/helpers/toaster/toaster-types";
import { handleAxiosPostAsync } from "@/components/default/helpers/utility";
import { LoggedInUser } from "../login/login.types";

let responseclass = new ResponseModel();

export class TableOrderServices {
    static async registerUser(user: LoggedInUser, restaurantId: number,): Promise<string | null> {
        responseclass = new ResponseModel();
        const methodName = "sendVerificationEmail";
        const sendVerificationEmail = ENDPOINTS.SEND_VERIFICATION_EMAIL;
        const data = {
            sendEmailRequest: {
                ...user,
                restaurantId,
            },
        };
        responseclass = await handleAxiosPostAsync(data, sendVerificationEmail, methodName, true, restaurantId);
        return responseclass.result != null && responseclass.status === API_RESPONSE_STATUS.SUCCESS ? responseclass.result : null;
    }

    static async verifyOtp(user: LoggedInUser, restaurantId: number,): Promise<string | null> {
        responseclass = new ResponseModel();
        const methodName = "sendVerificationEmail";
        const sendVerificationEmail = ENDPOINTS.SEND_VERIFICATION_EMAIL;
        const data = {
            sendEmailRequest: {
                ...user,
                restaurantId,
            },
        };
        responseclass = await handleAxiosPostAsync(data, sendVerificationEmail, methodName, true, restaurantId);
        return responseclass.result != null && responseclass.status === API_RESPONSE_STATUS.SUCCESS ? responseclass.result : null;
    }

    static async getCustomerByPhone(phone: string, restaurantId: number, isPos: boolean = true): Promise<string | null> {
        responseclass = new ResponseModel();
        const methodName = "getCustomerByPhone";
        const endpoint = ENDPOINTS.GET_CUSTOMER_BY_PHONE;
        const data = {
            ispos: isPos,
            phonenumber: phone,
            restaurantId,
        };
        responseclass = await handleAxiosPostAsync(data, endpoint, methodName, true, restaurantId);
        return responseclass.result != null && responseclass.status === API_RESPONSE_STATUS.SUCCESS ? responseclass.result : null;
    }

    static async insertToOtherCustomer(user: LoggedInUser, restaurantId: number): Promise<string | null> {
        responseclass = new ResponseModel();
        const methodName = "insertToOtherCustomer";
        const endpoint = ENDPOINTS.INSERT_TO_OTHER_CUSTOMER;
        const data = {
            othercustomer: user,
        };
        responseclass = await handleAxiosPostAsync(data, endpoint, methodName, true, restaurantId);
        return responseclass.result != null && responseclass.status === API_RESPONSE_STATUS.SUCCESS ? responseclass.result : null;
    }

    static async getPosTableDetails(restaurantId: number, locationId: string, tableno: string): Promise<string | null> {
        responseclass = new ResponseModel();
        const methodName = "getPosTableDetails";
        const endpoint = ENDPOINTS.GET_POS_TABLE_DETAILS;
        const data = {
            request: {
                locationId,
                restaurantId,
                tableno,
            },
        };
        responseclass = await handleAxiosPostAsync(data, endpoint, methodName, true, restaurantId);
        return responseclass.result != null && responseclass.status === API_RESPONSE_STATUS.SUCCESS ? responseclass.result : null;
    }

    static async getListofPrinterSetting(restaurantId: number, locationId: string): Promise<string | null> {
        responseclass = new ResponseModel();
        const methodName = "getListofPrinterSetting";
        const endpoint = ENDPOINTS.GET_PRINTER_INFORMATION;
        const data = {
            locationId,
            restaurantId,
        };
        responseclass = await handleAxiosPostAsync(data, endpoint, methodName, true, restaurantId);
        return responseclass.result != null && responseclass.status === API_RESPONSE_STATUS.SUCCESS ? responseclass.result : null;
    }

    static async getPOSSerachResult(locationId: number, restaurantId: number, customerId: string, serchQuery: string): Promise<any> {
        responseclass = new ResponseModel();
        const methodName = "getSerachResult";
        const endpoint = ENDPOINTS.GET_POS_MENUITEM_SEARCH;
        const data = {
            searchMenuItemRequest: {
                locationId,
                restaurantId,
                customerId,
                input: serchQuery,
            },
        };
        responseclass = await handleAxiosPostAsync(data, endpoint, methodName, true, restaurantId);
        return responseclass.result != null && responseclass.status === API_RESPONSE_STATUS.SUCCESS && responseclass?.message === ""
            ? responseclass.result
            : {};
    }

    static async sendTablePushnotification(
        locationId: string,
        restaurantId: number,
        tableno: string,
        tableId: string,
        notificationType: number,
        driverOrderStatus: number
    ): Promise<any> {
        responseclass = new ResponseModel();
        const methodName = "sendTablePushnotification";
        const endpoint = ENDPOINTS.SEND_TABLE_PUSH_NOTIFICATION;
        const data = {
            request: {
                LocationId: locationId,
                RestaurantId: restaurantId,
                TableNo: tableno,
                TableId: tableId,
                NotificationType: notificationType,
                DriverOrderStatus: driverOrderStatus,
            },
        };
        responseclass = await handleAxiosPostAsync(data, endpoint, methodName, true, restaurantId);
        return responseclass.result != null && responseclass.status === API_RESPONSE_STATUS.SUCCESS && responseclass?.message === ""
            ? responseclass
            : {};
    }

    static async getSystemCustomer(restaurantId: number): Promise<any> {
        responseclass = new ResponseModel();
        const methodName = "getSystemCustomer";
        const endpoint = ENDPOINTS.GET_SYSTEM_CUSTOMER;
        const data = { restaurantId };
        responseclass = await handleAxiosPostAsync(data, endpoint, methodName, true, restaurantId);
        return responseclass.result != null && responseclass.status === API_RESPONSE_STATUS.SUCCESS && responseclass?.message === ""
            ? responseclass
            : {};
    }

    static async addOrders(
        OrderInfo: string,
        restaurantId: number,
        loyaltynumber: string,
        appOrderId: string
    ): Promise<any> {
        responseclass = new ResponseModel();
        const methodName = "addOrders";
        const endpoint = ENDPOINTS.ADD_ORDERS_TABLE;
        const data = {
            OrderInfo,
            restaurantId,
            loyaltynumber,
            appOrderId,
        };
        responseclass = await handleAxiosPostAsync(data, endpoint, methodName, true, restaurantId);
        if (responseclass.result !== null && (responseclass.status) === API_RESPONSE_STATUS.SUCCESS) {              //parseInt (responseclass.status)
            return responseclass.result;
        } else {
            if (responseclass.message !== "") {
                handleNotify(responseclass.message, ToasterPositions.TopRight, ToasterTypes.Error);
            }
            return {};
        }
    }
}