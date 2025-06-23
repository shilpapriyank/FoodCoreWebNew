'use client';

import React from 'react';
import { useReduxData } from '@/components/customhooks/useredux-data-hooks';
import { useAppDispatch } from '../../../../redux/hooks';
import { checkDisableWindow, GetThemeDetails, ORDER_TYPE } from '../../common/utility';
import useFutureOrder from '../../customhooks/usefuture-order-hook';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/store';

type PickupDeliveryButtonProps = {
    handleChangeOrderType: (type: any) => void;
};

const PickupDeliveryButton: React.FC<PickupDeliveryButtonProps> = ({ handleChangeOrderType }) => {
    const { restaurantinfo, selecteddelivery, main } = useReduxData();
    const dispatch = useDispatch<AppDispatch>();
    let location = restaurantinfo?.defaultLocation?.locationURL;
    const restaurantWindowTime = main.restaurantWindowTime as any;
    const pickupWindow = (restaurantWindowTime && restaurantWindowTime.pickupTime) && restaurantWindowTime.pickupTime;
    const deliveryWindow = (restaurantWindowTime && restaurantWindowTime.deliveryTime) && restaurantWindowTime.deliveryTime;
    const defaultLocation = restaurantinfo ? restaurantinfo.defaultLocation : null;
    const isTakeOutAsap = defaultLocation?.isTakeOutAsap;
    const isTakeOutPickupTime = defaultLocation?.isTakeOutPickupTime;
    const isDeliveryPickupTime = defaultLocation?.isDeliveryPickupTime;
    const isDeliveryAsap = defaultLocation?.isDeliveryAsap;
    const selectedTheme = GetThemeDetails(restaurantinfo?.themetype);
    const locationFullLink = `/${selectedTheme.url}/${restaurantinfo?.restaurantURL}/${location?.trim()}/`;
    const locationHrefLink = `/${selectedTheme.url}/[dynamic]/[location]/`;
    // let locationFullLink = "/" + selectedTheme.url + "/" + restaurantinfo.restaurantURL + "/" + location.trim() + "/";
    // let locationHrefLink = `/${selectedTheme.url}/[dynamic]/[location]/`;
    const { isFutureOrder, futureDay } = useFutureOrder();
    const isEnableDelivery = checkDisableWindow(deliveryWindow, isFutureOrder, (futureDay as any)?.futureDay);
    const isEnablePickup = checkDisableWindow(pickupWindow, isFutureOrder, (futureDay as any)?.futureDay);
    // const b2b = defaultLocation?.b2btype;
    const b2b = restaurantinfo?.defaultLocation?.b2btype

    return (
        <div className="col-lg-12 order-btns text-center col-md-12 col-12">
            {
                (isTakeOutAsap || isTakeOutPickupTime) && <>
                    {defaultLocation.istakeaway === true && isEnablePickup ? <>
                        <a onClick={() => handleChangeOrderType(ORDER_TYPE.PICKUP.text)} className={`btn-default  ${ORDER_TYPE.PICKUP.text === selecteddelivery.pickupordelivery ? "active" : ""}`} id="takeout-btn"><i className="fa fa-shopping-bag" /> {ORDER_TYPE.PICKUP.text}</a></> : <>
                        <a className="btn-default opacity-50 pe-none" id="takeout-btn"><i className="fa fa-shopping-bag" /> Pickup</a>
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
