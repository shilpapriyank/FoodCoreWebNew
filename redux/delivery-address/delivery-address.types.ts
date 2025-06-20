export interface DeliveryAddressInput {
    deliveryaddressId: string;
    customerId: number;
    othercustomerId?: string;
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
    [key: string]: any;
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
}

export interface GetAddressResponse {
    AddressLists: DeliveryAddressInput[];
}

export interface DeliveryAddressState {
  deliveryaddressdata: DeliveryAddressInput[] | null;
  updatedAddress: boolean;
  choosetime: Record<string, any>;
  registeraddress: DeliveryAddressInput;
  addressId: DeliveryAddressInput;
  tempDeliveryAddress: DeliveryAddressInput | null;
  pickupordelivery: string;
  selecteddeliveryaddress: DeliveryAddressInput | null;
}
