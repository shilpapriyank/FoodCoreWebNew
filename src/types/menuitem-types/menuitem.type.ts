export interface DependantMenuItem {
  DependantMenuItemId: number;
  MenuItemId: number;
  MenuItemName: string;
  Price: number;
}

export interface MenuItemDetailList {
  MenuStausList: any[];
  dependantMenuList: any[];
  description: string;
  image: string | null;
  isFavourite: boolean;
  itemName: string;
  menuItemId: number;
  size: any[];
  topping: any[];
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
  list: any[];
  subparameterId: number;
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

// export interface DependantMenuItem {
//   DependantMenuItemId: number;
//   MenuItemId: number;
//   MenuItemName: string;
//   Price: number;
// }

// export interface MenuItemDetailList {
//   MenuStausList: any[];
//   dependantMenuList: DependantMenuItem;
//   description: string;
//   image: string | null;
//   isFavourite: boolean;
//   itemName: string;
//   menuItemId: number;
//   size: MenuItemSize;
//   topping: MenuItemTopping;
// }

// export interface MenuItemSize {
//   currency: string;
//   isMenuCategoryDiscountApplied: boolean;
//   originalPrice: number;
//   price: number;
//   sizeselected: boolean;
//   subparameterId: number;
//   textsize: string;
//   type: string;
// }

// export interface MenuItemTopping {
//   list: ToppingList;
//   subparameterId: number;
// }

// export interface ToppingList {
//   displayStatus: boolean;
//   freeToppingsCount: number;
//   isCompulsory: boolean;
//   isHalfPizza: boolean;
//   isprintonly: boolean;
//   maxSelection: number;
//   multipleSelectStatus: boolean;
//   name: string;
//   optionId: number;
//   optionselected: boolean;
//   priceStatus: boolean;
//   selectAllStatus: boolean;
//   subparameterId: number;
//   toppingPriceForHalfPizza: number;
//   toppingValue: number;
//   type: ToppingListType;
// }

// export interface ToppingListType {
//   cals: string;
//   currency: string;
//   defaultSelection: string;
//   halfPizzaPriceToppingPercentage: number;
//   halfpizzaprice: number;
//   image: string;
//   isExtraPaidTopping: boolean;
//   name: string;
//   optionId: number;
//   paidQty: number;
//   pizzaside: string;
//   price: number;
//   sequenceNumber: number;
//   subOptionToppingQuantity: number;
//   subOptionselected: boolean;
//   suboptionId: number;
//   suboptioncategoryname: string;
//   suboptionmaxselection: number;
//   toppingValue: string;
// }

// export interface SelectedMenuItemDetail {
//   catId: number;
//   currency: string;
//   description: string;
//   imgurl: string;
//   isFavoriteMenu: boolean;
//   isMenuCategoryDiscountApplied: boolean;
//   isregular: boolean;
//   menuItemName: string;
//   menuitemId: number;
//   menuitemslug: string;
//   menuitemstatus: any;
//   originalPrice: number;
//   price: string;
//   quickorderallow: boolean;
//   sortorder: number;
// }
