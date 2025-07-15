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

// export interface AddressList {
//   restaurantName: string;
//   locationId: number;
//   locationName: string;
//   address1: string;
//   countryName: string;
//   stateName: string;
//   cityName: string;
//   phone: string;
//   mobile: string;
//   fax: string;
//   zipcode: string;
//   email: string;
//   maxLikeInMonth: number;
//   bookingTimeLimit: number;
//   ordersubmittime: number;
//   minorder: number;
//   minimumdeliveryorder: number;
//   minimumtakeoutorder: number;
//   takeawayextratime: number;
//   isLocationActive: number;
//   locationTime?: string;
//   minDeliveryCharge: string;
//   isTableReservation: boolean;
//   locationTimeList: any;
//   locationTimesList: LocationTimesList[];
//   isOrderingDisable: boolean;
//   orderingMessage: string;
//   offerList?: OfferList[];
//   cultureName: string;
//   currencySymbol: string;
//   currencyCode: string;
//   countryCode: string;
//   ISDCode: string;
//   isDelivery: boolean;
//   isTakeaway: boolean;
//   locationURL: string;
//   isPayByCard: boolean;
//   IsPayByCash: boolean;
//   isNextOrderingEnable: boolean;
//   OpeningTime: string[];
//   NextOpeningTime: any;
//   ClosingTime: string[];
//   NextClosingTime: any;
//   orderDisableTypeMessage: any;
//   SystemAccessFee: number;
//   deliveryTime: DeliveryTime[];
//   pickupTime: PickupTime[];
//   OrdDeliveryOpeningTime: string[];
//   OrdDeliveryOpeningTimeV1: OrdDeliveryOpeningTimeV1[];
//   NextOrdDeliveryOpeningTime: any;
//   OrdDeliveryClosingTime: string[];
//   OrdDeliveryClosingTimeV1: OrdDeliveryClosingTimeV1[];
//   NextOrdDeliveryClosingTime: any;
//   TakeoutDeliveryOpeningTime: string[];
//   TakeoutDeliveryOpeningTimeV1: TakeoutDeliveryOpeningTimeV1[];
//   NextTakeoutDeliveryOpeningTime: any;
//   TakeoutDeliveryClosingTime: string[];
//   TakeoutDeliveryClosingTimeV1: TakeoutDeliveryClosingTimeV1[];
//   TakeourDeliveryClosingTime: any;
//   NextTakeoutDeliveryClosingTime: any;
//   Lastordertime: boolean[];
//   NextLastordertime: any;
//   DeilveryAvailable: boolean[];
//   NextDeilveryAvailable: any;
//   TakeoutAvailable: boolean[];
//   NextTakeoutAvailable: any;
//   pickup_hour: PickupHour[];
//   delivery_hour: DeliveryHour[];
//   latitude: number;
//   longitude: number;
//   distance: number;
//   maxdeliverymiles: number;
//   isDeliveryOrderingDisable: boolean;
//   isTakeoutOrderingDisable: boolean;
//   takeoutSpecialHoursList: any;
//   deliverySpecialHoursList: any;
//   openTableActive: boolean;
//   openTableUrl: string;
//   isDeliveryAsap: boolean;
//   isDeliveryPickupTime: boolean;
//   isTakeOutAsap: boolean;
//   isTakeOutPickupTime: boolean;
//   rewardpointAllow: number;
//   isEnableTip: boolean;
//   todayDayName: string;
//   isDisplaySummaryAto: boolean;
//   googlePayEnable: boolean;
//   applePayEnable: boolean;
//   stripePublishKey?: string;
//   hstgstnumber: any;
//   TempoApp: boolean;
//   defaultmenucategoryimage?: string;
//   defaultmenuitemimage?: string;
//   defaultsuboptionimage?: string;
//   cashdrawerbuttononpos: boolean;
//   isSupplyChainEnable: boolean;
//   pickupDays: number;
//   deliveryDays: number;
//   enableTimeSlot: boolean;
//   timeSlotDuration: number;
//   deliveryService: any;
//   deliverPartnerName: any;
//   deliverPartnerStatus: boolean;
//   displaylistview: boolean;
//   isUseFoodCoreDriver: boolean;
//   tipYourDriver: string;
//   minTipPercentage: number;
//   minTipTextMessage?: string;
//   facebookUrl: string;
//   instagramUrl: string;
//   enablefutureordering: boolean;
//   noofdaysfutureordering: number;
//   timeduration: number;
//   defaultordertype: boolean;
//   b2btype: boolean;
//   futureOrderingDayDates: FutureOrderingDayDate[];
//   deliveryslots: any;
//   takeoutslots: any;
//   timezone: string;
//   timezoneoffset: string;
// }
export interface AddressList {
  restaurantName: string | null;
  locationId: number;
  locationName: string;
  address1: string;
  countryName: string;
  ClosingTime: string[];
  DeilveryAvailable: boolean[];
  ISDCode: string;
  IsPayByCash: boolean;
  Lastordertime: boolean[];
  NextClosingTime: string | null;
  NextDeilveryAvailable: string | null;
  NextLastordertime: string | null;
  NextOpeningTime: string | null;
  NextOrdDeliveryClosingTime: string | null;
  NextOrdDeliveryOpeningTime: string | null;
  NextTakeoutAvailable: string | null;
  NextTakeoutDeliveryClosingTime: string | null;
  NextTakeoutDeliveryOpeningTime: string | null;
  OpeningTime: string[];
  OrdDeliveryClosingTime: string[];
  OrdDeliveryClosingTimeV1: string[]; // define if possible //any[]
  OrdDeliveryOpeningTime: string[];
  OrdDeliveryOpeningTimeV1: string[]; // define if possible
  SystemAccessFee: number;
  TakeourDeliveryClosingTime: string | null;
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
  deliverPartnerName: string | null;
  deliverPartnerStatus: boolean;
  deliveryDays: number;
  deliveryService: string | null;
  deliverySpecialHoursList: { date: string; open: string; close: string }[];
  deliveryTime: string[]; // define type //any[]
  delivery_hour: string[]; // define type //any[]
  deliveryslots: string;  //any[]
  displaylistview: boolean;
  distance: number;
  email: string;
  enableTimeSlot: boolean;
  enablefutureordering: boolean;
  facebookUrl: string;
  fax: string;
  futureOrderingDayDates: string[];//any[]; // define structure
  googlePayEnable: boolean;
  hstgstnumber: string | null;
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
  locationTimeList: Record<string, string>; // any
  locationTimesList: { open: string; close: string; day: string; type: string }[];// any[]; // define if needed
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
  orderDisableTypeMessage: string | null;
  orderingMessage: string;
  ordersubmittime: number;
  phone: string;
  pickupDays: number;
  pickupTime: string  //any[];
  pickup_hour: string  //any[];
  rewardpointAllow: number;
  stateName: string;
  stripePublishKey: string;
  takeawayextratime: number;
  takeoutSpecialHoursList: { date: string; open: string; close: string }[];// any; // define if needed
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
