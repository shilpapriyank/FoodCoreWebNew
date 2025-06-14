'use client';

import React, { useEffect, useState } from 'react';
import ButtonComponent from '../../../components/common/button.component';
import TimeSlotSkeletonComponent from '../skeleton/timeslot-skeleton.component';
import { TimeSlotPillComponent } from './timeslot-pill.component';
import 'swiper/swiper-bundle.css';
import { useReduxData } from '@/components/customhooks/useredux-data-hooks';
import { GetThemeDetails, ORDERTYPE, ORDER_TYPE, getAsapLaterOnState, orderDisable } from '../../common/utility';
import { checkOrderTime, emptyorder, emptyordertime, isasap, setFutureOrderDay, setordertime } from '../../../../redux/order/order.slice';
import FutureDayComponent from './future-day.component';
import { useDispatch } from 'react-redux';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { AsapLaterOnState, OrderDisableData, TimeSlot, TimeSlotPopupComponentProps } from '@/types/timeslot-types/timeslot.types';
import { OrderTypes } from '../../../../redux/order/order.type';
import { AppDispatch } from '../../../../redux/store';
import { LocationServices } from '../../../../redux/location/location.services';
import { PAGES } from '../common/pages';
import { OrderServices } from '../../../../redux/order/order.services';

const TimeSlotPopupComponent: React.FC<TimeSlotPopupComponentProps> = ({
    isOpenModal,
    handleToggleTimingModal,
    futureDateList,
    handleToggleTimeSlotModal,
    enablefutureordering,
    locationId,
    clearData,
    isRedirectMenu = false,
    isload,
    locationUrl,
    clearMeaage
}) => {
    const [loadSwipe, setloadSwipe] = useState<boolean>(false);
    const { restaurantinfo, selecteddelivery, order, restaurant, main, userinfo, deliveryaddress, sessionid } = useReduxData(); //futureDate
    const [selectedDate, setselectedDate] = useState<string>((order?.futureOrderDay as any)?.futureDay ?? '');
    const pickupordelivery = selecteddelivery?.pickupordelivery;
    const ordertype = pickupordelivery === ORDER_TYPE.DELIVERY.text ? ORDER_TYPE.DELIVERY.value : ORDER_TYPE.PICKUP.value;
    const [timeSlots, settimeSlots] = useState<TimeSlot[]>([]);
    const [loadTimeslot, setLoadTimeslot] = useState<boolean>(false);
    const [selectedTime, setselectedTime] = useState<string>(order.checktime);
    const restaurantslocationlistwithtime = restaurant.restaurantslocationlistwithtime;
    const addressList = restaurantslocationlistwithtime?.addressList ?? [];
    const selectedAddress = userinfo === null ? deliveryaddress?.tempDeliveryAddress : selecteddelivery?.selecteddeliveryaddress;
    const restaurantWindowTime = main.restaurantWindowTime;
    const defaultLocation = addressList.find((location: any) => location.locationId === locationId);
    const [timeOrErrorMessage, setTimeOrErrorMessage] = useState<string>('');
    const [isConfirmDisable, setisConfirmDisable] = useState<boolean>(false);
    const [orderTime, setOrderTime] = useState<string>("")
    const [currentDate, setcurrentDate] = useState<Date | undefined>();
    const [asapTime, setAsapTime] = useState<string>('');
    const [isAsap, setisAsap] = useState<boolean>(order.isasap);
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const location = searchParams.get('location') || '';
    const dynamic = searchParams.get('dynamic') || '';
    const id = searchParams.get('id') || '';
    const category = searchParams.get('category') || '';
    const items = searchParams.get('items') || '';
    const redirectPrevPage = searchParams.get('redirectcart') === 'true';
    const selectedTheme = GetThemeDetails(restaurantinfo.themetype);
    const locationFullLink = `/${selectedTheme.url}/${dynamic}/${locationUrl}/`;
    const dispatch = useDispatch<AppDispatch>();
    const asapLaterOnState: AsapLaterOnState = getAsapLaterOnState(defaultLocation, pickupordelivery, restaurantWindowTime);
    const orderDisableData: OrderDisableData = orderDisable(restaurantinfo, selecteddelivery, restaurantWindowTime);
    const selectedDay: string = (order?.futureOrderDay as any)?.futureDay || '';
    const [dayCloseError, setDayCloseError] = useState<string>('');

    useEffect(() => {
        let date = new Date();
        setcurrentDate(date as any);
    }, []);

    // const handleClick = async (
    //     lid: number,
    //     locationUrl: string,
    //     isPickup: boolean): Promise<void> => {
    //     LocationServices.changeRestaurantLocation(restaurantinfo.restaurantId, lid).then((res) => {
    //         if (res) {
    //             Object.keys(restaurantinfo).map((session) => {
    //                 if (session === 'defaultLocation') {
    //                     Object.assign(restaurantinfo.defaultLocation, res);
    //                 }
    //                 if (session === 'defaultlocationId') {
    //                     restaurantinfo.defaultlocationId = res.locationId;
    //                 };
    //             });
    //             dispatch(restaurantsdetail(null));
    //             dispatch(restaurantsdetail(restaurantinfo));
    //             let oldLocationId = getLocationIdFromStorage();
    //             if (oldLocationId !== restaurantinfo.defaultlocationId) {
    //                 dispatch(clearRedux(false));
    //                 if (isPickup === true) {
    //                     dispatch(setpickupordelivery(ORDERTYPE.Pickup))
    //                 }
    //                 setLocationIdInStorage(restaurantinfo.defaultlocationId);
    //                 let id = uuidv4();
    //                 dispatch(createSessionId(id));
    //                 dispatch(refreshCategoryList(restaurantinfo, lid));
    //                 dispatch(getSelectedRestaurantTime(restaurantinfo.restaurantId, lid))
    //                 if (userinfo && userinfo?.customerId) {
    //                     deleteCartItemFromSessionId(sessionid, restaurantinfo.restaurantId, defaultLocation.locationId);
    //                     dispatch(emptycart());
    //                     dispatch(setintialrewardpoints(userinfo));
    //                 }
    //             } redirectOnTimeSelected(locationUrl)
    //         }
    //     })
    // }

    const redirectOnTimeSelected = (locationUrl: string): void => {
        if (pathname.includes(PAGES.DELIVERY)) {
            if (isRedirectMenu) {
                router.push(`/${selectedTheme.url}/${dynamic}/${locationUrl}/${PAGES.MENU}`);
            } else {
                router.back();
            }
        }
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setloadSwipe(true);
        }, 3500);
        if (selectedDate === '' && (selectedDay === "" || selectedDay === undefined)) {
            handleClickDate(futureDateList?.[0]);
        } else {
            handleClickDate((order?.futureOrderDay as any));
        };
    }, []);

    const handleClickDate = (day: {
        deliveryStatus?: string;
        takeoutStatus?: string;
        futureDate?: string;
        futureDay?: string;
    }, isClose?: boolean): void => {
        const isClosed =
            ordertype === ORDER_TYPE.DELIVERY.value
                ? day?.deliveryStatus === 'Closed'
                : day?.takeoutStatus === 'Closed';

        if (isClose || isClosed) {
            setDayCloseError(`${selecteddelivery.pickupordelivery} closed on ${day?.futureDate}`);
            dispatch(setFutureOrderDay(day as any));
            setselectedDate(day?.futureDay ?? '');
        } else {
            setDayCloseError('');
            setLoadTimeslot(true);
            setselectedDate(day?.futureDay ?? '');
            dispatch(setFutureOrderDay(day as any));
            settimeSlots([]);
            setselectedTime('');
            if (day?.futureDay !== selectedDay) {
                dispatch(emptyordertime());
            }
            OrderServices.generateTimeSlot(restaurantinfo?.restaurantId,
                // defaultLocation?.locationId, ordertype, day?.futureDate ?? ''
            ).then((res: TimeSlot[]) => {
                dispatch(isasap(false));
                settimeSlots(res);
                setLoadTimeslot(false);
            });
        }
    };

    const handleClickTimePill = (time: TimeSlot): void => {
        dispatch(isasap(false));
        setselectedTime(`${time?.StartSlotNew} - ${time?.EndSlotNew}`);
    };

    const handleTimeClick = (time: any): void => {
        OrderServices.getOrderTiming(
            restaurantinfo.restaurantId,
            // defaultLocation.locationId,
            // ordertype,
            // selectedAddress,
            // ""
        ).then((gettimeresponse) => {
            setTimeout(() => {
                if (gettimeresponse?.result) {
                    if (gettimeresponse.result?.time) {
                        let time = gettimeresponse.result.time.split(' ');
                        let requestID;
                        OrderServices.checkOrderTime(restaurantinfo.restaurantId,
                            //  defaultLocation.locationId, time[0], time[1], ordertype, selectedAddress, requestID
                        )
                            .then((response) => {
                                if (response.result.message && response.result.message.length > 0 && response.result.status !== "success") {
                                    setTimeOrErrorMessage(response.result.message);
                                    dispatch(emptyordertime());
                                    return;
                                }
                                if (response.result != undefined && response.result !== null) {
                                    if (response.result?.status === "success") {
                                        let newtime = time[0] + ' ' + time[1];
                                        setOrderTime(newtime);
                                        dispatch(setordertime(newtime));
                                        setAsapTime(newtime)
                                        setisAsap(true)
                                        setisConfirmDisable(false)
                                        setTimeOrErrorMessage("");
                                    } else {
                                        setTimeOrErrorMessage(response.result.message);
                                    }
                                }
                            });
                    }
                }
            }, 500
            );
        });
    }

    const handleClickAsap = (time: TimeSlot): void => {
        dispatch(isasap(true))
        handleTimeClick(time as any)
        setselectedTime(`${time.StartSlotNew}-${time?.EndSlotNew}`)
    }

    const handleClickSchedule = (): void => {
        if (!order.isasap) {
            dispatch({
                type: OrderTypes.CHECK_ORDER_TIME,
                payload: selectedTime,
            });
        }
        redirectOnTimeSelected(locationUrl);
        handleToggleTimingModal(false);
    };

    const handleClose = (): void => {
        handleToggleTimeSlotModal?.()
        setloadSwipe(false)
    }

    return (
        <>
            <div className={`modal fade modal-your-order address-modal ${isOpenModal ? 'show d-block' : ''}`} style={{ display: 'block' }} id="order-time-modal" aria-labelledby="order-time-modal-Label" aria-hidden="true" >
                <div className={`modal-dialog modal-dialog-centered ${true ? "modal-dialog-scrollable" : ""}`}>
                    <div className="modal-content pb-0">
                        <h5 className="modal-title" id="login-modal-Label">{`Schedule ${ordertype === ORDER_TYPE.DELIVERY.value ? ORDER_TYPE.DELIVERY.text : ORDER_TYPE.PICKUP.text}`}</h5>
                        <a className="btn-close close-time " id='close-modal ' onClick={() => handleToggleTimingModal(false)}  ></a>
                        {/* </div> */}
                        {enablefutureordering && <div className="row">
                            <div className="col-12 pe-0 mt-2" >
                                <div className="swiper-container">
                                    {loadSwipe &&
                                        <FutureDayComponent ordertype={ordertype} order={order as any} selectedDate={selectedDate} enablefutureordering={enablefutureordering} futureDateList={futureDateList} handleClickDate={handleClickDate} />}
                                </div>
                            </div>
                        </div>
                        }
                        <div className={`modal-body ts-body ${dayCloseError !== "" ? "p-0 pb-2" : ""}`}>
                            <div className='time-slot'>
                                <div className="row ">
                                    <div className="col-12 mb-2">
                                    </div>
                                </div>
                                <div className="row">
                                    {dayCloseError === '' ? <>  {
                                        (asapLaterOnState.isAsap && selectedDate === "Today") &&
                                        <TimeSlotPillComponent time={{ StartSlotNew: "ASAP", EndSlotNew: "ASAP" }} id={"C"} label="As Soon As Possible"
                                            handleClickTimePill={handleClickAsap}
                                            isDisable={asapLaterOnState.isDisableAsapLateron}
                                            selectedTime={isAsap ? "ASAP - ASAP" : selectedTime}
                                        />}
                                        {(!loadTimeslot && loadSwipe) ? <>
                                            {/* {timeSlots && timeSlots?.map((time, index) => {
                                                return <>{time.StartSlotNew !== null &&
                                                    // <TimeSlotPillComponent
                                                    // time={time}
                                                    // selectedTime={selectedTime || order.checktime}
                                                    // name={`${time.StartSlotNew} - ${time.EndSlotNew}`}
                                                    // handleClickTimePill={handleClickTimePill}
                                                    // label={`${time.StartSlotNew} - ${time.EndSlotNew}`}
                                                    // key={`A${time.StartSlotNew}-${time.EndSlotNew}`}
                                               // />
                                                }
                                                </>
                                            })} */}
                                        </> :
                                            <TimeSlotSkeletonComponent />
                                        }
                                    </> : <>{<p className='red-text text-center p-0'>{dayCloseError}</p>}</>}
                                </div>
                            </div>
                        </div>
                        <div className="row modal-footer position-sticky sticky-bottom border-top-0 footer-top-shadow">
                            {((order.isasap && asapTime !== "" && dayCloseError === "")) &&
                                <h6 className='text-center fs-5'>{ }{selectedDay},&nbsp;{(order?.futureOrderDay as any)?.futureDate}, {asapTime}</h6>
                            }
                            {((!order.isasap && (selectedTime !== "" || order?.checktime !== "") && timeOrErrorMessage === "") && dayCloseError === "") &&
                                <h6 className='text-center fs-5'>{ }{selectedDay},&nbsp;{(order?.futureOrderDay as any)?.futureDate}, {selectedTime || order?.checktime}</h6>
                            }
                            {timeOrErrorMessage !== "" && <h6 className='text-center red-text fs-6'>{timeOrErrorMessage}</h6>}
                            {(orderDisableData.isorderdisable && (selectedDay === "Today" || selectedDay === "")) && <h6 className='text-center red-text fs-6'>{orderDisableData.errormessage}</h6>}
                            <div className="d-grid gap-2 col-md-6 col-12 mx-auto mt-2">
                                {(selectedTime === "" && order?.checktime === "" || dayCloseError !== "") ?
                                    <ButtonComponent classname=" btn-default btn-orange opacity-50 no-drop" textName="Schedule" isDisable={selectedTime === ""} />  //Component
                                    : <ButtonComponent classname=" btn-default btn-orange" textName="Schedule" handleClick={handleClickSchedule} isDisable={false} />
                                } </div>
                            <div className="d-grid gap-2 col-md-6 col-12 mx-auto mt-2">
                                <button className=" btn-default btn-orange" data-bs-dismiss="modal" type="button" onClick={handleClose}>Cancel</button>
                            </div>  </div>  </div> </div> </div>
            <div className="modal-backdrop fade show"></div>
        </>
    );
};

export default TimeSlotPopupComponent;