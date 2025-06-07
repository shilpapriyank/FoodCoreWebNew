// app/[dynamic]/layout.tsx
"use client";
import Restaurant from "../../components/commonRestaurant/restaurant.component";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Restaurant>{children}</Restaurant>
    </>
  );
}
