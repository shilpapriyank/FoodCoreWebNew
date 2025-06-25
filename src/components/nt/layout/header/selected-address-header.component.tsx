"use client";

import React from "react";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { ORDER_TYPE, ORDER_TYPE_ENUM } from "@/components/common/utility";

interface SelectedAddressHeaderProps {
  handleToggleOrderTypeModal: (value: boolean) => void;
  b2b?: boolean;
}

const SelectedAddressHeader: React.FC<SelectedAddressHeaderProps> = ({
  handleToggleOrderTypeModal,
  b2b = false,
}) => {
  const { selecteddelivery, restaurantinfo, deliveryaddress } = useReduxData();
  const defaultLocation = restaurantinfo?.defaultLocation;
  const tempDeliveryAddress = (deliveryaddress as any)?.tempDeliveryAddress;
  const orderTypeName = selecteddelivery?.pickupordelivery;
  const address =
    orderTypeName === ORDER_TYPE_ENUM.PICKUP ? defaultLocation : "";
  const selecteddeliveryaddress = selecteddelivery.selecteddeliveryaddress;
  let myDeliveryAddress = selecteddeliveryaddress ?? tempDeliveryAddress;

  const DisplayselectedPickup = () => {
    return (
      <>
        {orderTypeName === ORDER_TYPE_ENUM.DELIVERY ? (
          <>
            {" "}
            {myDeliveryAddress &&
              `${
                myDeliveryAddress?.address1 && myDeliveryAddress?.address1
              },  ${myDeliveryAddress?.city && myDeliveryAddress?.city}, ${
                myDeliveryAddress?.zipcode && myDeliveryAddress?.zipcode
              }`}
          </>
        ) : (
          <>
            {" "}
            {`${
              restaurantinfo && restaurantinfo?.defaultLocation?.address1
            },  ${
              restaurantinfo && restaurantinfo?.defaultLocation?.cityname
            }, ${restaurantinfo && restaurantinfo?.defaultLocation?.zipcode}`}
          </>
        )}
      </>
    );
  };

  return (
    <a
      className="takeout"
      id="time-mdl"
      onClick={() => handleToggleOrderTypeModal(true)}
    >
      <i className="fa arrow fa-angle-right" />
      {!b2b && (
        <>
          {" "}
          {orderTypeName === ORDER_TYPE_ENUM.PICKUP ? (
            <i className="fa icon fa-shopping-bag" />
          ) : (
            <i className="fa icon fa-car"></i>
          )}
        </>
      )}
      <div className="text-capitalize">
        <h4>
          {!b2b && (
            <>
              {!restaurantinfo?.isSchoolProgramEnabled
                ? selecteddelivery?.pickupordelivery
                : restaurantinfo?.defaultLocation?.locationName}
              <br />
            </>
          )}{" "}
          <span>{<DisplayselectedPickup />}</span>
        </h4>
      </div>
    </a>
  );
};

export default SelectedAddressHeader;
