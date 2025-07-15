export interface SelectedDeliveryAddressType {
  address1: string;
  address2: string;
  addresstype: 0 | 1; //number;
  businessname: string;
  city: string;
  contactname: string;
  contactno: string;
  country: string | null;
  customerId: number;
  deliveryaddressId: number;
  landmark: string;
  latitude: number;
  longitude: number;
  othercustomerId: number;
  state: string | null;
  zipcode: string;
}

export interface ChooseTime {
  selectedDate?: string;
  selectedTimeSlot?: string;
  isAsap?: boolean;
  isLaterOn?: boolean;
}