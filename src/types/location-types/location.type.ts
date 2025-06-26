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
  stateName: string;
  cityName: string;
  phone: string;
  mobile: string;
  fax: string;
  zipcode: string;
  email: string;
  maxLikeInMonth: number;
  bookingTimeLimit: number;
  ordersubmittime: number;
  minorder: number;
  minimumdeliveryorder: number;
  minimumtakeoutorder: number;
  takeawayextratime: number;
  isLocationActive: number;
  locationTime?: string;
  minDeliveryCharge: string;
  isTableReservation: boolean;
  locationTimeList: any;
  locationTimesList: LocationTimesList[];
  isOrderingDisable: boolean;
  orderingMessage: string;
  offerList?: OfferList[];
  cultureName: string;
  currencySymbol: string;
  currencyCode: string;
  countryCode: string;
  ISDCode: string;
  isDelivery: boolean;
  isTakeaway: boolean;
  locationURL: string;
  isPayByCard: boolean;
  IsPayByCash: boolean;
  isNextOrderingEnable: boolean;
  OpeningTime: string[];
  NextOpeningTime: any;
  ClosingTime: string[];
  NextClosingTime: any;
  orderDisableTypeMessage: any;
  SystemAccessFee: number;
  deliveryTime: DeliveryTime[];
  pickupTime: PickupTime[];
  OrdDeliveryOpeningTime: string[];
  OrdDeliveryOpeningTimeV1: OrdDeliveryOpeningTimeV1[];
  NextOrdDeliveryOpeningTime: any;
  OrdDeliveryClosingTime: string[];
  OrdDeliveryClosingTimeV1: OrdDeliveryClosingTimeV1[];
  NextOrdDeliveryClosingTime: any;
  TakeoutDeliveryOpeningTime: string[];
  TakeoutDeliveryOpeningTimeV1: TakeoutDeliveryOpeningTimeV1[];
  NextTakeoutDeliveryOpeningTime: any;
  TakeoutDeliveryClosingTime: string[];
  TakeoutDeliveryClosingTimeV1: TakeoutDeliveryClosingTimeV1[];
  TakeourDeliveryClosingTime: any;
  NextTakeoutDeliveryClosingTime: any;
  Lastordertime: boolean[];
  NextLastordertime: any;
  DeilveryAvailable: boolean[];
  NextDeilveryAvailable: any;
  TakeoutAvailable: boolean[];
  NextTakeoutAvailable: any;
  pickup_hour: PickupHour[];
  delivery_hour: DeliveryHour[];
  latitude: number;
  longitude: number;
  distance: number;
  maxdeliverymiles: number;
  isDeliveryOrderingDisable: boolean;
  isTakeoutOrderingDisable: boolean;
  takeoutSpecialHoursList: any;
  deliverySpecialHoursList: any;
  openTableActive: boolean;
  openTableUrl: string;
  isDeliveryAsap: boolean;
  isDeliveryPickupTime: boolean;
  isTakeOutAsap: boolean;
  isTakeOutPickupTime: boolean;
  rewardpointAllow: number;
  isEnableTip: boolean;
  todayDayName: string;
  isDisplaySummaryAto: boolean;
  googlePayEnable: boolean;
  applePayEnable: boolean;
  stripePublishKey?: string;
  hstgstnumber: any;
  TempoApp: boolean;
  defaultmenucategoryimage?: string;
  defaultmenuitemimage?: string;
  defaultsuboptionimage?: string;
  cashdrawerbuttononpos: boolean;
  isSupplyChainEnable: boolean;
  pickupDays: number;
  deliveryDays: number;
  enableTimeSlot: boolean;
  timeSlotDuration: number;
  deliveryService: any;
  deliverPartnerName: any;
  deliverPartnerStatus: boolean;
  displaylistview: boolean;
  isUseFoodCoreDriver: boolean;
  tipYourDriver: string;
  minTipPercentage: number;
  minTipTextMessage?: string;
  facebookUrl: string;
  instagramUrl: string;
  enablefutureordering: boolean;
  noofdaysfutureordering: number;
  timeduration: number;
  defaultordertype: boolean;
  b2btype: boolean;
  futureOrderingDayDates: FutureOrderingDayDate[];
  deliveryslots: any;
  takeoutslots: any;
  timezone: string;
  timezoneoffset: string;
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

/////old types
// export interface DefaultLocationType {
//   IsPayByCard: boolean;
//   IsPayByCash: boolean;
//   IsTableReservation: boolean;
//   SystemAccessFee: number;
//   address1: string;
//   applePayEnable: boolean;
//   b2btype: boolean;
//   bookingtimelimit: number;
//   cityname: string;
//   countryName: string;
//   countrycode: string;
//   currencysymbol: string;
//   defaultmenucategoryimage: string;
//   defaultmenuitemimage: string;
//   defaultordertype: boolean;
//   defaultsuboptionimage: string;
//   delivery: boolean;
//   deliveryService: number;
//   description: string;
//   displaylistview: boolean;
//   email: string;
//   email2: string;
//   enableRewardPoint: boolean;
//   enableTimeSlot: boolean;
//   enableTip: boolean;
//   enablefutureordering: boolean;
//   enabletimeslot: boolean;
//   facebookUrl: string;
//   futureOrderingDayDates: any[]; // Update to specific type if available
//   googlePayEnable: boolean;
//   instagramUrl: string;
//   isDeliveryAsap: boolean;
//   isDeliveryOrderingDisable: boolean;
//   isDeliveryPickupTime: boolean;
//   isDisplaySummaryAto: boolean;
//   isGeoFencing: boolean;
//   isOrderingDisable: boolean;
//   isStripePaymentLive: boolean;
//   isTakeOutAsap: boolean;
//   isTakeOutPickupTime: boolean;
//   isTakeoutOrderingDisable: boolean;
//   isUseFudmeDriver: boolean;
//   isdelivery: boolean;
//   isdine: boolean;
//   islocationactive: boolean;
//   istakeaway: boolean;
//   latitude: string;
//   locationId: number;
//   locationName: string;
//   locationURL: string;
//   longitude: string;
//   maxdeliverymiles: number;
//   minTipPercentage: number;
//   minTipTextMessage: string;
//   mindeliverycharge: number;
//   minimumdeliveryorder: number;
//   minimumtakeoutorder: number;
//   noofdaysfutureordering: number;
//   opentableactive: boolean;
//   opentableurl: string;
//   orderingMessage: string;
//   ordersubmittime: number;
//   phone: string;
//   regioncode: string;
//   restaurantId: number;
//   statename: string;
//   stripePublishKey: string;
//   takeawayextratime: number;
//   timeSlotDuration: number;
//   timeduration: number;
//   tipYourDriver: string;
//   zipcode: string;
// }

// export interface Root {
//   d: {
//     result: DefaultLocationType;
//     message: string;
//     status: number;
//   };
// }

// export type DefaultLocation = {
//   IsPayByCard: boolean;
//   IsPayByCash: boolean;
//   IsTableReservation: boolean;
//   SystemAccessFee: number;
//   address1: string;
//   applePayEnable: boolean;
//   b2btype: boolean;
//   bookingtimelimit: number;
//   cityname: string;
//   countryName: string;
//   countrycode: string;
//   currencysymbol: string;
//   defaultmenucategoryimage: string;
//   defaultmenuitemimage: string;
//   defaultordertype: boolean;
//   defaultsuboptionimage: string;
//   delivery: boolean;
//   deliveryService: number;
//   description: string;
//   displaylistview: boolean;
//   email: string;
//   email2: string;
//   enableRewardPoint: boolean;
//   enableTimeSlot: boolean;
//   enableTip: boolean;
//   enablefutureordering: boolean;
//   enabletimeslot: boolean;
//   facebookUrl: string;
//   futureOrderingDayDates: any[]; // or a specific date type if you know it
//   googlePayEnable: boolean;
//   instagramUrl: string;
//   isDeliveryAsap: boolean;
//   isDeliveryOrderingDisable: boolean;
//   isDeliveryPickupTime: boolean;
//   isDisplaySummaryAto: boolean;
//   isGeoFencing: boolean;
//   isOrderingDisable: boolean;
//   isStripePaymentLive: boolean;
//   isTakeOutAsap: boolean;
//   isTakeOutPickupTime: boolean;
//   isTakeoutOrderingDisable: boolean;
//   isUseFudmeDriver: boolean;
//   isdelivery: boolean;
//   isdine: boolean;
//   islocationactive: boolean;
//   istakeaway: boolean;
//   latitude: string;
//   locationId: number;
//   locationName: string;
//   locationURL: string;
//   longitude: string;
//   maxdeliverymiles: number;
//   minTipPercentage: number;
//   minTipTextMessage: string;
//   mindeliverycharge: number;
//   minimumdeliveryorder: number;
//   minimumtakeoutorder: number;
//   noofdaysfutureordering: number;
//   opentableactive: boolean;
//   opentableurl: string;
//   orderingMessage: string;
//   ordersubmittime: number;
//   phone: string;
//   regioncode: string;
//   restaurantId: number;
//   statename: string;
//   stripePublishKey: string;
//   takeawayextratime: number;
//   timeSlotDuration: number;
//   timeduration: number;
//   tipYourDriver: string;
//   zipcode: string;
// };

// export type RestaurantDetail = {
//   IsAddressMandatoryForRegister: boolean;
//   IsBlobStorage: boolean;
//   androidlink: string;
//   bannercount: number;
//   color: string;
//   defaultlocationId: number;
//   deliveryServicePartnerEnable: boolean;
//   displayLocationPopUpChange: boolean;
//   enableotpauthentication: boolean;
//   facebooklink: string;
//   firebaseConfig: any; // Replace `any` with a more specific type if known
//   googleplacekey: string;
//   instagram: string;
//   ioslink: string;
//   isSchoolProgramEnabled: boolean;
//   isTakeOut: boolean;
//   isdelivery: boolean;
//   issupplychainenable: boolean;
//   istakeaway: boolean;
//   iswaiting: boolean;
//   linkedin: string;
//   locationId: number;
//   locationIds: number[];
//   locationName: string | null;
//   logo: string;
//   profilename: string;
//   restaurantColorModel: any[]; // Replace `any` if you have the structure
//   restaurantId: number;
//   restaurantURL: string;
//   restaurantWindowTime: any; // Replace with `Date | null` if time-based
//   restaurantappicon: string;
//   restaurantname: string;
//   skype: string;
//   smsapigateway: number;
//   themetype: number;
//   twiterlink: string;
//   website: string;
// };
