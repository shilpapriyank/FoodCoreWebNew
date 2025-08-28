"use client";

import React from "react";
import DeliveryAddressHoc from "./delivery/deliveryaddress-hoc.component";
import AddressPill from "@/components/common/address-pill.component";
import { DeliveryAddressInput } from "../../../../redux/delivery-address/delivery-address.types";

const DeliveryAddressPill: React.FC<{
  address: any;
  isChecked: boolean;
  id: string;
  handleChangeAddress: (address: DeliveryAddressInput) => void;
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

export default DeliveryAddressHoc(DeliveryAddressPill as any);
