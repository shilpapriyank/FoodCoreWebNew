import React, { useEffect, useState } from "react";
import { closeModal, GetThemeDetails } from "../../common/utility";

const ThreeDSecureComponent = ({
  returnUrl,
  loadModal,
  paymentMethodId,
  handleLoadModal,
  paymentIntentId,
  handle3dComplete,
  clientSecret,
  restaurantinfo,
  handlePaymentResponse,
  reload,
  stripe,
  confirmPayment,
}: any) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [paymentObj, setPaymentObj] = useState(null);
  const [isProcessRunning, setIsProcessRunning] = useState<boolean>(false);
  var isclicked = false;
  const [tryAgainClicked, setTryAgainClicked] = useState<boolean>(false);
  const themeURL = GetThemeDetails(restaurantinfo?.themetype);

  useEffect(() => {
    if (returnUrl) {
      setErrorMessage("");
      createIframe(returnUrl);
    }
  }, [returnUrl]);

  const createIframe = (returnUrl: any) => {
    if (returnUrl && returnUrl !== "" && !loadModal) {
      var iframe = document.createElement("iframe");
      iframe.id = "threed-iframe";
      iframe.src = returnUrl;
      iframe.width = "500";
      iframe.height = "600";
      var divcontainer3d = document.getElementById("div3dsecurepage");
      if (divcontainer3d !== null) {
        divcontainer3d.style.display = "";

        divcontainer3d.appendChild(iframe);
        handleLoadModal(true);
        const threeDmodal = document.getElementById("three-d-modal");
        threeDmodal?.click();
      }
    }
  };

  window.addEventListener(
    "message",
    function (ev) {
      ev.stopPropagation();

      if (ev.data !== "3DS-authentication-complete") return;

      console.log(ev.data);
      if (
        ev.data === "3DS-authentication-complete" &&
        isProcessRunning === false
      ) {
        console.log("open 3d secure");
        handle3dComplete();
      }
    },
    false
  );

  const tryAgainHandle = () => {
    if (!isclicked && !tryAgainClicked) {
      setTryAgainClicked(true);
      isclicked = true;
      closeModal("btn-close");
      handlePaymentResponse(paymentObj, false, null, true);
    }
  };

  return (
    <div
      className={`${
        errorMessage === ""
          ? "modal-dialog modal-dialog-centered modal-dialog-payment marginLeft"
          : "modal-dialog modal-dialog-centered modal-dialog-payment"
      }`}
    >
      <div
        id="modal-payment"
        className={`${
          errorMessage === ""
            ? "modal-content modal-dialog-payment "
            : "modal-content modal-dialog-payment minWidth "
        }`}
      >
        <div className="modal-header">
          {errorMessage && errorMessage !== "" && (
            <h5 className="modal-title" id="login-modal-Label">
              Error
            </h5>
          )}
          <button
            type="button"
            className="btn-close d-none"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <div id="div3dsecurepage"> </div>
          {errorMessage !== "" && (
            <>
              <div className="row justify-content-center">
                <div className="col-lg-12 col-md-12 col-12">
                  <div id="errormessage" className="error">
                    {" "}
                    {errorMessage}{" "}
                  </div>
                </div>

                <button
                  className="btn-default btn-orange w-50 margin-top-30"
                  onClick={tryAgainHandle}
                >
                  {" "}
                  Try again
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThreeDSecureComponent;
