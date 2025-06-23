import { ResponseModel } from "@/components/common/commonclass";
import { API_RESPONSE_STATUS } from "@/components/common/enums";
import { ENDPOINTS } from "@/components/default/config";
import { handleAxiosPostAsync } from "@/components/default/helpers/utility";
import { AddressModel, OTPVerificationSettingParams, RegisterModel, SendVerificationEmailParams, TwilioSendCodeParams, TwilioVerifyCodeParams, VerifyEmailParams } from "@/types/register-types/register.types";

let responseclass = new ResponseModel();

export class RegisterServices {
  static async registerUserWithAddress(
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
    {
      restaurantId,
      enableotpauthentication,
      smsapigateway,
    }: OTPVerificationSettingParams): Promise<Record<string, any> | null> {
    responseclass = new ResponseModel();
    const methodName = "getOTPVerificationSetting";
    const location = ENDPOINTS.OTP_VERIFICATION_SETTING;
    const data = {
      restaurantId,
      enableotpauthentication,
      smsapigateway,
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
    {
      restaurantId,
      enableotpauthentication,
      smsapigateway,
      mobilenumber,
    }: TwilioSendCodeParams): Promise<Record<string, any> | null> {
    responseclass = new ResponseModel();
    const methodName = "twilioSendCode";
    const location = ENDPOINTS.TWILIO_SEND_CODE;
    const data = {
      restaurantId,
      enableotpauthentication,
      smsapigateway,
      mobilenumber,
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

  static async twilioVerifyCode({
    restaurantId,
    enableotpauthentication,
    smsapigateway,
    mobilenumber,
    code,
  }: TwilioVerifyCodeParams): Promise<Record<string, any> | null> {
    responseclass = new ResponseModel();
    const methodName = "twilioVerifyCode";
    const location = ENDPOINTS.TWILIO_VERIFY_CODE;
    const data = {
      restaurantId,
      enableotpauthentication,
      smsapigateway,
      code,
      mobilenumber,
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
    {
      restaurantId,
      locationId,
      code,
      customerId,
    }: VerifyEmailParams): Promise<Record<string, any> | null> {
    responseclass = new ResponseModel();
    const methodName = "verifyEmail";
    const verify = ENDPOINTS.VERIFY_EMAIL;
    const data = {
      verifyEmail: {
        restaurantId,
        locationId,
        code,
        customerId,
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
    {
      restaurantId,
      locationId,
      requesturl,
      customerId,
    }: SendVerificationEmailParams): Promise<Record<string, any> | null> {
    responseclass = new ResponseModel();
    const methodName = "sendVerificationEmail";
    const sendVerificationEmail = ENDPOINTS.SEND_VERIFICATION_EMAIL;
    const data = {
      sendEmailRequest: {
        restaurantId,
        locationId,
        requesturl,
        customerId,
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
