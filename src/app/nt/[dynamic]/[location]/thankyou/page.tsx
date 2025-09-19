"use client";

import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import Head from "next/head";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch } from "../../../../../../redux/hooks";
import { DELIVERYSERVICES, GetThemeDetails } from "@/components/common/utility";
import { useEffect, useState } from "react";
import useUtility from "@/components/customhooks/utility-hook";
import { useQuery } from "@tanstack/react-query";
import { OrderServices } from "../../../../../../redux/order/order.services";
import { ORDER_TYPE } from "@/components/nt/common/utility";
import { setpickupordelivery } from "../../../../../../redux/selected-delivery-data/selecteddelivery.slice";
import { ORDERCONFIRMMESSAGE } from "@/components/nt/helpers/static-message/orderconfirm-message";
import Layout from "@/components/nt/layout/layout.component";
import { PAGES } from "@/components/nt/common/pages";
import { emptyorder } from "../../../../../../redux/order/order.slice";

const ThankYou = () => {
  const { order, restaurantinfo, userinfo, selecteddelivery } = useReduxData();
  const router = useRouter();
  const params = useParams();
  const { dynamic, location } = params;
  const dispatch = useAppDispatch();
  let orderinfo = order;
  let orderId = orderinfo?.orderId;
  console.log("orderId:", orderId);
  const themeURL = restaurantinfo?.themetype
    ? GetThemeDetails(restaurantinfo.themetype)?.url
    : "";
  const locationFullLink =
    themeURL && restaurantinfo?.restaurantURL && location
      ? `/${themeURL}/${restaurantinfo.restaurantURL}/${location}`
      : "";
  const [trackingurl, setTrackingurl] = useState<string>("");
  const { deliveryService }: any = restaurantinfo?.defaultLocation;
  const pickupordelivery = selecteddelivery?.pickupordelivery;
  const { isDisplayPrice } = useUtility();

  const { isError, isLoading, data, isSuccess } = useQuery({
    queryKey: ["GetOrderConfirmation", orderId > 0],
    queryFn: () =>
      OrderServices.getOrderInfo({
        restaurantId: restaurantinfo?.restaurantId as number,
        locationId: restaurantinfo?.defaultlocationId as number,
        orderId: orderId,
        customerId: userinfo?.customerId as number,
      }),

    staleTime: 3000,
    refetchOnWindowFocus: false,
    enabled:
      (userinfo?.customerId as number) > 0 ||
      userinfo?.customerId !== undefined,
  });

  useEffect(() => {
    if (
      deliveryService === DELIVERYSERVICES.UBEREATS &&
      pickupordelivery === ORDER_TYPE.DELIVERY.text &&
      data?.orderDetailInfo?.OrderDetailCal.orderNo !== "" &&
      (data?.orderDetailInfo?.OrderDetailCal?.trackingurl === "" ||
        data?.orderDetailInfo?.OrderDetailCal?.trackingurl === null) &&
      trackingurl === ""
    ) {
      setTimeout(() => {
        OrderServices.getOrderDeliveryServiceDetails({
          restaurantId: restaurantinfo?.restaurantId as number,
          locationId: restaurantinfo?.defaultlocationId as number,
          orderId: orderId,
        }).then((response) => {
          if (response && response != undefined && response !== "") {
            setTrackingurl(response);
          }
        });
      }, 5000);
    } else {
      if (
        data &&
        data?.orderDetailInfo?.OrderDetailCal.trackingurl !== "" &&
        data?.orderDetailInfo?.OrderDetailCal.trackingurl !== null
      )
        setTrackingurl(data?.orderDetailInfo?.OrderDetailCal.trackingurl);
    }
  }, [data]);

  const handlePlaceNewOrder = () => {
    //RESET ORDER SETTING
    dispatch(setpickupordelivery(""));
    router.push(`${locationFullLink}`);
  };

  if (
    !isLoading &&
    (data === null ||
      userinfo?.customerId === undefined ||
      orderinfo?.orderId <= 0)
  ) {
    router.push(`${locationFullLink}`);
    //return null;
  }

  return (
    <>
      <Head>
        <title>
          Thank You || {restaurantinfo?.restaurantname}:{" "}
          {ORDERCONFIRMMESSAGE.ONLINE_ORDERING}
        </title>
        <meta name="description" content="Online description" />
      </Head>
      <Layout>
        {(data !== null || (userinfo?.customerId as number) > 0) && (
          <>
            {orderinfo && orderinfo?.orderId > 0 && (
              <main>
                <section className="gift-cards mt-4">
                  <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-lg-7 col-md-10 col-12">
                        <div className="row align-items-center">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                            <div className="card">
                              <div className="card-header bg-success">
                                Order Confirmation
                              </div>

                              {isLoading === true && (
                                <h3 className="orange-text">Loading...</h3>
                              )}

                              {data && isSuccess === true && !isLoading && (
                                <div className="card-body py-5">
                                  <div className="custom-icons">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 512 512"
                                    >
                                      {/*! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
                                      <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM164.1 325.5C182 346.2 212.6 368 256 368s74-21.8 91.9-42.5c5.8-6.7 15.9-7.4 22.6-1.6s7.4 15.9 1.6 22.6C349.8 372.1 311.1 400 256 400s-93.8-27.9-116.1-53.5c-5.8-6.7-5.1-16.8 1.6-22.6s16.8-5.1 22.6 1.6zM208.4 208c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32zm128 32c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z" />
                                    </svg>
                                  </div>
                                  <h3 className="color-green fw-bold mb-3">
                                    Thank You
                                  </h3>
                                  <p>
                                    <b>Dear Customer</b>
                                  </p>
                                  <p>
                                    Thank you. Your order has been placed and
                                    will be processed soon.
                                  </p>
                                  <p>
                                    Order Number :{" "}
                                    <b className="orange-text">
                                      {
                                        data?.orderDetailInfo?.OrderDetailCal
                                          .orderNo
                                      }
                                    </b>
                                  </p>
                                  {isDisplayPrice && (
                                    <p>
                                      Amount Charged :{" "}
                                      <b className="orange-text">
                                        $
                                        {data?.orderDetailInfo?.OrderDetailCal?.calculatedTotal.toFixed(
                                          2
                                        )}
                                      </b>
                                    </p>
                                  )}
                                  {/* {
                                data?.orderDetailInfo?.OrderDetailCal && data?.orderDetailInfo?.OrderDetailCal?.trackingurl !== null && data?.orderDetailInfo?.OrderDetailCal?.trackingurl !== '' &&
                                <p>Tracking URL :<span className="color_orange"><a href={`${data?.orderDetailInfo?.OrderDetailCal?.trackingurl}`} target="_blank" rel="noreferrer">  <i className="fa fa-truck" style={{ color: "black", fontSize: "20px" }}></i></a></span></p>
                              } */}

                                  {/* delivery url */}
                                  {(deliveryService ===
                                    DELIVERYSERVICES.UBEREATS ||
                                    deliveryService ===
                                      DELIVERYSERVICES.DOORDASH) &&
                                    pickupordelivery ===
                                      ORDER_TYPE.DELIVERY.text &&
                                    data?.orderDetailInfo?.OrderDetailCal
                                      .orderNo !== "" && (
                                      <>
                                        {trackingurl !== "" ? (
                                          <p className="size_20">
                                            Tracking Url # :{" "}
                                            <span className="color_orange">
                                              <a
                                                href={trackingurl}
                                                target="_blank"
                                                rel="noreferrer"
                                              >
                                                {" "}
                                                <i
                                                  className="fa fa-truck"
                                                  style={{
                                                    color: "black",
                                                    fontSize: "25px",
                                                  }}
                                                ></i>
                                              </a>
                                            </span>
                                          </p>
                                        ) : (
                                          <div className="custom-loader"></div>
                                        )}
                                      </>
                                    )}
                                  <Link
                                    // legacyBehavior
                                    href={`${locationFullLink}`}
                                    className="btn-default btn-small cursor"
                                    onClick={handlePlaceNewOrder}
                                  >
                                    Place New Order
                                  </Link>
                                  <Link
                                    //legacyBehavior
                                    className="btn-default btn-small cursor ms-2 px-4"
                                    href={`${locationFullLink}/${PAGES.ORDER_DETAIL}/${data?.orderDetailInfo?.OrderDetailCal?.orderId}`}
                                  >
                                    Order details
                                  </Link>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </main>
            )}
          </>
        )}
      </Layout>
    </>
  );
};

export default ThankYou;
