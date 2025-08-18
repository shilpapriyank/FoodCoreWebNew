import { ResponseModel } from "@/components/common/commonclass";
import { API_RESPONSE_STATUS } from "@/components/common/enums";
import { ENDPOINTS } from "@/components/default/config";
import { handleAxiosPostAsync } from "@/components/default/helpers/utility";
import {
  MainCategoryList,
  RestaurantWindowTime,
} from "@/types/mainservice-types/mainservice.type";

let responseclass = new ResponseModel();

export class MainServices {
  static async getMenuCategoryList(
    restaurantId: number,
    locationId: number
  ): Promise<MainCategoryList[] | null> {
    responseclass = new ResponseModel();
    const methodName = "getMenuCategoryList";
    const location = ENDPOINTS.GET_MENU_CATEGORY;

    const data = {
      mainCategoryRequest: {
        restaurantId: restaurantId,
        locationId: locationId,
      },
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
      return responseclass.result as MainCategoryList[];
    } else {
      return [];
    }
  }

  static async getMenuCategoryListPOS(
    restaurantId: number,
    locationId: number,
    isPOS: boolean,
    customerId: number
  ): Promise<MainCategoryList[] | null> {
    responseclass = new ResponseModel();
    const methodName = "getMenuCategoryListPOS";
    const location = ENDPOINTS.GET_MENU_CATEGORY_POS;

    const data = {
      request: {
        restaurantId,
        locationId,
        isPOS,
        customerId,
        categories: "",
      },
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
      return responseclass.result as MainCategoryList[];
    } else {
      return [];
    }
  }

  static async getPromotionCategoryList(
    restaurantId: number,
    categories: string,
    customerId: number,
    locationId: number
  ): Promise<MainCategoryList[] | null> {
    responseclass = new ResponseModel();
    const methodName = "getPromotionCategoryList";
    const endpoint = ENDPOINTS.GET_CATEGORY_MENUITEM_LIST;

    const data = {
      menuItemRequest: {
        restaurantId,
        categories,
        customerId,
        locationId,
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
      return responseclass.result as MainCategoryList[];
    } else {
      return [];
    }
  }

  static async getSelectedRestaurantWindowTime(
    restaurantId: number,
    locationId: number
  ): Promise<RestaurantWindowTime | null> {
    responseclass = new ResponseModel();
    const methodName = "getSelectedRestaurantWindowTime";
    const selecetdrestaurant = ENDPOINTS.GET_SELECTED_RESTAURANT_TIME;

    const data = {
      selectedRestaurant: {
        restaurantId,
        locationId,
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
      return responseclass.result as RestaurantWindowTime;
    } else {
      return null;
    }
  }
}
