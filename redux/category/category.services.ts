import { ResponseModel } from "@/components/common/commonclass";
import { API_RESPONSE_STATUS } from "@/components/common/enums";
import { ENDPOINTS } from "@/components/default/config";
import { handleAxiosPostAsync } from "@/components/default/helpers/utility";
import { CategoryItem } from "@/types/category-types/category.services.type";

let responseclass = new ResponseModel();

// Define request and response types

export class CategoryServices {
  static async getCategoryItemList(
    restaurantId: number,
    categories: string,
    customerId: string,
    locationId: string
  ): Promise<CategoryItem[] | null> {
    //debugger;
 // ): Promise<any | null> {
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
      return responseclass.result;
    } else {
      return null;
    }
  }

  static async getCategoryRelativesItems(
    sessionId: string,
    locationId: string,
    restaurantId: number
  ): Promise<CategoryItem[] | null> {
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
      return responseclass.result;
    } else {
      return null;
    }
  }

  static async getCategoryItemListPOS(
    restaurantId: number,
    ispos: boolean,
    categories: string,
    customerId: string,
    locationId: string
  ): Promise<CategoryItem[] | null> {
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
      return null;
    }
  }

  static async getAllCategoryMenuItems(
    restaurantId: number,
    locationId: string,
    customerId: string,
    categories: string
  ): Promise<CategoryItem[] | null> {
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
      return responseclass.result;
    } else {
      return null;
    }
  }
}
