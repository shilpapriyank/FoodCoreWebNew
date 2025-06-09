// export type DefaultLocation = {
//   locationURL: string;
// };

// export type RestaurantDetail = {
//   themetype?: string;
//   defaultLocation?: DefaultLocation;
//    restaurantId?: number;
//   IsAddressMandatoryForRegister?: boolean;
// };

export interface Root {
  d: string;
}

export interface RestaurantApiTypes {
   themetype?: string;
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
  defaultLocation: DefaultLocationApiTypes;
  restaurantWindowTime?: any; // null in the JSON, can be of any type or undefined if not present.
  enableotpauthentication?: boolean; // optional field as per JSON structure.
  smsapigateway?: number; // optional field as per JSON structure.
  googleplacekey?: string; // optional field as per JSON structure.
  color?: string; // optional field as per JSON structure.
}

export interface DefaultLocationApiTypes {
  locationId: number;
  restaurantId: number;
  locationName?: string | null;
  address1?: string;
  cityname?: string;
  statename?: string;
  phone?: string;
  zipcode?: string;
  email?: string;
  description?: string;
  latitude?: string;
  longitude?: string;
  delivery?: boolean;
  isdine?: boolean;
  bookingtimelimit?: number;
  ordersubmittime?: number;
  takeawayextratime?: number;
  islocationactive?: boolean;
  mindeliverycharge?: number;
  maxdeliverymiles?: number;
  isOrderingDisable?: boolean;
  orderingMessage?: string;
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

export interface RestaurantColorModelApiTypes {
  StyleName: string;
  FieldType: string;
  FieldName: string;
  Color: string;
}
