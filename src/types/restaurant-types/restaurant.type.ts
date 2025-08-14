///getAllRestaurantInfo types

import { ThemeType } from "../common-types/common.types";
import { RestaurantWindowTime } from "../utility-types/utility.types";

export interface GetAllRestaurantInfo {
  restaurantname: string;
  restaurantId: number;
  facebooklink: string;
  website: string;
  twiterlink: string;
  linkedin: string;
  skype: string;
  instagram: string;
  androidlink: string;
  ioslink: string;
  isTakeOut: boolean;
  iswaiting: boolean;
  isdelivery: boolean;
  istakeaway: boolean;
  logo: string;
  restaurantappicon: string;
  restaurantURL: string;
  profilename: string;
  locationIds: number[];
  defaultlocationId: number;
  defaultLocation: DefaultLocation;
  restaurantWindowTime: RestaurantWindowTime;
  enableotpauthentication: boolean;
  smsapigateway: number;
  googleplacekey: string;
  color: string;
  locationId: number;
  locationName: string;
  IsBlobStorage: boolean;
  themetype: number;
  bannercount: number;
  firebaseConfig: FirebaseConfig;
  isSchoolProgramEnabled: boolean;
  issupplychainenable: boolean;
  deliveryServicePartnerEnable: boolean;
  displayLocationPopUpChange: boolean;
  restaurantColorModel: RestaurantColorModel[];
  IsAddressMandatoryForRegister: boolean;
}

export interface DefaultLocation {
  locationId: number;
  restaurantId: number;
  locationName: string;
  address1: string;
  cityname: string;
  statename: string;
  phone: string;
  zipcode: string;
  email: string;
  description: string;
  latitude: string;
  longitude: string;
  delivery: boolean;
  isdine: boolean;
  bookingtimelimit: number;
  ordersubmittime: number;
  takeawayextratime: number;
  islocationactive: boolean;
  mindeliverycharge: number;
  maxdeliverymiles: number;
  isOrderingDisable: boolean;
  orderingMessage: string;
  isdelivery: boolean;
  istakeaway: boolean;
  locationURL: string;
  minimumdeliveryorder: number;
  minimumtakeoutorder: number;
  email2: string;
  IsPayByCard: boolean;
  IsPayByCash: boolean;
  IsTableReservation: boolean;
  SystemAccessFee: number;
  countryName: string;
  currencysymbol: string;
  countrycode: string;
  regioncode: string;
  isGeoFencing: boolean;
  isDeliveryOrderingDisable: boolean;
  isTakeoutOrderingDisable: boolean;
  opentableurl: string;
  opentableactive: boolean;
  isDeliveryAsap: boolean;
  isDeliveryPickupTime: boolean;
  isTakeOutAsap: boolean;
  isTakeOutPickupTime: boolean;
  enableTip: boolean;
  enableRewardPoint: boolean;
  googlePayEnable: boolean;
  applePayEnable: boolean;
  stripePublishKey: string;
  isDisplaySummaryAto: boolean;
  isStripePaymentLive: boolean;
  defaultmenucategoryimage: string;
  defaultmenuitemimage: string;
  defaultsuboptionimage: string;
  enableTimeSlot: boolean;
  timeSlotDuration: number;
  deliveryService: number;
  isUseFudmeDriver: boolean;
  tipYourDriver: string;
  minTipPercentage: number;
  minTipTextMessage: string;
  facebookUrl: string;
  instagramUrl: string;
  displaylistview: boolean;
  enablefutureordering: boolean;
  noofdaysfutureordering: number;
  enabletimeslot: boolean;
  timeduration: number;
  defaultordertype: boolean;
  b2btype: boolean;
  futureOrderingDayDates: any[];
}

export interface FirebaseConfig {
  apikey: string;
  authdomain: string;
  databaseurl: string;
  projectId: string;
  storagebucket: string;
  messagingsenderId: string;
  appId: string;
  measurementId: string;
  accountSid: string;
  authToken: string;
  restaurantId: number;
}

export interface RestaurantColorModel {
  StyleName: string;
  FieldType: string;
  FieldName: string;
  Color: string;
}

///types for getSelectedRestaurantTime methods

export interface GetSelectedRestaurantTime {
  deliveryTime: string[];
  pickupTime: string[];
  OrdDeliveryOpeningTime: any[];
  OrdDeliveryOpeningTimeV1: OrdDeliveryOpeningTimeV1[];
  OrdDeliveryClosingTime: any[];
  OrdDeliveryClosingTimeV1: OrdDeliveryClosingTimeV1[];
  TakeoutDeliveryOpeningTime: any[];
  TakeoutDeliveryOpeningTimeV1: TakeoutDeliveryOpeningTimeV1[];
  TakeoutDeliveryClosingTime: any[];
  TakeoutDeliveryClosingTimeV1: TakeoutDeliveryClosingTimeV1[];
  deliveryOpeningWindowTime: any;
  deliveryClosingWindowTime: any;
  isDeliveryClosed: boolean;
  isPickupClosed: boolean;
}

export interface OrdDeliveryOpeningTimeV1 {
  DeliveryTakeoutTiming: string;
  RestaurantIsClosed: boolean;
  isLastOrder: boolean;
}

export interface OrdDeliveryClosingTimeV1 {
  DeliveryTakeoutTiming: string;
  RestaurantIsClosed: boolean;
  isLastOrder: boolean;
}

export interface TakeoutDeliveryOpeningTimeV1 {
  DeliveryTakeoutTiming: string;
  RestaurantIsClosed: boolean;
  isLastOrder: boolean;
}

export interface TakeoutDeliveryClosingTimeV1 {
  DeliveryTakeoutTiming: string;
  RestaurantIsClosed: boolean;
  isLastOrder: boolean;
}

////getRestaurantThemeType type
export interface Seodetails {
  description: string;
  imageurl: string;
  locationname: string;
  restaurantname: string;
  title: string;
}

export interface GetRestaurantThemeType {
  seodetails: Seodetails;
  themetype: number | string;
}

export interface GetCurrentTimeType {
  datetime: string;
}

export interface GetTimingType {
  time: string;
  standarddatetime: string;
  requestId: string;
}

export interface AddressListItem {
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
  deliveryslots: string; //any[]
  displaylistview: boolean;
  distance: number;
  email: string;
  enableTimeSlot: boolean;
  enablefutureordering: boolean;
  facebookUrl: string;
  fax: string;
  futureOrderingDayDates: string[]; //any[]; // define structure
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
  locationTimesList: {
    open: string;
    close: string;
    day: string;
    type: string;
  }[]; // any[]; // define if needed
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
  pickupTime: string; //any[];
  pickup_hour: string; //any[];
  rewardpointAllow: number;
  stateName: string;
  stripePublishKey: string;
  takeawayextratime: number;
  takeoutSpecialHoursList: { date: string; open: string; close: string }[]; // any; // define if needed
  takeoutslots: string[];
  timeSlotDuration: number;
  timeduration: number;
  timezone: string;
  timezoneoffset: string;
  tipYourDriver: string;
  todayDayName: string;
  zipcode: string;
}
