import { ChooseTime } from "@/types/selectdelivery-types/selectdelivery.types";

export interface AddressIdStateType {
  customerAddressId: number;
}

export interface DeliveryAddressInput {
  id: number;
  deliveryaddressId: number;
  customerId: number;
  othercustomerId?: number;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipcode: string;
  landmark: string;
  contactno: string;
  contactname: string;
  latitude: string;
  longitude: string;
  country: string;
  addresstype: number;
  businessname: string;
  cityName: string;
  customerAddressId: number;
}

export interface VerifyAddressInput {
  deliveryaddressId?: number;
  address1: string;
  address2: string;
  landmark: string;
  city: string;
  zipcode: string;
  latitude: number | string;
  longitude: number | string;
  state: string;
  country: string;
  addresstype: number;
  businessname: string;
}

export interface GetAddressResponse {
  AddressLists: DeliveryAddressInput[];
}

// -----new defined types------
// export interface GetDeliveryAddressType {
//   AddressLists: DeliveryAddressListNewType[];
//   ukdatetime: string;
// }

export interface DeliveryAddressListNewType {
  id: number;
  address1: string;
  address2: string;
  cityName: string;
  city: string;
  deliveryaddressId: number;
  landmark: string;
  zipcode: string;
  customerId: number;
  othercustomerId: number;
  contactno: string;
  contactname: string;
  latitude: number;
  longitude: number;
  state: any;
  country: any;
  addresstype: number;
  businessname: string;
}
