import { ResponseModel } from "@/components/common/commonclass";
import { API_RESPONSE_STATUS } from "@/components/common/enums";
import { ENDPOINTS } from "@/components/default/config";
import { handleAxiosPostAsync } from "@/components/default/helpers/utility";

let responseclass = new ResponseModel();

export class LocationServices {
  static async getLocationInfo(restaurantId: number) {
    responseclass = new ResponseModel();
    const methodName = "getLocationInfo";
    const location = ENDPOINTS.GET_LOCATIONS;
    const data = {
      restaurantId: restaurantId,
      latitude: "",
      longitude: "",
    };
    responseclass = await handleAxiosPostAsync(
      data,
      location,
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

  static async getAllLocationList(restaurantId: number) {
    responseclass = new ResponseModel();
    const methodName = "getAllLocationList";
    const location = ENDPOINTS.GET_ALL_LOCATION_List;
    const data = {
      restaurantId: restaurantId,
    };
    responseclass = await handleAxiosPostAsync(
      data,
      location,
      methodName,
      true,
      restaurantId
    );
    console.log("getAllLocationList", responseclass);
    if (
      responseclass.result != null &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      return responseclass.result;
    } else {
      return responseclass;
    }
  }

  static async getAllLoaction(restaurantId: number) {
    responseclass = new ResponseModel();
    const methodName = "getAllLocationInfoNew";
    const location = ENDPOINTS.GET_ALLLOCATION;
    const data = {
      restaurantId: restaurantId,
      latitude: "",
      longitude: "",
    };
    responseclass = await handleAxiosPostAsync(
      data,
      location,
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

  static async changeRestaurantLocation(
    restaurantId: number,
    locationId: number
  ) {
    responseclass = new ResponseModel();
    const methodName = "getLocationInfoById";
    const location = ENDPOINTS.LOCATION_BY_ID;
    const data = JSON.stringify({
      restaurantId: restaurantId,
      locationId: locationId,
    });
    responseclass = await handleAxiosPostAsync(
      data,
      location,
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
