"use client";

import React from "react";
import { AddressListType } from "../../../redux/delivery-address/delivery-address.types";

interface AddressPillProps {
  isChecked: boolean;
  handleChangeLocation?: (id: number) => void;
  handleChangeAddress?: (address: AddressListType) => void;
  address: AddressListType;
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
        {address?.address1}, {address?.city}, {address?.zipcode}
      </span>
    </label>
  );
};

export default AddressPill;
