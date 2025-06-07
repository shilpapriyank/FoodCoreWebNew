// // hooks/useRestaurant.ts
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// // import { createSessionId } from "@/redux/session/session.action";
// // import { restaurantsdetail } from "@/redux/restaurants/restaurants.action";
// import { dynamicColorObj, handleDefaultDynamicFieldColor, getorigin, getVersion, GetThemeDetails } from "@/components/common/utility";
// import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
// import { getLocationIdFromStorage, setLocationIdInStorage, setRestaurantIdInStorage, setRestaurantNameInStorage } from "@/components/common/localstore";
// import { RestaurantsServices } from "../../redux/restaurants/restaurants.services";
// import { setRestaurantDetail } from "../../redux/restaurants/restaurants.slice";
// // import { setAppVersion } from "@/redux/restaurants/restaurants.action";
// // import { clearRedux } from "@/redux/clearredux/clearredux.action";

// const useRestaurantHandler = (metaDataRestaurant?: any, themetype?: number) => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
//   const [isResturantClose, setIsResturantClose] = useState(false);
//   const [isInvalidRestaurant, setIsInvalidRestaurant] = useState(false);
//   const [loadPaymentScreen, setLoadPaymentScreen] = useState(false);
//   const [themeUrl, setThemeUrl] = useState("");

//  // const { restaurant, metadata, cart, sessionid, userinfo } = useReduxData();
//   const { restaurant } = useReduxData();

//   const seoData = {
//     title: `Online Ordering || ${metaDataRestaurant?.restaurantname}`,
//     defaultTitle: `Online Ordering || ${metaDataRestaurant?.restaurantname}`,
//     description: "Online Ordering",
//     defaultDescription: "Online Ordering",
//     //image: metaDataRestaurant?.imageurl || restaurant?.restaurantdetail?.logo,
//     //defaultImage: metaDataRestaurant?.imageurl || restaurant?.restaurantdetail?.logo,
//     url: `${getorigin()}${router?.asPath}`,
//   };

//   const { dynamic, location } = router.query;

//   useEffect(() => {
//     const fetchRestaurant = async () => {
//       const restaurantURL = (dynamic as string).toLowerCase().replace(/ /g, "-");
//       const locationURL = (location as string)?.toLowerCase().replace(/ /g, "-");
//       const defaultLocationId = getLocationIdFromStorage();

//       try {
//         const response = await RestaurantsServices.getRestaurantsList(
//           restaurantURL,
//           locationURL,
//           defaultLocationId
//         );

//         if (response.length === 0) {
//           setIsInvalidRestaurant(true);
//           return;
//         }

//         const restaurantData = response[0];

//         // Apply styles
//         const colorArray = handleDefaultDynamicFieldColor(
//           restaurantData.color,
//           restaurantData.themetype
//         );

//         for (const [key, value] of Object.entries(dynamicColorObj)) {
//           const color = colorArray.find((field) => field.FieldName === key)?.Color;
//           document.documentElement.style.setProperty(value, color || "");
//         }

//         const themeData = GetThemeDetails(restaurantData.themetype);
//         setThemeUrl(themeData.url);

//         // Save in storage
//         setRestaurantIdInStorage(restaurantData.restaurantId);
//         setLocationIdInStorage(restaurantData.defaultlocationId);
//         setRestaurantNameInStorage(restaurantData.restaurantname);

//         dispatch(setRestaurantDetail(restaurantData));
//         //if (!sessionid) dispatch(createSessionId(uuidv4()));

//         setSelectedRestaurant(restaurantData);
//         setIsLoaded(true);
//       } catch (error) {
//         console.error("Error fetching restaurant:", error);
//         setIsInvalidRestaurant(true);
//       }
//     };

//     if (dynamic && !router.pathname.includes("FD123456")) {
//       fetchRestaurant();
//     }

//     if (router.pathname.includes("FD123456")) {
//       setLoadPaymentScreen(true);
//     }
//   }, [dynamic]);

// //   useEffect(() => {
// //     if (restaurant?.appversion !== getVersion()) {
// //       dispatch(setAppVersion(getVersion()));
// //     }
// //   }, [restaurant?.appversion]);

//   return {
//     isLoaded,
//     selectedRestaurant,
//     isResturantClose,
//     isInvalidRestaurant,
//     loadPaymentScreen,
//     themeUrl,
//     seoData,
//   };
// };

// export default useRestaurantHandler;
