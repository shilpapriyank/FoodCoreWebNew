// import { useRouter } from 'next/router';
// import React, { useEffect, useState, ReactNode } from 'react';
// import { useDispatch } from 'react-redux';
// import { logout } from '../../../redux/login/login.action';
// import { getSelectedRestaurantTime } from '../../../redux/main/main.action';
// import {
//     restaurantsAllLocation,
//     restaurantsdetail,
//     restaurantsLocation,
//     restaurantstiming,
//     setAppVersion,
// } from '../../../redux/restaurants/restaurants.action';
// import { RestaurantsServices } from '../../../redux/restaurants/restaurants.services';
// import { createSessionId } from '../../../redux/session/session.action';
// import {
//     getLocationIdFromStorage,
//     getRestaurantIdFromStorage,
//     setLocationIdInStorage,
//     setRestaurantIdInStorage,
//     setRestaurantNameInStorage
// } from '@/components/common/localstore'

// import { v4 as uuidv4 } from 'uuid';
// import { RestaurantsTypes } from '../../../redux/restaurants/restaurants.types';
// import { clearRedux } from '../../../redux/clearredux/clearredux.action';
// import { setrewardpoint } from '../../../redux/rewardpoint/rewardpoint.action';
// import { emptycart } from '../../../redux/cart/cart.action';
// import { GetThemeDetails, GetThemeDetailsByName } from '../../dominos/helpers/utility';
// import RestaurantClosedmComponent from '../../dominos/restaurant-close/restaurantclose.component';
// import {
//     ThemeObj,
//     clearCache,
//     dynamicColorObj,
//     formatStringToURLWithBlankSpace,
//     getUserLoginExpiryTime,
//     getVersion,
//     getorigin,
//     handleDefaultDynamicFieldColor,
// } from '../../common/utility';
// import dynamic from 'next/dynamic';
// import RestaurantCloseComponent from '../restaurant-close/restaurant-close.component';
// import RestaurantInvalidDMComponent from '../../dominos/restaurant-close/restaurant-invalid.component';
// import RestaurantNotExist from '../restaurant-close/restaurant-invalid.component';
// import SEOComponent from '../../common/seo.component';
// import { useReduxData } from '../../customhooks/useredux-data-hook';
// import { PAGES } from './pages';
// import useLoadCatData from '../../customhooks/useloadcatdata-hook';
// import $ from 'jquery';
// import useFutureOrder from '../../customhooks/usefuture-order-hook';
// import { emptyordertime, setFutureOrderDay } from '../../../redux/order/order.action';

// interface RestaurantProps {
//     children: ReactNode;
//     metaDataRestaurant?: {
//         restaurantname?: string;
//         imageurl?: string;
//     };
//     themetype?: string;
// }

// const Restaurant: React.FC<RestaurantProps> = ({ children, metaDataRestaurant, themetype }) => {
//     const { restaurant, metadata, category, cart, sessionid, userinfo, order } = useReduxData();
//     const customerId = userinfo?.customerId ?? 0;
//     const { loadCatData } = useLoadCatData(customerId);

//     const router = useRouter();
//     const dispatch = useDispatch();

//     const { query: { dynamic, location, theme, guid } = {} } = router;
//     const isGetSeo = router.pathname.includes("[category]") || router.pathname.includes("[items]");
//     const metaData = metadata?.metadata;

//     const [loadrestaurant, setLoadrestaurant] = useState(false);
//     const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
//     const [adresslist, setadresslist] = useState(false);
//     const [isResturantClose, setisResturantClose] = useState(false);
//     const [isInvalidRestaurant, setisInvalidRestaurant] = useState(false);
//     const [themeUrl, setthemeUrl] = useState("");
//     const [loadPaymentScreen, setloadPaymentScreen] = useState(false);

//     const { enabletimeslot, futureDays, isFutureOrder } = useFutureOrder();

//     const restaurantinfo = restaurant.restaurantdetail;
//     const restaurantslocationlist = restaurant.restaurantslocationlist;
//     const restaurantslocationlistwithtime = restaurant.restaurantslocationlistwithtime;
//     const appVersion = restaurant?.appversion;
//     const categoryitemlist = category.categoryitemlist;
//     const sessionId = sessionid;

//     const restaurantname =
//         metaDataRestaurant?.restaurantname && metaDataRestaurant.restaurantname !== ""
//             ? metaDataRestaurant.restaurantname
//             : restaurantinfo?.restaurantname;

//     const restaurantlogo =
//         metaDataRestaurant?.imageurl && metaDataRestaurant.imageurl !== ""
//             ? metaDataRestaurant.imageurl
//             : restaurantinfo?.logo;

//     const seoDefaultData = {
//         title: ` Online Ordering || ${restaurantname}`,
//         description: "Online Ordering",
//         image: restaurantlogo,
//         url: `${getorigin()}${router?.asPath}`,
//     };

//     const handleSetThemeStyleDynamic = (newselectedRestaurant: any) => {
//         if (!newselectedRestaurant) return;
//         // fix: push is a function, use parentheses
//         newselectedRestaurant.restaurantColorModel?.push({ FieldName: "color", Color: newselectedRestaurant.color });
//         const colorStyleArray = handleDefaultDynamicFieldColor(newselectedRestaurant.color, newselectedRestaurant.themetype);

//         for (const [key, value] of Object.entries(dynamicColorObj)) {
//             const defaultStyle = colorStyleArray.find((field) => field.FieldName === key);
//             const restaurantStyle = newselectedRestaurant.restaurantColorModel?.find((field) => field.FieldName === key);
//             const color = restaurantStyle?.Color || defaultStyle?.Color;
//             if (color) {
//                 document.documentElement.style.setProperty(value, color);
//             }
//         }
//     };

//     const handleValidResponse = async (response: any[], dynamicColorObjParam: any, dynamicParam: any, routerParam: typeof router) => {
//         const newselectedRestaurant = response[0];
//         if (!newselectedRestaurant) return;

//         if (newselectedRestaurant.defaultLocation === null) {
//             handleSetThemeStyleDynamic(newselectedRestaurant);

//             const selectedTheme = GetThemeDetails(newselectedRestaurant.themetype);
//             setthemeUrl(selectedTheme.url);
//             dispatch(restaurantsdetail(newselectedRestaurant));
//             routerParam.push(`/${selectedTheme.url}/${dynamicParam}/${PAGES.REST_CLOSE}`);
//             setisResturantClose(true);
//             return;
//         }

//         handleSetThemeStyleDynamic(newselectedRestaurant, dynamicColorObjParam);

//         const restaurantId = getRestaurantIdFromStorage();
//         const isSameRestaurant = newselectedRestaurant.restaurantId === restaurantId;

//         const path = routerParam.asPath.split("/");
//         const tableOrderTheme = GetThemeDetails(201);
//         const isTableOrderTheme = path.includes(tableOrderTheme.url);

//         if (!isSameRestaurant) {
//             dispatch(clearRedux(true));
//             dispatch(setrewardpoint({
//                 rewardvalue: 0,
//                 rewardamount: 0,
//                 rewardPoint: 0,
//                 totalRewardPoints: 0,
//                 redeemPoint: 0,
//             }));
//             dispatch(logout());
//             dispatch(createSessionId(uuidv4()));
//         } else {
//             if (!sessionId) {
//                 dispatch(createSessionId(uuidv4()));
//             }
//         }

//         const locationId = newselectedRestaurant.defaultlocationId > 0
//             ? newselectedRestaurant.defaultlocationId
//             : newselectedRestaurant.defaultLocation?.locationId;

//         setLocationIdInStorage(locationId);
//         setRestaurantIdInStorage(newselectedRestaurant.restaurantId);
//         setRestaurantNameInStorage(newselectedRestaurant.restaurantname);

//         const loadCat = await loadCatData(newselectedRestaurant, isTableOrderTheme, categoryitemlist);
//         if (loadCat) {
//             if (isTableOrderTheme) {
//                 newselectedRestaurant.themetype = tableOrderTheme.value;
//             }
//             dispatch(restaurantsdetail(newselectedRestaurant));
//             dispatch(getSelectedRestaurantTime(newselectedRestaurant.restaurantId, newselectedRestaurant.defaultlocationId));
//             setSelectedRestaurant(newselectedRestaurant);

//             if (cart?.cartitemdetail?.cartDetails?.cartItemDetails?.length) {
//                 const firstItem = cart.cartitemdetail.cartDetails.cartItemDetails[0];
//                 if (
//                     firstItem.restaurantId !== newselectedRestaurant.restaurantId &&
//                     firstItem.locationid !== newselectedRestaurant.defaultLocation.locationId
//                 ) {
//                     dispatch(emptycart());
//                 }
//             }
//             setLoadrestaurant(true);
//         }
//     };

//     const handleInvalidRestaurant = (themetypeParam?: string) => {
//         setisInvalidRestaurant(true);
//         const selectedTheme = themetypeParam ? GetThemeDetailsByName(themetypeParam) : GetThemeDetailsByName(themetype || '');
//         setthemeUrl(selectedTheme.url);
//     };

//     useEffect(() => {
//         if (!router.pathname.includes(ThemeObj.FD123456)) {
//             if (futureDays?.length && isFutureOrder && order?.futureOrderDay && Object.keys(order.futureOrderDay).length > 0) {
//                 const isInFutureDay = futureDays.some(day => day.fullDay === order.futureOrderDay.fullDay);
//                 if (!isInFutureDay) {
//                     dispatch(setFutureOrderDay(""));
//                     dispatch(emptyordertime());
//                 }
//             }
//         }
//     }, []);

//     useEffect(() => {
//         if (router.pathname !== '/home' && !router.pathname.includes(ThemeObj.FD123456)) {
//             if (dynamic) {
//                 const restauranturl = dynamic.toLowerCase().replace(/ /g, "-");
//                 const defaultlocationId = getLocationIdFromStorage();
//                 const locationurl = location ? location.toLowerCase().replace(/ /g, "-") : '';
//                 RestaurantsServices.getRestaurantsList(restauranturl, locationurl, Boolean(defaultlocationId)).then(response => {
//                     if (response.length === 0) {
//                         handleInvalidRestaurant(themetype);
//                     } else {
//                         if (response[0].defaultLocation === null) {
//                             handleValidResponse(response, dynamicColorObj, dynamic, router);
//                         } else {
//                             handleValidResponse(response, dynamicColorObj, dynamic, router);
//                         }
//                     }
//                 });
//             }
//         }
//         if (router.pathname.includes(ThemeObj.FD123456)) {
//             setloadPaymentScreen(true);
//         }
//     }, [dynamic]);

//     const fetchData = async () => {
//         try {
//             setLoadrestaurant(false);
//             let getResponse;
//             const selectedTheme = GetThemeDetails(restaurantinfo?.themetype);
//             if (location) {
//                 getResponse = await RestaurantsServices.getRestaurantsList(
//                     restaurantinfo?.restaurantname,
//                     location,
//                     Boolean(getLocationIdFromStorage())
//                 );
//                 if (getResponse.length === 0) {
//                     setisInvalidRestaurant(true);
//                     setthemeUrl(selectedTheme.url);
//                 } else {
//                     const restaurantRes = getResponse[0];
//                     if (restaurantRes.defaultLocation === null) {
//                         setisResturantClose(true);
//                         setthemeUrl(selectedTheme.url);
//                         dispatch(restaurantsdetail(restaurantRes));
//                     } else {
//                         setisResturantClose(false);
//                         dispatch(restaurantsdetail(restaurantRes));
//                         dispatch(restaurantsLocation(getResponse));
//                         dispatch(restaurantsAllLocation(getResponse));
//                         dispatch(restaurantstiming(restaurantRes.restaurantId));
//                         setLoadrestaurant(true);
//                         setSelectedRestaurant(restaurantRes);
//                         setthemeUrl(selectedTheme.url);
//                     }
//                 }
//             }
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, [location]);

//     if (isInvalidRestaurant) {
//         return <RestaurantInvalidDMComponent themeurl={themeUrl} />;
//     }

//     if (isResturantClose) {
//         return <RestaurantClosedmComponent themeurl={themeUrl} />;
//     }

//     return (
//         <>
//             <SEOComponent
//                 title={metaData?.title || seoDefaultData.title}
//                 description={metaData?.description || seoDefaultData.description}
//                 image={metaData?.image || seoDefaultData.image}
//                 url={seoDefaultData.url}
//             />
//             {children}
//         </>
//     );
// };

// export default Restaurant;

// components/Restaurant.tsx
import React, { ReactNode } from "react";

interface RestaurantProps {
  metaDataRestaurant: any | null;
  themetype: string;
  children?: ReactNode;
}

const Restaurant: React.FC<RestaurantProps> = ({
  metaDataRestaurant,
  themetype,
  children,
}) => {
  return (
    <div>
      <p>Theme Type: {themetype}</p>
      <p>
        MetaData:{" "}
        {metaDataRestaurant
          ? JSON.stringify(metaDataRestaurant)
          : "No metadata provided"}
      </p>
      {children && <div>{children}</div>}
    </div>
  );
};

export default Restaurant;
