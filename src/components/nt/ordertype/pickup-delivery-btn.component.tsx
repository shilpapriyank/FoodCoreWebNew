'use client';

import React from 'react';
import { checkDisableWindow, GetThemeDetails, ORDER_TYPE } from '../../common/utility';
import useFutureOrder from '../../customhooks/usefuture-order-hook';
import { useAppDispatch } from '../../../../redux/hooks';
import { useReduxData } from '@/components/customhooks/useredux-data-hooks';

type PickupDeliveryButtonProps = {
    handleChangeOrderType: (type: string) => void;
};

const PickupDeliveryButton: React.FC<PickupDeliveryButtonProps> = ({ handleChangeOrderType }) => {
    const dispatch = useAppDispatch();
    const { restaurantinfo, selecteddelivery, main } = useReduxData();
    const defaultLocation = restaurantinfo?.defaultLocation;

    const location = defaultLocation?.locationURL ?? '';
    const selectedTheme = GetThemeDetails(restaurantinfo?.themetype ?? '');

    const locationFullLink = `/${selectedTheme.url}/${restaurantinfo?.restaurantURL}/${location.trim()}/`;
    const locationHrefLink = `/${selectedTheme.url}/[dynamic]/[location]/`;

    const restaurantWindowTime = main.restaurantWindowTime as any;
    const pickupWindow = restaurantWindowTime?.pickupTime;
    const deliveryWindow = restaurantWindowTime?.deliveryTime;

    const isTakeOutAsap = defaultLocation?.isTakeOutAsap;
    const isTakeOutPickupTime = defaultLocation?.isTakeOutPickupTime;
    const isDeliveryPickupTime = defaultLocation?.isDeliveryPickupTime;
    const isDeliveryAsap = defaultLocation?.isDeliveryAsap;

    const b2b = defaultLocation?.b2btype;

    const { isFutureOrder, futureDay } = useFutureOrder();
    const isEnableDelivery = checkDisableWindow(deliveryWindow, isFutureOrder, futureDay);
    const isEnablePickup = checkDisableWindow(pickupWindow, isFutureOrder, futureDay);

    return (
        <div className="col-lg-12 order-btns text-center col-md-12 col-12">
            {
                (isTakeOutAsap || isTakeOutPickupTime) && <>
                    {defaultLocation.istakeaway === true && isEnablePickup ? <>
                        <a onClick={() => handleChangeOrderType(ORDER_TYPE.PICKUP.text)} className={`btn-default  ${ORDER_TYPE.PICKUP.text === selecteddelivery.pickupordelivery ? "active" : ""}`} id="takeout-btn"><i className="fa fa-shopping-bag" /> {ORDER_TYPE.PICKUP.text}</a></> : <>
                        <a className="btn-default opacity-50 pe-none" id="takeout-btn"><i className="fa fa-shopping-bag" /> Pickup 123</a>
                    </>}
                </>}
            {((isDeliveryPickupTime || isDeliveryAsap) && !b2b) && <>
                {defaultLocation.isdelivery === true && isEnableDelivery ? <a onClick={() => handleChangeOrderType(ORDER_TYPE.DELIVERY.text)} className={`btn-default  ${ORDER_TYPE.DELIVERY.text === selecteddelivery.pickupordelivery ? "active" : ""}`} id="delivery-btn"><i className="fa fa-car" /> {ORDER_TYPE.DELIVERY.text}</a> :
                    <a className="btn-default opacity-50 pe-none" id="delivery-btn"><i className="fa fa-car" /> Delivery</a>
                }
            </>}
            <hr />
        </div>
    );
};

export default PickupDeliveryButton;
