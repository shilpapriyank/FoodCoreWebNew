
import { resetCart } from "../cart/cart.slice";
import { resetCategory } from "../category/category.slice";
import {
  DeleteTempDeliveryAddress,
  resetDeliveryAddress,
} from "../delivery-address/delivery-address.slice";
import { changeLocationModal, setDeliveryPickupPopup } from "../main/main.slice";
import { resetMenuitem } from "../menu-item/menu-item.slice";
import { clearDeliveryRequestId, emptyordertime, resetOrders, resetOrdersData } from "../order/order.slice";
import { resetBannerDetails } from "../restaurants/restaurants.slice";
import { resetSelectedDelivery } from "../selected-delivery-data/selecteddelivery.slice";
import { resetSessionId } from "../session/session.slice";
import { resetStudent } from "../student/student.slice";

// Redux Toolkit Thunk style function
export const clearRedux = (resetallorder: boolean, isnewtheme = false) => {
  return async (dispatch: any) => {
    dispatch(resetCart());
    // dispatch(resetMain());
    dispatch(changeLocationModal(false))
    dispatch(setDeliveryPickupPopup(true))
    dispatch(DeleteTempDeliveryAddress())
    dispatch(resetSelectedDelivery())
    dispatch(resetMenuitem());
    dispatch(resetSessionId());
    dispatch(resetStudent());

    if (!isnewtheme) {
      dispatch(resetCategory());
    }

    if (!resetallorder) {
      dispatch(resetOrdersData());
    } else {
      dispatch(resetOrders());
    }
    dispatch(resetBannerDetails());
    dispatch(resetDeliveryAddress());
    dispatch(emptyordertime());
    dispatch(clearDeliveryRequestId());
  };
};
