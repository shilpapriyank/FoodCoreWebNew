import { ResponseModel } from "@/components/common/commonclass";
import { ERRORMESSAGE } from "@/components/common/commonerrormessage";
import { API_RESPONSE_STATUS } from "@/components/common/enums";
import { getAuthKey } from "@/components/default/Common/auth";
import { ENDPOINTS } from "@/components/default/config";
import handleNotify from "@/components/default/helpers/toaster/toaster-notify";
import { ToasterPositions } from "@/components/default/helpers/toaster/toaster-positions";
import { ToasterTypes } from "@/components/default/helpers/toaster/toaster-types";
import { handleAxiosPostAsync } from "@/components/default/helpers/utility";

let responseclass = new ResponseModel();

export interface UpdateCustomerInfoModel {
  customerId: number;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  businessname?: string;
  pass: string;
  locationId: number;
  restaurantId: number;
  picture?: string;
  imgname?: string;
  imgtype?: string;
}

export interface ResetPasswordRequest {
  validtoken: string;
  restaurantId: number;
  emailId?: string;
  password?: string;
  confirmpassword?: string;
  requestUrl?: string;
  returnUrl?: string;
  [key: string]: any;
}

export interface UpdatePhoneModel {
  restaurantId: number;
  phoneNumber: string;
  customerId: number;
}

export interface CheckPhoneRequestModel {
  restaurantId: number;
  phone: string;
  unPhormatedPhone: string;
}

export class CustomerServices {
  static async getCustomerPassword(
    restaurantId: number,
    locationId: number,
    customerId: number
  ) {
    responseclass = new ResponseModel();
    const methodName = "getCustomerPassword";
    const passwordurl = ENDPOINTS.GET_CUSTOMER_PASSWORD;
    const data = {
      passwordDetail: {
        restaurantId,
        locationId,
        customerId,
      },
    };
    responseclass = await handleAxiosPostAsync(
      data,
      passwordurl,
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

  static async updateCustomerInfo(userInfo: UpdateCustomerInfoModel) {
    responseclass = new ResponseModel();
    const methodName = "updateCustomerInfo";
    const userInfoUrl = ENDPOINTS.UPDATE_CUSTOMER;
    const data = {
      customerreg: {
        customerId: userInfo.customerId,
        firstName: userInfo.firstname,
        lastName: userInfo.lastname,
        phone: userInfo.phone,
        emailId: userInfo.email,
        businessName: userInfo.businessname,
        pass: userInfo.pass,
        locationId: userInfo.locationId,
        restaurantId: userInfo.restaurantId,
        picture: userInfo.picture,
        imgname: userInfo.imgname,
        imgtype: userInfo.imgtype,
        deviceToken: "",
        appVersion: "",
        deviceName: "",
        deviceModel: "",
        deviceType: "",
        loyaltynumber: "",
        SocialMediaFlag: 0,
        SocialMediaId: "",
        isRegisteredThroungPos: false,
        isWeb: true,
        Address: {
          customerId: userInfo.customerId,
          othercustomerId: 0,
          deliveryaddressId: 0,
          address1: "",
          address2: "",
          landmark: "",
          city: "",
          zipcode: "",
          contactno: "",
          contactname: "",
          latitude: 0,
          longitude: 0,
          state: "",
          country: "",
          addressType: "",
        },
      },
    };
    responseclass = await handleAxiosPostAsync(
      data,
      userInfoUrl,
      methodName,
      true,
      userInfo.restaurantId
    );
    if (
      responseclass.result &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      handleNotify(
        "customer updated successfully!",
        ToasterPositions.TopRight,
        ToasterTypes.Success
      );
      return responseclass.result;
    } else {
      handleNotify(
        "customer update failed!",
        ToasterPositions.TopRight,
        ToasterTypes.Error
      );
      return responseclass;
    }
  }

  static async userExists(input: { phoneNumber: string; restaurantId: number }) {
    responseclass = new ResponseModel();
    const methodName = "userExists";
    const userInfoUrl = ENDPOINTS.USER_EXIST;
    responseclass = await handleAxiosPostAsync(
      input,
      userInfoUrl,
      methodName,
      true,
      input?.restaurantId
    );
    return responseclass;
  }

  static async handleForgotPasswordRequest(
    phoneNumber: string,
    customerId: number,
    restaurantId: number,
    requesturl: string,
    returnURL: string,
    dialCode: string
  ): Promise<boolean> {
    responseclass = new ResponseModel();
    const methodName = "handleForgotPasswordRequest";
    const forgetpasswordUrl = ENDPOINTS.FORGOT_PASSWORD;
    const data = {
      requestModel: {
        dialCode,
        phoneNumber,
        restaurantId,
        requesturl,
        customerId,
        returnURL,
      },
    };
    responseclass = await handleAxiosPostAsync(
      data,
      forgetpasswordUrl,
      methodName,
      true,
      restaurantId
    );
    if (responseclass.status === API_RESPONSE_STATUS.SUCCESS) {
      handleNotify(
        `Forget password link sent to ${responseclass.result?.emailId} successfully!`,
        ToasterPositions.TopRight,
        ToasterTypes.Success
      );
      return true;
    } else {
      handleNotify(
        "Customer update failed!",
        ToasterPositions.TopRight,
        ToasterTypes.Error
      );
      return false;
    }
  }

  static async userResetPasswordValidToken(
    token: string,
    restaurantId: number
  ) {
    responseclass = new ResponseModel();
    const methodName = "userResetPasswordValidToken";
    const resettokenUrl = ENDPOINTS.RESET_PASSWORD_VALIDTOKEN;
    const data = {
      requestModel: {
        validtoken: token,
        restaurantId: restaurantId,
      },
    };
    responseclass = await handleAxiosPostAsync(
      data,
      resettokenUrl,
      methodName,
      true,
      restaurantId
    );
    return responseclass;
  }

  static async userResetPasswordRequest(obj: ResetPasswordRequest | any): Promise<any> {
    const location = ENDPOINTS.RESET_PASSWORD;
    const data = {
      requestModel: obj,
    };
    const settings: RequestInit = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: getAuthKey(obj.restaurantId),
      },
      body: JSON.stringify(data),
    };

    try {
      const fetchResponse = await fetch(location, settings);
      if (fetchResponse.status === 200) {
        const response = await fetchResponse.json();
        return response;
      } else if (fetchResponse.status === 400) {
        handleNotify(
          fetchResponse.statusText,
          ToasterPositions.TopRight,
          ToasterTypes.Error
        );
        return null;
      } else if (fetchResponse.status === 500) {
        handleNotify(
          fetchResponse.statusText,
          ToasterPositions.TopRight,
          ToasterTypes.Error
        );
        return null;
      } else {
        handleNotify(
          "Error while sending request",
          ToasterPositions.TopRight,
          ToasterTypes.Error
        );
        return null;
      }
    } catch (e) {
      handleNotify(
        "Error while sending request",
        ToasterPositions.TopRight,
        ToasterTypes.Error
      );
      return null;
    }
  }

  static async checkCustomerRewardPointsLocationBase(
    restaurantId: number,
    customerId: number,
    rewardpoints: number,
    amount: string,
    locationId: number
  ) {
    responseclass = new ResponseModel();
    const methodName = "checkCustomerRewardPointsLocation";
    const location = ENDPOINTS.CHECK_CUSTOMER_REWARD_POINT_LOCATION;
    const data = {
      model: {
        restaurantId,
        customerId,
        rewardpoints,
        amount: parseFloat(amount),
        locationId,
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
      responseclass.result &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      if (rewardpoints > 0) {
        handleNotify(
          `${rewardpoints} Reward Points has been redeemed`,
          ToasterPositions.TopRight,
          ToasterTypes.Success
        );
      }
      return responseclass;
    } else {
      handleNotify(
        responseclass?.message || ERRORMESSAGE.TRYAGAIN,
        ToasterPositions.TopRight,
        ToasterTypes.Error
      );
      return null;
    }
  }

  static async updateVerifiedPhoneNumber(updatePhoneModel: UpdatePhoneModel) {
    responseclass = new ResponseModel();
    const methodName = "updateVerifiedPhoneNumber";
    const endPoint = ENDPOINTS.UPDATE_VERIFIED_PHONE;
    const data = {
      updatePhoneModel,
    };
    responseclass = await handleAxiosPostAsync(
      data,
      endPoint,
      methodName,
      true,
      updatePhoneModel.restaurantId
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

  static async checkExistingCustomerPhoneNumber(
    checkPhoneRequestModel: CheckPhoneRequestModel
  ) {
    responseclass = new ResponseModel();
    const methodName = "updateVerifiedPhoneNumber";
    const endPoint = ENDPOINTS.CHECK_EXIST_CUSTOMER_PHONE_NUMBER;
    const data = {
      checkPhoneRequestModel,
    };
    responseclass = await handleAxiosPostAsync(
      data,
      endPoint,
      methodName,
      true,
      checkPhoneRequestModel?.restaurantId
    );
    if (
      responseclass.result != null &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      return responseclass;
    } else {
      return responseclass;
    }
  }
}
