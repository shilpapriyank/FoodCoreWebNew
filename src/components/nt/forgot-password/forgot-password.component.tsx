"use client";

import { useParams, useRouter } from "next/navigation";
import React, {
  useEffect,
  useState,
  ClipboardEvent,
  ChangeEvent,
  FormEvent,
} from "react";
import { CustomerServices } from "../../../../redux/customer/customer.services";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import PhoneInput, { CountryData } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import {
  allRegex,
  countryData,
  formatePhoneNumber,
  getCountryList,
  GetThemeDetails,
  onLoadSetDefaultFlag,
  unFormatePhoneNumber,
} from "../../common/utility";

import { PAGES } from "../common/pages";
import { HOMEPAGEMESSAGE } from "@/components/helpers/static-message/home-message";
import CustomanchortagComponent from "@/components/common/customanchortag.component";

interface ForgotPasswordComponentProps {
  setisLoadFlage: (flag: boolean) => void;
  isOpenModal: boolean;
  keyName: string;
  handleToggle: (val: boolean, key: string) => void;
  handleOpenLoginModal: (val: boolean) => void;
}

export const ForgotPasswordComponent: React.FC<
  ForgotPasswordComponentProps
> = ({
  setisLoadFlage,
  isOpenModal,
  keyName,
  handleToggle,
  handleOpenLoginModal,
}) => {
    const { restaurantinfo } = useReduxData();
    const router = useRouter();
    const params = useParams();
    const dynamic = params.dynamic ?? "";
    const location = params.location ?? "";
    const selctedTheme = GetThemeDetails(restaurantinfo?.themetype ?? 0);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [isDisable, setisDisable] = useState<boolean>(false);
    const [phoneNumber, setphoneNumber] = useState<string>("");
    const [customerId, setCustomerId] = useState<number>();
    const [phone, setphone] = useState<string>("");
    const locationCountry = restaurantinfo?.defaultLocation?.countryName ?? "usa";
    // const locationCountryData = countryData[locationCountry.toLowerCase()];
    type CountryKey = keyof typeof countryData;
    const locationKey = locationCountry.toLowerCase() as CountryKey;
    const locationCountryData = countryData[locationKey];
    const [dialCode, setDialCode] = useState<string>(
      locationCountryData.countryCode
    );
    const [flag, setFlag] = useState<boolean>(false);
    const defaultflag = document.querySelector(".forgot-pass")
      ?.previousElementSibling?.firstElementChild?.firstElementChild as any;
    const countryList = document.querySelector(".forgot-pass")
      ?.previousElementSibling?.children[1] as any;

    useEffect(() => {
      if (dialCode === locationCountryData.countryCode) {
        onLoadSetDefaultFlag(defaultflag, countryList, locationCountryData)
        setFlag(!flag)
      }
    }, [defaultflag, countryList, setisLoadFlage]);

    const handleSubmit = (param: any, e: FormEvent) => {
      e.preventDefault();

      const restaurantUrl = `${selctedTheme?.url}/${dynamic}`;
      const returnURL = window.location.href.replace(
        `${window.location.origin}/${restaurantUrl}`,
        ""
      );

      if (phoneNumber === "") {
        setisDisable(true);
        setErrorMessage("Phone number must be required");
        return;
      }

      const phoneno = phoneNumber.replace(/[()\- ]/g, "");
      if (phoneno.length < 10) {
        setisDisable(true);
        setErrorMessage("Enter valid phone number");
        return;
      }

      const data = {
        phoneNumber: phoneno,
        restaurantId: restaurantinfo?.restaurantId,
      };

      CustomerServices.userExists(data as any).then((result: any) => {
        setisDisable(true);

        if (result > 0 && restaurantinfo) {
          const customerid = result;
          setCustomerId(customerid);

          const requesturl = `${window.location.origin}/${restaurantUrl}/${PAGES.CREATE_NEW_PASS}`;
          CustomerServices.handleForgotPasswordRequest(
            phoneno,
            customerid,
            restaurantinfo.restaurantId,
            requesturl,
            returnURL,
            dialCode
          ).then((response: boolean) => {
            if (response === true) {
              setErrorMessage("");
              handleToggle(false, keyName);
              router.push(`/${restaurantUrl}/${location}`);
            } else {
              setisDisable(true);
              setErrorMessage("User not exist");
            }
          });
        } else {
          setisDisable(true);
          setErrorMessage("User not exist");
        }
      });
    };

    const handleChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
      let regex1 = allRegex.phoneRegex1;
      let regex2 = allRegex.validwithFormatephoneRegex
      let regex3 = allRegex.phoneRegex3
      let validdigit = allRegex.validdigit
      let phoneno = unFormatePhoneNumber(e.target.value)
      if (phoneno.length > 10)
        return;
      if (phoneno === "")
        setphone(e.target.value);
      if ((regex1.test(phoneno) || regex2.test(phoneno) || (regex3.test(phoneno))) && validdigit.test(phoneno)) {
        setphone(e.target.value);
        if (phoneno.length < 10) {
          setphone(unFormatePhoneNumber(e.target.value));
        }
        setErrorMessage("");
        return;
      }
      else {
        return false;
      }
    }
    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
      setErrorMessage("")
      setisDisable(false)
      let regex1 = allRegex.phoneRegex1;
      let regex2 = allRegex.validwithFormatephoneRegex
      let regex3 = allRegex.phoneRegex3
      let validdigit = allRegex.validdigit
      let phoneno = unFormatePhoneNumber(e.target.value);
      if (phoneno.length > 10)
        return;
      if (phoneno === "")
        setphoneNumber(e.target.value);
      if ((regex1.test(phoneno) || regex2.test(phoneno) || (regex3.test(phoneno))) && validdigit.test(phoneno)) {
        setSubmitting(false)
        setphoneNumber(e.target.value);
        if (phoneNumber.length === 9) {
          setphoneNumber(formatePhoneNumber(e.target.value));
        }
        if (phoneno.length < 10) {
          setphoneNumber(unFormatePhoneNumber(e.target.value));
        }
        return;
      }
      else {
        return false;
      }
    }

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
      const pastedValue = e.clipboardData.getData("text");
      if (Number(pastedValue)) {
        if (pastedValue.length === 10) {
          e.preventDefault();
          const replacedValue = formatePhoneNumber(pastedValue);
          setphone(replacedValue);
        }
      }
    };

    let forgotpaswwordwithmobile = true;

    const handleClickSignIn = () => {
      handleToggle(false, keyName);
      handleOpenLoginModal(true);
    };

    return (
      <>
        <div
          className={`modal modal-your-order loginmodal fade ${isOpenModal ? "show d-block" : ""
            }`}
          id="exampleModal-login"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <h5 className="modal-title" id="login-modal-Label">
                {HOMEPAGEMESSAGE.RESET_PASSWORD}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => handleToggle(false, keyName)}
              />
              {forgotpaswwordwithmobile ? (
                <div className="modal-body">
                  <p>{HOMEPAGEMESSAGE.RESET_PASSWORD_MESSAGE}</p>
                  <form>
                    <div className="row">
                      <div className="col-3 col-md-3 col-lg-3">
                        <label>Code</label>
                        <br></br>
                        <PhoneInput
                          country={"us"}
                          value={dialCode === "" ? "+1" : dialCode}
                          preferredCountries={[]}
                          onlyCountries={getCountryList()}
                          onChange={(num, country) => {
                            setDialCode("+" + (country as CountryData).dialCode);
                            setErrorMessage("");
                          }}
                          placeholder=""
                          containerClass="dialCode"
                          inputClass="codeinput forgot-pass form-control"
                          inputProps={{
                            readOnly: true,
                            id: `h${Math.random()}`,
                            style: { caretColor: "transparent" },
                          }}
                          disableDropdown={false}
                          disableSearchIcon={false}
                          isValid={() => true}
                        />
                      </div>
                      <div className="col-lg-9 col-md-9 col-7 offset-2 offset-lg-0 offset-md-0">
                        <label>Phone Number</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          value={phoneNumber}
                          onChange={handlePhoneChange}
                          onPaste={handlePaste}
                          required
                        />
                        {errorMessage && errorMessage.length > 0 && (
                          <span className="error"> {errorMessage} </span>
                        )}
                      </div>
                    </div>

                    <div className="row align-items-center mt-3">
                      <div className="col-lg-6 col-md-6 col-12">
                        <CustomanchortagComponent
                          buttonText="Submit"
                          buttonclass="btn-default btn-orange w-100"
                          isDisable={false}
                          buttonMethod={handleSubmit}
                          buttonParam=""
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-12 text-end">
                        <p>
                          {" "}
                          <a onClick={handleClickSignIn} className="cursor">
                            {" "}
                            BACK TO SIGN IN{" "}
                          </a>{" "}
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="modal-body">
                  <p>{HOMEPAGEMESSAGE.RESET_PASSWORD_MESSAGE}</p>
                  <form noValidate>
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-12">
                        <label>Phone Number </label>
                        <input
                          type="email"
                          placeholder="Enter phone number"
                          name="phone"
                          required
                          className="form-control"
                          value={phone}
                          onChange={(e) => handleChangePhone(e)}
                          onPaste={handlePaste}
                          // noValidate
                          autoComplete="off"
                        />
                        {errorMessage && errorMessage.length > 0 && (
                          <span className="error"> {errorMessage} </span>
                        )}
                      </div>
                    </div>

                    <div className="row align-items-center mt-3">
                      <div className="col-lg-6 col-md-6 col-12">
                        <CustomanchortagComponent
                          buttonText="Submit"
                          buttonclass="btn-default btn-orange w-100"
                          isDisable={false}
                          buttonMethod={handleSubmit}
                          buttonParam=""
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-12 text-end">
                        <p>
                          {" "}
                          <a onClick={handleClickSignIn}>
                            {" "}
                            BACK TO SIGN IN{" "}
                          </a>{" "}
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade show"></div>
      </>
    );
  };
