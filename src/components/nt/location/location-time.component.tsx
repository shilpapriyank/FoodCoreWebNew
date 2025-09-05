import React from "react";
import { Fragment } from "react";
import { DELIVERYPAGEMESSAGE } from "../helpers/static-message/delivery-message";

const LocationTimeComponent = ({
  divClass,
  hour,
  title,
  locationId,
  deliveryTypeProp,
}: any) => {
  return (
    <div>
      {/* <h6>{title}</h6> */}
      {hour.map((item: any, dayindex: any) => {
        let closeWithAllTime = item.time.filter((hour: any) => {
          return hour.isClosed === false;
        });
        let day = item.Day.substring(0, 3);
        return (
          <p
            className="row"
            key={`${locationId}-${dayindex}-${day}-${deliveryTypeProp}`}
          >
            <b className="col-md-3 col-lg-3 pe-0 col-3 padding-right-0">
              {day} :
            </b>
            {item.time.map((time: any, index: any) => {
              let prevItem = item.time[index - 1];
              if (time.isClosed === false) {
                return (
                  <Fragment
                    key={`${locationId}-${dayindex}-${index}-${day}-${deliveryTypeProp}`}
                  >
                    {index > 0 ? (
                      <>
                        {/* //IF PREV TIME IS CLOSED THEN NO NEED TO SPACE */}
                        {prevItem?.isClosed !== true && (
                          <span className="col-md-3 col-lg-3 col-3 padding-right-0 ">
                            {" "}
                          </span>
                        )}
                        <span className="col-md-9 col-lg-9 col-9 padding-left-0">
                          {time.time.replace(/ /g, "")} <br></br>
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="col-md-9 col-lg-9 col-9 padding-left-0">
                          {time.time.replace(/ /g, "")} <br></br>
                        </span>
                      </>
                    )}
                  </Fragment>
                );
              } else {
                return (
                  <>
                    {closeWithAllTime.length === 0 && (
                      <Fragment
                        key={`${locationId}-${dayindex}-${index}-${day}-${deliveryTypeProp}`}
                      >
                        <span className="col-md-9 col-lg-9 col-9 padding-left-0 color-red">
                          <b>{DELIVERYPAGEMESSAGE.CLOSE}</b>
                        </span>
                      </Fragment>
                    )}
                  </>
                );
              }
            })}
          </p>
        );
      })}
    </div>
  );
};

export default React.memo(LocationTimeComponent);
