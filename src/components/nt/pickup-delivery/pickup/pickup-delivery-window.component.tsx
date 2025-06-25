import React from 'react';
import { DeliveryConfirmationMessage, PickUpConfirmationMessage } from '@/components/helpers/static-message/pickupconfirmation2-message';
import { ORDER_TYPE, ORDER_TYPE_ENUM } from '../../../common/utility';
import { useReduxData } from '@/components/customhooks/useredux-data-hooks';

interface Props {
    defaultLocation: any;
    isDeliveryAsap: boolean;
    isDeliveryPickupTime: boolean;
    isTakeOutAsap: boolean;
    isTakeOutPickupTime: boolean;
    deliveryWindow: any[];
    pickupWindow: any[];
    isDeliveryWindowAvailable: boolean;
    isPickupWindowAvailable: boolean;
}

const PickupdeliveryWindowTime: React.FC<Props> = ({
    defaultLocation,
    isDeliveryAsap,
    isDeliveryPickupTime,
    deliveryWindow,
    isTakeOutAsap,
    pickupWindow,
    isTakeOutPickupTime,
    isDeliveryWindowAvailable,
    isPickupWindowAvailable
}) => {
    const { selecteddelivery } = useReduxData()
    let isAlldeliveryWindowClose = deliveryWindow?.length > 0 && deliveryWindow.every(time => time.isClosed === true)
    let isAllPickupWindowClose = pickupWindow?.length > 0 && pickupWindow.every(time => time.isClosed === true)
    let isDisableAsapLaterOn = false;
    isDisableAsapLaterOn = (selecteddelivery.pickupordelivery === ORDER_TYPE_ENUM.PICKUP && !isPickupWindowAvailable) ? true : isDisableAsapLaterOn;
    isDisableAsapLaterOn = (selecteddelivery.pickupordelivery === ORDER_TYPE_ENUM.DELIVERY && !isDeliveryWindowAvailable) ? true : isDisableAsapLaterOn;
    return (
        <div className="row mt-4">
            {
                isDisableAsapLaterOn && <div className="row mt-2 mb-5">
                    <p className='color-red text-center'>Sorry we are closed for the day.Hope to see you soon</p>
                </div>
            }

            {(defaultLocation.isDelivery && deliveryWindow && deliveryWindow?.length > 0 && defaultLocation.isOrderingDisable === false && !isAlldeliveryWindowClose) ?
                <div className="col-lg-6 col-md-6 col-6">
                    {(isDeliveryAsap === true || isDeliveryPickupTime === true) &&
                        <>
                            <h6 className='color-gray'><i className="fa fa-clock" />&nbsp;{DeliveryConfirmationMessage.DELIVERY_WINDOWS}
                            </h6>
                            {
                                isDeliveryWindowAvailable ?
                                    <>
                                        {deliveryWindow && deliveryWindow.map((time, index) => {
                                            if (!time.isClosed) {
                                                return (<div key={index}> {time.time} </div>)
                                            } else {
                                                return <></>
                                            }

                                        })}
                                    </> : <p className='color-red'>
                                        Not Available
                                    </p>
                            }
                        </>
                    }
                </div>
                :
                <div className="col-lg-6 col-md-6 col-6">
                    <h6 className='color-gray'>  <i className="fa fa-clock"></i>&nbsp;{DeliveryConfirmationMessage.DELIVERY_WINDOWS}</h6>
                    <p className='color-red'>
                        {PickUpConfirmationMessage.DELIVERY_CLOSE_TODAY}
                    </p>
                </div>}
            {defaultLocation.isTakeaway && defaultLocation.isOrderingDisable === false && pickupWindow && pickupWindow?.length > 0 && !isAllPickupWindowClose ?
                <div className="col-lg-6 col-md-6 col-6">
                    {(isTakeOutPickupTime === true || isTakeOutAsap === true) &&
                        <>
                            <h6 className='color-gray'><i className="fa fa-clock" />&nbsp;{PickUpConfirmationMessage.PICKUP_WINDOWS}</h6>
                            {isPickupWindowAvailable ? <>
                                {pickupWindow && pickupWindow.map((time, index) => {

                                    if (!time.isClosed) {
                                        return (<div key={index}> {time.time} </div>)
                                    } else {
                                        return <></>
                                    }
                                })}
                            </> : <p className='color-red'>Not Available</p>}
                        </>
                    }
                </div>
                :
                <div className="col-lg-6 col-md-6 col-6">
                    <h6 className='color-gray'>
                        <i className="fa fa-clock" />&nbsp;
                        {PickUpConfirmationMessage.PICKUP_WINDOWS} </h6>
                    <p className='color-red'> {PickUpConfirmationMessage.PICKUP_CLOSE_TODAY}</p>
                </div>}
            {
                defaultLocation.isOrderingDisable && defaultLocation.orderingMessage !== "" && <div className="row">
                    <p className='color-red text-center'> {defaultLocation.orderingMessage}</p>
                </div>
            }
        </div>
    );
};

export default PickupdeliveryWindowTime;
