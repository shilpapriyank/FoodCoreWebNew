// export type DefaultLocation = {
//   locationURL: string;
// };

export type RestaurantDetailPayload = {
  restaurantURL?: string;
  locationURL?: string;
  defaultLocationId?: number;
};

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

export interface RestaurantColorModelApiTypes {
  StyleName: string;
  FieldType: string;
  FieldName: string;
  Color: string;
}

export type FutureOrderDay = {
  fullDay: string;
  // ... other fields
};

export type FutureOrder = {
  futureOrderDay: FutureOrderDay | string;
};

export interface RestaurantsLocationListTypes {
  //addressList: AddressListTypes[];
  issupplychainenable: boolean;
  //parameterByColorList: ParameterByColorListType[];
  //parameterByTextSizeList: ParameterByTextSizeListType[];
  restaurantId: number;
}

export interface RestaurantsLocationListWithTime {
  //addressList:  AddressListTypes[];
  issupplychainenable: boolean;
  //parameterByColorList: ParameterByColorListType[];
  //parameterByTextSizeList: ParameterByTextSizeListType[];
  restaurantId: number;
}

export interface TakeoutTime {
  closingtime: string; // e.g. "08:00"
  closingtimemeridian: "AM" | "PM";
  includeextratime: boolean;
  isactive: boolean;
  isnextday: boolean;
  locationId: number;
  nameday: number; // 0 = Monday, 1 = Tuesday, etc.
  openingtime: string; // e.g. "02:00"
  openingtimemeridian: "AM" | "PM";
  restaurantId: number;
  takeaway: boolean;
  takeawayextratime: number;
  takedeliveryclosingtime: string; // e.g. "08:00 PM"
  takedeliveryopeningtime: string; // e.g. "02:00 AM"
  weekname: string;
}

export interface DeliveryTime {
  closingtime: string; // "11:00"
  closingtimemeridian: "AM" | "PM";
  delivery: boolean;
  includeextratime: boolean;
  isactive: boolean;
  isnextday: boolean;
  locationId: number;
  nameday: number; // 0 for Monday, etc.
  openingtime: string; // "02:00"
  openingtimemeridian: "AM" | "PM";
  orddeliveryclosingtime: string; // "11:00 PM"
  orddeliveryopeningtime: string; // "02:00 AM"
  ordersubmittime: number; // in minutes?
  restaurantId: number;
  weekname: string;
}
