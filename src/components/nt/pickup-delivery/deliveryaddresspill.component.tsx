"use client";

import React from "react";
import DeliveryAddressHoc from "./delivery/deliveryaddress-hoc.component";
import AddressPill from "@/components/common/address-pill.component";
import { AddressListType } from "../../../../redux/delivery-address/delivery-address.types";

const DeliveryAddressPill: React.FC<{
  address: AddressListType;
  isChecked: boolean;
  id: string;
  handleChangeAddress: (address: AddressListType) => void;
  handleDeleteAddress?: (id: number) => void;
}> = ({ isChecked, address, id, handleChangeAddress }) => {
  return (
    <AddressPill
      handleChangeAddress={handleChangeAddress}
      id={id}
      isChecked={isChecked}
      address={address}
    />
  );
};

export default DeliveryAddressHoc(DeliveryAddressPill);
