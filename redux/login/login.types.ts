export const LoginTypes = {
  LOGIN_USER_BEGIN: "LOGIN_USER_BEGIN",
  USER_DETAIL: "USER_DETAIL",
  GET_LOGIN_USER_DETAIL: "GET_LOGIN_USER_DETAIL",
  LOGOUT_USER: "LOGOUT_USER",
};

export interface LoginParams {
  username: string;
  password: string;
  restaurantId: number;
  dialCode: string;
  locationid: string;
}

export interface LoggedInUser {
  // [key: string]: any;
  // customerId: number;
  // emailId: string;
  // totalRewardPoints: number;
  // isVerified: boolean;
  businessname: string;
  customerId: number;
  customertype: number;
  dialcode: string;
  emailId: string;
  firstname: string;
  imgname: string | null;
  imgtype: string;
  isVerified: boolean;
  isVerifiedPhone: boolean;
  lastname: string;
  loyaltynumber: string;
  mobile: string;
  phone: string;
  picture: string;
  restaurantId: number;
  rewardvalue: number;
  totalRewardPoints: number;
}

export interface GetLoginUserDetailsParams {
  username: string;
  password: string;
  restaurantId: number;
  dialCode: string;
  locationid: number;
}

export interface LoginState {
  loggedinuser: LoggedInUser | null;
}
