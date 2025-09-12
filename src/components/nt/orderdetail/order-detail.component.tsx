import React from "react";
import { ORDERSTATUS } from "../../common/utility";
import OrderItem from "./order-item.component";

const OrderDetail = ({
  orderdetailCal,
  locatioId,
  orderdetails,
  handleLocationDetails,
  handleOrderClick,
  orderId,
  HandleFullOrderClick,
  isProcessing,
  defaultLocation,
  currency,
}: any) => {
  return (
    <>
      <div className="order-details">
        <div className="row ms-auto me-auto">
          <div className="col-lg-12 mb-4 col-md-12 col-12">
            <p className="small-heading lh-1 fs-18">
              <span className="fs-13 color-black">{orderdetailCal?.date}</span>
              <br />
              <span className="fw-medium color-grey uppercase-inherit fs-12">
                Order No.{" "}
                {orderdetailCal != undefined && orderdetailCal?.orderNo}
              </span>
            </p>
          </div>
        </div>
        <div className="row ms-auto me-auto">
          <div className="col-lg-3 col-md-3 col-12">
            <p className="fs-13 mb-3">
              Type
              <br />
              <b className="color-green all-caps">
                {orderdetailCal.orderTypeText}
              </b>
            </p>
          </div>
          <div className="col-lg-3 col-md-3 col-12">
            <p className="fs-13 mb-3">
              {/* Status<br /><b className="color-red all-caps">Failed</b> */}
              {orderdetailCal?.trackingurl === null ? "Status" : "Tracking url"}
              <br />
              {orderdetailCal?.trackingurl === null ? (
                <>
                  {orderdetailCal != undefined &&
                    orderdetailCal?.orderStatus && (
                      <>
                        {orderdetailCal?.orderStatus.toLowerCase() ===
                          ORDERSTATUS.FAILED.toLowerCase() ||
                        orderdetailCal?.orderStatus.toLowerCase() ===
                          ORDERSTATUS.CANCEL.toLowerCase() ? (
                          <>
                            <b className="color-red all-caps">
                              {orderdetailCal?.orderStatus}
                            </b>
                          </>
                        ) : orderdetailCal?.orderStatus.toLowerCase() ===
                          ORDERSTATUS.INCOMPLETE.toLowerCase() ? (
                          <b className="orange-text all-caps">
                            {orderdetailCal?.orderStatus}
                          </b>
                        ) : (
                          <b className="green-text all-caps">
                            {orderdetailCal?.orderStatus}
                          </b>
                        )}
                      </>
                    )}
                </>
              ) : (
                <b className="all-caps text-primary">
                  <a
                    href={`${orderdetailCal?.trackingurl}`}
                    className="text-primary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa fa-truck" rel="noreferrer"></i>{" "}
                    {orderdetailCal?.deliverystatus}
                  </a>
                </b>
              )}
            </p>
          </div>
          <div className="col-lg-4 col-md-6 col-12">
            {(orderdetailCal?.orderStatus === "Failed" ||
              orderdetailCal?.orderStatus === "Cancel") && (
              <p className="fs-13 mb-3">
                Reason <br />
                <b className="color-green all-caps">
                  {/* {currency}{orderdetailCal?.paymentMessage} */}
                  {/* <div className='red-text' dangerouslySetInnerHTML={{ __html: `<b>${orderdetailCal?.paymentMessage.replace("<br /><br />", `<br/>`)}</b>` }}></div> */}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: orderdetailCal?.paymentMessage,
                    }}
                  />
                </b>
              </p>
            )}
            {/* <p className="fs-13 mb-3">Reason<br /><b className="color-green all-caps">No Such payment method.</b></p> */}
          </div>
        </div>
        <div className="row ms-auto me-auto pt-1 pb-4 row-cols-lg-2 row-cols-md-1 row-cols-1">
          {orderdetails.map((item: any, index: any) => {
            return (
              <OrderItem
                item={item}
                customerType={orderdetailCal?.customertype}
                locatioId={locatioId}
                index={index}
                key={index}
                handleOrderClick={handleOrderClick}
                currency={currency}
                handleLocationDetails={handleLocationDetails}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
