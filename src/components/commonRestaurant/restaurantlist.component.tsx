'use client'

import React, { useEffect, useState } from "react";
import { RestaurantsServices } from "../../../redux/restaurants/restaurants.services";
import RestaurantArrayList from "./restaurantarraylist.component";
const RestaurantListComponent = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  // useEffect(() => {
  //     if (restaurantList?.length <= 0) {
  //         RestaurantsServices.getRestaurantLocationList().then(response => {
  //             if (response) {
  //                 setRestaurantList(response.restaurants);
  //             }
  //         });
  //     }
  // }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12 col-sm-12 col-xs-12">
          {restaurantList.length > 0 ? (
            <RestaurantArrayList
              restaurantList={restaurantList}
            ></RestaurantArrayList>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantListComponent;
