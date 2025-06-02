export interface DeliveryAddressInput {
    customerId: number | string;
    othercustomerId: number | string;
    deliveryaddressId: number | string;
    address1: string;
    address2: string;
    landmark: string;
    city: string;
    zipcode: string;
    contactno: string;
    contactname: string;
    latitude: number | string;
    longitude: number | string;
    state: string;
    country: string;
    addresstype: string;
    businessname: string;
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
