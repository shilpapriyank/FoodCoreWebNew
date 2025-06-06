'use client';

import React from 'react';
import { useReduxData } from '@/components/customhooks/useredux-data-hooks';
import { ORDER_TYPE } from '@/components/common/utility';

interface SelectedAddressHeaderProps {
    handleToggleOrderTypeModal: (value: boolean) => void;
    b2b?: boolean;
}

const SelectedAddressHeader: React.FC<SelectedAddressHeaderProps> = ({
    handleToggleOrderTypeModal,
    b2b = false,
}) => {
    const { selecteddelivery, restaurantinfo } = useReduxData();

    const orderTypeName = selecteddelivery?.pickupordelivery;
    const defaultLocation = restaurantinfo?.defaultLocation;

    // For DELIVERY, use tempDeliveryAddress from selecteddelivery (RTK state)
    const myDeliveryAddress = selecteddelivery?.tempDeliveryAddress;

    const displaySelectedAddress = () => {
        if (orderTypeName === ORDER_TYPE.DELIVERY.text && myDeliveryAddress) {
            return (
                <>
                    {
                        orderTypeName === ORDER_TYPE.DELIVERY.text ? <> {myDeliveryAddress && `${myDeliveryAddress?.address1 && myDeliveryAddress?.address1},  ${myDeliveryAddress?.city && myDeliveryAddress?.city}, ${myDeliveryAddress?.zipcode && myDeliveryAddress?.zipcode}`}</> : <>  {`${restaurantinfo && restaurantinfo?.defaultLocation?.address1},  ${restaurantinfo && restaurantinfo?.defaultLocation?.cityname}, ${restaurantinfo && restaurantinfo?.defaultLocation?.zipcode}`}</>
                    }
                </>
            );
        }

        return (
            <>
                {defaultLocation?.address1}, {defaultLocation?.cityname}, {defaultLocation?.zipcode}
            </>
        );
    };

    return (
        <a className="takeout" id="time-mdl" onClick={() => handleToggleOrderTypeModal(true)}>
            <i className="fa arrow fa-angle-right" />
            {!b2b && <>  {orderTypeName === ORDER_TYPE.PICKUP.text ? <i className="fa icon fa-shopping-bag" /> : <i className="fa icon fa-car"></i>}</>}
            <div className=''>
                <h4 >{!b2b && <>{!restaurantinfo?.isSchoolProgramEnabled ? selecteddelivery?.pickupordelivery : restaurantinfo?.defaultLocation?.locationName
                }<br /></>} <span>{displaySelectedAddress()}</span></h4>
            </div>
        </a>
    );
};

export default SelectedAddressHeader;
