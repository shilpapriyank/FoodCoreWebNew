"use client";

import React, { useEffect, useState } from "react";
import { PAGES } from "../common/pages";
import ThreeDSecureComponent from "./3dsecure.component";
import { GetCurrency, GetThemeDetails } from "../../common/utility";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  afterPaymentSuccess,
  deleteCartItemFromSessionId,
  emptycart,
  setOrderInstruction,
  updateCartItemCount,
} from "../../../../redux/cart/cart.slice";
import { v4 as uuidv4 } from "uuid";
import { createSessionId } from "../../../../redux/session/session.slice";
import { setrewardpoint } from "../../../../redux/rewardpoint/rewardpoint.slice";
import { resetOrders } from "../../../../redux/order/order.slice";
import { resetMenuitem } from "../../../../redux/menu-item/menu-item.slice";
import { CartServices } from "../../../../redux/cart/cart.services";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  PaymentRequestButtonElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import {
  PaymentMethodResult,
  PaymentRequest,
  StripeError,
} from "@stripe/stripe-js";
import { GetAllRestaurantInfo } from "@/types/restaurant-types/restaurant.type";
import { PaymentType } from "@/types/cart-types/cartservice.type";

const CardPaymentComponent: React.FC<{
  clientSecret: string;
  paymentIntentId: string;
  orderId: number;
  calculatedTotal: string;
  cardShowMessage: string;
  restaurantinfo: GetAllRestaurantInfo;
  GooglePayEnable: boolean;
  ApplePayEnable: boolean;
  stripePublishKey: string;
}> = ({
  clientSecret,
  paymentIntentId,
  orderId,
  calculatedTotal,
  cardShowMessage,
  restaurantinfo,
  GooglePayEnable,
  ApplePayEnable,
  stripePublishKey,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();
  const router = useRouter();
  var currencysymbol = GetCurrency();
  var countrycode = restaurantinfo?.defaultLocation?.countrycode;
  const [error, setError] = useState<StripeError | "">("");
  const [errorMessage, setErrorMessage] = useState<string | "">("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethodId, setPaymentMethodId] = useState<string>("");
  const [cardHolderName, setCardHolderName] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(
    null
  );
  const [loadThreeDModal, setLoadThreeDModal] = useState<boolean>(false);
  const [returnUrl, setReturnUrl] = useState<string>("");
  const [is3dFail, setis3dFail] = useState<boolean>(false);
  const [reload, setReload] = useState<number>(0);
  let sessionId = useAppSelector(({ session }) => session?.sessionid);
  let rewardpoint = useAppSelector(({ rewardpoints }) => rewardpoints);
  const [is3DComplete, setis3DComplete] = useState<boolean>(false);
  const params = useParams();
  const [load, setload] = useState<boolean>(true);
  const [loadModal, setLoadModal] = useState<boolean>(false);
  const { dynamic, location } = params;
  const themeURL = GetThemeDetails(restaurantinfo?.themetype)?.url;
  const locationUrl = "/" + themeURL + "/" + dynamic + "/" + location;

  const CARD_OPTIONS = {
    style: {
      base: {
        "::placeholder": {
          color: "#BEBEBE",
        },
      },
      invalid: {
        iconColor: "red",
        color: "red",
      },
    },
    showIcon: true,
  };

  useEffect(() => {
    if (!stripePublishKey) {
      setErrorMessage("Stripe is not configured, Please contact administrator");
    }

    if (!clientSecret) {
      return;
    }

    if (!stripe) {
      return;
    }
    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }: any) => {
        if (paymentIntent) {
          switch (paymentIntent.status) {
            case "succeeded":
              setMessage("Payment succeeded!");
              break;
            case "processing":
              setMessage("Your payment is processing.");
              break;
            case "requires_payment_method":
              //setMessage("Your payment was not successful, please try again.");
              break;
            default:
              setMessage("Something went wrong.");
              break;
          }
        }
      });
  }, [stripe]);

  // google pay
  //https://www.netlify.com/blog/2020/05/21/learn-to-add-apple-pay-and-google-pay-to-react-websites/
  //https://stripe.com/docs/stripe-js/elements/payment-request-button?client=react
  //https://stripe.com/docs/stripe-js/elements/payment-request-button?html-or-react=react

  useEffect(() => {
    // Load only when Googlepay and apple pay enabled from configuration
    if (stripe && (GooglePayEnable === true || ApplePayEnable === true)) {
      const pr = stripe.paymentRequest({
        country: countrycode,
        currency: "cad",
        total: {
          label: "Payment",
          amount: Math.round(Number(calculatedTotal) * 100),
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });
      // Check the availability of the Payment Request API first.
      pr.canMakePayment().then((result) => {
        if (result) {
          pr.on("paymentmethod", handlePaymentMethodReceived);
          setPaymentRequest(pr);
          //pr.on("complete", handlePaymentCancel);
        }
      });
    }
  }, [stripe]);

  const createMethod = async () => {
    if (!stripe || !elements) return;
    const paymentElement = elements.getElement(CardNumberElement);
    if (!paymentElement) return;
    const data = await stripe.createPaymentMethod({
      type: "card",
      card: paymentElement,
      billing_details: {
        name: cardHolderName,
        address: {
          postal_code: zipCode,
        },
      },
    });
    return data;
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (is3DComplete) {
      stripe.retrievePaymentIntent(clientSecret).then((data: any) => {
        if (data?.paymentIntent?.status === "succeeded") {
          confirmPayment(
            data?.paymentIntent?.payment_method,
            false,
            data?.paymentIntent?.payment_method
          );
        } else if (data?.paymentIntent?.status === "requires_payment_method") {
          //remove iframe
          const closeBtn = document.querySelector(
            ".btn-close"
          ) as HTMLButtonElement;
          if (closeBtn) {
            closeBtn.click();
          }
          const threeDFrame = document.getElementById("threed-iframe");
          if (threeDFrame) {
            threeDFrame.remove();
          }
          setis3dFail(true);
          setErrorMessage(
            data?.paymentIntent?.last_payment_error?.message as string
          );
          setis3DComplete(false);
        } else {
        }
      });
    }
  }, [is3DComplete]);

  const handle3dComplete = () => {
    setis3DComplete(true);
  };
  const handlePaymentCancel = (result: any) => {
    result.complete("fail");
  };

  const handlePaymentMethodReceived = (result: any) => {
    if (result) {
      if (
        result?.paymentMethod !== null &&
        result?.paymentMethod !== undefined
      ) {
        confirmPayment(result.paymentMethod.id, true, result);
      }
    }
  };

  function handlePaymentResponse(
    payment: PaymentType,
    isWallet: boolean,
    paymentmethod: any,
    isThreedPayment?: boolean
  ) {

    if (payment?.issuccess === true && payment?.status === "succeeded") {
      const closeBtn = document.querySelector(
        ".btn-close"
      ) as HTMLButtonElement;
      if (closeBtn) {
        closeBtn.click();
      }

      afterPaymentSuccess(restaurantinfo.restaurantId, orderId, 0);

      deleteCartItemFromSessionId({
        cartsessionId: sessionId as string,
        restaurantId: restaurantinfo.restaurantId,
        locationId: restaurantinfo?.defaultlocationId,
      });
      //   dispatch({
      //     type: CartTypes.DELETE_CART_ITEM_FROM_SESSIONID,
      //     payload: null,
      //   });
      emptycart();

      let sessionid = uuidv4();
      dispatch(createSessionId(sessionid));

      if (rewardpoint !== undefined) {
        let rewardpoints = {
          rewardvalue: rewardpoint.rewardvalue,
          rewardamount: rewardpoint.rewardamount,
          rewardPoint: rewardpoint.rewardPoint,
          totalRewardPoints: rewardpoint.rewardPoint,
          redeemPoint: 0,
        };
        // dispatch({
        //   type: RewardPointTypes.SET_REWARD_POINT,
        //   payload: rewardpoints,
        // });
        dispatch(setrewardpoint(rewardpoints));
      }
      updateCartItemCount();
      setOrderInstruction("");
      //   dispatch({
      //     type: CartTypes.EMPTY_ORDER_INFO,
      //     payload: null,
      //   });
      dispatch(resetOrders());
      dispatch(resetMenuitem());

      if (isWallet) {
        //close popup
        paymentmethod.complete("success");
        setTimeout(() => {
          router.push(locationUrl + "/" + PAGES.THANK_YOU);
        }, 500);
      } else {
        router.push(locationUrl + "/" + PAGES.THANK_YOU);
      }
    } else if (payment?.status === "requires_action") {
      setIsLoading(false);
      handleLoadModal(false);
      setLoadThreeDModal(true);
      setReturnUrl(payment.url);
    } else if (
      isThreedPayment !== undefined &&
      isThreedPayment === true &&
      payment?.status === "requires_payment_method"
    ) {
      setLoadThreeDModal(false);
      setIsLoading(false);
    } else {
      setIsLoading(false);

      setErrorMessage(payment?.message);
      setMessage(payment?.message);
      if (isWallet) {
        paymentmethod.complete("fail");
      }
    }
  }

  function confirmPayment(
    paymentMethodIdTemp?: any,
    isWallet?: boolean,
    paymentmethod?: any
  ) {
    if (paymentMethodIdTemp !== "") {
      setPaymentMethodId(paymentMethodIdTemp);
      let threeDPopupLoadPageURL =
        window.location.origin +
        "/" +
        themeURL +
        "/" +
        dynamic +
        "/securepayment";
      CartServices.updateAndConfirmPayment(
        restaurantinfo.restaurantId,
        orderId,
        paymentIntentId,
        paymentMethodIdTemp,
        threeDPopupLoadPageURL
      ).then((response) => {
        handlePaymentResponse(
          response.payment,
          isWallet as boolean,
          paymentmethod
        );
      });
    }
  }

  const handleRedirectCheckout = () => {
    router.push(locationUrl + "/" + PAGES.CART);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setErrorMessage("");
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    if (!cardHolderName) {
      setErrorMessage("Card holder name required");
      return;
    } else if (!zipCode) {
      setErrorMessage("Zip code is required");
      return;
    }
    setIsLoading(true);
    const paymentElement = elements.getElement(CardNumberElement);

    let paymentMethodIdTemp = "";

    //Google pay helpful links
    //https://stripe.com/docs/js/payment_methods/create_payment_method
    //https://stripe.com/docs/payments/quickstart?client=next#next-steps
    //https://stripe.com/docs/js/element/payment_element
    //https://github.com/stripe/react-stripe-js/blob/master/examples/hooks/2-Split-Card.js
    let result: PaymentMethodResult | undefined;
    result = await createMethod();
    if (result && result?.paymentMethod?.id) {
      paymentMethodIdTemp = result.paymentMethod.id;
      setMessage(result.paymentMethod.id);
      var confirm = confirmPayment(paymentMethodIdTemp);
    } else if (result && result.error) {
      if (
        result.error.type === "card_error" ||
        result.error.type === "validation_error"
      ) {
        setErrorMessage(result.error.message as string);
        setIsLoading(false);
      }
    }

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message as string);
        setErrorMessage(error.message as string);
        setIsLoading(false);
      }
    }
  };

  const handleLoadModal = (value: boolean) => {
    setLoadModal(value);
  };
  return (
    <>
      <section className="menu-options right-sticky my-profile">
        <div className="container payment-form">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-md-8 offset-md-2">
                  <div className="card">
                    <div className="card-header">Payment details</div>
                    <div className="card-body">
                      {/* GooglePay */}
                      {GooglePayEnable === true && paymentRequest && (
                        <div className="paymentchanges col-md-4 offset-md-4 d-flex justify-content-center">
                          <PaymentRequestButtonElement
                            options={{ paymentRequest }}
                          />
                        </div>
                      )}

                      <form
                        className="form-horizontal"
                        role="form"
                        id="signupform"
                        onSubmit={handleSubmit}
                      >
                        {cardShowMessage && (
                          <div
                            className="alert alert-warning margin-bottom-15"
                            role="alert"
                          >
                            {" "}
                            <b> Warning:</b>{" "}
                            <>
                              <br />
                              {cardShowMessage}
                            </>{" "}
                          </div>
                        )}

                        {errorMessage && (
                          <div
                            className="alert alert-danger margin-bottom-15"
                            role="alert"
                          >
                            <b> Error:</b>
                            <>
                              <br />
                              <RawHTML>{errorMessage}</RawHTML>
                            </>
                          </div>
                        )}

                        <div className="row card-input">
                          <div className="row form-group">
                            <label
                              htmlFor="cardholdername"
                              className="col-md-5 control-label"
                            >
                              {" "}
                              <b>Card holder name</b>
                            </label>
                            <div className="col-md-5">
                              {/* <input className="form-control" id="card-holder" name="card_holder" placeholder="John Smith" required /> */}
                              <input
                                id="card-holder"
                                name="card_holder"
                                className="form-control"
                                placeholder="John Smith"
                                value={cardHolderName}
                                onChange={(e) =>
                                  setCardHolderName(e.target.value)
                                }
                                required
                              />
                            </div>
                            <div className="col-md-2"></div>
                          </div>

                          <div className="row form-group">
                            <label
                              htmlFor="cardnumber"
                              className="col-md-5 control-label"
                            >
                              {" "}
                              <b>Card number</b>
                            </label>
                            <div className="col-md-5">
                              {/* <input className="form-control" placeholder="1234 1234 1234 1234" name="phone" required />  */}
                              <CardNumberElement
                                className="form-control grey-pl"
                                options={CARD_OPTIONS}
                              />
                            </div>
                            <div className="col-md-2"></div>
                          </div>

                          <div className="row form-group">
                            <label
                              htmlFor="expirydate"
                              className="col-md-5 control-label"
                            >
                              {" "}
                              <b>Expiry date</b>
                            </label>
                            <div className="col-md-3">
                              {/* <input className="form-control" placeholder="00/00" name="expiry" required />   */}
                              <CardExpiryElement
                                className="form-control"
                                options={CARD_OPTIONS}
                              />
                            </div>
                            <div className="col-md-4"></div>
                          </div>

                          <div className="row form-group">
                            <label
                              htmlFor="cvc"
                              className="col-md-5 control-label"
                            >
                              {" "}
                              <b>CVC</b>
                            </label>
                            <div className="col-md-3">
                              {/* <input className="form-control" placeholder="000" name="cvc" required />  */}
                              <CardCvcElement
                                className="form-control"
                                options={CARD_OPTIONS}
                              />
                            </div>
                            <div className="col-md-4"></div>
                          </div>

                          <div className="row form-group">
                            <label
                              htmlFor="postalcode"
                              className="col-md-5 control-label"
                            >
                              {" "}
                              <b>Postal code</b>
                            </label>
                            <div className="col-md-5">
                              {/* <input className="form-control" placeholder="Postal Code" name="postalcode" required />  */}
                              <input
                                id="postal-code"
                                name="card_holder"
                                className="form-control"
                                placeholder="Postal code"
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                                required
                              />
                            </div>
                            <div className="col-md-2"></div>
                          </div>
                          <div className="row margin-top-15">
                            <div className="col-12 text-center">
                              {isLoading || !stripePublishKey ? (
                                <>
                                  <button
                                    id="btn-signup"
                                    className="btn-default button-disable"
                                    disabled
                                  >
                                    {" "}
                                    <i className="icon-hand-right"></i> Pay Now{" "}
                                    {currencysymbol}
                                    {calculatedTotal}{" "}
                                  </button>
                                  <button
                                    id="btn-cancel"
                                    type="button"
                                    className="btn-default black button-disable"
                                    onClick={handleRedirectCheckout}
                                  >
                                    <i className="icon-hand-right"></i> Cancel
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    id="btn-signup"
                                    type="submit"
                                    className="btn-default"
                                  >
                                    {" "}
                                    <i className="icon-hand-right"></i> Pay Now{" "}
                                    {currencysymbol}
                                    {calculatedTotal}{" "}
                                  </button>
                                  <button
                                    id="btn-cancel"
                                    type="button"
                                    className="btn-default black"
                                    onClick={handleRedirectCheckout}
                                  >
                                    <i className="icon-hand-right"></i> Cancel
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 offset-lg-4 offset-3 margin-top-30 col-6 mt-4">
                          <img
                            className=""
                            src="/dominos/img/stripe-button.svg"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <a
        className="three-d-secure not-uppercase d-none"
        id="three-d-modal"
        href="#"
        data-bs-toggle="modal"
        data-bs-target="#three-d-secure-modal"
      >
        {" "}
        show modal{" "}
      </a>
      <div
        className="modal fade"
        id="three-d-secure-modal"
        aria-labelledby="restaurant-locations-modal-Label"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          {loadThreeDModal && (
            <ThreeDSecureComponent
              loadModal={loadModal}
              handleLoadModal={handleLoadModal}
              handle3dComplete={handle3dComplete}
              paymentMethodId={paymentMethodId}
              returnUrl={returnUrl}
              paymentIntentId={paymentIntentId}
              clientSecret={clientSecret}
              restaurantinfo={restaurantinfo}
              handlePaymentResponse={handlePaymentResponse}
              reload={reload}
              stripe={stripe}
              confirmPayment={confirmPayment}
            />
          )}
        </div>
      </div>
    </>
  );
};

const RawHTML = ({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) => (
  <div
    className={className}
    dangerouslySetInnerHTML={{ __html: children.replace(/\n/g, "<br />") }}
  />
);

export default CardPaymentComponent;
