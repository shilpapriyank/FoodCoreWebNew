export type OrderAddress = {
  deliveryaddressId?: number;
  address1?: string;
  address2?: string;
  landmark?: string;
  city?: string;
  zipcode?: string;
  state?: string;
  country?: string;
};

export type CardPayment = {
  restaurantId: number;
  locationId: number;
  paymentIntentId: string;
  orderId: number;
  paymentMethodId: string;
  totalAmount: number;
  customerId: number;
  cardname: string;
  emailId: string;
  cardnumber: string;
  expmonth: number;
  expyear: number;
  cvv: string;
  zipcode: string;
  countryId: number;
  cartsessionid: string;
};

export interface OrderState {
  checktime: any;
  isasap: boolean;
  orderId: number;
  isRedirectToCheckout: boolean;
  calculatedTotal: number;
  cardShowMessage: string;
  deliveryRequestId: string;
  futureOrderDay: any;
}

export type CheckOrderTimeArgsTypes = {
  restaurantId: number;
  locationId: number;
  recievingTime: string;
  recieving: string;
  flg: number;
  obj: OrderAddress;
  requestId: string;
};

export type GetOrderInfoArgsTypes = {
  restaurantId: number;
  locationId: number;
  orderId: number;
  customerId: number;
};

export type RepeatOrderArgsTypes = {
  restaurantId: number;
  locationId: number;
  orderId: number;
  orderDetailId: number;
  isFullOrder: boolean;
  //customerId: number;
  cartsessionid: string;
};

export type PlaceOrderArgsTypes = {
  order: string;
  restaurantId: number;
};

export type GetOrderTimeArgsTypes = {
  restaurantId: number;
  locationId: number;
  ordertype: string;
};

export type AddOrderArgsTypes = {
  placeOrder: any;
  restaurantId: number;
};

export type GetOrderTimingArgsTypes = {
  restaurantId: number;
  locationId: number;
  ordertype: string;
  obj: OrderAddress;
  requestId: string;
};

export type GetOrderDeliveryServiceDetailsArgsTypes = {
  restaurantId: number;
  locationId: number;
  orderId: number;
};

export type GetPaymentDetailsArgsTypes = {
  GUID: string;
};

export type GenerateTimeSlotArgsTypes = {
  restaurantId: number;
  locationId: number;
  ordertype: number;
  scheduleDateTime: string;
};

export type CheckTimeBySlotArgsTypes = {
  restaurantId: number;
  locationId: number;
  recievingTime: string;
  recieving: string;
  flg: number;
  obj: OrderAddress;
  requestId: string;
  timeSlot: string;
  date: string;
};






// --------new defined types -------------------
// getOrderDetailsInfo service types after order placed
export interface Root {
  result: Result
  message: string
  status: number
}

export interface Result {
  orderDetailInfo: OrderDetailInfo
}

export interface OrderDetailInfo {
  OrderDetails: OrderDetail[]
  subOptions: any
  OrderDetailCal: OrderDetailCal
  optionList: any
  locationId: number
  locationname: string
}

export interface OrderDetail {
  customerId: number
  orderId: number
  itemName: string
  imgname: any
  quantity: number
  amount: number
  netprice: number
  subOptionList: string
  subOptionListText: string
  creationdate: any
  orderno: number
  orderdetailTotal: number
  orderdetailId: number
}

export interface OrderDetailCal {
  redeemPoints: number
  redeemAmount: number
  subTotal: number
  discount: number
  discountPer: number
  deliveryCharges: number
  TotalPreTax: number
  hstTaxPer: number
  hstTaxTotal: number
  tip: number
  total: number
  date: string
  orderNo: number
  currencysymbol: string
  preTaxAmount: number
  calculatedTotal: number
  orderId: number
  grandTotal: number
  cartTaxList: any
  cardShowMessage: string
  promotioncal: number
  promotionruletype: number
  promotionpercentage: number
  promotiontitle: string
  paymentMessage: any
  orderStatus: string
  note: string
  stripeId: any
  ordertype: number
  orderTypeText: string
  trackingurl: any
  deliverystatus: any
  deliverypartnername: any
  systemAccessFee: number
  deliverynote: string
  isFutureOrder: boolean
  timeSlot: string
  futureDate: string
  customertype: number
}
