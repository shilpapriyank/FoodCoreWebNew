"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DeliveryAddressServices } from "../../../../../redux/delivery-address/delivery-address.services";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import CommonModal from "../../common/common-model.component";
import { LoggedInUser } from "../../../../../redux/login/login.types";
import { useAppDispatch } from "../../../../../redux/hooks";
import {
  deleteAddress,
  setDeliveryAddressData,
  updateAddressCheck,
  updateAddressId,
} from "../../../../../redux/delivery-address/delivery-address.slice";
import { selecteddeliveryaddress } from "../../../../../redux/selected-delivery-data/selecteddelivery.slice";
import {
  AddressListType,
  GetDeliveryAddressServiceResultType,
} from "../../../../../redux/delivery-address/delivery-address.types";

interface DeliveryAddressHocProps {
  handleChangeAddress: (address: AddressListType) => void;
  handleDeleteAddress?: (e: React.MouseEvent, id: number) => void;
  id: number;
  isChecked: boolean;
  address: AddressListType;
}

function DeliveryAddressHoc<P extends DeliveryAddressHocProps>(
  OriginalComponent: React.ComponentType<any>
): React.FC<Omit<any, keyof DeliveryAddressHocProps>> {
  const NewComponent: React.FC<Omit<P, keyof DeliveryAddressHocProps>> = (
    props
  ) => {
    const { userinfo, restaurantinfo, selecteddelivery, deliveryaddress } =
      useReduxData();
    const [addresslist, setaddressList] = useState<AddressListType[]>([]);
    const customerId: number = userinfo?.customerId ?? 0;
    const selecteddeliveryaddres = selecteddelivery.selecteddeliveryaddress;
    const [loadComplete, setloadComplete] = useState<boolean>(false);
    const [deleteAddressId, setdeleteAddressId] = useState<number | undefined>(
      undefined
    );
    const [openDelete, setopenDelete] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const skipSelectUpdateRef = useRef(false);

    useEffect(() => {
      getDeliveryAddress();
    }, [
      userinfo?.customerId,
      deliveryaddress?.addressId?.customerAddressId,
      selecteddeliveryaddres?.deliveryaddressId,
    ]);

    if (!userinfo) {
      throw new Error("User is not logged in");
    }
    const getDeliveryAddress = (id?: number) => {
      if (customerId > 0) {
        DeliveryAddressServices.getDeliveryAddress(
          (userinfo as LoggedInUser).customerId,
          restaurantinfo?.restaurantId as number,
          restaurantinfo?.defaultLocation.locationId as number
        ).then((response) => {
          if (response) {
            if (response?.AddressLists) {
              dispatch(setDeliveryAddressData(response?.AddressLists));
              if (!skipSelectUpdateRef.current) {
                if (
                  selecteddeliveryaddres === null ||
                  id === selecteddeliveryaddres?.deliveryaddressId ||
                  id === 0
                ) {
                  dispatch(selecteddeliveryaddress(response.AddressLists[0]));
                }
              }
              skipSelectUpdateRef.current = false;
              setaddressList(response.AddressLists);
            }
            if (response.AddressLists === null) {
              dispatch(setDeliveryAddressData(response.AddressLists));
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
      debugger;
      if (restaurantinfo && deleteAddressId !== undefined) {
        DeliveryAddressServices.deleteDeliveryAddress(
          deleteAddressId,
          restaurantinfo?.restaurantId
        ).then((response) => {
          if (response) {
            getDeliveryAddress(deleteAddressId);
            if (
              selecteddelivery?.selecteddeliveryaddress?.deliveryaddressId ===
              deleteAddressId
            ) {
              dispatch(selecteddeliveryaddress(null));
            }
            handleToggleDelete(false);
          }
        });
      }
    }, [deleteAddressId]);

    //SELECT THE DELIVERY ADDRESS
    const handleClickSelectDeliveryAddress = useCallback(
      (address: AddressListType) => {
        if (
          address?.deliveryaddressId !==
          deliveryaddress?.addressId?.customerAddressId
        ) {
          DeliveryAddressServices.verifyDeliveryAddresss(
            address,
            restaurantinfo?.restaurantId as number,
            restaurantinfo?.defaultlocationId as number
          ).then((result) => {
            if (result === null || result === undefined) {
              return;
            } else {
              let addressId = { customerAddressId: address?.deliveryaddressId };
              dispatch(updateAddressId(addressId));
              //dispatch(updateAddressCheck(true));
              dispatch(selecteddeliveryaddress(address));
              skipSelectUpdateRef.current = true;
            }
          });
        }
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
          {selectedDeleteAddress?.contactname || selectedDeleteAddress?.city},
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
