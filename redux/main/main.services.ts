import { ResponseModel } from "@/components/common/commonclass";
import { API_RESPONSE_STATUS } from "@/components/common/enums";
import { ENDPOINTS } from "@/components/default/config";
import { handleAxiosPostAsync } from "@/components/default/helpers/utility";

let responseclass = new ResponseModel();

export class MainServices {
  static async getMenuCategoryList(restaurantId: any, locationId: any) {
    responseclass = new ResponseModel();
    const methodName = "getMenuCategoryList";
    const location = ENDPOINTS.GET_MENU_CATEGORY;
    const data = {
      restaurantId: restaurantId,
      locationId: locationId,
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
      return [];
    }
  }

  static async getMenuCategoryListPOS(
    restaurantId: any,
    locationId: any,
    isPOS: any,
    customerId: any
  ) {
    responseclass = new ResponseModel();
    const methodName = "getMenuCategoryListPOS";
    const location = ENDPOINTS.GET_MENU_CATEGORY_POS;
    const data = {
      locationId: locationId,
      isPOS: isPOS,
      customerId: customerId,
      categories: "",
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
      return responseclass.result;
    } else {
      return [];
    }
  }

  static async getPromotionCategoryList(
    restaurantId: any,
    categories: any,
    customerId: any,
    locationId: any
  ) {
    responseclass = new ResponseModel();
    const methodName = "getPromotionCategoryList";
    const endpoint = ENDPOINTS.GET_CATEGORY_MENUITEM_LIST;
    const data = {
      menuItemRequest: {
        restaurantId: restaurantId,
        categories: categories,
        customerId: customerId,
        locationId: locationId,
      },
    };
    responseclass = await handleAxiosPostAsync(
      data,
      endpoint,
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

  static async getSelectedRestaurantWindowTime(
    restaurantId: any,
    locationId: any
  ) {
    responseclass = new ResponseModel();
    const methodName = "getSelectedRestaurantWindowTime";
    const selecetdrestaurant = ENDPOINTS.GET_SELECTED_RESTAURANT_TIME;
    const data = {
      selectedRestaurant: {
        restaurantId: restaurantId,
        locationId: locationId,
      },
    };
    responseclass = await handleAxiosPostAsync(
      data,
      selecetdrestaurant,
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
