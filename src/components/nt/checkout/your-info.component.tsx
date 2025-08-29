import React, { useState, useCallback } from "react";
import { ToasterPositions } from "../../default/helpers/toaster/toaster-positions";
import { ToasterTypes } from "../../default/helpers/toaster/toaster-types";
import { GetCurrency, GetThemeDetails } from "../../common/utility";
import handleNotify from "../../default/helpers/toaster/toaster-notify";
import Login from "../login-register/login.component";
import AccountConfirmation from "../login-register/accountconfirmation.component";
import Register from "../login-register/register.component";
import VerifyPhoneComponent from "../login-register/verifyphone.component";
import UserExist from "../login-register/user-exist.component";
import AddAddress from "../common/add-address.component";
import { useParams, useRouter } from "next/navigation";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import CommonModal from "../common/common-model.component";

const YourInfo = () => {
  const { restaurantinfo, selecteddelivery, order, userinfo } = useReduxData();
  const router = useRouter();
  const params = useParams();
  const { dynamic, location } = params;

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const selectedTheme = GetThemeDetails(restaurantinfo?.themetype as number);
  let locationFullLink =
    "/" +
    selectedTheme?.url +
    "/" +
    restaurantinfo?.restaurantURL +
    "/" +
    location;
  const [isOpenOrderTypeModal, setisOpenOrderTypeModal] = useState(false);
  const [openAdressModal, setopenAdressModal] = useState(false);
  const [opentimingModal, setopentimingModal] = useState(false);
  const [openAccountConfirmModal, setopenAccountConfirmModal] = useState(false);

  const rewardAmount =
    userinfo && (userinfo?.totalRewardPoints as number) > 0
      ? (userinfo?.totalRewardPoints as number) / userinfo?.rewardvalue
      : 0;
  const currencySymbol = GetCurrency();

  const [modalState, setModalState] = useState({
    openRegisterModal: false,
    openRewardModal: false,
    openOtpModal: false,
    openUserExistModal: false,
    openVerifyPhone: false,
  });
  const handleOpenLoginModal = (value: boolean) => {
    setOpenLoginModal(value);
  };

  const handleToggleTimingModal = (value: boolean) => {
    setopentimingModal(value);
  };

  const handleToggleAccountConfirm = (value: boolean) => {
    setopenAccountConfirmModal(value);
  };

  const handleToggle = (value: boolean, key?: any) => {
    setModalState((pre) => ({
      ...pre,
      [key]: value,
    }));
  };

  const handleClickRegister = () => {
    handleOpenLoginModal(false);
    handleToggle(true, "openRegisterModal");
  };
  const handleClose = useCallback(() => {
    // setisRegiStaration(false);
  }, []);

  const handleToggleAddAddressModal = (value: any) => {
    setopenAdressModal(value);
  };

  return (
    <>
      <div className="infobox">
        <h3 className="heading">YOUR INFORMATION</h3>
        <a className="btn-default" onClick={() => handleOpenLoginModal(true)}>
          Login
        </a>
        <span className="or mx-1">
          <i>or</i>
        </span>
        <a className="btn-default" onClick={() => handleClickRegister()}>
          Register Now
        </a>
      </div>

      {openLoginModal && (
        <Login
          handleToggle={handleToggle}
          handleToggleAccountConfirm={handleToggleAccountConfirm}
          isOpenModal={openLoginModal}
          handleOpenLoginModal={handleOpenLoginModal}
        />
      )}

      {/* {modalState.openRegisterModal && (
        <Register
          handleToggleAccountConfirm={handleToggleAccountConfirm}
          isOpenModal={true}
          handleToggle={handleToggle}
          openAdressModal={openAdressModal}
          handleToggleAddAddressModal={handleToggleAddAddressModal}
        />
      )} */}

      {openAccountConfirmModal && (
        <AccountConfirmation
          handleToggle={handleToggle}
          isOpenModal={openAccountConfirmModal}
          handleToggleAccountConfirm={handleToggleAccountConfirm}
        />
      )}
      {modalState.openUserExistModal && (
        <UserExist
          isOpenModal={modalState.openUserExistModal}
          handleToggle={handleToggle}
          handleClickBtn1={handleClickRegister}
        />
      )}
      {modalState.openVerifyPhone && (
        <VerifyPhoneComponent
          isOpenModal={modalState.openVerifyPhone}
          handleToggle={handleToggle}
        />
      )}
      {openAdressModal && (
        <AddAddress
          isRegister={modalState.openRegisterModal}
          handleToggleTimingModal={handleToggleTimingModal}
          isOpenModal={openAdressModal}
          handleToggleAddAddressModal={handleToggleAddAddressModal}
        />
      )}

      {modalState.openRewardModal && (
        <CommonModal
          title={`Welcome !`}
          // text={"Thank you for registering! To continue with your order, please verify your email. We've emailed the link to you. Simply click on it to get started."}
          btn1Name="Close"
          keyName="openRewardModal"
          isbtn2={false}
          // btn2Name='Cancel'
          handleClickBtn1={() => handleToggle(false, "openRewardModal")}
          // handleClickBtn2={()=>handleToggle(f)}
          handleToggle={handleToggle}
          isOpenModal={modalState.openRewardModal}
        >
          <h6 className="mt-2">
            You have{" "}
            <span className="color-dynamic fs-5">
              {userinfo?.totalRewardPoints}
            </span>{" "}
            reward points, worth{" "}
            <span className="color-dynamic fs-5">
              {currencySymbol}
              {rewardAmount}
            </span>
            .
          </h6>
          <h6>You can use these points at checkout to save</h6>
        </CommonModal>
      )}
      {/* <UserDropdown handleLogOutclick={handleLogOutclick} handleOpenLoginModal={handleOpenLoginModal} /> */}
    </>
  );
};
export default YourInfo;
