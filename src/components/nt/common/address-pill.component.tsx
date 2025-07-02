import React from "react";

const AddressPill = ({
  isChecked,
  handleChangeLocation,
  handleChangeAddress,
  address,
  id,
}: any) => {
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
