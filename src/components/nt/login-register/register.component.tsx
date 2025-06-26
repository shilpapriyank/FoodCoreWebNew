"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { useParams, useRouter } from 'next/navigation';
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { RegisterServices } from "../../../../redux/register/register.services";
import { useDispatch } from 'react-redux';
import { registerAddress } from "../../../../redux/delivery-address/delivery-address.slice";
import { ToasterPositions } from '../../default/helpers/toaster/toaster-positions';
import { ToasterTypes } from '../../default/helpers/toaster/toaster-types';
import { CheckPhoneRequestModel, CustomerServices } from "../../../../redux/customer/customer.services";
import { LoginServices } from "../../../../redux/login/login.services";
import { DeliveryAddressServices } from "../../../../redux/delivery-address/delivery-address.services";
import { selecteddeliveryaddress } from "../../../../redux/selected-delivery-data/selecteddelivery.slice";
import { setintialrewardpoints } from "../../../../redux/rewardpoint/rewardpoint.slice";
import useFireBaseAuth from "@/components/customhooks/userfirebaseauth-hook";
import { UserDetailsErrormessage } from "@/components/helpers/static-message/userdetails-message";
import { DeliveryAddressTypes } from "../../../../redux/delivery-address/delivery-address.type";
import handleNotify from '../../default/helpers/toaster/toaster-notify';
import useUtility from '../../customhooks/utility-hook';
import { AppDispatch } from "../../../../redux/store";
import { allRegex, countryData, formatePhoneNumber, getCountryList, GetThemeDetails, onLoadSetDefaultFlag, setUserExpiryTime, unFormatePhoneNumber } from "@/components/common/utility";
import OtpVerificationComponent from "./otpverification.component";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/bootstrap.css';
import { OTPVerificationSettingParams } from "@/types/register-types/register.types";
import { convertSecondToMinute } from "../common/utility";
import { setUserDetail } from "../../../../redux/login/login.slice";


interface RegisterProps {
    isOpenModal: boolean;
    handleToggle: (open: boolean, keyName?: string) => void;
    handleOpenLoginModal: (open: boolean) => void;
    handleToggleAccountConfirm: (open: boolean) => void;
    openAdressModal: boolean;
    handleToggleAddAddressModal: (open: boolean) => void;
    isNotValidateOtp: boolean
    isRegiStaration: any
}

const Register: React.FC<RegisterProps> = ({
    isOpenModal,
    handleToggleAccountConfirm,
    handleOpenLoginModal,
    handleToggle,
    isNotValidateOtp,
    openAdressModal,
    isRegiStaration,
    handleToggleAddAddressModal
}) => {
    const { restaurantinfo, deliveryaddress } = useReduxData();
    const dispatch = useDispatch<AppDispatch>();
    // let otpTime = convertSecondToMinute(parseInt(process.env.NEXT_PUBLIC_OTP_DURATION))
    const otpDurationEnv = process.env.NEXT_PUBLIC_OTP_DURATION;
    const otpDuration = otpDurationEnv ? parseInt(otpDurationEnv, 10) : 0;
    const otpTime = convertSecondToMinute(otpDuration);
    const [isDisable, setisDisable] = useState<boolean>(false);
    const [isAddAddress, setisAddAddress] = useState<boolean>(false)
    const b2b = restaurantinfo?.defaultLocation?.b2btype
    let registerAddressdata = deliveryaddress.registeraddress;
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [userExistError, setuserExistError] = useState<string>("")
    const [isShowReSend, setIsShowReSend] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const locationCountry = restaurantinfo?.defaultLocation?.countryName;
    // let locationCountryData = countryData[locationCountry.toLowerCase()]
    type CountryKey = keyof typeof countryData;
    const locationKey = locationCountry?.toLowerCase() as CountryKey;
    const locationCountryData = countryData[locationKey];

    const [dialCode, setDialCode] = useState<string>(locationCountryData.countryCode)
    const [OTPDetail, setOTPDetail] = useState();
    const [confirmResult, setconfirmResult] = useState()
    const [isotpVerification, setisotpVerification] = useState<boolean>(false)
    const [modelType, setModelType] = useState<string>("")
    const [second, setsecond] = useState<number>(0)
    const [minutes, setMinutes] = useState<number>(0);
    const [isOtpSecond, setisOtpSecond] = useState<boolean>(false)
    const selctedTheme = GetThemeDetails(restaurantinfo?.themetype);
    const [isOtpModal, setisOtpModal] = useState<boolean>(false)
    const isSchoolProgramEnabled = restaurantinfo?.isSchoolProgramEnabled;
    const { isBusinessNameRequired } = useUtility()
    const locationId = restaurantinfo?.defaultLocation?.locationId
    const params = useParams();
    const dynamic = params.dynamic;
    const location = params.location; var restaurantUrl = selctedTheme.url + "/" + dynamic;
    const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        businessname: "",
        email: "",
        phone: "",
        extension: "",
        password: "",
        confirmpassword: "",
        otp: "",
        isVerifiedPhone: "",
    });
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [submitting, setSubmitting] = useState<boolean>(false);
    var apiKey = restaurantinfo?.firebaseConfig?.apikey;
    var authDomain = restaurantinfo?.firebaseConfig?.authdomain;
    const { firebase, intializeRecaptchaVerified, intializeFirebaseApp, handleSendOTP: handleSendOtpHook, handleValidateOTP: handleValidateOTPHook } = useFireBaseAuth()
    const cleanForm = () => {
        setValues({
            firstname: "",
            lastname: "",
            businessname: "",
            email: "",
            phone: "",
            extension: "",
            password: "",
            confirmpassword: "",
            otp: "",
            isVerifiedPhone: "",
        })
        setErrors({})
        setisDisable(false)
    }

    useEffect(() => {
        if (isNotValidateOtp) return;

        if (
            restaurantinfo?.smsapigateway === 1 &&
            restaurantinfo?.enableotpauthentication === true
        ) {
            const payload: OTPVerificationSettingParams = {
                restaurantId: restaurantinfo.restaurantId,
                enableotpauthentication: restaurantinfo.enableotpauthentication,
                smsapigateway: restaurantinfo.smsapigateway,
            };

            RegisterServices.getOTPVerificationSetting(payload).then((response) => {
                if (response) {
                    setOTPDetail(response as string | any);
                }
            });
        }
    }, []);
    useEffect(() => {
        if (isNotValidateOtp) {
            return;
        }
        if (OTPDetail && OTPDetail !== undefined && OTPDetail !== null && restaurantinfo?.enableotpauthentication === true
            && (apiKey !== "" && apiKey !== undefined) && (authDomain !== "" && authDomain !== undefined)) {
            intializeFirebaseApp()
            // https://www.youtube.com/watch?v=lDzBtOo1S8Y
            intializeRecaptchaVerified()
        }
    }, [OTPDetail]);

    useEffect(() => {
        if (isNotValidateOtp) {
            return;
        }
        cleanForm()
    }, [isRegiStaration])

    let defaultflag = document.querySelector(".register-country")?.previousElementSibling?.firstElementChild?.firstElementChild
    let countryList = document.querySelector(".register-country")?.previousElementSibling?.children[1]

    useEffect(() => {
        onLoadSetDefaultFlag(defaultflag, countryList, locationCountryData)
    }, [defaultflag, countryList])

    const handleClickAddAddress = () => {
        setisAddAddress(true)
    }

    const handlclickErrorbtn = (error: any) => {
        setuserExistError(error)
        $('#errorbutton').click();
    }

    const handleChange = (event: any) => {
        event.preventDefault();
        const { name, value } = event.target;
        let validateemial = allRegex.validateemial;
        let internalError = {
            firstname: errors.firstname,
            businessname: errors.businessname,
            lastname: errors.lastname,
            email: errors.email,
            password: errors.password,
            confirmpassword: errors.confirmpassword,
            phone: errors.phone
        }
        if (name === "phone") {
            internalError.phone = "";
            if (
                (internalError.firstname === "" || internalError.firstname === undefined) &&
                (internalError.lastname === "" || internalError.lastname === undefined) &&
                (internalError.email === "" || internalError.email === undefined) &&
                (internalError.password === "" || internalError.password === undefined) &&
                (internalError.confirmpassword === "" || internalError.confirmpassword === undefined)
            ) {
                if (internalError.phone.length === 0) {
                    setisDisable(false)
                }
            }
            let regex1 = allRegex.phoneRegex1;
            let regex2 = allRegex.validwithFormatephoneRegex
            let regex3 = allRegex.phoneRegex3
            let validdigit = allRegex.validdigit
            let phoneno = unFormatePhoneNumber(value);
            if (phoneno.length > 10)
                return;
            if (phoneno === "")
                setValues({
                    ...values,
                    [name]: value,
                });

            if ((regex1.test(phoneno) || regex2.test(phoneno) || (regex3.test(phoneno))) && validdigit.test(phoneno)) {
                setValues({
                    ...values,
                    [name]: value,
                });
                if (phoneno.length === 10) {
                    setValues({
                        ...values,
                        [name]: formatePhoneNumber(value),
                    });
                }
                if (phoneno.length < 10) {
                    setValues({
                        ...values,
                        [name]: unFormatePhoneNumber(value)
                    });
                }
                return;
            }
        }
        else {
            setValues({
                ...values,
                [name]: value,
            });
        }
        if (name === "confirmpassword" && internalError.password === UserDetailsErrormessage.PASSWORD_MISMATCH_ERROR) {
            errors.password = ""
            internalError.password = ""
        }
        //internalError[name] = ""
        setErrors(internalError);
        if (name === "email") {
            if (validateemial.test(value)) {
                errors.email = "";
                internalError.email = "";
            }
        }
        if (
            (internalError.firstname && internalError.firstname.length > 0) ||
            (internalError.lastname && internalError.lastname.length > 0) ||
            (internalError.email && internalError.email.length > 0) ||
            (internalError.phone && internalError.phone.length > 0) ||
            (internalError.phone && internalError.phone.length > 0) ||
            (internalError.businessname && internalError.businessname.length > 0 && isBusinessNameRequired) ||
            (internalError.confirmpassword && internalError.confirmpassword.length > 0)
        ) {
            setisDisable(true)
        } else {
            setisDisable(false)
        }
    }


    const validateForm = (event: any): boolean => {
        event.preventDefault();

        const validateEmailRegex = allRegex.validateemial;
        const yopmailRegex = allRegex.validateYopMail;

        const newErrors: Partial<any> = {};
        let isValid = true;

        if (!values.phone) {
            newErrors.phone = UserDetailsErrormessage.PHONE_NO_ERROR;
        } else if (values.phone.length < 10) {
            newErrors.phone = UserDetailsErrormessage.PHONE_NO_LENGTH_ERROR;
        }

        if (!values.password) {
            newErrors.password = UserDetailsErrormessage.PASSWORD_ERROR;
        }

        if (isBusinessNameRequired && !values.businessname) {
            newErrors.businessname = UserDetailsErrormessage.BUSINESSNAME_ERROR;
        }

        if (!values.firstname) {
            newErrors.firstname = UserDetailsErrormessage.FIRST_NAME_ERROR;
        }

        if (!values.lastname) {
            newErrors.lastname = UserDetailsErrormessage.lAST_NAME_ERROR;
        }

        if (!values.email) {
            newErrors.email = UserDetailsErrormessage.EMAIL_ERROR;
        } else if (!validateEmailRegex.test(values.email)) {
            newErrors.email = UserDetailsErrormessage.EMAIL_VALID_ERROR;
        } else if (!yopmailRegex.test(values.email)) {
            newErrors.email = UserDetailsErrormessage.YOP_MAIL_ERROR;
        }

        if (!values.confirmpassword) {
            newErrors.confirmpassword = UserDetailsErrormessage.CONFIRM_PASSWORD_ERROR;
        }

        if (values.confirmpassword) {
            if (!values.password) {
                newErrors.password = UserDetailsErrormessage.PASSWORD_ERROR;
            } else if (values.confirmpassword !== values.password) {
                newErrors.password = UserDetailsErrormessage.PASSWORD_MISMATCH_ERROR;
            }
        }

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some((error) => error && error.length > 0);

        if (hasErrors) {
            setisDisable(true);
            setIsSubmitted(true);
            isValid = false;
        } else {
            setisDisable(false);
        }
        return isValid;
    };


    function cleardata() {
        setValues({
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            extension: "",
            businessname: "",
            password: "",
            confirmpassword: "",
            otp: "",
            isVerifiedPhone: "",
        });
        dispatch(registerAddress({}));
    }

    const handleSendOTP = (): void => {
        if (restaurantinfo?.smsapigateway === 1 && restaurantinfo?.enableotpauthentication === true) {
            handleSendOtpHook(dialCode.toString(), values.phone).then((result) => {
                setisotpVerification(true);
                setsecond(otpTime.second);
                setMinutes(otpTime.minute);
                setisOtpSecond(!isOtpSecond);
                handleOpenOtp(true);
                handleNotify("Code sent successfully", ToasterPositions.TopRight, ToasterTypes.Success);
            }).catch((err: any) => {
                // Handle error
            });
        }

        if (restaurantinfo?.smsapigateway === 2 && restaurantinfo?.enableotpauthentication === true) {
            const mobileNumber = `${dialCode} ${unFormatePhoneNumber(values.phone)}`;

            const payload = {
                restaurantId: restaurantinfo.restaurantId,
                enableotpauthentication: restaurantinfo.enableotpauthentication,
                smsapigateway: restaurantinfo.smsapigateway,
                mobilenumber: mobileNumber,
            };

            RegisterServices.twilioSendCode(payload).then((response) => {
                if (response) {
                    document.getElementById("btn-otp")?.click();
                    setsecond(otpTime.second);
                    setMinutes(otpTime.minute);
                    setIsShowReSend(true);
                    handleNotify("Code sent successfully", ToasterPositions.TopRight, ToasterTypes.Success);
                }
            });
        }
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setErrorMessage(null);

        const unPhormatedPhone: string = unFormatePhoneNumber(values.phone);

        const userModel = {
            firstname: values.firstname,
            lastname: values.lastname,
            phone: unPhormatedPhone,
            email: values.email,
            password: values.password,
            countrycode: dialCode,
            businessName: values.businessname,
        };

        var addressmodel: Record<string, string> | null = null;
        const registerAddress = Object.keys(registerAddressdata).length > 0
            ? registerAddressdata
            : deliveryaddress?.tempDeliveryAddress;

        if (registerAddress?.address1 !== '' && registerAddress?.address1 !== undefined) {
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

        const checkPhoneRequestModel: CheckPhoneRequestModel = {
            restaurantId: restaurantinfo?.restaurantId as number,
            phoneNumber: `${dialCode}${unFormatePhoneNumber(values.phone)}`
        };

        setErrorMessage(null);

        if (validateForm(event)) {
            const requesturl = `${window.location.origin}/${restaurantUrl}/confirmation?code=`;

            if (restaurantinfo?.IsAddressMandatoryForRegister) {
                if (!addressmodel || Object.keys(addressmodel).length === 0) {
                    handleNotify(
                        "Address required while registration.",
                        ToasterPositions.TopRight,
                        ToasterTypes.Warning
                    );
                    return;
                }
            }

            const data = await CustomerServices.checkExistingCustomerPhoneNumber(checkPhoneRequestModel);

            if (data?.message === "") {
                if (
                    (restaurantinfo?.smsapigateway === 1 || restaurantinfo?.smsapigateway === 2) &&
                    restaurantinfo?.enableotpauthentication === true
                ) {
                    handleSendOTP();
                    return;
                } else {
                    RegisterServices.registerUserWithAddress(
                        userModel,
                        addressmodel,
                        restaurantinfo?.defaultlocationId,
                        restaurantinfo?.restaurantId,
                        requesturl
                    ).then((response: any) => {
                        if (response) {
                            if (response.message && response.status === 2) {
                                handleNotify(response.message, ToasterPositions.TopRight, ToasterTypes.Warning);
                                if (response.message.toLowerCase() !== "user already exist") {
                                    cleardata();
                                }
                                setErrorMessage(response.message);
                                return;
                            } else if (!response.message && response.status === 2) {
                                handleNotify("User not created. Something went wrong", ToasterPositions.TopRight, ToasterTypes.Warning);
                                cleardata();
                                //  return setErrorMessage("User not created Something went wrong"); return;
                            } else if (response.status === 1) {
                                handleNotify(
                                    `Welcome ${userModel.firstname} `,
                                    ToasterPositions.TopRight,
                                    ToasterTypes.Success
                                );
                                // setErrorMessage("User created successfully");
                                setTimeout(() => {
                                    LoginServices.getLoginUserDetails({
                                        username: unPhormatedPhone,
                                        password: values.password,
                                        restaurantId: restaurantinfo?.restaurantId as number,
                                        dialCode: dialCode,
                                        locationid: locationId as number
                                    }).then((responsedata: any) => {
                                        if (responsedata?.customerDetails) {
                                            // dispatch({
                                            //     type: LoginTypes.USER_DETAIL,
                                            //     payload: responsedata.customerDetails,
                                            // });
                                            dispatch(setUserDetail(responsedata.customerDetails));
                                            setUserExpiryTime();

                                            if (addressmodel && Object.keys(addressmodel).length > 0) {
                                                const customerId = responsedata.customerDetails.customerId;
                                                if (customerId > 0) {
                                                    DeliveryAddressServices.getDeliveryAddress(customerId, restaurantinfo?.restaurantId as number, restaurantinfo?.defaultLocation.locationId as number).then(
                                                        (response: any) => {
                                                            if (response) {
                                                                if (response.AddressLists) {
                                                                    dispatch({
                                                                        type: DeliveryAddressTypes.GET_ADDRESS,
                                                                        payload: response.AddressLists
                                                                    })
                                                                    dispatch(selecteddeliveryaddress(response.AddressLists[0]));
                                                                }
                                                            }
                                                        }
                                                    );
                                                }
                                            } else {
                                                // if(bcChemical.restaurantId === restaurantinfo?.restaurantId&&b2b){
                                                //     handleToggle(true,'isAddressModalOnBcChemical')
                                                // }
                                            }

                                            //CHCK CUSTOMER I VERIFIED OR NOT 
                                            if (!responsedata.customerDetails.isVerified) {
                                                handleToggle(false, 'openRegisterModal')
                                                handleToggleAccountConfirm(true)
                                            } else {
                                                handleToggle(false, 'openRegisterModal')
                                            }
                                            if (responsedata.customerDetails) {
                                                dispatch(setintialrewardpoints(responsedata.customerDetails));
                                            }
                                        }
                                    })
                                }, 1000);

                                cleardata();

                                return;
                            }
                        }
                    });
                }
            } else {
                handleToggle(false, 'openRegisterModal')
                handleToggle?.(true, 'openUserExistModal')
            }
        }
    }
    const handleAutocompleteOff = (e: any) => {
        e.target.setAttribute("autoComplete", "off")
    }
    function handleOpenOtp(value: any) {
        setisOtpModal(value)
    }
    const handleOpenLogin = () => {
        handleToggle(false, 'openRegisterModal')
        handleOpenLoginModal(true)
    }

    return (
        <>
            <div className={`modal modal-your-order loginmodal fade ${(isOpenModal && !openAdressModal && !isOtpModal) ? 'show d-block' : ''}`} id="exampleModal-register" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered ru-model">
                    <div className="modal-content">
                        <h5 className="modal-title fs-5" id="staticBackdropLabel">Register</h5>
                        {!(b2b && isBusinessNameRequired) &&
                            <button type="button"
                                className="btn-close"
                                onClick={() => handleToggle
                                    (false, 'openRegisterModal')}
                                aria-label="Close"
                            />}
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="row mt-2">
                                    {(b2b && isBusinessNameRequired) && <div className="col-lg-12 col-md-12 col-12 mb-1">
                                        <label>Business name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder=""
                                            autoComplete="off"
                                            name="businessname"
                                            value={values.businessname}
                                            onChange={handleChange}
                                        />
                                        {errors.businessname && errors.businessname.length > 0 && isSubmitted && (
                                            <div className="error-text text-danger fs-12 mt-2 mb-2">Please enter a business name.</div>
                                        )}
                                    </div>}
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <label>First Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder=""
                                            autoComplete="off"
                                            name="firstname"
                                            value={values.firstname}
                                            onChange={handleChange}
                                        />
                                        {errors.firstname && errors.firstname.length > 0 && isSubmitted && (
                                            <div className="error-text text-danger fs-12 mt-2 mb-2">Please enter a valid first name.</div>
                                        )}
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <label>Last Name</label>
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            placeholder=""
                                            name="lastname"
                                            autoComplete="off"
                                            value={values.lastname}
                                            onChange={handleChange}
                                        />
                                        {errors.lastname && errors.lastname.length > 0 && isSubmitted && (
                                            <div className="error-text text-danger fs-12 mt-2 mb-2">Please enter a valid last name.</div>
                                        )}
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <label>Email</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder=""
                                            name="email"
                                            autoComplete="off"
                                            value={values.email}
                                            onChange={handleChange}
                                        />
                                        {errors.email && errors.email.length > 0 && isSubmitted && (
                                            <div className="error-text text-danger fs-12 mt-2 mb-2">Please enter a valid email address.</div>
                                        )}
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-4  h-100">
                                        <label>Code</label>
                                        <br />
                                        <PhoneInput
                                            country={dialCode ? dialCode.replace('+', '') : 'us'} // 'us' as default
                                            value={values.phone}
                                            onChange={(phone, countryData, event, formattedValue) => {
                                                setDialCode('+' + (countryData as any).dialCode);
                                                setValues(prev => ({
                                                    ...prev,
                                                    phone: phone
                                                }));
                                            }}
                                            onlyCountries={getCountryList().map((c: any) => c.iso2)} // assuming your countries have iso2 codes
                                            preferredCountries={[]} // no preferred countries
                                            enableSearch={true}
                                            inputProps={{
                                                name: 'phone',
                                                required: true,
                                                className: 'codeinput form-control register-country',
                                                autoFocus: false,
                                                readOnly: true,
                                                style: { caretColor: "transparent" }
                                            }}
                                            containerClass="dialCode form-control"
                                            disableDropdown={false}
                                            disableCountryCode={false}
                                            disableSearchIcon={true}
                                        />
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-8">
                                        <label>Phone Number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder=""
                                            name="phone"
                                            autoComplete="off"
                                            value={values.phone}
                                            onChange={handleChange}
                                        />
                                        {errors.phone && errors.phone.length > 0 && isSubmitted && (
                                            <div className="error-text text-danger fs-12 mt-2 mb-2">Please enter a valid phone number.</div>
                                        )}
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder=""
                                            name="password"
                                            autoComplete="off"
                                            value={values.password}
                                            onChange={handleChange}
                                        />
                                        {errors.password && errors.password.length > 0 && isSubmitted && (
                                            <div className="error-text text-danger fs-12 mt-2 mb-2">Please enter a valid password.</div>
                                        )}
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <label>Confirm Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder=""
                                            name="confirmpassword"
                                            autoComplete="off"
                                            value={values.confirmpassword}
                                            onChange={handleChange}
                                        />
                                        {errors.confirmpassword && errors.confirmpassword.length > 0 && isSubmitted && (
                                            <div className="error-text text-danger fs-12 mt-2 mb-2">Passwords do not match.</div>
                                        )}
                                    </div>
                                    {restaurantinfo?.smsapigateway === 1 && restaurantinfo?.enableotpauthentication === true && (
                                        <div className="col-lg-12 col-sm-12 col-xs-12 d-flex justify-content-end mt-2">
                                            <div style={{ width: "32% !important", border: "none !important" }} id="recaptcha-container"></div>
                                        </div>
                                    )}
                                    {!isSchoolProgramEnabled && <div className="col-lg-12 mt-4 mb-3 text-center col-md-12 col-12">
                                        <a className="btn-default w-100" onClick={() => handleToggleAddAddressModal(true)}>+ Add Address</a>
                                    </div>}
                                </div>
                            </div>

                            <div className="modal-footer">
                                <div className="row w-100 ms-auto me-auto">
                                    <div className="col-lg-6 text-center col-md-6 col-12">
                                        <button type="submit" className="btn-default w-100">
                                            <i className="fa me-1 fa-lock" /> Register Now
                                        </button>
                                    </div>
                                    <div className="col-lg-6 text-center col-md-6 col-12">
                                        <a className="btn-default black w-100" onClick={handleOpenLogin}>
                                            <i className="fa me-1 fa-lock" /> Login
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {isOtpModal &&
                <OtpVerificationComponent
                    setisOtpModal={setisOtpModal}
                    isOpenModal={isOtpModal}
                    userModel={values}
                    handleValidateOTPHook={handleValidateOTPHook}
                    handleToggle={handleToggle}
                    isOtpSecond={isOtpSecond}
                    mysecond={second}
                    otpMinute={minutes}
                    dialCode={dialCode}
                    OTPDetail={OTPDetail}
                    handleSendOtpHook={handleSendOtpHook}
                    handleToggleAccountConfirm={handleToggleAccountConfirm}
                    confirmationResult={window.confirmationResult}
                    isotpVerification={isotpVerification}
                    modalType={modelType}
                />}
            <div className="modal-backdrop fade show"></div>
        </>
    );
};

export default Register;
