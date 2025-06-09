// 'use client';

// import React from 'react';
// import DeliveryAddressHoc from './delivery/deliveryaddress-hoc.component';
// import AddressPill from '@/components/common/address-pill.component';

// // Define AddressItem type as used in AddressPill
// interface AddressItem {
//   locationId: number;
//   city: string;
//   address1: string;
//   cityName: string;
//   zipcode: string;
//   // add other address fields as needed
// }

// interface DeliveryAddressPillProps {
//   address: AddressItem;
//   isChecked: boolean;
//   id: number; // if needed, otherwise you can make optional
//   handleChangeAddress: (address: AddressItem) => void;
//   handleDeleteAddress?: (id: number) => void; // optional, since you didn't use it here
// }

// const DeliveryAddressPill: React.FC<DeliveryAddressPillProps> = ({
//   address,
//   isChecked,
//   handleChangeAddress,
//   id,
//   handleDeleteAddress, // included for future use if needed
// }) => {
//   return (
//     <AddressPill
//       handleChangeAddress={handleChangeAddress}
//       id={id}
//       isChecked={isChecked}
//       address={address}
//     />
//   );
// };

// export default DeliveryAddressHoc(DeliveryAddressPill);
