import { ToasterPositions } from "@/components/default/helpers/toaster/toaster-positions";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type PositionType = (typeof ToasterPositions)[keyof typeof ToasterPositions];

type ToastNotifyProps = {
  position: PositionType;
};

function ToastNotify({ position }: ToastNotifyProps) {
  return (
    <>
      <ToastContainer
        position={position}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: "99999" }}
      />
    </>
  );
}

export default ToastNotify;
