import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  allRegex,
  countryData,
  CUSTOMER_TYPE,
  formatePhoneNumber,
  getCountryList,
  onLoadSetDefaultFlag,
  setUserExpiryTime,
  unFormatePhoneNumber,
} from "../../common/utility";
import { LoginServices } from "../../../../redux/login/login.services";
import { setintialrewardpoints } from "../../../../redux/rewardpoint/rewardpoint.slice";
import { DeliveryAddressServices } from "../../../../redux/delivery-address/delivery-address.services";
import { selecteddeliveryaddress } from "../../../../redux/selected-delivery-data/selecteddelivery.slice";
import { DeliveryAddressTypes } from "../../../../redux/delivery-address/delivery-address.type";
import useUtility from "../../customhooks/utility-hook";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { ButtonLoader } from "@/components/common/buttonloader.component";
import { AddTempDeliveryAddress } from "../../../../redux/delivery-address/delivery-address.slice";
import { setUserDetail } from "../../../../redux/login/login.slice";
import { useAppDispatch } from "../../../../redux/hooks";
import { BUTTON_TYPE_ENUM } from "@/components/common/enums";

interface LoginProps {
  isOpenModal: boolean;
  handleToggle?: (value: boolean, keyName?: string) => void;
  handleOpenLoginModal: (open: boolean) => void;
  handleToggleAccountConfirm: (value: boolean) => void;
}
const Login: React.FC<LoginProps> = ({
  isOpenModal,
  handleToggle,
  handleOpenLoginModal,
  handleToggleAccountConfirm,
}) => {
  const dispatch = useAppDispatch();
  const { restaurantinfo, deliveryaddress, userinfo } = useReduxData();
  const restaurantinformation = restaurantinfo;
  let tempDeliveryAddress = deliveryaddress?.tempDeliveryAddress;
  const [userName, setuserName] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [errorusername, setErrorUsername] = useState<string>("");
  const [errorpassword, setErrorPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [isDisable, setisDisable] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isForgotpassword, setisForgotpassword] = useState<boolean>(true);
  const [isSignIn, setisSignIn] = useState<boolean>(true);
  const [loadRewardPoint, setLoadRewardPoint] = useState<boolean>(false);
  const [phoneVerify, setphoneVerify] = useState<boolean>(false);
  const [isRegiStaration, setisRegiStaration] = useState<boolean>(false);
  const [isLoadFlage, setisLoadFlage] = useState<boolean>(false);
  const locationCountry =
    restaurantinfo?.defaultLocation?.countryName?.toLowerCase();
  const locationCountryData =
    countryData[locationCountry as keyof typeof countryData];
  const [dialCode, setDialCode] = useState<string>("+1");
  const restaurantId = restaurantinfo?.restaurantId;
  const { isBusinessNameRequired } = useUtility();
  const b2b = restaurantinfo?.defaultLocation?.b2btype;
  const locationId = restaurantinfo?.defaultLocation?.locationId;

  useEffect(() => {
    setuserName("");
    setpassword("");
    setisDisable(false);
  }, [userinfo]);
  let defaultflag = document.querySelector(".iti-flag");
  let countryList = document.querySelector(".country-list");
  useEffect(() => {
    setTimeout(() => {
      const defaultflag = document.querySelector(".iti-flag");
      if (dialCode === locationCountryData.countryCode) {
        onLoadSetDefaultFlag(defaultflag, countryList, locationCountryData);
      }
    }, 300);
  }, [defaultflag, countryList, isSignIn]);

  const validateForm = (event: React.FormEvent): boolean => {
    event.preventDefault();
    let iserror = false;
    if (!userName) {
      setErrorUsername("Username must be required");
      iserror = true;
    }
    if (!password) {
      setErrorPassword("Password must be required");
      iserror = true;
    }
    if (iserror) {
      setSubmitting(true);
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const restaurantId = restaurantinformation?.restaurantId;

    if (validateForm(e)) {
      const formatedusername = unFormatePhoneNumber(userName);
      let usernames = userName
        .replace(/(\(\d{3}\))(\s\d{3})(\-\d{4})/, formatedusername)
        .slice(0, 10);
      usernames = usernames.slice(0, 10);
      setisDisable(true);

      LoginServices.getLoginUserDetails({
        username: usernames,
        password: password,
        restaurantId: restaurantinfo?.restaurantId as number,
        dialCode: dialCode,
        locationid: locationId as number,
      }).then((responsedata) => {
        if (
          responsedata &&
          responsedata !== null &&
          responsedata?.customerDetails !== null &&
          responsedata?.customerDetails !== undefined
        ) {
          const customer = responsedata?.customerDetails;
          if (responsedata && customer) {
            dispatch(setUserDetail(customer));
            setUserExpiryTime();

            if (
              restaurantinformation?.enableotpauthentication &&
              restaurantinfo?.deliveryServicePartnerEnable &&
              !customer.isVerifiedPhone
            ) {
              setphoneVerify(true);
              handleOpenLoginModal(false);
              handleToggle?.(true, "openVerifyPhone");
            } else {
              if (!responsedata.customerDetails.isVerified) {
                handleOpenLoginModal(false);
                handleToggleAccountConfirm(true);
              } else {
                if (
                  restaurantinformation?.defaultLocation?.enableRewardPoint &&
                  responsedata?.customerDetails?.customertype !==
                    CUSTOMER_TYPE.SUBSCRIBE
                ) {
                  setLoadRewardPoint(true);
                  setTimeout(() => {
                    handleToggle?.(true, "openRewardModal");
                  }, 500);
                }
              }
            }
            dispatch(setintialrewardpoints(customer));
            dispatch(setintialrewardpoints(responsedata.customerDetails));

            if (tempDeliveryAddress !== null && restaurantinformation) {
              tempDeliveryAddress.customerId = customer.customerId;

              DeliveryAddressServices.addDeliveryAddress(
                tempDeliveryAddress,
                restaurantinformation.restaurantId,
                restaurantinformation.defaultlocationId
              ).then((res) => {
                if (res) {
                  tempDeliveryAddress.deliveryaddressId =
                    res?.customerAddressId;
                  dispatch(selecteddeliveryaddress(tempDeliveryAddress as any));

                  dispatch({
                    type: DeliveryAddressTypes.UPDATE_ADDRESS_ID,
                    payload: {
                      customerAddressId: tempDeliveryAddress.deliveryaddressId,
                    },
                  });
                }

                dispatch(AddTempDeliveryAddress(null));
              });
            }
            if (responsedata.customerDetails.isVerified) {
              handleOpenLoginModal(false);
            }
          }
        } else {
          setSubmitting(false);
          setisDisable(false);
          setErrorMessage(responsedata.message);
        }
      });
    }
  };

  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    let regex1 = allRegex.phoneRegex1;
    let regex2 = allRegex.validwithFormatephoneRegex;
    let regex3 = allRegex.phoneRegex3;
    let validdigit = allRegex.validdigit;
    let phoneno = unFormatePhoneNumber(e.target.value);
    if (phoneno.length > 10) return;
    if (phoneno === "") setuserName(e.target.value);
    if (
      (regex1.test(phoneno) || regex2.test(phoneno) || regex3.test(phoneno)) &&
      validdigit.test(phoneno)
    ) {
      setSubmitting(false);
      setuserName(e.target.value);
      if (userName.length === 9) {
        setuserName(formatePhoneNumber(e.target.value));
      }
      if (phoneno.length < 10) {
        setuserName(unFormatePhoneNumber(e.target.value));
      }
      setErrorUsername("");
      setErrorMessage("");
      return;
    } else {
      return false;
    }
  };
  const handlePaste = (e: any) => {
    let pastedValue = e.clipboardData.getData("text");
    if (Number(pastedValue)) {
      if (pastedValue.length === 10) {
        e.target.value = pastedValue;
        let valuephone = "";
        valuephone = e.target.value;
        let replacedvalue = formatePhoneNumber(valuephone);
        setuserName(replacedvalue);
      }
    } else {
      return;
    }
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubmitting(false);
    setpassword(e.target.value);
    setErrorPassword("");
    setErrorMessage("");
  };
  const handleClickRegister = () => {
    handleOpenLoginModal(false);
    handleToggle?.(true, "openRegisterModal");
  };

  const handleClickForgotPass = () => {
    handleOpenLoginModal(false);
    handleToggle?.(true, "openForgotPassModal");
  };

  const handleOnChange = (value: string, data: { dialCode: string }) => {
    setDialCode("+" + data.dialCode);
    // your error reset logic here...
  };

  return (
    <>
      <div
        className={`modal modal-your-order loginmodal fade 
            ${isOpenModal ? "show d-block" : ""}`}
        id="exampleModal-login"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <h5 className="modal-title fs-5" id="staticBackdropLabel">
              Login
            </h5>
            {!b2b && (
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => handleOpenLoginModal(false)}
              />
            )}
            <form>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-12 mb-4 text-center col-md-12 col-12">
                    <h2>SIGN IN TO YOUR PROFILE</h2>
                    {!(b2b && !isBusinessNameRequired) && (
                      <p className="fs-14">
                        Don&apos;t have one?{" "}
                        <a
                          className="color-green"
                          onClick={handleClickRegister}
                        >
                          CREATE ONE <i className="fa fa-arrow-right" />
                        </a>
                      </p>
                    )}
                  </div>
                  <div className="col-lg-12 col-md-12 col-12">
                    <div className="row">
                      {/* <div className="mb-2"> */}
                      <div className="col-4 col-md-3 col-lg-3">
                        <label>Code</label>
                        <br></br>
                        <PhoneInput
                          country={"us"}
                          value={dialCode || "+" + "1"}
                          onChange={(
                            value: string,
                            data: { dialCode: string }
                          ) => {
                            setDialCode("+" + data.dialCode);
                            setErrorMessage("");
                            setSubmitting(false);
                          }}
                          onlyCountries={getCountryList()}
                          preferredCountries={[]}
                          enableAreaCodes={false}
                          inputProps={{
                            name: "phone",
                            required: true,
                            autoFocus: false,
                            readOnly: true,
                            id: `x${Math.random()}`,
                            style: { caretColor: "transparent" },
                          }}
                          containerClass="intl-tel-input"
                          inputClass="codeinput form-control"
                          buttonClass="dialCode"
                          dropdownClass="country-list"
                          enableSearch
                          disableSearchIcon
                        />
                      </div>
                      <div className="col-lg-9 col-md-9 col-8 offset-0 offset-lg-0 offset-md-0">
                        <label>Phone</label>
                        <input
                          type="text"
                          placeholder="Enter phone number"
                          name="phone"
                          className="form-control"
                          value={userName}
                          onChange={(e) => handleChangeUserName(e)}
                          onPaste={handlePaste}
                          autoComplete="off"
                          required
                        />
                        {errorusername.length > 0 && (
                          <div className="error mt-2">{errorusername}</div>
                        )}
                      </div>
                      {/* </div> */}
                      <div className="col-lg-12 col-md-12 col-12 ">
                        <label>Password</label>
                        <div className="pass-input mb-2 position-relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control "
                            placeholder="Enter password"
                            name="password"
                            value={password}
                            onChange={(e) => handleChangePassword(e)}
                            required
                          />
                          <i
                            className={`fa ${
                              showPassword ? "fa-eye" : "fa-eye-slash"
                            } fa-lg eye-icon`}
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ cursor: "pointer" }}
                          />
                          {errorpassword.length > 0 && (
                            <div className="error mt-2">{errorpassword}</div>
                          )}
                          {errorMessage.length > 0 && (
                            <div className="error mt-2">{errorMessage}</div>
                          )}
                        </div>
                      </div>
                    </div>
                    {!b2b && (
                      <div className="text-start mt-1">
                        <a
                          className="address-nfound"
                          onClick={handleClickForgotPass}
                        >
                          {" "}
                          FORGOT PASSWORD?{" "}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="row w-100 ms-auto me-auto">
                  {!b2b && (
                    <div className="col-lg-6 text-center col-md-6 col-12">
                      <ButtonLoader
                        isLoader={false}
                        classname={`btn-default black w-100`}
                        // btnType={"button"}
                        btnType={BUTTON_TYPE_ENUM.BUTTON}
                        handleClick={() => handleOpenLoginModal(false)}
                        isDisable={isDisable || submitting}
                        textName="Cancel"
                      ></ButtonLoader>
                    </div>
                  )}
                  <div
                    className={`col-lg-${
                      !b2b ? "6" : "12"
                    } text-center col-md-${!b2b ? "6" : "12"} col-12`}
                  >
                    <ButtonLoader
                      isLoader={isDisable}
                      classname={`${
                        isDisable || submitting
                          ? `btn-default w-100 opacity-50 pe-none`
                          : `btn-default w-100`
                      }`}
                      //btnType="submit"
                      btnType={BUTTON_TYPE_ENUM.SUBMIT}
                      handleClick={handleSubmit}
                      isDisable={isDisable || submitting}
                      textName="Sign In For this Order"
                    >
                      <i className="fa me-1 fa-lock" />
                    </ButtonLoader>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default Login;
