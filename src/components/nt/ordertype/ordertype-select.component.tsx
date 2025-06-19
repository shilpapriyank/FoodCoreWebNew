'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

import DeliveryaddresspillComponent from '../pickup-delivery/deliveryaddresspill.component';
import { setpickupordelivery } from '../../../../redux/selected-delivery-data/selecteddelivery.slice';
import { closeModal, GetThemeDetails, ORDER_TYPE } from '../../common/utility';
import { getLocationIdFromStorage, setLocationIdInStorage } from '@/components/common/localstore';
import { clearRedux } from '../../../../redux/tableorder/tableorder.slice';
import { getSelectedRestaurantTime, refreshCategoryList } from '../../../../redux/main/main.slice';
import { setintialrewardpoints, setrewardpoint } from "../../../../redux/rewardpoint/rewardpoint.slice"
import { useReduxData } from '@/components/customhooks/useredux-data-hooks';
import { LocationServices } from '../../../../redux/location/location.services';
import { CustomerServices } from '../../../../redux/customer/customer.services';
import PickupDeliveryButton from './pickup-delivery-btn.component';
import AddressList from '../common/adresslist.component';
import { v4 as uuidv4 } from "uuid";
import { clearDeliveryRequestId } from '../../../../redux/order/order.slice';
import { createSessionId } from '../../../../redux/session/session.slice';
import { ChangeUrl, restaurantsdetail } from '../../../../redux/restaurants/restaurants.slice';
import { AppDispatch } from '../../../../redux/store';
import AddressPill from '@/components/common/address-pill.component';
import { deleteCartItemFromSessionId, emptycart } from '../../../../redux/cart/cart.slice';

type PickupOrDeliveryType = "" | "Pickup" | "Delivery";

interface OrderTypeSelectProps {
    isOpenModal: boolean;
    handleToggleOrderTypeModal: (open: boolean) => void;
    handleToggleTimingModal?: (open: boolean) => void;
    handleChangeAddress?: () => void;
    handleToggleAddAddressModal: (open: boolean) => void;
}

const OrderTypeSelect: React.FC<OrderTypeSelectProps> = ({
    isOpenModal,
    handleToggleOrderTypeModal,
    handleToggleTimingModal,
    handleChangeAddress,
    handleToggleAddAddressModal
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const {
        selecteddelivery,
        restaurantinfo,
        rewardpoints,
        deliveryaddress,
        userinfo,
        sessionid,
    } = useReduxData();

    const [selectedLocationId, setSelectedLocationId] = useState<number>(0);
    const customerId = userinfo?.customerId || 0;
    const rewardvalue = rewardpoints?.rewardvalue;
    const selectedTheme = GetThemeDetails(restaurantinfo?.themetype);
    const locationFullLink = `/${selectedTheme?.url}/${restaurantinfo?.restaurantURL}`;
    const defaultLocation = restaurantinfo?.defaultLocation;
    const tempDeliveryAddress = deliveryaddress?.tempDeliveryAddress;
    const orderTypeName = selecteddelivery?.pickupordelivery;
    const address = orderTypeName === ORDER_TYPE.PICKUP.text ? defaultLocation : '';
    const selecteddeliveryaddress = selecteddelivery.selecteddeliveryaddress;
    const myDeliveryAddress = tempDeliveryAddress;

    const handleChangeOrderType = (orderType: string) => {
        //debugger
        dispatch(setpickupordelivery(orderType))
        if (ORDER_TYPE.DELIVERY.text === orderType) {

            // setTimeout(() => {
            if (userinfo === null) {
                handleToggleOrderTypeModal(false)
                handleToggleAddAddressModal(true)
            }
            // }, 300)
        }
    };

    const handleChangeLocation = (id: number) => {
        setSelectedLocationId(id);
    };

    const handleClickConfirmChangeLocation = async (lid: number) => {
        handleChangeAddress?.();
        dispatch(ChangeUrl(true));
        LocationServices.changeRestaurantLocation(
            restaurantinfo.restaurantId,
            lid
        ).then((res) => {

            if (res) {
                Object.keys(restaurantinfo).map((session) => {
                    if (session === 'defaultLocation') {
                        Object.assign(restaurantinfo.defaultLocation, res);
                    }
                    if (session === 'defaultlocationId') {
                        restaurantinfo.defaultlocationId = res.locationId;
                    };
                });
                dispatch(restaurantsdetail(null));
                router.push(`${locationFullLink}/${restaurantinfo?.defaultLocation?.locationURL}`)
                dispatch(restaurantsdetail(restaurantinfo));
                //   CLEAR THE REDUX IF PREVIOUS LOCATION AND THE CURRENT SELECTED LOCATION IS NO SAME
                let oldLocationId = getLocationIdFromStorage();
                if (oldLocationId !== restaurantinfo.defaultlocationId) {
                    dispatch(clearRedux(true as any));
                    let id = (uuidv4)();
                    dispatch(createSessionId(id));
                }
                if (userinfo && userinfo?.customerId) {
                    CustomerServices.checkCustomerRewardPointsLocationBase(restaurantinfo.restaurantId, userinfo.customerId, 0, "0", restaurantinfo?.defaultLocation.locationId).then((res: any) => {
                        if (res.status == 1) {
                            let rewards = {
                                rewardvalue: rewardvalue,
                                rewardamount: parseFloat(((res?.result?.totalrewardpoints) / rewardvalue - 0).toFixed(2)),
                                rewardPoint: res?.result?.totalrewardpoints,
                                totalRewardPoints: res?.result?.totalrewardpoints,
                                redeemPoint: 0,
                            }
                            dispatch(setrewardpoint(rewards));
                        }
                    })
                }
                setLocationIdInStorage(restaurantinfo.defaultlocationId);
               // dispatch(refreshCategoryList(restaurantinfo, customerId) as any);
                dispatch(refreshCategoryList({ newselectedRestaurant: restaurantinfo, customerId }) as any);

                if (userinfo && userinfo?.customerId) {
                    deleteCartItemFromSessionId(sessionid, restaurantinfo.restaurantId, restaurantinfo.defaultLocation.locationId);
                    dispatch(emptycart() as any);
                }
                handleToggleOrderTypeModal(false)
                dispatch(setpickupordelivery(restaurantinfo?.defaultLocation?.defaultordertype ? ORDER_TYPE.DELIVERY.text : ORDER_TYPE.PICKUP.text));
                handleToggleOrderTypeModal(false);
                handleToggleTimingModal?.(true)

                dispatch(clearDeliveryRequestId())
            }
        })
    }

    const handleClickConfirm = () => {
        //order type pickup then chnage location if location is not default location
        if (ORDER_TYPE.PICKUP.text === selecteddelivery.pickupordelivery && (selectedLocationId > 0 && selectedLocationId !== restaurantinfo?.defaultlocationId)) {
            handleClickConfirmChangeLocation(selectedLocationId)
        } else {
            handleToggleOrderTypeModal(false)
        }
    }

    const handleClickAddNewAddress = () => {
        handleToggleOrderTypeModal(false);
        handleToggleAddAddressModal(true);
    };

    return (

        <>
            <div className={`modal fade modal-your-order ${isOpenModal ? 'show d-block' : ''}`} tabIndex={-1} style={{ display: 'block' }} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <h5 className="modal-title fs-5" id="staticBackdropLabel">YOUR ORDER 123</h5>
                        <button type="button" className="btn-close" onClick={() => handleToggleOrderTypeModal(false)} />
                        <form>
                            <div className="modal-body">
                                <div className="row">
                                    <PickupDeliveryButton handleChangeOrderType={handleChangeOrderType} />
                                </div>
                                {
                                    ORDER_TYPE.PICKUP.text === selecteddelivery.pickupordelivery &&

                                    <div id="takeout" className="row">
                                        <div className="col-lg-12 text-center col-md-12 col-12">
                                            <h2>Choose a Location 123</h2>
                                        </div>
                                        <div className="col-lg-12 mb-4 col-md-12 col-12">
                                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                {
                                                    ORDER_TYPE.DELIVERY.text === selecteddelivery.pickupordelivery &&
                                                    <li className="nav-item w-100" >
                                                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">By address</button>
                                                    </li>
                                                }
                                                {
                                                    ORDER_TYPE.PICKUP.text === selecteddelivery.pickupordelivery &&
                                                    <li className="nav-item w-100" >
                                                        <button className={`nav-link ${ORDER_TYPE.PICKUP.text === selecteddelivery.pickupordelivery ? "active" : ""}`} id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">By location</button>
                                                    </li>
                                                }
                                            </ul>
                                            <div className="tab-content" id="myTabContent">
                                                <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex={0}>
                                                    {ORDER_TYPE.DELIVERY.text === selecteddelivery.pickupordelivery && <div className="row">
                                                        <div className="col-lg-12 col-md-12 col-12">

                                                            {/* ///// order confirmation html load model end*/}

                                                            <label>Address</label>
                                                            <div className="search">
                                                                <input type="text" className="form-control search" defaultValue="undefined undefined, undefined, undefined, undefined" />
                                                                <i className="fa fa-search" />
                                                            </div>
                                                            <div className="text-center">
                                                                <a className="address-nfound" href="#">Address not found ?</a>
                                                            </div>
                                                            <label>Apt #</label>
                                                            <input type="text" className="form-control" placeholder="Optional" />
                                                            <div className="text-center short-info">
                                                                <p><i className="fa fa-info-circle" /><br /> Variable '$position.latitude' is invalid. Received a null input for a non-null variable. Variable '$address.civicNumber' is invalid. No value provided for a non-null variable.</p>
                                                            </div>
                                                        </div>
                                                    </div>}
                                                    {ORDER_TYPE.PICKUP.text === selecteddelivery.pickupordelivery && <div className="row">
                                                        <div className="col-lg-12 col-md-12 col-12">
                                                            <AddressList selectedLocationId={selectedLocationId} handleChangeLocation={handleChangeLocation} />
                                                        </div>
                                                    </div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>}
                                {
                                    ORDER_TYPE.DELIVERY.text === selecteddelivery.pickupordelivery &&
                                    <div id="delivery" className="row ">
                                        <div className="col-lg-12 text-center col-md-12 col-12">
                                            <h2 className="fs-16">Enter your address</h2>
                                        </div>
                                        <div className="col-lg-12 mb-4 col-md-12 col-12 mt-4">
                                            {myDeliveryAddress && <AddressPill isChecked={true} address={myDeliveryAddress} id={myDeliveryAddress.id} />}
                                            {userinfo && <DeliveryaddresspillComponent />}
                                            <div className="text-center">
                                                <a className="address-nfound" onClick={handleClickAddNewAddress}>Add New Address</a>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="modal-footer">
                                <a className="btn-default w-100" onClick={handleClickConfirm} >Confirm</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    );
}
export default OrderTypeSelect;