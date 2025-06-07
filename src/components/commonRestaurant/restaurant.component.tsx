"use client";

import React, { useEffect, useState, ReactNode } from "react";
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
  restaurantsAllLocation,
  restaurantsdetail,
  restaurantsLocation,
  restaurantstiming,
  setAppVersion,
} from "../../../redux/restaurants/restaurants.slice";
import { PAGES } from "../nt/common/pages";
import RestaurantClosedmComponent from "./restaurant-closedm.component";
import RestaurantCloseComponent from "./restaurant-close.componet";
import RestaurantInvalidDMComponent from "./restaurant-invalid.component";
import RestaurantNotExist from "./restaurant-not-exist.component";
import { ThunkDispatch } from "redux-thunk";
import SEOComponent from "../common/seo.component";

interface Props {
  children: ReactNode;
  metaDataRestaurant?: any;
  themetype?: string;
}

const Restaurant = ({ children, metaDataRestaurant, themetype }: Props) => {
  const { restaurant, metadata, category, userinfo, order } = useReduxData();
  const customerId = userinfo ? userinfo.customerId : 0;
  //const { loadCatData } = useLoadCatData(customerId);
  // const { query, pathname, asPath, push } = useRouter();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();
  // const dispatch = useDispatch();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [loadrestaurant, setLoadrestaurant] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [adresslist, setadresslist] = useState(false);
  const [isResturantClose, setisResturantClose] = useState(false);
  const [isInvalidRestaurant, setisInvalidRestaurant] = useState(false);
  const [themeUrl, setthemeUrl] = useState("");
  const [loadPaymentScreen, setloadPaymentScreen] = useState(false);
  //const { enabletimeslot, futureDays, isFutureOrder } = useFutureOrder();
  const restaurantinfo = restaurant.restaurantdetail;
  const restaurantslocationlist = restaurant.restaurantslocationlist;
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

  const seoDefaultData = {
    title: `Online Ordering || ${restaurantname}`,
    description: "Online Ordering",
    image: restaurantlogo,
    url: `${getorigin()}${pathname}`,
    //url: `${getorigin()}${asPath}`,
  };

  const isGetSeo =
    pathname.includes("[category]") || pathname.includes("[items]");

  const handleSetThemeStyleDynamic = (newselectedRestaurant: any) => {
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

  const handleValidResponse = async (response: any, dynamic: string) => {
    const newselectedRestaurant = response[0];

    const locationId =
      newselectedRestaurant.defaultlocationId ||
      newselectedRestaurant?.defaultLocation?.locationId;

    setLocationIdInStorage(locationId);
    setRestaurantIdInStorage(newselectedRestaurant.restaurantId);
    setRestaurantNameInStorage(newselectedRestaurant.restaurantname);

    dispatch(restaurantsdetail(newselectedRestaurant));
    setSelectedRestaurant(newselectedRestaurant);
    setLoadrestaurant(true);
  };

  const handleInvalidRestaurant = (themetype: any) => {
    setisInvalidRestaurant(true);
    const selectedTheme = GetThemeDetailsByName(themetype);
    setthemeUrl(selectedTheme.url);
  };

  // useEffect(() => {
  //   if (futureDays?.length > 0 && isFutureOrder && order?.futureOrderDay) {
  //     const isInFuture = futureDays.some(
  //       (day) => day.fullDay === order.futureOrderDay.fullDay
  //     );
  //     if (!isInFuture) {
  //       dispatch(setFutureOrderDay(""));
  //       dispatch(emptyordertime());
  //     }
  //   }
  // }, []);

  useEffect(() => {
    console.log("Redux restaurant state:", restaurant.restaurantdetail);
  }, [restaurant.restaurantdetail]);

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
            handleValidResponse(response, dynamic);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadrestaurant(false);
        const selectedTheme = GetThemeDetails(restaurantinfo?.themetype);
        let getResponse;
        console.log("selected theme", selectedTheme);
        if (selectedTheme.name === ThemeObj.default) {
          getResponse = await restaurantsLocation(restaurantinfo?.restaurantId);
          dispatch({
            type: RestaurantsTypes.RESTAURANT_LOCATION_LIST,
            payload: getResponse,
          });
        } else {
          getResponse = await restaurantsAllLocation(
            restaurantinfo?.restaurantId
          );
          dispatch({
            type: RestaurantsTypes.RESTAURANT_LOCATION_LIST_WITH_TIME,
            payload: getResponse,
          });
          dispatch({
            type: RestaurantsTypes.RESTAURANT_LOCATION_LIST,
            payload: getResponse,
          });
        }
        dispatch(
          restaurantstiming(
            restaurantinfo?.defaultlocationId,
            restaurantinfo?.restaurantId
          )
        );
        setadresslist(true);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    if (!pathname.includes(ThemeObj.FD123456)) {
      if (
        location &&
        restaurantinfo?.defaultLocation &&
        restaurantslocationlist?.length === 0
      ) {
        fetchData();
      }

      const userLoginExpire = getUserLoginExpiryTime();
      const restaurantId = getRestaurantIdFromStorage();

      if (
        restaurantinfo?.restaurantId !== restaurantId ||
        (userinfo && userLoginExpire)
      ) {
        // dispatch(clearRedux(true));
        // dispatch(
        //   setrewardpoint({
        //     rewardvalue: 0,
        //     rewardamount: 0,
        //     rewardPoint: 0,
        //     totalRewardPoints: 0,
        //     redeemPoint: 0,
        //   })
        // );
        // dispatch(logout());
        // dispatch(createSessionId(uuidv4()));
      }
    }
  }, [restaurantinfo]);

  // useEffect(() => {
  //   if (adresslist && !pathname.includes(ThemeObj.FD123456)) {
  //     const selectedTheme = GetThemeDetails(restaurantinfo?.themetype);
  //     const addressList =
  //       selectedTheme.name === ThemeObj.default
  //         ? restaurantslocationlist?.addressList
  //         : restaurantslocationlistwithtime?.addressList;

  //     if (addressList && location) {
  //       const linkLocationURL = formatStringToURLWithBlankSpace(location);
  //       const match = addressList.some(
  //         (loc) =>
  //           formatStringToURLWithBlankSpace(loc.locationURL) === linkLocationURL
  //       );
  //       if (match) setLoadrestaurant(true);
  //     }
  //   }
  // }, [adresslist]);

  useEffect(() => {
    if (appVersion !== getVersion() && !pathname.includes(ThemeObj.FD123456)) {
      clearCache();
      dispatch(setAppVersion(getVersion()));
    }
  }, [appVersion]);

  useEffect(() => {
    if (!dynamic || typeof dynamic !== "string") return;
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
        handleValidResponse(response, dynamic);
      } else {
        handleInvalidRestaurant(themetype);
      }
    });
  }, [dynamic, location]);

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

export default dynamic(() => Promise.resolve(React.memo(Restaurant)), {
  ssr: true,
});
