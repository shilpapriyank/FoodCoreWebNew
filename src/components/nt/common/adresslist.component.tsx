"use client";

import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import React from "react";

// Define the expected props for the component
interface AddressListProps {
  handleChangeLocation: (locationId: number) => void;
  selectedLocationId: number;
}

// Define the shape of an address object
interface AddressItem {
  locationId: number;
  locationName: string;
  address1: string;
  cityName: string;
  zipcode: string;
}

// Define the structure for restaurantslocationlistwithtime if needed
interface RestaurantLocationListWithTime {
  addressList: any[];
}

const AddressList: React.FC<AddressListProps> = ({
  handleChangeLocation,
  selectedLocationId,
}) => {
  const { restaurant, restaurantinfo } = useReduxData();

  const addressList: any[] =
    (restaurant?.restaurantslocationlistwithtime as any)?.addressList ?? [];
  return (
    <>
      {addressList
        .sort((a, b) => a.locationName.localeCompare(b.locationName))
        .map((address) => {
          const isChecked =
            selectedLocationId > 0
              ? selectedLocationId === address.locationId
              : restaurantinfo?.defaultLocation?.locationId ===
                address.locationId;

          return (
            <label className="radio-box" key={address.locationId}>
              <input
                type="radio"
                checked={isChecked}
                onChange={() => handleChangeLocation(address.locationId)}
              />
              {address.locationName}
              <br />
              <span>
                {address.address1}, {address.cityName}, {address.zipcode}
              </span>
            </label>
          );
        })}
    </>
  );
};

export default AddressList;
