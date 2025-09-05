import { ResponseModel } from "@/components/common/commonclass";
import { API_RESPONSE_STATUS } from "@/components/common/enums";
import { ENDPOINTS } from "@/components/default/config";
import { handleAxiosPostAsync } from "@/components/default/helpers/utility";
import axios from "axios";

let responseclass = new ResponseModel();

export class MyOrderServices {
  static async getOrderHistory(
    customerId: number,
    locationId: number,
    restaurantId: number,
    pageIndex: any,
    pageSize: any
  ) {
    responseclass = new ResponseModel();
    const methodName = "getOrderHistory";
    const orders = ENDPOINTS.GET_ORDER_HISTORY;
    const data = {
      historyRequest: {
        restaurantId: restaurantId,
        customerId: customerId,
        locationId: locationId,
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
    };
    responseclass = await handleAxiosPostAsync(
      data,
      orders,
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
      return [];
    }
  }
}
