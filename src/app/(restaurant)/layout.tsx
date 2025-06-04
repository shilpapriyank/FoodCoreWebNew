"use client";

import LoadRestaurant from "@/components/commonRestaurant/loadrestaurant.component";
import React from "react";

interface LoadRestaurantProps {
  children: React.ReactNode;
  params: {
    restaurantURL: string;
    locationURL: string;
    defaultLocationId: number;
  };
}

export default function RestaurantLayout({
  children,
  params,
}: LoadRestaurantProps) {
  const { restaurantURL, locationURL, defaultLocationId } = params;
  console.log('restaurant url from (restaurant) layout', restaurantURL)
   console.log('locationURL from (restaurant) layout', locationURL)
    console.log('defaultLocationId from (restaurant) layout', defaultLocationId)
  return (
    <LoadRestaurant
      restaurantURL={restaurantURL}
      locationURL={locationURL}
      defaultLocationId={defaultLocationId}
    >
      {children}
    </LoadRestaurant>
  );
}
