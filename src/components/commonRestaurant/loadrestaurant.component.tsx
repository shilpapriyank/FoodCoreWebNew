

"use client";

import React, { useEffect, useState } from "react";
import { RestaurantsServices } from "../../../redux/restaurants/restaurants.services";
import {
  setRestaurantIdInStorage,
  setRestaurantNameInStorage,
  setLocationIdInStorage,
} from "../common/localstore";

interface LoadRestaurantProps {
  children: React.ReactNode;
  restaurantURL: string; // e.g. 'toronto' from /nt/fc/toronto
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
  const [restaurantData, setRestaurantData] = useState<any[]>([]);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const result = await RestaurantsServices.getRestaurantsList(
          restaurantURL,
          locationURL,
          defaultLocationId
        );

        setRestaurantData(result);

        const matchedRestaurant = result.find(
          (r: any) =>
            r?.name && r.name.toLowerCase() === restaurantURL.toLowerCase()
        );

        if (matchedRestaurant) {
          setRestaurantIdInStorage(matchedRestaurant.id);
          setRestaurantNameInStorage(matchedRestaurant.name);
          setLocationIdInStorage(defaultLocationId);
        } else {
          setRestaurantIdInStorage(0);
          setRestaurantNameInStorage("");
          setLocationIdInStorage(0);
        }
      } catch (error) {
        console.error("Failed to load restaurant list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [restaurantURL, locationURL, defaultLocationId]);

  if (loading) return <div>Loading restaurant list...</div>;

  return <>{children}</>;
};

export default LoadRestaurant;

// // src/components/common/LoadRestaurant.tsx
// "use client";

// import React, { useEffect, useState } from "react";
// import { RestaurantsServices } from "../../../redux/restaurants/restaurants.services";
// import {
//   setRestaurantIdInStorage,
//   setRestaurantNameInStorage,
// } from "../common/localstore";

// interface LoadRestaurantProps {
//   children: React.ReactNode;
//   restaurantURL: string;
//   locationURL: string;
//   defaultLocationId: number;
// }

// const LoadRestaurant = ({
//   children,
//   restaurantURL,
//   locationURL,
//   defaultLocationId,
// }: LoadRestaurantProps) => {
//   const [loading, setLoading] = useState(true);
//   const [restaurantData, setRestaurantData] = useState<any>(null);

//   useEffect(() => {
//     const fetchRestaurantData = async () => {
//       try {
//         const result = await RestaurantsServices.getRestaurantsList(
//           restaurantURL,
//           locationURL,
//           defaultLocationId
//         );
//         setRestaurantData(result);
//       } catch (error) {
//         console.error("Failed to load restaurant list:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRestaurantData();
//   }, []);

//   if (loading) return <div>Loading restaurant list...</div>;

//   return <>{children}</>;
// };

// export default LoadRestaurant;
