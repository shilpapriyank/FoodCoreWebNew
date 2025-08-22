"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import handleNotify from "../default/helpers/toaster/toaster-notify";
import { ToasterPositions } from "../default/helpers/toaster/toaster-positions";
import { useReduxData } from "./useredux-data-hooks";
import { ToasterTypes } from "../default/helpers/toaster/toaster-types";

// Extend window object
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    recaptchaWidgetId: number;
    confirmationResult: ConfirmationResult;
  }
}

const useFireBaseAuth = () => {
  const { restaurantinfo } = useReduxData();

  const apiKey: string | undefined = restaurantinfo?.firebaseConfig?.apikey;
  const authDomain: string | undefined =
    restaurantinfo?.firebaseConfig?.authdomain;

  // Initialize Firebase App
  const intializeFirebaseApp = (): void => {
    if (!apiKey || !authDomain) {
      console.warn("Firebase config is missing");
      return;
    }

    if (!getApps().length) {
      initializeApp({
        apiKey,
        authDomain,
      });
    } else {
      getApp(); // Optional: just ensures it's initialized
    }
  };

  // Initialize Recaptcha
  const initializeRecaptcha = (): void => {
    const auth = getAuth();
    auth.languageCode = "en";

    // ✅ Prevent re-initialization
    if (window.recaptchaVerifier) {
      return;
    }

    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          // Captcha solved
        },
        "expired-callback": () => {
          // Expired
        },
      }
    );

    setTimeout(() => {
      window.recaptchaVerifier.render().then((widgetId: number) => {
        window.recaptchaWidgetId = widgetId;
      });

      const $ = (window as any).$;
      if ($) {
        $("#recaptcha-container").css("transform", "scale(0.77)");
        $("#recaptcha-container").css("-webkit-transform", "scale(0.77)");
        $("#recaptcha-container").css("transform-origin", "0 0");
        $("#recaptcha-container").css("-webkit-transform-origin", "0 0");
        $("#recaptcha-container #rc-anchor-container").css("width", "250px");
      }
    }, 500);
  };

  // Safe reCAPTCHA re-initialization
  const intializeRecaptchaVerified = (): void => {
    const auth = getAuth();
    auth.languageCode = "en";

    // ✅ Prevent double init
    if (window.recaptchaVerifier) return;

    setTimeout(() => {
      const container = document.getElementById("recaptcha-container");
      if (
        typeof window !== "undefined" &&
        container &&
        !container.hasChildNodes()
      ) {
        const recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
          }
        );
        window.recaptchaVerifier = recaptchaVerifier;

        recaptchaVerifier.render().then(() => {
          recaptchaVerifier.verify().then(() => {
            // Verified
          });
        });
      }
    }, 500);
  };

  // Send OTP
  const handleSendOTP = async (
    dialCode: string,
    phone: string
  ): Promise<boolean> => {
    const auth = getAuth();

    return new Promise((resolve, reject) => {
      signInWithPhoneNumber(auth, dialCode + phone, window.recaptchaVerifier)
        .then((confirmationResult: ConfirmationResult) => {
          window.confirmationResult = confirmationResult;
          resolve(true);
        })
        .catch((error: any) => {
          handleNotify(
            error.message,
            ToasterPositions.TopRight,
            ToasterTypes.Error
          );
          reject(false);
        });
    });
  };

  // Validate OTP
  const handleValidateOTP = async (OTP: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      window.confirmationResult
        .confirm(OTP)
        .then(() => {
          resolve(true);
        })
        .catch((err: any) => {
          handleNotify(
            err.message,
            ToasterPositions.TopRight,
            ToasterTypes.Error
          );
          reject(false);
        });
    });
  };

  return {
    intializeFirebaseApp,
    initializeRecaptcha,
    intializeRecaptchaVerified,
    handleSendOTP,
    handleValidateOTP,
  };
};

export default useFireBaseAuth;
