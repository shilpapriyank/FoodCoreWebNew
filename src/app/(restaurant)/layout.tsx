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

export default function RestaurantLayout({
  children,
  params,
}: LoadRestaurantProps) {
  const { restaurantURL, locationURL, defaultLocationId } = params;
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
