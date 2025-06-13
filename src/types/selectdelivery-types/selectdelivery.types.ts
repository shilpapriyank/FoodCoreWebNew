// Types
export interface ChooseTime {
    [key: string]: any;
}

export interface DeliveryAddress {
    address1?: string;
    address2?: string;
    addresstype?: number;
    businessname?: string;
    city?: string;
    contactname?: string;
    contactno?: string;
    country?: string | null;
    customerId?: number;
    deliveryaddressId?: number;
    landmark?: string;
    latitude?: number;
    longitude?: number;
    othercustomerId?: number;
    state?: string | null;
    zipcode?: string;
}

export interface SelectedDeliveryState {
    choosetime: ChooseTime;
    pickupordelivery: string;
    selecteddeliveryaddress: DeliveryAddress | null | Record<string, any>;
}