import { ResponseModel } from "@/components/common/commonclass";
import { API_RESPONSE_STATUS } from "@/components/common/enums";
import { ENDPOINTS } from "@/components/default/config";
import { handleAxiosPostAsync } from "@/components/default/helpers/utility";
import {
  GetCategoriesRelativeItems,
} from "@/types/category-types/category.services.type";
import { MainCategoryList } from "@/types/mainservice-types/mainservice.type";
import { GetAllMenuCategoryItems } from "@/types/menuitem-types/menuitem.type";

let responseclass = new ResponseModel();

export class CategoryServices {
  static async getCategoryItemList(
    restaurantId: number,
    categories: string,
    customerId: number,
    locationId: number
  ): Promise<MainCategoryList[] | null> {
    responseclass = new ResponseModel();
    const methodName = "getCategoryItemList";
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
      return responseclass.result as MainCategoryList[];
    } else {
      return null;
    }
  }

  static async getCategoryRelativesItems(
    sessionId: string,
    locationId: number,
    restaurantId: number
  ): Promise<GetCategoriesRelativeItems[] | null> {
    responseclass = new ResponseModel();
    const methodName = "getCategoryRelativesItems";
    const location = ENDPOINTS.GET_CATEGORIES_RELATIVE_ITEMS;
    const data = {
      request: {
        sessionId,
        locationId,
        restaurantId,
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
      return responseclass.result as GetCategoriesRelativeItems[];
    } else {
      return null;
    }
  }

  static async getCategoryItemListPOS(
    restaurantId: number,
    ispos: boolean,
    categories: string,
    customerId: number,
    locationId: number
  ): Promise<any[]> {
    responseclass = new ResponseModel();
    const methodName = "getCategoryItemListPOS";
    const location = ENDPOINTS.GET_CATEGORY_ITEMS_POS;
    const data = {
      locationId,
      ispos,
      customerId,
      categories,
      restaurantId,
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

  static async getAllCategoryMenuItems(
    restaurantId: number,
    locationId: number,
    customerId: number,
    categories: string
  ): Promise<GetAllMenuCategoryItems[] | null> {
    responseclass = new ResponseModel();
    const methodName = "getAllMenuCategoryItems";
    const url = ENDPOINTS.GET_ALL_CATEGORY_MENU_ITEMS;
    const data = {
      categoryRequest: {
        restaurantId: restaurantId,
        locationId: locationId,
        customerId: customerId,
        categories: categories,
      },
    };
    responseclass = await handleAxiosPostAsync(
      data,
      url,
      methodName,
      true,
      restaurantId
    );
    if (
      responseclass.result != null &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      return responseclass.result as GetAllMenuCategoryItems[];
    } else {
      return null;
    }
  }
}
