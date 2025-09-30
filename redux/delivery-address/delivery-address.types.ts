// ------- delivery address types for solve type mismatch  30-09-25 --------------

export interface GetDeliveryAddressResponseClassType {
  result: GetDeliveryAddressServiceResultType;
  message: string;
  status: number;
}

export interface GetDeliveryAddressServiceResultType {
  AddressLists: AddressListType[];
  ukdatetime: string;
}

export interface AddressListType {
  address1: string;
  address2: string;
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

export interface DeleteDeliveryAddressResponseClassType {
  result: DeleteDeliveryAddressServiceResultType;
  message: string;
  status: number;
}

export interface DeleteDeliveryAddressServiceResultType {
  message: string;
}

export interface AddDeliveryAddressResponseClassType {
  result: AddDeliveryAddressServiceResultType;
  message: string;
  status: number;
}

export interface AddDeliveryAddressServiceResultType {
  customerAddressId: number;
}

export interface VerifyDeliveryAddresssResponseModalType {
  result: VerifyDeliveryAddresssResultType;
  message: string;
  status: number;
}

export interface VerifyDeliveryAddresssResultType {}


export interface ObjTypeForVerifyDeliveryAddressType {
  address1: string;
  address2: string;
  addresstype: number;
  businessname: string;
  city: string;
  contactname: string;
  contactno: string;
  country: string;
  customerId: number;
  deliveryaddressId: number;
  landmark: string;
  latitude: number;
  longitude: number;
  othercustomerId: number;
  state: string;
  zipcode: string;
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
