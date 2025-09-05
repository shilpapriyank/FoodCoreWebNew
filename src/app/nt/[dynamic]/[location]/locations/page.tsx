"use client";

import { sortArrayOnSelectedLocation } from "@/components/common/utility";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import Layout from "@/components/nt/layout/layout.component";
import { LocationItem } from "@/components/nt/location/location-item.component";
import React, { useState } from "react";

const LocationsPage = () => {
  const { restaurantinfo, restaurant } = useReduxData();
  const restaurantlocation = restaurant.restaurantslocationlistwithtime;
  let locations = restaurantlocation?.addressList;
  let sordedLocation = sortArrayOnSelectedLocation(
    locations,
    restaurantinfo?.defaultLocation?.locationId as number
  );
  const [addressList, setAddressList] = useState(sordedLocation);
  const [defaultLoactionId, setdefaultLoactionId] = useState(
    restaurantinfo?.defaultlocationId as number
  );
  return (
    <>
      <Layout>
        <section className="location-main  categories-info">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-12 ">
                <h4 className="small-heading">Locations</h4>
              </div>
            </div>
            <div className="row">
              {addressList?.map((location, index) => {
                return (
                  <LocationItem
                    location={location}
                    id={location?.locationId}
                    key={index}
                    defaultLoactionId={defaultLoactionId}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default LocationsPage;
