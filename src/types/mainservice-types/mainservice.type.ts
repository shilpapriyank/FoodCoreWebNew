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
