import { ResponseModel } from "@/components/common/commonclass";
import { API_RESPONSE_STATUS } from "@/components/common/enums";
import { ENDPOINTS } from "@/components/default/config";
import { handleAxiosPostAsync } from "@/components/default/helpers/utility";
import { GetAllLocationInfoNew } from "@/types/location-types/location.type";

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

  static async getAllLocationList(
    restaurantId: number
  ): Promise<GetAllLocationInfoNew | null> {
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
    if (
      responseclass.result != null &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      return responseclass.result as GetAllLocationInfoNew;
    } else {
      return null;
    }
  }

  static async getAllLoaction(
    restaurantId: number
  ): Promise<GetAllLocationInfoNew | null> {
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
      return responseclass.result as GetAllLocationInfoNew;
    } else {
      return null;
    }
  }

  // static changeLocCache = new Map<string, Promise<any>>();

  static async changeRestaurantLocation(
    restaurantId: number,
    locationId: number
  ) {
    // const key = `${restaurantId}-${locationId}`;
    // if (LocationServices.changeLocCache.has(key)) {
    //   return LocationServices.changeLocCache.get(key)!;
    // }

    // const requestPromise = (async () => {
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
  //   })();

  //   LocationServices.changeLocCache.set(key, requestPromise);
  //   requestPromise.catch(() => {
  //     LocationServices.changeLocCache.delete(key);
  //   });

  //   return requestPromise;
  // }
//}