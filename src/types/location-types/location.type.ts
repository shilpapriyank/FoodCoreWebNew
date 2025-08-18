////getAllLocationInfoNew service types
export interface GetAllLocationInfoNew {
  parameterByColorList: ParameterByColorList[];
  parameterByTextSizeList: ParameterByTextSizeList[];
  addressList: AddressList[];
  restaurantId: number;
  issupplychainenable: boolean;
}

export interface ParameterByColorList {
  StyleName: string;
  FieldType: string;
  FieldName: string;
  Color: string;
}

export interface ParameterByTextSizeList {
  StyleName: string;
  FieldName: string;
  FontSize: string;
  FontFamily: string;
}

export interface AddressList {
  restaurantName: string;
  locationId: number;
  locationName: string;
  address1: string;
  countryName: string;
  ClosingTime: string[];
  DeilveryAvailable: boolean[];
  ISDCode: string;
  IsPayByCash: boolean;
  Lastordertime: boolean[];
  NextClosingTime: string;
  NextDeilveryAvailable: string;
  NextLastordertime: string;
  NextOpeningTime: string;
  NextOrdDeliveryClosingTime: string;
  NextOrdDeliveryOpeningTime: string;
  NextTakeoutAvailable: string;
  NextTakeoutDeliveryClosingTime: string;
  NextTakeoutDeliveryOpeningTime: string;
  OpeningTime: string[];
  OrdDeliveryClosingTime: string[];
  OrdDeliveryClosingTimeV1: string[];
  OrdDeliveryOpeningTime: string[];
  OrdDeliveryOpeningTimeV1: string[];
  SystemAccessFee: number;
  TakeourDeliveryClosingTime: string;
  TakeoutAvailable: boolean[];
  TakeoutDeliveryClosingTime: string[];
  TakeoutDeliveryClosingTimeV1: string[];
  TakeoutDeliveryOpeningTime: string[];
  TakeoutDeliveryOpeningTimeV1: string[];
  TempoApp: boolean;
  applePayEnable: boolean;
  b2btype: boolean;
  bookingTimeLimit: number;
  cashdrawerbuttononpos: boolean;
  cityName: string;
  countryCode: string;
  cultureName: string;
  currencyCode: string;
  currencySymbol: string;
  defaultmenucategoryimage: string;
  defaultmenuitemimage: string;
  defaultordertype: boolean;
  defaultsuboptionimage: string;
  deliverPartnerName: string;
  deliverPartnerStatus: boolean;
  deliveryDays: number;
  deliveryService: string;
  deliverySpecialHoursList: { date: string; open: string; close: string }[];
  deliveryTime: DeliveryTime[];
  delivery_hour: string[];
  deliveryslots: string;
  displaylistview: boolean;
  distance: number;
  email: string;
  enableTimeSlot: boolean;
  enablefutureordering: boolean;
  facebookUrl: string;
  fax: string;
  futureOrderingDayDates: string[];
  googlePayEnable: boolean;
  hstgstnumber: string;
  instagramUrl: string;
  isDelivery: boolean;
  isDeliveryAsap: boolean;
  isDeliveryOrderingDisable: boolean;
  isDeliveryPickupTime: boolean;
  isDisplaySummaryAto: boolean;
  isEnableTip: boolean;
  isLocationActive: number;
  isNextOrderingEnable: boolean;
  isOrderingDisable: boolean;
  isPayByCard: boolean;
  isSupplyChainEnable: boolean;
  isTableReservation: boolean;
  isTakeOutAsap: boolean;
  isTakeOutPickupTime: boolean;
  isTakeaway: boolean;
  isTakeoutOrderingDisable: boolean;
  isUseFoodCoreDriver: boolean;
  latitude: number;
  locationTime: string;
  locationTimeList: Record<string, string>;
  locationTimesList: {
    open: string;
    close: string;
    day: string;
    type: string;
  }[];
  locationURL: string;
  longitude: number;
  maxLikeInMonth: number;
  maxdeliverymiles: number;
  minDeliveryCharge: string;
  minTipPercentage: number;
  minTipTextMessage: string;
  minimumdeliveryorder: number;
  minimumtakeoutorder: number;
  minorder: number;
  mobile: string;
  noofdaysfutureordering: number;
  offerList: any[];
  openTableActive: boolean;
  openTableUrl: string;
  orderDisableTypeMessage: string;
  orderingMessage: string;
  ordersubmittime: number;
  phone: string;
  pickupDays: number;
  pickupTime: PickupTime[]; 
  pickup_hour: string; 
  rewardpointAllow: number;
  stateName: string;
  stripePublishKey: string;
  takeawayextratime: number;
  takeoutSpecialHoursList: { date: string; open: string; close: string }[]; 
  takeoutslots: string[];
  timeSlotDuration: number;
  timeduration: number;
  timezone: string;
  timezoneoffset: string;
  tipYourDriver: string;
  todayDayName: string;
  zipcode: string;
}

export interface LocationTimesList {
  Day: string;
  time: Time[];
}

export interface Time {
  time: string;
}

export interface OfferList {
  offerId: number;
  offerType: number;
  locationId: number;
  offertitle: string;
  description: string;
  redeempoint: number;
}

export interface DeliveryTime {
  time: string;
  isClosed: boolean;
  isLastOrder: boolean;
}

export interface PickupTime {
  time: string;
  isClosed: boolean;
  isLastOrder: boolean;
}

export interface OrdDeliveryOpeningTimeV1 {
  DeliveryTakeoutTiming: string;
  RestaurantIsClosed: boolean;
  IncludeExtratime: boolean;
}

export interface OrdDeliveryClosingTimeV1 {
  DeliveryTakeoutTiming: string;
  RestaurantIsClosed: boolean;
  IncludeExtratime: boolean;
}

export interface TakeoutDeliveryOpeningTimeV1 {
  DeliveryTakeoutTiming: string;
  RestaurantIsClosed: boolean;
  IncludeExtratime: boolean;
}

export interface TakeoutDeliveryClosingTimeV1 {
  DeliveryTakeoutTiming: string;
  RestaurantIsClosed: boolean;
  IncludeExtratime: boolean;
}

export interface PickupHour {
  Day: string;
  time: Time2[];
}

export interface Time2 {
  time: string;
  isClosed: boolean;
  isLastOrder: boolean;
}

export interface DeliveryHour {
  Day: string;
  time: Time3[];
}

export interface Time3 {
  time: string;
  isClosed: boolean;
  isLastOrder: boolean;
}

export interface FutureOrderingDayDate {
  futureDay: string;
  futureDate: string;
  deliveryStatus: string;
  takeoutStatus: string;
  fullDay: string;
}
