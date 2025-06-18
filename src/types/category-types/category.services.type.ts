export interface MenuItemRequest {
  restaurantId: number;
  categories: string;
  customerId: number;
  locationId: number;
}

// Types
export interface CategoryItem {
  catId: number;
  catName: string;
  sortorder: number;
  categoryslug: string;
  isdeliveryavailable: boolean;
  istakeoutavailable: boolean;
  imgurl: string;
}

export interface MenuItemType {
  menuitemId: number;
  catId: number;
  menuItemName: string;
  menuitemslug: string;
  description: string;
  imgurl: string;
  price: string; // Stored as string like "20.00"
  originalPrice: number;
  currency: string;
  sortorder: number;
  isregular: boolean;
  quickorderallow: boolean;
  isFavoriteMenu: boolean;
  isMenuCategoryDiscountApplied: boolean;
  menuitemstatus: any[]; // Update with a specific type if you know the shape
}

export interface CategoryItemType {
  catId: number;
  catName: string;
  sortorder: number;
  categoryslug: string;
  isdeliveryavailable: boolean;
  istakeoutavailable: boolean;
  imgurl: string;
  menuitems?: MenuItemType[];
}

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
