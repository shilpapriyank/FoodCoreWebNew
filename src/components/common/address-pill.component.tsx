"use client";

import React from "react";

interface AddressItem {
  city?: string;
  address1?: string;
  cityName?: string;
  zipcode?: string;
  [key: string]: string | number | boolean | undefined | null;
  id: string | number;
}

interface AddressPillProps {
  isChecked: boolean;
  handleChangeLocation?: (id: number) => void;
  handleChangeAddress?: (address: AddressItem) => void;
  address: AddressItem;
  id: string;
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
