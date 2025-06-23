import { ENDPOINTS } from "@/components/default/config";
import { ResponseModel } from "@/components/common/commonclass";
import { handleAxiosPostAsync } from "@/components/default/helpers/utility";
import { API_RESPONSE_STATUS } from "@/components/common/enums";
import { GetLoginUserDetailsParams, LoggedInUser } from "./login.types";

let responseclass = new ResponseModel();

export class LoginServices {

  static async getLoginUserDetails({
    username,
    password,
    restaurantId,
    dialCode,
    locationid,
  }: GetLoginUserDetailsParams): Promise<any> {  //Promise <ResponseModel | LoggedInUse>
    responseclass = new ResponseModel();
    const methodName = "getLoginUserDetails";
    const login = ENDPOINTS.LOGIN;
    const lid = locationid;
    const data = {
      loginRequest: {
        dialCode: dialCode,
        username: username,
        password: password,
        restaurantId: restaurantId,
        locationId: lid
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
      return responseclass.result
    } else {
      return responseclass;
    }
  }

  static async getCustomerDetails(
    restaurantId: number,
    customerId: number,
    locationId: number
  ): Promise<{ customerDetails: LoggedInUser } | null> {
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


