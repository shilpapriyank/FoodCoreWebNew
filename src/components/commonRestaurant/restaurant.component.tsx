"use client";

import React, { useEffect, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { useParams, usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import {
  ThemeObj,
  dynamicColorObj,
  getVersion,
  clearCache,
  getorigin,
  formatStringToURLWithBlankSpace,
  getUserLoginExpiryTime,
  handleDefaultDynamicFieldColor,
  GetThemeDetails,
  GetThemeDetailsByName,
} from "../common/utility";
import {
  setLocationIdInStorage,
  setRestaurantIdInStorage,
  setRestaurantNameInStorage,
  getLocationIdFromStorage,
  getRestaurantIdFromStorage,
} from "../common/localstore";
import { RestaurantsServices } from "../../../redux/restaurants/restaurants.services";
// import { v4 as uuidv4 } from "uuid";
import { useReduxData } from "../customhooks/useredux-data-hooks";
import {
  restaurantsdetail,
  setAppVersion,
} from "../../../redux/restaurants/restaurants.slice";
import { PAGES } from "../nt/common/pages";
import RestaurantClosedmComponent from "./restaurant-closedm.component";
import RestaurantCloseComponent from "./restaurant-close.componet";
import RestaurantInvalidDMComponent from "./restaurant-invalid.component";
import RestaurantNotExist from "./restaurant-not-exist.component";
import SEOComponent from "../common/seo.component";
import useLoadCatData from "../customhooks/useloadcatdata-hook";
import { clearRedux } from "../../../redux/clearredux/clearredux.slice";
import { createSessionId } from "../../../redux/session/session.slice";
import { getSelectedRestaurantTime } from "../../../redux/main/main.slice";
import useFutureOrder from "../customhooks/usefuture-order-hook";
import { setrewardpoint } from "../../../redux/rewardpoint/rewardpoint.slice";
import { logout } from "../../../redux/login/login.slice";
import { useAppDispatch } from "../../../redux/hooks";
import { ColorStyleType } from "@/types/common-types/common.types";
import { AddressList } from "@/types/location-types/location.type";
import {
  GetAllRestaurantInfo,
  Seodetails,
} from "@/types/restaurant-types/restaurant.type";

interface Props {
  children: ReactNode;
  metaDataRestaurant?: Seodetails;
  themetype?: string;
}

const RestaurantComponent = ({
  children,
  metaDataRestaurant,
  themetype,
}: Props) => {
  const { restaurant, cart, metadata, category, userinfo, order, sessionid } =
    useReduxData();
  const customerId: number = userinfo ? userinfo.customerId : 0;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  let sessionId = sessionid;
  const dispatch = useAppDispatch();
  const [loadrestaurant, setLoadrestaurant] = useState<boolean>(false);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<GetAllRestaurantInfo | null>(null);
  const [adresslist, setadresslist] = useState<boolean>(false);
  const [isResturantClose, setisResturantClose] = useState<boolean>(false);
  const [isInvalidRestaurant, setisInvalidRestaurant] =
    useState<boolean>(false);
  const [themeUrl, setthemeUrl] = useState<string>("");
  const [loadPaymentScreen, setloadPaymentScreen] = useState<boolean>(false);
  const restaurantinfo = restaurant.restaurantdetail;
  const restaurantslocationlist = restaurant.restaurantslocationlist;
  const { loadCatData } = useLoadCatData(customerId);
  const restaurantslocationlistwithtime =
    restaurant.restaurantslocationlistwithtime;
  const appVersion = restaurant?.appversion;
  const categoryitemlist = category.categoryitemlist;
  const dynamic = params.dynamic;
  const location = params.location;
  const metaData = metadata?.metadata;
  let restaurantname =
    metaDataRestaurant && metaDataRestaurant?.restaurantname !== ""
      ? metaDataRestaurant.restaurantname
      : restaurantinfo?.restaurantname;
  let restaurantlogo =
    metaDataRestaurant && metaDataRestaurant?.imageurl !== ""
      ? metaDataRestaurant.imageurl
      : restaurantinfo?.logo;

  let selectedTheme = GetThemeDetails(restaurantinfo?.themetype as number);

  const seoDefaultData = {
    title: `Online Ordering || ${restaurantname}`,
    description: "Online Ordering",
    image: restaurantlogo,
    url: `${getorigin()}${pathname}`,
  };
  const { enabletimeslot, futureDays, isFutureOrder } = useFutureOrder();
  const isGetSeo =
    pathname.includes("[category]") || pathname.includes("[items]");

  const handleSetThemeStyleDynamic = (
    newselectedRestaurant: GetAllRestaurantInfo
  ) => {
    newselectedRestaurant?.restaurantColorModel?.push({
      FieldName: "color",
      Color: newselectedRestaurant.color,
      FieldType: newselectedRestaurant?.restaurantColorModel[0]?.FieldType,
      StyleName: newselectedRestaurant?.restaurantColorModel[0]?.StyleName,
    });
    const colorStyleArray = handleDefaultDynamicFieldColor(
      newselectedRestaurant?.color,
      String(newselectedRestaurant?.themetype)
    );

    for (const [key, value] of Object.entries(dynamicColorObj)) {
      const defaultStyle = colorStyleArray.find(
        (field: ColorStyleType) => field.FieldName === key
      );
      const restaurantStyle = newselectedRestaurant?.restaurantColorModel?.find(
        (field: ColorStyleType) => field.FieldName === key
      );
      const color = restaurantStyle?.Color || defaultStyle?.Color;
      document.documentElement.style.setProperty(value, color as string);
    }
  };

  const handleValidResponse = async (
    response: GetAllRestaurantInfo[],
    dynamic: string,
    router: ReturnType<typeof useRouter>
  ) => {
    let restaurantId = getRestaurantIdFromStorage();
    var isSameRestaurant;
    const newselectedRestaurant = response[0];
    if (newselectedRestaurant?.defaultLocation === null) {
      handleSetThemeStyleDynamic(newselectedRestaurant);
      let selectedTheme = GetThemeDetails(newselectedRestaurant?.themetype);
      setthemeUrl(selectedTheme?.url as string);
      dispatch(restaurantsdetail(newselectedRestaurant));
      router.push(
        `/${selectedTheme?.url as string}/${dynamic}/${PAGES.REST_CLOSE}`
      );
      setisResturantClose(true);
    } else {
      handleSetThemeStyleDynamic(newselectedRestaurant);
      isSameRestaurant = newselectedRestaurant.restaurantId === restaurantId;
      const path = pathname.split("/");
      const tableOrderTheme = GetThemeDetails(201);
      const isTableOrderTheme = path.includes(tableOrderTheme?.url as string);
      if (!isSameRestaurant) {
        dispatch(clearRedux(true) as any);
        let rewardpoints = {
          rewardvalue: 0,
          rewardamount: 0,
          rewardPoint: 0,
          totalRewardPoints: 0,
          redeemPoint: 0,
        };
        dispatch(setrewardpoint(rewardpoints));
        dispatch(logout());
        let id = uuidv4();
        dispatch(createSessionId(id));
      } else {
        if (sessionId === null || sessionId === undefined) {
          let id = uuidv4();
          dispatch(createSessionId(id));
        }
      }
      const locationId =
        newselectedRestaurant.defaultlocationId > 0
          ? newselectedRestaurant.defaultlocationId
          : newselectedRestaurant?.defaultLocation?.locationId;
      setLocationIdInStorage(locationId);
      setRestaurantIdInStorage(newselectedRestaurant.restaurantId);
      setRestaurantNameInStorage(newselectedRestaurant.restaurantname);
      const loadCat = await loadCatData({
        newselectedRestaurant,
        isTableOrderTheme,
        categoryitemlist,
      });
      if (loadCat) {
        if (isTableOrderTheme) {
          newselectedRestaurant.themetype = tableOrderTheme?.value as number;
        }
        dispatch(restaurantsdetail(newselectedRestaurant));
        setSelectedRestaurant(newselectedRestaurant);
        dispatch(
          getSelectedRestaurantTime({
            restaurantId: newselectedRestaurant.restaurantId,
            locationId: newselectedRestaurant.defaultlocationId,
          }) as any
        );

        if (
          cart?.cartitemdetail?.cartDetails?.cartItemDetails[0] !== undefined
        ) {
          if (
            cart?.cartitemdetail?.cartDetails?.cartItemDetails[0]
              ?.restaurantId !== newselectedRestaurant.restaurantId &&
            cart?.cartitemdetail?.cartDetails?.cartItemDetails[0]
              ?.locationid !== newselectedRestaurant.defaultLocation.locationId
          ) {
            //dispatch(emptycart());
          }
        }
        setLoadrestaurant(true);
      }
    }
  };

  const handleInvalidRestaurant = (themetype: string) => {
    setisInvalidRestaurant(true);
    const selectedTheme = GetThemeDetailsByName(themetype);
    setthemeUrl(selectedTheme?.url as string);
  };

  useEffect(() => {
    if (pathname !== "/home" && !pathname.includes(ThemeObj.FD123456)) {
      if (dynamic && typeof dynamic === "string") {
        const restauranturl = dynamic.toLowerCase().replace(/ /g, "-");
        const locationurl =
          location?.toString().toLowerCase().replace(/ /g, "-") || "";
        const defaultlocationId = getLocationIdFromStorage();
        RestaurantsServices.getRestaurantsList(
          restauranturl,
          locationurl,
          defaultlocationId
        ).then((response) => {
          if (response && response.length > 0) {
            handleValidResponse(response, dynamic, router);
          } else {
            handleInvalidRestaurant(themetype as string);
          }
        });
      }
    }
    if (pathname.includes(ThemeObj.FD123456)) {
      setloadPaymentScreen(true);
    }
  }, [dynamic]);

  // const fetchData = async () => {
  //   try {
  //     setLoadrestaurant(false);
  //     let getResponse;
  //     if (selectedTheme.name === ThemeObj.default) {
  //       getResponse = await restaurantsLocation(
  //         restaurantinfo && restaurantinfo.restaurantId
  //       );
  //       dispatch({
  //         type: RestaurantsTypes.RESTAURANT_LOCATION_LIST,
  //         payload: getResponse,
  //       });
  //     } else {
  //       getResponse = await restaurantsAllLocation(
  //         restaurantinfo && restaurantinfo.restaurantId
  //       );
  //       dispatch({
  //         type: RestaurantsTypes.RESTAURANT_LOCATION_LIST_WITH_TIME,
  //         payload: getResponse,
  //       });
  //     }
  //     dispatch(
  //       restaurantstiming(
  //         restaurantinfo && restaurantinfo.defaultlocationId,
  //         restaurantinfo && restaurantinfo.restaurantId
  //       )
  //     );
  //     setadresslist(true);
  //   } catch (error) {
  //     console.error("Error fetching restaurant data:", error);
  //   }
  // };

  // IF ADDRESSLIST IS IS EMPTY AND USER DIRECT PUT THE WRONG LOCATION IN THE URL THEN CHECK THE LOCATION IS EXIST IN THE RESTAURANT

  useEffect(() => {
    if (!pathname.includes(ThemeObj.FD123456)) {
      if (
        location !== undefined &&
        restaurantinfo?.defaultLocation !== undefined &&
        restaurantinfo?.defaultLocation !== null &&
        restaurantslocationlist?.addressList !== null
      ) {
        //fetchData();
      }

      let userLoginExpire = getUserLoginExpiryTime();
      const restaurantId = getRestaurantIdFromStorage();
      if (
        restaurantinfo?.restaurantId !== restaurantId ||
        (userinfo !== null && userLoginExpire == true)
      ) {
        dispatch(clearRedux(true) as any);
        let rewardpoints = {
          rewardvalue: 0,
          rewardamount: 0,
          rewardPoint: 0,
          totalRewardPoints: 0,
          redeemPoint: 0,
        };
        dispatch(setrewardpoint(rewardpoints));
        dispatch(logout());
        let id = uuidv4();
        dispatch(createSessionId(id));
      }
    }
  }, [restaurantinfo]);

  useEffect(() => {
    if (adresslist === true && pathname.includes(ThemeObj.FD123456)) {
      let addressList =
        selectedTheme?.name === ThemeObj.default
          ? restaurantslocationlist?.addressList
          : restaurantslocationlistwithtime?.addressList;
      if (restaurantslocationlist?.addressList !== undefined) {
        let linkLoacationurl = formatStringToURLWithBlankSpace(
          location as string
        );
        addressList?.map((locations: AddressList) => {
          let locationURL = formatStringToURLWithBlankSpace(
            locations.locationURL
          );
          if (linkLoacationurl === locationURL) {
            setLoadrestaurant(true);
          }
        });
      }
    }
  }, [adresslist]);

  useEffect(() => {
    if (appVersion !== getVersion() && !pathname.includes(ThemeObj.FD123456)) {
      clearCache();
      dispatch(setAppVersion(getVersion()));
    }
  }, [appVersion]);

  return (
    <>
      {!loadPaymentScreen && (
        <SEOComponent
          title={isGetSeo ? metaData?.title : seoDefaultData?.title}
          ogUrl={metaData?.url}
          description={
            isGetSeo ? metaData?.description : seoDefaultData.description
          }
          ogImgUrl={isGetSeo ? metaData?.image : seoDefaultData.image}
        />
      )}
      {loadrestaurant && selectedRestaurant && children}
      {(pathname === "/home" || pathname === "/" || pathname === "") &&
        children}
      {loadPaymentScreen && children}
      {isResturantClose &&
        (themeUrl === "dm" ? (
          <RestaurantClosedmComponent />
        ) : (
          <RestaurantCloseComponent />
        ))}
      {isInvalidRestaurant &&
        (themeUrl === "dm" ? (
          <RestaurantInvalidDMComponent />
        ) : (
          <RestaurantNotExist />
        ))}
    </>
  );
};

export default dynamic(() => Promise.resolve(React.memo(RestaurantComponent)), {
  ssr: true,
});

// "use client";

// import React, { useEffect, useState, ReactNode } from "react";
// import { v4 as uuidv4 } from "uuid";
// import { useParams, usePathname, useRouter } from "next/navigation";
// import dynamic from "next/dynamic";
// import {
//   ThemeObj,
//   dynamicColorObj,
//   getVersion,
//   clearCache,
//   getorigin,
//   formatStringToURLWithBlankSpace,
//   getUserLoginExpiryTime,
//   handleDefaultDynamicFieldColor,
//   GetThemeDetails,
//   GetThemeDetailsByName,
// } from "../common/utility";
// import {
//   setLocationIdInStorage,
//   setRestaurantIdInStorage,
//   setRestaurantNameInStorage,
//   getLocationIdFromStorage,
//   getRestaurantIdFromStorage,
// } from "../common/localstore";
// import { RestaurantsServices } from "../../../redux/restaurants/restaurants.services";
// // import { v4 as uuidv4 } from "uuid";
// import { useReduxData } from "../customhooks/useredux-data-hooks";
// import {
//   restaurantsdetail,
//   setAppVersion,
// } from "../../../redux/restaurants/restaurants.slice";
// import { PAGES } from "../nt/common/pages";
// import RestaurantClosedmComponent from "./restaurant-closedm.component";
// import RestaurantCloseComponent from "./restaurant-close.componet";
// import RestaurantInvalidDMComponent from "./restaurant-invalid.component";
// import RestaurantNotExist from "./restaurant-not-exist.component";
// import SEOComponent from "../common/seo.component";
// import useLoadCatData from "../customhooks/useloadcatdata-hook";
// import { clearRedux } from "../../../redux/clearredux/clearredux.slice";
// import { createSessionId } from "../../../redux/session/session.slice";
// import { getSelectedRestaurantTime } from "../../../redux/main/main.slice";
// import useFutureOrder from "../customhooks/usefuture-order-hook";
// import { setrewardpoint } from "../../../redux/rewardpoint/rewardpoint.slice";
// import { logout } from "../../../redux/login/login.slice";
// import { useAppDispatch } from "../../../redux/hooks";
// import { ColorStyleType } from "@/types/common-types/common.types";
// import { AddressList } from "@/types/location-types/location.type";
// import {
//   GetAllRestaurantInfo,
//   Seodetails,
// } from "@/types/restaurant-types/restaurant.type";

// interface Props {
//   children: ReactNode;
//   metaDataRestaurant?: Seodetails;
//   themetype?: string;
// }

// const RestaurantComponent = ({
//   children,
//   metaDataRestaurant,
//   themetype,
// }: Props) => {
//   const { restaurant, cart, metadata, category, userinfo, order, sessionid } =
//     useReduxData();
//   const customerId: number = userinfo ? userinfo.customerId : 0;
//   const router = useRouter();
//   const pathname = usePathname();
//   const params = useParams();
//   let sessionId = sessionid;
//   const dispatch = useAppDispatch();
//   const [loadrestaurant, setLoadrestaurant] = useState<boolean>(false);
//   const [selectedRestaurant, setSelectedRestaurant] =
//     useState<GetAllRestaurantInfo | null>(null);
//   const [adresslist, setadresslist] = useState<boolean>(false);
//   const [isResturantClose, setisResturantClose] = useState<boolean>(false);
//   const [isInvalidRestaurant, setisInvalidRestaurant] =
//     useState<boolean>(false);
//   const [themeUrl, setthemeUrl] = useState<string>("");
//   const [loadPaymentScreen, setloadPaymentScreen] = useState<boolean>(false);
//   const restaurantinfo = restaurant.restaurantdetail;
//   const restaurantslocationlist = restaurant.restaurantslocationlist;
//   const { loadCatData } = useLoadCatData(customerId);
//   const restaurantslocationlistwithtime =
//     restaurant.restaurantslocationlistwithtime;
//   const appVersion = restaurant?.appversion;
//   const categoryitemlist = category.categoryitemlist;
//   const dynamic = params.dynamic;
//   const location = params.location;
//   const metaData = metadata?.metadata;
//   let restaurantname =
//     metaDataRestaurant && metaDataRestaurant?.restaurantname !== ""
//       ? metaDataRestaurant.restaurantname
//       : restaurantinfo?.restaurantname;
//   let restaurantlogo =
//     metaDataRestaurant && metaDataRestaurant?.imageurl !== ""
//       ? metaDataRestaurant.imageurl
//       : restaurantinfo?.logo;

//   let selectedTheme = GetThemeDetails(restaurantinfo?.themetype as number);

//   const seoDefaultData = {
//     title: `Online Ordering || ${restaurantname}`,
//     description: "Online Ordering",
//     image: restaurantlogo,
//     url: `${getorigin()}${pathname}`,
//   };
//   const { enabletimeslot, futureDays, isFutureOrder } = useFutureOrder();
//   const isGetSeo =
//     pathname.includes("[category]") || pathname.includes("[items]");

//   const handleSetThemeStyleDynamic = (
//     newselectedRestaurant: GetAllRestaurantInfo
//   ) => {
//     newselectedRestaurant?.restaurantColorModel?.push({
//       FieldName: "color",
//       Color: newselectedRestaurant.color,
//       FieldType: newselectedRestaurant?.restaurantColorModel[0]?.FieldType,
//       StyleName: newselectedRestaurant?.restaurantColorModel[0]?.StyleName,
//     });
//     const colorStyleArray = handleDefaultDynamicFieldColor(
//       newselectedRestaurant?.color,
//       String(newselectedRestaurant?.themetype)
//     );

//     for (const [key, value] of Object.entries(dynamicColorObj)) {
//       const defaultStyle = colorStyleArray.find(
//         (field: ColorStyleType) => field.FieldName === key
//       );
//       const restaurantStyle = newselectedRestaurant?.restaurantColorModel?.find(
//         (field: ColorStyleType) => field.FieldName === key
//       );
//       const color = restaurantStyle?.Color || defaultStyle?.Color;
//       document.documentElement.style.setProperty(value, color as string);
//     }
//   };

//   const handleValidResponse = async (
//     response: GetAllRestaurantInfo[],
//     dynamic: string,
//     router: ReturnType<typeof useRouter>
//   ) => {
//     let restaurantId = getRestaurantIdFromStorage();
//     var isSameRestaurant;
//     const newselectedRestaurant = response[0];
//     if (newselectedRestaurant?.defaultLocation === null) {
//       handleSetThemeStyleDynamic(newselectedRestaurant);
//       let selectedTheme = GetThemeDetails(newselectedRestaurant.themetype);
//       setthemeUrl(selectedTheme?.url as string);
//       dispatch(restaurantsdetail(newselectedRestaurant));
//       router.push(`/${selectedTheme?.url}/${dynamic}/${PAGES.REST_CLOSE}`);
//       setisResturantClose(true);
//     } else {
//       handleSetThemeStyleDynamic(newselectedRestaurant);
//       isSameRestaurant = newselectedRestaurant.restaurantId === restaurantId;
//       const path = pathname.split("/");
//       const tableOrderTheme = GetThemeDetails(201);
//       const isTableOrderTheme = path.includes(tableOrderTheme?.url as string);
//       if (!isSameRestaurant) {
//         dispatch(clearRedux(true) as any);
//         let rewardpoints = {
//           rewardvalue: 0,
//           rewardamount: 0,
//           rewardPoint: 0,
//           totalRewardPoints: 0,
//           redeemPoint: 0,
//         };
//         dispatch(setrewardpoint(rewardpoints));
//         dispatch(logout());
//         let id = uuidv4();
//         dispatch(createSessionId(id));
//       } else {
//         if (sessionId === null || sessionId === undefined) {
//           let id = uuidv4();
//           dispatch(createSessionId(id));
//         }
//       }
//       const locationId =
//         newselectedRestaurant.defaultlocationId > 0
//           ? newselectedRestaurant.defaultlocationId
//           : newselectedRestaurant?.defaultLocation?.locationId;
//       setLocationIdInStorage(locationId);
//       setRestaurantIdInStorage(newselectedRestaurant.restaurantId);
//       setRestaurantNameInStorage(newselectedRestaurant.restaurantname);
//       const loadCat = await loadCatData({
//         newselectedRestaurant,
//         isTableOrderTheme,
//         categoryitemlist,
//       });
//       if (loadCat) {
//         if (isTableOrderTheme) {
//           newselectedRestaurant.themetype = tableOrderTheme?.value as number;
//         }
//         dispatch(restaurantsdetail(newselectedRestaurant));
//         setSelectedRestaurant(newselectedRestaurant);
//         dispatch(
//           getSelectedRestaurantTime({
//             restaurantId: newselectedRestaurant.restaurantId,
//             locationId: newselectedRestaurant.defaultlocationId,
//           }) as any
//         );

//         if (
//           cart?.cartitemdetail?.cartDetails?.cartItemDetails[0] !== undefined
//         ) {
//           if (
//             cart?.cartitemdetail?.cartDetails?.cartItemDetails[0]
//               ?.restaurantId !== newselectedRestaurant.restaurantId &&
//             cart?.cartitemdetail?.cartDetails?.cartItemDetails[0]
//               ?.locationid !== newselectedRestaurant.defaultLocation.locationId
//           ) {
//             //dispatch(emptycart());
//           }
//         }
//         setLoadrestaurant(true);
//       }
//     }
//   };

//   const handleInvalidRestaurant = (themetype: string) => {
//     setisInvalidRestaurant(true);
//     const selectedTheme = GetThemeDetailsByName(themetype);
//     setthemeUrl(selectedTheme?.url as string);
//   };

//   useEffect(() => {
//     if (pathname !== "/home" && !pathname.includes(ThemeObj.FD123456)) {
//       if (dynamic && typeof dynamic === "string") {
//         const restauranturl = dynamic.toLowerCase().replace(/ /g, "-");
//         const locationurl =
//           location?.toString().toLowerCase().replace(/ /g, "-") || "";
//         const defaultlocationId = getLocationIdFromStorage();
//         RestaurantsServices.getRestaurantsList(
//           restauranturl,
//           locationurl,
//           defaultlocationId
//         ).then((response) => {
//           if (response && response.length > 0) {
//             handleValidResponse(response, dynamic, router);
//           } else {
//             handleInvalidRestaurant(themetype as string);
//           }
//         });
//       }
//     }
//     if (pathname.includes(ThemeObj.FD123456)) {
//       setloadPaymentScreen(true);
//     }
//   }, [dynamic]);

//   // const fetchData = async () => {
//   //   try {
//   //     setLoadrestaurant(false);
//   //     let getResponse;
//   //     if (selectedTheme.name === ThemeObj.default) {
//   //       getResponse = await restaurantsLocation(
//   //         restaurantinfo && restaurantinfo.restaurantId
//   //       );
//   //       dispatch({
//   //         type: RestaurantsTypes.RESTAURANT_LOCATION_LIST,
//   //         payload: getResponse,
//   //       });
//   //     } else {
//   //       getResponse = await restaurantsAllLocation(
//   //         restaurantinfo && restaurantinfo.restaurantId
//   //       );
//   //       dispatch({
//   //         type: RestaurantsTypes.RESTAURANT_LOCATION_LIST_WITH_TIME,
//   //         payload: getResponse,
//   //       });
//   //     }
//   //     dispatch(
//   //       restaurantstiming(
//   //         restaurantinfo && restaurantinfo.defaultlocationId,
//   //         restaurantinfo && restaurantinfo.restaurantId
//   //       )
//   //     );
//   //     setadresslist(true);
//   //   } catch (error) {
//   //     console.error("Error fetching restaurant data:", error);
//   //   }
//   // };

//   // IF ADDRESSLIST IS IS EMPTY AND USER DIRECT PUT THE WRONG LOCATION IN THE URL THEN CHECK THE LOCATION IS EXIST IN THE RESTAURANT

//   useEffect(() => {
//     if (!pathname.includes(ThemeObj.FD123456)) {
//       if (
//         location !== undefined &&
//         restaurantinfo?.defaultLocation !== undefined &&
//         restaurantinfo?.defaultLocation !== null &&
//         restaurantslocationlist?.addressList !== null
//       ) {
//         //fetchData();
//       }

//       let userLoginExpire = getUserLoginExpiryTime();
//       const restaurantId = getRestaurantIdFromStorage();
//       if (
//         restaurantinfo?.restaurantId !== restaurantId ||
//         (userinfo !== null && userLoginExpire == true)
//       ) {
//         dispatch(clearRedux(true) as any);
//         let rewardpoints = {
//           rewardvalue: 0,
//           rewardamount: 0,
//           rewardPoint: 0,
//           totalRewardPoints: 0,
//           redeemPoint: 0,
//         };
//         dispatch(setrewardpoint(rewardpoints));
//         dispatch(logout());
//         let id = uuidv4();
//         dispatch(createSessionId(id));
//       }
//     }
//   }, [restaurantinfo]);

//   useEffect(() => {
//     if (adresslist === true && pathname.includes(ThemeObj.FD123456)) {
//       let addressList =
//         selectedTheme?.name === ThemeObj.default
//           ? restaurantslocationlist?.addressList
//           : restaurantslocationlistwithtime?.addressList;
//       if (restaurantslocationlist?.addressList !== undefined) {
//         let linkLoacationurl = formatStringToURLWithBlankSpace(location as string);
//         addressList?.map((locations: AddressList) => {
//           let locationURL = formatStringToURLWithBlankSpace(
//             locations.locationURL
//           );
//           if (linkLoacationurl === locationURL) {
//             setLoadrestaurant(true);
//           }
//         });
//       }
//     }
//   }, [adresslist]);

//   useEffect(() => {
//     if (appVersion !== getVersion() && !pathname.includes(ThemeObj.FD123456)) {
//       clearCache();
//       dispatch(setAppVersion(getVersion()));
//     }
//   }, [appVersion]);

//   return (
//     <>
//       {!loadPaymentScreen && (
//         <SEOComponent
//           title={isGetSeo ? metaData?.title : seoDefaultData?.title}
//           ogUrl={metaData?.url}
//           description={
//             isGetSeo ? metaData?.description : seoDefaultData.description
//           }
//           ogImgUrl={isGetSeo ? metaData?.image : seoDefaultData.image}
//         />
//       )}
//       {loadrestaurant && selectedRestaurant && children}
//       {(pathname === "/home" || pathname === "/" || pathname === "") &&
//         children}
//       {loadPaymentScreen && children}
//       {isResturantClose &&
//         (themeUrl === "dm" ? (
//           <RestaurantClosedmComponent />
//         ) : (
//           <RestaurantCloseComponent />
//         ))}
//       {isInvalidRestaurant &&
//         (themeUrl === "dm" ? (
//           <RestaurantInvalidDMComponent />
//         ) : (
//           <RestaurantNotExist />
//         ))}
//     </>
//   );
// };

// export default dynamic(() => Promise.resolve(React.memo(RestaurantComponent)), {
//   ssr: true,
// });
