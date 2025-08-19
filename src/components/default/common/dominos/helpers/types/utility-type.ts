// types.ts

export interface AddressItem {
  locationName: string;
  zipcode: string;
  cityName: string;
  latitude: number;
  longitude: number;
  phone?: string;
  address1?: string;
}

export interface LocationMarker {
  id: number;
  name: string;
  position: { lat: number; lng: number };
  locationname: string;
  phone?: string;
  city: string;
  zipcode: string;
  address1?: string;
}

export interface ThemeType {
  name: string;
  value: number;
  url: string;
}

export interface OrderDisableObj {
  isorderdisable: boolean;
  errormessage: string;
}

export interface RestaurantInfo {
  defaultLocation: {
    isOrderingDisable?: boolean;
    orderingMessage?: string;
    istakeaway?: boolean;
    isdelivery?: boolean;
    isTakeoutOrderingDisable?: boolean;
    isDeliveryOrderingDisable?: boolean;
  };
  isdelivery?: boolean;
  istakeaway?: boolean;
}

export interface DeliveryAddressInfo {
  pickupordelivery?: string;
}

export interface SubOption {
  subOptionselected: boolean;
  toppingValue: string;
  pizzaside?: "L" | "R";
  halfPizzaPriceToppingPercentage: string;
  subOptionToppingQuantity: number;
  isHalfPizza?: boolean;
}

export interface SelectedOption {
  isHalfPizza?: boolean;
}

export interface CheckTimeStatusResult {
  isCheckTime: boolean;
  message?: string;
}

export interface FutureOrderDay {
  fullDay: string;
  [key: string]: any;
}
