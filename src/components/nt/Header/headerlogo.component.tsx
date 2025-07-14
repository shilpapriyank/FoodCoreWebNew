"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
//import MobileLeftmenuComponent from '../LeftMenu/mobile-leftmenu.component';
import { useRouter } from "next/navigation";
//import { MemoizedCartCounterComponent } from './cart-counter.component';
//import DeliveryDropdownMobileComponent from './delivery-dropdown-mobile.component';
import { GetThemeDetails } from "@/components/common/utility";
//import ConfirmComponent from '../Common/confirm.component';
//import LoginMainComponent from '../login/login.component';
//import ConfirmAddressChange from '../Common/Address/confirm-address-change.component';
import { setDeliveryPickupPopup } from "../../../../redux/main/main.slice";
import { useWindowDimensions } from "@/components/customhooks/usewindowdimension-hook";
import { PAGES } from "../common/pages";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";


interface HeaderLogoProps {
    isLeftMenu: boolean;
    isDisplayBack: boolean;
    isDisplayDeliveryOption: boolean;
    isDisplayCart: boolean;
    page?: string;
    routePath: {
        href: string;
        as: string;
    };
    mainCallback?: () => void;
}

const HeaderLogoComponent: React.FC<HeaderLogoProps> = ({
    isLeftMenu,
    isDisplayBack,
    isDisplayDeliveryOption,
    isDisplayCart,
    routePath,
    mainCallback,
}) => {
    const { restaurantinfo } = useReduxData();
    const dispatch = useDispatch();
    const router = useRouter();
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    const logo = restaurantinfo?.logo;
    const restaurantURL = restaurantinfo?.restaurantURL ?? "";
    const location = restaurantinfo?.defaultLocation?.locationURL ?? "";
    const selectedTheme = GetThemeDetails(restaurantinfo?.themetype ?? 0);

    const locationFullLink = `/${selectedTheme?.url}/${restaurantURL}/${location}/`;
    const locationHrefLink = `/${selectedTheme?.url}/[dynamic]/[location]/`;

    const [isConfirmPopup, setisConfirmPopup] = useState(false);
    const [loginpopup, setloginpopup] = useState(false);
    const [deliverylocationpopup, setdeliverylocationpopup] = useState(false);
    const [isPickupPopup, setisPickupPopup] = useState(false);

    const message = "Are you sure want to change the location?";

    const handleToggleLoginPopup = (value: boolean) => setloginpopup(value);
    const handleToggleConfirmModel = (value: boolean) => setisConfirmPopup(value);
    const handleToogleDeliveryLocationPopup = (value: boolean) => setdeliverylocationpopup(value);

    const handleChangeLocation = () => {
        if (typeof window !== "undefined" && window.location.pathname.includes(`/${PAGES.MAIN}`)) {
            mainCallback?.();
            setisConfirmPopup(false);
            return;
        }
        dispatch(setDeliveryPickupPopup(true));
        router.push(`${locationFullLink}${PAGES.MAIN}`);
        setisConfirmPopup(false);
    };

    const handletogglePickupPopup = () => {
        if (restaurantinfo?.isSchoolProgramEnabled) return;
        setisPickupPopup(!isPickupPopup);
    };

    return (
        <>
            {isMobile === true && (
                <div className="row visible-xs general-small-header">
                    {isLeftMenu === true && (
                        <div className="col-lg-2 col-sm-2 col-xs-2 menu-action-icon">
                            {/* <MobileLeftmenuComponent /> */}
                        </div>
                    )}

                    {isDisplayBack === true && (
                        <div className="col-lg-2 col-sm-2 col-xs-2">
                            {typeof window !== "undefined" && window.location.pathname.includes(`${locationHrefLink}`) ? ( //${PAGES.REGISTER}
                                <a className="size_24 weight_500 color_grey" onClick={() => history.back()}>
                                    <span className="bg_grey" id="backheader">
                                        <img src="/defaulttheme/images/arrow-left.svg" alt="back-img" />
                                    </span>
                                    Back
                                </a>
                            ) : (
                                <Link
                                    href={routePath.href}
                                    shallow={false}
                                    key={Math.random()}
                                    className="size_24 weight_500 color_grey"
                                >
                                    <span className="bg_grey" id="backheader">
                                        <img src="/defaulttheme/images/arrow-left.svg" alt="back-img" />
                                    </span>
                                </Link>

                            )}
                        </div>
                    )}

                    {!isLeftMenu && !isDisplayBack && <div className="col-lg-2 col-sm-2 col-xs-2 menu-action-icon" />}

                    <div className="col-lg-8 col-sm-8 col-xs-8 small-text-center">
                        <Link href={`${locationHrefLink}${PAGES.MAIN}`} as={`${locationFullLink}${PAGES.MAIN}`} legacyBehavior>
                            <a>{logo && <img src={logo} alt="logo-img" className="logo" />}</a>
                        </Link>

                        {/* {isDisplayDeliveryOption && (
                            // <DeliveryDropdownMobileComponent
                            //     handletogglePickupPopup={handletogglePickupPopup}
                            //     handleChangeLocation={handleChangeLocation}
                            //     handleToogleDeliveryLocationPopup={handleToogleDeliveryLocationPopup}
                            //     handleToggleConfirmModel={handleToggleConfirmModel}
                            //     handleToggleLoginPopup={handleToggleLoginPopup}
                            // />
                        )} */}
                    </div>

                    {isDisplayCart && (
                        <div className="col-lg-2 col-sm-2 col-xs-2">
                            {/* <MemoizedCartCounterComponent /> */}
                        </div>
                    )}
                </div>
            )}

            {/* {deliverylocationpopup && <ConfirmAddressChange />}
            {isConfirmPopup && (
                <ConfirmComponent
                    title="Confirm Change Location"
                    message={message}
                    handleClickConfirm={handleChangeLocation}
                    isModelButton={false}
                    handleClose={handleToggleConfirmModel}
                />
            )}
            {loginpopup && <LoginMainComponent restaurantinfo={restaurantinfo} />}
            {isPickupPopup && <PickupDeliveryPopup handletogglePickupPopup={handletogglePickupPopup} />} */}
        </>
    );
};

export const MemoizedHeaderLogoComponent = React.memo(HeaderLogoComponent);
