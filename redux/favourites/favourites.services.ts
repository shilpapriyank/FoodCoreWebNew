import { ResponseModel } from "@/components/common/commonclass";
import { ERRORMESSAGE } from "@/components/common/commonerrormessage";
import { API_RESPONSE_STATUS } from "@/components/common/enums";
import { ENDPOINTS } from "@/components/default/config";
import handleNotify from "@/components/default/helpers/toaster/toaster-notify";
import { ToasterPositions } from "@/components/default/helpers/toaster/toaster-positions";
import { ToasterTypes } from "@/components/default/helpers/toaster/toaster-types";
import { handleAxiosPostAsync } from "@/components/default/helpers/utility";

let responseclass = new ResponseModel();

export class FavouritesServices {
  static async getFavouritesList(
    restaurantId: number,
    customerId: number,
    locationId: number
  ) {
    responseclass = new ResponseModel();
    const methodName = "getFavouritesList";
    const favourites = ENDPOINTS.GET_ALL_FAVORITES;
    const data = {
      restaurantId: restaurantId,
      customerId: customerId,
      locationId: locationId,
    };
    responseclass = await handleAxiosPostAsync(
      data,
      favourites,
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

  static async deletefavorite(
    customerId: number,
    restaurantId: number,
    menuItemId: number
  ) {
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

    if (responseclass.result != null && responseclass.status === 1) {
      handleNotify(
        "Item is remove from your favorite list",
        ToasterPositions.TopRight,
        ToasterTypes.Success
      );
      return responseclass.result;
    } else {
      handleNotify(
        responseclass?.message ? responseclass.message : ERRORMESSAGE.TRYAGAIN,
        ToasterPositions.TopRight,
        ToasterTypes.Error
      );
      return null;
    }
  }
}
