///getAllRestaurantInfo types

import { ThemeType } from "../common-types/common.types";

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
  restaurantWindowTime: any;
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
