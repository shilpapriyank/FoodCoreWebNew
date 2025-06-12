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



