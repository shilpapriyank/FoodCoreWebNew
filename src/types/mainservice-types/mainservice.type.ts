export interface MainMenuItemRequest {
  restaurantId: number;
  categories: string;
  customerId: string;
  locationId: string;
}

// Types
export type MenuCategory = {
  catId: string;
  catName: string;
  sortorder: number;
  categoryslug: string;
  isdeliveryavailable: boolean;
  istakeoutavailable: boolean;
  imgurl: string;
}

export interface MainPOSRequest {
  restaurantId: string;
  ispos: boolean;
  categories: string;
  customerId: string;
  locationId: string;
}

export interface MainRelativeItemRequest {
  sessionId: string;
  locationId: string;
  restaurantId: number;
}

export interface MainAllRequest {
  restaurantId: number;
  locationId: string;
  customerId: string;
  categories: string;
}

export type MainItemListPOSRequest = {
  restaurantId: number;
  ispos: boolean;
  categories: string;
  customerId: string;
  locationId: string;
};
