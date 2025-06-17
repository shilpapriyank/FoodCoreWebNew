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

export interface DependantMenuItem {
  DependantMenuItemId: number;
  MenuItemId: number;
  MenuItemName: string;
  Price: number;
}

export interface MenuItemSize {
  currency: string;
  isMenuCategoryDiscountApplied: boolean;
  originalPrice: number;
  price: number;
  sizeselected: boolean;
  subparameterId: number;
  textsize: string;
  type: string;
}

export interface MenuItemTopping {
  subparameterId: number;
  list: ToppingOption[];
}

export interface ToppingOption {
  displayStatus: boolean;
  freeToppingsCount: number;
  isCompulsory: boolean;
  isHalfPizza: boolean;
  isprintonly: boolean;
  maxSelection: number;
  multipleSelectStatus: boolean;
  name: string;
  optionId: number;
  optionselected: boolean;
  priceStatus: boolean;
  selectAllStatus: boolean;
  subparameterId: number;
  toppingPriceForHalfPizza: number;
  toppingValue: number;
  type: ToppingOptionType[];
}

export interface ToppingOptionType {
  cals: string;
  currency: string;
  defaultSelection: string;
  halfPizzaPriceToppingPercentage: number;
  halfpizzaprice: number;
  image: string;
  isExtraPaidTopping: boolean;
  name: string;
  optionId: number;
  paidQty: number;
  pizzaside: string;
  price: number;
  sequenceNumber: number;
  subOptionToppingQuantity: number;
  subOptionselected: true;
  suboptionId: number;
  suboptioncategoryname: string;
  suboptionmaxselection: number;
  toppingValue: string;
}

export interface SelectedMenuItemDetail {
  catId: number;
  currency: string;
  description: string;
  imgurl: string;
  isFavoriteMenu: boolean;
  isMenuCategoryDiscountApplied: boolean;
  isregular: boolean;
  menuItemName: string;
  menuitemId: number;
  menuitemslug: string;
  menuitemstatus: any[]; // If it's an array of status items, type it
  originalPrice: number;
  price: string;
  quickorderallow: boolean;
  sortorder: number;
}
