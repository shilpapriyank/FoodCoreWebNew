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
  ordertype: string;
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
