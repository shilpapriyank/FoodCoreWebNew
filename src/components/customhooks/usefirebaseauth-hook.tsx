"use client";

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
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

  // Initialize Firebase App safely
  const intializeFirebaseApp = (): FirebaseApp | null => {
    const config = restaurantinfo?.firebaseConfig;

    if (!config) {
      console.warn("Firebase config is missing");
      return null;
    }

    // Map to correct Firebase key names
    const firebaseConfig = {
      apiKey: config.apikey,
      authDomain: config.authdomain,
      projectId: config.projectId,
      storageBucket: config.storagebucket,
      messagingSenderId: config.messagingsenderId,
      appId: config.appId,
      measurementId: config.measurementId,
    };

    // Validate required keys
    if (!firebaseConfig.apiKey || !firebaseConfig.authDomain) {
      console.error("Invalid Firebase config:", firebaseConfig);
      return null;
    }

    console.log("Initializing Firebase with:", firebaseConfig);

    try {
      if (!getApps().length) {
        return initializeApp(firebaseConfig);
      } else {
        return getApp();
      }
    } catch (error) {
      console.error("Firebase initialization failed:", error);
      return null;
    }
  };

  // Initialize Recaptcha (Invisible)
  const initializeRecaptcha = (): void => {
    const auth = getAuth();
    auth.languageCode = "en";

    if (window.recaptchaVerifier) return; // Prevent re-init

    try {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("reCAPTCHA verified");
          },
          "expired-callback": () => {
            console.warn("reCAPTCHA expired");
          },
        }
      );

      // Render after small delay
      setTimeout(() => {
        window.recaptchaVerifier.render().then((widgetId: number) => {
          window.recaptchaWidgetId = widgetId;
        });

        const $ = (window as any).$;
        if ($) {
          $("#recaptcha-container").css({
            transform: "scale(0.77)",
            "-webkit-transform": "scale(0.77)",
            "transform-origin": "0 0",
            "-webkit-transform-origin": "0 0",
          });
          $("#recaptcha-container #rc-anchor-container").css("width", "250px");
        }
      }, 500);
    } catch (err) {
      console.error("reCAPTCHA init error:", err);
    }
  };

  // Verify Recaptcha if needed
  const intializeRecaptchaVerified = (): void => {
    const auth = getAuth();
    auth.languageCode = "en";

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
            console.log("reCAPTCHA verified");
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
    const app = intializeFirebaseApp();
    if (!app) {
      handleNotify(
        "Firebase not initialized correctly.",
        ToasterPositions.TopRight,
        ToasterTypes.Error
      );
      return false;
    }

    const auth = getAuth(app);

    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        dialCode + phone,
        window.recaptchaVerifier
      );
      window.confirmationResult = confirmationResult;
      return true;
    } catch (error: any) {
      console.error("OTP send failed:", error);
      handleNotify(
        error.message || "Network error. Please check your connection.",
        ToasterPositions.TopRight,
        ToasterTypes.Error
      );
      return false;
    }
  };

  // Validate OTP
  const handleValidateOTP = async (OTP: string): Promise<boolean> => {
    try {
      await window.confirmationResult.confirm(OTP);
      return true;
    } catch (err: any) {
      handleNotify(
        err.message || "Invalid OTP.",
        ToasterPositions.TopRight,
        ToasterTypes.Error
      );
      return false;
    }
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
