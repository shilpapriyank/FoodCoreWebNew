export const LoginTypes = {
  LOGIN_USER_BEGIN: "LOGIN_USER_BEGIN",
  USER_DETAIL: "USER_DETAIL",
  GET_LOGIN_USER_DETAIL: "GET_LOGIN_USER_DETAIL",
  LOGOUT_USER: "LOGOUT_USER",
};

export interface GetLoginUserDetailsParams {
  username: string;
  password: string;
  restaurantId: number;
  dialCode: string;
  locationid: number;
}

// -- Types --

export interface LoggedInUser {
  customerId: number;
  firstname: string;
  lastname: string;
  emailId: string;
  phone: string;
  dialcode: string;
  mobile: string;
  isVerified: boolean;
  totalRewardPoints: number;
  loyaltynumber: string;
  imgname: string | null;
  picture: string;
  imgtype: string;
  rewardvalue: number;
  restaurantId: number;
  isVerifiedPhone: boolean;
  customertype: number;
  businessname: string;
  [key: string]: string | number | boolean | undefined | null;
}

export interface LoginParams {
  username: string;
  password: string;
  restaurantId: number;
}

export interface LoginState {
  loggedinuser: LoggedInUser | null;
}
