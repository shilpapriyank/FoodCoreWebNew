import { ResponseModel } from "@/components/common/commonclass";
import { API_RESPONSE_STATUS } from "@/components/common/enums";
import { ENDPOINTS } from "@/components/default/config";
import { handleAxiosPostAsync } from "@/components/default/helpers/utility";
import path from "path";

let responseclass = new ResponseModel();

export class LoginServices {
  static async getLoginUserDetails({
    username,
    password,
    restaurantId,
    dialCode,
    locationid,
  }: {
     username: string;
    password: string;
    restaurantId: number;
    dialCode: string;
    locationid: number;
  }): Promise<ResponseModel | any> {
    responseclass = new ResponseModel();
    const methodName = "getLoginUserDetails";
    const login = ENDPOINTS.LOGIN;
    const lid = locationid;
    const data = {
      loginRequest: {
        dialCode,
        username,
        password,
        restaurantId,
        locationId: lid,
      },
    };
    responseclass = await handleAxiosPostAsync(
      data,
      login,
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

  static async getCustomerDetails(
    restaurantId: any,
    customerId: number,
    locationId: number
  ): Promise<any> {
    responseclass = new ResponseModel();
    const methodName = "getCustomerDetails";
    const customer = ENDPOINTS.GET_CUSTOMER_INFO_V1;
    const data = {
      model: {
        customerId: customerId,
        restaurantId: restaurantId,
        locationId: locationId,
      },
    };
    responseclass = await handleAxiosPostAsync(
      data,
      customer,
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
}


