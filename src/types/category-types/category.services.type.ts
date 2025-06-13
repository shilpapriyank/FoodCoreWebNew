export interface MenuItemRequest {
  restaurantId: number;
  categories: string;
  customerId: number;
  locationId: number;
}

// Types
export type CategoryItem = {
  catId: number;
  catName: string;
  sortorder: number;
  categoryslug: string;
  isdeliveryavailable: boolean;
  istakeoutavailable: boolean;
  imgurl: string;
};

export type CategoryItemType = {
  catId: number;
  catName: string;
  sortorder: number;
  categoryslug: string;
  isdeliveryavailable: boolean;
  istakeoutavailable: boolean;
  imgurl: string;
};

export interface POSRequest {
  restaurantId: number;
  ispos: boolean;
  categories: string;
  customerId: number;
  locationId: number;
}

export interface RelativeItemRequest {
  sessionId: string;
  locationId: number;
  restaurantId: number;
}

export interface AllCategoryRequest {
  restaurantId: number;
  locationId: number;
  customerId: number;
  categories: string;
}

export type CategoryItemListPOSRequest = {
  restaurantId: number;
  ispos: boolean;
  categories: string;
  customerId: number;
  locationId: number;
};
