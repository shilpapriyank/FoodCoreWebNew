import axios from "axios";
import { ENDPOINTS } from "../../config";
import {
  getLocationIdFromStorage,
  getRestaurantIdFromStorage,
  getRestaurantNameFromStorage,
} from "../../../common/localstore";
import { getAuthKey } from "../../Common/auth";

interface ResponseClass {
  result: any;
  status: string;
  message: string;
}

export const errorLog = async (
  e: any,
  requestParamObj: any,
  methodName: string,
  errorFrom: string
): Promise<ResponseClass | unknown> => {
  const requestParam = JSON.stringify(requestParamObj);
  const errorMessage =
    e?.response?.data === undefined ? e.message : e.response.data.Message;
  const errorCode = e?.response?.status;
  const errorTitle = e?.response?.statusText;
  const restaurantName = getRestaurantNameFromStorage();

  const data = {
    errorlogRequest: {
      locationId: getLocationIdFromStorage(),
      restaurantId: getRestaurantIdFromStorage(),
      restaurantName: restaurantName,
      pageName: typeof window !== "undefined" ? window.location.href : "",
      methodName,
      errorTitle,
      errorCode,
      errorMessage,
      errorFrom,
      requestParam,
      deviceOS: "NewWebApp",
    },
  };

  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: getAuthKey(getRestaurantIdFromStorage()),
    },
  };

  let responseclass: ResponseClass = {
    result: {},
    status: "",
    message: "",
  };

  try {
    const response = await axios.post(ENDPOINTS.ERROR_LOG, data, config);
    responseclass = JSON.parse((response.data as any).d);
  } catch (err) {
    return err;
  }

  return responseclass;
};
