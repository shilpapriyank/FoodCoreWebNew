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

////getRestaurantTime new defined types
export interface RestaurantWindowTimeNew {
  time: string; // add this
  isLastOrder: boolean;  // add this
  deliveryTime: string[];
  pickupTime: string[];
  OrdDeliveryOpeningTime: any[];
  OrdDeliveryOpeningTimeV1: OrdDeliveryOpeningTimeV1[];
  OrdDeliveryClosingTime: any[];
  OrdDeliveryClosingTimeV1: OrdDeliveryClosingTimeV1[];
  TakeoutDeliveryOpeningTime: any[];
  TakeoutDeliveryOpeningTimeV1: TakeoutDeliveryOpeningTimeV1[];
  TakeoutDeliveryClosingTime: any[];
  TakeoutDeliveryClosingTimeV1: TakeoutDeliveryClosingTimeV1[];
  deliveryOpeningWindowTime: any;
  deliveryClosingWindowTime: any;
  isDeliveryClosed: boolean;
  isPickupClosed: boolean;
}

export interface OrdDeliveryOpeningTimeV1 {
  DeliveryTakeoutTiming: string;
  RestaurantIsClosed: boolean;
  isLastOrder: boolean;
}

export interface OrdDeliveryClosingTimeV1 {
  DeliveryTakeoutTiming: string;
  RestaurantIsClosed: boolean;
  isLastOrder: boolean;
}

export interface TakeoutDeliveryOpeningTimeV1 {
  DeliveryTakeoutTiming: string;
  RestaurantIsClosed: boolean;
  isLastOrder: boolean;
}

export interface TakeoutDeliveryClosingTimeV1 {
  DeliveryTakeoutTiming: string;
  RestaurantIsClosed: boolean;
  isLastOrder: boolean;
}
