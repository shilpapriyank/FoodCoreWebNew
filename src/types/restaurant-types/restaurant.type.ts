export interface FirebaseConfig {
  accountSid: string | null;
  apikey: string;
  appId: string;
  authToken: string | null;
  authdomain: string;
  databaseurl: string;
  measurementId: string;
  messagingsenderId: string;
  projectId: string;
  restaurantId: number;
  storagebucket: string;
}

export interface RestaurantColor {
  Color: string;
  FieldName: string;
  FieldType: string;
  StyleName: string;
}

export interface DefaultLocationType {
  IsPayByCard: boolean;
  IsPayByCash: boolean;
  IsTableReservation: boolean;
  SystemAccessFee: number;
  address1: string;
  applePayEnable: boolean;
  b2btype: boolean;
  bookingtimelimit: number;
  cityname: string;
  countryName: string;
  countrycode: string;
  currencysymbol: string;
  defaultmenucategoryimage: string;
  defaultmenuitemimage: string;
  defaultordertype: boolean;
  defaultsuboptionimage: string;
  delivery: boolean;
  deliveryService: number;
  description: string;
  displaylistview: boolean;
  email: string;
  email2: string;
  enableRewardPoint: boolean;
  enableTimeSlot: boolean;
  enableTip: boolean;
  enablefutureordering: boolean;
  enabletimeslot: boolean;
  facebookUrl: string;
  futureOrderingDayDates: any[]; // Update to specific type if available
  googlePayEnable: boolean;
  instagramUrl: string;
  isDeliveryAsap: boolean;
  isDeliveryOrderingDisable: boolean;
  isDeliveryPickupTime: boolean;
  isDisplaySummaryAto: boolean;
  isGeoFencing: boolean;
  isOrderingDisable: boolean;
  isStripePaymentLive: boolean;
  isTakeOutAsap: boolean;
  isTakeOutPickupTime: boolean;
  isTakeoutOrderingDisable: boolean;
  isUseFudmeDriver: boolean;
  isdelivery: boolean;
  isdine: boolean;
  islocationactive: boolean;
  istakeaway: boolean;
  latitude: string;
  locationId: number;
  locationName: string;
  locationURL: string;
  longitude: string;
  maxdeliverymiles: number;
  minTipPercentage: number;
  minTipTextMessage: string;
  mindeliverycharge: number;
  minimumdeliveryorder: number;
  minimumtakeoutorder: number;
  noofdaysfutureordering: number;
  opentableactive: boolean;
  opentableurl: string;
  orderingMessage: string;
  ordersubmittime: number;
  phone: string;
  regioncode: string;
  restaurantId: number;
  statename: string;
  stripePublishKey: string;
  takeawayextratime: number;
  timeSlotDuration: number;
  timeduration: number;
  tipYourDriver: string;
  zipcode: string;
  schoolprogramenabled: boolean;
}

export interface RestaurantDetails {
  IsAddressMandatoryForRegister: boolean;
  IsBlobStorage: boolean;
  androidlink: string;
  bannercount: number;
  color: string;
  defaultLocation: DefaultLocationType;
  defaultlocationId: number;
  deliveryServicePartnerEnable: boolean;
  displayLocationPopUpChange: boolean;
  enableotpauthentication: boolean;
  facebooklink: string;
  firebaseConfig: FirebaseConfig;
  googleplacekey: string;
  instagram: string;
  ioslink: string;
  isSchoolProgramEnabled: boolean;
  isTakeOut: boolean;
  isdelivery: boolean;
  issupplychainenable: boolean;
  istakeaway: boolean;
  iswaiting: boolean;
  linkedin: string;
  locationId: number;
  locationIds: number[];
  locationName: string | null;
  logo: string;
  profilename: string;
  restaurantColorModel: RestaurantColor[];
  restaurantId: number;
  restaurantURL: string;
  restaurantWindowTime: string | null;
  restaurantappicon: string;
  restaurantname: string;
  skype: string;
  smsapigateway: number;
  themetype: number;
  twiterlink: string;
  website: string;
}

export interface LocationTime {
  Day: string;
  time: {
    time: string;
  }[];
}

export interface AddressListItem {
  ClosingTime: string[];
  DeilveryAvailable: string[];
  ISDCode: string;
  IsPayByCash: boolean;
  Lastordertime: string[];
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
  OrdDeliveryClosingTimeV1: string[];
  OrdDeliveryOpeningTime: string[];
  OrdDeliveryOpeningTimeV1: string[];
  SystemAccessFee: number;
  TakeourDeliveryClosingTime: string | null;
  TakeoutAvailable: string[];
  TakeoutDeliveryClosingTime: string[];
  TakeoutDeliveryClosingTimeV1: string[];
  TakeoutDeliveryOpeningTime: string[];
  TakeoutDeliveryOpeningTimeV1: string[];
  TempoApp: boolean;
  address1: string;
  applePayEnable: boolean;
  b2btype: boolean;
  bookingTimeLimit: number;
  cashdrawerbuttononpos: boolean;
  cityName: string;
  countryCode: string;
  countryName: string;
  cultureName: string;
  currencyCode: string;
  currencySymbol: string;
  defaultmenucategoryimage: string | null;
  defaultmenuitemimage: string | null;
  defaultordertype: boolean;
  defaultsuboptionimage: string | null;
  deliverPartnerName: string | null;
  deliverPartnerStatus: boolean;
  deliveryDays: number;
  deliveryService: number | null;
  deliverySpecialHoursList: any; // Update if structure is known
  deliveryTime: any[]; // Update if structure is known
  delivery_hour: any[]; // Update if structure is known
  deliveryslots: any; // Update if structure is known
  displaylistview: boolean;
  distance: number;
  email: string;
  enableTimeSlot: boolean;
  enablefutureordering: boolean;
  facebookUrl: string;
  fax: string;
  futureOrderingDayDates: any[];
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
  locationId: number;
  locationName: string;
  locationTime: string;
  locationTimeList: any; // Unknown structure
  locationTimesList: LocationTime[];
  locationURL: string;
  longitude: number;
  maxLikeInMonth: number;
  maxdeliverymiles: number;
  minDeliveryCharge: string;
  minTipPercentage: number;
  minTipTextMessage: string | null;
  minimumdeliveryorder: number;
  minimumtakeoutorder: number;
  minorder: number;
  mobile: string;
  noofdaysfutureordering: number;
  offerList: any; // Unknown structure
  openTableActive: boolean;
  openTableUrl: string;
  orderDisableTypeMessage: string | null;
  orderingMessage: string;
  ordersubmittime: number;
  phone: string;
  pickupDays: number;
  pickupTime: any[];
  pickup_hour: any[];
  restaurantName: string | null;
  rewardpointAllow: number;
  stateName: string;
  stripePublishKey: string;
  takeawayextratime: number;
  takeoutSpecialHoursList: any;
  takeoutslots: any;
  timeSlotDuration: number;
  timeduration: number;
  timezone: string;
  timezoneoffset: string;
  tipYourDriver: string;
  todayDayName: string;
  zipcode: string;
}

export interface ColorParameter {
  StyleName: string;
  FieldType: string;
  FieldName: string;
  Color: string;
}

// For parameterByTextSizeList
export interface TextSizeParameter {
  StyleName: string;
  FieldName: string;
  FontSize: string;
  FontFamily: string;
}

// Common timing structure for delivery and takeout
export interface TimingEntry {
  restaurantId: number;
  locationId: number;
  nameday: number;
  weekname: string;
  isactive: boolean;
  isnextday: boolean;
  openingtime: string;
  openingtimemeridian: string;
  closingtime: string;
  closingtimemeridian: string;
  ordersubmittime?: number; // only in deliveryTime
  orddeliveryopeningtime?: string;
  orddeliveryclosingtime?: string;
  delivery?: boolean; // deliveryTime only
  takeaway?: boolean; // takeoutTime only
  takeawayextratime?: number;
  takedeliveryopeningtime?: string;
  takedeliveryclosingtime?: string;
  includeextratime: boolean;
}

// restaurantstiminglist object
export interface RestaurantsTimingList {
  deliveryTime: TimingEntry[];
  takeoutTime: TimingEntry[];
}

export interface RestaurantsLocationListWithTime {
  addressList: AddressListItem[];
  issupplychainenable: boolean;
  parameterByColorList: ColorParameter[];
  parameterByTextSizeList: TextSizeParameter[];
  restaurantId: number;
}

// // export type DefaultLocation = {
// //   locationURL: string;
// // };

// export type RestaurantDetailPayload = {
//   restaurantURL?: string;
//   locationURL?: string;
//   defaultLocationId?: number;
// };

// export interface Root {
//   d: string;
// }

// export interface RestaurantApiTypes {
//   themetype?: string;
//   restaurantname: string;
//   restaurantId: number;
//   facebooklink: string;
//   website: string;
//   twiterlink: string;
//   linkedin: string;
//   skype: string;
//   instagram: string;
//   androidlink: string;
//   ioslink: string;
//   isTakeOut: boolean;
//   iswaiting: boolean;
//   isdelivery: boolean;
//   istakeaway: boolean;
//   logo: string;
//   restaurantappicon: string;
//   restaurantURL: string;
//   profilename: string;
//   locationIds: number[];
//   defaultlocationId: number;
//   defaultLocation: DefaultLocationApiTypes;
//   restaurantWindowTime?: any; // null in the JSON, can be of any type or undefined if not present.
//   enableotpauthentication?: boolean; // optional field as per JSON structure.
//   smsapigateway?: number; // optional field as per JSON structure.
//   googleplacekey?: string; // optional field as per JSON structure.
//   color?: string; // optional field as per JSON structure.
// }

// export interface DefaultLocationApiTypes {
//   locationId: number;
//   restaurantId: number;
//   locationName: string;
//   address1: string;
//   cityname: string;
//   statename: string;
//   phone: string;
//   zipcode: string;
//   email: string;
//   description: string;
//   latitude: string;
//   longitude: string;
//   delivery: boolean;
//   isdine: boolean;
//   bookingtimelimit: number;
//   ordersubmittime: number;
//   takeawayextratime: number;
//   islocationactive: boolean;
//   mindeliverycharge: number;
//   maxdeliverymiles: number;
//   isOrderingDisable: boolean;
//   orderingMessage: string;
//   isdelivery: boolean;
//   istakeaway: boolean;
//   locationURL: string;
//   minimumdeliveryorder: number;
//   minimumtakeoutorder: number;
//   email2: string;
//   IsPayByCard: boolean;
//   IsPayByCash: boolean;
//   IsTableReservation: boolean;
//   SystemAccessFee: number;
//   countryName: string;
//   currencysymbol: string;
//   countrycode: string;
//   regioncode: string;
//   isGeoFencing: boolean;
//   isDeliveryOrderingDisable: boolean;
//   isTakeoutOrderingDisable: boolean;
//   opentableurl: string;
//   opentableactive: boolean;
//   isDeliveryAsap: boolean;
//   isDeliveryPickupTime: boolean;
//   isTakeOutAsap: boolean;
//   isTakeOutPickupTime: boolean;
//   enableTip: boolean;
//   enableRewardPoint: boolean;
//   googlePayEnable: boolean;
//   applePayEnable: boolean;
//   stripePublishKey: string;
//   isDisplaySummaryAto: boolean;
//   isStripePaymentLive: boolean;
//   defaultmenucategoryimage: string;
//   defaultmenuitemimage: string;
//   defaultsuboptionimage: string;
//   enableTimeSlot: boolean;
//   timeSlotDuration: number;
//   deliveryService: number;
//   isUseFudmeDriver: boolean;
//   tipYourDriver: string;
//   minTipPercentage: number;
//   minTipTextMessage: string;
//   facebookUrl: string;
//   instagramUrl: string;
//   displaylistview: boolean;
//   enablefutureordering: boolean;
//   noofdaysfutureordering: number;
//   enabletimeslot: boolean;
//   timeduration: number;
//   defaultordertype: boolean;
//   b2btype: boolean;
//   futureOrderingDayDates: any[];
// }

// export interface RestaurantColorModelApiTypes {
//   StyleName: string;
//   FieldType: string;
//   FieldName: string;
//   Color: string;
// }

// export type FutureOrderDay = {
//   fullDay: string;
//   // ... other fields
// };

// export type FutureOrder = {
//   futureOrderDay: FutureOrderDay | string;
// };

// export interface RestaurantsLocationListTypes {
//   //addressList: AddressListTypes[];
//   issupplychainenable: boolean;
//   //parameterByColorList: ParameterByColorListType[];
//   //parameterByTextSizeList: ParameterByTextSizeListType[];
//   restaurantId: number;
// }

// export interface RestaurantsLocationListWithTime {
//   //addressList:  AddressListTypes[];
//   issupplychainenable: boolean;
//   //parameterByColorList: ParameterByColorListType[];
//   //parameterByTextSizeList: ParameterByTextSizeListType[];
//   restaurantId: number;
// }

// export interface TakeoutTime {
//   closingtime: string; // e.g. "08:00"
//   closingtimemeridian: "AM" | "PM";
//   includeextratime: boolean;
//   isactive: boolean;
//   isnextday: boolean;
//   locationId: number;
//   nameday: number; // 0 = Monday, 1 = Tuesday, etc.
//   openingtime: string; // e.g. "02:00"
//   openingtimemeridian: "AM" | "PM";
//   restaurantId: number;
//   takeaway: boolean;
//   takeawayextratime: number;
//   takedeliveryclosingtime: string; // e.g. "08:00 PM"
//   takedeliveryopeningtime: string; // e.g. "02:00 AM"
//   weekname: string;
// }

// export interface DeliveryTime {
//   closingtime: string; // "11:00"
//   closingtimemeridian: "AM" | "PM";
//   delivery: boolean;
//   includeextratime: boolean;
//   isactive: boolean;
//   isnextday: boolean;
//   locationId: number;
//   nameday: number; // 0 for Monday, etc.
//   openingtime: string; // "02:00"
//   openingtimemeridian: "AM" | "PM";
//   orddeliveryclosingtime: string; // "11:00 PM"
//   orddeliveryopeningtime: string; // "02:00 AM"
//   ordersubmittime: number; // in minutes?
//   restaurantId: number;
//   weekname: string;
// }
