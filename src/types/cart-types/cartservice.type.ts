// -------old types before above it defined ---------------

import { Topping } from "../menuitem-types/menuitem.type";

export interface CartItem {
  menuid: number;
  restaurantId: number;
  locationId: number;
  cartId: number;
  OrderItemType: number;
  orderitemId: number;
  qty: number;
  price: number;
  itemname: string;
  netprice: number;
  subparameterid: number;
  subparametername: string;
  topsubparaid: number;
  topsubparaname: string;
  topprice: number;
  dependentmenuitemid: number;
  sessionid: string;
  rewardpoints: number;
  Toppings: Topping[];
  OptionParameter: CartOptionParams[];
  studentname: string;
}

export interface OrderObjType {
  cart: CartItem[];
  restaurantId: number;
  locationId: number;
  removecart: string;
  cartsessionId: string;
  orderType: number;
  selectedTime: string;
  selectedDate: string;
}

export interface PromotionData {
  promotionpercentage: number;
  promotiontitle: string;
  promotionruletype: number;
  promotionpercentagecal: number;
  promotionappliedto: number;
}

export interface CartOptionParams {
  cartid: number;
  suboptionId: number;
  //Title: string;
  title: string;
  price: number;
  pizzaside: string;
  quantity: number;
  optionId: number;
  optiontitle: string;
  paidQty: number;
  toppingquantity: number;
}

export interface GetCartItemsList {
  cartDetails: CartDetails;
}

export interface CartItemDetails {
  categoryname: string;
  cartitemcount: number;
  categoryId: number;
  itemname: string;
  orderItemType: number;
  orderitemId: number;
  cartid: number;
  qty: number;
  subparameterid: number;
  price: number;
  unitprice: number;
  totalprice: number;
  rewardpoints: number;
  restaurantId: number;
  locationid: number;
  subparametername: string;
  rewardvalue: number;
  minorder: number;
  currencysymbol: string;
  istakeaway: number;
  isdelivery: number;
  iswaiting: number;
  isDiscountApply: number;
  imgname: string;
  imgUrl: string;
  menuitemid: number;
  taxPercentage: number;
  subParameters: string[];
  subParameterPrice: number;
  systemAccessFee: number;
  hstapplied: boolean;
  pricetypeid: number;
  isdefaultprice: boolean;
  studentname: string;
  categorytakeoutavailable: boolean;
  categorydeliveryavailable: boolean;
  categoryisonlineavailable: boolean;
  categoryisposavailable: boolean;
  menuitemslug: string;
  categoryslug: string;
  dependentmenuitemid: number;
  promotionpercentage: number;
  promotiontitle: string;
  promotionruletype: number;
  promotionpercentagecal: number;
  isfreeitem: boolean;
  availability: boolean;
  availabilityMessage: string;
  categoryhstapplied: boolean;
  categorytaxes: number;
}

export interface DeliveryChargesTypes {
  returnMessage: string;
  isdelivery: string;
  deliveryService: string;
  dropofTime: string;
  requestId: string;
  DeliveryCharges: string;
  maxkms: string;
  IsGeoFencing: number;
  GeoMinOrderAmount: string;
  distance: number;
  header: string;
  minOrderForAddress: number;
}

export interface CartTotal {
  subTotal: number;
  reedemPoints: number;
  reedemAmount: number;
  discountAmount: number;
  deliveryAmount: number;
  subTotalWithDiscount: number;
  taxPercentage: number;
  totalTip: number;
  hstTotal: number;
  grandTotal: number;
  systemAccessFee: number;
  tipPercentage: number;
  tipAmount: number;
  cartCount: number;
  customerOrderCount: number;
  minOrderAmountForRewardPoint: string;
  discountPercentage: string;
  discountType: string;
  currencySymbol: string;
  deliveryCharges: any;
  cartTaxList: any;
  isDiscountApplied: boolean;
  PromotionData: PromotionData;
}

export interface CartDetails {
  cartItemDetails?: CartItemDetails[];
  cartOptionParams?: CartOptionParams[];
  cartTotal?: CartTotal[];
}

///// getCartItemsCount service response after menuitem added to cart
export interface GetCartItemsCount {
  cartCount: number;
}

////getCartItems service response after item added to cart
///this is have to apply
export interface GetCartItems {
  cartDetails: CartDetails;
}

// export interface DeliveryChargesTypes {
//   chargetype: string;
//   deliverycharges: string;
//   distance: number;
//   geoMinOrderAmount: string;
//   isdelivery: string;
//   isGeoFencing: boolean;
//   maxkms: string;
//   returnMessage: string;
//   minOrderForAddress: number;
// }
