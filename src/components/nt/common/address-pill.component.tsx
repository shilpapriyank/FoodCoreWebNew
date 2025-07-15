import React from "react";
interface AddressItems {
  city?: string;
  address1?: string;
  cityName?: string;
  zipcode?: string;
  [key: string]: string | number | boolean | undefined | null;
  id: string | number;
}

interface AddressPillProps {
  isChecked: boolean;
  id: string | number;
  address: AddressItems;
  handleChangeAddress?: (address: AddressItems) => void;
  handleChangeLocation?: () => void;
}

const AddressPill = ({
  isChecked,
  handleChangeLocation,
  handleChangeAddress,
  address,
  id,
}: AddressPillProps) => {
  return (
    <label
      className="radio-box pointer-cursor"
      onClick={() => handleChangeAddress?.(address)}
      key={id}
    >
      <input type="radio" checked={isChecked} />
      {address?.city}
      <br />
      <span>
        {address?.address1}, {address?.cityName}, {address?.zipcode}
        {/* 737 Golf Links Road Unit #F2A, Hamilton, Ontario, L9K 1L5 */}
      </span>
    </label>
  );
};

export default AddressPill;
