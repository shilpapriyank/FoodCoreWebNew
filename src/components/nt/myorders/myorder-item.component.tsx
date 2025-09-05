import Link from "next/link";
import React from "react";
import { CUSTOMER_TYPE, GetCurrency, ORDERSTATUS } from "../../common/utility";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { useParams, useRouter } from "next/navigation";
import { PAGES } from "../common/pages";

export const MyOrderItemComponent = ({
  item,
  selectedItemClick,
  selectedthemeURL,
}: any) => {
  const router = useRouter();
  const params = useParams();
  const { dynamic, location } = params;
  const currency = GetCurrency();
  const { restaurantinfo } = useReduxData();
  let locationFullLink =
    "/" + selectedthemeURL + "/" + dynamic + "/" + location + "/";
  let locationHrefLink = `/${selectedthemeURL}/[dynamic]/[location]/`;
  const isSchoolProgramEnabled = restaurantinfo?.isSchoolProgramEnabled;

  return (
    <div className="cols">
      <div className="card itembox">
        <div className="text w-100">
          <h3>
            {item.creationdate}
            <span>
              <small className="method">{item.orderType}</small>
              {item?.trackingurl !== null &&
              item?.orderStatus === ORDERSTATUS.FAILED.toLowerCase() ? (
                <>
                  <small className="method">
                    <a
                      className=" all-caps cursor text-primary"
                      href={`${item?.trackingurl}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa fa-truck"></i> {item?.deliverystatus}
                    </a>
                  </small>
                </>
              ) : (
                <>
                  {item?.orderStatus.toLowerCase() ===
                    ORDERSTATUS.FAILED.toLowerCase() ||
                  item?.orderStatus.toLowerCase() ===
                    ORDERSTATUS.CANCEL.toLowerCase() ? (
                    <small className="red-text ">{item?.orderStatus}</small>
                  ) : item?.orderStatus.toLowerCase() ===
                    ORDERSTATUS.INCOMPLETE.toLowerCase() ? (
                    <small className="orange-text ">{item?.orderStatus}</small>
                  ) : (
                    <small className="green-text ">{item?.orderStatus}</small>
                  )}
                </>
              )}
              &nbsp;&nbsp;
              {item?.customertype !== CUSTOMER_TYPE.SUBSCRIBE && (
                <>
                  {currency}
                  {item?.totalamount.toFixed("2")}
                </>
              )}
            </span>
          </h3>
          <h6 className="color-green">
            <i className="fa fa-map-marker fa-regular" aria-hidden="true"></i>
            &nbsp;{item.locationName}
          </h6>
          {item.orderDetails &&
            item.orderDetails.map((history: any, index: any) => {
              return (
                <p key={index}>
                  {history.qty}&nbsp;x&nbsp;{history.itemname}
                </p>
              );
            })}
          {/* <p>Breaded Chicken &amp; Sweet Chilli Sauce</p> */}
          <div className="d-flex align-items-center justify-content-between">
            <p>
              <b>Order No. {item.orderno}</b>
            </p>
            <Link
              legacyBehavior
              href={`${locationHrefLink}${PAGES.ORDER_DETAIL}/[orderid]`}
              as={`${locationFullLink}${PAGES.ORDER_DETAIL}/${item.orderId}`}
            >
              <a
                className="btn-default small"
                onClick={() => {
                  selectedItemClick(item);
                }}
              >
                {"Order detail"}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>

    // <div className="col-lg-6 col-md-6 col-12">
    //     <div className="item-box">
    //         <div className="row">
    //             <div className="col-lg-12 col-md-12 col-12">
    //                 <div className="item-details py-2">
    //                     <div className="d-flex justify-content-between">
    //                         <div>
    //                             <h6 className="mb-0">{item.creationdate}</h6>
    //                             <p>{MYORDERPAGE_MESSAGE.ORDER_NO}. {item.orderno}</p>
    //                         </div>
    //                         <Link legacyBehavior href={`${locationHrefLink}${PAGES.ORDER_DETAIL}/[orderid]`}
    //                             as={`${locationFullLink}${PAGES.ORDER_DETAIL}/${item.orderId}`}>
    //                             <a className="btn-default btn-orange w-auto" id='view-detail'>{MYORDERPAGE_MESSAGE.VIEW_DETAILES}</a>
    //                         </Link>
    //                     </div>
    //                     {/* <h6 className='orange-text '><i className="fa-solid fa-location-dot " aria-hidden="true" ></i>&nbsp;{item.locationName}</h6> */}
    //                     <h6 className='orange-text '><i className="fa fa-map-marker fa-regular" aria-hidden="true"></i>&nbsp;{item.locationName}</h6>
    //                     <div className="d-flex justify-content-between align-items-center">
    //                         <p className="mb-0">{MYORDERPAGE_MESSAGE.TYPE}<br /><b className="orange-text all-caps">{item.orderType}</b></p>
    // {
    //     (item?.trackingurl !== null&& item?.orderStatus === ORDERSTATUS.FAILED.toLowerCase())  ? <>
    //         <p className="mb-0">{MYORDERPAGE_MESSAGE.TRACKING_URL}<br />
    //             <a className=" all-caps cursor text-primary" href={`${item?.trackingurl}`} target='_blank' rel="noreferrer">
    //                 <i className="fa fa-truck" ></i>    {item?.deliverystatus}
    //             </a>
    //         </p>
    //     </> :
    //         <p className="mb-0">{MYORDERPAGE_MESSAGE.STATUS}<br />
    //             {
    //                 item?.orderStatus.toLowerCase() === ORDERSTATUS.FAILED.toLowerCase() || item?.orderStatus.toLowerCase() === ORDERSTATUS.CANCEL.toLowerCase() ?
    //                     <b className="red-text all-caps">
    //                         {item?.orderStatus}
    //                     </b>
    //                     :
    //                     item?.orderStatus.toLowerCase() === ORDERSTATUS.INCOMPLETE.toLowerCase() ?
    //                         <b className="orange-text all-caps">
    //                             {item?.orderStatus}
    //                         </b>
    //                         :
    //                         <b className="green-text all-caps">
    //                             {item?.orderStatus}
    //                         </b>
    //             }
    //         </p>
    // }
    //                       {item?.customertype !== CUSTOMER_TYPE.SUBSCRIBE&&  <p className="mb-0">{MYORDERPAGE_MESSAGE.TOTAL}<br /><b className="orange-text all-caps"> {currency}{item?.totalamount.toFixed('2')}</b></p>}

    //                         <Link legacyBehavior href={`${locationHrefLink}${PAGES.ORDER_DETAIL}/[orderid]`}
    //                             as={`${locationFullLink}${PAGES.ORDER_DETAIL}/${item.orderId}`}>
    //                             <a className="btn-default w-auto" onClick={() => { selectedItemClick(item) }}>{MYORDERPAGE_MESSAGE.RE_ORDER}</a>
    //                         </Link>
    //                     </div>
    //                     {item.orderDetails &&
    //                         item.orderDetails.map((history, index) => {
    //                             return <div className="d-flex justify-content-between align-items-center border-top pt-2" id={Math.random()} key={index}>
    //                                 <h4 className="capital-text"> {history.qty}&nbsp;x&nbsp;{history.itemname} </h4>
    //                             </div>
    //                         }
    //                         )}
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </div>
  );
};
