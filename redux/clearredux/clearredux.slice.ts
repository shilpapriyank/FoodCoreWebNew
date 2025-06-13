// clearRedux.slice.ts (no need for .action.ts anymore)

// Import actions from slices
// import { resetCart } from "../cart/cart.slice";
import { resetCategory } from "../category/category.slice";
// import {
//   DeleteTempDeliveryAddress,
//   resetDeliveryAddress,
//  } from "../delivery-address/delivery-address.slice";
import { resetMenuitem } from "../menu-item/menu-item.slice";
import { resetBannerDetails } from "../restaurants/restaurants.slice";
import { resetSelectedDelivery } from "../selected-delivery-data/selecteddelivery.slice";
import { AppDispatch } from "../store";
//import { resetSessionId } from "../session/session.slice";
//import { resetStudent } from "../student/student.slice";

// Redux Toolkit Thunk style function
export const clearRedux = (resetAllOrder: boolean, isNewTheme = false) => {
  return async (dispatch: any) => {
    // dispatch(resetCart());
    // dispatch(changeLocationModal(false));
    // dispatch(setDeliveryPickupPopup(true));
    // dispatch(DeleteTempDeliveryAddress());
    dispatch(resetSelectedDelivery());
    dispatch(resetMenuitem());
    // dispatch(resetSessionId());
    // dispatch(resetStudent());

    if (!isNewTheme) {
      dispatch(resetCategory());
    }

    if (!resetAllOrder) {
      //dispatch(resetOrdersData());
    } else {
      //dispatch(resetOrders());
    }

    dispatch(resetBannerDetails());
    //     dispatch(resetDeliveryAddress());
    //     dispatch(emptyordertime());
    //     dispatch(clearDeliveryRequestId());
  };
};
