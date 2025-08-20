import React, { ReactNode } from "react";

interface ButtonComponentProps {
  textName?: string;
  classname?: string;
  btnType?: "button" | "submit" | "reset";
  isDisable?: boolean;
  handleClick?: () => void;
  children?: ReactNode;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  textName,
  classname = "",
  btnType = "button",
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
