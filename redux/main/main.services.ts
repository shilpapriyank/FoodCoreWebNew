import { ResponseModel } from "@/components/common/commonclass";
import { API_RESPONSE_STATUS } from "@/components/common/enums";
import { RestaurantWindowTime } from "@/components/default/common/dominos/helpers/types/utility-type";
import { ENDPOINTS } from "@/components/default/config";
import { handleAxiosPostAsync } from "@/components/default/helpers/utility";
import { MainCategory } from "@/types/mainservice-types/mainservice.type";
import { ChildProcessWithoutNullStreams } from "child_process";

let responseclass = new ResponseModel();

// Define structured request types
interface MainCategoryListRequest {
  restaurantId: number;
  locationId: number;
}

interface MainCategoryListPOSRequest extends MainCategoryListRequest {
  isPOS: boolean;
  customerId: number;
  categories: string;
}

interface PromotionCategoryRequest {
  menuItemRequest: {
    restaurantId: number;
    categories: string;
    customerId: number;
    locationId: number;
  };
}

interface RestaurantTimeRequest {
  selectedRestaurant: {
    restaurantId: number;
    locationId: number;
  };
}

export class MainServices {
  static async getMenuCategoryList(
    restaurantId: number,
    locationId: number
  ): Promise<MainCategory[] | null> {
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
      return responseclass.result;
    } else {
      return [];
    }
  }

  static async getMenuCategoryListPOS(
    restaurantId: number,
    locationId: number,
    isPOS: boolean,
    customerId: number
  ): Promise<MainCategory[] | ChildProcessWithoutNullStreams | null> {
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
      return responseclass.result;
    } else {
      return [];
    }
  }

  static async getPromotionCategoryList(
    restaurantId: number,
    categories: string,
    customerId: number,
    locationId: number
  ): Promise<MainCategory[]> {
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
      return responseclass.result;
    } else {
      return [];
    }
  }

  static async getSelectedRestaurantWindowTime(
    restaurantId: number,
    locationId: number
  ): Promise<RestaurantWindowTime[] | null> {
    responseclass = new ResponseModel();
    const methodName = "getSelectedRestaurantWindowTime";
    const selecetdrestaurant = ENDPOINTS.GET_SELECTED_RESTAURANT_TIME;

    const data: RestaurantTimeRequest = {
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
      return responseclass.result;
    } else {
      return null;
    }
  }
}
