"use client";

import React, { useState } from "react";
import PickupDeliveryButton from "./pickup-delivery-btn.component";
import { setpickupordelivery } from "../../../../redux/selected-delivery-data/selecteddelivery.slice";
import { useParams, useRouter } from "next/navigation";
import { GetThemeDetails, ORDER_TYPE } from "../../common/utility";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import AddressList from "../common/adresslist.component";
import {
  ChangeUrl,
  restaurantsdetail,
} from "../../../../redux/restaurants/restaurants.slice";
import {
  getLocationIdFromStorage,
  setLocationIdInStorage,
} from "@/components/common/localstore";
import { clearRedux } from "../../../../redux/tableorder/tableorder.slice";
import { v4 as uuidv4 } from "uuid";
import { createSessionId } from "../../../../redux/session/session.slice";
import {
  getSelectedRestaurantTime,
  refreshCategoryList,
} from "../../../../redux/main/main.slice";
import {
  deleteCartItemFromSessionId,
  emptycart,
} from "../../../../redux/cart/cart.slice";
import { setrewardpoint } from "../../../../redux/rewardpoint/rewardpoint.slice";
import AddressPill from "@/components/common/address-pill.component";
import DeliveryaddresspillComponent from "../pickup-delivery/deliveryaddresspill.component";
import { clearDeliveryRequestId } from "../../../../redux/order/order.slice";
import { CustomerServices } from "../../../../redux/customer/customer.services";
import { useAppDispatch } from "../../../../redux/hooks";
import { LocationServices } from "../../../../redux/location/location.services";

const OrderTypeSelect = ({
  isOpenModal,
  handleToggleOrderTypeModal,
  handleToggleTimingModal,
  handleChangeAddress,
  handleToggleAddAddressModal,
}: {
  isOpenModal: boolean;
  handleToggleOrderTypeModal: (open: boolean) => void;
  handleToggleTimingModal?: (open: boolean) => void;
  handleChangeAddress?: () => void;
  handleToggleAddAddressModal: (open: boolean) => void;
}) => {
  const dispatch = useAppDispatch();
  const params = useParams();
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
  const customerId = userinfo ? userinfo.customerId : 0;
  const rewardvalue = rewardpoints?.rewardvalue;
  const dynamic = params.dynamic as string;
  const location = params.location as string;
  const selectedTheme = GetThemeDetails(restaurantinfo?.themetype as number);
  const locationFullLink = `/${selectedTheme?.url}/${restaurantinfo?.restaurantURL}`;
  const defaultLocation = restaurantinfo?.defaultLocation;
  const tempDeliveryAddress = deliveryaddress?.tempDeliveryAddress;
  const orderTypeName = selecteddelivery?.pickupordelivery;
  const address =
    orderTypeName === ORDER_TYPE.PICKUP.text ? defaultLocation : "";
  const selecteddeliveryaddress = selecteddelivery.selecteddeliveryaddress;
  const myDeliveryAddress = tempDeliveryAddress;

  const handleChangeOrderType = (orderType: string) => {
    dispatch(setpickupordelivery(orderType));
    if (ORDER_TYPE.DELIVERY.text === orderType) {
      if (userinfo === null) {
        handleToggleOrderTypeModal(false);
        handleToggleAddAddressModal(true);
      }
    }
  };
  const handleChangeLocation = (id: number) => {
    setSelectedLocationId(id);
  };

  const handleClickConfirmChangeLocation = async (
    lid: number,
    locationUrl: string
  ) => {
    handleChangeAddress?.();
    dispatch(ChangeUrl(true));
    LocationServices.changeRestaurantLocation(
      restaurantinfo?.restaurantId as number,
      lid
    ).then((res) => {
      // if (res && restaurantinfo) {
      //   Object.keys(restaurantinfo).map((session) => {
      //     if (session === "defaultLocation") {
      //       Object.assign(restaurantinfo.defaultLocation, res);
      //     }
      //     if (session === "defaultlocationId") {
      //       restaurantinfo.defaultlocationId = res.locationId;
      //     }
      //   });
      //   dispatch(restaurantsdetail(null));
      //   router.push(
      //     `${locationFullLink}/${restaurantinfo?.defaultLocation?.locationURL}`
      //   );
      //   dispatch(restaurantsdetail(restaurantinfo));
      //   //   CLEAR THE REDUX IF PREVIOUS LOCATION AND THE CURRENT SELECTED LOCATION IS NO SAME
      //   let oldLocationId = getLocationIdFromStorage();
      //   if (oldLocationId !== restaurantinfo.defaultlocationId) {
      //     dispatch(clearRedux());
      //     let id = uuidv4();
      //     dispatch(createSessionId(id));
      //   }
      //   if (userinfo && userinfo?.customerId) {
      //     CustomerServices.checkCustomerRewardPointsLocationBase(
      //       restaurantinfo.restaurantId,
      //       userinfo.customerId,
      //       0,
      //       "0",
      //       restaurantinfo?.defaultLocation.locationId
      //     ).then((res) => {
      //       if (res?.status == 1) {
      //         let rewards = {
      //           rewardvalue: rewardvalue,
      //           rewardamount: parseFloat(
      //             (res?.result?.totalrewardpoints / rewardvalue - 0).toFixed(2)
      //           ),
      //           rewardPoint: res?.result?.totalrewardpoints,
      //           totalRewardPoints: res?.result?.totalrewardpoints,
      //           redeemPoint: 0,
      //         };
      //         dispatch(setrewardpoint(rewards));
      //       }
      //     });
      //   }
      //   setLocationIdInStorage(restaurantinfo.defaultlocationId);
      //   // setdefaultLoactionId(lid)
      //   dispatch(
      //     refreshCategoryList({
      //       newselectedRestaurant: restaurantinfo,
      //       customerId: customerId,
      //     })
      //   );
      //   dispatch(
      //     getSelectedRestaurantTime({
      //       restaurantId: restaurantinfo?.restaurantId,
      //       locationId: lid,
      //     })
      //   );
      //   // dispatch(getAllCategoryMenuItems(restaurantinfo.restaurantId, lid,userinfo?.customerId))
      //   if (userinfo && userinfo?.customerId) {
      //     deleteCartItemFromSessionId({
      //       cartsessionId: sessionid as string,
      //       restaurantId: restaurantinfo?.restaurantId as number,
      //       locationId: defaultLocation?.locationId as number,
      //     });

      //     dispatch(emptycart());
      //     // dispatch(setintialrewardpoints(userinfo));
      //   }
      //   handleToggleOrderTypeModal(false);
      //   dispatch(
      //     setpickupordelivery(
      //       restaurantinfo?.defaultLocation?.defaultordertype
      //         ? ORDER_TYPE.DELIVERY.text
      //         : ORDER_TYPE.PICKUP.text
      //     )
      //   );
      //   handleToggleOrderTypeModal(false);
      //   handleToggleTimingModal?.(true);

      //   dispatch(clearDeliveryRequestId());
      // }
      if (res && restaurantinfo) {
        const updatedRestaurantInfo = {
          ...restaurantinfo,
          defaultLocation: { ...restaurantinfo.defaultLocation },
        };

        Object.keys(restaurantinfo).map((session) => {
          if (session === "defaultLocation") {
            Object.assign(updatedRestaurantInfo.defaultLocation, res);
          }
          if (session === "defaultlocationId") {
            updatedRestaurantInfo.defaultlocationId = res.locationId;
          }
        });

        dispatch(restaurantsdetail(null));
        router.push(
          `${locationFullLink}/${updatedRestaurantInfo?.defaultLocation?.locationURL}`
        );
        dispatch(restaurantsdetail(updatedRestaurantInfo));

        //   CLEAR THE REDUX IF PREVIOUS LOCATION AND THE CURRENT SELECTED LOCATION IS NO SAME
        let oldLocationId = getLocationIdFromStorage();
        if (oldLocationId !== updatedRestaurantInfo.defaultlocationId) {
          dispatch(clearRedux());
          let id = uuidv4();
          dispatch(createSessionId(id));
        }

        if (userinfo && userinfo?.customerId) {
          CustomerServices.checkCustomerRewardPointsLocationBase(
            updatedRestaurantInfo.restaurantId,
            userinfo.customerId,
            0,
            "0",
            updatedRestaurantInfo?.defaultLocation.locationId
          ).then((res) => {
            if (res?.status == 1) {
              let rewards = {
                rewardvalue: rewardvalue,
                rewardamount: parseFloat(
                  (res?.result?.totalrewardpoints / rewardvalue - 0).toFixed(2)
                ),
                rewardPoint: res?.result?.totalrewardpoints,
                totalRewardPoints: res?.result?.totalrewardpoints,
                redeemPoint: 0,
              };
              dispatch(setrewardpoint(rewards));
            }
          });
        }

        setLocationIdInStorage(updatedRestaurantInfo.defaultlocationId);

        dispatch(
          refreshCategoryList({
            newselectedRestaurant: updatedRestaurantInfo,
            customerId: customerId,
          })
        );
        dispatch(
          getSelectedRestaurantTime({
            restaurantId: updatedRestaurantInfo?.restaurantId,
            locationId: lid,
          })
        );

        if (userinfo && userinfo?.customerId) {
          deleteCartItemFromSessionId({
            cartsessionId: sessionid as string,
            restaurantId: updatedRestaurantInfo?.restaurantId as number,
            locationId: defaultLocation?.locationId as number,
          });

          dispatch(emptycart());
        }

        handleToggleOrderTypeModal(false);
        dispatch(
          setpickupordelivery(
            updatedRestaurantInfo?.defaultLocation?.defaultordertype
              ? ORDER_TYPE.DELIVERY.text
              : ORDER_TYPE.PICKUP.text
          )
        );
        handleToggleOrderTypeModal(false);
        handleToggleTimingModal?.(true);

        dispatch(clearDeliveryRequestId());
      }
    });
  };

  const handleClickConfirm = () => {
    //order type pickup then chnage location if location is not default location
    if (
      ORDER_TYPE.PICKUP.text === selecteddelivery.pickupordelivery &&
      selectedLocationId > 0 &&
      selectedLocationId !== restaurantinfo?.defaultlocationId
    ) {
      handleClickConfirmChangeLocation(selectedLocationId, "");
    } else {
      handleToggleOrderTypeModal(false);
    }
  };

  const handleClickAddNewAddress = () => {
    handleToggleOrderTypeModal(false);
    handleToggleAddAddressModal(true);
  };

  return (
    <>
      <div
        className={`modal fade modal-your-order ${
          isOpenModal ? "show d-block" : ""
        }`}
        tabIndex={-1}
        style={{ display: "block" }}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <h5 className="modal-title fs-5" id="staticBackdropLabel">
              YOUR ORDER
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => handleToggleOrderTypeModal(false)}
            />
            <form>
              <div className="modal-body">
                <div className="row">
                  <PickupDeliveryButton
                    handleChangeOrderType={handleChangeOrderType}
                  />
                </div>
                {ORDER_TYPE.PICKUP.text ===
                  selecteddelivery.pickupordelivery && (
                  <div id="takeout" className="row">
                    <div className="col-lg-12 text-center col-md-12 col-12">
                      <h2>Choose a Location</h2>
                    </div>
                    <div className="col-lg-12 mb-4 col-md-12 col-12">
                      <ul className="nav nav-tabs" id="myTab" role="tablist">
                        {(selecteddelivery.pickupordelivery as string) ===
                          ORDER_TYPE.DELIVERY.text && (
                          <li className="nav-item w-100">
                            <button
                              className="nav-link active"
                              id="home-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#home-tab-pane"
                              type="button"
                              role="tab"
                              aria-controls="home-tab-pane"
                              aria-selected="true"
                            >
                              By address
                            </button>
                          </li>
                        )}
                        {ORDER_TYPE.PICKUP.text ===
                          selecteddelivery.pickupordelivery && (
                          <li className="nav-item w-100">
                            <button
                              className={`nav-link ${
                                ORDER_TYPE.PICKUP.text ===
                                selecteddelivery.pickupordelivery
                                  ? "active"
                                  : ""
                              }`}
                              id="profile-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#profile-tab-pane"
                              type="button"
                              role="tab"
                              aria-controls="profile-tab-pane"
                              aria-selected="false"
                            >
                              By location
                            </button>
                          </li>
                        )}
                      </ul>
                      <div className="tab-content" id="myTabContent">
                        <div
                          className="tab-pane fade show active"
                          id="home-tab-pane"
                          role="tabpanel"
                          aria-labelledby="home-tab"
                          tabIndex={0}
                        >
                          {(selecteddelivery.pickupordelivery as string) ===
                            ORDER_TYPE.DELIVERY.text && (
                            <div className="row">
                              <div className="col-lg-12 col-md-12 col-12">
                                <label>Address</label>
                                <div className="search">
                                  <input
                                    type="text"
                                    className="form-control search"
                                    defaultValue="undefined undefined, undefined, undefined, undefined"
                                  />
                                  <i className="fa fa-search" />
                                </div>
                                <div className="text-center">
                                  <a className="address-nfound" href="#">
                                    Address not found ?
                                  </a>
                                </div>
                                <label>Apt #</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Optional"
                                />
                                <div className="text-center short-info">
                                  <p>
                                    <i className="fa fa-info-circle" />
                                    <br /> Variable '$position.latitude' is
                                    invalid. Received a null input for a
                                    non-null variable. Variable
                                    '$address.civicNumber' is invalid. No value
                                    provided for a non-null variable.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                          {ORDER_TYPE.PICKUP.text ===
                            selecteddelivery.pickupordelivery && (
                            <div className="row">
                              <div className="col-lg-12 col-md-12 col-12">
                                <AddressList
                                  selectedLocationId={selectedLocationId}
                                  handleChangeLocation={handleChangeLocation}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {ORDER_TYPE.DELIVERY.text ===
                  selecteddelivery.pickupordelivery && (
                  <div id="delivery" className="row ">
                    <div className="col-lg-12 text-center col-md-12 col-12">
                      <h2 className="fs-16">Enter your address</h2>
                    </div>
                    <div className="col-lg-12 mb-4 col-md-12 col-12 mt-4">
                      {/* {myDeliveryAddress && (
                        <AddressPill
                          isChecked={true}
                          id={String(myDeliveryAddress.id)}
                          address={myDeliveryAddress as GetDeliveryAddressType} // id add this interface
                        />
                      )} */}
                      {myDeliveryAddress && (
                        <AddressPill
                          isChecked={true}
                          address={myDeliveryAddress}
                        />
                      )}
                      {userinfo && <DeliveryaddresspillComponent />}
                      <div className="text-center">
                        <a
                          className="address-nfound"
                          onClick={handleClickAddNewAddress}
                        >
                          Add New Address
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <a className="btn-default w-100" onClick={handleClickConfirm}>
                  Confirm
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};
export default OrderTypeSelect;
