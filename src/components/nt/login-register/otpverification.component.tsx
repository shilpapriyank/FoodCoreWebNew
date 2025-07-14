import React, { useEffect, useState } from "react";
import handleNotify from "../../default/helpers/toaster/toaster-notify";
import { ToasterPositions } from "../../default/helpers/toaster/toaster-positions";
import { ToasterTypes } from "../../default/helpers/toaster/toaster-types";
import { useDispatch } from "react-redux";
import {
  GetThemeDetails,
  closeModal,
  unFormatePhoneNumber,
} from "../../common/utility";
import { SMS_API_TYPE } from "../../common/utility";
import { useParams } from "next/navigation";
//import { LoginTypes } from "../../../../redux/login/login.types";
import { LoginServices } from "../../../../redux/login/login.services";
import { DeliveryAddressTypes } from "../../../../redux/delivery-address/delivery-address.type";
import { setintialrewardpoints } from "../../../../redux/rewardpoint/rewardpoint.slice";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { selecteddeliveryaddress } from "../../../../redux/selected-delivery-data/selecteddelivery.slice";
import { CustomerServices } from "../../../../redux/customer/customer.services";
import { RegisterServices } from "../../../../redux/register/register.services";
import { DeliveryAddressServices } from "../../../../redux/delivery-address/delivery-address.services";
import OtpInput from "./otp-input.component";
import { convertSecondToMinute } from "../common/utility";
import { setUserDetail } from "../../../../redux/login/login.slice";

interface Props {
  closeModal?: () => void;
  handleToggleAccountConfirm: (val: boolean) => void;
  isOpenModal: boolean;
  setisOtpModal: (val: boolean) => void;
  modalType: string;
  handleToggle: (val: boolean, modalType: string) => void;
  userModel: any;
  handleValidateOTPHook: (code: string) => Promise<any>;
  handleSendOtpHook: (code: string, phone: string) => Promise<any>;
  mysecond: number;
  otpMinute: number;
  isOtpSecond: boolean;
  confirmationResult?: any;
  handlclickErrorbtn?: (error: any) => void;
  dialCode: string;
  OTPDetail?: any;
  isotpVerification: boolean;
  isUserRegister?: boolean;
  displayCloseButton?: boolean;
}

interface OtpValues {
  phone: string;
  isVerifiedPhone: string;
}
// confirmationResult={window.confirmationResult}
// isotpVerification={isotpVerification}
// modalType={modelType}
const OtpVerificationComponent: React.FC<Props> = ({
  handleToggleAccountConfirm,
  isOpenModal,
  setisOtpModal,
  handleToggle,
  userModel,
  handleValidateOTPHook,
  handleSendOtpHook,
  mysecond,
  otpMinute,
  isOtpSecond,
  confirmationResult,
  handlclickErrorbtn,
  dialCode,
  OTPDetail,
  isotpVerification,
  isUserRegister = true,
}) => {
  const { restaurantinfo, deliveryaddress, userinfo } = useReduxData();
  const [userExistError, setuserExistError] = useState<string>("");
  const [values, setValues] = useState<OtpValues>({
    phone: "",
    isVerifiedPhone: "false",
  });
  let registerAddressdata = deliveryaddress.registeraddress;
  const [isShowReSend, setIsShowReSend] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isNotValidateOtp, setisNotValidateOtp] = useState<boolean>(true);
  const dispatch = useDispatch();
  const [resendDisable, setresendDisable] = useState(true);
  const params = useParams();
  let otpTime = convertSecondToMinute(
    parseInt(process.env.NEXT_PUBLIC_OTP_DURATION || "60")
  );
  const dynamic = params.dynamic;
  const location = params.location; 
  const [minutes, setMinutes] = useState<number>(otpTime.minute);
  const [seconds, setSeconds] = useState<number>(otpTime.second);
  const [otp, setOtp] = useState<any>("");
  const selctedTheme = GetThemeDetails(restaurantinfo!.themetype);
  const unPhormatedPhone = unFormatePhoneNumber(userModel.phone);
  userModel.phone = unFormatePhoneNumber(userModel.phone);
  let addressmodel = null;
  const registerAddress =
    Object.keys(deliveryaddress.registeraddress || {}).length > 0
      ? deliveryaddress.registeraddress
      : deliveryaddress.tempDeliveryAddress;

  if (
    registerAddress?.address1 !== "" &&
    registerAddress?.address1 !== undefined
  ) {
    addressmodel = {
      address1: registerAddress.address1,
      address2: registerAddress.address2,
      landmark: registerAddress.landmark,
      city: registerAddress.city,
      state: registerAddress.state,
      country: registerAddress.country,
      zipcode: registerAddress.zipcode,
      addresstype: registerAddress.addresstype,
      businessname: registerAddress.businessname,
    };
  }

  var apiKey = restaurantinfo?.firebaseConfig?.apikey;
  var authDomain = restaurantinfo?.firebaseConfig?.authdomain;

  useEffect(() => {
    setTimeout(() => {
      document.getElementById("0")?.focus();
    }, 1000);
    if (seconds === 0) {
      setSeconds(mysecond);
      setMinutes(otpMinute);
      setresendDisable(true);
    }
  }, [OTPDetail, mysecond, isOtpSecond, otpMinute]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    if (seconds === 0 && minutes === 0) {
      setresendDisable(false);
    }
    return () => {
      clearInterval(interval);
    };
  }, [OTPDetail, seconds, minutes]);

  const handleClickValidateOTP = (isVerifiedPhone: boolean) => {
    const phone = unFormatePhoneNumber(userModel.phone);
    const updateObj = {
      restaurantId: restaurantinfo?.restaurantId,
      customerId: userinfo?.customerId,
      phoneNumber: phone,
      countryCode: dialCode,
    };
    if (!userinfo?.customerId) return;
    const newDetails = {
      ...userinfo,
      phone,
      isVerifiedPhone,
      customerId: userinfo.customerId,
    };

    if (
      restaurantinfo?.smsapigateway === SMS_API_TYPE.FIREBASE.value &&
      restaurantinfo.enableotpauthentication === true
    ) {
      CustomerServices.updateVerifiedPhoneNumber(updateObj as any).then(
        (res: any) => {
          if (res !== undefined) {
            // dispatch({
            //   type: LoginTypes.USER_DETAIL,
            //   payload: newDetails,
            // });
            dispatch(setUserDetail(newDetails));
            handleNotify(
              "Successfully verified",
              ToasterPositions.TopRight,
              ToasterTypes.Success
            );
            handleToggle?.(false, "openRegisterModal");
            handleToggle?.(false, "openVerifyPhone");
          }
        }
      );
    }
    if (
      restaurantinfo?.smsapigateway === SMS_API_TYPE.TWILIO.value &&
      restaurantinfo?.enableotpauthentication === true
    ) {
      RegisterServices.twilioVerifyCode({
        restaurantId: restaurantinfo?.restaurantId,
        enableotpauthentication: restaurantinfo?.enableotpauthentication,
        smsapigateway: restaurantinfo?.smsapigateway,
        code: otp,
        mobilenumber: dialCode.toString() + phone,
      }).then((response: any) => {
        if (response && response != null) {
          if (response.Valid && response.Valid === true) {
            CustomerServices.updateVerifiedPhoneNumber(updateObj as any).then(
              (res: any) => {
                if (res !== undefined) {
                  // dispatch({
                  //   type: LoginTypes.USER_DETAIL,
                  //   payload: newDetails,
                  // });
                  dispatch(setUserDetail(newDetails));
                  handleNotify(
                    "Successfully verified",
                    ToasterPositions.TopRight,
                    ToasterTypes.Success
                  );
                  //TODO:
                  handleToggle(false, "openVerifyPhone");
                  handleToggle(false, "openRegisterModal");
                }
              }
            );
          } else {
            handleNotify(
              "otp does not match",
              ToasterPositions.TopRight,
              ToasterTypes.Error
            );
          }
        }
      });
    }
  };

  const registerUser = () => {
    var restaurantUrl = selctedTheme?.url + "/" + dynamic + "/" + location;
    var requesturl =
      window.location.origin + "/" + restaurantUrl + "/confirmation?code=";
    RegisterServices.registerUserWithAddress(
      userModel,
      addressmodel,
      restaurantinfo?.defaultlocationId,
      restaurantinfo?.restaurantId,
      requesturl
    ).then((response: any) => {
      if (response && response != null) {
        if (response.message !== null && response.status == 2) {
          handleNotify(
            response.message,
            ToasterPositions.TopRight,
            ToasterTypes.Warning
          );
          if (response?.message?.toLowerCase() === "user already exist") {
            setuserExistError(response.message);
            handleToggle(false, "openRegisterModal");
            handleToggle?.(true, "openUserExistModal");
          } else {
          }
          return setErrorMessage(response.message);
        } else if (response.message === null && response.status == 2) {
          handleNotify(
            "User not created Something went wrong",
            ToasterPositions.TopRight,
            ToasterTypes.Warning
          );
          return setErrorMessage("User not created Something went wrong");
        } else if (response.status == 1) {
          handleNotify(
            `Welcome ${userModel.firstname} `,
            ToasterPositions.TopRight,
            ToasterTypes.Success
          );
          setErrorMessage("User created successfully");
          LoginServices.getLoginUserDetails({
            username: unPhormatedPhone,
            password: userModel.password,
            restaurantId: restaurantinfo?.restaurantId as number,
            dialCode: dialCode,
            locationid: restaurantinfo?.defaultLocation.locationId as number,
          }).then((responsedata) => {
            if (
              responsedata !== null &&
              responsedata.customerDetails !== null &&
              responsedata.customerDetails !== undefined
            ) {
              // dispatch({
              //   type: LoginTypes.USER_DETAIL,
              //   payload: responsedata.customerDetails,
              // });
              dispatch(setUserDetail(responsedata.customerDetails));

              if (addressmodel && Object.keys(addressmodel).length > 0) {
                const { customerId } = responsedata?.customerDetails;
                if (customerId > 0) {
                  DeliveryAddressServices.getDeliveryAddress(
                    customerId,
                    restaurantinfo?.restaurantId as number,
                    restaurantinfo?.defaultLocation.locationId as number
                  ).then((response: any) => {
                    if (response) {
                      if (response.AddressLists) {
                        dispatch({
                          type: DeliveryAddressTypes.GET_ADDRESS,
                          payload: response.AddressLists,
                        });
                        dispatch(
                          selecteddeliveryaddress(response.AddressLists[0])
                        );
                      }
                    }
                  });
                }
              }
              if (!responsedata.customerDetails.isVerified) {
                handleToggle(false, "openRegisterModal");
                handleToggleAccountConfirm(true);
              } else {
                handleToggle(false, "openRegisterModal");
              }
              if (responsedata.customerDetails) {
                dispatch(setintialrewardpoints(responsedata.customerDetails));
              }
            }
          });
        }
      }
    });
  };

  const handleSendOTP = () => {
    let unformatedphone = userModel.phone
      .replace("(", "")
      .replace(")", "")
      .replace("-", "")
      .replace(" ", "");
    if (
      restaurantinfo?.smsapigateway === SMS_API_TYPE.FIREBASE.value &&
      restaurantinfo?.enableotpauthentication === true
    ) {
      handleSendOtpHook(dialCode.toString(), unformatedphone)
        .then((res) => {
          document.getElementById("0")?.focus();
          setMinutes(otpTime.minute);
          setSeconds(otpTime.second);
          setresendDisable(true);
          handleNotify(
            "Code sent successfully",
            ToasterPositions.TopRight,
            ToasterTypes.Success
          );
        })
        .catch((err) => { });
    }
    if (
      restaurantinfo?.smsapigateway === SMS_API_TYPE.TWILIO.value &&
      restaurantinfo?.enableotpauthentication === true
    ) {
      RegisterServices.twilioSendCode({
        restaurantId: restaurantinfo?.restaurantId,
        enableotpauthentication: restaurantinfo.enableotpauthentication,
        smsapigateway: restaurantinfo.smsapigateway,
        mobilenumber: dialCode.toString() + values.phone,
      }).then((response: any) => {
        if (response && response != null) {
          setIsShowReSend(true);
          handleNotify(
            "Code sent successfully",
            ToasterPositions.TopRight,
            ToasterTypes.Success
          );
        }
      });
    }
    setOtp("");
  };

  const handleValidateOTP = (OTP: string) => {
    var code = parseInt(OTP);
    if (
      restaurantinfo?.smsapigateway === SMS_API_TYPE.FIREBASE.value &&
      restaurantinfo?.enableotpauthentication === true
    ) {
      handleValidateOTPHook(code as any)
        .then((res: any) => {
          setisNotValidateOtp(false);
          userModel.isVerifiedPhone = "true";
          if (isUserRegister) {
            handleNotify(
              "Successfully verified",
              ToasterPositions.TopRight,
              ToasterTypes.Success
            );
            registerUser();
          } else {
            handleClickValidateOTP(true);
          }
        })
        .catch((err) => { });
    }
    if (
      restaurantinfo?.smsapigateway === SMS_API_TYPE.TWILIO.value &&
      restaurantinfo.enableotpauthentication === true
    ) {
      RegisterServices.twilioVerifyCode({
        restaurantId: restaurantinfo?.restaurantId,
        enableotpauthentication: restaurantinfo?.enableotpauthentication,
        smsapigateway: restaurantinfo.smsapigateway,
        code: code,
        mobilenumber: dialCode.toString() + values.phone,
      }).then((response: any) => {
        if (response && response != null) {
          setIsShowReSend(true);
          if (response.Valid && response.Valid === true) {
            setValues({
              ...values,
              ["isVerifiedPhone"]: "true",
            });
            values.isVerifiedPhone = "true";
            handleNotify(
              "Successfully verified",
              ToasterPositions.TopRight,
              ToasterTypes.Success
            );
          } else {
            setValues({
              ...values,
              ["isVerifiedPhone"]: "false",
            });
            values.isVerifiedPhone = "false";
            handleNotify(
              "otp does not match",
              ToasterPositions.TopRight,
              ToasterTypes.Error
            );
          }
        }
      });
    }
  };

  const onChange = (value: string) => {
    setErrorMessage(null);
    setOtp(value.trim());
    if (value.trim().length === 6) {
      handleValidateOTP(value.trim());
    }
  };

  const handleClose = () => {
    setOtp("");
    setSeconds(0);
  };

  return (
    <>
      <div
        className={`modal modal-your-order loginmodal fade ${isOpenModal ? "show d-block" : ""
          }`}
        id="otp-modal"
        tabIndex={-1}
        aria-labelledby="otp-modall-Label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <h5 className="modal-title" id="login-modal-Label">
              Verification required
            </h5>
            {isNotValidateOtp === true ? (
              <button
                type="button"
                onClick={handleClose}
                className="btn-close"
                aria-label="Close"
              />
            ) : (
              <button
                type="button"
                onClick={() => handleToggle(false, userModel)}
                aria-label="Close"
              />
            )}
            <div className="modal-body">
              <p>
                {`Please enter 6 digit verification code sent ${dialCode}${unPhormatedPhone}`}{" "}
              </p>
              <div className="row d-flex justify-content-center">
                <OtpInput value={otp} valueLength={6} onChange={onChange} />
              </div>
              <div>
                <h3 className="text-center color-gray">
                  {`${minutes < 10 ? `0${minutes}` : minutes}`}:
                  {`${seconds < 10 ? `0${seconds}` : seconds}`}
                </h3>
              </div>
              {restaurantinfo?.smsapigateway === SMS_API_TYPE.FIREBASE.value &&
                restaurantinfo?.enableotpauthentication === true && (
                  <div className="col-lg-12 col-sm-12 col-xs-12 d-flex justify-content-center mt-2">
                    <div
                      style={{
                        width: "32% !important",
                        border: "none !important",
                      }}
                      id="recaptcha-id"
                      data-container="recaptcha-container"
                    ></div>
                  </div>
                )}
            </div>
            <div className="modal-footer">
              <div className="row w-100 ms-auto me-auto">
                <div className="col-lg-6 text-center col-md-6 col-12">
                  {resendDisable ? (
                    <a
                      className="btn-default w-100 button-disable pe-none opacity-50 "
                      aria-disabled="true"
                    >
                      Resend
                    </a>
                  ) : (
                    <a className="btn-default w-100" onClick={handleSendOTP}>
                      Resend
                    </a>
                  )}
                </div>
                <div className="col-lg-6 text-center col-md-6 col-12">
                  {otp && otp?.length === 6 ? (
                    <a
                      className="btn-default w-100"
                      onClick={() => handleValidateOTP(otp)}
                    >
                      Submit
                    </a>
                  ) : (
                    <a
                      className="btn-default button-disable w-100 pe-none opacity-50 "
                      aria-disabled="true"
                    >
                      Submit
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpVerificationComponent;
