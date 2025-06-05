import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { logout } from "../../../redux/login/login.action";
// import { createSessionId } from "../../../redux/session/session.action";
// import { RestaurantsTypes } from "../../../redux/restaurants/restaurants.types";
// import { clearRedux } from "../../../redux/clearredux/clearredux.action";
// import { setrewardpoint } from "../../../redux/rewardpoint/rewardpoint.action";
// import { emptycart } from "../../../redux/cart/cart.action";
import dynamic from "next/dynamic";
// import RestaurantCloseComponent from "../restaurant-close/restaurant-close.component";
// import RestaurantInvalidDMComponent from "../../dominos/restaurant-close/restaurant-invalid.component";
// import RestaurantNotExist from "../restaurant-close/restaurant-invalid.component";
// import SEOComponent from "../../common/seo.component";
// import useLoadCatData from "../../customhooks/useloadcatdata-hook";
import $ from "jquery";
import { useReduxData } from "../customhooks/useredux-data-hooks";
import restaurantsdetail, {
  restaurantsLocation,
  restaurantstiming,
  setAppVersion,
} from "../../../redux/restaurants/restaurants.slice";
import {
  dynamicColorObj,
  GetThemeDetails,
  GetThemeDetailsByName,
  getVersion,
  handleDefaultDynamicFieldColor,
  ThemeObj,
} from "../common/utility";
import { PAGES } from "../nt/common/pages";
import {
  getLocationIdFromStorage,
  getRestaurantIdFromStorage,
  setLocationIdInStorage,
  setRestaurantIdInStorage,
  setRestaurantNameInStorage,
} from "../common/localstore";
import { RestaurantsServices } from "../../../redux/restaurants/restaurants.services";
import { RestaurantsTypes } from "../../../redux/restaurants/restaurants.types";
// import useFutureOrder from "../../customhooks/usefuture-order-hook";
// import {
//   emptyordertime,
//   setFutureOrderDay,
// } from "../../../redux/order/order.action";

interface ColorModel {
  [key: string]: {
    FieldName: string;
    Color: string;
  };
}

const RestaurantWrapper = ({
  children,
  metaDataRestaurant,
  themetype,
}: any) => {
  //const { restaurant, metadata, category, cart, sessionid, userinfo, order } = useReduxData();
  const { restaurant } = useReduxData();
  //const customerId = userinfo ? userinfo.customerId : 0;
  //const { loadCatData } = useLoadCatData(customerId);
  const router = useRouter();
  const dispatch = useDispatch();
  let newselectedRestaurant = null;
  const {
    query: { dynamic, location, theme, guid },
  } = router;
  //let isGetSeo = router.pathname.includes("[category]" || "[items]");
  //const count = useSelector(({ demo }) => demo.demo_count, shallowEqual);
  // const metaData = metadata?.metadata;
  const [loadrestaurant, setLoadrestaurant] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  let restaurantinfo = restaurant.restaurantsdetail;
  let restaurantslocationlist = restaurant.restaurantslocationlist;
  let restaurantslocationlistwithtime =
    restaurant.restaurantslocationlistwithtime;
  let appVersion = restaurant?.appversion;
  // const
  const [adresslist, setadresslist] = useState(false);

  // const categoryitemlist = category.categoryitemlist;
  //let sessionId = sessionid;
  const [isResturantClose, setisResturantClose] = useState(false);
  const [isInvalidRestaurant, setisInvalidRestaurant] = useState(false);
  const [themeUrl, setthemeUrl] = useState("");
  const [loadPaymentScreen, setloadPaymentScreen] = useState(false);
  //const { enabletimeslot, futureDays, isFutureOrder } = useFutureOrder();

  let restaurantname =
    metaDataRestaurant && metaDataRestaurant?.restaurantname !== ""
      ? metaDataRestaurant.restaurantname
      : "";
  //: restaurantinfo?.restaurants.restaurantname;
  //   console.log(restaurantname);
  //let restaurantlogo =
  // metaDataRestaurant && metaDataRestaurant?.imageurl !== ""
  //   ? metaDataRestaurant.imageurl
  //   : restaurantinfo?.logo;

  //   const seoDefaultData = {
  //     title: ` Online Ordering || ${restaurantname}`,
  //     description: "Online Ordering",
  //     image: restaurantlogo,
  //     url: `${getorigin()}${router?.asPath}`,
  //   };

  //   const handleSetThemeStyleDynamic = (newselectedRestaurant: ColorModel) => {
  //     newselectedRestaurant?.restaurantColorModel?.push[
  //       { FieldName: "color", Color: newselectedRestaurant.color }
  //     ];
  //     const colorStyleArray = handleDefaultDynamicFieldColor(
  //       newselectedRestaurant?.color,
  //       newselectedRestaurant?.themetype
  //     );
  //     for (const [key, value] of Object.entries(dynamicColorObj)) {
  //       const defaultStyle = colorStyleArray.find(
  //         (field) => field.FieldName === key
  //       );
  //       const restaurantStyle = newselectedRestaurant?.restaurantColorModel?.find(
  //         (field: any) => field.FieldName === key
  //       );
  //       let color = restaurantStyle?.Color || defaultStyle?.Color;
  //       document.documentElement.style.setProperty(value, color);
  //     }
  //     return;
  //   };

  const handleSetThemeStyleDynamic = (newselectedRestaurant: any) => {
    newselectedRestaurant?.restaurantColorModel?.push({
      FieldName: "color",
      Color: newselectedRestaurant.color,
    });

    const colorStyleArray = handleDefaultDynamicFieldColor(
      newselectedRestaurant.color,
      newselectedRestaurant.themetype
    );

    for (const [key, value] of Object.entries(dynamicColorObj)) {
      const defaultStyle = colorStyleArray.find(
        (field) => field.FieldName === key
      );
      const restaurantStyle = newselectedRestaurant?.restaurantColorModel?.find(
        (field: any) => field.FieldName === key
      );
      const color = restaurantStyle?.Color || defaultStyle?.Color;
      if (color) {
        document.documentElement.style.setProperty(value, color);
      }
    }

    return;
  };

  const handleValidResponse = async ({
    response,
    dynamicColorObj,
    dynamic,
    router,
  }: any) => {
    let restaurantId = getRestaurantIdFromStorage();
    var isSameRestaurant;
    const newselectedRestaurant = response[0];
    // themetype update for static
    // newselectedRestaurant.themetype=4;

    if (newselectedRestaurant?.defaultLocation === null) {
      // for (const [key, value] of Object.entries(dynamicColorObj)) {
      //     console.log(defaultStyle[key])
      //     let color = newselectedRestaurant[key] || defaultStyle[key] || '#004aad';
      //     document.documentElement.style.setProperty(value, color);
      // }

      //set dynamic style property from api
      handleSetThemeStyleDynamic(newselectedRestaurant);

      let selectedTheme = GetThemeDetails(newselectedRestaurant.themetype);
      setthemeUrl(selectedTheme.url);
      /// dispatch(restaurantsdetail(newselectedRestaurant));
      router.push(`/${selectedTheme.url}/${dynamic}/${PAGES.REST_CLOSE}`);
      setisResturantClose(true);
    } else {
      // for (const [key, value] of Object.entries(dynamicColorObj)) {
      //     console.log(value)
      //     let color = newselectedRestaurant[key] || defaultStyle[key] || '#004aad';
      //     document.documentElement.style.setProperty(value, color);
      // }

      //set dynamic style property from api
      // handleSetThemeStyleDynamic(newselectedRestaurant, dynamic);
      handleSetThemeStyleDynamic(newselectedRestaurant);

      isSameRestaurant = newselectedRestaurant.restaurantId === restaurantId;
      const path = router.asPath.split("/");
      const tableOrderTheme = GetThemeDetails(201);
      const isTableOrderTheme = path.includes(tableOrderTheme.url);
      //check is tableorder then update the theme type
      //   if (!isSameRestaurant) {
      //     dispatch(clearRedux(true));
      //     // if (newselectedRestaurant.restaurantId > 0 && userinfo) {
      //     //     if (userinfo.restaurantId !== newselectedRestaurant.restaurantId) {
      //     let rewardpoints = {
      //       rewardvalue: 0,
      //       rewardamount: 0,
      //       rewardPoint: 0,
      //       totalRewardPoints: 0,
      //       redeemPoint: 0,
      //     };
      //     dispatch(setrewardpoint(rewardpoints));
      //     dispatch(logout());
      //     //     }
      //     // }
      //     let id = uuidv4();
      //     dispatch(createSessionId(id));
      //   } else {
      //     if (sessionId === null || sessionId === undefined) {
      //       let id = uuidv4();
      //       dispatch(createSessionId(id));
      //     }
      //   }
      const locationId =
        newselectedRestaurant.defaultlocationId > 0
          ? newselectedRestaurant.defaultlocationId
          : newselectedRestaurant?.defaultLocation?.locationId;
      setLocationIdInStorage(locationId);
      setRestaurantIdInStorage(newselectedRestaurant.restaurantId);
      setRestaurantNameInStorage(newselectedRestaurant.restaurantname);
      //   const loadCat = await loadCatData(
      //     newselectedRestaurant,
      //     isTableOrderTheme,
      //     categoryitemlist
      //   );
      //   if (loadCat) {
      //     if (isTableOrderTheme) {
      //       newselectedRestaurant.themetype = tableOrderTheme.value;
      //     }
      //     dispatch(restaurantsdetail(newselectedRestaurant));
      //     dispatch(
      //       getSelectedRestaurantTime(
      //         newselectedRestaurant.restaurantId,
      //         newselectedRestaurant.defaultlocationId
      //       )
      //     );
      //     setSelectedRestaurant(newselectedRestaurant);

      //     if (
      //       cart?.cartitemdetail?.cartDetails?.cartItemDetails[0] !== undefined
      //     ) {
      //       if (
      //         cart?.cartitemdetail?.cartDetails?.cartItemDetails[0]
      //           ?.restaurantId !== newselectedRestaurant.restaurantId &&
      //         cart?.cartitemdetail?.cartDetails?.cartItemDetails[0]
      //           ?.locationid !== newselectedRestaurant.defaultLocation.locationId
      //       ) {
      //         dispatch(emptycart());
      //       }
      //     }
      //     setLoadrestaurant(true);
      //   }
    }
  };
  const handleInvalidRestaurant = (themetype: any) => {
    setisInvalidRestaurant(true);
    let selectedTheme = GetThemeDetailsByName(themetype);
    setthemeUrl(selectedTheme.url);
  };

  //   useEffect(() => {
  //     if (!router.pathname.includes(ThemeObj.FD123456)) {
  //       // $(window).on('popstate', function () {
  //       // $('.modal')?.modal('hide');
  //       // document.querySelector("body")?.removeAttribute("style")
  //       // $(".modal-backdrop").remove();
  //       // $(".in").remove();
  //       // });
  //       //   check day exist in the featureDays
  //       if (
  //         futureDays?.length > 0 &&
  //         isFutureOrder &&
  //         order?.futureOrderDay !== "" &&
  //         order?.futureOrderDay
  //       ) {
  //         if (Object.keys(order?.futureOrderDay).length > 0) {
  //           const isInFuterDay = futureDays?.some(
  //             (day) => day.fullDay === order?.futureOrderDay?.fullDay
  //           );
  //           if (!isInFuterDay) {
  //             dispatch(setFutureOrderDay(""));
  //             dispatch(emptyordertime());
  //           }
  //         }
  //       }
  //     }
  //   }, []);

  useEffect(() => {
    if (
      router.pathname !== "/home" &&
      !router.pathname.includes(ThemeObj.FD123456)
    ) {
      if (
        dynamic &&
        dynamic !== undefined &&
        typeof dynamic === "string" &&
        typeof location === "string"
      ) {
        let restauranturl = dynamic.toLowerCase().toString().replace(/ /g, "-");
        let defaultlocationId = getLocationIdFromStorage(); //localStorage.getItem('defaultlocationId');
        let locationurl = location
          ? location?.toLowerCase().toString().replace(/ /g, "-")
          : "";
        RestaurantsServices.getRestaurantsList(
          restauranturl,
          locationurl,
          defaultlocationId
        ).then((response) => {
          if (response.length !== 0) {
            if (response[0].defaultLocation === null) {
              //handleValidResponse(response, dynamicColorObj, dynamic, router);
              handleValidResponse(response);
            }
          } else {
            handleInvalidRestaurant(themetype);
          }

          if (response.length === 0) {
            handleInvalidRestaurant(themetype);
          } else {
            // handleValidResponse(response, dynamicColorObj, dynamic, router);
            handleValidResponse(response);
          }
        });
        //}
      }
    }
    if (router.pathname.includes(ThemeObj.FD123456)) {
      setloadPaymentScreen(true);
    }
  }, [dynamic]);

  const fetchData = async () => {
    try {
      setLoadrestaurant(false);
      let getResponse;
      //   if (selectedTheme.name === ThemeObj.default) {
      //     if (getResponse) {
      //       getResponse = await restaurantsLocation(
      //         restaurantinfo && restaurantinfo?.restaurantId
      //       );
      //     }

      //     dispatch({
      //       type: RestaurantsTypes.RESTAURANT_LOCATION_LIST,
      //       payload: getResponse,
      //     });
      //   } else {
      //     // getResponse = await restaurantsAllLocation(
      //     //   restaurantinfo && restaurantinfo.restaurantId
      //     // );
      //     dispatch({
      //       type: RestaurantsTypes.RESTAURANT_LOCATION_LIST_WITH_TIME,
      //       payload: getResponse,
      //     });
      //     dispatch({
      //       type: RestaurantsTypes.RESTAURANT_LOCATION_LIST,
      //       payload: getResponse,
      //     });
      //   }
      //   dispatch(
      //     restaurantstiming(
      //       restaurantinfo && restaurantinfo.defaultlocationId,
      //       restaurantinfo && restaurantinfo.restaurantId
      //     )
      //   );
      setadresslist(true);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }
  };
  //IF ADDRESSLIST IS IS EMPTY AND USER DIRECT PUT THE WRONG LOCATION IN THE URL THEN CHECK THE LOCATION IS EXIST IN THE RESTAURANT

  //let selectedTheme = GetThemeDetails(restaurantinfo?.themetype);
  useEffect(() => {
    if (!router.pathname.includes(ThemeObj.FD123456)) {
      if (
        location !== undefined &&
        //restaurantinfo?.defaultLocation !== undefined &&
        //restaurantinfo?.defaultLocation !== null &&
        restaurantslocationlist?.length === 0
      ) {
        fetchData();
      }

      // USER LOGOUT IF RESTAURANT IS DIFFERENT \
      //let userLoginExpire = getUserLoginExpiryTime();
      const restaurantId = getRestaurantIdFromStorage();
      //   if (
      //     restaurantinfo?.restaurantId !== restaurantId ||
      //     (userinfo !== null && userLoginExpire == true)
      //   ) {
      //     dispatch(clearRedux(true));
      //     let rewardpoints = {
      //       rewardvalue: 0,
      //       rewardamount: 0,
      //       rewardPoint: 0,
      //       totalRewardPoints: 0,
      //       redeemPoint: 0,
      //     };
      //     dispatch(setrewardpoint(rewardpoints));
      //     dispatch(logout());
      //     let id = uuidv4();
      //     dispatch(createSessionId(id));
      //   }
    }
  }, [restaurantinfo]);

  //   useEffect(() => {
  //     if (adresslist === true && !router.pathname.includes(ThemeObj.FD123456)) {
  //       let addressList =
  //         selectedTheme.name === ThemeObj.default
  //           ? restaurantslocationlist.addressList
  //           : restaurantslocationlistwithtime?.addressList;
  //       if (restaurantslocationlist.addressList !== undefined) {
  //         let linkLoacationurl = formatStringToURLWithBlankSpace(location);
  //         addressList.map((locations) => {
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

  useEffect(() => {
    if (
      appVersion !== getVersion() &&
      !router.pathname.includes(ThemeObj.FD123456)
    ) {
      //clearCache();
      dispatch(setAppVersion(getVersion()));
    }
  }, [appVersion]);

  return (
    <>
      {/* {!loadPaymentScreen && (
        <SEOComponent
          title={isGetSeo ? metaData?.title : seoDefaultData?.title}
          ogUrl={metaData?.url}
          description={
            isGetSeo ? metaData?.description : seoDefaultData.description
          }
          ogImgUrl={isGetSeo ? metaData?.image : seoDefaultData.image}
        />
      )} */}
      {loadrestaurant && selectedRestaurant && children}
      {(router.pathname === "/home" ||
        router.pathname === "/" ||
        router.pathname === "") &&
        children}
      {loadPaymentScreen && children}
      {isResturantClose && (
        <>
          {themeUrl === "dm"
            ? // <RestaurantClosedmComponent />
              ""
            : // <RestaurantCloseComponent />
              ""}
        </>
      )}
      {isInvalidRestaurant && (
        <>
          {themeUrl === "dm"
            ? // <RestaurantInvalidDMComponent />
              ""
            : // <RestaurantNotExist />
              ""}
        </>
      )}
    </>
  );
};
// export default React.memo(Restaurant)
export default dynamic(() => Promise.resolve(React.memo(RestaurantWrapper)), {
  ssr: true,
});
