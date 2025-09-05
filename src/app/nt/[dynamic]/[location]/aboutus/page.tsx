"use client";

import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import React from "react";
import { RestaurantsServices } from "../../../../../../redux/restaurants/restaurants.services";
import { MYORDERPAGE_MESSAGE } from "@/components/nt/helpers/static-message/myorder-message";
import Layout from "@/components/nt/layout/layout.component";
import SiteContentComponent from "@/components/nt/common/site-content.component";

const AboutUs = () => {
  const { restaurantinfo } = useReduxData();
  const { isError, isLoading, data, isSuccess, refetch, isFetching } = useQuery(
    {
      queryKey: ["getPageContent", "aboutus", restaurantinfo?.restaurantId],
      queryFn: () =>
        RestaurantsServices.getPageContentRestaurant(
          "about us",
          restaurantinfo?.restaurantId as number
        ),
      staleTime: 0,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <Head>
        <title>
          About Us || {restaurantinfo?.restaurantname}:{" "}
          {MYORDERPAGE_MESSAGE.ORDERING_ONLINE}
        </title>
        <meta name="description" content="Online description" />
      </Head>

      <Layout>
        {data && isSuccess && <SiteContentComponent data={data} />}
      </Layout>
    </>
  );
};

export default AboutUs;
