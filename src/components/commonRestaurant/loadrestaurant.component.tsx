// src/components/common/LoadRestaurant.tsx
"use client";

import React, { useEffect, useState } from "react";
import { RestaurantsServices } from "../../../redux/restaurants/restaurant.service";

interface LoadRestaurantProps {
  children: React.ReactNode;
  restaurantURL: string;
  locationURL: string;
  defaultLocationId: number;
}

const LoadRestaurant = ({
  children,
  restaurantURL,
  locationURL,
  defaultLocationId,
}: LoadRestaurantProps) => {
  const [loading, setLoading] = useState(true);
  const [restaurantData, setRestaurantData] = useState<any>(null);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const result = await RestaurantsServices.getRestaurantsList(
          restaurantURL,
          locationURL,
          defaultLocationId
        );
        setRestaurantData(result);
      } catch (error) {
        console.error("Failed to load restaurant list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, []);

  if (loading) return <div>Loading restaurant list...</div>;

  return <>{children}</>;
};

export default LoadRestaurant;
