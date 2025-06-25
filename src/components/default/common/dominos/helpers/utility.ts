import { ORDER_TYPE_ENUM } from "@/components/common/utility";
import { RestaurantWindowTime } from "@/types/mainservice-types/mainservice.type";
import { AddressListItem } from "@/types/restaurant-types/restaurant.type";

interface Address {
  locationName: string;
  zipcode: string;
  cityName: string;
  latitude: number;
  longitude: number;
  phone: string;
  address1: string;
}

interface Marker {
  id: number;
  name: string;
  position: { lat: number; lng: number };
  locationname: string;
  phone: string;
  city: string;
  zipcode: string;
  address1: string;
}

// export enum ORDER_TYPE_ENUM {
//   PICKUP = "Pickup",
//   DELIVERY = "Delivery",
// }

// const ORDERTYPE = {
//   PICKUP: "Pickup",
//   DELIVERY: "Delivery",
// };

//export type OrderType = (typeof ORDERTYPE)[keyof typeof ORDERTYPE];
export type OrderType = `${ORDER_TYPE_ENUM}`;

export const getLoactionMarker = (addressList: AddressListItem[]): Marker[] => {
  return addressList.map((item, index) => ({
    id: index + 1,
    name: `${item.locationName},${item.zipcode},${item.cityName}`,
    position: { lat: item.latitude, lng: item.longitude },
    locationname: item.locationName,
    phone: item.phone,
    city: item.cityName,
    zipcode: item.zipcode,
    address1: item.address1,
  }));
};

export const leftRightArray = <T>(data: T[]) => {
  const half = Math.ceil(data.length / 2);
  const rigtharray = data.slice(0, half);
  const leftarray = data.slice(half);
  return { rigtharray, leftarray };
};

export const ThemeObj = {
  default: "default",
  dominos: "dominos",
  FD123456: "FD123456",
  tableorder: "tableorder",
  newtheme: "newtheme",
};

export const ThemeTypeObj: ThemeType[] = [
  {
    name: "default",
    value: 1,
    url: "dt",
  },
  {
    name: "dominos",
    value: 2,
    url: "dm",
  },
  {
    name: "tableorder",
    value: 201,
    url: "to",
  },
  {
    name: "newtheme",
    value: 4,
    url: "nt",
  },
];

interface ThemeType {
  name: string;
  value: number;
  url: string;
}

export const GetThemeDetails = (value: number): ThemeType | undefined => {
  const ThemeTypeObj: ThemeType[] = [
    { name: "default", value: 1, url: "dt" },
    { name: "dominos", value: 2, url: "dm" },
    { name: "tableorder", value: 201, url: "to" },
    { name: "newtheme", value: 4, url: "nt" },
  ];
  return ThemeTypeObj.find((x) => x.value === value);
};

export const GetThemeDetailsByName = (value: string): ThemeType | undefined => {
  const ThemeTypeObj: ThemeType[] = [
    { name: "default", value: 1, url: "dt" },
    { name: "dominos", value: 2, url: "dm" },
    { name: "tableorder", value: 201, url: "to" },
    { name: "newtheme", value: 4, url: "nt" },
  ];
  return ThemeTypeObj.find((x) => x.name === value);
};

export const BannerName = {
  banner1Name: "Home Page Banner1",
  banner2Name: "Home Page Banner2",
  banner3Name: "Home Page Banner3",
  banner4Name: "Home Page Banner4",
  banner5Name: "Home Page Banner5",
  banner6Name: "Home Page Banner6",
  banner7Name: "Home Page Banner7 Left",
  banner8Name: "Home Page Banner7 Right",
};

export function closeModal(myclass: string): void {
  $(`.${myclass}`).click();
}

export function closeModalByID(id: string): void {
  $(`#${id}`).click();
}

interface OrderDisableObj {
  isorderdisable: boolean;
  errormessage: string;
}

export const orderDisable = (
  restaurantinfo: any,
  deliveryaddressinfo: any,
  restaurantWindowTime: RestaurantWindowTime
): OrderDisableObj => {
  const pickupWindow = restaurantWindowTime?.pickupTime;
  const deliveryWindow = restaurantWindowTime?.deliveryTime;
  const location = restaurantinfo.defaultLocation;

  let orderDisableObj: OrderDisableObj = {
    isorderdisable: false,
    errormessage: "",
  };

  if (location?.isOrderingDisable) {
    orderDisableObj.errormessage = location.orderingMessage;
    orderDisableObj.isorderdisable = true;
  } else if (!restaurantinfo.isdelivery && !restaurantinfo.istakeaway) {
    orderDisableObj.errormessage = location.orderingMessage;
    orderDisableObj.isorderdisable = true;
  } else if (
    !(
      (location.istakeaway && pickupWindow?.length > 0) ||
      (location.isdelivery && deliveryWindow?.length > 0)
    )
  ) {
    orderDisableObj.errormessage = "We are away for a bit. Check back soon.";
    orderDisableObj.isorderdisable = true;
  } else {
    if (
      deliveryaddressinfo?.pickupordelivery === ORDER_TYPE_ENUM.PICKUP &&
      (location.isTakeoutOrderingDisable ||
        !restaurantinfo.istakeaway ||
        !location.istakeaway)
    ) {
      orderDisableObj.errormessage = location.orderingMessage;
      orderDisableObj.isorderdisable = true;
    } else if (
      deliveryaddressinfo?.pickupordelivery === ORDER_TYPE_ENUM.DELIVERY &&
      (location.isDeliveryOrderingDisable ||
        !restaurantinfo.isdelivery ||
        !location.isdelivery)
    ) {
      orderDisableObj.errormessage = location.orderingMessage;
      orderDisableObj.isorderdisable = true;
    }
  }
  return orderDisableObj;
};
export const getImgeUrl = {};

export const calculateFinalCount = (
  subOptionList: any[],
  selectedOption: any
): number => {
  let finalcount = 0;
  const toppingcount = subOptionList.filter(
    (x) => x.subOptionselected === true
  );

  toppingcount.forEach((tc) => {
    const topvalue =
      tc.toppingValue === "" || parseInt(tc.toppingValue) === 0
        ? 1
        : parseInt(tc.toppingValue);
    const calculatedtopvalue =
      selectedOption.isHalfPizza &&
      (tc.pizzaside === "L" || tc.pizzaside === "R")
        ? topvalue *
          (tc.halfPizzaPriceToppingPercentage === "" ||
          parseInt(tc.halfPizzaPriceToppingPercentage) === 0
            ? 1
            : parseInt(tc.halfPizzaPriceToppingPercentage) / 100)
        : topvalue;

    finalcount += tc.subOptionToppingQuantity * calculatedtopvalue;
  });

  return finalcount;
};

export const getImagePath = (
  itemImage: string | null | undefined,
  defaultImage: string
): string => {
  if (itemImage !== null && itemImage !== undefined && itemImage !== "") {
    return itemImage;
  } else {
    if (
      defaultImage !== "" &&
      defaultImage !== undefined &&
      defaultImage !== null
    ) {
      return defaultImage;
    } else {
      return "";
    }
  }
};
export const checkTimeStatus = (
  defaultLocation: any,
  restaurantWindowTime: any,
  orderType: string
) => {
  const pickupWindow =
    restaurantWindowTime &&
    restaurantWindowTime.pickupTime &&
    restaurantWindowTime.pickupTime;
  const deliveryWindow =
    restaurantWindowTime &&
    restaurantWindowTime.deliveryTime &&
    restaurantWindowTime.deliveryTime;

  if (
    (defaultLocation.istakeaway && pickupWindow?.length > 0) ||
    (defaultLocation.isdelivery && deliveryWindow?.length > 0)
  ) {
    if (
      orderType === ORDER_TYPE_ENUM.DELIVERY &&
      defaultLocation.isdelivery &&
      deliveryWindow?.length > 0
    ) {
      return { isCheckTime: true };
    } else if (orderType === ORDER_TYPE_ENUM.DELIVERY) {
      return { isCheckTime: false, message: "" };
    } else if (
      orderType === ORDER_TYPE_ENUM.PICKUP &&
      defaultLocation.istakeaway &&
      pickupWindow?.length > 0
    ) {
      return { isCheckTime: true };
    } else if (orderType === ORDER_TYPE_ENUM.PICKUP) {
      return { isCheckTime: false, message: "Pickup Close" };
    }
  }

  return { isCheckTime: false, message: "No valid time window" };
};

export const formatePhoneNumber = (number: string): string => {
  return number?.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
};

export const unFormatePhoneNumber = (number: string): string => {
  let unFormatedNumber =
    number &&
    number.replace("(", "").replace(")", "").replace("-", "").replace(" ", "");
  return unFormatedNumber;
};

// export const convertSecondToMinute = (
//   second: number
// ): { minute: number; second: number } => {
//   const totalSeconds = second;
//   const minutes = Math.floor(totalSeconds / 60);
//   const seconds = totalSeconds % 60;

//   function padTo2Digits(num: number) {
//     return num.toString().padStart(2, "0");
//   }
//   return {
//     minute: parseInt(padTo2Digits(minutes)),
//     second: parseInt(padTo2Digits(seconds)),
//   };
// };

export const allRegex = {
  phoneRegex1: /(\(?\d{1,2})/,
  validwithFormatephoneRegex: /^(\(?\d{1,})\)?(\d{1,}?)(\-?\d{1,})$/,
  phoneRegex3: /^\($/,
  validdigit: /^\d{1,}$/,
  validateemial: /\S+@\S+\.\S+/,
};

export const getNameFromURL = (url?: string): string => {
  return (
    url
      ?.toLowerCase()
      ?.toString()
      .replace(/[^a-zA-Z0-9]/g, " ")
      .replace(/\s{2,}/g, " ")
      .replace(/ /g, "-") || ""
  );
};

export const validateQueryString = (
  restaurantURL: string,
  locationURL: string,
  categoryURL: string = "",
  menuitemURL: string = ""
): boolean => {
  const pattern = /[`!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/;
  const validLength =
    restaurantURL.length < 20 ||
    locationURL.length < 20 ||
    categoryURL.length < 50 ||
    menuitemURL.length < 50;

  if (
    validLength &&
    !pattern.test(restaurantURL) &&
    !pattern.test(locationURL) &&
    (categoryURL.length === 0 || !pattern.test(categoryURL)) &&
    (menuitemURL.length === 0 || !pattern.test(menuitemURL))
  ) {
    return true;
  }

  return false;
};
