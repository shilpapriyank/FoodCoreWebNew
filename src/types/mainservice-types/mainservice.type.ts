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

export interface MainMenuItemRequest {
  restaurantId: number;
  categories: string;
  customerId: number;
  locationId: number;
}

// Types includes new define types
export type MainCategoryList = {
  catId: number;
  catName: string;
  categoryslug: string;
  imgurl?: string;
  isdeliveryavailable: boolean;
  istakeoutavailable: boolean;
  sortorder: number;
};
