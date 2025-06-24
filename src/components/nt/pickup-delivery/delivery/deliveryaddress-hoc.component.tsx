"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DeliveryAddressServices } from "../../../../../redux/delivery-address/delivery-address.services";
import { DeliveryAddressTypes } from "../../../../../redux/delivery-address/delivery-address.type";
import { useDispatch } from "react-redux";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import CommonModal from "../../common/common-model.component";
import { AppDispatch } from "../../../../../redux/store";
import { LoggedInUser } from "../../../../../redux/login/login.types";
import { SelectedDeliveryTypes } from "../../../../../redux/selected-delivery-data/selecteddelivery.types";

// Address item interface
interface DeliveryAddressItem {
  deliveryaddressId: number;
  address1: string;
  cityName?: string;
  city?: string;
  zipcode: string;
}

interface DeliveryAddressHocProps {
  handleChangeAddress: (address: DeliveryAddressItem) => void;
  handleDeleteAddress?: (e: React.MouseEvent, id: number) => void;
  id: number;
  isChecked: boolean;
  address: DeliveryAddressItem;
}

function DeliveryAddressHoc<P extends DeliveryAddressHocProps>(
  OriginalComponent: React.ComponentType<any>
): React.FC<Omit<any, keyof DeliveryAddressHocProps>> {
  const NewComponent: React.FC<Omit<P, keyof DeliveryAddressHocProps>> = (
    props
  ) => {
    const { userinfo, restaurantinfo, selecteddelivery, deliveryaddress } =
      useReduxData();
    const [addresslist, setaddressList] = useState<DeliveryAddressItem[]>([]);
    const customerId: number = userinfo?.customerId ?? 0;
    const selecteddeliveryaddres = selecteddelivery.selecteddeliveryaddress;
    const [loadComplete, setloadComplete] = useState<boolean>(false);
    const [deleteAddressId, setdeleteAddressId] = useState<number | undefined>(
      undefined
    );
    const [openDelete, setopenDelete] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
      getDeliveryAddress();
    }, [
      userinfo?.customerId,
      (deliveryaddress as any)?.addressId?.customerAddressId,
      selecteddeliveryaddres?.deliveryaddressId,
    ]);

    // if (!userinfo) {
    //     throw new Error("User is not logged in");
    // }
    const getDeliveryAddress = (id: number = 0) => {
      if (restaurantinfo && customerId > 0) {
        DeliveryAddressServices.getDeliveryAddress(
          (userinfo as LoggedInUser).customerId,
          restaurantinfo?.restaurantId,
          restaurantinfo?.defaultLocation.locationId
        ).then((response: any) => {
          if (response) {
            if (response.AddressLists) {
              dispatch({
                type: DeliveryAddressTypes.GET_ADDRESS,
                payload: response.AddressLists,
              });
              if (
                selecteddeliveryaddres === null ||
                id === selecteddeliveryaddres?.deliveryaddressId ||
                id === 0
              ) {
                // dispatch(selecteddeliveryaddress(response.AddressLists[0]));
                dispatch({
                  type: SelectedDeliveryTypes.SET_PICKUP_OR_DELIVERY,
                  payload: response.AddressLists[0],
                });
              }

              setaddressList(response.AddressLists);
            }
            if (response.AddressLists === null) {
              dispatch({
                type: DeliveryAddressTypes.GET_ADDRESS,
                payload: response.AddressLists,
              });
              setaddressList([]);
            }
          }
          setloadComplete(true);
        });
      }
    };

    const handleDeleteAddressId = useCallback(
      (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        handleToggleDelete(true);
        setdeleteAddressId(id);
      },
      []
    );

    const handleToggleDelete = (value: boolean) => {
      setopenDelete(value);
    };

    const handleDeleteItem = useCallback(() => {
      if (restaurantinfo && deleteAddressId !== undefined) {
        DeliveryAddressServices.deleteDeliveryAddress(
          deleteAddressId,
          restaurantinfo?.restaurantId
        ).then((response) => {
          if (response) {
            dispatch({
              type: DeliveryAddressTypes.DELETE_ADDRESS,
              payload: response,
            });
            // closeModal('btn-close')
            getDeliveryAddress(deleteAddressId);
            if (selecteddeliveryaddres?.deliveryaddressId === deleteAddressId) {
              // dispatch(setSelectedDeliveryAddress(null));
            }
            handleToggleDelete(false);
          }
        });
      }
    }, [deleteAddressId]);
    //SELECT THE DELIVERY ADDRESS
    const handleClickSelectDeliveryAddress = useCallback(
      (address: DeliveryAddressItem) => {
        // if (
        //   address.deliveryaddressId !==
        //   deliveryaddress?.addressId?.customerAddressId
        // ) {
        //   DeliveryAddressServices.verifyDeliveryAddresss({
        //     obj: userinfo?.address,
        //     restaurantinfo?.restaurantId,
        //     restaurantinfo?.defaultlocationId
        //   }).then((result) => {
        //     if (result === null || result === undefined) {
        //       return;
        //     } else {
        //       let addressId = { customerAddressId: address?.deliveryaddressId };
        //       dispatch({
        //         type: DeliveryAddressTypes.UPDATE_ADDRESS_ID,
        //         payload: addressId,
        //       });
        //       //  dispatch(selecteddeliveryaddress(address))
        //     }
        //   });
        // }
      },
      [deliveryaddress?.addressId?.customerAddressId]
    );

    const deleteAddressString = useMemo(() => {
      const selectedDeleteAddress =
        addresslist &&
        addresslist?.find((ad) => ad.deliveryaddressId === deleteAddressId);
      return (
        <>
          {selectedDeleteAddress?.address1},
          {selectedDeleteAddress?.cityName || selectedDeleteAddress?.city},
          {selectedDeleteAddress?.zipcode}
        </>
      );
    }, [deleteAddressId, addresslist]);
    return (
      <>
        {addresslist.map((address) => (
          <OriginalComponent
            key={address.deliveryaddressId}
            handleChangeAddress={handleClickSelectDeliveryAddress}
            handleDeleteAddress={handleDeleteAddressId}
            id={address?.deliveryaddressId}
            isChecked={
              address?.deliveryaddressId ===
              selecteddeliveryaddres?.deliveryaddressId
            }
            address={address}
          />
        ))}
        {openDelete && (
          <CommonModal
            title="Delete the address"
            btn1Name="Confirm"
            btn2Name="Cancel"
            isbtn2={true}
            handleClickBtn1={handleDeleteItem}
            handleClickBtn2={() => handleToggleDelete(false)}
            handleToggle={handleToggleDelete}
            isOpenModal={openDelete}
          >
            <h4 className="color-green my-3 fw-bold">{deleteAddressString}</h4>
            <p className="my-3">Are you sure you want to Delete Address?</p>
          </CommonModal>
        )}
      </>
    );
  };
  return NewComponent;
}
export default DeliveryAddressHoc;
