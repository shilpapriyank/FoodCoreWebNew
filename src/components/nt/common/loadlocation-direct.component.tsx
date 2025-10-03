"use client";

import { useParams, useRouter } from "next/navigation";
import React, { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import { GetThemeDetails, ORDER_TYPE } from "../../common/utility";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { setpickupordelivery } from "../../../../redux/selected-delivery-data/selecteddelivery.slice";
import { LocationServices } from "../../../../redux/location/location.services";
import { getSelectedRestaurantTime } from "../../../../redux/main/main.slice";
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
import { getAllCategoryMenuItems } from "../../../../redux/category/category.slice";
import {
  deleteCartItemFromSessionId,
  emptycart,
} from "../../../../redux/cart/cart.slice";
import {
  setintialrewardpoints,
  setrewardpoint,
} from "../../../../redux/rewardpoint/rewardpoint.slice";
import { useAppDispatch } from "../../../../redux/hooks";

const LoadLocationDirectComponent = ({
  children,
  isLoadAddressChangeUrl = true,
}: {
  children?: ReactNode;
  isLoadAddressChangeUrl?: boolean;
}) => {
  const {
    restaurantinfo,
    sessionid,
    restaurant,
    userinfo,
    rewardpoints,
    selecteddelivery,
    categoryItemsList,
  } = useReduxData();
  const dispatch = useAppDispatch();
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
  const selctedTheme = GetThemeDetails(restaurantinfo?.themetype as number);
  const hasFetchedLocations = useRef(false);

  useEffect(() => {
    if (hasFetchedLocations.current) return;
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
        (location) => location.locationId === restaurantinfo?.defaultlocationId
      );
    let isLoadAddressList = !isAddressListSameRestaurant;
    //isLoadAddressList = addressList?.length !== 0 ? false : isLoadAddressList;
    if (
      location !== restaurantinfo?.defaultLocation.locationURL ||
      isLoadAddressList
    ) {
      hasFetchedLocations.current = true;
      //dispatch(restaurantAllLocation(restaurantinfo?.restaurantId as number));
      LocationServices.getAllLoaction(
        restaurantinfo?.restaurantId as number
      ).then((response) => {
        if (response) {
          // dispatch({
          //   type: RestaurantsTypes.RESTAURANT_LOCATION_LIST_WITH_TIME,
          //   payload: response,
          // });
          dispatch(restaurantAllLocation(response.restaurantId));
          setisLoadAddress(true);
        }
      });
      dispatch(
        getSelectedRestaurantTime({
          restaurantId: restaurantinfo?.restaurantId as number,
          locationId: restaurantinfo?.defaultlocationId as number,
        })
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
        addressList?.filter((item) => item.locationURL === location).length !==
        0;
      if (isLocationExist) {
        let urlLocation = addressList?.find(
          (item) => item.locationURL === location
        );
        handleClickChangeLocation(urlLocation?.locationId as number);
      } else {
        router.push(`/${selctedTheme?.url}/${dynamic}/error`);
      }
    }
  }, [
    restaurantinfo?.defaultLocation?.locationURL,
    addressList !== undefined,
    isLoadAddress,
  ]);

  const handleClickChangeLocation = (lid: number) => {
    setisLoad(false);
    LocationServices.changeRestaurantLocation(
      restaurantinfo?.restaurantId as number,
      lid
    ).then((res) => {
      if (res && restaurantinfo) {
        let updatedRestaurantInfo = JSON.parse(JSON.stringify(restaurantinfo));
        Object.keys(updatedRestaurantInfo).map((session) => {
          if (session === "defaultLocation") {
            Object.assign(updatedRestaurantInfo.defaultLocation, res);
          }
          if (session === "defaultlocationId") {
            updatedRestaurantInfo.defaultlocationId = res.locationId;
          }
        });
        dispatch(restaurantsdetail(null));
        dispatch(restaurantsdetail(updatedRestaurantInfo));
        //   CLEAR THE REDUX IF PREVIOUS LOCATION AND THE CURRENT SELECTED LOCATION IS NO SAME
        let oldLocationId = getLocationIdFromStorage();
        if (oldLocationId !== updatedRestaurantInfo.defaultlocationId) {
          dispatch(clearRedux());
          let id = uuidv4();
          dispatch(createSessionId(id));
        }
        setLocationIdInStorage(updatedRestaurantInfo.defaultlocationId);
        dispatch(
          setpickupordelivery(
            res?.defaultordertype
              ? ORDER_TYPE.DELIVERY.text
              : ORDER_TYPE.PICKUP.text
          )
        );
        // dispatch(refreshCategoryList(restaurantinfo, userinfo?.customerId));
        dispatch(
          getSelectedRestaurantTime({
            restaurantId: updatedRestaurantInfo?.restaurantId as number,
            locationId: lid as number,
          })
        );
        if (userinfo && userinfo?.customerId) {
          deleteCartItemFromSessionId({
            cartsessionId: sessionid as string,
            restaurantId: updatedRestaurantInfo?.restaurantId,
            locationId: updatedRestaurantInfo?.defaultLocation
              .locationId as number,
          });
          dispatch(emptycart());
          dispatch(setintialrewardpoints(userinfo));
        }
        if (userinfo && userinfo?.customerId) {
          CustomerServices.checkCustomerRewardPointsLocationBase(
            updatedRestaurantInfo.restaurantId,
            userinfo.customerId,
            0,
            "0",
            updatedRestaurantInfo?.defaultLocation.locationId
          ).then((res) => {
            if (res?.status == 1) {
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

        // dispatch(getAllCategoryMenuItems(restaurantinfo.restaurantId, lid,userinfo?.customerId))
        setisLoad(true);

        // const loadCat = useLoadCatData(restaurantinfo, false, categoryItemsList)
        dispatch(
          getAllCategoryMenuItems({
            restaurantId: updatedRestaurantInfo.restaurantId,
            locationId: lid,
            customerId: userinfo?.customerId as number,
            categories: "",
          })
        );

        //router.push(`/${selctedTheme.url}/${dynamic}/${res?.locationURL}`)

        // const loadCat = useLoadCatData(restaurantinfo, false, categoryItemsList)
      }
    });
  };

  return <Fragment>{isLoad && <>{children}</>}</Fragment>;
};

export default LoadLocationDirectComponent;
