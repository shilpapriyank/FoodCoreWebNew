// app/[dynamic]/layout.tsx
"use client";

import RestaurantComponent from "@/components/commonRestaurant/restaurant.component";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RestaurantComponent>{children}</RestaurantComponent>
    </>
  );
}
