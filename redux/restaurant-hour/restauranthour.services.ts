import { ResponseModel } from "@/components/common/commonclass";
import { API_RESPONSE_STATUS } from "@/components/common/enums";
import { ENDPOINTS } from "@/components/default/config";
import { handleAxiosPostAsync } from "@/components/default/helpers/utility";

let responseclass = new ResponseModel();

export class RestaurantHoursServices {
  static async getRestaurantHourList(locationId: number, restaurantId: number) {
    responseclass = new ResponseModel();
    const methodName = "getRestaurantHourList";
    const timming = ENDPOINTS.GET_LOCATION_TIMMING;
    const data = {
      locationId: locationId,
      restaurantId: restaurantId,
    };
    responseclass = await handleAxiosPostAsync(
      data,
      timming,
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
      return responseclass;
    }
  }

  static async getRestaurantTodayTimming(restaurantId: number, locationId: number) {
    responseclass = new ResponseModel();
    const methodName = "getRestaurantTodayTimming";
    const todaytimming = ENDPOINTS.GET_TODAY_RESTAURANTHOURS;
    const data = {
      locationId: locationId,
      restaurantId: restaurantId,
    };
    responseclass = await handleAxiosPostAsync(
      data,
      todaytimming,
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
      return responseclass;
    }
  }
}
