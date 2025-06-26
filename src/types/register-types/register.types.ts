export interface RegisterModel {
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    password: string;
    countrycode: string;
    isVerifiedPhone?: boolean;
    businessName?: string;
}

export interface AddressModel {
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

export interface OTPVerificationSettingParams {
    restaurantId: number;
    enableotpauthentication: boolean;
    smsapigateway: number;
}

export interface TwilioSendCodeParams extends OTPVerificationSettingParams {
    mobilenumber: string;
}
export interface TwilioVerifyCodeParams extends TwilioSendCodeParams {
    code: number;
}

export interface VerifyEmailParams {
    restaurantId: number;
    locationId: number;
    code: string;
    customerId: number;
}

export interface SendVerificationEmailParams {
    restaurantId: number;
    locationId: number;
    requesturl: string;
    customerId: number;
}

export interface RegisterRequestData {
  register: {
    user: RegisterModel;
    address?: {
      address1?: string;
      address2?: string;
      address3?: string;
      city?: string;
      state?: string;
      country?: string;
      zipcode?: string;
      addressType?: number;
      businessname?: string;
    };
    locationId?: number;
    restaurantId?: number;
    requesturl?: string;
  };
}