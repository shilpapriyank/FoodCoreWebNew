'use client';

// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useRouter } from 'next/navigation';

// import DeliveryaddresspillComponent from '../pickup-delivery/deliveryaddresspill.component';

// import { setpickupordelivery } from '../../../redux/selected-delivery-data/selecteddelivery.action';
// import { closeModal, GetThemeDetails, ORDER_TYPE } from '../../common/utility';
// import { getLocationIdFromStorage, setLocationIdInStorage } from '../../default/Common/localstore';
// import { clearRedux } from '../../../redux/clearredux/clearredux.action';
// import { getSelectedRestaurantTime, refreshCategoryList } from '../../../redux/main/main.action';
// import { deleteCartItemFromSessionId, emptycart } from '../../../redux/cart/cart.action';
// import { setintialrewardpoints, setrewardpoint } from '../../../redux/rewardpoint/rewardpoint.action';
// import { useReduxData } from '@/components/customhooks/useredux-data-hooks';
// import { LocationServices } from '../../../../redux/location/location.services';
// import { CustomerServices } from '../../../../redux/customer/customer.services';
// import PickupDeliveryButton from './pickup-delivery-btn.component';
// import AddressList from '../common/adresslist.component';
// import AddressPill from '@/components/common/address-pill.component';
// import { clearDeliveryRequestId } from '../../../../redux/order/order.slice';
// import { createSessionId } from '../../../../redux/session/session.slice';
// import { ChangeUrl, restaurantsdetail } from '../../../../redux/restaurants/restaurants.slice';

interface OrderTypeSelectProps {
    isOpenModal: boolean;
    handleToggleOrderTypeModal: (val: boolean) => void;
    handleToggleTimingModal?: (val: boolean) => void;
    handleChangeAddress?: () => void;
    handleToggleAddAddressModal: (val: boolean) => void;
}

const OrderTypeSelect: React.FC<OrderTypeSelectProps> = () => {
    // ({
    //   isOpenModal,
    //   handleToggleOrderTypeModal,
    //   handleToggleTimingModal,
    //   handleChangeAddress,
    //   handleToggleAddAddressModal,
    //}) => {
    //   const dispatch = useDispatch();
    //   const router = useRouter();
    //   const {
    //     selecteddelivery,
    //     restaurantinfo,
    //     rewardpoints,
    //     deliveryaddress,
    //     userinfo,
    //     sessionid,
    //   } = useReduxData();

    //   const [selectedLocationId, setSelectedLocationId] = useState<number>(0);
    //   const customerId = userinfo?.customerId || 0;
    //   const rewardvalue = rewardpoints?.rewardvalue;
    //   const selectedTheme = GetThemeDetails(restaurantinfo?.themetype);
    //   const locationFullLink = `/${selectedTheme?.url}/${restaurantinfo?.restaurantURL}`;
    //   const defaultLocation = restaurantinfo?.defaultLocation;
    //   const tempDeliveryAddress = deliveryaddress?.tempDeliveryAddress;
    //   const orderTypeName = selecteddelivery?.pickupordelivery;
    //   const address = orderTypeName === ORDER_TYPE.PICKUP.text ? defaultLocation : '';
    //   const selecteddeliveryaddress = selecteddelivery.selecteddeliveryaddress;
    //   const myDeliveryAddress = tempDeliveryAddress;

    //   const handleChangeOrderType = (orderType: string) => {
    //     dispatch(setpickupordelivery(orderType));
    //     if (ORDER_TYPE.DELIVERY.text === orderType && userinfo === null) {
    //       handleToggleOrderTypeModal(false);
    //       handleToggleAddAddressModal(true);
    //     }
    //   };

    //   const handleChangeLocation = (id: number) => {
    //     setSelectedLocationId(id);
    //   };

    //   const handleClickConfirmChangeLocation = async (lid: number) => {
    //     handleChangeAddress?.();
    //     dispatch(ChangeUrl(true));
    //     const res = await LocationServices.changeRestaurantLocation(
    //       restaurantinfo.restaurantId,
    //       lid
    //     );

    //     if (res) {
    //       Object.assign(restaurantinfo.defaultLocation, res);
    //       restaurantinfo.defaultlocationId = res.locationId;

    //       dispatch(restaurantsdetail(null));
    //       router.push(`${locationFullLink}/${restaurantinfo?.defaultLocation?.locationURL}`);
    //       dispatch(restaurantsdetail(restaurantinfo));

    //       const oldLocationId = getLocationIdFromStorage();
    //       if (oldLocationId !== restaurantinfo.defaultlocationId) {
    //         dispatch(clearRedux(true));
    //        // const id = uuidv4();
    //       //  dispatch(createSessionId(id));
    //       }

    //       if (userinfo?.customerId) {
    //         const rewardRes = await CustomerServices.checkCustomerRewardPointsLocationBase(
    //           restaurantinfo.restaurantId,
    //           userinfo.customerId,
    //           0,
    //           0,
    //           restaurantinfo?.defaultLocation.locationId
    //         );
    //         if (rewardRes.status === 1) {
    //           dispatch(
    //             setrewardpoint({
    //               rewardvalue,
    //               rewardamount: parseFloat(
    //                 ((rewardRes?.result?.totalrewardpoints || 0) / rewardvalue).toFixed(2)
    //               ),
    //               rewardPoint: rewardRes?.result?.totalrewardpoints,
    //               totalRewardPoints: rewardRes?.result?.totalrewardpoints,
    //               redeemPoint: 0,
    //             })
    //           );
    //         }
    //       }

    //       setLocationIdInStorage(restaurantinfo.defaultlocationId);
    //       dispatch(refreshCategoryList(restaurantinfo, customerId));
    //       dispatch(getSelectedRestaurantTime(restaurantinfo.restaurantId, lid));

    //       if (userinfo?.customerId) {
    //         deleteCartItemFromSessionId(
    //           sessionid,
    //           restaurantinfo.restaurantId,
    //           restaurantinfo.defaultLocation.locationId
    //         );
    //         dispatch(emptycart());
    //       }

    //       handleToggleOrderTypeModal(false);
    //       dispatch(
    //         setpickupordelivery(
    //           restaurantinfo?.defaultLocation?.defaultordertype
    //             ? ORDER_TYPE.DELIVERY.text
    //             : ORDER_TYPE.PICKUP.text
    //         )
    //       );
    //       handleToggleTimingModal?.(true);
    //       dispatch(clearDeliveryRequestId());
    //     }
    //   };

    //   const handleClickConfirm = () => {
    //     if (
    //       ORDER_TYPE.PICKUP.text === selecteddelivery.pickupordelivery &&
    //       selectedLocationId > 0 &&
    //       selectedLocationId !== restaurantinfo?.defaultlocationId
    //     ) {
    //       handleClickConfirmChangeLocation(selectedLocationId);
    //     } else {
    //       handleToggleOrderTypeModal(false);
    //     }
    //   };

    //   const handleClickAddNewAddress = () => {
    //     handleToggleOrderTypeModal(false);
    //     handleToggleAddAddressModal(true);
    // };

    return (
        <>
            <h1>from order type</h1>
        </>
    )
}
//   <>
//       <div
//         className={`modal fade modal-your-order ${isOpenModal ? 'show d-block' : ''}`}
//         tabIndex={-1}
//         style={{ display: 'block' }}
//         aria-labelledby="exampleModalLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content">
//             <h5 className="modal-title fs-5">YOUR ORDER</h5>
//             <button type="button" className="btn-close" onClick={() => handleToggleOrderTypeModal(false)} />
//             <form>
//               <div className="modal-body">
//                 <div className="row">
//                   <PickupDeliveryButton handleChangeOrderType={handleChangeOrderType} />
//                 </div>
//                 {ORDER_TYPE.PICKUP.text === selecteddelivery.pickupordelivery && (
//                   <div id="takeout" className="row">
//                     <div className="col-12 text-center">
//                       <h2>Choose a Location</h2>
//                     </div>
//                     <div className="col-12 mb-4">
//                       <ul className="nav nav-tabs" role="tablist">
//                         <li className="nav-item w-100">
//                           <button
//                             className={`nav-link ${ORDER_TYPE.PICKUP.text === selecteddelivery.pickupordelivery ? 'active' : ''}`}
//                             type="button"
//                           >
//                             By location
//                           </button>
//                         </li>
//                       </ul>
//                       <div className="tab-content">
//                         <div className="tab-pane fade show active">
//                           <div className="row">
//                             <div className="col-12">
//                               <AddressList
//                                 selectedLocationId={selectedLocationId}
//                                 handleChangeLocation={handleChangeLocation}
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {ORDER_TYPE.DELIVERY.text === selecteddelivery.pickupordelivery && (
//                   <div id="delivery" className="row">
//                     <div className="col-12 text-center">
//                       <h2 className="fs-16">Enter your address</h2>
//                     </div>
//                     <div className="col-12 mb-4 mt-4">
//                       {myDeliveryAddress && <AddressPill isChecked={true} address={myDeliveryAddress} id={myDeliveryAddress} />}
//                       {userinfo && <DeliveryaddresspillComponent />}
//                       <div className="text-center">
//                         <a className="address-nfound" onClick={handleClickAddNewAddress}>
//                           Add New Address
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//               <div className="modal-footer">
//                 <a className="btn-default w-100" onClick={handleClickConfirm}>
//                   Confirm
//                 </a>
//               </div>
//             </form>
//           </div >
//         </div>
//       </div>
//       <div className="modal-backdrop fade show"></div>
//     </>
//   );
// };

export default OrderTypeSelect;