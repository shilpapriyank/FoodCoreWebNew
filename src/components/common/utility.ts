import {
  AllRegex,
  ColorStyleType,
  DefaultStyleType,
  DynamicColorObjTypes,
  OrderTimeTypes,
  PromotionTypes,
  ThemeDefautStyle,
} from "@/types/common-types/common.types";
//import { AsapLaterOnState } from "@/types/timeslot-types/timeslot.types";
import moment from "moment";
import { useSelector } from "react-redux";
import { RestaurantsServices } from "../../../redux/restaurants/restaurants.services";
import { AddressList } from "@/types/location-types/location.type";
import {
  MainCategoryList,
  RestaurantWindowTimeNew,
} from "@/types/mainservice-types/mainservice.type";
import {
  CartDetails,
  CartItemDetail,
} from "@/types/cart-types/cartservice.type";
import {
  GetAllMenuCategoryItems,
  GetMenuItemDetail,
  List,
  Size,
  Topping,
  Type,
} from "@/types/menuitem-types/menuitem.type";
import {
  DefaultLocation,
  GetAllRestaurantInfo,
} from "@/types/restaurant-types/restaurant.type";
import { GetCategoriesRelativeItems } from "@/types/category-types/category.services.type";
import { DeliveryAddressInfo } from "../default/Common/dominos/helpers/types/utility-type";
import { LoggedInUser } from "../../../redux/login/login.types";

export const restaurantURLList = {
  domenicsslp: "domenicsslp",
};
export const ThemeObj = {
  default: "default",
  dominos: "dominos",
  FD123456: "FD123456",
  tableorder: "tableorder",
  newtheme: "newtheme",
};

//GET THEME DETAILS FROM THEME TYPE VALUE
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

export const PromotionType: PromotionTypes = {
  Percentage: 1,
  Fixed: 2,
};

interface ThemeType {
  name: string;
  value: number;
  url: string;
}
export const GetThemeDetails = (value: number | string) => {
  const ThemeTypeObj: ThemeType[] = [
    { name: "default", value: 1, url: "dt" },
    { name: "dominos", value: 2, url: "dm" },
    { name: "tableorder", value: 201, url: "to" },
    { name: "newtheme", value: 4, url: "nt" },
  ];
  return ThemeTypeObj.find((x) => x.value === value);
};

// FORMATE THE NUMBER INTO THE (XXX) XXX-XXXX
export const formatePhoneNumber = (number: string): string => {
  let formateNumber = number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  return formateNumber;
};

// UNFORMATE THE NUMBER FROM (XXX) XXX-XXXX TO XXXXXXXXXXX
export const unFormatePhoneNumber = (number: string): string => {
  let unFormatedNumber = number
    .replace("(", "")
    .replace(")", "")
    .replace("-", "")
    .replace(" ", "");
  return unFormatedNumber;
};

export const allRegex: AllRegex = {
  phoneRegex1: /(\(?\d{1,2})/,
  phoneRegex2: /(\(?\d{1,2})/,
  validwithFormatephoneRegex: /^(\(?\d{1,})\)?(\d{1,}?)(\-?\d{1,})$/,
  phoneRegex3: /^\($/,
  validdigit: /^\d{1,}$/,
  validateemial: /\S+@\S+\.\S+/,
  validateTipAmount: /^(\d){0,3}(\.(\d){0,2})?$/,
  validateYopMail: /^[A-Z0-9]+[A-Z0-9_\.]*@(?!(?:yopmail)\.)\w+\.[A-Z0-9]+$/i,
};

export const formatURL = (value: string): string => {
  let formattedString = value
    .toLowerCase()
    .toString()
    .replace(/[^a-zA-Z0-9]/g, " ")
    .replace(/\s{2,}/g, " ")
    .replace(/ /g, "-");
  return formattedString;
};

export const GetThemeDetailsByName = (value: string) => {
  const ThemeTypeObj: ThemeType[] = [
    { name: "default", value: 1, url: "dt" },
    { name: "dominos", value: 2, url: "dm" },
    { name: "tableorder", value: 201, url: "to" },
    { name: "newtheme", value: 4, url: "nt" },
  ];
  return ThemeTypeObj.find((x) => x.name === value);
};

export const formatStringToURLWithBlankSpace = (value: string) => {
  let formattedString = value
    .toLowerCase()
    .toString()
    .replace(/[^a-zA-Z0-9]/g, " ")
    .replace(/\s{2,}/g, " ")
    .replace(/ /g, "");
  return formattedString;
};
export const getImagePath = (
  itemImage: string,
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

// DYNAMIC STYLE VARIABLE FOR CSS
export const dynamicColorObj: DynamicColorObjTypes = {
  color: "--primary-color-orange",
  fontColor: "--font-color-dynamic",
  backgroundColor: "--background-color-dynamic",
  headerFontColor: "--headerfont-color-dynamic",
  borderColor: "border-color-dynamic",
  iconColor: "--icon-color-dynamic",
  headerColor: "--header-color-dynamic",
  categoryFontSize: "--category-font-size",
  categoryBackgroundColor: "--category-background-color",
  categoryFontColor: "--category-font-color",
  activeLabelBg: "--lbl_active_bg",
  activeLabelName: "--lbl_active_name",
  lbl_deactive_button_bg: "--lbl_deactive_button_bg",
  lbl_deactive_button_name: "--lbl_deactive_button_name",
  blueButtonBg: "--lbl_active_button_bg",
  blueButtonName: "--lbl_active_button_name",
  disableButtonBg: "--lbl_disable_button_bg",
  disableButtonName: "--lbl_disable_button_name",
  activeLabelText: "--lbl_active",
  whiteLabel: "--lbl_white",
  redLabel: "--lbl_red",
  blackLabel: "--lbl_black",
  lightGrayLabel: "--lbl_light_gray",
};

export const defaultStyle: DefaultStyleType = {
  color: "#004aad",
  categoryFontColor: "#15B392",
  categoryBackgroundColor: "#f6dd00",
};
//DEFAULT COLOR ARRAY FOR DIFFRENT THEME

export const handleDefaultDynamicFieldColor = (
  color = "#004aad",
  theme: string
): ColorStyleType[] => {
  const defaultThemeColor = color || "#004aad";
  const themeDetail = GetThemeDetails(+theme);
  let blueButtonBg = "#3A86F3";
  let activeLabelBg = "#004aad";
  //assign button color based on theme
  if (
    themeDetail?.name === ThemeObj.dominos ||
    themeDetail?.name === ThemeObj.newtheme
  ) {
    blueButtonBg = defaultThemeColor;
    activeLabelBg = defaultThemeColor;
  } else {
    activeLabelBg = defaultThemeColor;
  }

  //set dynamic color
  const colorStyleArray: ColorStyleType[] = [
    { FieldName: "color", Color: defaultThemeColor },
    { FieldName: "blueButtonBg", Color: blueButtonBg }, //set dynamic
    { FieldName: "blueButtonName", Color: "#ffffff" },
    { FieldName: "activeLabelBg", Color: activeLabelBg }, //set dynamic
    { FieldName: "activeLabelName", Color: "#ffffff" },
    { FieldName: "deactiveButtonBg", Color: "#FBEFEA" },
    { FieldName: "deactiveButtonName", Color: "#f26004" },
    { FieldName: "disableButtonBg", Color: "#b2b2bf" },
    { FieldName: "disableButtonName", Color: "#0a0a0a" },
    { FieldName: "whiteLabel", Color: "#ffffff" },
    { FieldName: "redLabel", Color: "#ff0000" },
    { FieldName: "blackLabel", Color: "#0a0a0a" },
    { FieldName: "lightGrayLabel", Color: "#9C9C9C" },
  ];

  //return array dynamic color
  return colorStyleArray;
};
export const colorStyleArray: ColorStyleType[] = [
  { FieldName: "color", Color: "#004aad" },
  { FieldName: "blueButtonBg", Color: "#640D5F" }, //set dynamic
  { FieldName: "blueButtonName", Color: "#8FD14F" }, //set dynamic
  { FieldName: "activeLabelBg", Color: "#8B9A46" }, //set dynamic
  { FieldName: "activeLabelName", Color: "pink" }, //set dynamic
  { FieldName: "deactiveButtonBg", Color: "#FBEFEA" },
  { FieldName: "deactiveButtonName", Color: "#f26004" },
  { FieldName: "disableButtonBg", Color: "#b2b2bf" },
  { FieldName: "disableButtonName", Color: "#0a0a0a" },
  { FieldName: "whiteLabel", Color: "#ffffff" },
  { FieldName: "redLabel", Color: "#ff0000" },
  { FieldName: "blackLabel", Color: "#0a0a0a" },
  { FieldName: "lightGrayLabel", Color: "#9C9C9C" },
];

export const themeDefaultStyleArray: ThemeDefautStyle[] = [
  {
    url: "dm",
    color: "#FF7332",
    fontColor: "black",
    backgroundColor: "white",
    headerFontColor: "#242424",
    borderColor: "black",
    iconColor: "white",
    headerColor: "blue",
  },
  {
    url: "dt",
    color: "#FF7332",
    fontColor: "black",
    backgroundColor: "white",
    headerFontColor: "white",
    borderColor: "black",
    iconColor: "white",
    headerColor: "blue",
  },
];

//CHECK THE CARTITEM IS AVAILABLE FOR THE DELIVERY OR TAKEOUT
export const checkCheckoutDisable = (
  cartdata: CartDetails[],
  pickupordelivery: string,
  dtotal: any
): boolean => {
  if (
    pickupordelivery === ORDER_TYPE.PICKUP.text ||
    pickupordelivery === ORDER_TYPE.DELIVERY.text
  ) {
    //let cartItems = cartdata?.cartDetails?.cartItemDetails;
    let cartItems = cartdata[0]?.cartItemDetails;
    let isAnyPickupItemNotAvailable = cartItems?.some(
      (item) => item?.categorytakeoutavailable === false
    );
    let isAnydeliveryItemNotAvailable = cartItems?.some(
      (item) => item?.categorydeliveryavailable === false
    );

    if (
      (pickupordelivery === ORDER_TYPE.PICKUP.text &&
        isAnyPickupItemNotAvailable) ||
      (pickupordelivery === ORDER_TYPE.DELIVERY.text &&
        isAnydeliveryItemNotAvailable) ||
      checkMenuItemTimeAvailability(cartItems as any)
    ) {
      return true;
    } else if (
      dtotal !== undefined &&
      pickupordelivery === ORDER_TYPE.DELIVERY.text &&
      dtotal === 0
    ) {
      return true;
    }
  } else {
    return false;
  }
  return false;
};

export const checkMenuItemTimeAvailability = (cartItems: CartItemDetail[]) => {
  return cartItems?.some((item) => item.availability == false);
};

//FIND THE CATEGORY FROM CATEGORY LIST BY CATID
export const getCategoryDetailById = (
  categoryList: GetAllMenuCategoryItems[],
  catId: number
) => {
  let cat = categoryList?.find((cat) => cat?.catId == catId);
  return cat;
};

// FUNCTION CHECK THE IS MENUITEM AVAILABLE FOR THE TAKEOUT OR DELIVERY
export const checkMenuItemAvailability = (
  categoryList: GetAllMenuCategoryItems[],
  catId: number,
  pickupordelivery: string
) => {
  if (catId === undefined || pickupordelivery === "") {
    return true;
  }
  let filteredCategory = getCategoryDetailById(categoryList, catId);
  //CHECK THE MENUITEM IS AVAILABLE FOR THE DELIVERY OR TAKEOUT
  let isItemAvailable = true;
  if (
    pickupordelivery === ORDER_TYPE.PICKUP.text &&
    filteredCategory?.istakeoutavailable === false
  ) {
    isItemAvailable = false;
  } else if (
    pickupordelivery === ORDER_TYPE.DELIVERY.text &&
    filteredCategory?.isdeliveryavailable === false
  ) {
    isItemAvailable = false;
  } else {
    isItemAvailable = true;
  }
  return isItemAvailable;
};
// GET AVAILABLE CARTRELATIVE ITEMS
export const getAvailableCartRelativeData = (
  categoryList: MainCategoryList[],
  pickupordelivery: string,
  cartRelativeData: GetCategoriesRelativeItems[]
) => {
  if (cartRelativeData === undefined || cartRelativeData === null) {
    return undefined;
  }
  if (cartRelativeData && pickupordelivery === "") {
    return cartRelativeData;
  }
  if (pickupordelivery === "Pickup") {
    //NEED TO CATEGORY LIST THAT INCLUDE istakeoutavailable SO ITRATE OVER THE REDUX-CATEGORY LIST
    //GET THAT ITEM AND FILTER WITH CAT ID AND istakeoutavailable SO DIRECTLY FIND THE CATEGORYLIST THAT IS istakeoutavailable
    let categoryData = categoryList?.filter((category) => {
      return cartRelativeData?.some(
        (relativeItem) =>
          relativeItem?.categoryId === category?.catId &&
          category?.istakeoutavailable
      );
    });
    //WE FIND THE CATEGORY THAT IS AVILABLE TAKEOUT BUT OUR NEED IS FIND CART RELATIVE DATA TAHT AVAILABLE FOR ISTAKEOUT
    //SO FILTER cartRelativeData WITH categoryData IS SAME CATID
    let AvailableCartRelativeItem = cartRelativeData?.filter((relativeItem) => {
      return categoryData?.some(
        (catItem) => catItem?.catId === relativeItem.categoryId
      );
    });
    return AvailableCartRelativeItem;
  }
  if (pickupordelivery === ORDER_TYPE.DELIVERY.text) {
    //NEED TO CATEGORY LIST THAT INCLUDE isdeliveryavailable SO ITRATE OVER THE REDUX-CATEGORY LIST
    //GET THAT ITEM AND FILTER WITH CAT ID AND isdeliveryavailable SO DIRECTLY FIND THE CATEGORYLIST THAT IS isdeliveryavailable
    let categoryData = categoryList?.filter((category) => {
      return cartRelativeData?.some(
        (relativeItem) =>
          relativeItem.categoryId === category?.catId &&
          category?.isdeliveryavailable
      );
    });
    //WE FIND THE CATEGORY THAT IS AVILABLE TAKEOUT BUT OUR NEED IS FIND CART RELATIVE DATA TAHT AVAILABLE FOR delivery
    //SO FILTER cartRelativeData WITH categoryData IS SAME CATID
    let AvailableCartRelativeItem = cartRelativeData?.filter((relativeItem) => {
      return categoryData?.some(
        (catItem) => catItem?.catId === relativeItem?.categoryId
      );
    });
    return AvailableCartRelativeItem;
  }
};

export const getNameFromURL = (url: string): string => {
  //create category name from category url(replace space with -)
  return url
    ?.toLowerCase()
    ?.toString()
    .replace(/[^a-zA-Z0-9]/g, " ")
    .replace(/\s{2,}/g, " ")
    .replace(/ /g, "-");
};

export const openCloseOption = (
  selectedoption: Type,
  selectedToppingList: List[]
) => {
  const selectedButton = document.getElementById(
    `itembutton${selectedoption?.optionId}`
  ) as HTMLButtonElement;
  const optionClick = selectedButton.click();
  let compulsoryList = selectedToppingList.filter((item) => item.isCompulsory);
  let nonSelectedOptionList = compulsoryList.filter((option) =>
    option.type.every((suboption) => suboption.subOptionselected === false)
  );
  let optionbtn = document.getElementById(
    `itembutton${nonSelectedOptionList[0]?.optionId}`
  );
  if (optionbtn?.classList?.contains("collapsed")) {
    optionbtn?.click();
  }
};

export const orderDisable = (
  restaurantinfo: GetAllRestaurantInfo,
  deliveryaddressinfo: DeliveryAddressInfo,
  restaurantWindowTime: RestaurantWindowTimeNew
) => {
  const pickupWindow =
    restaurantWindowTime &&
    restaurantWindowTime.pickupTime &&
    restaurantWindowTime.pickupTime;
  const deliveryWindow =
    restaurantWindowTime &&
    restaurantWindowTime.deliveryTime &&
    restaurantWindowTime.deliveryTime;
  const location = restaurantinfo.defaultLocation;
  let orderDisableObj = {
    isorderdisable: false,
    errormessage: "",
  };
  if (location && location.isOrderingDisable == true) {
    orderDisableObj.errormessage = location.orderingMessage;
    orderDisableObj.isorderdisable = true;
  } else if (
    restaurantinfo.isdelivery === false &&
    restaurantinfo.istakeaway === false
  ) {
    orderDisableObj.errormessage = location.orderingMessage;
    orderDisableObj.isorderdisable = true;
  } else if (
    !(
      (location.istakeaway === true &&
        pickupWindow &&
        pickupWindow.length > 0) ||
      (location.isdelivery === true &&
        deliveryWindow &&
        deliveryWindow.length > 0)
    )
  ) {
    orderDisableObj.errormessage = "We are away for a bit.Check back soon.";
    orderDisableObj.isorderdisable = true;
  } else {
    if (
      deliveryaddressinfo &&
      deliveryaddressinfo.pickupordelivery === ORDER_TYPE.PICKUP.text &&
      (location.isTakeoutOrderingDisable === true ||
        restaurantinfo.istakeaway === false ||
        location.istakeaway === false)
    ) {
      orderDisableObj.errormessage = location.orderingMessage;
      orderDisableObj.isorderdisable = true;
    } else if (
      deliveryaddressinfo &&
      deliveryaddressinfo.pickupordelivery === ORDER_TYPE.DELIVERY.text &&
      (location.isDeliveryOrderingDisable === true ||
        restaurantinfo.isdelivery === false ||
        location.isdelivery === false)
      // (location.isDeliveryOrderingDisable === true || restaurantinfo.isdelivery === false && location.isdelivery === false)
    ) {
      orderDisableObj.errormessage = location.isdelivery
        ? location.orderingMessage
        : "Delivery is not available";
      orderDisableObj.isorderdisable = true;
    }
  }
  return orderDisableObj;
};

export const checkCategoryExist = (
  categoryList: MainCategoryList[],
  url: string
) => {
  if (categoryList.find((item) => item.categoryslug === url)) {
    return true;
  } else {
    return false;
  }
};

export interface AsapLaterOnState {
  isdisplay: boolean;
  isDisableAsapLateron: boolean;
  isAsap: boolean;
  isLateron: boolean;
}

export interface RestaurantWindowTime {
  pickupTime?: string[];
  deliveryTime?: string[];
}

export const getAsapLaterOnState = (
  defaultLocation?: AddressList,
  pickupordelivery?: OrderType,
  restaurantWindowTime?: RestaurantWindowTimeNew
): AsapLaterOnState => {
  if (!defaultLocation || pickupordelivery === undefined) {
    return {
      isdisplay: false,
      isDisableAsapLateron: true,
      isAsap: false,
      isLateron: false,
    };
  }

  const pickupWindow = restaurantWindowTime?.pickupTime ?? [];
  const deliveryWindow = restaurantWindowTime?.deliveryTime ?? [];

  const {
    isTakeOutAsap,
    isTakeOutPickupTime,
    isDeliveryAsap,
    isDeliveryPickupTime,
    isTakeoutOrderingDisable,
    isDeliveryOrderingDisable,
    isOrderingDisable,
  } = defaultLocation;

  const orderState =
    pickupordelivery === ORDER_TYPE.DELIVERY.value
      ? {
          timeWindow: deliveryWindow,
          isAsap: isDeliveryAsap,
          isLaterOn: isDeliveryPickupTime,
          isOrderTypeDisable: isDeliveryOrderingDisable,
        }
      : {
          timeWindow: pickupWindow,
          isAsap: isTakeOutAsap,
          isLaterOn: isTakeOutPickupTime,
          isOrderTypeDisable: isTakeoutOrderingDisable,
        };

  const isdisplay = orderState.isAsap || orderState.isLaterOn;

  const isDisableAsapLateron = !(
    isOrderingDisable === false &&
    orderState.isOrderTypeDisable === false &&
    orderState.timeWindow.length > 0
  );

  return {
    isdisplay,
    isDisableAsapLateron,
    isAsap: orderState.isAsap,
    isLateron: orderState.isLaterOn,
  };
};

export const getorigin = () => {
  return process.env.NEXT_PUBLIC_WEB_URL;
};

export async function getSEODetails(
  RestaurantURL = "",
  LocationURL = "",
  CategoryURL = "",
  MenuItemURL = "",
  MenuItemId = 0,
  CategoryId = 0
) {
  let restauranturl = RestaurantURL?.toLowerCase().toString().replace(" ", "");
  let obj = {
    // restaurantURL: restauranturl,
    restaurantURL: restauranturl,
    locationURL: LocationURL,
    categoryURL: CategoryURL,
    menuitemURL: MenuItemURL,
    menuitemId: MenuItemId,
    categoryId: CategoryId,
  };
  // var data = await RestaurantsServices.getRestaurantThemeType(restauranturl);
  let result = await RestaurantsServices.getMetadataDetails(obj);
  let data = result?.seodetails;

  const seodetails = {
    restaurantname: data?.restaurantname,
    imageurl: data?.imageurl,
  };
  return seodetails;
}

export const ORDERTYPE = {
  Pickup: "Pickup",
  Delivery: "Delivery",
};

export const onLoadSetDefaultFlag = (
  defaultflag: any,
  countryList: any,
  locationCountry: any
) => {
  if (defaultflag) {
    defaultflag.className = `iti-flag ${locationCountry.region}`;
    document
      .querySelector(".selected-flag")
      ?.setAttribute(
        "title",
        `${locationCountry.title}: ${locationCountry.countryCode}`
      );
    for (let index = 0; index < countryList?.children?.length; index++) {
      const element = countryList?.children[index];
      if (
        element?.getAttribute("data-country-code") === locationCountry.region
      ) {
        element.className = "country highlight";
      } else {
        element.className = "country";
      }
    }
  }
};

export const ORDER_TYPE = {
  PICKUP: {
    text: "Pickup",
    value: 1,
  },
  DELIVERY: {
    text: "Delivery",
    value: 2,
  },
} as const;

export type OrderType = (typeof ORDER_TYPE)[keyof typeof ORDER_TYPE]["value"];

export const ORDER_TIME_TYPE: OrderTimeTypes = {
  ASAP: {
    text: "Asap",
    value: 1,
  },
  LATERON: {
    text: "Lateron",
    value: 2,
  },
};

export const getOrderTimeType = (text: string) => {
  return Object.values(ORDER_TIME_TYPE).find((item) => item.text === text);
};

export const getOrderType = (value: string) => {
  let orderTypeArray = [
    {
      name: ORDER_TYPE.PICKUP.text,
      value: 1,
    },
    {
      name: ORDER_TYPE.DELIVERY.text,
      value: 2,
    },
  ];
  return orderTypeArray.find((item) => item.name === value);
};

export const SMS_API_TYPE = {
  FIREBASE: {
    text: "firebase",
    value: 1,
  },
  TWILIO: {
    TEXT: "twilio",
    value: 2,
  },
};

export const isSeoDetail = (url: string) => {
  let isGetSeo = false;
  if (url.includes("confirmation") || url.includes("create-new-password")) {
    isGetSeo = true;
  }
  return isGetSeo;
};

export const checkIntegerValue = (value: any) => {
  let zero = 0;
  let intValue = value ?? zero;
  intValue = intValue === "" ? zero : intValue;
  intValue = intValue === null ? 0 : intValue;
  return intValue;
};

export const handleSetDeliveryTypeError = (
  pickupordelivery: string,
  deliveryaddressinfo: DeliveryAddressInfo[],
  carttotal: any,
  dcharges: any,
  cart: any,
  cartdata: any,
  isCartError: boolean
) => {
  let errorMessage = "";
  if (
    pickupordelivery === ORDER_TYPE.DELIVERY.text &&
    (deliveryaddressinfo?.length === 0 || deliveryaddressinfo === null) &&
    (carttotal?.cartCount > 0 || cart?.cartitemcount > 0)
  ) {
    errorMessage = "Please select delivery address.";
    // } else if ( dcharges && dcharges.isdelivery === 0 && dcharges.chargeType === "3" && dcharges.minOrderForAddress !== "0" && carttotal?.cartCount > 0)
  } else if (
    dcharges &&
    parseInt(dcharges.isdelivery) === 0 &&
    carttotal.subTotal < parseFloat(dcharges.minOrderForAddress) &&
    carttotal?.cartCount > 0 &&
    isCartError
  ) {
    errorMessage =
      "Minimum order value for delivery at your address is " +
      carttotal.currencySymbol +
      dcharges.minOrderForAddress +
      " before tax. Please add some more items.";
  } else if (
    dcharges &&
    parseInt(dcharges.isdelivery) === 0 &&
    carttotal?.cartCount > 0 &&
    isCartError
  ) {
    if (dcharges?.returnMessage) {
      errorMessage = dcharges.returnMessage;
    } else {
      if (
        parseFloat(dcharges.maxkms) > 0 &&
        dcharges.distance > parseFloat(dcharges.maxkms)
      ) {
        errorMessage =
          "Sorry ! We do not deliver above " + dcharges.maxkms + " KM.";
      }
    }
  } else if (
    dcharges &&
    dcharges.minOrderForAddress > cart?.carttotal.subTotal &&
    carttotal?.cartCount > 0 &&
    cartdata?.cartItemDetails != undefined &&
    cartdata?.cartItemDetails?.length > 0 &&
    isCartError
  ) {
    errorMessage =
      "Minimum order value for delivery is " +
      carttotal.currencySymbol +
      dcharges.minOrderForAddress +
      " before tax. Please add some more items.";
  } else {
    errorMessage = "";
  }
  return errorMessage;
};

export const bindPlaceOrderObject = (
  rewardpoints: any,
  cart: any,
  ordertype: number,
  sessionid: number,
  userinfo: any,
  deliveryaddressId: number,
  order: any,
  isAsap: boolean,
  paymentType: string,
  restaurantinfo: GetAllRestaurantInfo,
  promotionData: any,
  studentname: string,
  distance: any,
  pickupordelivery: string,
  isFutureOrder: boolean,
  timeSlot: string,
  futureDate: string
) => {
  let placeOrder = {
    // redeemPoints: cart.rewardpoints?.redeemPoint > 0 ? cart.rewardpoints?.redeemPoint : 0,
    redeemPoints: rewardpoints?.redeemPoint > 0 ? rewardpoints?.redeemPoint : 0,
    orderInstruction:
      cart?.orderinstruction || cart?.orderinstruction !== undefined
        ? cart.orderinstruction
        : "",
    deliveryNote:
      cart?.orderdeliveryinstruction ||
      cart?.orderdeliveryinstruction !== undefined
        ? cart.orderdeliveryinstruction
        : "",
    preDiscountSubTotal:
      cart.carttotal?.subTotal > 0 ? parseFloat(cart.carttotal?.subTotal) : 0,
    tip:
      cart.carttotal.tipAmount > 0 ? parseFloat(cart.carttotal?.tipAmount) : 0,
    hstTax:
      cart.carttotal.hstTotal > 0 ? parseFloat(cart.carttotal.hstTotal) : 0,
    discountTotal:
      cart.carttotal.discountAmount > 0
        ? parseFloat(cart.carttotal.discountAmount)
        : 0,
    deliveryCharges:
      cart.carttotal.deliveryAmount > 0 &&
      pickupordelivery === ORDER_TYPE.DELIVERY.text
        ? //pickupordelivery === ORDERTYPE.Delivery
          parseFloat(cart.carttotal.deliveryAmount)
        : 0,
    orderTotal:
      cart.carttotal.grandTotal > 0 ? parseFloat(cart.carttotal.grandTotal) : 0,
    ordertype: ordertype,
    cartsessionId: sessionid, //getSessionKey(restaurantinfo.restaurantId, userinfo.customerId),
    customerId: parseInt(userinfo?.customerId ?? 0),
    addressId: deliveryaddressId,
    selectedTime:
      timeSlot === ""
        ? order && order.checktime && order.checktime !== ""
          ? order.checktime
          : ""
        : "",
    isAsap: isAsap, //true  false
    paymentType: paymentType, //1 for cash payment    2 for card payment
    locationId: restaurantinfo.defaultlocationId,
    restaurantId: restaurantinfo.restaurantId,
    promotionData: promotionData,
    studentname: studentname,
    distance:
      distance && pickupordelivery === ORDER_TYPE.DELIVERY.text ? distance : 0,
    isFutureOrder: isFutureOrder,
    timeSlot: timeSlot,
    futureDate: futureDate,
  };
  return placeOrder;
};

export const clearCache = () => {
  let isRefresh = false;
  if ("caches" in window) {
    caches?.keys().then((names) => {
      names?.forEach((name) => {
        caches.delete(name);
        isRefresh = true;
      });
      // window.location.reload(true);
    });
  }
  if (isRefresh) window.location.reload();
  // makes sure the page reloads. changes are only visible after you refresh.
};

export const DELIVERYSERVICES = {
  DEFAULT: 0,
  SKIP: 1,
  UBEREATS: 2,
  DOORDASH: 3,
};

export const ORDERSTATUS = {
  CANCEL: "Cancel",
  COMPLETED: "Completed",
  INCOMPLETE: "In Complete",
  INPROCESS: "In Process",
  PENDING: "Pending",
  FAILED: "Failed",
};
export const calulateTotal = (cartdata: CartDetails) => {
  let total: any = 0;
  cartdata?.cartItemDetails.map((data) => {
    total += data?.totalprice;
  });
  return parseFloat(total)?.toFixed(2);
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getCheckTimeArr = (
  orderTime: string,
  restaurantinfo: GetAllRestaurantInfo,
  orderDate: string,
  isasap: boolean
): string[] => {
  const Time: string[] = [];

  // Early return if orderTime is invalid
  if (!orderTime || typeof orderTime !== "string" || orderTime.trim() === "") {
    return ["", "", orderDate];
  }

  // Case 1: Third-party delivery (DoorDash / UberEats)
  if (
    (restaurantinfo?.defaultLocation?.deliveryService ===
      DELIVERYSERVICES.DOORDASH ||
      restaurantinfo?.defaultLocation?.deliveryService ===
        DELIVERYSERVICES.UBEREATS) &&
    !isasap
  ) {
    let checkTime = orderTime;
    if (checkTime?.includes("AM")) {
      checkTime = checkTime.replace("AM", "").trim();
      Time.push(checkTime);
      Time.push("AM");
    }
    if (checkTime?.includes("PM")) {
      checkTime = checkTime.replace("PM", "").trim();
      Time.push(checkTime);
      Time.push("PM");
    }
    Time.push("");
  } else if (restaurantinfo?.defaultLocation?.enabletimeslot && !isasap) {
    Time.push(orderTime);
    Time.push("");
    Time.push(orderDate);
  } else {
    let checkTime = orderTime;
    if (checkTime?.includes("AM")) {
      checkTime = checkTime.replace("AM", "").trim();
      Time.push(checkTime);
      Time.push("AM");
    }
    if (checkTime?.includes("PM")) {
      checkTime = checkTime.replace("PM", "").trim();
      Time.push(checkTime);
      Time.push("PM");
    }
    Time.push("");
  }
  return Time;
};

export const getVersion = () => {
  return "090";
};

export const countryData = {
  canada: {
    name: "canada",
    region: "ca",
    countryCode: "+1",
    title: "Canada",
  },
  india: {
    name: "india",
    region: "in",
    countryCode: "+91",
    title: "India (भारत)",
  },
  usa: {
    name: "us",
    region: "us",
    countryCode: "+1",
    title: "United States",
  },
} as const;
type CountryKey = keyof typeof countryData;
type CountryDataType = (typeof countryData)[CountryKey];

export const getCountryList = () => {
  let data = Object.values(countryData);
  let regionList = data.map((country) => country.region);
  return regionList;
};

export const sortArrayOnSelectedLocation = (
  addressList: AddressList[],
  defaultLocationId: number
) => {
  return addressList?.sort((item) => {
    if (item?.locationId === defaultLocationId) {
      return -1;
    } else {
      return 1;
    }
  });
};

export const getTimeInMiliSecond = (hour: number) => {
  return hour * 36_00_000;
  // return 300000
};
export const setUserExpiryTime = () => {
  let key = "userLoginTime";
  const now = new Date();
  const item = {
    value: true,
    expiry: now.getTime() + getTimeInMiliSecond(72),
    //expiry: now.getTime() +  60000,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getDate = () => {
  let currentdate = new Date().toLocaleDateString("en-CA");
  return currentdate;
};

export const getUserLoginExpiryTime = () => {
  const userDetailes = localStorage?.getItem("userLoginTime");
  if (!userDetailes) {
    return true;
  }

  const item = JSON.parse(userDetailes);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem("userLoginTime");
    return true;
  }
  return false;
};

// export const convert24HourTo12Hour = (time: any) => {
//   let meridian = "am";
//   let [hour, minute, second] = time?.split(":");
//   if (hour > 12) {
//     hour = hour - 12;
//     meridian = "pm";
//   }

//   return [hour, minute, meridian];
// };

// export const checkWindowTimeExpires = (
//   windowEndTime: string,
//   currentTime: string,
//   isLastOrder: any,
//   isasap: boolean
// ) => {
//   let [time, windowMeridian] = getCheckTimeArr(
//     currentTime,
//     isLastOrder,
//     windowEndTime,
//     isasap
//   );

//   if (!time || !windowMeridian) {
//     console.warn("Invalid time or windowMeridian from getCheckTimeArr");
//     return false;
//   }

//   const [windowHour, windowMinute] = time.split(":");
//   const [currentHour, currentMinute, meridian] =
//     convert24HourTo12Hour(currentTime);

//   const beginningTime = moment(
//     `${currentHour}:${currentMinute}${meridian}`,
//     "hh:mma"
//   );

//   const safeMeridian = (windowMeridian || "").toLowerCase();
//   const endTime = moment(
//     `${windowHour}:${windowMinute}${safeMeridian}`,
//     "hh:mma"
//   );

//   let WindowTimeIsAvailable = beginningTime.isBefore(endTime);

//   if (
//     meridian.trim().toLowerCase() === "pm" &&
//     isLastOrder &&
//     safeMeridian === "am"
//   ) {
//     WindowTimeIsAvailable = true;
//   }

//   return WindowTimeIsAvailable;
// };

export const convert24HourTo12Hour = (
  time: string
): [string, string, "am" | "pm"] => {
  if (!time || typeof time !== "string" || !time.includes(":")) {
    return ["12", "00", "am"]; // default fallback
  }

  let [hourStr, minute = "00"] = time.split(":");
  let hour = parseInt(hourStr, 10);

  let meridian: "am" | "pm" = "am";

  if (hour >= 12) {
    meridian = "pm";
    if (hour > 12) {
      hour -= 12;
    }
  }

  if (hour === 0) {
    hour = 12;
  }

  return [hour.toString().padStart(2, "0"), minute.padStart(2, "0"), meridian];
};

// export const checkWindowTimeExpires = (
//   windowEndTime: string,
//   currentTime: string,
//   isasap: boolean = false,
//   restaurantinfo: GetAllRestaurantInfo,
//   isLastOrder: boolean = false
// ): boolean => {
//   debugger;
//   const [time, windowMeridian] = getCheckTimeArr(
//     currentTime,
//     restaurantinfo,
//     windowEndTime,
//     isasap
//   );
//   if (!time || !windowMeridian) {
//     console.warn("Invalid time or meridian from getCheckTimeArr");
//     return false;
//   }

//   const [windowHour, windowMinute] = time.split(":");
//   const [currentHour, currentMinute, meridian] = convert24HourTo12Hour(currentTime);

//   const beginningTime = moment(`${currentHour}:${currentMinute}${meridian}`, "hh:mma");
//   const endTime = moment(`${windowHour}:${windowMinute}${windowMeridian.toLowerCase()}`, "hh:mma");

//   let isAvailable = beginningTime.isBefore(endTime);

//   if (
//     meridian.trim().toLowerCase() === "pm" &&
//     isLastOrder &&
//     windowMeridian.trim().toLowerCase() === "am"
//   ) {
//     isAvailable = true;
//   }

//   return isAvailable;
// };

// // last changes
// export const checkWindowTimeExpires = (
//   windowEndTime: string,
//   currentTime: string,
//   isasap: boolean = false,
//   restaurantinfo: GetAllRestaurantInfo,
//   isLastOrder: boolean = false
// ): boolean => {
//   const [time, windowMeridian] = getCheckTimeArr(
//     currentTime,
//     restaurantinfo,
//     windowEndTime,
//     isasap
//   );

//   //  Defensive check: empty or malformed response
//   if (
//     !time || !windowMeridian ||
//     typeof time !== "string" || typeof windowMeridian !== "string" ||
//     !time.includes(":")
//   ) {
//     console.warn("Invalid time or meridian from getCheckTimeArr", {
//       time,
//       windowMeridian,
//       input: { currentTime, windowEndTime, isasap, restaurantinfo },
//     });
//     return false;
//   }

//   const [windowHour, windowMinute] = time.split(":");

//   const [currentHour, currentMinute, meridian] =
//     convert24HourTo12Hour(currentTime);

//   const beginningTime = moment(
//     `${currentHour}:${currentMinute}${meridian}`,
//     "hh:mma"
//   );

//   const endTime = moment(
//     `${windowHour}:${windowMinute}${windowMeridian.toLowerCase()}`,
//     "hh:mma"
//   );

//   let isAvailable = beginningTime.isBefore(endTime);

//   if (
//     meridian.trim().toLowerCase() === "pm" &&
//     isLastOrder &&
//     windowMeridian.trim().toLowerCase() === "am"
//   ) {
//     isAvailable = true;
//   }

//   return isAvailable;
// };

export const checkWindowTimeExpires = (
  windowEndTime: string,
  currentTime: string,
  isasap: boolean = false,
  restaurantinfo: GetAllRestaurantInfo,
  isLastOrder: boolean = false
): boolean => {
  console.log("checkWindowTimeExpires called with:", {
    windowEndTime,
    currentTime,
    isasap,
    isLastOrder,
    restaurantinfo,
  });

  const [time, windowMeridian] = getCheckTimeArr(
    currentTime,
    restaurantinfo,
    windowEndTime,
    isasap
  );

  if (
    !time ||
    !windowMeridian ||
    typeof time !== "string" ||
    typeof windowMeridian !== "string" ||
    !time.includes(":")
  ) {
    console.warn("Invalid output from getCheckTimeArr:", {
      time,
      windowMeridian,
      input: { currentTime, windowEndTime, isasap, restaurantinfo },
    });
    return false;
  }

  const [windowHour, windowMinute] = time.split(":");
  const [currentHour, currentMinute, meridian] =
    convert24HourTo12Hour(currentTime);

  const beginningTime = moment(
    `${currentHour}:${currentMinute}${meridian}`,
    "hh:mma"
  );
  const endTime = moment(
    `${windowHour}:${windowMinute}${windowMeridian.toLowerCase()}`,
    "hh:mma"
  );

  let WindowTimeIsAvailable = beginningTime.isBefore(endTime);

  if (
    meridian.trim().toLowerCase() === "pm" &&
    isLastOrder &&
    windowMeridian.trim().toLowerCase() === "am"
  ) {
    WindowTimeIsAvailable = true;
  }

  return WindowTimeIsAvailable;
};

export const tipWarningMessage =
  "Please note drivers may decline or cancel a delivery if the tip amount is less than 15%";

export const getLocationFromUrl = (
  locationUrl: string,
  locationList: any,
  defaultLocation: AddressList
) => {
  let locationDetail = {
    isChangeLocation: false,
    location: {},
  };
  if (locationUrl === defaultLocation?.locationURL?.trim()) {
    locationDetail.isChangeLocation = false;
    locationDetail.location = defaultLocation;
  } else if (locationUrl !== defaultLocation?.locationURL?.trim()) {
    let getUrlLocation = locationList?.find(
      (location: DefaultLocation) => location?.locationURL === locationUrl
    );
    locationDetail.isChangeLocation = true;
    locationDetail.location = getUrlLocation;
  }

  return locationDetail;
};

export function getMenuItemdetailFormate(data: any) {
  const { PriceList, ...otherValue } = data;
  const menuitemdetaillist = {
    ...otherValue,
    size: [],
    topping: [],
  };
  const sizeDetail: any[] = [];
  data?.PriceList?.forEach((size: any) => {
    let sizeObj = {
      currency: size.currencysymbol,
      price: size.price,
      sizeselected: data?.PriceList[0].subparameterId === size?.subparameterId,
      subparameterId: size?.subparameterId,
      textsize: "",
      type: size?.type,
    };
    sizeDetail.push(sizeObj);
  });
  const topping: Topping[] = [];
  data?.PriceList?.forEach((size: any) => {
    let toppingObj = {
      subparameterId: size?.subparameterId,
      list: getSizeBaseOptionList(
        size?.OptionList,
        size?.subparameterId,
        data?.PriceList[0].currencysymbol
      ),
    };
    topping.push(toppingObj);
  });
  menuitemdetaillist.size = sizeDetail;
  menuitemdetaillist.topping = topping;
  return menuitemdetaillist;
}

export function getSizeBaseOptionList(
  PriceList: any,
  subparameterId: number,
  currencysymbol: string
) {
  function isUnique(item: any, index: any, array: any) {
    return (
      index ===
      array.findIndex((obj: any) => obj.parameterId === item.parameterId)
    );
  }
  const uniqueList = PriceList.filter(isUnique);
  let optionList: any = [];
  uniqueList.forEach((option: any) => {
    let OptionObj = {
      displayStatus: true,
      isCompulsory: option.isCompulsory,
      isHalfPizza: option?.ishalfpizza,
      maxSelection: option?.maxselection,
      multipleSelectStatus: option?.isMultiselect,
      name: option?.labelText,
      optionId: option?.parameterId,
      optionselected: uniqueList[0]?.parameterId === option?.parameterId,
      priceStatus: option?.hasPrice, //need ask
      selectAllStatus: option?.isSelectAll,
      subparameterId: subparameterId,
      toppingPriceForHalfPizza: option?.halfpizzaprice, //nedd ask
      toppingValue: option?.toppingvalue,
      halfPizzaPriceToppingPercentage: option?.halfpizzaprice ?? 0,
      type: getOptionBaseType(PriceList, option, currencysymbol),
    };
    optionList.push(OptionObj);
  });
  return optionList;
}

function getOptionBaseType(PriceList: any, option: any, currencysymbol: any) {
  const filteredSubOptionList = PriceList.filter(
    (suboption: any) => suboption?.parameterId === option?.parameterId
  );
  const subOptionList: any = [];
  filteredSubOptionList.forEach((subOption: any) => {
    let subOptionObj = {
      cals: subOption?.calorie,
      currency: currencysymbol,
      defaultSelection: "",
      halfPizzaPriceToppingPercentage: subOption?.halfpizzaprice,
      halfpizzaprice: subOption?.halfpizzaprice,
      image: subOption?.suboptionimg,
      name: subOption?.type,
      optionId: option?.parameterId,
      price: subOption?.price,
      pizzaside: subOption.pizzaside,
      subOptionToppingQuantity: subOption?.toppingquantity,
      subOptionselected: false,
      suboptionId: subOption?.typeid,
      suboptioncategoryname: subOption?.suboptioncategory,
      suboptionmaxselection: subOption?.suboptionmaxselection,
      toppingValue: subOption?.toppingvalue,
    };

    subOptionList.push(subOptionObj);
  });
  return subOptionList;
}

export const generateTableName = (
  restaurantId: number,
  locationId: number,
  env: any
) => {
  switch (env) {
    case "development":
      return `AllocatedTablesDev${restaurantId}_${locationId}`;
    case "production":
      return `AllocatedTables${restaurantId}_${locationId}`;
    default:
      return `AllocatedTablesDev${restaurantId}_${locationId}`;
  }
};

export function getCustomerDetails(
  user: LoggedInUser,
  tableDetail: any,
  serverId: number = 0
) {
  let customerId = user?.customerId ?? user?.othercustomerId;
  const userName = user.firstName ?? user?.firstname;
  const lastName = user.lastName ?? user?.lastname;
  const tableDetailObj = getTableOrderDetailObj(tableDetail, serverId);
  const userObjKey = userName === "Guest" ? "Customer" : "OtherCustomer";
  const obj = {
    [userObjKey]: {
      [customerId]: {
        customerId: customerId,
        emailId: "",
        firstname: userName,
        lastname: lastName,
        loyaltynumber: "",
        mobile: "",
        password: "",
        phone: user.phone,
        posTimeStamp: Date.now(),
        totalRewardPoints: 0,
      },
    },
    ...tableDetailObj,
    addressId: 0,
    appType: "dev",
    // appVersion: "1.3.3, 120",
    asap: true,
    cardAmount: 0,
    cardbrand: "",
    cardtype: "",
    cashAmount: 0,
    cateringDepositCard: 0,
    cateringDepositCash: 0,
    cateringDepositVal: "",
    cateringMessage: "",
    cateringTenderedCard: 0,
    cateringTenderedCash: 0,
    cateringTip1Card: 0,
    cateringTip1Cash: 0,
    cusTime: moment(Date.now()).format("hh:mm a"),
    customMins: "",
    customerId: customerId,
    customerName: userName,
    deliveryCharges: 0,
    deliveryDistance: 0,
    discount: 0,
    discountPer: 0,
    firebaseInstanceId: "",
    gratuityPercent: 0,
    inTime: moment(Date.now()).format("hh:mm a"),
    isCustomDeliveryCharges: false,
    isOtherCustomer: true,
    isToSetCurrentDeviceTag: false,
    isToSplit: false,
    isToSplitEqually: false,
    kitchenComments: "",
    lastChangedOn: 1708039888720,
    lastUpdateByUser: "306",
    lastUpdatedAt: 1269052044414099,
    // locationId: 265,
    // noOfPersons: 1,
    paymentMode: 0,
    persons: 1,
    posOrderType: "Dine-In",
    posTimeStamp: Date.now(),
    posorderreferencenumner: "1708039647189",
    redeemAmount: 0,
    redeemPoints: 0,
    // restaurantId: 33,
    // serverId: 306,
    splitTableName: "",
    tableNo: tableDetail.tableno,
    tendered: 0,
    tip1: 0,
    tip1Card: 0,
    tip1Cash: 0,
    tip2: 0,
    // token: "du5B-ChgTrCSsauqXJKFGb:APA91bEAiJW2hSnyVhXF3I61sqCDxr8hBIDLHH3FVXvXPBeD5ElIxsD0DecMEFLHcjx8zxdFXv7CsJ16URxk7Mybfa6NAbLz0wN2w5ltXLv9nzzWsqc07DPNIQ8hf5hCuvDUibZmLgM2",
    totalAmount: 0.6500000953674316,
    versionCode: 120,
    versionName: getVersion(), //add dynamic
  };
  return obj;
}
export function getTableOrderDetailObj(tableDetail: any, serverId: any = 0) {
  const obj = {
    tableId: tableDetail?.tableId,
    appVersion: 0,
    noOfPersons: 0,
    restaurantId: tableDetail?.restaurantId,
    serverId: serverId,
    locationId: tableDetail?.locationId,
    timestamp: Date.now(),
    token: "",
  };
  return obj;
}

export const getEditItemKey = (cartData: any, menuItemId: any) => {
  const ItemKey = cartData && Object.values(cartData).findIndex(menuItemId);
};

export const pushNotificationType = {
  TABLE_SEND_TO_KITCHEN: "tblsendtokitchenstation",
  TABLE_ORDER_READY_TO_PAY: "tblorderpaymentreadytopay",
  TABLE_ORDER_NEED_HELP: "tblorderneedhelp",
};

export const NotificationSettingTypes = {
  RESTAURANT: 1,
  DRIVER: 2,
  MANAGER: 3,
  POS: 4,
};

export const calculateFinalCount = (
  subOptionList: Type[],
  selectedOption: List
) => {
  //debugger;
  console.log("subOptionList from calculateFinalCount", subOptionList);
  console.log("selectedOption from calculateFinalCount", selectedOption);
  let finalcount = 0;
  var toppingcount = subOptionList?.filter((x) => x.subOptionselected === true);
  toppingcount?.map((tc) => {
    var topvalue =
      tc.toppingValue === "" || parseInt(tc.toppingValue) === 0
        ? 1
        : parseInt(tc.toppingValue);
    var calculatedtopvalue =
      selectedOption.isHalfPizza === true &&
      (tc.pizzaside === "L" || tc.pizzaside === "R")
        ? topvalue *
          (tc?.halfPizzaPriceToppingPercentage ||
          tc.halfPizzaPriceToppingPercentage === 0
            ? 1
            : tc.halfPizzaPriceToppingPercentage / 100)
        : topvalue;
    finalcount = finalcount + tc.subOptionToppingQuantity * calculatedtopvalue;
  });
  //console.log("final count from calculate final count", finalcount);
  return finalcount;
};

export const calculateFinalCountWithPaid = (
  subOptionList: Type[],
  selectedOption: List
) => {
  let finalcount = 0;

  const toppingcount = subOptionList?.filter(
    (x: any) => x.subOptionselected === true
  );

  toppingcount?.forEach((tc: any) => {
    const topvalue =
      tc.toppingValue === "" || parseInt(tc.toppingValue) === 0
        ? 1
        : parseInt(tc.toppingValue);

    const calculatedtopvalue =
      selectedOption.isHalfPizza === true &&
      (tc.pizzaside === "L" || tc.pizzaside === "R")
        ? topvalue *
          (tc.halfPizzaPriceToppingPercentage === "" ||
          parseInt(tc.halfPizzaPriceToppingPercentage) === 0
            ? 1
            : parseInt(tc.halfPizzaPriceToppingPercentage) / 100)
        : topvalue;

    const paidQty = parseInt(tc.paidQty) || 0;
    const subQty = parseInt(tc.subOptionToppingQuantity) || 0;
    const payableQty = Math.max(subQty - paidQty, 0); // only count paid portion

    finalcount += payableQty * calculatedtopvalue;
  });

  return finalcount;
};

export const calculateFinalCountTable = (
  subOptionList: Type[],
  selectedOption: List
) => {
  let finalcount = 0;
  var toppingcount = subOptionList?.filter(
    (x: any) => x.subOptionselected === true
  );
  toppingcount?.map((tc: any) => {
    var topvalue =
      tc.toppingValue === "" || parseInt(tc.toppingValue) === 0
        ? 1
        : parseInt(tc.toppingValue);
    var calculatedtopvalue =
      selectedOption.isHalfPizza === true &&
      (tc.pizzaside === "L" || tc.pizzaside === "R")
        ? topvalue *
          (tc.halfpizzaprice === "" || parseInt(tc.halfpizzaprice) === 0
            ? 1
            : parseInt(tc.halfpizzaprice) / 100)
        : topvalue;
    finalcount = finalcount + tc.subOptionToppingQuantity * calculatedtopvalue;
  });
  return finalcount;
};

export const convertOptionToStrList = (...optionList: any) => {
  const optionStrList: any = [];
  optionList?.map((item: any) => {
    const str = item?.reduce(
      (acc: any, cur: any, index: any) =>
        ` ${(acc += `${cur.quantity + cur.paidQty}x ${cur.title}${
          index === item.length - 1 ? "" : ","
        }${" "}`)}`,
      ""
    );
    optionStrList.push(str);
  });
  return optionStrList;
};
export const convertOptionToStrListTo = (...optionList: any) => {
  const optionStrList: any = [];
  optionList?.map((item: any) => {
    const str = item?.reduce(
      (acc: any, cur: any, index: any) =>
        ` ${(acc += `${cur.toppingquantity + cur.paidQty}x ${cur.type}${
          index === item.length - 1 ? "" : ","
        }${" "}`)}`,
      ""
    );
    optionStrList.push(str);
  });
  return optionStrList;
};

export const OS_TYPE = {
  ANDROID: {
    name: "android",
    value: 1,
  },
  APPLE: {
    name: "apple",
    value: 2,
  },
  OTHER: {
    name: "other",
    value: 0,
  },
};
export function checkOsType() {
  var type = OS_TYPE.OTHER.value;
  if (navigator.userAgent.indexOf("Win") != -1) type = OS_TYPE.OTHER.value;
  // "Windows OS";
  if (navigator.userAgent.indexOf("Mac") != -1) type = OS_TYPE.APPLE.value;
  // "Macintosh";
  if (navigator.userAgent.indexOf("Linux") != -1) type = OS_TYPE.OTHER.value;
  // "Linux OS";
  if (navigator.userAgent.indexOf("Android") != -1)
    type = OS_TYPE.ANDROID.value;
  if (navigator.userAgent.indexOf("like Mac") != -1) type = OS_TYPE.APPLE.value;
  // "iOS";

  return type;
}

export const getDependentParentQty = (
  cartItems: any,
  item: any,
  index: any
) => {
  let qty = 0;
  if (item?.dependentmenuitemid > 0) {
    const startItems = cartItems?.slice(0, index + 1) ?? [];
    for (let index = startItems.length; index > 0; index--) {
      const element = startItems[index - 1];
      if (item?.dependentmenuitemid === element.menuitemid) {
        qty = element?.qty;
        break;
      }
    }
  }

  return qty;
};

export const getHalfArrayLength = (arr: any) => {
  const leftArray: any = [];
  const rightArray: any = [];
  const isOddNum = arr % 2 !== 0;
  const halfLength = isOddNum ? (arr?.length + 1) / 2 : arr?.length / 2;

  arr.map((item: any, index: any) => {
    if (index + 1 < halfLength) {
      leftArray.push(item);
    } else {
      rightArray.push(item);
    }
  });
  return [leftArray, rightArray];
};

export const checkDisableWindow = (
  timeWindow: any,
  enableFutureOrdering: any,
  day: any
) => {
  let isEnable = true;
  if (timeWindow && timeWindow.length === 0 && !enableFutureOrdering) {
    isEnable = false;
  }
  if (
    enableFutureOrdering &&
    day === "Today" &&
    timeWindow &&
    timeWindow.length === 0
  ) {
    isEnable = false;
  }

  return isEnable;
};

export const WEB_URL_LINK = {
  WEB_APP: "https://www.foodcore.tech",
};

export const CUSTOMER_TYPE = {
  REGULAR: 0,
  SUBSCRIBE: 1,
  DISCOUNT: 2,
};

export function closeModal(myclass: any) {
  $(`.${myclass}`).click();
  //document.getElementsByClassName(myclass).click();
  return;
}
export const GetCurrency = () => {
  const restaurantinfo = useSelector(
    ({ restaurant }: any) => restaurant?.restaurantdetail
  );
  const location = restaurantinfo?.defaultLocation;
  return location?.currencysymbol;
};

export const PAYMENT_TYPE = {
  CASH: {
    text: "Pay by Cash",
    value: 1,
  },
  CARD: {
    text: "Pay by Card",
    value: 2,
  },
};

export function scrollToElementWithOffset(elementId: any): void {
  const element = document.getElementById(elementId);
  if (!element) {
    return;
  }
  const offset = 120; // Adjust this value as needed
  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}

type DebouncedFunction = (...args: unknown[]) => void;

export function debounce(
  func: DebouncedFunction,
  delay: number
): DebouncedFunction {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: any): void {
    // Clear the existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout
    timeoutId = setTimeout(() => {
      func.apply(this, args); // Call the function with the correct `this` and arguments
    }, delay);
  };
}

export const TOOLTIP_MSG = {
  QUICKORDER: "click for quick order",
  ADDTOCART_BTN: "Add to cart",
  SHARE_ITEM: "Share item",
  ADD_TO_FAV: "Add to favourites",
};

export const PAYMENT_VIEW = {
  WEBVIEW: "webview",
  EXTERNAL: "external",
};

export const groupOption = (items: any) => {
  const groupedOptions: any = {};

  items.forEach((item: any) => {
    const optionId = item.optionId;
    if (!groupedOptions[optionId]) {
      groupedOptions[optionId] = {
        optionId: optionId,
        suboptions: [],
      };
    }
    groupedOptions[optionId].suboptions.push(item);
  });

  // Convert grouped object to array if needed
  return Object.values(groupedOptions);
};

export const calculateNettotal = (
  lstcarttopping: Type[],
  selectedsize: Size[],
  quantity: number,
  menuItemDetail: GetMenuItemDetail
) => {
  const selectedTopping =
    menuItemDetail &&
    Object.keys(menuItemDetail).length > 0 &&
    menuItemDetail?.topping?.find(
      (size) => size?.subparameterId === selectedsize?.[0]?.subparameterId
    );
  let fsum = 0;

  if (lstcarttopping && lstcarttopping.length > 0) {
    lstcarttopping.forEach((data) => {
      const selectedOption =
        selectedTopping &&
        selectedTopping?.list?.find(
          (option) => option?.optionId === data?.optionId
        );
      const paidQty = data.paidQty || 0; // Only this many need to be paid
      if (paidQty > 0) {
        const unitPrice =
          data.pizzaside === "L" || data.pizzaside === "R"
            ? parseFloat((data.price * 0.5).toFixed(2))
            : data.price;

        fsum += unitPrice * paidQty; // only charge for paidQty
      } else if (
        (paidQty === 0 &&
          selectedOption &&
          selectedOption?.freeToppingsCount === 0) ||
        (selectedOption && !selectedOption?.multipleSelectStatus)
      ) {
        fsum =
          fsum +
          (data.pizzaside === "L" || data.pizzaside === "R"
            ? parseFloat((data.price * 0.5).toFixed(2))
            : data.price) *
            data.subOptionToppingQuantity;
      } else {
      }
    });
  }

  let total =
    selectedsize && selectedsize.length > 0 ? selectedsize[0].price + fsum : 0;

  let nettotal = total * quantity;

  return nettotal;
};
