import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ResponseModel } from "../../common/commonclass";
import handleNotify from "./toaster/toaster-notify";
import { ToasterTypes } from "./toaster/toaster-types";
import * as Sentry from "@sentry/nextjs";
import { ERRORMESSAGE } from "@/components/common/commonerrormessage";
import { errorLog } from "./errorlog/errorlog";
import { getAuthKey } from "../common/auth";
import { ToasterPositions } from "./toaster/toaster-positions";

export const handleAxiosPostAsync = async (
  requestModel: unknown,
  requestUrl: string,
  methodName: string,
  isAuthorizationRequired: boolean = true,
  restaurantId?: number
): Promise<ResponseModel> => {
  let responseClass = new ResponseModel();
  let config: AxiosRequestConfig;

  if (isAuthorizationRequired) {
    config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthKey(restaurantId),
      },
    };
  } else {
    config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  try {
    let response: AxiosResponse;

    if (requestModel !== null && requestModel !== undefined) {
      response = await axios.post(requestUrl, requestModel, config);
    } else {
      response = await axios.post(requestUrl, {}, config); // send empty body
    }

    responseClass = JSON.parse(response.data.d) as ResponseModel;
  } catch (error: any) {
    Sentry.captureException(error);
    Sentry.captureMessage(
      `error from api :- frontMethod:${methodName} backendUrl:${requestUrl}`
    );

    await errorLog(error, requestModel, methodName, requestUrl);

    handleNotify(
      ERRORMESSAGE.TRYAGAIN,
      ToasterPositions.TopRight,
      ToasterTypes.Error
    );
  }

  return responseClass;
};
