import React, { ReactNode } from "react";
import { BUTTON_TYPE_ENUM } from "./enums";

interface ButtonComponentProps {
  textName?: string;
  classname?: string;
  // btnType?: "button" | "submit" | "reset";
  btnType?: BUTTON_TYPE_ENUM;
  isDisable?: boolean;
  handleClick?: () => void;
  children?: ReactNode;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  textName,
  classname = "",
  // btnType = "button",
  btnType = BUTTON_TYPE_ENUM.BUTTON,
  isDisable = false,
  handleClick,
  children,
}) => {
  return (
    <button
      type={btnType}
      className={classname}
      disabled={isDisable}
      onClick={handleClick}
    >
      {children} {textName}
    </button>
  );
};

export default ButtonComponent;
