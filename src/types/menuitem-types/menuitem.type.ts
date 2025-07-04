///getAllCategoryMenuItem types

export interface GetAllMenuCategoryItems {
  catId: number;
  catName: string;
  sortorder: number;
  isdeliveryavailable: boolean;
  istakeoutavailable: boolean;
  categoryslug: string;
  imgurl?: string;
  menuitems: Menuitems[];
}

export interface Menuitems {
  menuitemId: number;
  menuItemName: string;
  catId: number;
  description: string;
  imgurl?: string;
  price: string;
  isregular: boolean;
  currency: string;
  isFavoriteMenu: boolean;
  menuitemstatus: MenuStausList[];
  sortorder: number;
  menuitemslug: string;
  originalPrice: number;
  isMenuCategoryDiscountApplied: boolean;
  quickorderallow: boolean;
  qty: number;
  dependedItemId: number;
}

////getMenuItemDetail when click of add to cart menuitem this service called
export interface GetMenuItemDetail {
  menuItemId: number;
  itemName: string;
  image: string;
  description: string;
  isFavourite: boolean;
  size: Size[];
  topping: Topping[];
  MenuStausList: MenuStausList[];
  dependantMenuList: DependantMenuList[];
}

export interface Size {
  type: string;
  currency: string;
  price: number;
  textsize: string;
  subparameterId: number;
  sizeselected: boolean;
  originalPrice: number;
  isMenuCategoryDiscountApplied: boolean;
}

export interface Topping {
  subparameterId: number;
  list: List[];
}

export interface MenuStausList {
  menuitemId: number;
  title: string;
  iconurl: string;
  isactive: boolean;
}

export interface List {
  optionId: number;
  optionselected: boolean;
  subparameterId: number;
  name: string;
  maxSelection: number;
  priceStatus: boolean;
  multipleSelectStatus: boolean;
  selectAllStatus: boolean;
  isCompulsory: boolean;
  isHalfPizza: boolean;
  toppingPriceForHalfPizza: number;
  toppingValue: number;
  displayStatus: boolean;
  type: Type[];
  isprintonly: boolean;
  freeToppingsCount: number;
}

export interface Type {
  optionId: number;
  suboptionId: number;
  name: string;
  cals: string;
  currency: string;
  price: number;
  image: string;
  toppingValue: string;
  defaultSelection?: string;
  suboptioncategoryname: string;
  subOptionselected: boolean;
  subOptionToppingQuantity: number;
  halfPizzaPriceToppingPercentage: number;
  pizzaside: string;
  halfpizzaprice: number;
  suboptionmaxselection: number;
  isExtraPaidTopping: boolean;
  sequenceNumber: number;
  paidQty: number;
}

export interface DependantMenuList {
  MenuItemId: number;
  DependantMenuItemId: number;
  MenuItemName: string;
  Price: number;
}

////addFavorite and delete favorite types
export interface Result {}
export interface AddOrDeleteFavorite {
  result: Result;
  message: string;
  status: number;
}

export interface AddToCart {
  result: Result;
  message: string;
  status: number;
}

export interface UpdateItemToCart {
  result: Result;
  message: string;
  status: number;
}

// -------getSerachResult type------------
export interface GetSerachResult {
  menuItems: MenuItem[];
  categories: Category[];
}

export interface MenuItem {
  menuitemId: number;
  catId: number;
  menuItemName: string;
  menuitemslug: string;
  description: string;
  imgurl: string;
  thumbimgurl: string;
  mediumimgurl: string;
  fullimgurl: string;
  totallikes: any;
  rewardpoints: number;
  rank: number;
  healthBenefitsDesc: any;
  instock: boolean;
  associateMenuitemId: number;
  buttontext: string;
  buttonlabel: string;
  parentCategoryName: string;
  MenuStausList: MenuStausList[];
  PriceList: string;
  isFavoriteMenu: boolean;
  isTaxable: boolean;
  IsActive: boolean;
  menuItemStatus: any;
  locationId: number;
  menuItemPrice: number;
  cardbackgroundcolor: string;
  isdefaultprice: number;
  typeid: number;
  isopenpositem: boolean;
  promotionMenuItem: string;
  quickorderallow: boolean;
  isWeightItem: boolean;
  dependantMenuList: DependantMenuList[];
  menuItemOriginalPrice: number;
  isMenuCategoryDiscountApplied: boolean;
}

export interface Category {
  catId: number;
  catName: string;
  categoryslug: string;
  description: string;
  thumbimgurl: string;
  subCategory: any;
  isDiscountApply: boolean;
  isrelativeCategory: boolean;
  sortorder: number;
  cardBackgroundColor: string;
  catSelected: boolean;
  fullimgurl: any;
  isdeliveryavailable: boolean;
  istakeoutavailable: boolean;
  lastupdatedAt: number;
  hstapplied: boolean;
  categorytaxes: number;
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
  menuitemstatus: MenuStausList[]; // If it's an array of status items, type it
  originalPrice: number;
  price: string;
  quickorderallow: boolean;
  sortorder: number;
  // cartid: any;
  // dependedItemId: number;
  // qty: number;
}

export interface MenuItemsCommon {
  menuitemId: number;
  catId: number;
  menuItemName: string;
  menuitemslug: string;
  description: string;
  imgurl: string;
  thumbimgurl: string;
  mediumimgurl: string;
  fullimgurl: string;
  totallikes: any;
  rewardpoints: number;
  rank: number;
  healthBenefitsDesc: any;
  instock: boolean;
  associateMenuitemId: number;
  buttontext: string;
  buttonlabel: string;
  parentCategoryName: string;
  MenuStausList: MenuStausList[];
  PriceList: string;
  isFavoriteMenu: boolean;
  isTaxable: boolean;
  IsActive: boolean;
  menuItemStatus: any;
  locationId: number;
  menuItemPrice: number;
  cardbackgroundcolor: string;
  isdefaultprice: number;
  typeid: number;
  isopenpositem: boolean;
  promotionMenuItem: string;
  quickorderallow: boolean;
  isWeightItem: boolean;
  dependantMenuList: DependantMenuList[];
  menuItemOriginalPrice: number;
  price: string;
  isregular: boolean;
  currency: string;
  menuitemstatus: string[];
  sortorder: number;
  originalPrice: number;
  isMenuCategoryDiscountApplied: boolean;
}

// -----------old types---------------
// export interface DependantMenuItem {
//   DependantMenuItemId: number;
//   MenuItemId: number;
//   MenuItemName: string;
//   Price: number;
// }

// export interface MenuItemDetailList {
//   MenuStausList: any[];
//   dependantMenuList: any[];
//   description: string;
//   image: string | null;
//   isFavourite: boolean;
//   itemName: string;
//   menuItemId: number;
//   size: any[];
//   topping: any[];
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
//   list: any[];
//   subparameterId: number;
// }

// export interface ToppingOption {
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
//   type: ToppingOptionType[];
// }

// export interface ToppingOptionType {
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
//   subOptionselected: true;
//   suboptionId: number;
//   suboptioncategoryname: string;
//   suboptionmaxselection: number;
//   toppingValue: string;
// }
