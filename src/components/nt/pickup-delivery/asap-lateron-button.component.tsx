import React from "react";
import { ORDER_TYPE, getAsapLaterOnState } from "../../common/utility";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { DELIVERYPAGEMESSAGE } from "../helpers/static-message/delivery-message";
import { DefaultLocation } from "@/types/location-types/location.type";
import { AddressListItem } from "@/types/restaurant-types/restaurant.type";
import { RestaurantWindowTime } from "@/types/mainservice-types/mainservice.type";

interface AsapLateronButtonProps {
  handleAsapClick: () => void;
  handleLaterOnClick: () => void;
  activeButtonClass: "asap" | "lateron" | "";
  isTakeOutPickupTime: boolean;
  defaultLocation: Record<string, any>;
  pickupWindow: any;
  deliveryWindow: any;
  isTakeOutAsap: boolean;
  isDeliveryWindowAvailable: boolean;
  isPickupWindowAvailable: boolean;
}

export const AsapLateronButtonComponent: React.FC<AsapLateronButtonProps> = ({
  handleAsapClick,
  handleLaterOnClick,
  activeButtonClass,
  isTakeOutPickupTime,
  defaultLocation,
  pickupWindow,
  deliveryWindow,
  isTakeOutAsap,
  isDeliveryWindowAvailable,
  isPickupWindowAvailable,
}) => {
  const { restaurantinfo, selecteddelivery, main } = useReduxData();
  const restaurantWindowTime = main.restaurantWindowTime;
  let isDisableAsapLaterOn = false;
  isDisableAsapLaterOn =
    selecteddelivery.pickupordelivery === ORDER_TYPE.PICKUP.text &&
    !isPickupWindowAvailable
      ? true
      : isDisableAsapLaterOn;
  isDisableAsapLaterOn =
    selecteddelivery.pickupordelivery === ORDER_TYPE.DELIVERY.text &&
    !isDeliveryWindowAvailable
      ? true
      : isDisableAsapLaterOn;

  let asapLaterOnState = getAsapLaterOnState(
    defaultLocation as AddressListItem,
    selecteddelivery?.pickupordelivery,
    restaurantWindowTime as any
  );

  return (
    <div className="row my-4">
      {!asapLaterOnState?.isDisableAsapLateron && !isDisableAsapLaterOn ? (
        <>
          {asapLaterOnState?.isAsap === true && (
            <div className="col-lg-6 col-sm-6 col-6">
              <a
                className={`btn-default w-100 show-me ${
                  activeButtonClass === "asap" && "btn-orange"
                }`}
                make-it-active="yes"
                show-this="asap-date-form"
                hide-this="later-date-form"
                onClick={handleAsapClick}
              >
                {" "}
                {DELIVERYPAGEMESSAGE.ASAP}{" "}
              </a>
            </div>
          )}
          {asapLaterOnState?.isLateron === true && (
            <div className="col-lg-6 col-sm-6 col-6">
              <a
                className={`btn-default w-100 show-me ${
                  activeButtonClass === "lateron" && "btn-orange"
                }`}
                make-it-active="yes"
                show-this="later-date-form"
                hide-this="asap-date-form"
                onClick={handleLaterOnClick}
              >
                {" "}
                {DELIVERYPAGEMESSAGE.LATER_ON}{" "}
              </a>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="col-lg-6 col-sm-6 col-6">
            <a
              className={`greyColor no-drop  btn-default w-100 show-me "}`}
              make-it-active="yes"
              show-this="asap-date-form"
              hide-this="later-date-form"
            >
              {" "}
              {DELIVERYPAGEMESSAGE.ASAP}{" "}
            </a>
          </div>
          <div className="col-lg-6 col-sm-6 col-6">
            <a
              className={`greyColor no-drop btn-default w-100 show-me `}
              make-it-active="yes"
              show-this="later-date-form"
              hide-this="asap-date-form"
            >
              {" "}
              {DELIVERYPAGEMESSAGE.LATER_ON}{" "}
            </a>
          </div>
        </>
      )}
    </div>
  );
};
