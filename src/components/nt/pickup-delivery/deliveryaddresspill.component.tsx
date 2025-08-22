"use client";

import React from "react";
import DeliveryAddressHoc from "./delivery/deliveryaddress-hoc.component";
import AddressPill from "@/components/common/address-pill.component";
import { AddressItem } from "@/types/address-types/address.type";

interface DeliveryAddressPillProps {
  address: any;
  isChecked: boolean;
  id: string;
  handleChangeAddress: (address: AddressItem) => void;
  handleDeleteAddress?: (id: number) => void;
}

const DeliveryAddressPill: React.FC<DeliveryAddressPillProps> = ({
  isChecked,
  address,
  id,
  handleChangeAddress,
}) => {
  return (
    <AddressPill
      handleChangeAddress={handleChangeAddress as (address: any) => void}
      id={id}
      isChecked={isChecked}
      address={address}
    />
  );
};

export default DeliveryAddressHoc(DeliveryAddressPill as any);
