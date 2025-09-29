import { BUTTON_TYPE_ENUM } from "@/components/common/enums";
import React, { ReactNode } from "react";

export const ButtonLoader: React.FC<{
  textName: string;
  isLoader: boolean;
  classname: string;
  btnType: BUTTON_TYPE_ENUM;
  isDisable: boolean;
  handleClick: () => void;
  children: ReactNode;
}> = ({
  textName,
  isLoader,
  classname,
  btnType,
  isDisable,
  handleClick,
  children,
}) => {
  return (
    <>
      {!isDisable ? (
        <>
          <button
            type={btnType}
            className={"btn-default w-100"}
            disabled={isDisable}
            onClick={handleClick}
          >
            {children} {textName}
          </button>
        </>
      ) : (
        <>
          <button
            type={btnType}
            className={"btn-default w-100 greyColor pe-none"}
            disabled={isDisable}
            onClick={handleClick}
          >
            {children} {textName}&nbsp;&nbsp;
            {isLoader && (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  aria-hidden="true"
                />
                <span className="visually-hidden" role="status">
                  Loading...
                </span>
              </>
            )}
          </button>
        </>
      )}
    </>
  );
};
