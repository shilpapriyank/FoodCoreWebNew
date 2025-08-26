import { ChooseTime } from "@/types/selectdelivery-types/selectdelivery.types";

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

export interface DeliveryAddressState {
  deliveryaddressdata: DeliveryAddressInput[] | null;
  updatedAddress: boolean | { isAddressUpdated: boolean };
  choosetime: Record<string, ChooseTime>;
  registeraddress: Record<string, any>;
  addressId: Record<number, any>;
  tempDeliveryAddress: DeliveryAddressInput | null;
}

// -----new defined types------
export interface GetDeliveryAddressType {
  AddressLists: DeliveryAddressListNewType[];
  ukdatetime: string;
}

export interface DeliveryAddressListNewType {
  id: number;
  address1: string;
  address2: string;
  cityName: string;
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
