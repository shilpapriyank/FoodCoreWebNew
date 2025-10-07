import RestaurantComponent from "@/components/commonRestaurant/restaurant.component";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      {/* <RestaurantComponent>{children}</RestaurantComponent> */}
    </>
  );
};

export default Layout;
