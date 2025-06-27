export interface CartItem {
  availability: boolean;
  availabilityMessage: string | null;
  cartid: number;
  categorydeliveryavailable: boolean;
  categoryhstapplied: boolean;
  categoryisonlineavailable: boolean;
  categoryisposavailable: boolean;
  categoryname: string;
  categoryslug: string;
  categorytakeoutavailable: boolean;
  categorytaxes: number;
  currencysymbol: string;
  dependentmenuitemid: number;
  hstapplied: boolean;
  imgUrl: string;
  imgname: string;
  isDiscountApply: number;
  isdefaultprice: boolean;
  isdelivery: number;
  isfreeitem: boolean;
  istakeaway: number;
  iswaiting: number;
  itemname: string;
  locationid: number;
  menuitemid: number;
  menuitemslug: string;
  minorder: number;
  orderItemType: number;
  orderitemId: number;
  price: number;
  pricetypeid: number;
  promotionpercentage: number;
  promotionpercentagecal: number;
  promotionruletype: number;
  promotiontitle: string;
  qty: number;
  restaurantId: number;
  rewardpoints: number;
  rewardvalue: number;
  studentname: string;
  subParameterPrice: number;
  subParameters: any; // Can define properly if structure known
  subparameterid: number;
  subparametername: string;
  systemAccessFee: number;
  taxPercentage: number;
  totalprice: number;
  unitprice: number;
}

export interface CartTotal {
  PromotionData: any; // Define if structure known
  cartCount: number;
  cartTaxList: any; // Define if structure known
  currencySymbol: string;
  customerOrderCount: number;
  deliveryAmount: number;
  deliveryCharges: any; // Define if structure known
  discountAmount: number;
  discountPercentage: string;
  discountType: string;
  grandTotal: number;
  hstTotal: number;
  isDiscountApplied: boolean;
  minOrderAmountForRewardPoint: any;
  reedemAmount: number;
  reedemPoints: number;
  subTotal: number;
  subTotalWithDiscount: number;
  systemAccessFee: number;
  taxPercentage: number;
  tipAmount: number;
  tipPercentage: number;
  totalTip: number;
}

export interface CartDetails {
  cartItemDetails: CartItem[];
  cartOptionParams: any[]; // Add more specific typing if structure known
  cartTotal: CartTotal;
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

export interface CartDetails {
  // cartItemDetails: CartItemDetail[];
  //cartOptionParams: CartOptionParam[];
  cartTotal: CartTotal;
}

export interface CartItemDetail {
  categoryname: string;
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
  availabilityMessage: any;
  categoryhstapplied: boolean;
  categorytaxes: number;
}

export interface CartOptionParam {
  cartid: number;
  suboptionId: number;
  title: string;
  price: number;
  pizzaside: string;
  quantity: number;
  optionId: number;
  optiontitle: string;
  paidQty: number;
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
  minOrderAmountForRewardPoint: any;
  discountPercentage: string;
  discountType: string;
  currencySymbol: string;
  deliveryCharges: any;
  cartTaxList: any;
  isDiscountApplied: boolean;
  PromotionData: any;
}
