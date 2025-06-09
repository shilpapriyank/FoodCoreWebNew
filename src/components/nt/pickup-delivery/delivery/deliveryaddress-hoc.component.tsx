// 'use client';

// import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useReduxData } from '@/components/customhooks/useredux-data-hooks';
// import { DeliveryAddressServices } from '../../../../../redux/delivery-address/delivery-address.services';
// // import action creators from your slices:
// //import { getAddresses, deleteAddress, updateAddressId } from '../../../../../redux/delivery-address/delivery-address.slice';
// import { selecteddeliveryaddress } from '../../../../../redux/selected-delivery-data/selecteddelivery.slice';
// import CommonModal from '../../common/common-model.component';

// // Address item interface
// export interface DeliveryAddressItem {
//   deliveryaddressId: number;
//   address1: string;
//   cityName?: string;
//   city?: string;
//   zipcode: string;
//   // add other fields as needed
// }

// interface DeliveryAddressHocProps {
//   handleChangeAddress: (address: DeliveryAddressItem) => void;
//   handleDeleteAddress?: (e: React.MouseEvent, id: number) => void;
//   id: number;
//   isChecked: boolean;
//   address: DeliveryAddressItem;
// }

// function DeliveryAddressHoc<T extends DeliveryAddressHocProps>(
//   OriginalComponent: React.ComponentType<T>
// ) {
//   const NewComponent: React.FC = () => {
//     const dispatch = useDispatch();
//     const { userinfo, restaurantinfo, selecteddelivery, deliveryaddress } = useReduxData();

//     const [addressList, setAddressList] = useState<DeliveryAddressItem[]>([]);
//     const [isLoaded, setIsLoaded] = useState(false);
//     const [deleteAddressId, setDeleteAddressId] = useState<number | undefined>(undefined);
//     const [openDelete, setOpenDelete] = useState(false);

//     const customerId = userinfo?.customerId ?? 0;
//     const selectedDeliveryAddress = selecteddelivery?.selecteddeliveryaddress;

//     useEffect(() => {
//       getDeliveryAddress();
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [userinfo?.customerId, deliveryaddress?.addressId?.customerAddressId, selectedDeliveryAddress?.deliveryaddressId]);

//     const getDeliveryAddress = (id: number = 0) => {
//       if (customerId > 0 && restaurantinfo) {
//         DeliveryAddressServices.getDeliveryAddress(
//           customerId,
//           restaurantinfo.restaurantId,
//           restaurantinfo.defaultLocation.locationId
//         ).then((response) => {
//           if (response) {
//           //  const addressLists: DeliveryAddressItem[] = response.AddressLists ?? [];
//           //  dispatch(getAddresses(addressLists)); // Redux Toolkit action
//           //  setAddressList(addressLists);

//             if (
//               selectedDeliveryAddress === null ||
//               id === selectedDeliveryAddress?.deliveryaddressId ||
//               id === 0
//             ) {
//             //   if (addressLists.length > 0) {
//             //     dispatch(selecteddeliveryaddress(addressLists[0]));
//             //   }
//             // }
//           }
//           setIsLoaded(true);
//         });
//       }
//     };

//     const handleDeleteAddressId = useCallback(
//       (e: React.MouseEvent, id: number) => {
//         e.stopPropagation();
//         setOpenDelete(true);
//         setDeleteAddressId(id);
//       },
//       []
//     );

//     const handleToggleDelete = (value: boolean) => {
//       setOpenDelete(value);
//     };

//     // const handleDeleteItem = useCallback(() => {
//     //   if (deleteAddressId !== undefined && restaurantinfo) {
//     //     DeliveryAddressServices.deleteDeliveryAddress(deleteAddressId, restaurantinfo.restaurantId).then(
//     //       (response) => {
//     //         if (response) {
//     //           dispatch(deleteAddress(response)); // Redux Toolkit action
//     //           getDeliveryAddress(deleteAddressId);
//     //           if (selectedDeliveryAddress?.deliveryaddressId === deleteAddressId) {
//     //             dispatch(selecteddeliveryaddress(null));
//     //           }
//     //           handleToggleDelete(false);
//     //         }
//     //       }
//     //     );
//     //   }
//     // }, [deleteAddressId, dispatch, restaurantinfo, selectedDeliveryAddress]);

//     const handleClickSelectDeliveryAddress = useCallback(
//       (address: DeliveryAddressItem) => {
//         // if (address.deliveryaddressId !== deliveryaddress?.addressId?.customerAddressId && restaurantinfo) {
//         //   DeliveryAddressServices.verifyDeliveryAddresss(
//         //     address,
//         //     restaurantinfo.restaurantId,
//         //     restaurantinfo.defaultlocationId ?? restaurantinfo.defaultLocation.locationId
//         //   ).then((result) => {
//         //     if (result != null) {
//         //       const addressId = { customerAddressId: address.deliveryaddressId };
//         //       dispatch(updateAddressId(addressId));
//         //       dispatch(selecteddeliveryaddress(address));
//         //     }
//         //   });
//         // }
//       },
//       [deliveryaddress?.addressId?.customerAddressId, dispatch, restaurantinfo]
//     );

//     const deleteAddressString = useMemo(() => {
//       const selectedDeleteAddress = addressList.find((ad) => ad.deliveryaddressId === deleteAddressId);
//       return (
//         <>
//           {selectedDeleteAddress?.address1}, {selectedDeleteAddress?.cityName || selectedDeleteAddress?.city},{' '}
//           {selectedDeleteAddress?.zipcode}
//         </>
//       );
//     }, [deleteAddressId, addressList]);

//     if (!isLoaded) return null; // Or a loader component here

//     return (
//       <>
//         {addressList.map((address) => (
//           <OriginalComponent
//             key={address.deliveryaddressId}
//             handleChangeAddress={handleClickSelectDeliveryAddress}
//             handleDeleteAddress={handleDeleteAddressId}
//             id={address.deliveryaddressId}
//             isChecked={address.deliveryaddressId === selectedDeliveryAddress?.deliveryaddressId}
//             address={address}
//             // Type assertion because of generic
//             {...(null as any)}
//           />
//         ))}
//         {openDelete && (
//           <CommonModal
//             title="Delete the address"
//             btn1Name="Confirm"
//             btn2Name="Cancel"
//             isbtn2={true}
//             handleClickBtn1={handleDeleteItem}
//             handleClickBtn2={() => handleToggleDelete(false)}
//             handleToggle={handleToggleDelete}
//             isOpenModal={openDelete}
//           >
//             <h4 className="color-green my-3 fw-bold">{deleteAddressString}</h4>
//             <p className="my-3">Are you sure you want to Delete Address?</p>
//           </CommonModal>
//         )}
//       </>
//     );
//   };

//   return NewComponent;
// }

// export default DeliveryAddressHoc;
