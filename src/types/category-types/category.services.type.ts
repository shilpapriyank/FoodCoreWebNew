////getCategoriesRelativeItems response after selecting toppings and size and confirm button click
export interface GetCategoriesRelativeItems {
  categoryId: number;
  categoryname: string;
  sortOrder: number;
  categoryslug: string;
  items: Item[];
}

export interface Item {
  menuItemId: number;
  menuItemName: string;
  menuDescription: string;
  menuItemImage?: string;
  menuitemslug: string;
  typeid: number;
  price: number;
  isdefaultprice: number;
  originalPrice: number;
  isMenuCategoryDiscountApplied: boolean;
}

export interface GetMenuStausListForFilter {
  menuitemId: number;
  title: string;
  iconurl: string;
  isactive: boolean;
}

export interface GetAllMenuitemForFilter {
  IsActive: boolean;
  MenuStausList: GetMenuStausListForFilter[];
  PriceList: string;
  associateMenuitemId: number;
  buttonlabel: string;
  buttontext: string;
  cardbackgroundcolor: string;
  catId: number;
  dependantMenuList: any;
  description: string;
  fullimgurl: string;
  healthBenefitsDesc: string;
  imgurl: string;
  instock: boolean;
  isFavoriteMenu: boolean;
  isMenuCategoryDiscountApplied: boolean;
  isTaxable: boolean;
  isWeightItem: boolean;
  isdefaultprice: number;
  isopenpositem: boolean;
  locationId: number;
  mediumimgurl: string;
  menuItemName: string;
  menuItemOriginalPrice: number;
  menuItemPrice: number;
  menuItemStatus: any;
  menuitemId: number;
  menuitemslug: string;
  parentCategoryName: string;
  promotionMenuItem: string;
  quickorderallow: boolean;
  rank: number;
  rewardpoints: number;
  thumbimgurl: string;
  totallikes: number;
  typeid: number;
}

export interface GetAllCategoryForFilterCategory {
  cardBackgroundColor: string;
  catId: number;
  catName: string;
  catSelected: boolean;
  categoryslug: string;
  categorytaxes: number;
  description: string;
  fullimgurl: string;
  hstapplied: boolean;
  isActive: boolean;
  isDiscountApply: boolean;
  isdeliveryavailable: boolean;
  isposavailable: boolean;
  isrelativeCategory: boolean;
  istakeoutavailable: boolean;
  lastupdatedAt: number;
  menuitems: GetAllMenuitemForFilter[];
  sortorder: number;
  subCategory: any;
  thumbimgurl: string;
}

// ---------old types---------------
// export interface MenuItemRequest {
//   restaurantId: number;
//   categories: string;
//   customerId: number;
//   locationId: number;
// }

// // Types
// export interface CategoryItem {
//   catId: number;
//   catName: string;
//   sortorder: number;
//   categoryslug: string;
//   isdeliveryavailable: boolean;
//   istakeoutavailable: boolean;
//   imgurl: string;
// }

// export interface SelectedCategoryDetail {
//   catId: number;
//   catName: string;
//   categoryslug: string;
//   imgurl: string;
//   isdeliveryavailable: boolean;
//   istakeoutavailable: boolean;
//   sortorder: number;
// }

// export interface MenuItemType {
//   menuitemId: number;
//   catId: number;
//   menuItemName: string;
//   menuitemslug: string;
//   description: string;
//   imgurl: string;
//   price: string; // Stored as string like "20.00"
//   originalPrice: number;
//   currency: string;
//   sortorder: number;
//   isregular: boolean;
//   quickorderallow: boolean;
//   isFavoriteMenu: boolean;
//   isMenuCategoryDiscountApplied: boolean;
//   menuitemstatus: any[]; // Update with a specific type if you know the shape
// }

// export interface CategoryItemType {
//   catId: number;
//   catName: string;
//   sortorder: number;
//   categoryslug: string;
//   isdeliveryavailable: boolean;
//   istakeoutavailable: boolean;
//   imgurl: string;
//   menuitems?: MenuItemType[];
// }

// export interface POSRequest {
//   restaurantId: number;
//   ispos: boolean;
//   categories: string;
//   customerId: number;
//   locationId: number;
// }

// export interface RelativeItemRequest {
//   sessionId: string;
//   locationId: number;
//   restaurantId: number;
// }

// export interface AllCategoryRequest {
//   restaurantId: number;
//   locationId: number;
//   customerId: number;
//   categories: string;
// }

// export type CategoryItemListPOSRequest = {
//   restaurantId: number;
//   ispos: boolean;
//   categories: string;
//   customerId: number;
//   locationId: number;
// };

// export type CategoryItemRequest = {
//   restaurantId: number;
//   locationId: number;
//   customerId: number;
//   categories: string;
//   selectedCategoryUrl: string;
// };
