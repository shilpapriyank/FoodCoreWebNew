"use client";

import React from "react";
import { DeliveryAddressInput } from "../../../redux/delivery-address/delivery-address.types";

interface AddressPillProps {
  isChecked: boolean;
  handleChangeLocation?: (id: number) => void;
  handleChangeAddress?: (address: DeliveryAddressInput) => void;
  address: DeliveryAddressInput;
  id?: string;
}

const AddressPill: React.FC<AddressPillProps> = ({
  isChecked,
  handleChangeLocation,
  handleChangeAddress,
  address,
  id,
}) => {
  return (
    <label className="radio-box pointer-cursor" key={id}>
      <input
        type="radio"
        checked={isChecked}
        onChange={() => handleChangeAddress?.(address)}
      />
      {address?.city}
      <br />
      <span>
        {address?.address1}, {address?.cityName}, {address?.zipcode}
      </span>
    </label>
  );
};

export default AddressPill;
