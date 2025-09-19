'use client';

import React, { useState, ChangeEvent, MouseEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { GetThemeDetails } from "../../common/utility";
import handleNotify from "../../default/helpers/toaster/toaster-notify";
import { ToasterPositions } from "../../default/helpers/toaster/toaster-positions";
import { ToasterTypes } from "../../default/helpers/toaster/toaster-types";
import { CustomerServices } from "../../../../redux/customer/customer.services";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";

const CreatePasswordComponent: React.FC = () => {
  const { restaurantinfo } = useReduxData();
  const router = useRouter();
  const searchParams = useSearchParams();

  const dynamic = searchParams.get("dynamic") ?? "";
  const location = searchParams.get("location") ?? "";
  const index = searchParams.get("index") ?? "";
  const returnURL = searchParams.get("returnURL") ?? "";

  const [EmailAddress, setEmailAddress] = useState<string>("");
  let validEmailAddress = "";
  let phoneNumber = "";
  const requestUrl = `${process.env.NEXT_PUBLIC_WEB_URL}${restaurantinfo?.restaurantURL}`;
  const [submitting, setSubmitting] = useState(false);
  const [values, setValues] = useState<{ password: string; confirmpassword: string }>({
    password: "",
    confirmpassword: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
  const [conirmpasswordErrorMessage, setConirmPasswordErrorMessage] = useState<string>("");

  const passwordOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      password: e.target.value,
    });
    setErrorMessage(null);
    setPasswordErrorMessage("");
  };

  const confirmpasswordOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      confirmpassword: e.target.value,
    });
    setErrorMessage(null);
    setConirmPasswordErrorMessage("");
  };

  const id = index;

const selctedTheme = GetThemeDetails(restaurantinfo?.themetype ?? "");

  const { isError, isLoading, data, isSuccess, refetch, isFetching } = useQuery({
    queryKey: ["gettoken", restaurantinfo?.restaurantId],
    queryFn: () => CustomerServices.userResetPasswordValidToken(id, restaurantinfo!.restaurantId),
    staleTime: 0,
    refetchOnWindowFocus: false,
    enabled: id !== undefined && id !== "",
  });

  if (isSuccess) {
    if (data?.result?.TokenIsValid) {
      validEmailAddress = data?.result?.ValidEmailAddress;
      let phone = data?.result?.Phone ?? "";
      let phoneLength = phone?.length;
      phoneNumber = `(xxx) xxx-${phone.substring(phoneLength - 4, phoneLength)}`;
    } else {
      router.push("/" + selctedTheme?.url + "/" + dynamic + "/reset-failed");
    }
  }

  const handleSubmit = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);
    let iserror = false;

    if (values.password.length === 0) {
      setPasswordErrorMessage("Password must be required");
      iserror = true;
    }
    if (values.confirmpassword.length === 0) {
      setConirmPasswordErrorMessage("Confirm password must be required");
      iserror = true;
    }
    if (
      values.password !== "" &&
      values.confirmpassword !== "" &&
      values.password !== values.confirmpassword
    ) {
      setErrorMessage("Password and confirm password not matched");
      iserror = true;
    }

    if (iserror) return;
    refetch();

    if (data && data?.result?.TokenIsValid && isFetching === false) {
      const requestBody = {
        emailId: validEmailAddress,
        password: values.password,
        validtoken: id,
        confirmpassword: values.confirmpassword,
        restaurantId: restaurantinfo!.restaurantId,
        requestUrl: requestUrl,
        returnUrl: requestUrl,
      };

      CustomerServices.userResetPasswordRequest(requestBody).then((res: any) => {
        let response = JSON.parse(res.d);
        if (res && response?.result?.ChangeSuccessfully) {
          handleNotify(response?.result?.PasswordMessage, ToasterPositions.TopRight, ToasterTypes.Success);
          let redirectpage =
            returnURL !== undefined && returnURL !== "" && returnURL !== "/"
              ? "/" + returnURL
              : "/password-set";

          router.push("/" + selctedTheme?.url + "/" + dynamic + redirectpage);
        } else if (res && !response?.result?.ChangeSuccessfully) {
          setSubmitting(false);
          handleNotify(response?.result?.PasswordMessage, ToasterPositions.TopRight, ToasterTypes.Error);
          return setErrorMessage(response?.result?.PasswordMessage);
        }
      });
    } else {
      setSubmitting(false);
      handleNotify("Token is not valid , please request again", ToasterPositions.TopRight, ToasterTypes.Error);
      return setErrorMessage("Token is not valid , please request again");
    }
    setSubmitting(false);
  };

  const handleClickHome = () => {
    router.push(
      "/" + selctedTheme?.url + "/" + dynamic + "/" + restaurantinfo?.defaultLocation?.locationURL
    );
  };

  return (
    <>
      {isSuccess && (
        <div className="delivery-form py-2">
          <form className="row justify-content-center">
            <div className="col-lg-12 col-sm-12 col-12">
              <div className="delivery">
                <div className="row">
                  <div className="col-lg-4 text-start col-sm-4 col-12">
                    <label className="ps-lg-3 ps-md-3">Email Address</label>
                  </div>
                  <div className="col-lg-7 col-sm-7 col-12 mb-3 ">
                    <input
                      className="form-control"
                      type="text"
                      placeholder=""
                      disabled
                      value={validEmailAddress}
                      onChange={() => setEmailAddress("")}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-4 text-start col-sm-4 col-12">
                    <label className="ps-lg-3 ps-md-3">Phone Number</label>
                  </div>
                  <div className="col-lg-7 col-sm-7 col-12 mb-3 ">
                    <input className="form-control" type="text" placeholder="" disabled value={phoneNumber} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-4 text-start col-sm-4 col-12">
                    <label className="ps-lg-3 ps-md-3">Choose new Password</label>
                  </div>
                  <div className="col-lg-7 col-sm-7 col-12 mb-3">
                    <input
                      type="password"
                      onChange={passwordOnChange}
                      value={values.password}
                      placeholder="Enter password"
                      autoComplete="off"
                      className="form-control"
                      required
                    />
                    {passwordErrorMessage && <span className="red-text">{passwordErrorMessage}</span>}
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-4 text-start col-sm-4 col-12">
                    <label className="ps-lg-3 ps-md-3">Confirm Password</label>
                  </div>
                  <div className="col-lg-7 col-sm-7 col-12 ">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Re-enter password"
                      onChange={confirmpasswordOnChange}
                      value={values.confirmpassword}
                      autoComplete="off"
                      required
                    />
                    {conirmpasswordErrorMessage && <span className="red-text ">{conirmpasswordErrorMessage}</span>}
                    {errorMessage && <span className="red-text ">{errorMessage}</span>}
                  </div>
                </div>
                <div className="row justify-content-start mt-4">
                  <div className="offset-lg-4 col-lg-6 col-md-12 col-12">
                    <div className="row">
                      <div className="col-lg-6 col-sm-6 col-12 mb-2 mb-lg-0">
                        <a className="btn-default w-100 cursor" onClick={handleSubmit}>
                          Continue
                        </a>
                      </div>
                      <div className="col-lg-6 col-sm-6 col-12 ">
                        <a className="btn-default w-100 cursor" onClick={handleClickHome}>
                          Home
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default CreatePasswordComponent;
