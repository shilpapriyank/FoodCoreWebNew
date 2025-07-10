import React, { useEffect, useState } from "react";
import {
  allRegex,
  countryData,
  formatePhoneNumber,
  getCountryList,
  onLoadSetDefaultFlag,
  unFormatePhoneNumber,
} from "../../common/utility";
import handleNotify from "../../default/helpers/toaster/toaster-notify";
import { ToasterPositions } from "../../default/helpers/toaster/toaster-positions";
import { ToasterTypes } from "../../default/helpers/toaster/toaster-types";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { RegisterServices } from "../../../../redux/register/register.services";
import CommonModal from "../common/common-model.component";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Use this, NOT intl-tel-input
import useFireBaseAuth from "@/components/customhooks/usefirebaseauth-hook";
import OtpVerificationComponent from "./otpverification.component";
import { convertSecondToMinute } from "../common/utility";

interface VerifyPhoneComponentProps {
  isOpenModal: boolean;
  handleToggle: (value: boolean, keyName?: string) => void;
}
type CountryKey = keyof typeof countryData;

const VerifyPhoneComponent: React.FC<VerifyPhoneComponentProps> = ({
  isOpenModal,
  handleToggle,
}) => {
  const { restaurantinfo, userinfo } = useReduxData();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [OTPDetail, setOTPDetail] = useState<any>();
  const [buttonDisable, setButtonDisable] = useState<boolean>(true);
  const [isotpVerification, setisotpVerification] = useState<boolean>(false);
  const [second, setsecond] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [isOtpSecond, setisOtpSecond] = useState<boolean>(false);
  const {
    firebase,
    intializeRecaptchaVerified,
    intializeFirebaseApp,
    handleSendOTP: handleSendOtpHook,
    handleValidateOTP: handleValidateOTPHook,
  } = useFireBaseAuth();
  const [loadFlag, setloadFlag] = useState(false);
  const locationCountry = restaurantinfo?.defaultLocation?.countryName;
  const locationCountryKey = locationCountry?.toLowerCase() as CountryKey;
  const locationCountryData = countryData[locationCountryKey];
  const [isOtpModal, setisOtpModal] = useState<boolean>(false);
  const [dialCode, setDialCode] = useState<string>(
    locationCountryData.countryCode
  );
  const [values, setValues] = useState<{ phone: string }>({
    phone: "",
  });

  var apiKey = restaurantinfo?.firebaseConfig?.apikey;
  var authDomain = restaurantinfo?.firebaseConfig?.authdomain;
  let otpTime = convertSecondToMinute(
    process.env.NEXT_PUBLIC_OTP_DURATION as any
  );

  useEffect(() => {
    if (
      restaurantinfo?.smsapigateway === 1 &&
      restaurantinfo?.enableotpauthentication === true
    ) {
      RegisterServices.getOTPVerificationSetting({
        restaurantId: restaurantinfo?.restaurantId,
        enableotpauthentication: restaurantinfo.enableotpauthentication,
        smsapigateway: restaurantinfo.smsapigateway,
      }).then((response) => {
        if (response && response != null) {
          setOTPDetail(response);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (
      OTPDetail &&
      OTPDetail !== undefined &&
      OTPDetail !== null &&
      restaurantinfo?.enableotpauthentication === true &&
      apiKey !== "" &&
      apiKey !== undefined &&
      authDomain !== "" &&
      authDomain !== undefined
    ) {
      intializeFirebaseApp();
      intializeRecaptchaVerified();
    }
  }, [OTPDetail]);

  let defaultflag =
    document.querySelector(".verify-country")?.previousElementSibling
      ?.firstElementChild?.firstElementChild;
  let countryList =
    document.querySelector(".verify-country")?.previousElementSibling
      ?.children[1];
  useEffect(() => {
    onLoadSetDefaultFlag(defaultflag, countryList, locationCountryData);
    setloadFlag(true);
  }, [defaultflag, countryList]);

  const handleChangePhone = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    let internalError = { phone: errors.phone };

    if (name === "phone") {
      internalError.phone = "";
      let regex1 = allRegex.phoneRegex1;
      let regex2 = allRegex.validwithFormatephoneRegex;
      let regex3 = allRegex.phoneRegex3;
      let validdigit = allRegex.validdigit;
      let phoneno = unFormatePhoneNumber(value);
      if (phoneno.length > 10) return;
      if (phoneno === "")
        setValues({
          ...values,
          [name]: value,
        });

      if (
        (regex1.test(phoneno) ||
          regex2.test(phoneno) ||
          regex3.test(phoneno)) &&
        validdigit.test(phoneno)
      ) {
        setValues({
          ...values,
          [name]: value,
        });
        if (phoneno.length === 10) {
          setValues({
            ...values,
            [name]: formatePhoneNumber(value),
          });
          setButtonDisable(false);
        }
        if (phoneno.length < 10) {
          setValues({
            ...values,
            [name]: unFormatePhoneNumber(value),
          });
          setButtonDisable(true);
        }
        return;
      }
    }
  };
  const handlclickErrorbtn = (error: any) => {
    // setuserExistError(error)
  };
  const handleSendOTP = () => {
    if (
      restaurantinfo?.smsapigateway === 1 &&
      restaurantinfo?.enableotpauthentication === true
    ) {
      let phonenumber = unFormatePhoneNumber(values.phone);
      handleSendOtpHook(dialCode.toString(), phonenumber)
        .then((res: any) => {
          setisotpVerification(true);
          setsecond(otpTime.second);
          setMinutes(otpTime.minute);
          setisOtpSecond(!isOtpSecond);
          handleNotify(
            "Code sent successfully",
            ToasterPositions.TopRight,
            ToasterTypes.Success
          );
        })
        .catch((err: any) => {});
    }
    if (
      restaurantinfo?.smsapigateway === 2 &&
      restaurantinfo?.enableotpauthentication === true
    ) {
      RegisterServices.twilioSendCode({
        restaurantId: restaurantinfo?.restaurantId,
        enableotpauthentication: restaurantinfo.enableotpauthentication,
        smsapigateway: restaurantinfo.smsapigateway,
        mobilenumber: dialCode.toString() + values.phone,
      }).then((response) => {
        if (response && response != null) {
          setsecond(otpTime.second);
          setMinutes(otpTime.minute);
          // setIsShowReSend(true);
          handleNotify(
            "Code sent successfully",
            ToasterPositions.TopRight,
            ToasterTypes.Success
          );
        }
      });
    }
  };
  return (
    <>
      {!isotpVerification && (
        <CommonModal
          title="Verify Phone"
          btn1Name=""
          isbtn2={false}
          isOpenModal={isOpenModal}
          isDisplayCloseIcon={false}
        >
          <p>
            {" "}
            Your Phone number is not verified{" "}
            <a className="cursor"> {userinfo?.phone} </a>
            <br /> Please update your phone number.
          </p>

          <div className="row">
            <div className="col-lg-12 col-md-12 col-12">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-3 text-start">
                  <label className="text-start">Code</label>
                  {/* <IntlTelInput
                                    css={['intl-tel-input', 'form-control']}
                                    utilsScript={'libphonenumber.js'}
                                    fieldId="tel-p"
                                    value={dialCode === "" ? "+1" : dialCode}
                                    preferredCountries={[]}
                                    onlyCountries={getCountryList()}
                                    onSelectFlag={(num: number, country: any) => {
                                        setDialCode("+" + country.dialCode)
                                    }}
                                    placeholder=""
                                    className="dialCode"
                                    inputClassName="codeinput form-control verify-country"
                                    format={false}
                                    autoFocus={false}
                                    readonly={true}
                                    cursorPosition={false}
                                    style={{ caretColor: "transparent" }}
                                /> */}
                  <PhoneInput
                    country={"us"} // default country
                    value={dialCode}
                    onChange={(phone: string, country: any) => {
                      setDialCode("+" + country.dialCode);
                    }}
                    inputProps={{
                      name: "phone",
                      required: true,
                      autoFocus: false,
                      readOnly: true,
                    }}
                    containerClass="intl-tel-input form-control"
                    inputClass="codeinput form-control verify-country"
                    enableSearch
                  />
                </div>
                <div className="col-lg-9 col-md-9 col-7 offset-2 offset-md-0 offset-lg-0 text-start">
                  <label className="text-start"> Phone</label>

                  <input
                    type="text"
                    placeholder="Enter phone number"
                    name="phone"
                    required
                    className="form-control"
                    value={values.phone}
                    onChange={(e) => handleChangePhone(e)}
                    // noValidate autoComplete="off"
                  />
                </div>
                <div className="col-12 col-md-12 col-lg-12 d-flex justify-content-center mt-3">
                  {buttonDisable ? (
                    <button className=" not-uppercase btn-default btn-orange w-46 greyColor">
                      {" "}
                      Send OTP{" "}
                    </button>
                  ) : (
                    <button
                      className=" not-uppercase btn-default btn-orange w-46"
                      type="button"
                      onClick={handleSendOTP}
                    >
                      {" "}
                      Send OTP{" "}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CommonModal>
      )}
      {isotpVerification && (
        <>
          {/* <OtpVerificationComponent
                        key="openVerifyPhone"
                        handleValidateOTPHook={handleValidateOTPHook}
                        handleSendOtpHook={handleSendOtpHook}
                        isOtpSecond={false}
                        mysecond={second}
                        otpMinute={minutes}
                        dialCode={dialCode}
                        handlclickErrorbtn={handlclickErrorbtn}
                        userModel={values}
                        OTPDetail={OTPDetail}
                        confirmationResult={window.confirmationResult}
                        isOpenModal={isotpVerification}
                        handleToggle={handleToggle}
                        isotpVerification={isotpVerification}
                        isUserRegister={false}
                        displayCloseButton={false}
                    /> */}

          <div className="modal-backdrop fade show"></div>
        </>
      )}
      {restaurantinfo?.smsapigateway === 1 &&
        restaurantinfo?.enableotpauthentication === true && (
          <div className="col-lg-12 col-sm-12 col-xs-12 d-flex justify-content-end mt-2 position-relative bottom-0 end-0">
            <div
              style={{ width: "32% !important", border: "none !important" }}
              id="recaptcha-container"
            ></div>
          </div>
        )}
    </>
  );
};
export default VerifyPhoneComponent;
