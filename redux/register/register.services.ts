import { ResponseModel } from "@/components/common/commonclass";
import { API_RESPONSE_STATUS } from "@/components/common/enums";
import { ENDPOINTS } from "@/components/default/config";
import { handleAxiosPostAsync } from "@/components/default/helpers/utility";

let responseclass = new ResponseModel();

interface RegisterModel {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
  countrycode: string;
  isVerifiedPhone: boolean;
  businessName?: string;
}

interface AddressModel {
  address1?: string;
  address2?: string;
  landmark?: string;
  city?: string;
  state?: string;
  country?: string;
  zipcode?: string;
  addresstype?: number;
  businessname?: string;
}

export class RegisterServices {
  static async registerUser(
    registerModel: RegisterModel,
    address: AddressModel | null,
    locationId?: number,
    restaurantId?: number,
    requesturl?: string
  ): Promise<ResponseModel> {
    responseclass = new ResponseModel();
    const methodName = "registerUser";
    let registerurl = "";

    if (address !== null) registerurl = ENDPOINTS.REGISTER;
    else registerurl = ENDPOINTS.REGISTER_USER;

    const data: any = {
      register: {
        user: {
          firstname: registerModel.firstname,
          lastname: registerModel.lastname,
          phone: registerModel.phone,
          email: registerModel.email,
          password: registerModel.password,
          countrycode: registerModel.countrycode,
          isVerifiedPhone: registerModel.isVerifiedPhone,
          businessName: registerModel.businessName,
        },
        address: {
          address1: address?.address1,
          address2: address?.address2,
          address3: address?.landmark,
          city: address?.city,
          state: address?.state,
          country: address?.country,
          zipcode: address?.zipcode,
          addressType: address?.addresstype,
          businessname: address?.businessname,
        },
        locationId: locationId,
        restaurantId: restaurantId,
        requesturl: requesturl,
      },
    };

    // delete address if null
    if (address === null) {
      delete data.register.address;
    }

    responseclass = await handleAxiosPostAsync(
      data,
      registerurl,
      methodName,
      true,
      restaurantId
    );

    return responseclass;
  }

  static async getOTPVerificationSetting(
    restaurantId: number,
    enableotpauthentication: boolean,
    smsapigateway: number
  ): Promise<any> {
    responseclass = new ResponseModel();
    const methodName = "getOTPVerificationSetting";
    const location = ENDPOINTS.OTP_VERIFICATION_SETTING;
    const data = {
      restaurantId: restaurantId,
      enableotpauthentication: enableotpauthentication,
      smsapigateway: smsapigateway,
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

  static async twilioSendCode(
    restaurantId: number,
    enableotpauthentication: boolean,
    smsapigateway: number,
    mobilenumber: string
  ): Promise<any> {
    responseclass = new ResponseModel();
    const methodName = "twilioSendCode";
    const location = ENDPOINTS.TWILIO_SEND_CODE;
    const data = {
      restaurantId: restaurantId,
      enableotpauthentication: enableotpauthentication,
      smsapigateway: smsapigateway,
      mobilenumber: mobilenumber,
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

  static async twilioVerifyCode(
    restaurantId: number,
    enableotpauthentication: boolean,
    smsapigateway: number,
    code: string,
    mobilenumber: string
  ): Promise<any> {
    responseclass = new ResponseModel();
    const methodName = "twilioVerifyCode";
    const location = ENDPOINTS.TWILIO_VERIFY_CODE;
    const data = {
      restaurantId: restaurantId,
      enableotpauthentication: enableotpauthentication,
      smsapigateway: smsapigateway,
      code: code,
      mobilenumber: mobilenumber,
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

  static async verifyEmail(
    restaurantId: number,
    locationId: number,
    code: string,
    customerId: number
  ): Promise<any> {
    responseclass = new ResponseModel();
    const methodName = "verifyEmail";
    const verify = ENDPOINTS.VERIFY_EMAIL;
    const data = {
      verifyEmail: {
        restaurantId: restaurantId,
        locationId: locationId,
        code: code,
        customerId: customerId,
      },
    };
    responseclass = await handleAxiosPostAsync(
      data,
      verify,
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

  static async sendVerificationEmail(
    restaurantId: number,
    locationId: number,
    requesturl: string,
    customerId: number
  ): Promise<any> {
    responseclass = new ResponseModel();
    const methodName = "sendVerificationEmail";
    const sendVerificationEmail = ENDPOINTS.SEND_VERIFICATION_EMAIL;
    const data = {
      sendEmailRequest: {
        restaurantId: restaurantId,
        locationId: locationId,
        requesturl: requesturl,
        customerId: customerId,
      },
    };
    responseclass = await handleAxiosPostAsync(
      data,
      sendVerificationEmail,
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
