import React, { useCallback, useState } from "react";
import ProfileEdit from "./profileedit.component";
import { ButtonLoader } from "../../common/buttonloader.component";
import useForm from "@/components/customhooks/useForm";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { useAppDispatch } from "../../../../redux/hooks";
import { getCountryList, GetCurrency } from "@/components/common/utility";
import validate from "@/components/default/myaccount/myaccount-update.validationRules";
import { UpdateUserInfoObjTypes } from "@/types/myaccount-types/myaccount.type";
import { CustomerServices } from "../../../../redux/customer/customer.services";
import { setUserDetail } from "../../../../redux/login/login.slice";
import PhoneInput from "react-phone-input-2";
import { BUTTON_TYPE_ENUM } from "@/components/common/enums";

const MyAccountInfo = () => {
  const { handleChange, handleSubmit, values, errors, isDisabled } = useForm(
    submitSuccess,
    validate
  );
  const { restaurantinfo, userinfo, rewardpoints } = useReduxData();
  const dispatch = useAppDispatch();
  const [count, setcount] = useState<number>(0);
  var rewardamount =
    rewardpoints && rewardpoints?.rewardamount > 0
      ? Number(rewardpoints?.rewardamount).toFixed(2)
      : 0.0;
  var currency = GetCurrency();
  const restaurantId = restaurantinfo?.restaurantId;
  const locationId = restaurantinfo?.defaultlocationId;
  const customerId = userinfo && userinfo.customerId ? userinfo.customerId : 0;
  const [Croppedimage, setCroppedimage] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [fileData, setFile] = useState({
    base64: "",
    fileList: null,
    type: "",
  });
  const [oldpassword, setoldpassword] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMesssage] = useState<string>("");
  const [showchangePassword, setShowchangePassword] = useState<boolean>(false);
  const [imageFileName, setimageFileName] = useState<string>("");
  const [imageUpload, setimageUpload] = useState<boolean>(false);
  const [imgType, setimgType] = useState<string>("");
  const [isSaveDisable, setisSaveDisable] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const locationCountry = restaurantinfo?.defaultLocation?.countryName;
  const [isEdit, setisEdit] = useState<boolean>(false);
  const [dialCode, setDialCode] = useState<string>(userinfo?.dialcode || "+1");

  const getCropedImage = useCallback(
    (image: any) => {
      setCroppedimage(image);
      setFile((prevState) => ({
        ...prevState,
        base64: image,
      }));
    },

    []
  );

  if (userinfo && count <= 0) {
    if (userinfo && userinfo?.firstname) {
      values.firstname = userinfo.firstname;
    }
    if (userinfo && userinfo?.lastname) {
      values.lastname = userinfo.lastname;
    }
    // if (userinfo && userinfo?.businessname) {
    //   values?.businessname = userinfo.businessname || "";
    // }
    if (userinfo && userinfo?.phone) {
      values.phone = userinfo.phone.replace(
        /(\d{3})(\d{3})(\d{4})/,
        "($1) $2-$3"
      );
    }
    if (userinfo && userinfo?.emailId) {
      values.emailId = userinfo.emailId;
    }
    if (userinfo && userinfo?.picture) {
      setFile((prevState) => ({
        ...prevState,
        base64: userinfo.picture,
      }));
    }

    setcount(count + 1);
  }

  const handleDisbleMysave = () => {
    setisSaveDisable(false);
  };

  const handleChangePassword = () => {
    let ischeck = !showchangePassword;
    setShowchangePassword(ischeck);
    if (ischeck) {
      CustomerServices.getCustomerPassword(
        restaurantId as number,
        restaurantinfo?.defaultlocationId as number,
        customerId
      ).then((response) => {
        if (response) {
          setoldpassword(response);
          values.validatePassword = true;
        }
      });
    } else {
      values.validatePassword = false;
      values.newpassword = "";
      values.confirmpassword = "";
    }
  };

  const disableChange = () => {};
  function submitSuccess() {
    //var croppedImg=null;
    let imgfilename = "";
    let imgfiletype = "";
    var croppedImg = Croppedimage;
    imgfilename = imageFileName;
    imgfiletype = imgType;

    const updateUserInfoObj = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.emailId,
      phone: values?.phone?.trim().replace(/\D+/g, ""),
      picture: croppedImg === null ? fileData.base64 : croppedImg,
      imgname: imgfilename,
      imgtype: imgfiletype,
      pass: values.confirmpassword ? values.confirmpassword : "",
      restaurantId: restaurantId,
      locationId: locationId,
      customerId: customerId,
      businessname: values.businessname,
      dialcode: dialCode,
    };
    submitData(updateUserInfoObj as UpdateUserInfoObjTypes);
  }

  const submitData = async (updateUserInfoObj: UpdateUserInfoObjTypes) => {
    if (updateUserInfoObj != undefined) {
      setSubmitting(true);
      const responsedata = await CustomerServices.updateCustomerInfo(
        updateUserInfoObj
      );
      if (responsedata && responsedata.Customer != undefined) {
        setisEdit(false);
        if (responsedata.Customer) {
          const customerdetails = {
            customerId: updateUserInfoObj.customerId,
            emailId: updateUserInfoObj.email,
            firstname: updateUserInfoObj.firstname,
            imgname: updateUserInfoObj.imgname,
            imgtype: updateUserInfoObj.imgtype,
            isVerified: userinfo?.isVerified,
            lastname: updateUserInfoObj.lastname,
            loyaltynumber: userinfo?.loyaltynumber,
            mobile: userinfo?.mobile,
            customertype: userinfo?.customertype,
            dialcode: updateUserInfoObj?.dialcode,
            businessname: updateUserInfoObj?.businessname,
            phone: updateUserInfoObj.phone,
            picture: updateUserInfoObj.picture,
            restaurantId: restaurantId,
            rewardvalue: userinfo?.rewardvalue,
            totalRewardPoints: userinfo?.totalRewardPoints,
          };
          //dispatch({ type: LoginTypes.USER_DETAIL, payload: customerdetails });
          dispatch(setUserDetail(customerdetails as any));
        }
        setSubmitting(false);
        // setisdiplaycanvas(false);
        // setdisplayImage(true);
        return;
      } else {
        setErrorMesssage(responsedata.message);
        setSubmitting(false);
        return;
      }
    }
  };
  return (
    <>
      <div className="row normal-form">
        {!isEdit ? (
          <ProfileEdit values={values} />
        ) : (
          <>
            {userinfo?.businessname && (
              <div className="col-lg-4 col-md-4 col-12">
                <label>Business Name</label>
                <div className="search">
                  <input
                    type="text"
                    name="businessname"
                    className="form-control search"
                    onChange={handleChange}
                    value={values.businessname || ""}
                    placeholder=""
                  />
                </div>
                {errors?.businessname && (
                  <div className="text-danger">{errors.businessname}</div>
                )}
              </div>
            )}
            <div
              className={`col-md-${userinfo?.businessname ? "4" : "6"} col-12`}
            >
              <label>First Name</label>
              <div className="search">
                <input
                  type="text"
                  name="firstname"
                  className="form-control search"
                  onChange={handleChange}
                  value={values.firstname || ""}
                  placeholder=""
                />
              </div>
              {errors.firstname && (
                <div className="text-danger">{errors.firstname}</div>
              )}
            </div>
            <div
              className={`col-md-${userinfo?.businessname ? "4" : "6"} col-12`}
            >
              <label>Last Name</label>
              <input
                type="text"
                name="lastname"
                className="form-control"
                onChange={handleChange}
                value={values.lastname || ""}
                placeholder=""
              />
              {errors.lastname && (
                <div className="text-danger">{errors.lastname}</div>
              )}
            </div>

            <div className="col-lg-6 col-md-6 col-12">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                onChange={handleChange}
                value={values.emailId || ""}
                placeholder=""
                disabled
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}
            </div>
            <div className="col-lg-2 col-md-2 col-6 h-100">
              <label>Code</label>
              {/* <IntlTelInput
                css={["intl-tel-input", "form-control"]}
                utilsScript={"libphonenumber.js"}
                value={dialCode === "" ? "+1" : dialCode}
                preferredCountries={[]}
                onlyCountries={getCountryList()}
                placeholder=""
                className="dialCode disabled no-drop "
                inputClassName="codeinput form-control no-drop "
                format={false}
                disabled={true}
                autoFocus={false}
                readonly={true}
                fieldId="tel-x"
                cursorPosition={false}
                style={{ caretColor: "transparent" }}
              /> */}
              <PhoneInput
                value={dialCode === "" ? "+1" : dialCode}
                onlyCountries={getCountryList()} // Same logic as your existing function
                preferredCountries={[]} // Empty, same as before
                enableSearch={false}
                disableDropdown={true}
                disabled={true}
                inputClass="codeinput form-control dialCode"
                containerClass="intl-tel-input form-control dialCode disabled no-drop"
                inputStyle={{ caretColor: "transparent" }}
                buttonStyle={{ display: "none" }} // hides dropdown arrow
                isValid={() => true} // skip validation
                //onChange={() => {}} // no-op since it's disabled
              />
            </div>
            <div className="col-lg-4 col-md-4 col-12">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                disabled={true}
                onChange={handleChange}
                value={values.phone || ""}
                placeholder=""
              />
              {errors.phone && (
                <div className="text-danger">{errors.phone}</div>
              )}
            </div>
          </>
        )}
        {showchangePassword === true && (
          <>
            <div className="col-lg-4 col-md-4 col-12">
              <label>Password</label>
              <div className="pass-input  position-relative">
                <input
                  type={showPassword === false ? "password" : "text"}
                  name="password"
                  onChange={handleChange}
                  className="form-control"
                  placeholder=""
                  value={oldpassword}
                />
                <i
                  className={
                    showPassword === false
                      ? "fa fa-eye-slash fa-lg eye-icon"
                      : "fa fa-eye fa-lg eye-icon"
                  }
                  id="togglePassword"
                  onClick={(e) => setShowPassword(!showPassword)}
                ></i>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-12">
              <label>New Password</label>
              <input
                type="password"
                name="newpassword"
                onChange={handleChange}
                className="form-control"
                placeholder=""
              />
              {errors.newpassword && (
                <div className="text-danger">{errors.newpassword}</div>
              )}
            </div>
            <div className="col-lg-4 col-md-4 col-12">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmpassword"
                onChange={handleChange}
                className="form-control"
                placeholder=""
              />
              {errors.confirmpassword && (
                <div className="text-danger">{errors.confirmpassword}</div>
              )}
            </div>
          </>
        )}

        <div className="row mt-3 align-items-center">
          <div className="col-lg-4 text-center text-lg-start text-md-start col-md-6 col-12">
            {!isEdit && (
              <a
                className="address-nfound fs-14"
                onClick={() => setisEdit(!isEdit)}
              >
                Edit my profile
              </a>
            )}
          </div>
          <div className="col-lg-4 my-lg-0 my-md-0 my-3 text-center col-md-6 col-12">
            {(isEdit || showchangePassword) && (
              <ButtonLoader
                isLoader={submitting}
                btnType={BUTTON_TYPE_ENUM.SUBMIT}
                ///btnType="submit"
                handleClick={handleSubmit}
                isDisable={
                  Object.keys(errors).length > 0
                    ? isDisabled
                    : !isSaveDisable
                    ? isSaveDisable
                    : isDisabled
                }
                textName="Update"
              ></ButtonLoader>
            )}
          </div>
          <div className="col-lg-4 mt-md-3 mt-0 mt-lg-0 text-center text-lg-end text-md-end col-md-12 col-12">
            <a className="btn-default" onClick={handleChangePassword}>
              Edit my password <i className="fa fa-angle-right" />
            </a>
          </div>
        </div>
        {/* <div className="row justify-content-center mt-3">
        <div className="col-lg-6 col-md-6 col-12">
            {submitting ? (
                <Custombutton
                    buttonText="Processing..."
                    buttonclass="btn-default btn-orange w-100"
                    isDisable
                />
            ) : (
                <Custombutton
                    buttonText="Save My Details"
                    buttonclass="btn-default btn-orange w-100"
                    isDisable={!!Object.keys(errors).length}
                    buttonMethod={handleSubmit}
                />
            )}
        </div>
    </div> */}
      </div>
    </>
  );
};

export default MyAccountInfo;
