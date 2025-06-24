export interface MainMenuItemRequest {
  restaurantId: number;
  categories: string;
  customerId: number;
  locationId: number;
}

// Types
export type MainCategory = {
  catId: number;
  catName: string;
  categoryslug: string;
  imgurl: string;
  isdeliveryavailable: boolean;
  istakeoutavailable: boolean;
  sortorder: number;
};

// export type MainCategory = {
//   catId: string;
//   catName: string;
//   sortorder: number;
//   categoryslug: string;
//   isdeliveryavailable: boolean;
//   istakeoutavailable: boolean;
//   imgurl: string;
// }

export interface MainPOSRequest {
  restaurantId: string;
  ispos: boolean;
  categories: string;
  customerId: number;
  locationId: number;
}

export interface MainRelativeItemRequest {
  sessionId: string;
  locationId: number;
  restaurantId: number;
}

export interface MainAllRequest {
  restaurantId: number;
  locationId: number;
  customerId: number;
  categories: string;
}

export type MainItemListPOSRequest = {
  restaurantId: number;
  ispos: boolean;
  categories: string;
  customerId: number;
  locationId: number;
};

export interface RestaurantWindowTime {
  OrdDeliveryClosingTime: DeliveryTimeSlot[];
  OrdDeliveryClosingTimeV1: DeliveryTimeSlot[];
  OrdDeliveryOpeningTime: DeliveryTimeSlot[];
  OrdDeliveryOpeningTimeV1: DeliveryTimeSlot[];
  TakeoutDeliveryClosingTime: DeliveryTimeSlot[];
  TakeoutDeliveryClosingTimeV1: DeliveryTimeSlot[];
  TakeoutDeliveryOpeningTime: DeliveryTimeSlot[];
  TakeoutDeliveryOpeningTimeV1: DeliveryTimeSlot[];
  deliveryClosingWindowTime: string | null;
  deliveryOpeningWindowTime: string | null;
  deliveryTime: string[];
  pickupTime: string[];
  isDeliveryClosed: boolean;
  isPickupClosed: boolean;
}

export interface DeliveryTimeSlot {
  DeliveryTakeoutTiming: string; // e.g., "02:50 AM"
  RestaurantIsClosed: boolean;
  isLastOrder: boolean;
}
