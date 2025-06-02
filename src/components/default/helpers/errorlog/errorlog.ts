import axios from "axios";
import { ENDPOINTS } from "../../config";
import {
  getLocationIdFromStorage,
  getRestaurantIdFromStorage,
  getRestaurantNameFromStorage,
} from "../../../common/localstore";
import { getAuthKey } from "../../common/auth";

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

// import { ENDPOINTS } from "../../config";
// import {
//   getLocationIdFromStorage,
//   getRestaurantIdFromStorage,
//   getRestaurantNameFromStorage,
// } from "../../common/localstore";
// import { getAuthKey } from "../../common/auth";

// interface ResponseClass {
//   result: any;
//   status: string;
//   message: string;
// }

// export const errorLog = async (
//   e: any,
//   requestParamObj: any,
//   methodName: string,
//   errorFrom: string
// ): Promise<ResponseClass | unknown> => {
//   const requestParam = JSON.stringify(requestParamObj);
//   const errorMessage =
//     e?.response?.data === undefined ? e.message : e.response.data.Message;
//   const errorCode = e?.response?.status;
//   const errorTitle = e?.response?.statusText;
//   const restaurantName = getRestaurantNameFromStorage();
//    const errorLogURL = ENDPOINTS.ERROR_LOG;

//   const data = {
//     errorlogRequest: {
//       locationId: getLocationIdFromStorage(),
//       restaurantId: getRestaurantIdFromStorage(),
//       restaurantName: restaurantName,
//       pageName: typeof window !== "undefined" ? window.location.href : "",
//       methodName,
//       errorTitle,
//       errorCode,
//       errorMessage,
//       errorFrom,
//       requestParam,
//       deviceOS: "NewWebApp",
//     },
//   };

//   const config = {
//     headers: {
//       "content-type": "application/json",
//       Authorization: getAuthKey(getRestaurantIdFromStorage()),
//     },
//   };

//   let responseclass: ResponseClass = {
//     result: {},
//     status: "",
//     message: "",
//   };

//   try {
//     const response: AxiosResponse<{ d: string }> = await axios.post(errorLogURL, data, config);
//     responseclass = JSON.parse(response.data.d);
//   } catch (err) {
//     return err;
//   }

//   return responseclass;
// };

// import axios from "axios";
// import { ENDPOINTS } from "../../config";
// import {
//   getLocationIdFromStorage,
//   getRestaurantIdFromStorage,
//   getRestaurantNameFromStorage,
// } from "../../common/localstore";
// import { getAuthKey } from "../../common/auth";

// let responseclass = {
//   result: {},
//   status: "",
//   message: "",
// };

// export const errorLog = async (
//   e: any,
//   requestParamObj: any,
//   methodName: any,
//   errorFrom: any
// ) => {
//   let requestParam = JSON.stringify(requestParamObj);
//   let errorMessage =
//     e?.response?.data === undefined ? e.message : e.response.data.Message;
//   let errorCode = e?.response?.status;
//   let errorTitle = e?.response?.statusText;
//   let restaurantName = getRestaurantNameFromStorage();
//   const errorLogURL = ENDPOINTS.ERROR_LOG;
//   const data = {
//     errorlogRequest: {
//       locationId: getLocationIdFromStorage(),
//       restaurantId: getRestaurantIdFromStorage(),
//       restaurantName: restaurantName,
//       pageName: typeof window !== "undefined" ? window.location.href : "",
//       methodName: methodName,
//       errorTitle: errorTitle,
//       errorCode: errorCode,
//       errorMessage: errorMessage,
//       errorFrom: errorFrom,
//       requestParam: requestParam,
//       deviceOS: "NewWebApp",
//     },
//   };
//   let restaurantId = getRestaurantIdFromStorage();
//   const config = {
//     headers: {
//       "content-type": "application/json",
//       Authorization: getAuthKey(restaurantId),
//     },
//   };
//   try {
//     let response = await axios.post(errorLogURL, data, config);
//     responseclass = await JSON.parse(response.data.d);
//   } catch (e) {
//     return e;
//   }
// };
