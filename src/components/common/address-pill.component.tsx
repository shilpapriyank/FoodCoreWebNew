'use client';

import React from 'react';

// Define the shape of the address object
interface AddressItem {
    city?: string;
    address1?: string;
    cityName?: string;
    zipcode?: string;
    [key: string]: any;
    id: string | number;
}

// Define props for the component
interface AddressPillProps {
    isChecked: boolean;
    handleChangeLocation?: (id: number) => void; // Not used here but can be added if needed
    handleChangeAddress?: (address: AddressItem) => void;
    address: AddressItem;
    id: string;
}

const AddressPill: React.FC<AddressPillProps> = ({
    isChecked,
    handleChangeLocation,
    handleChangeAddress,
    address,
    id
}) => {
    return (
        <label className="radio-box pointer-cursor" onClick={() => handleChangeAddress?.(address)} key={id}>
            <input type="radio" checked={isChecked} />
            {address?.city}<br /><span>
                {address?.address1}, {address?.cityName}, {address?.zipcode}
                {/* 737 Golf Links Road Unit #F2A, Hamilton, Ontario, L9K 1L5 */}
            </span>
        </label>
    );
};

export default AddressPill;
