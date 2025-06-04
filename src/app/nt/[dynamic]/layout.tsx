// src/app/(restaurant)/layout.tsx
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

export default function RestaurantLayoutDynamic({
  children,
  params,
}: LoadRestaurantProps) {
  const { restaurantURL, locationURL, defaultLocationId } = params;
  console.log("this is nt/dynamic call", params.restaurantURL);

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
