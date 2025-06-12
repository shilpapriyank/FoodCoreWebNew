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
  locationId: string;
}

interface MainCategoryListPOSRequest extends MainCategoryListRequest {
  isPOS: boolean;
  customerId: string;
  categories: string;
}

interface PromotionCategoryRequest {
  menuItemRequest: {
    restaurantId: number;
    categories: string;
    customerId: string;
    locationId: string;
  };
}

interface RestaurantTimeRequest {
  selectedRestaurant: {
    restaurantId: number;
    locationId: string;
  };
}

export class MainServices {
  static async getMenuCategoryList(
    restaurantId: number,
    locationId: string
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
    locationId: string,
    isPOS: boolean,
    customerId: string
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
    customerId: string,
    locationId: string
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
    locationId: string
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

// import { ResponseModel } from "@/components/common/commonclass";
// import { API_RESPONSE_STATUS } from "@/components/common/enums";
// import { ENDPOINTS } from "@/components/default/config";
// import { handleAxiosPostAsync } from "@/components/default/helpers/utility";

// let responseclass = new ResponseModel();

// export class MainServices {
//   static async getMenuCategoryList(restaurantId: number, locationId: string) {
//     responseclass = new ResponseModel();
//     const methodName = "getMenuCategoryList";
//     const location = ENDPOINTS.GET_MENU_CATEGORY;
//     const data = {
//       restaurantId: restaurantId,
//       locationId: locationId,
//     };
//     responseclass = await handleAxiosPostAsync(
//       data,
//       location,
//       methodName,
//       true,
//       restaurantId
//     );
//     if (
//       responseclass.result != null &&
//       responseclass.status === API_RESPONSE_STATUS.SUCCESS
//     ) {
//       return responseclass.result;
//     } else {
//       return [];
//     }
//   }

//   static async getMenuCategoryListPOS(
//     restaurantId: any,
//     locationId: any,
//     isPOS: any,
//     customerId: any
//   ) {
//     responseclass = new ResponseModel();
//     const methodName = "getMenuCategoryListPOS";
//     const location = ENDPOINTS.GET_MENU_CATEGORY_POS;
//     const data = {
//       locationId: locationId,
//       isPOS: isPOS,
//       customerId: customerId,
//       categories: "",
//       restaurantId: restaurantId,
//     };
//     responseclass = await handleAxiosPostAsync(
//       data,
//       location,
//       methodName,
//       true,
//       restaurantId
//     );
//     if (
//       responseclass.result != null &&
//       responseclass.status === API_RESPONSE_STATUS.SUCCESS
//     ) {
//       return responseclass.result;
//     } else {
//       return [];
//     }
//   }

//   static async getPromotionCategoryList(
//     restaurantId: any,
//     categories: any,
//     customerId: any,
//     locationId: any
//   ) {
//     responseclass = new ResponseModel();
//     const methodName = "getPromotionCategoryList";
//     const endpoint = ENDPOINTS.GET_CATEGORY_MENUITEM_LIST;
//     const data = {
//       menuItemRequest: {
//         restaurantId: restaurantId,
//         categories: categories,
//         customerId: customerId,
//         locationId: locationId,
//       },
//     };
//     responseclass = await handleAxiosPostAsync(
//       data,
//       endpoint,
//       methodName,
//       true,
//       restaurantId
//     );
//     if (
//       responseclass.result != null &&
//       responseclass.status === API_RESPONSE_STATUS.SUCCESS
//     ) {
//       return responseclass.result;
//     } else {
//       return [];
//     }
//   }

//   static async getSelectedRestaurantWindowTime(
//     restaurantId: any,
//     locationId: any
//   ) {
//     responseclass = new ResponseModel();
//     const methodName = "getSelectedRestaurantWindowTime";
//     const selecetdrestaurant = ENDPOINTS.GET_SELECTED_RESTAURANT_TIME;
//     const data = {
//       selectedRestaurant: {
//         restaurantId: restaurantId,
//         locationId: locationId,
//       },
//     };
//     responseclass = await handleAxiosPostAsync(
//       data,
//       selecetdrestaurant,
//       methodName,
//       true,
//       restaurantId
//     );
//     if (
//       responseclass.result != null &&
//       responseclass.status === API_RESPONSE_STATUS.SUCCESS
//     ) {
//       return responseclass.result;
//     } else {
//       return null;
//     }
//   }
// }
