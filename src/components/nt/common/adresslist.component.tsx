"use client";

import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { AddressListItem } from "@/types/restaurant-types/restaurant.type";
import React, { useMemo } from "react";

// Define the expected props for the component
interface AddressListProps {
  handleChangeLocation: (locationId: number) => void;
  selectedLocationId: number;
}

const AddressList: React.FC<AddressListProps> = ({
  handleChangeLocation,
  selectedLocationId,
}) => {
  const { restaurant, restaurantinfo } = useReduxData();

  const addressList =
    restaurant?.restaurantslocationlistwithtime?.addressList ?? [];

  const sortedAddressList = useMemo(() => {
    return addressList
      .slice()
      .sort((a, b) => a.locationName.localeCompare(b.locationName));
  }, [addressList]);

  return (
    <>
      {sortedAddressList.map((address) => {
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

      {/* {[...addressList]
        .slice()
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
        })} */}
    </>
  );
};

export default React.memo(AddressList);
//export default AddressList;
