"use client";
import RestaurantComponent from "@/components/commonRestaurant/restaurant.component";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: any }) => {
  return (
    <>
      <RestaurantComponent>{children}</RestaurantComponent>
    </>
  );
};

export default Layout;
