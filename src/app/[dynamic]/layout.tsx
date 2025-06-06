// app/[dynamic]/layout.tsx
"use client";
import RestaurantNew from "../../components/commonRestaurant/restaurantnew.component";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RestaurantNew>{children}</RestaurantNew>
    </>
  );
}
