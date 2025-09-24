import React, { RefObject, useEffect, useState } from "react";

const RewardPoint: React.FC<{
  point: number;
  disabledText: boolean;
  currency: string;
  inputRP: RefObject<HTMLInputElement>;
  amount: string;
  maxRedeemAmount: string;
  redeemamount: string;
  redeempoint: string;
  totalRewardAmount: string;
  subTotalWithDiscount: number;
  onchangerewardamount: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onchangerewardpoint: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onclickrewardsubmit: () => void;
  onClickRewardClear: () => void;
  errorMessage: string;
}> = ({
  point,
  disabledText,
  currency,
  inputRP,
  amount,
  maxRedeemAmount,
  redeemamount,
  redeempoint,
  totalRewardAmount,
  subTotalWithDiscount,
  onchangerewardamount,
  onchangerewardpoint,
  onclickrewardsubmit,
  onClickRewardClear,
  errorMessage,
}) => {
  return (
    <>
      <h3 className="heading mb-1">Reward Points</h3>
      <p className="mb-0 fs-14">
        You have <b className="color-green">{point}</b> reward points, worth{" "}
        <b className="color-green">
          {currency}
          {Number(amount) > 0 ? parseFloat(amount).toFixed(2) : 0}
        </b>
        .
      </p>

      {subTotalWithDiscount != undefined &&
        Number(totalRewardAmount) > subTotalWithDiscount && (
          <p className="mb-1">
            <br />
            You can redeem reward points worth{" "}
            <b>
              {currency}
              {maxRedeemAmount}
            </b>
            .
          </p>
        )}

      <div className="row mt-2 reward-points align-items-center">
        <div className="col-lg-5 col-md-12 col-12 pe-lg-0">
          {/* <input type="text" className="form-control" placeholder="Enter $" /> */}
          <input
            type="text"
            className="form-control"
            placeholder="Enter $"
            value={
              Number(redeemamount) === 0 ? "" : redeemamount ? redeemamount : ""
            }
            onChange={(event) => onchangerewardamount(event)}
            disabled={disabledText === true ? true : point <= 0 ? true : false}
          />
        </div>
        <div className="col-lg-2 col-md-12 col-12 px-lg-0 text-center ortext fs-12">
          OR
        </div>
        <div className="col-lg-5 col-md-12 col-12 ps-lg-0">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Points"
            ref={inputRP}
            value={
              Number(redeempoint) === 0 ? "" : redeempoint ? redeempoint : ""
            }
            onChange={(event) => onchangerewardpoint(event)}
            disabled={disabledText === true ? true : point <= 0 ? true : false}
          />
        </div>

        <div id="errormessage" className="text-align-center">
          {" "}
          {errorMessage && errorMessage}{" "}
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-6 mb-0 mb-lg-0 mb-md-2 col-md-12 col-6">
          <button
            type="submit"
            className="btn-default w-100"
            onClick={() => onclickrewardsubmit()}
          >
            OK
          </button>
        </div>
        <div className="col-lg-6 col-md-12 col-6">
          <button
            type="submit"
            className="btn-default w-100"
            onClick={() => onClickRewardClear()}
          >
            Clear
          </button>
        </div>
      </div>
      <hr className="my-2" />
    </>
  );
};
export default RewardPoint;
