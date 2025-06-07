export interface MenuItemRequest {
  restaurantId: string;
  categories: string[];
  customerId: string;
  locationId: string;
}

export interface POSRequest {
  restaurantId: string;
  ispos: boolean;
  categories: string[];
  customerId: string;
  locationId: string;
}

export interface RelativeItemRequest {
  sessionId: string;
  locationId: string;
  restaurantId: string;
}

export interface AllCategoryRequest {
  restaurantId: string;
  locationId: string;
  customerId: string;
  categories: string[];
}

export type GetCategoryItemListArgsTypes = {
  restaurantId: number;
  categories: string[];
  customerId: string;
  locationId: string;
};

export type GetCategoryRelativesItemsArgsTypes = {
  sessionId: string;
  locationId: string;
  restaurantId: number;
};

export type GetCategoryItemListPOSArgsTypes = {
  restaurantId: number;
  ispos: boolean;
  categories: string[];
  customerId: string;
  locationId: string;
};

export type GetAllCategoryMenuItemsArgsTypes = {
  restaurantId: number;
  locationId: string;
  customerId: string;
  categories: string[];
};
