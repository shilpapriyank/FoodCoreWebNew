"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Head from "next/head";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { useAppDispatch } from "../../../../../../../redux/hooks";
import { useParams, useRouter } from "next/navigation";
import { GetAllRestaurantInfo } from "@/types/restaurant-types/restaurant.type";
import { GetCurrency, GetThemeDetails } from "@/components/common/utility";
import { useQuery } from "@tanstack/react-query";
import { OrderServices } from "../../../../../../../redux/order/order.services";
import { LocationServices } from "../../../../../../../redux/location/location.services";
import { restaurantsdetail } from "../../../../../../../redux/restaurants/restaurants.slice";
import {
  getLocationIdFromStorage,
  setLocationIdInStorage,
} from "@/components/common/localstore";
import { clearRedux } from "../../../../../../../redux/clearredux/clearredux.slice";
import { createSessionId } from "../../../../../../../redux/session/session.slice";
import {
  getSelectedRestaurantTime,
  refreshCategoryList,
} from "../../../../../../../redux/main/main.slice";
import {
  deleteCartItemFromSessionId,
  emptycart,
  getCartItemCount,
} from "../../../../../../../redux/cart/cart.slice";
import { setintialrewardpoints } from "../../../../../../../redux/rewardpoint/rewardpoint.slice";
import { setpickupordelivery } from "../../../../../../../redux/selected-delivery-data/selecteddelivery.slice";
import { ORDER_TYPE } from "@/components/nt/common/utility";
import handleNotify from "@/components/default/helpers/toaster/toaster-notify";
import { ORDERDETAILPAGEMESSAGE } from "@/components/nt/helpers/static-message/orderdetail-message";
import { ToasterPositions } from "@/components/default/helpers/toaster/toaster-positions";
import { ToasterTypes } from "@/components/default/helpers/toaster/toaster-types";
import { PAGES } from "@/components/nt/common/pages";
import Layout from "@/components/nt/layout/layout.component";
import AuthGuardComponent from "@/components/nt/common/authgaurd.component";
import OrderDetail from "@/components/nt/orderdetail/order-detail.component";
import OrderCharges from "@/components/nt/orderdetail/order-charges.cmponent";
import PageTitle from "@/components/nt/common/page-title.component";
import CommonModal from "@/components/nt/common/common-model.component";

const Page = () => {
  const { restaurantinfo, userinfo, sessionid } = useReduxData();
  const dispatch = useAppDispatch();
  let { defaultLocation } = restaurantinfo as GetAllRestaurantInfo;
  const router = useRouter();
  const params = useParams();
  const { dynamic, location, index, orderid } = params;
  const parsedOrderId = Number(orderid);
  let customerId = userinfo ? userinfo.customerId : 0;
  const restaurantId = restaurantinfo?.restaurantId;
  const locationId = restaurantinfo?.defaultlocationId;
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const selectedTheme = GetThemeDetails(restaurantinfo?.themetype as number);
  const [lid, setlid] = useState<string>("");
  const [orderType, setorderType] = useState<string>("");
  const currency = GetCurrency();
  let newSessionId = "";
  const [orderDetailId, setorderDetailId] = useState<string>("");
  const [reOrderClass, setreOrderClass] = useState<string>("");
  const [openLocatioModel, setopenLocatioModel] = useState<boolean>(false);
  const defaultLocationUrl = restaurantinfo?.defaultLocation.locationURL;
  const isSchoolProgramEnabled = restaurantinfo?.isSchoolProgramEnabled;
  const { isError, isLoading, data, isSuccess, refetch, isFetching } = useQuery(
    {
      queryKey: ["getOrders", restaurantId, locationId],
      queryFn: () =>
        OrderServices.getOrderInfo({
          restaurantId: restaurantId as number,
          locationId: locationId as number,
          orderId: parsedOrderId,
          customerId: customerId,
        }),
      staleTime: 0,
      refetchOnWindowFocus: false,
      //isPlaceholderData: true,
    }
  );

  let OrderDetailCal;
  let OrderDetails;
  let locationid;
  if (isSuccess && data?.orderDetailInfo) {
    OrderDetailCal = data.orderDetailInfo.OrderDetailCal;
    OrderDetails = data.orderDetailInfo.OrderDetails;
    locationid = data.orderDetailInfo.locationId;
  }

  const handleChangeLocation = (id: string) => {
    LocationServices.changeRestaurantLocation(
      restaurantinfo?.restaurantId as number,
      Number(id)
    ).then((res) => {
      if (res && restaurantinfo) {
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
          dispatch(clearRedux(true));
          let id = uuidv4();
          newSessionId = id;
          dispatch(createSessionId(id));
        }
        setLocationIdInStorage(restaurantinfo.defaultlocationId);
        // setdefaultLoactionId(lid)
        dispatch(
          refreshCategoryList({
            newselectedRestaurant: restaurantinfo,
            customerId: customerId,
          })
        );
        dispatch(
          getSelectedRestaurantTime({
            restaurantId: restaurantinfo.restaurantId,
            locationId: Number(lid),
          })
        );
        if (userinfo && userinfo?.customerId) {
          deleteCartItemFromSessionId({
            cartsessionId: sessionid as string,
            restaurantId: restaurantinfo.restaurantId,
            locationId: restaurantinfo.defaultLocation.locationId,
          });
          dispatch(emptycart());
          dispatch(setintialrewardpoints(userinfo));
        }
        // router.push(`/${selctedTheme.url}/${dynamic}/${locationUrl}/delivery`)
        dispatch(
          setpickupordelivery(
            res?.defaultordertype
              ? ORDER_TYPE.DELIVERY.text
              : ORDER_TYPE.PICKUP.text
          )
        );
        // TO DO:CHECK THE ORDER IS FULL ORDER OR PARTICULAR ITEM ORDER
        // setTimeout(()=>{
        if (orderType === "fullOrder") {
          repeatFullOrder(res.locationURL, newSessionId);
        } else {
          repeatOrder(
            orderDetailId,
            res.locationURL,
            newSessionId,
            reOrderClass
          );
        }
        // },500)
      }
    });
  };

  const repeatOrder = (
    orderDetailId: any,
    locationUrl: string,
    SessionId: string,
    buttonClass: string
  ) => {
    OrderServices.repeatOrder({
      restaurantId: restaurantinfo?.restaurantId as number,
      locationId: restaurantinfo?.defaultlocationId as number,
      orderId: parsedOrderId,
      orderDetailId: orderDetailId,
      isFullOrder: false,
      cartsessionid: SessionId,
    }).then((response) => {
      if (response.status === 1) {
        dispatch(
          getCartItemCount({
            cartsessionId: SessionId,
            locationId: restaurantinfo?.defaultlocationId as number,
            restaurantId: restaurantinfo?.restaurantId as number,
            customerId: customerId,
          })
        );
        handleNotify(
          ORDERDETAILPAGEMESSAGE.ORDER_PLACE_MESSAGE,
          ToasterPositions.TopRight,
          ToasterTypes.Success
        );
        setopenLocatioModel(false);
        let button = document.getElementsByClassName(buttonClass);
        button[0]?.classList.add("greyColor", "non-cursor");
        // setTimeout(() => {
        router.push(
          "/" +
            selectedTheme?.url +
            "/" +
            restaurantinfo?.restaurantURL.trim() +
            "/" +
            locationUrl +
            "/" +
            PAGES.ORDER_DETAIL +
            "/" +
            orderid
        );
        // }, 2000);
      } else {
        handleNotify(
          "Something went wrong",
          ToasterPositions.TopRight,
          ToasterTypes.Error
        );
      }
    });
  };
  const handleOrderClick = (orderDetailId: any, buttonClass: string) => {
    // TO DO:CHECK THE LOCATIONID IS SAME THEN DO THIS

    repeatOrder(
      orderDetailId,
      defaultLocationUrl as string,
      sessionid as string,
      buttonClass
    );
  };
  const repeatFullOrder = (locationUrl: string, SessionId: string) => {
    setIsProcessing(true);
    OrderServices.repeatOrder({
      restaurantId: restaurantinfo?.restaurantId as number,
      locationId: restaurantinfo?.defaultlocationId as number,
      orderId: parsedOrderId,
      orderDetailId: 0,
      isFullOrder: true,
      cartsessionid: SessionId,
    }).then((response) => {
      if (response.status === 1) {
        dispatch(
          getCartItemCount({
            cartsessionId: SessionId,
            locationId: restaurantinfo?.defaultlocationId as number,
            restaurantId: restaurantinfo?.restaurantId as number,
            customerId: customerId,
          })
        );
        handleNotify(
          ORDERDETAILPAGEMESSAGE.ORDER_PLACE_MESSAGE,
          ToasterPositions.TopRight,
          ToasterTypes.Success
        );
        setopenLocatioModel(false);
        setTimeout(() => {
          setIsProcessing(false);
          router.push(
            "/" +
              selectedTheme?.url +
              "/" +
              restaurantinfo?.restaurantURL.trim() +
              "/" +
              locationUrl +
              "/" +
              PAGES.CHECKOUT
          );
        }, 2000);
      } else {
        setIsProcessing(false);
        handleNotify(
          "Something went wrong",
          ToasterPositions.TopRight,
          ToasterTypes.Error
        );
      }
    });
  };
  const HandleFullOrderClick = () => {
    repeatFullOrder(defaultLocationUrl as string, sessionid as string);
  };

  const handleLocationDetails = (
    lid: string,
    orderType: any,
    orderDetailId: any,
    buttonClass: string
  ) => {
    setopenLocatioModel(true);
    setlid(lid);
    setorderType(orderType);
    setorderDetailId(orderDetailId);
    setreOrderClass(buttonClass);
  };

  const handleToggle = (value: boolean) => {
    setopenLocatioModel(value);
  };

  return (
    <>
      <Head>
        <title>
          Order details || {restaurantinfo?.restaurantname}: Ordering Online
        </title>
        <meta name="description" content="Online description" />
      </Head>

      <Layout>
        <AuthGuardComponent>
          <div className="row mt-1 mt-2 px-4">
            <div className="col-lg-12 col-md-12 col-12">
              <a
                className="cursor-pointer mb-5 "
                onClick={() => {
                  router.back();
                }}
              >
                My Orders
              </a>{" "}
              - <a className="mb-5 nohover ">Order Details</a>
            </div>
          </div>
          <section className="categories-info pt-4 ">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-9 col-md-8 col-12">
                  <PageTitle title={"Order details"} />
                  {isSuccess && OrderDetails?.length > 0 && (
                    <OrderDetail
                      locatioId={locationid}
                      defaultLocation={defaultLocation}
                      orderdetailCal={OrderDetailCal}
                      orderdetails={OrderDetails}
                      handleOrderClick={handleOrderClick}
                      HandleFullOrderClick={HandleFullOrderClick}
                      isProcessing={isProcessing}
                      currency={currency}
                      handleLocationDetails={handleLocationDetails}
                    />
                  )}
                </div>
                {OrderDetailCal && (
                  <OrderCharges
                    orderdetailCal={OrderDetailCal}
                    HandleFullOrderClick={HandleFullOrderClick}
                    isProcessing={isProcessing}
                    locatioId={locationid}
                  />
                )}
              </div>
            </div>
          </section>

          {openLocatioModel && (
            <CommonModal
              title={`Confirm Change Location`}
              // text={"Thank you for registering! To continue with your order, please verify your email. We've emailed the link to you. Simply click on it to get started."}
              btn1Name="Confirm"
              keyName=""
              isbtn2={true}
              btn2Name="Cancel"
              handleClickBtn1={() => handleChangeLocation(lid)}
              handleClickBtn2={() => handleToggle(false)}
              handleToggle={handleToggle}
              isOpenModal={openLocatioModel}
            >
              <p>
                Can&apos;t order from this location as your cart already have
                item(s) from different location. Do you want to remove all the
                items from the previous location and continue with your order?
              </p>
            </CommonModal>
          )}
        </AuthGuardComponent>
      </Layout>
    </>
  );
};

export default Page;
