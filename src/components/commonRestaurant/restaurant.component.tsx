"use client";

import React, { useEffect, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
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
import { RestaurantsTypes } from "../../../redux/restaurants/restaurants.types";
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
import { ThunkDispatch } from "redux-thunk";
import SEOComponent from "../common/seo.component";
import useLoadCatData from "../customhooks/useloadcatdata-hook";
import { clearRedux } from "../../../redux/clearredux/clearredux.slice";
import { createSessionId } from "../../../redux/session/session.slice";
import { getSelectedRestaurantTime } from "../../../redux/main/main.slice";
import useFutureOrder from "../customhooks/usefuture-order-hook";
import { RootState } from "../../../redux/store";
import { Action } from "@reduxjs/toolkit";
import { DefaultLocationApiTypes } from "@/types/restaurant-types/restaurant.type";

interface Props {
  children: ReactNode;
  metaDataRestaurant?: any;
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
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, Action>>();
  const [loadrestaurant, setLoadrestaurant] = useState<boolean>(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [adresslist, setadresslist] = useState<boolean>(false);
  const [isResturantClose, setisResturantClose] = useState<boolean>(false);
  const [isInvalidRestaurant, setisInvalidRestaurant] =
    useState<boolean>(false);
  const [themeUrl, setthemeUrl] = useState<string>("");
  const [loadPaymentScreen, setloadPaymentScreen] = useState<boolean>(false);
  //const { enabletimeslot, futureDays, isFutureOrder } = useFutureOrder();
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

  let selectedTheme = GetThemeDetails(restaurantinfo?.themetype);

  const seoDefaultData = {
    title: `Online Ordering || ${restaurantname}`,
    description: "Online Ordering",
    image: restaurantlogo,
    url: `${getorigin()}${pathname}`,
  };
  const { enabletimeslot, futureDays, isFutureOrder } = useFutureOrder();
  const isGetSeo =
    pathname.includes("[category]") || pathname.includes("[items]");

  const handleSetThemeStyleDynamic = (newselectedRestaurant: any) => {
    newselectedRestaurant?.restaurantColorModel?.push({
      FieldName: "color",
      Color: newselectedRestaurant.color,
    });
    const colorStyleArray = handleDefaultDynamicFieldColor(
      newselectedRestaurant?.color,
      newselectedRestaurant?.themetype
    );

    for (const [key, value] of Object.entries(dynamicColorObj)) {
      const defaultStyle = colorStyleArray.find(
        (field) => field.FieldName === key
      );
      const restaurantStyle = newselectedRestaurant?.restaurantColorModel?.find(
        (field: any) => field.FieldName === key
      );
      const color = restaurantStyle?.Color || defaultStyle?.Color;
      document.documentElement.style.setProperty(value, color);
    }
  };

  const handleValidResponse = async (
    response: any,
    dynamic: string,
    router: any
  ) => {
    let restaurantId = getRestaurantIdFromStorage();
    var isSameRestaurant;
    const newselectedRestaurant = response[0];
    console.log(
      "new selected restaurant from restaurant component",
      newselectedRestaurant
    );
    if (newselectedRestaurant?.defaultLocation === null) {
      const locationId =
        newselectedRestaurant.defaultlocationId ||
        newselectedRestaurant?.defaultLocation?.locationId;
      handleSetThemeStyleDynamic(newselectedRestaurant);
      let selectedTheme = GetThemeDetails(newselectedRestaurant.themetype);
      setthemeUrl(selectedTheme.url);
      dispatch(restaurantsdetail(newselectedRestaurant));
      router.push(`/${selectedTheme.url}/${dynamic}/${PAGES.REST_CLOSE}`);
      setisResturantClose(true);
    } else {
      handleSetThemeStyleDynamic(newselectedRestaurant);
      isSameRestaurant = newselectedRestaurant.restaurantId === restaurantId;
      const path = pathname.split("/");
      const tableOrderTheme = GetThemeDetails(201);
      const isTableOrderTheme = path.includes(tableOrderTheme.url);
      //check is tableorder then update the theme type
      if (!isSameRestaurant) {
        dispatch(clearRedux(true));
        // if (newselectedRestaurant.restaurantId > 0 && userinfo) {
        //   if (userinfo.restaurantId !== newselectedRestaurant.restaurantId) {
        let rewardpoints = {
          rewardvalue: 0,
          rewardamount: 0,
          rewardPoint: 0,
          totalRewardPoints: 0,
          redeemPoint: 0,
        };
        //dispatch(setRewardPoint(rewardpoints));
        //dispatch(logout());
        // }
        // }
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
          newselectedRestaurant.themetype = tableOrderTheme.value;
        }
        dispatch(restaurantsdetail(newselectedRestaurant));
        dispatch(
          getSelectedRestaurantTime(
            newselectedRestaurant.restaurantId,
            newselectedRestaurant.defaultlocationId
          )
        );
        console.log("selected restaurant", newselectedRestaurant);
        setSelectedRestaurant(newselectedRestaurant);

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
    // setLocationIdInStorage(newselectedRestaurant.locationId);
    // setRestaurantIdInStorage(newselectedRestaurant.restaurantId);
    // setRestaurantNameInStorage(newselectedRestaurant.restaurantname);
    // dispatch(restaurantsdetail(newselectedRestaurant));
    // setSelectedRestaurant(newselectedRestaurant);
    // setLoadrestaurant(true);
  };

  const handleInvalidRestaurant = (themetype: any) => {
    setisInvalidRestaurant(true);
    const selectedTheme = GetThemeDetailsByName(themetype);
    setthemeUrl(selectedTheme.url);
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
          if (response.length > 0) {
            handleValidResponse(response, dynamic, router);
          } else {
            handleInvalidRestaurant(themetype);
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

      // USER LOGOUT IF RESTAURANT IS DIFFERENT \
      let userLoginExpire = getUserLoginExpiryTime();
      const restaurantId = getRestaurantIdFromStorage();
      if (
        restaurantinfo?.restaurantId !== restaurantId ||
        (userinfo !== null && userLoginExpire == true)
      ) {
        dispatch(clearRedux(true));
        let rewardpoints = {
          rewardvalue: 0,
          rewardamount: 0,
          rewardPoint: 0,
          totalRewardPoints: 0,
          redeemPoint: 0,
        };
        //dispatch(setRewardPoint(rewardpoints));
        //dispatch(logout());
        let id = uuidv4();
        dispatch(createSessionId(id));
      }
    }
  }, [restaurantinfo]);

  useEffect(() => {
    if (adresslist === true && pathname.includes(ThemeObj.FD123456)) {
      let addressList =
        selectedTheme.name === ThemeObj.default
          ? restaurantslocationlist.addressList
          : restaurantslocationlistwithtime?.addressList;
      if (restaurantslocationlist.addressList !== undefined) {
        let linkLoacationurl = formatStringToURLWithBlankSpace(location);
        addressList.map((locations: DefaultLocationApiTypes) => {
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
