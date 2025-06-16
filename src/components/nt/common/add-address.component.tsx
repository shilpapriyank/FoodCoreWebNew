import { useReduxData } from '@/components/customhooks/useredux-data-hooks';
import React from 'react';

interface Address {
    locationId: number;
    locationName: string;
    address1: string;
    cityName: string;
    zipcode: string;
}

interface AddressListProps {
    handleChangeLocation: (locationId: number) => void;
    selectedLocationId: number;
}

const AddressList: React.FC<AddressListProps> = ({ handleChangeLocation, selectedLocationId }) => {
    const { restaurant, restaurantinfo } = useReduxData();
    const addressList: Address[] = restaurant?.restaurantslocationlistwithtime?.addressList || [];

    return (
        <>
            {
                addressList
                    .sort((a, b) => a.locationName.localeCompare(b.locationName))
                    .map((address, index) => {
                        const isChecked = selectedLocationId > 0 ? selectedLocationId === address?.locationId : restaurantinfo?.defaultLocation?.locationId === address?.locationId
                        return <label className="radio-box" key={index}>
                            <input type="radio" checked={isChecked} onClick={() => handleChangeLocation(address?.locationId)} />
                            {address?.locationName}<br /><span>
                                {address?.address1}, {address?.cityName}, {address?.zipcode}
                                {/* 737 Golf Links Road Unit #F2A, Hamilton, Ontario, L9K 1L5 */}
                            </span>
                        </label>
                    })
            }

        </>
    );
};

export default AddressList;




// 'use client';
// import { useState } from "react";
// const AddAddress = () => {
//     const [addressField, setaddressField] = useState({
//         businessname: "",
//         address1: "",
//         address2: "",
//         city: "",
//         state: "",
//         postalcode: "",
//         country: "",
//         apartment: "",
//         latitude: "",
//         longitude: ""
//     })
//     return (
//         <>
//             <h1>From Add Address</h1>
//         </>
//     )
// }
// export default AddAddress;