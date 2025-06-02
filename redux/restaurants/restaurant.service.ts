import { ResponseModel } from "@/components/common/commonclass";
import { API_RESPONSE_STATUS } from "@/components/common/enums";
import { ENDPOINTS } from "@/components/default/config";
import { handleAxiosPostAsync } from "@/components/default/helpers/utility";

let responseclass = new ResponseModel();

export class RestaurantsServices {
  static async getRestaurantsList(
    restauranturl: any,
    locationurl: any,
    defaultLocationId: any
  ) {
    responseclass = new ResponseModel();
    const methodName = "getRestaurantsList";
    const location = ENDPOINTS.GET_RESTAURANTS;
    console.log("location in new", location);
    const data = {
      restaurantDetailRequest: {
        restaurantURL: restauranturl,
        defaultLocationId: defaultLocationId,
        locationURL: locationurl,
      },
    };
    responseclass = await handleAxiosPostAsync(
      data,
      location,
      methodName,
      false,
      0
    );
    console.log("restaurant list in new ", responseclass);
    if (
      responseclass.result != null &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      return responseclass.result;
    } else {
      return [];
    }
  }

  static async getRestaurantLocationList() {
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
      return responseclass.result;
    } else {
      return [];
    }
  }

  static async getHomepageBannerDetails(
    frompage = "",
    restaurantId: any,
    locationId: any
  ) {
    responseclass = new ResponseModel();
    const methodName = "getHomepageBannerDetaile";
    const restaurantbannerurl = ENDPOINTS.GET_HOMEPAGE_BANNER_LIST;
    const data = {
      bannerRequest: {
        frompage: "",
        restaurantId: restaurantId,
        locationId: locationId,
      },
    };
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
      return responseclass.result;
    } else {
      return [];
    }
  }

  static async getRestaurantThemeType(restauranturl: any) {
    responseclass = new ResponseModel();
    const methodName = "getRestaurantThemeType";
    const themetypeurl = ENDPOINTS.GET_THEME_TYPE;
    const data = {
      themeTypeRequest: {
        restaurantURL: restauranturl,
      },
    };
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
      return responseclass.result;
    } else {
      return null;
    }
  }
  static async getPageContentRestaurant(pageName: any, restaurantId: any) {
    responseclass = new ResponseModel();
    const methodName = "getPageContentRestaurant";
    const getPageContent = ENDPOINTS.GET_PAGE_CONTENT_RESTAURANT;
    const data = {
      contentView: {
        pagename: pageName,
        restaurantId: restaurantId,
      },
    };
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
      return responseclass.result;
    } else {
      return null;
    }
  }
  static async getMetadataDetails(metaDataObj: any) {
    responseclass = new ResponseModel();
    const methodName = "getMetadataDetails";
    const getMetaDataDetail = ENDPOINTS.GET_METADATA_DETAILS;
    const data = {
      seoDetailRequest: metaDataObj,
    };
    responseclass = await handleAxiosPostAsync(
      data,
      getMetaDataDetail,
      methodName,
      false,
      0
    );
    if (
      responseclass.result != null &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      return responseclass.result;
    } else {
      return null;
    }
  }

  static async getCurrentTime(restaurantId: any, locationId: any) {
    responseclass = new ResponseModel();
    const methodName = "getCurrentTime";
    const getCurrentTime = ENDPOINTS.GET_CURRENT_TIME;
    const data = {
      customerId: 0,
      restaurantId: restaurantId,
      locationId: locationId,
    };
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
      return responseclass.result;
    } else {
      return null;
    }
  }
}
