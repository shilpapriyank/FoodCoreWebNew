import React from "react";
import { ButtonLoader } from "../../common/buttonloader.component";
import useRewardPoint from "../../customhooks/userewardpoint-hook";
import { CUSTOMER_TYPE, PromotionType } from "../../common/utility";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { ORDERDETAILPAGEMESSAGE } from "../helpers/static-message/orderdetail-message";

const OrderCharges = ({
  orderdetailCal,
  isProcessing,
  locatioId,
  HandleFullOrderClick,
  handleLocationDetails,
}: any) => {
  const currency = orderdetailCal.currencysymbol;
  const {
    handleInitialPoint,
    errorMessage,
    disabledText,
    redeemamount,
    redeempoint,
    point,
    amount,
    onchangerewardamount,
    onchangerewardpoint,
    maxRedeemAmount,
    onclickrewardsubmit,
    onClickRewardClear,
    totalRewardAmount,
  } = useRewardPoint();
  const { restaurantinfo } = useReduxData();
  const isSchoolProgramEnabled = restaurantinfo?.isSchoolProgramEnabled;

  const defaultLocation = restaurantinfo?.defaultLocation;
  return (
    <div className="col-lg-3 col-md-4 col-12">
      <div className="sidebar">
        {/* <div className="card orderbox">
                    <h5>ORDER READY FOR</h5>
                    <div className="order-time">7:00 AM<br /><span>(in 7 hours)</span></div>
                </div> */}
        <div className="card totalbox">
          {orderdetailCal?.customertype !== CUSTOMER_TYPE.SUBSCRIBE &&
            defaultLocation?.enableRewardPoint && (
              <>
                <h3 className="heading">Reward Points</h3>
                <p className="mb-0 fs-14">
                  You have <b className="color-green">{point}</b> reward points,
                  worth{" "}
                  <b className="color-green">
                    {currency}
                    {amount > 0 ? parseFloat(amount).toFixed(2) : 0}
                  </b>
                  .
                </p>
                <hr />
              </>
            )}
          {/* <div className="row mt-2 reward-points align-items-center">
                        <div className="col-lg-5 col-md-12 col-12 pe-lg-0">
                            <input type="text" className="form-control" placeholder="Enter $" />
                        </div>
                        <div className="col-lg-2 col-md-12 col-12 px-lg-0 text-center ortext fs-12">OR</div>
                        <div className="col-lg-5 col-md-12 col-12 ps-lg-0">
                            <input type="text" className="form-control" placeholder="Enter Points" />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-lg-6 mb-0 mb-lg-0 mb-md-2 col-md-12 col-6">
                            <button type="submit" className="btn-default w-100">OK</button>
                        </div>
                        <div className="col-lg-6 col-md-12 col-6">
                            <button type="submit" className="btn-default w-100">Clear</button>
                        </div>
                    </div> */}
          {orderdetailCal?.customertype !== CUSTOMER_TYPE.SUBSCRIBE && (
            <div className="table-responsive">
              <table className="table total-table mb-3">
                <tbody>
                  <tr>
                    <td className="text-end">
                      <b>{ORDERDETAILPAGEMESSAGE.SUB_TOTAL} :</b>
                    </td>
                    <td className="text-end">
                      {" "}
                      {currency} {orderdetailCal?.subTotal.toFixed(2)}
                    </td>
                  </tr>
                  {Number(orderdetailCal.promotioncal) > 0 && (
                    <tr>
                      <td className="text-end">
                        <b>
                          {" "}
                          {orderdetailCal?.promotionruletype ===
                          PromotionType.Fixed ? (
                            <>{`Promotion(${currency}${orderdetailCal?.promotioncal.toFixed(
                              2
                            )} )`}</>
                          ) : (
                            <>{`Promotion(${orderdetailCal?.promotionpercentage.toFixed(
                              2
                            )}%)`}</>
                          )}{" "}
                          :
                        </b>
                      </td>
                      <td className="text-end">
                        {" "}
                        -{currency} {orderdetailCal?.promotioncal.toFixed(2)}
                      </td>
                    </tr>
                  )}
                  {Number(orderdetailCal.redeemAmount) > 0 && (
                    <tr>
                      <td className="text-end">
                        <b>
                          {ORDERDETAILPAGEMESSAGE.REEDEM_POINTS} (
                          {orderdetailCal?.redeemPoints}) :
                        </b>
                      </td>
                      <td className="text-end">
                        {" "}
                        -{currency} {orderdetailCal?.redeemAmount.toFixed(2)}
                      </td>
                    </tr>
                  )}
                  {Number(orderdetailCal.discount) > 0 && (
                    <tr>
                      <td className="text-end">
                        <b>
                          {ORDERDETAILPAGEMESSAGE.DISCOUNT}
                          {orderdetailCal?.discountPer > 0
                            ? `(${orderdetailCal?.discountPer.toFixed(2)}%)`
                            : ""}{" "}
                          :
                        </b>
                      </td>
                      <td className="text-end">
                        -{currency} {orderdetailCal?.discount.toFixed(2)}
                      </td>
                    </tr>
                  )}
                  {Number(orderdetailCal.deliveryCharges) > 0 && (
                    <tr>
                      <td className="text-end">
                        {" "}
                        <b>{ORDERDETAILPAGEMESSAGE.DELIVERY} :</b>
                      </td>
                      <td className="text-end">
                        {currency}
                        {orderdetailCal.deliveryCharges.toFixed(2)}
                      </td>
                    </tr>
                  )}

                  <tr>
                    <td className="text-end">
                      <b>{ORDERDETAILPAGEMESSAGE.TOTAL_PRE_TAX} :</b>
                    </td>
                    <td className="text-end">
                      {currency}
                      {orderdetailCal?.preTaxAmount.toFixed(2)}
                    </td>
                  </tr>
                  {Number(orderdetailCal.hstTaxTotal) > 0 && (
                    <tr>
                      <td className="text-end">
                        <b>
                          {ORDERDETAILPAGEMESSAGE.HST_TAX} (
                          {orderdetailCal?.hstTaxPer}%) :
                        </b>
                      </td>
                      <td className="text-end">
                        {" "}
                        {currency} {orderdetailCal?.hstTaxTotal.toFixed(2)}
                      </td>
                    </tr>
                  )}
                  {Number(orderdetailCal.systemAccessFee) > 0 && (
                    <tr>
                      <td className="text-end">
                        <b>{ORDERDETAILPAGEMESSAGE.SYSTEM_ACCESS_FEE} :</b>
                      </td>
                      <td className="text-end">
                        {" "}
                        {currency} {orderdetailCal.systemAccessFee.toFixed(2)}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td className="text-end">
                      <b>{ORDERDETAILPAGEMESSAGE.TIP} :</b>
                    </td>
                    <td className="text-end">
                      {" "}
                      {currency} {orderdetailCal?.tip.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="white-text bg-green text-end">
                      <b className="color-white">
                        {ORDERDETAILPAGEMESSAGE.ORDER_TOTAL} :
                      </b>
                    </td>
                    <td className="white-text bg-green text-end">
                      <b className="color-white">
                        {currency} {orderdetailCal?.calculatedTotal.toFixed(2)}
                      </b>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {restaurantinfo?.defaultlocationId !== locatioId &&
          !isSchoolProgramEnabled ? (
            <>
              {
                <button
                  className="btn-default btn-orange w-100"
                  data-bs-target="#order-confirm-change"
                  data-bs-toggle="modal"
                  onClick={() => {
                    handleLocationDetails(locatioId, "fullOrder");
                  }}
                >
                  Repeat Entire Order
                </button>
              }
            </>
          ) : (
            <>
              {
                // isProcessing ?
                !isSchoolProgramEnabled && (
                  <ButtonLoader
                    isLoader={isProcessing}
                    isDisable={isProcessing}
                    textName={"Repeat Entire Order"}
                    handleClick={HandleFullOrderClick}
                  />
                )
                // <a className="btn-default w-100 button-disable" disabledClass="button-disable btn-default btn-orange w-100 non-cursor" >Processing....</a>
                //     : <a className="btn-default w-100" buttonClass="btn-default btn-orange w-100" onClick={HandleFullOrderClick}>Repeat Entire Order</a>
              }
            </>
          )}
          {/* <a className="btn-default w-100" href="checkout.html">Repeat Entire Order</a> */}
        </div>
      </div>
    </div>
  );
};

export default OrderCharges;
