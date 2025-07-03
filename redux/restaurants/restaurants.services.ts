import { ResponseModel } from "@/components/common/commonclass";
import { API_RESPONSE_STATUS } from "@/components/common/enums";
import { ENDPOINTS } from "@/components/default/config";
import { handleAxiosPostAsync } from "@/components/default/helpers/utility";
import { GetAllLocationInfoNew } from "@/types/location-types/location.type";
import {
  GetAllRestaurantInfo,
  GetRestaurantThemeType,
} from "@/types/restaurant-types/restaurant.type";

let responseclass = new ResponseModel();

export class RestaurantsServices {
  static async getRestaurantsList(
    restauranturl: string,
    locationurl: string,
    defaultLocationId: number
  ): Promise<GetAllRestaurantInfo[] | null> {
    responseclass = new ResponseModel();
    const methodName = "getRestaurantsList";
    const location = ENDPOINTS.GET_RESTAURANTS;
    const data = {
      restaurantDetailRequest: {
        restaurantURL: restauranturl,
        defaultLocationId: defaultLocationId,
        locationURL: locationurl,
      },
    };
    console.log("data from getRestaurantsList in restaurant service", data);
    responseclass = await handleAxiosPostAsync(
      data,
      location,
      methodName,
      false,
      0
    );

    if (
      responseclass.result != null &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      console.log(
        "response from getRestaurantsList in restaurant service",
        responseclass.result
      );
      return responseclass.result as GetAllRestaurantInfo[] | null;
    } else {
      return null;
    }
  }

  static async getRestaurantLocationList(): Promise<
    GetAllLocationInfoNew[] | null
  > {
    responseclass = new ResponseModel();
    const methodName = "getRestaurantLocationList";
    const location = ENDPOINTS.GET_RESTAURANT_LOCATIONS_LIST;
    responseclass = await handleAxiosPostAsync(
      null,
      location,
      methodName,
      false,
      0
    );
    if (
      responseclass.result != null &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      console.log(
        "response from getRestaurantLocationList",
        responseclass.result
      );
      return responseclass.result as GetAllLocationInfoNew[] | null;
    } else {
      return null;
    }
  }

  static async getHomepageBannerDetails(
    frompage: string = "",
    restaurantId: number,
    locationId: number
  ) {
    responseclass = new ResponseModel();
    const methodName = "getHomepageBannerDetaile";
    const restaurantbannerurl = ENDPOINTS.GET_HOMEPAGE_BANNER_LIST;
    const data = {
      bannerRequest: {
        frompage,
        restaurantId,
        locationId,
      },
    };
    console.log("data from getHomepageBannerDetails", data);
    responseclass = await handleAxiosPostAsync(
      data,
      restaurantbannerurl,
      methodName,
      true,
      restaurantId
    );
    if (
      responseclass.result != null &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      console.log(
        "response from getHomepageBannerDetails",
        responseclass.result
      );
      return responseclass.result;
    } else {
      return [];
    }
  }

  static async getRestaurantThemeType(
    restauranturl: string
  ): Promise<GetRestaurantThemeType[] | null> {
    responseclass = new ResponseModel();
    const methodName = "getRestaurantThemeType";
    const themetypeurl = ENDPOINTS.GET_THEME_TYPE;
    const data = {
      themeTypeRequest: {
        restaurantURL: restauranturl,
      },
    };
    console.log("data from getRestaurantThemeType", data);
    responseclass = await handleAxiosPostAsync(
      data,
      themetypeurl,
      methodName,
      false,
      0
    );
    if (
      responseclass.result != null &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      console.log("response from getRestaurantThemeType", responseclass.result);
      return responseclass.result;
    } else {
      return null;
    }
  }

  static async getPageContentRestaurant(
    pageName: string,
    restaurantId: number
  ) {
    responseclass = new ResponseModel();
    const methodName = "getPageContentRestaurant";
    const getPageContent = ENDPOINTS.GET_PAGE_CONTENT_RESTAURANT;
    const data = {
      contentView: {
        pagename: pageName,
        restaurantId,
      },
    };
    console.log("data from getPageContentRestaurant", data);
    responseclass = await handleAxiosPostAsync(
      data,
      getPageContent,
      methodName,
      true,
      restaurantId
    );
    if (
      responseclass.result != null &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      console.log(
        "response from getPageContentRestaurant",
        responseclass.result
      );
      return responseclass.result;
    } else {
      return null;
    }
  }

  static async getMetadataDetails(
    metaDataObj: Record<string, any>
  ): Promise<any> {
    responseclass = new ResponseModel();
    const methodName = "getMetadataDetails";
    const getMetaDataDetail = ENDPOINTS.GET_METADATA_DETAILS;
    const data = {
      seoDetailRequest: metaDataObj,
    };
    console.log("data from getMetadataDetails", data);
    responseclass = await handleAxiosPostAsync(
      data,
      getMetaDataDetail,
      methodName,
      false
    );
    if (
      responseclass.result != null &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      console.log("response from getMetadataDetails", responseclass.result);
      return responseclass.result;
    } else {
      return null;
    }
  }

  static async getCurrentTime(
    restaurantId: number,
    locationId: number
  ): Promise<any> {
    responseclass = new ResponseModel();
    const methodName = "getCurrentTime";
    const getCurrentTime = ENDPOINTS.GET_CURRENT_TIME;
    const data = {
      customerId: 0,
      restaurantId,
      locationId,
    };
    console.log("data from getCurrentTime", data);
    responseclass = await handleAxiosPostAsync(
      data,
      getCurrentTime,
      methodName,
      true,
      restaurantId
    );
    if (
      responseclass.result != null &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      console.log("response from getCurrentTime", responseclass.result);
      return responseclass.result;
    } else {
      return null;
    }
  }
}
