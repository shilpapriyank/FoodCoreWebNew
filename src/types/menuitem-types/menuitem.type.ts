export type GetMenuItemListArgsTypes = {
  restaurantId?: number;
  locationId?: number;
  customerId?: number;
  menuitemId?: string;
  cartsessionId?: string;
  cartId?: number | any;
};

export type AddfavoriteArgsTypes = {
  customerId: number;
  restaurantId: any;
  menuItemId: number;
};

export type DeleteFavoriteArgsTypes = {
  customerId: string;
  restaurantId: any;
  menuItemId: string;
};

export type AddItemToCartArgsTypes = {
  orderobj: any;
  restaurantId: number;
};

export type UpdateCartOrdersItemArgsTypes = {
  orderobj: any;
  restaurantId: number;
};

export type GetSerachResultArgsTypes = {
  locationId: number;
  restaurantId: number;
  customerId: number;
  serchQuery: string;
};

export type QuickOrderaddToCartArgsTypes = {
  menuItemId: number;
  cartsessionId: string;
  restaurantId: number;
  locationId: number;
};

export type GetAllMenuItemsPOSArgsTypes = {
  restaurantId?: number;
  locationId?: number;
  customerId?: number;
  menuitemId?: string;
  cartsessionId?: string;
  cartId?: number | any;
};
