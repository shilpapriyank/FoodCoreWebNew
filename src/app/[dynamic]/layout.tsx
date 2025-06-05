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
import type { Metadata } from 'next'
 
 const metadata: Metadata = {
  title: 'My Blog',
  description: '...',
}
export default function RestaurantLayout({
  children,
  params,
}: LoadRestaurantProps) {
  const { restaurantURL, locationURL, defaultLocationId } = params;
  console.log("restaurant url from [dynamic]/layout", restaurantURL);
  console.log("locationURL url from [dynamic]/layout", locationURL);
  console.log("defaultLocationId url from [dynamic]/layout", defaultLocationId);
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
