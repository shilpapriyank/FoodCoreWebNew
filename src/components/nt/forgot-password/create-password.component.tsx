"use client";

import React, { useState, ChangeEvent, MouseEvent, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
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

  const params = useParams();
  const id = params?.index as string;

  const searchParams = useSearchParams();
  const returnURL = searchParams.get("returnURL") ?? "";

  const dynamic = params?.dynamic as string;
  const [values, setValues] = useState<{ password: string; confirmpassword: string }>({
    password: "",
    confirmpassword: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const selctedTheme = GetThemeDetails(restaurantinfo?.themetype ?? "");

  const { isError, isLoading, data, isSuccess, refetch, isFetching } = useQuery({
    queryKey: ["gettoken", id, restaurantinfo?.restaurantId],
    queryFn: () =>
      CustomerServices.userResetPasswordValidToken(id, restaurantinfo!.restaurantId),
    staleTime: 0,
    refetchOnWindowFocus: false,
    enabled: !!id && !!restaurantinfo?.restaurantId,
  });

  let validEmailAddress = "";
  let phoneNumber = "";

  if (isSuccess && data?.result?.TokenIsValid) {
    validEmailAddress = data?.result?.ValidEmailAddress;
    const phone = data?.result?.Phone ?? "";
    const phoneLength = phone.length;
    phoneNumber = `(xxx) xxx-${phone.substring(phoneLength - 4, phoneLength)}`;
  }

  // Redirect if token invalid
  useEffect(() => {
    if (isSuccess && !data?.result?.TokenIsValid) {
      router.push(`/${selctedTheme?.url}/${dynamic}/reset-failed`);
    }
  }, [isSuccess, data, router, selctedTheme, dynamic]);

  const passwordOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, password: e.target.value });
    setErrorMessage(null);
    setPasswordErrorMessage("");
  };
  const confirmpasswordOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, confirmpassword: e.target.value });
    setErrorMessage(null);
    setConfirmPasswordErrorMessage("");
  };

  const handleSubmit = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    let hasError = false;
    if (!values.password) {
      setPasswordErrorMessage("Password must be required");
      hasError = true;
    }
    if (!values.confirmpassword) {
      setConfirmPasswordErrorMessage("Confirm password must be required");
      hasError = true;
    }
    if (values.password && values.confirmpassword && values.password !== values.confirmpassword) {
      setErrorMessage("Password and confirm password not matched");
      hasError = true;
    }
    if (hasError) {
      setSubmitting(false);
      return;
    }

    refetch();

    if (data && data?.result?.TokenIsValid && !isFetching) {
      const requestUrl = `${process.env.NEXT_PUBLIC_WEB_URL}${restaurantinfo?.restaurantURL}`;
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
        const response = JSON.parse(res.d);

        if (response?.result?.ChangeSuccessfully) {
          handleNotify(
            response.result.PasswordMessage,
            ToasterPositions.TopRight,
            ToasterTypes.Success
          );

          const redirectPage =
            returnURL && returnURL !== "/" ? `/${returnURL}` : "/password-set";

          router.push(`/${selctedTheme?.url}/${dynamic}${redirectPage}`);
        } else {
          setSubmitting(false);
          handleNotify(
            response?.result?.PasswordMessage,
            ToasterPositions.TopRight,
            ToasterTypes.Error
          );
          setErrorMessage(response?.result?.PasswordMessage);
        }
      });
    } else {
      setSubmitting(false);
      handleNotify(
        "Token is not valid, please request again",
        ToasterPositions.TopRight,
        ToasterTypes.Error
      );
      setErrorMessage("Token is not valid, please request again");
    }
  };

  const handleClickHome = () => {
    router.push(
      `/${selctedTheme?.url}/${dynamic}/${restaurantinfo?.defaultLocation?.locationURL}`
    );
  };

  // Loading / error fallback
  if (isLoading || isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error loading token</div>;
  if (isSuccess && !data?.result?.TokenIsValid) return null;

  return (
    <div className="delivery-form py-2">
      <form className="row justify-content-center">
        <div className="col-lg-12 col-sm-12 col-12">
          <div className="delivery">
            {/* Email */}
            <div className="row mb-3">
              <div className="col-lg-4 text-start">
                <label>Email Address</label>
              </div>
              <div className="col-lg-7">
                <input className="form-control" type="text" disabled value={validEmailAddress} />
              </div>
            </div>

            {/* Phone */}
            <div className="row mb-3">
              <div className="col-lg-4 text-start">
                <label>Phone Number</label>
              </div>
              <div className="col-lg-7">
                <input className="form-control" type="text" disabled value={phoneNumber} />
              </div>
            </div>

            {/* Password */}
            <div className="row mb-3">
              <div className="col-lg-4 text-start">
                <label>Choose new Password</label>
              </div>
              <div className="col-lg-7">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={values.password}
                  onChange={passwordOnChange}
                  autoComplete="off"
                  required
                />
                {passwordErrorMessage && <span className="red-text">{passwordErrorMessage}</span>}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="row mb-3">
              <div className="col-lg-4 text-start">
                <label>Confirm Password</label>
              </div>
              <div className="col-lg-7">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Re-enter password"
                  value={values.confirmpassword}
                  onChange={confirmpasswordOnChange}
                  autoComplete="off"
                  required
                />
                {confirmPasswordErrorMessage && (
                  <span className="red-text">{confirmPasswordErrorMessage}</span>
                )}
                {errorMessage && <span className="red-text">{errorMessage}</span>}
              </div>
            </div>

            {/* Buttons */}
            <div className="row justify-content-start mt-4">
              <div className="offset-lg-4 col-lg-6 col-md-12 col-12">
                <div className="row">
                  <div className="col-lg-6 col-sm-6 col-12 mb-2 mb-lg-0">
                    <a className="btn-default w-100 cursor" onClick={handleSubmit}>
                      Continue
                    </a>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-12">
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
  );
};
export default CreatePasswordComponent;