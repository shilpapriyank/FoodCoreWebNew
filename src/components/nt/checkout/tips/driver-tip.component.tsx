import { ORDERTYPE } from "@/components/common/utility";
import React from "react";
import { CARTPAGEMESSAGE } from "../../helpers/static-message/cart-message";
import { TipObjectType } from "@/types/usetip-types/usetiphook.type";

const DriverTip: React.FC<{
  pickupordelivery: string;
  tipWarningMessage: string;
  tipamount: string;
  tipdatanew: TipObjectType[];
  tipdata: TipObjectType[];
  onchangetipamount: () => void;
  tipOnBlur: (isOnChange: boolean) => void;
  addtipclick: (data: TipObjectType) => void;
}> = ({
  pickupordelivery,
  tipWarningMessage,
  tipamount,
  tipdatanew,
  tipdata,
  onchangetipamount,
  tipOnBlur,
  addtipclick,
}) => {
  return (
    <>
      <h3 className="heading">
        {" "}
        {pickupordelivery === ORDERTYPE.Delivery
          ? CARTPAGEMESSAGE.TIP_YOU_DRIVER
          : CARTPAGEMESSAGE.TIP_YOUR_SERVER}{" "}
      </h3>
      <div className="row mt-0 tip-order align-items-center g-2">
        {tipdatanew != undefined &&
          tipdata != undefined &&
          tipdatanew.length >= 0 &&
          tipdata?.map((data, index) => {
            return (
              <div className="col-lg-2 col-md-3 col-4" key={index}>
                <a
                  key={Math.random()}
                  className={
                    data.value === true
                      ? " btn-default w-100 active"
                      : "btn-default w-100"
                  }
                  onClick={() => addtipclick(data)}
                >
                  {data.text + "%"}
                </a>
              </div>
            );
          })}

        <div className="col-lg-5 offset-lg-1 col-md-12 col-12">
          <span className="d-inline-block  me-1 fs-14">$</span>
          <input
            type="text"
            className="form-control d-inline-block"
            onChange={onchangetipamount}
            onBlur={() => tipOnBlur(false)}
            value={
              tipamount != undefined &&
              tipamount != "" &&
              parseFloat(tipamount) > 0
                ? tipamount
                : ""
            }
          />
        </div>
        {tipWarningMessage !== "" && (
          <span className="red-text">{tipWarningMessage}</span>
        )}
      </div>
    </>
  );
};
export default DriverTip;
