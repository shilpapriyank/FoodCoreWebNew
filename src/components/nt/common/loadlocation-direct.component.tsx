// import { useRouter } from 'next/router';
// import React, { Fragment, useEffect, useState, ReactNode } from 'react';
// import { useDispatch } from 'react-redux';
// import { deleteCartItemFromSessionId, emptycart } from '../../../redux/cart/cart.action';
// import { clearRedux } from '../../../redux/clearredux/clearredux.action';
// import { getSelectedRestaurantTime } from '../../../redux/main/main.action';
// // import { restaurantsdetail } from '../../../redux/restaurants/restaurants.action';
// import { setintialrewardpoints, setrewardpoint } from '../../../redux/rewardpoint/rewardpoint.action';
// import { createSessionId } from '../../../redux/session/session.action';
// import { getLocationIdFromStorage, setLocationIdInStorage } from '../../default/Common/localstore';
// import { v4 as uuidv4 } from 'uuid';
// // import { LocationServices } from '../../../redux/location/location.services';
// // import { useReduxData } from '../../customhooks/useredux-data-hook';
// // import { RestaurantsTypes } from '../../../redux/restaurants/restaurants.types';
// import { GetThemeDetails, ORDER_TYPE } from '../../common/utility';
// import { setpickupordelivery } from '../../../redux/selected-delivery-data/selecteddelivery.action';
// // import { getAllCategoryMenuItems } from '../../../redux/category/category.action';
// // import { clearDeliveryRequestId } from '../../../redux/order/order.action';
// import { CustomerServices } from '../../../../redux/customer/customer.services';
// import { getAllCategoryMenuItems } from '../../../../redux/category/category.slice';
// import { RestaurantsTypes } from '../../../../redux/restaurants/restaurants.types';
// import { useReduxData } from '@/components/customhooks/useredux-data-hooks';
// import { clearDeliveryRequestId } from '../../../../redux/order/order.slice';
// import { LocationServices } from '../../../../redux/location/location.services';
// import { restaurantsdetail } from '../../../../redux/restaurants/restaurants.slice';

// interface Props {
//   children: ReactNode;
//   isLoadAddressChangeUrl?: boolean;
// }

// const LoadLocationDirectComponent: React.FC<Props> = ({ children, isLoadAddressChangeUrl = true }) => {
//   const { restaurantinfo, sessionid, restaurant, userinfo, rewardpoints, selecteddelivery, categoryItemsList } = useReduxData();
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { dynamic, location } = router.query as { dynamic: string; location: string };

//   const rewardvalue = rewardpoints?.rewardvalue;
//   const addressList = restaurant?.restaurantslocationlistwithtime?.addressList;
//   const [isLoad, setisLoad] = useState(location !== restaurantinfo?.defaultLocation?.locationURL ? false : true);
//   const ischangeurl = restaurant?.ischangeurl;
//   const [isLoadAddress, setisLoadAddress] = useState(false);

//   const selctedTheme = GetThemeDetails(restaurantinfo?.themetype);

//   useEffect(() => {
//     if (!selecteddelivery?.pickupordelivery) {
//       dispatch(setpickupordelivery(restaurantinfo?.defaultLocation?.defaultordertype ? ORDER_TYPE.DELIVERY.text : ORDER_TYPE.PICKUP.text));
//     }

//     const isAddressListSameRestaurant = addressList?.some(loc => loc.locationId === restaurantinfo.defaultlocationId);
//     const isLoadAddressList = !isAddressListSameRestaurant;

//     if ((location !== restaurantinfo.defaultLocation.locationURL) || isLoadAddressList) {
//       LocationServices.getAllLoaction(restaurantinfo.restaurantId).then(response => {
//         if (response) {
//           dispatch({
//             type: RestaurantsTypes.RESTAURANT_LOCATION_LIST_WITH_TIME,
//             payload: response
//           });
//           setisLoadAddress(true);
//         }
//       });
//       dispatch(getSelectedRestaurantTime(restaurantinfo.restaurantId, restaurantinfo.defaultlocationId));
//     } else {
//       setisLoadAddress(true);
//     }
//   }, [restaurantinfo?.defaultLocation?.restaurantId, addressList]);

//   useEffect(() => {
//     if (location !== restaurantinfo?.defaultLocation?.locationURL && (!ischangeurl || isLoadAddressChangeUrl) && isLoadAddress) {
//       const isLocationExist = addressList?.some(item => item.locationURL === location);
//       if (isLocationExist) {
//         const urlLocation = addressList?.find(item => item.locationURL === location);
//         if (urlLocation) handleClickChangeLocation(urlLocation.locationId);
//       } else {
//         router.push(`/${selctedTheme.url}/${dynamic}/error`);
//       }
//     }
//   }, [restaurantinfo?.defaultLocation?.locationURL, addressList, isLoadAddress]);

//   const handleClickChangeLocation = (lid: number) => {
//     setisLoad(false);
//     LocationServices.changeRestaurantLocation(restaurantinfo.restaurantId, lid).then((res) => {
//       if (res) {
//         Object.keys(restaurantinfo).forEach((key) => {
//           if (key === 'defaultLocation') {
//             Object.assign(restaurantinfo.defaultLocation, res);
//           }
//           if (key === 'defaultlocationId') {
//             restaurantinfo.defaultlocationId = res.locationId;
//           }
//         });

//         dispatch(restaurantsdetail(null));
//         dispatch(restaurantsdetail(restaurantinfo));

//         const oldLocationId = getLocationIdFromStorage();
//         if (oldLocationId !== restaurantinfo.defaultlocationId) {
//           dispatch(clearRedux());
//           const id = uuidv4();
//           dispatch(createSessionId(id));
//         }
//         setLocationIdInStorage(restaurantinfo.defaultlocationId);
//         dispatch(setpickupordelivery(res?.defaultordertype ? ORDER_TYPE.DELIVERY.text : ORDER_TYPE.PICKUP.text));
//         dispatch(getSelectedRestaurantTime(restaurantinfo.restaurantId, lid));

//         if (userinfo?.customerId) {
//           deleteCartItemFromSessionId(sessionid, restaurantinfo.restaurantId, restaurantinfo.defaultLocation.locationId);
//           dispatch(emptycart());
//           dispatch(setintialrewardpoints(userinfo));

//           CustomerServices.checkCustomerRewardPointsLocationBase(
//             restaurantinfo.restaurantId,
//             userinfo.customerId,
//             0,
//             0,
//             restaurantinfo?.defaultLocation.locationId
//           ).then((res) => {
//             if (res.status === 1) {
//               const rewards = {
//                 rewardvalue: rewardvalue,
//                 rewardamount: parseFloat(((res?.result?.totalrewardpoints) / rewardvalue).toFixed(2)),
//                 rewardPoint: res?.result?.totalrewardpoints,
//                 totalRewardPoints: res?.result?.totalrewardpoints,
//                 redeemPoint: 0,
//               };
//               dispatch(setrewardpoint(rewards));
//             }
//           });
//         }
//         dispatch(clearDeliveryRequestId(""));
//         dispatch(getAllCategoryMenuItems(restaurantinfo.restaurantId, lid, userinfo?.customerId));
//         setisLoad(true);
//       }
//     });
//   };

//   return (
//     <Fragment>
//       {isLoad && children}
//     </Fragment>
//   );
// };

// export default LoadLocationDirectComponent;