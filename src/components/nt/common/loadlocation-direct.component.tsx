import { useParams, useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { GetThemeDetails, ORDER_TYPE } from "../../common/utility";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { setpickupordelivery } from "../../../../redux/selected-delivery-data/selecteddelivery.slice";
import { LocationServices } from "../../../../redux/location/location.services";
import { RestaurantsTypes } from "../../../../redux/restaurants/restaurants.types";
import { getSelectedRestaurantTime } from "../../../../redux/main/main.slice";
import {
  restaurantAllLocation,
  restaurantsAllLocation,
  restaurantsdetail,
} from "../../../../redux/restaurants/restaurants.slice";
import {
  getLocationIdFromStorage,
  setLocationIdInStorage,
} from "@/components/common/localstore";
import { clearRedux } from "../../../../redux/clearredux/clearredux.slice";
import { createSessionId } from "../../../../redux/session/session.slice";
import { CustomerServices } from "../../../../redux/customer/customer.services";
import { setRewardPoint } from "../../../../redux/cart/cart.slice";
import { clearDeliveryRequestId } from "../../../../redux/order/order.slice";
import { useAppDispatch } from "../../../../redux/hooks";
// import useLoadCatData from '../../customhooks/useloadcatdata-hook';

const LoadLocationDirectComponent = ({
  children,
  isLoadAddressChangeUrl = true,
}: any) => {
  // const { restaurantinfo, sessionid, restaurant, userinfo,rewardpoints, selecteddelivery, categoryItemsList } = useReduxData()
  const {
    restaurantinfo,
    sessionid,
    restaurant,
    userinfo,
    selecteddelivery,
    categoryItemsList,
  } = useReduxData();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useParams();
  const { dynamic, location, id, category, index } = params;
  // const rewardvalue=rewardpoints?.rewardvalue
  // const addressList = restaurant?.restaurantslocationlistwithtime?.addressList;
  const [isLoad, setisLoad] = useState(
    location !== restaurantinfo?.defaultLocation?.locationURL ? false : true
  );
  let ischangeurl = restaurant?.ischangeurl;
  const [isLoadAddress, setisLoadAddress] = useState(false);

  const selctedTheme = GetThemeDetails(restaurantinfo?.themetype);
  useEffect(() => {
    if (
      selecteddelivery?.pickupordelivery === null ||
      Object.keys(selecteddelivery?.pickupordelivery).length === 0 ||
      selecteddelivery?.pickupordelivery === ""
    ) {
      dispatch(
        setpickupordelivery(
          restaurantinfo?.defaultLocation?.defaultordertype
            ? ORDER_TYPE.DELIVERY.text
            : ORDER_TYPE.PICKUP.text
        )
      );
    }
    //TO DO:CHECK IF LOATION ADDRESLIST IS CURRENT RESTAURANT
    //let isAddressListSameRestaurant = (addressList && addressList?.length > 0) && addressList?.some((location: any) => location.locationId === restaurantinfo.defaultlocationId)
    // const isLoadAddressList = !isAddressListSameRestaurant;
    // isLoadAddressList = addressList?.length !== 0 ? false : isLoadAddressList;
    if (
      location !== restaurantinfo.defaultLocation.locationURL ||
      isLoadAddress
    ) {
      //dispatch(restaurantAllLocation(restaurantinfo.restaurantId));
      LocationServices.getAllLoaction(restaurantinfo.restaurantId).then(
        (response) => {
          if (response) {
            dispatch({
              type: RestaurantsTypes.RESTAURANT_LOCATION_LIST_WITH_TIME,
              payload: response,
            });
            setisLoadAddress(true);
          }
        }
      );
      //dispatch(getSelectedRestaurantTime(restaurantinfo.restaurantId, restaurantinfo.defaultlocationId));
    } else {
      setisLoadAddress(true);
    }
  }, [
    restaurantinfo?.defaultLocation?.restaurantId,
    //addressList !== undefined,
  ]);

  //SELECT THE LOCATION IF USER PUT THE DIRECT LINK IN THE URL WITH LOCATION OPEN THAT LOCATION
  //   useEffect(() => {
  //     if (
  //       location !== restaurantinfo?.defaultLocation?.locationURL &&
  //       (!ischangeurl || isLoadAddressChangeUrl) &&
  //       isLoadAddress
  //     ) {
  //       let isLocationExist =
  //         addressList?.filter((item: any) => item.locationURL === location)
  //           .length !== 0;
  //       if (isLocationExist) {
  //         let urlLocation = addressList?.find(
  //           (item: any) => item.locationURL === location
  //         );
  //         handleClickChangeLocation(urlLocation?.locationId);
  //       } else {
  //         router.push(`/${selctedTheme.url}/${dynamic}/error`);
  //       }
  //     }
  //   }, [
  //     restaurantinfo?.defaultLocation?.locationURL,
  //     addressList !== undefined,
  //     isLoadAddress,
  //   ]);

  const handleClickChangeLocation = (lid: any) => {
    setisLoad(false);
    LocationServices.changeRestaurantLocation(
      restaurantinfo.restaurantId,
      lid
    ).then((res) => {
      if (res) {
        Object.keys(restaurantinfo).map((session) => {
          if (session === "defaultLocation") {
            Object.assign(restaurantinfo.defaultLocation, res);
          }
          if (session === "defaultlocationId") {
            restaurantinfo.defaultlocationId = res.locationId;
          }
        });
        dispatch(restaurantsdetail(null));
        dispatch(restaurantsdetail(restaurantinfo));
        //   CLEAR THE REDUX IF PREVIOUS LOCATION AND THE CURRENT SELECTED LOCATION IS NO SAME
        let oldLocationId = getLocationIdFromStorage();
        if (oldLocationId !== restaurantinfo.defaultlocationId) {
          //   dispatch(clearRedux());
          //   let id = uuidv4();
          dispatch(createSessionId(id as string));
        }
        setLocationIdInStorage(restaurantinfo.defaultlocationId);
        dispatch(
          setpickupordelivery(
            res?.defaultordertype
              ? ORDER_TYPE.DELIVERY.text
              : ORDER_TYPE.PICKUP.text
          )
        );
        // dispatch(refreshCategoryList(restaurantinfo, userinfo?.customerId));
        //dispatch(getSelectedRestaurantTime(restaurantinfo.restaurantId, lid))
        if (userinfo && userinfo?.customerId) {
          //   deleteCartItemFromSessionId(sessionid, restaurantinfo.restaurantId, restaurantinfo.defaultLocation.locationId);
          //   dispatch(emptycart());
          //   dispatch(setintialrewardpoints(userinfo));
        }
        // if (userinfo && userinfo?.customerId) {
        //   CustomerServices.checkCustomerRewardPointsLocationBase(restaurantinfo.restaurantId, userinfo.customerId, 0, 0, restaurantinfo?.defaultLocation.locationId).then((res :any) => {
        //     if (res.status == 1) {
        //       let rewards = {
        //         rewardvalue: rewardvalue,
        //         rewardamount: parseFloat(((res?.result?.totalrewardpoints) / rewardvalue - 0).toFixed(2)),
        //         rewardPoint: res?.result?.totalrewardpoints,
        //         totalRewardPoints: res?.result?.totalrewardpoints,
        //         redeemPoint: 0,
        //       }
        //       dispatch(setRewardPoint(rewards));
        //     }
        //   })
        // }
        // dispatch(clearDeliveryRequestId(""))

        // dispatch(getAllCategoryMenuItems(restaurantinfo.restaurantId, lid,userinfo?.customerId))
        setisLoad(true);

        // const loadCat = useLoadCatData(restaurantinfo, false, categoryItemsList)
        //dispatch(getAllCategoryMenuItems(restaurantinfo.restaurantId, lid, userinfo?.customerId))

        //router.push(`/${selctedTheme.url}/${dynamic}/${res?.locationURL}`)

        // const loadCat = useLoadCatData(restaurantinfo, false, categoryItemsList)
      }
    });
  };
  return <Fragment>{isLoad && <>{children}</>}</Fragment>;
};

export default LoadLocationDirectComponent;
