export interface TimeWindow {
  start: string;
  end: string;
}

export interface RestaurantWindowTime {
  pickupTime?: TimeWindow[];
  deliveryTime?: TimeWindow[];
}

export interface DefaultLocation {
  isTakeOutAsap: boolean;
  isTakeOutPickupTime: boolean;
  isDeliveryPickupTime: boolean;
  isDeliveryAsap: boolean;
  isTakeoutOrderingDisable: boolean;
  isDeliveryOrderingDisable: boolean;
  isOrderingDisable: boolean;
}

// export interface AsapLaterOnState {
//   isdisplay: boolean;
//   isDisableAsapLateron: boolean;
//   isAsap: boolean;
//   isLateron: boolean;
// }
