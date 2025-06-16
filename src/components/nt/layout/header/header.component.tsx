"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname, useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Logo from "./logo.component";
import SelectedAddressHeader from "./selected-address-header.component";
import UserDropdown from "./user-dropdown.component";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { GetThemeDetails } from "@/components/common/utility";
import { PAGES } from "../../common/pages";
import { AppDispatch } from "../../../../../redux/store";
import { ToasterPositions } from "@/components/default/helpers/toaster/toaster-positions";
import { ToasterTypes } from "@/components/default/helpers/toaster/toaster-types";
import handleNotify from "@/components/default/helpers/toaster/toaster-notify";
import { clearRedux } from "../../../../../redux/clearredux/clearredux.slice";
import { setrewardpoint } from "../../../../../redux/rewardpoint/rewardpoint.slice";
import useFutureOrder from "@/components/customhooks/usefuture-order-hook";
import { useWindowDimensions } from "@/components/customhooks/usewindowdimension-hook";
import CartCounter from "../../common/cart-counter.component";
//import OrderTypeSelect from '../../ordertype/ordertype-select.component';
import AddAddress from "../../common/add-address.component";
import OrderTypeSelect from "../../ordertype/ordertype-select.component";

interface HeaderProps {
  handleChangeAddress?: () => void;
  page?: string;
}

const Header: React.FC<HeaderProps> = ({ handleChangeAddress, page }) => {
  const { restaurantinfo, selecteddelivery, order, userinfo } = useReduxData();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname: string = usePathname();
  const params: Record<string, string> = useParams();
  const [openAdressModal, setopenAdressModal] = useState<boolean>(false);
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const [isOpenOrderTypeModal, setisOpenOrderTypeModal] =
    useState<boolean>(false);
  const [openAccountConfirmModal, setopenAccountConfirmModal] =
    useState<boolean>(false);
  const logoUrl: string =
    restaurantinfo?.logo ??
    "https://foodcoredev.blob.core.windows.net/foodcoredevcontainer/Resources/RestaurantLogo/14.png";
  const selectedTheme = GetThemeDetails(restaurantinfo?.themetype);
  const isHomePage: boolean = page === "location";
  const themeUrl: string | undefined = selectedTheme?.url;
  const restaurantUrl: string | undefined = restaurantinfo?.restaurantURL;
  const locationSlug = restaurantinfo?.defaultLocation?.locationURL;
  const b2b: boolean = restaurantinfo?.defaultLocation?.b2btype ?? false;
  const isSchoolProgramEnabled: boolean =
    restaurantinfo?.defaultLocation?.schoolprogramenabled ?? false;
  const orderTypeName: string = selecteddelivery?.pickupordelivery;
  const { enabletimeslot, isFutureOrder, futureDay } = useFutureOrder();
  const openTimeModelDefault =
    pathname.includes(PAGES.CHECKOUT) &&
    order?.checktime === "" &&
    !b2b &&
    !isSchoolProgramEnabled;
  const [opentimingModal, setopentimingModal] = useState(openTimeModelDefault);

  const { width } = useWindowDimensions();
  const isMobile: boolean = width < 768;
  const locationFullLink: string = `/${themeUrl}/${restaurantUrl}/${locationSlug}`;

  useEffect(() => {
    if (b2b && userinfo === null && openLoginModal === false) {
      setOpenLoginModal(true);
    }
  }, [userinfo]);

  const [modalState, setModalState] = useState({
    openRegisterModal: false,
    openRewardModal: false,
    openOtpModal: false,
    openUserExistModal: false,
    openVerifyPhone: false,
    openForgotPassModal: false,
    openSendEmailConfirm: false,
    isAddressModalOnBcChemical: false,
  });

  const handleToggleOrderTypeModal = (value: boolean) => {
    setisOpenOrderTypeModal(value);
  };
  const handleToggleAddAddressModal = (value: boolean) => {
    setopenAdressModal(value);
  };
  const handleToggleTimingModal = (value: boolean) => {
    setopentimingModal(value);
  };

  const handleOpenLoginModal = (value: boolean) => {
    setOpenLoginModal(value);
  };

  const handleToggleAccountConfirm = (value: boolean) => {
    setopenAccountConfirmModal(value);
  };

  const handleToggle = (value: boolean, key: string) => {
    setModalState((pre) => ({
      ...pre,
      [key]: value,
    }));
  };

  const handleLogOutclick = useCallback(() => {
    if (userinfo !== undefined && userinfo !== null) {
      let rewardpoints = {
        rewardvalue: 0,
        rewardamount: 0,
        rewardPoint: 0,
        totalRewardPoints: 0,
        redeemPoint: 0,
      };
      dispatch(setrewardpoint(rewardpoints));
      handleNotify(
        "Logout successfully!",
        ToasterPositions.TopRight,
        ToasterTypes.Success
      );

      const routepath = `/${selectedTheme?.url}/${restaurantinfo?.restaurantURL}/${restaurantinfo?.defaultLocation?.locationURL}`;
      router.push(routepath);
    } else {
      handleNotify(
        "Please login first before logout!",
        ToasterPositions.TopRight,
        ToasterTypes.Info
      );
    }
  }, [userinfo]);

  // const handleClickUserExist = () => {
  //     handleToggle(false, 'openUserExistModal')
  //     setOpenLoginModal(true, 'openUserExistModal')
  // }

  return (
    <>
      <section className="header">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-2 text-center col-md-3 col-10">
              {isHomePage ? (
                <>
                  <a
                    className={`logo d-md-block ${
                      userinfo === null ? "d-none" : ""
                    }`}
                  >
                    <span className="head-arrow">
                      <i className="fa fa-angle-left" />
                    </span>
                    <Link href={locationFullLink}>
                      <img src={logoUrl} alt="Logo" />
                    </Link>
                  </a>

                  {userinfo === null && (
                    <a
                      className="logo d-block d-md-none login-btn"
                      onClick={() => handleOpenLoginModal(true)}
                    >
                      <span className="head-arrow">
                        <i className="fa fa-user color-green" />
                      </span>
                      <img src={logoUrl} />
                    </a>
                  )}
                </>
              ) : (
                <>
                  <Logo logoUrl={logoUrl} path={locationFullLink} />
                </>
              )}
            </div>
            {isMobile && (
              <div className="col-2 d-md-none px-0 fs-5 mt-2 count-mobile">
                <CartCounter />
              </div>
            )}
            <div className="col-lg-8 col-md-8 col-12">
              {!(
                pathname.includes(PAGES.PAYMENT) ||
                pathname.includes(PAGES.CREATE_NEW_PASS)
              ) && (
                <form>
                  <div className="align-form">
                    <div className="d-flex justify-content-center mb-2 mb-md-0">
                      {restaurantinfo?.ioslink && (
                        <a
                          className="cursor_pointer app-icon px-1"
                          href={restaurantinfo?.ioslink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img src="/nt/img/app_store.png" />
                        </a>
                      )}
                      {restaurantinfo?.androidlink && (
                        <a
                          className="cursor_pointer app-icon px-1"
                          href={restaurantinfo?.androidlink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img src="/nt/img/android.png" />
                        </a>
                      )}
                    </div>

                    {/* <SelectedAddressHeader
                      b2b={b2b}
                      handleToggleOrderTypeModal={handleToggleOrderTypeModal}
                    /> */}

                    {/* {!b2b && !isSchoolProgramEnabled && (
                      <>
                        {" "}
                        {orderTypeName !== "" && (
                          <label className="d-none d-md-block text-capitalize">
                            {orderTypeName} time
                          </label>
                        )}
                        <h6 className="align-center mt-2 color-dynamic  cursor-pointer pointer-cursor ">
                          {orderTypeName !== "" && (
                            <span className="d-md-none text-dark me-1">
                              {orderTypeName} time
                            </span>
                          )}
                          {isFutureOrder && (
                            <span className="btn-default ">
                              {(futureDay as any)?.futureDay}
                            </span>
                          )}
                          &nbsp;
                          <span
                            className="text btn-default  "
                            onClick={() => handleToggleTimingModal(true)}
                          >
                            {order.isasap ? "Asap" : "Later"}{" "}
                          </span>
                          &nbsp;
                          {order.checktime !== "" && (
                            <span
                              className="btn-default"
                              onClick={() => handleToggleTimingModal(true)}
                            >
                              {" "}
                              {order.checktime}
                            </span>
                          )}
                          {userinfo === null && (
                            <span
                              className="btn btn-sm btn-default d-none d-md-block login-btn d-md-none ms-1"
                              onClick={() => handleOpenLoginModal(true)}
                            >
                              Login
                            </span>
                          )}
                        </h6>
                      </>
                    )} */}
                    {isSchoolProgramEnabled && userinfo === null && (
                      <h6 className="align-center mt-2 color-dynamic  cursor-pointer pointer-cursor ">
                        <span
                          className="btn btn-sm btn-default d-none d-md-block login-btn d-md-none ms-1"
                          onClick={() => handleOpenLoginModal(true)}
                        >
                          Login
                        </span>
                      </h6>
                    )}
                  </div>
                </form>
              )}
            </div>
            <div className="col-lg-2 col-md-12 text-md-end col-12 d-none d-md-block">
              <UserDropdown
                handleLogOutclick={handleLogOutclick}
                handleOpenLoginModal={handleOpenLoginModal}
              />
            </div>
            <div className=" d-block d-md-none user-drop">
              <UserDropdown
                isWelcome={false}
                handleLogOutclick={handleLogOutclick}
                handleOpenLoginModal={handleOpenLoginModal}
              />
            </div>
          </div>
        </div>
      </section>
      {isOpenOrderTypeModal && (
        <OrderTypeSelect
          handleChangeAddress={handleChangeAddress}
          handleToggleAddAddressModal={handleToggleAddAddressModal}
          handleToggleOrderTypeModal={handleToggleOrderTypeModal}
          isOpenModal={isOpenOrderTypeModal}
          handleToggleTimingModal={handleToggleTimingModal}
        />
      )}

      {/* {isOpenOrderTypeModal && <OrderTypeSelect handleChangeAddress={handleChangeAddress} handleToggleAddAddressModal={handleToggleAddAddressModal} handleToggleOrderTypeModal={handleToggleOrderTypeModal} isOpenModal={isOpenOrderTypeModal} handleToggleTimingModal={handleToggleTimingModal} />}
            {openAdressModal && <AddAddress isRegister={modalState.openRegisterModal} handleToggleTimingModal={handleToggleTimingModal} isOpenModal={openAdressModal} handleToggleAddAddressModal={handleToggleAddAddressModal} />}
            {(!enabletimeslot && opentimingModal && !isSchoolProgramEnabled) && <PickupDeliveryTimeSelectPopup handleToggleTimingModal={handleToggleTimingModal} isOpenModal={opentimingModal} locationId={restaurantinfo?.defaultlocationId} />}
            {(enabletimeslot && opentimingModal) && <TimeSlotPopupComponent handleToggleTimingModal={handleToggleTimingModal} futureDateList={restaurantinfo?.defaultLocation?.futureOrderingDayDates} enablefutureordering={restaurantinfo?.defaultLocation?.enablefutureordering} isOpenModal={true} locationId={restaurantinfo?.defaultlocationId} />}
            {openLoginModal && <Login handleToggle={handleToggle} handleToggleAccountConfirm={handleToggleAccountConfirm} isOpenModal={openLoginModal} handleOpenLoginModal={handleOpenLoginModal} />}
            {openAccountConfirmModal && <AccountConfirmation handleToggleAddAddressModal={handleToggleAddAddressModal} handleToggle={handleToggle} isAddressModalOnBcChemical={modalState.isAddressModalOnBcChemical} isOpenModal={openAccountConfirmModal} handleToggleAccountConfirm={handleToggleAccountConfirm} />}
            {modalState.openSendEmailConfirm && <SendEmailAccountConfirm handleToggleAccountConfirm={handleToggleAccountConfirm} handleToggle={handleToggle} keyName="openSendEmailConfirm" isOpenModal={modalState.openSendEmailConfirm} />}
            {(modalState.openRewardModal && restaurantinfo?.defaultLocation?.enableRewardPoint) &&
                <CommonModal title={`Welcome ${userinfo?.firstname} !`}
                    // text={"Thank you for registering! To continue with your order, please verify your email. We've emailed the link to you. Simply click on it to get started."}
                    btn1Name='Close'
                    keyName='openRewardModal'
                    isbtn2={false}
                    // btn2Name='Cancel'
                    handleClickBtn1={() => handleToggle(false, 'openRewardModal')}
                    // handleClickBtn2={()=>handleToggle(f)}
                    handleToggle={handleToggle}
                    isOpenModal={modalState.openRewardModal} >
                    <h6 className='mt-2'>You have <span className='color-dynamic fs-5'>{userinfo.totalRewardPoints}</span> reward points, worth <span className='color-dynamic fs-5'>{currencySymbol}{rewardAmount}</span>.</h6>
                    <h6>You can use these points at checkout to save</h6>
                </CommonModal>
 
            }
            {modalState.openRegisterModal && <Register handleOpenLoginModal={handleOpenLoginModal} handleToggleAccountConfirm={handleToggleAccountConfirm} isOpenModal={true} handleToggle={handleToggle} openAdressModal={openAdressModal} handleToggleAddAddressModal={handleToggleAddAddressModal} />}
 
            {
                modalState.openUserExistModal && <UserExist isOpenModal={modalState.openUserExistModal} handleToggle={handleToggle} handleClickBtn1={handleClickUserExist} />
            }
 
            {
                modalState.openVerifyPhone && <VerifyPhoneComponent isOpenModal={modalState.openVerifyPhone} handleToggle={handleToggle} />
            }
            {
                modalState.openForgotPassModal && <ForgotPasswordComponent handleOpenLoginModal={handleOpenLoginModal} isOpenModal={modalState.openForgotPassModal} keyName="openForgotPassModal" handleToggle={handleToggle} />
            } */}
    </>
  );
};

export default Header;
