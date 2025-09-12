"use client";

import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import React from "react";
import { RestaurantsServices } from "../../../../../../redux/restaurants/restaurants.services";
import Layout from "@/components/nt/layout/layout.component";
import SiteContentComponent from "@/components/nt/common/site-content.component";

const Terms = () => {
  const { restaurantinfo } = useReduxData();

  const { data, isSuccess } = useQuery({
    queryKey: [
      "getPageContent",
      "terms and condition",
      restaurantinfo?.restaurantId,
    ],
    queryFn: () =>
      RestaurantsServices.getPageContentRestaurant(
        "Terms And Conditions",
        restaurantinfo?.restaurantId as number
      ),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
  return (
    <>
      <Head>
        <title>{restaurantinfo?.restaurantname}: Ordering Online</title>
        <meta name="description" content="Online description" />
      </Head>
      <Layout>
        {data && isSuccess && <SiteContentComponent data={data} />}
      </Layout>
    </>
  );
};

export default Terms;
