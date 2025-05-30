import { ERRORMESSAGE } from "@/components/common/commonerrormessage";
import handleNotify from "./toaster/toaster-notify";
import { ToasterPositions } from "./toaster/toaster-positions";
import { ToasterTypes } from "./toaster/toaster-types";
import { errorLog } from "./errorlog/errorlog";
import * as Sentry from "@sentry/nextjs";
import { ResponseModel } from "@/components/common/commonclass";
import { getAuthKey } from "../common/auth";
import axios from "axios";

export const handleAxiosPostAsync = async (
  requestModel: any,
  requestUrl: any,
  methodName: any,
  isAuthorizationRequired = true,
  restaurantId: any
) => {
  let responseclass: ResponseModel = new ResponseModel();

  //let responseclass = new ResponseModel();
  let config;
  if (isAuthorizationRequired === true) {
    config = {
      headers: {
        "content-type": "application/json",
        //'Accept': 'application/json',
        Authorization: getAuthKey(restaurantId),
      },
    };
  } else {
    config = {
      headers: {
        "content-type": "application/json",
      },
    };
  }
  try {
    let response;
    if (requestModel && requestModel !== null && requestModel !== undefined) {
      response = await axios.post(requestUrl, requestModel, config);
    } else {
      response = await axios.post(requestUrl, config);
    }
    responseclass = await JSON.parse(response.data.d);
  } catch (error) {
    Sentry.captureException(error);
    Sentry.captureMessage(
      `error from api :- frontMethod:${methodName} backendUrl:${requestUrl} `
    );
    errorLog(error, requestModel, methodName, requestUrl).then((res) => {
      handleNotify(
        ERRORMESSAGE.TRYAGAIN,
        ToasterPositions.TopRight,
        ToasterTypes.Error
      );
    });
  }
  return responseclass;
};

// import { ResponseModel } from "@/components/common/commonclass";
// import * as Sentry from "@sentry/nextjs";
// import { getAuthKey } from "../common/auth";
// import { errorLog } from "./errorlog/errorlog";
// import handleNotify from "./toaster/toaster-notify";
// import { ERRORMESSAGE } from "@/components/common/commonerrormessage";
// import { ToasterPositions } from "./toaster/toaster-positions";
// import { ToasterTypes } from "./toaster/toaster-types";

// export const handleAxiosPostAsync = async (
//   requestModel: any,
//   requestUrl: any,
//   methodName: any,
//   isAuthorizationRequired = true,
//   restaurantId: any
// ) => {
//   let responseclass = new ResponseModel();
//   let config;
//   if (isAuthorizationRequired === true) {
//     config = {
//       headers: {
//         "content-type": "application/json",
//         //'Accept': 'application/json',
//         Authorization: getAuthKey(restaurantId),
//       },
//     };
//   } else {
//     config = {
//       headers: {
//         "content-type": "application/json",
//       },
//     };
//   }
//   try {
//     let response;
//     if (requestModel && requestModel !== null && requestModel !== undefined) {
//       response = await axios.post(requestUrl, requestModel, config);
//     } else {
//       response = await axios.post(requestUrl, config);
//     }
//     responseclass = await JSON.parse(response.data.d);
//   } catch (error) {
//     Sentry.captureException(error);
//     Sentry.captureMessage(
//       `error from api :- frontMethod:${methodName} backendUrl:${requestUrl} `
//     );
//     errorLog(error, requestModel, methodName, requestUrl).then((res) => {
//       handleNotify(
//         ERRORMESSAGE.TRYAGAIN,
//         ToasterPositions.TopRight,
//         ToasterTypes.Error
//       );
//     });
//   }
//   return responseclass;
// };

// // import { ResponseModel } from "@/components/common/commonclass";
// // import { getAuthKey } from "../common/auth";
// // import * as Sentry from "@sentry/nextjs";
// // import { createAsyncThunk } from "@reduxjs/toolkit";
// // import { errorLog } from "./errorlog/errorlog";
// // import handleNotify from "./toaster/toaster-notify";
// // import { ERRORMESSAGE } from "@/components/common/commonerrormessage";
// // import { ToasterPositions } from "./toaster/toaster-positions";
// // import { ToasterTypes } from "./toaster/toaster-types";

// // export const handleAxiosPostAsync = createAsyncThunk<ResponseModel, PostRequestPayload>(
// //   "api/handleAxiosPostAsync",
// //   async (
// //     { requestModel, requestUrl, methodName, isAuthorizationRequired = true, restaurantId },
// //     { rejectWithValue }
// //   ) => {
// //     const responseclass = new ResponseModel();

// //     const headers: Record<string, string> = {
// //       "Content-Type": "application/json",
// //     };

// //     if (isAuthorizationRequired && restaurantId) {
// //       headers.Authorization = getAuthKey(restaurantId);
// //     }

// //     const config = { headers };

// //     try {
// //       const response = await axios.post(
// //         requestUrl,
// //         requestModel ?? {}, // default to empty object
// //         config
// //       );

// //       return JSON.parse(response.data.d);
// //     } catch (error: any) {
// //       Sentry.captureException(error);
// //       Sentry.captureMessage(
// //         `Error from API: method=${methodName} url=${requestUrl}`
// //       );

// //       await errorLog(error, requestModel, methodName, requestUrl);
// //       handleNotify(
// //         ERRORMESSAGE.TRYAGAIN,
// //         ToasterPositions.TopRight,
// //         ToasterTypes.Error
// //       );

// //       return rejectWithValue("Request failed");
// //     }
// //   }
// // );
