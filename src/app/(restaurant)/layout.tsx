//"use client";
// app/restaurant/layout.tsx (Server Component)

import LoadRestaurant from "@/components/commonRestaurant/loadrestaurant.component";
import React from "react";
import RestaurantNew from "../../components/commonRestaurant/restaurantnew.component";

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
  return (
    // <LoadRestaurant
    //   restaurantURL={restaurantURL}
    //   locationURL={locationURL}
    //   defaultLocationId={defaultLocationId}
    // >
    //   {children}
    // </LoadRestaurant>
    <RestaurantNew>{children}</RestaurantNew>
  );
}
