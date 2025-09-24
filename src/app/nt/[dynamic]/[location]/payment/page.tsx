"use client";

import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import React from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import { CartServices } from "../../../../../../redux/cart/cart.services";
import Layout from "@/components/nt/layout/layout";
import Head from "next/head";
import { Elements } from "@stripe/react-stripe-js";
import CardPaymentComponent from "@/components/nt/payment/cardpayment.component";
import {
  DefaultLocation,
  GetAllRestaurantInfo,
} from "@/types/restaurant-types/restaurant.type";

const Payment = () => {
  const { restaurantinfo, userinfo, order } = useReduxData();
  const cardShowMessage = order && order?.cardShowMessage;
  var calculatedTotal = order && order?.calculatedTotal;
  const { googlePayEnable, applePayEnable, stripePublishKey } =
    restaurantinfo?.defaultLocation as DefaultLocation;
  var stripePromise = loadStripe(stripePublishKey);

  const { data, isSuccess } = useQuery({
    queryKey: [
      "getStripePaymentIntentId",
      restaurantinfo?.restaurantId,
      calculatedTotal,
      order.orderId,
    ],
    queryFn: () =>
      CartServices.getstripepaymentintentid(
        restaurantinfo?.restaurantId as number,
        restaurantinfo?.defaultlocationId as number,
        order.orderId,
        userinfo?.customerId as number,
        calculatedTotal
      ),

    staleTime: 3000,
    refetchOnWindowFocus: false,
    enabled: calculatedTotal > 0 && order?.orderId > 0,
  });

  const appearance: StripeElementsOptions["appearance"] = { theme: "stripe" };
  var options: StripeElementsOptions | undefined;

  if (data && data !== undefined && isSuccess === true) {
    options = {
      //secretId: data.secretId,
      clientSecret: data.secretId,
      appearance,
    };
  }

  return (
    <Layout>
      <Head>
        <title>
          Payment || {restaurantinfo?.restaurantname}: Online Ordering
        </title>
        <meta name="description" content="Online description" />
      </Head>

      <main className="mt-5">
        {data && isSuccess === true && data?.secretId && (
          <Elements options={options} stripe={stripePromise}>
            <CardPaymentComponent
              clientSecret={data.secretId}
              paymentIntentId={data.paymentIntentId}
              orderId={order.orderId}
              calculatedTotal={calculatedTotal.toFixed(2)}
              cardShowMessage={cardShowMessage}
              restaurantinfo={restaurantinfo as GetAllRestaurantInfo}
              GooglePayEnable={googlePayEnable}
              ApplePayEnable={applePayEnable}
              stripePublishKey={stripePublishKey}
            />
          </Elements>
        )}
      </main>

      {/* <Democardpay /> */}
    </Layout>
  );
};
export default Payment;
