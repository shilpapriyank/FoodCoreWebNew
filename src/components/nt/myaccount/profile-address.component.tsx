import React from "react";
import DeliveryAddressHoc from "../pickup-delivery/delivery/deliveryaddress-hoc.component";
import { AddressListType } from "../../../../redux/delivery-address/delivery-address.types";

const ProfileAddress: React.FC<{
  address: AddressListType;
  isChecked: boolean;
  handleChangeAddress: (address: AddressListType) => void;
  id: number;
  handleDeleteAddress: (e: any, id: number) => void;
}> = ({ address, isChecked, handleChangeAddress, id, handleDeleteAddress }) => {
  return (
    <div
      className="address-div pointer-cursor  p-2"
      onClick={() => handleChangeAddress?.(address)}
      key={id}
    >
      <a
        className={`fa mt-2 color-green float-end fa-star${
          !isChecked ? "-o" : ""
        }`}
      />
      <p>
        {" "}
        {address?.address1}, {address?.city || address?.city},{" "}
        {address?.zipcode}
      </p>
      <a
        className="address-nfound fs-14"
        onClick={(e) => handleDeleteAddress(e, id)}
      >
        Delete
      </a>
      {/* <hr /> */}
    </div>
  );
};

export default DeliveryAddressHoc(ProfileAddress);
