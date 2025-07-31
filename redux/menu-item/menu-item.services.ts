import { ResponseModel } from "@/components/common/commonclass";
import { ERRORMESSAGE } from "@/components/common/commonerrormessage";
import { API_RESPONSE_STATUS } from "@/components/common/enums";
import { ENDPOINTS } from "@/components/default/config";
import handleNotify from "@/components/default/helpers/toaster/toaster-notify";
import { ToasterPositions } from "@/components/default/helpers/toaster/toaster-positions";
import { ToasterTypes } from "@/components/default/helpers/toaster/toaster-types";
import { handleAxiosPostAsync } from "@/components/default/helpers/utility";
import {
  AddOrDeleteFavorite,
  AddToCart,
  GetMenuItemDetail,
  GetSerachResult,
  UpdateItemToCart,
} from "@/types/menuitem-types/menuitem.type";

let responseclass = new ResponseModel();

export class MenuItemServices {
  static async getMenuItemList({
    restaurantId,
    locationId,
    customerId,
    menuitemId,
    cartsessionId,
    cartId,
  }: {
    restaurantId: number;
    locationId: number;
    customerId: number;
    menuitemId: number;
    cartsessionId: string;
    cartId: number;
  }): Promise<GetMenuItemDetail | null> {
    responseclass = new ResponseModel();
    const methodName = "getMenuItemList";
    const location = ENDPOINTS.GET_MENU_ITEMS_DETAILS;
    const data = {
      itemDetail: {
        restaurantId: restaurantId != undefined ? restaurantId : 0,
        locationId: locationId != undefined ? locationId : 0,
        customerId: customerId != undefined ? customerId : 0,
        menuitemId: menuitemId,
        cartsessionId: cartsessionId != undefined ? cartsessionId : "",
        cartId: cartId != undefined && cartId != 0 ? cartId : 0,
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
      return responseclass.result as GetMenuItemDetail;
    } else {
      return null;
    }
  }

  static async addfavorite({
    customerId,
    restaurantId,
    menuItemId,
  }: {
    customerId: string;
    restaurantId: number;
    menuItemId: string;
  }): Promise<AddOrDeleteFavorite | null> {
    responseclass = new ResponseModel();
    const methodName = "addfavorite";
    const location = ENDPOINTS.ADD_FAVORITE;
    const data = {
      customerId: customerId,
      restaurantId: restaurantId,
      menuItemId: menuItemId,
    };
    responseclass = await handleAxiosPostAsync(
      data,
      location,
      methodName,
      true,
      restaurantId
    );
    if (
      responseclass.result &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      handleNotify(
        "Item is add into your favorite list",
        ToasterPositions.TopRight,
        ToasterTypes.Success
      );
      return responseclass.result;
    } else if (responseclass.status === API_RESPONSE_STATUS.INVALID) {
      handleNotify(
        responseclass?.message ? responseclass.message : ERRORMESSAGE.TRYAGAIN,
        ToasterPositions.TopRight,
        ToasterTypes.Error
      );
    } else if (responseclass.status === API_RESPONSE_STATUS.ERROR) {
      handleNotify(
        responseclass?.message ? responseclass.message : ERRORMESSAGE.TRYAGAIN,
        ToasterPositions.TopRight,
        ToasterTypes.Error
      );
    } else {
      handleNotify(
        "Item is add into your favorite list",
        ToasterPositions.TopRight,
        ToasterTypes.Warning
      );
      return null;
    }
    return null;
  }

  static async deletefavorite({
    customerId,
    restaurantId,
    menuItemId,
  }: {
    customerId: string;
    restaurantId: number;
    menuItemId: string;
  }): Promise<AddOrDeleteFavorite | null> {
    responseclass = new ResponseModel();
    const methodName = "deletefavorite";
    const location = ENDPOINTS.DELETE_FAVORITE;
    const data = {
      customerId: customerId,
      restaurantId: restaurantId,
      menuitemId: menuItemId,
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
      handleNotify(
        "Item is remove from your favorite list",
        ToasterPositions.TopRight,
        ToasterTypes.Success
      );
      return responseclass.result as AddOrDeleteFavorite;
    } else if (responseclass.status === API_RESPONSE_STATUS.INVALID) {
      handleNotify(
        responseclass?.message ? responseclass.message : ERRORMESSAGE.TRYAGAIN,
        ToasterPositions.TopRight,
        ToasterTypes.Error
      );
    } else if (responseclass.status === API_RESPONSE_STATUS.ERROR) {
      handleNotify(
        responseclass?.message ? responseclass.message : ERRORMESSAGE.TRYAGAIN,
        ToasterPositions.TopRight,
        ToasterTypes.Error
      );
    } else {
      handleNotify(
        "Item is remove from your favorite list",
        ToasterPositions.TopRight,
        ToasterTypes.Warning
      );
      return null;
    }
    return null;
  }

  static async addItemToCart({
    orderobj,
    restaurantId,
  }: {
    orderobj: any;
    restaurantId: number;
  }): Promise<any> {
    responseclass = new ResponseModel();
    const methodName = "addItemToCart";
    const location = ENDPOINTS.ADD_ITEM_TO_CART;
    const data = {
      cartInfo: orderobj,
    };
    responseclass = await handleAxiosPostAsync(
      data,
      location,
      methodName,
      true,
      restaurantId
    );
    if (
      responseclass.result &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      handleNotify(
        "Item added succesfully",
        ToasterPositions.TopRight,
        ToasterTypes.Success
      );
      return responseclass.result;
    }
    handleNotify(
      responseclass?.message || ERRORMESSAGE.TRYAGAIN,
      ToasterPositions.TopRight,
      ToasterTypes.Error
    );
    return null;
  }

  static async updateCartOrdersItem({
    orderobj,
    restaurantId,
  }: {
    orderobj: any;
    restaurantId: number;
  }): Promise<UpdateItemToCart[] | null> {
    responseclass = new ResponseModel();
    const methodName = "updateCartOrdersItem";
    const location = ENDPOINTS.UPDATE_CART_ORDER_ITEMS;
    const data = {
      cartInfo: orderobj,
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

  static async getSerachResult({
    locationId,
    restaurantId,
    customerId,
    serchQuery,
  }: {
    locationId: number;
    restaurantId: number;
    customerId: number;
    serchQuery: string;
  }): Promise<GetSerachResult | null> {
    responseclass = new ResponseModel();
    const methodName = "getSerachResult";
    const location = ENDPOINTS.GET_SEARCH_RESULT;
    const data = {
      searchMenuItemRequest: {
        locationId: locationId,
        restaurantId: restaurantId,
        customerId: customerId,
        input: serchQuery,
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
      responseclass.status === API_RESPONSE_STATUS.SUCCESS &&
      responseclass?.message === ""
    ) {
      return responseclass.result as GetSerachResult | null;
    } else {
      return null;
    }
  }

  static async quickOrderaddToCart({
    menuItemId,
    cartsessionId,
    restaurantId,
    locationId,
  }: {
    menuItemId: number;
    cartsessionId: string;
    restaurantId: number;
    locationId: number;
  }): Promise<any | null> {
   // debugger;
    responseclass = new ResponseModel();
    const methodName = "quickOrderaddToCart";
    const quickOrderUrl = ENDPOINTS.QUICK_ORDER_ADD_TO_CART;
    const data = {
      cartInfo: {
        menuItemId: menuItemId,
        cartsessionId: cartsessionId,
        restaurantId: restaurantId,
        locationId: locationId,
      },
    };
    responseclass = await handleAxiosPostAsync(
      data,
      quickOrderUrl,
      methodName,
      true,
      restaurantId
    );
    if (
      responseclass.result &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      return responseclass.result;
    }
    return null;
  }

  static async getAllMenuItemsPOS({
    restaurantId,
    locationId,
    customerId,
    menuitemId,
    cartsessionId,
    cartId,
  }: {
    restaurantId: number;
    locationId: number;
    customerId: number;
    menuitemId: number;
    cartsessionId: string;
    cartId: number;
  }): Promise<any[]> {
    responseclass = new ResponseModel();
    const methodName = "getMenuItemList";
    const location = ENDPOINTS.GET_MENU_ITEMS_DETAILS;
    const data = {
      itemDetail: {
        restaurantId: restaurantId != undefined ? restaurantId : 0,
        locationId: locationId != undefined ? locationId : 0,
        customerId: customerId != undefined ? customerId : 0,
        menuitemId: menuitemId,
        cartsessionId: cartsessionId != undefined ? cartsessionId : "",
        cartId: cartId != undefined && cartId != 0 ? cartId : 0,
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
      responseclass.result &&
      responseclass.status === API_RESPONSE_STATUS.SUCCESS
    ) {
      return responseclass.result;
    }
    return [];
  }
}
