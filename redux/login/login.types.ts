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
  locationid: number;
}
