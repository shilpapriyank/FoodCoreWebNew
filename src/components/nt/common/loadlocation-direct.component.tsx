'use client';

import { useParams, useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { GetThemeDetails, ORDER_TYPE } from "../../common/utility";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { setpickupordelivery } from "../../../../redux/selected-delivery-data/selecteddelivery.slice";
import { LocationServices } from "../../../../redux/location/location.services";
import { RestaurantsTypes } from "../../../../redux/restaurants/restaurants.types";
import {
  getSelectedRestaurantTime,
  refreshCategoryList,
} from "../../../../redux/main/main.slice";
import {
  restaurantAllLocation,
  restaurantsdetail,
} from "../../../../redux/restaurants/restaurants.slice";
import { v4 as uuidv4 } from "uuid";
import {
  getLocationIdFromStorage,
  setLocationIdInStorage,
} from "@/components/common/localstore";
import { createSessionId } from "../../../../redux/session/session.slice";
import { CustomerServices } from "../../../../redux/customer/customer.services";
import { clearDeliveryRequestId } from "../../../../redux/order/order.slice";
import { clearRedux } from "../../../../redux/tableorder/tableorder.slice";
import {
  getAllCategoryMenuItems,
  selectedCategory,
} from "../../../../redux/category/category.slice";
import { deleteCartItemFromSessionId } from "../../../../redux/cart/cart.slice";
import {
  setintialrewardpoints,
  setrewardpoint,
} from "../../../../redux/rewardpoint/rewardpoint.slice";
import { CategoryItem } from "@/types/category-types/category.services.type";
import { AppDispatch } from "../../../../redux/store";
import { useDispatch } from "react-redux";
import useLoadCatData from "@/components/customhooks/useloadcatdata-hook";
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
    rewardpoints,
    selecteddelivery,
    categoryItemsList,
  } = useReduxData();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams();
  const { dynamic, location } = params;
  const rewardvalue = rewardpoints?.rewardvalue;
  const addressList = restaurant?.restaurantslocationlistwithtime?.addressList;
  const [isLoad, setisLoad] = useState<boolean>(
    location !== restaurantinfo?.defaultLocation?.locationURL ? false : true
  );
  let ischangeurl = restaurant?.ischangeurl;
  const [isLoadAddress, setisLoadAddress] = useState<boolean>(false);

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
    let isAddressListSameRestaurant =
      addressList &&
      addressList?.length > 0 &&
      addressList?.some(
        (location: any) =>
          location.locationId === restaurantinfo.defaultlocationId
      );
    let isLoadAddressList = !isAddressListSameRestaurant;
    isLoadAddressList = addressList?.length !== 0 ? false : isLoadAddressList;
    if (
      location !== restaurantinfo.defaultLocation.locationURL ||
      isLoadAddressList
    ) {
      dispatch(restaurantAllLocation(restaurantinfo.restaurantId) as any);
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
      dispatch(
        getSelectedRestaurantTime(
          restaurantinfo.restaurantId,
          restaurantinfo.locationId
        ) as any
      );
    } else {
      setisLoadAddress(true);
    }
  }, [
    restaurantinfo?.defaultLocation?.restaurantId,
    addressList !== undefined,
  ]);

  //SELECT THE LOCATION IF USER PUT THE DIRECT LINK IN THE URL WITH LOCATION OPEN THAT LOCATION
  useEffect(() => {
    if (
      location !== restaurantinfo?.defaultLocation?.locationURL &&
      (!ischangeurl || isLoadAddressChangeUrl) &&
      isLoadAddress
    ) {
      let isLocationExist =
        addressList?.filter((item: any) => item.locationURL === location)
          .length !== 0;
      if (isLocationExist) {
        let urlLocation = addressList?.find(
          (item: any) => item.locationURL === location
        );
        handleClickChangeLocation(urlLocation?.locationId);
      } else {
        router.push(`/${selctedTheme.url}/${dynamic}/error`);
      }
    }
  }, [
    restaurantinfo?.defaultLocation?.locationURL,
    addressList !== undefined,
    isLoadAddress,
  ]);

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
          dispatch(clearRedux());
          let id = uuidv4();
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
        // dispatch(
        //   refreshCategoryList({
        //     newselectedRestaurant: restaurantinfo.restaurantId,
        //     customerId: userinfo?.customerId,
        //   }) as any
        // );
        dispatch(
          getSelectedRestaurantTime(
            restaurantinfo.restaurantId,
            restaurantinfo.lid
          ) as any
        );
        if (userinfo && userinfo?.customerId) {
          deleteCartItemFromSessionId(
            sessionid,
            restaurantinfo.restaurantId,
            restaurantinfo.defaultLocation.locationId
          );
         // dispatch(emptycart());
          dispatch(setintialrewardpoints(userinfo as any));
        }
        if (userinfo && userinfo?.customerId) {
          CustomerServices.checkCustomerRewardPointsLocationBase(
            restaurantinfo.restaurantId,
            userinfo.customerId,
            0,
            "0",
            restaurantinfo?.defaultLocation.locationId
          ).then((res: any) => {
            if (res.status == 1) {
              let rewards = {
                rewardvalue: rewardvalue,
                rewardamount: parseFloat(
                  (res?.result?.totalrewardpoints / rewardvalue - 0).toFixed(2)
                ),
                rewardPoint: res?.result?.totalrewardpoints,
                totalRewardPoints: res?.result?.totalrewardpoints,
                redeemPoint: 0,
              };
              dispatch(setrewardpoint(rewards));
            }
          });
        }
        dispatch(clearDeliveryRequestId());

        dispatch(
          getAllCategoryMenuItems({
            restaurantId: restaurantinfo.restaurantId,
            locationId: lid,
            customerId: userinfo?.customerId,
            categories: "",
            selectedCategoryUrl: "",
          }) as any
        );
        setisLoad(true);

        const loadCat = useLoadCatData(restaurantinfo)
        dispatch(
          getAllCategoryMenuItems(restaurantinfo.restaurantId, lid) as any
        );
        router.push(`/${selctedTheme.url}/${dynamic}/${res?.locationURL}`);
      }
    });
  };
  return <Fragment>{isLoad && <>{children}</>}</Fragment>;
};

export default LoadLocationDirectComponent;
