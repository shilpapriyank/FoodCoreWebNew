import React from "react";
import LocationTimeComponent from "./location-time.component";

export const LocationItem = ({
  location,
  id,
  defaultLoactionId,
  handleToggleisRedirect,
  cartitemcount,
}: any) => {
  let pickupHour = location?.pickup_hour;
  let deliveryHour = location?.delivery_hour;
  const pickupWindow = location?.pickupTime;
  const deliveryWindow = location?.deliveryTime;
  let dataBsTarget =
    cartitemcount > 0 ? "#confirm-change-store" : "#order-time-modal";
  let allDayClose = pickupHour?.every((item: any) =>
    item?.time?.every((time: any) => time?.isClosed === true)
  );
  return (
    <div className="col-12 col-md-6">
      <div
        className={`card itembox d-flex flex-column ps-3 pb-3 ${
          id === defaultLoactionId ? "active-border" : ""
        }`}
      >
        <h3 className="color-dynamic">
          <i className="fa fa-map-marker me-2 fs-5"></i>
          {location.locationName}
        </h3>
        <div className="d-flex flex-md-row flex-column justify-content-between pb-2">
          <p className="w-md-50 w-100">
            {" "}
            {location.address1}
            {location.cityName}, {location.zipcode}
          </p>
          <p className="pe-3 w-md-50 w-100">
            <span className="fw-bold">Phone Number:</span>&nbsp;
            <a href={`tel:${location.phone}`}>
              {" "}
              <i className="fa fa-phone "></i> {location.phone}
            </a>
          </p>
        </div>
        <div></div>
        <div className="row me-2">
          <div className="col-12">
            <h6 className="color-dynamic">Restaurant hours</h6>
          </div>
          <div className="col-12 col-md-6 mb-1">
            <div className="accordion" id={`accordionex${id}p`}>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button py-2 collapsed "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapseOne${id}p`}
                    aria-expanded="true"
                    aria-controls={`collapseOne${id}p`}
                  >
                    Pickup Window
                  </button>
                </h2>
                <div
                  id={`collapseOne${id}p`}
                  className="accordion-collapse collapse "
                  data-bs-parent={`#accordionex${id}p`}
                >
                  <div className="accordion-body">
                    {pickupHour?.length === 0 && (
                      <span className="col-md-9 col-lg-9 col-12 padding-left-0 color-red">
                        <b>Pickup window time not available.</b>
                      </span>
                    )}
                    <LocationTimeComponent
                      key={`${location.locationId}-${"p"}`}
                      title="PICKUP HOURS"
                      hour={pickupHour}
                      locationId={location.locationId}
                      deliveryTypeProp="p"
                      divClass="col-lg-3 col-md-3 col-12 py-3 border-end hours-list"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 mb-1">
            <div className="accordion" id={`accordionex${id}p`}>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button py-2 collapsed "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapseOne${id}d`}
                    aria-expanded="true"
                    aria-controls={`collapseOne${id}d`}
                  >
                    Delivery Window
                  </button>
                </h2>
                <div
                  id={`collapseOne${id}d`}
                  className="accordion-collapse collapse "
                  data-bs-parent={`#accordionex${id}d`}
                >
                  <div className="accordion-body">
                    {deliveryHour?.length === 0 && (
                      <span className="col-md-9 col-lg-9 col-12 padding-left-0 color-red">
                        <b>Delivery window time not available.</b>
                      </span>
                    )}
                    <LocationTimeComponent
                      key={`${location.locationId}-${"d"}`}
                      title="DELIVERY HOURS"
                      hour={deliveryHour}
                      locationId={location.locationId}
                      deliveryTypeProp="d"
                      divClass="col-lg-3 col-md-3 col-12 py-3 hours-list"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
