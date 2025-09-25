import React, { Fragment, useRef } from "react";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { ORDER_TYPE } from "../../common/utility";
import { FutureOrderingDayDateTypes } from "@/types/restaurant-types/restaurant.type";
import { OrderState } from "../../../../redux/order/order.slice";

interface FutureDayComponentProps {
  enablefutureordering: boolean;
  futureDateList: FutureOrderingDayDateTypes[];
  handleClickDate: (day: FutureOrderingDayDateTypes, isClose?: boolean) => void;
  selectedDate: string;
  order: OrderState;
  ordertype: number;
}

const FutureDayComponent: React.FC<FutureDayComponentProps> = ({
  enablefutureordering,
  futureDateList,
  handleClickDate,
  selectedDate,
  order,
  ordertype,
}) => {
  const sliderRef = useRef<any>(null);

  const handleSlideNext = () => {
    sliderRef.current.swiper.slideNext();
  };

  const handleSlidePrev = () => {
    sliderRef.current.swiper.slidePrev();
  };

  return (
    <Swiper
      ref={sliderRef}
      loop={true}
      spaceBetween={5}
      centeredSlides={false}
      breakpoints={{
        0: { slidesPerView: 3 }, //3
        600: { slidesPerView: 3 }, //3
        1000: { slidesPerView: 5 }, //5
      }}
      allowSlideNext={true}
      allowSlidePrev={true}
      // navigation
      // pagination={false}
    >
      {/* {enablefutureordering && */}
      {futureDateList?.map((day, index) => {
        const isClose =
          ordertype === ORDER_TYPE.DELIVERY.value
            ? day?.deliveryStatus === "Closed"
            : day?.takeoutStatus === "Closed";
        return (
          <Fragment key={index}>
            <div>
              <SwiperSlide
                key={index}
                onClick={() => handleClickDate(day, isClose)}
              >
                <div
                  className={`rounded border border-2 shadow p-3 pointer-cursor ${
                    day?.futureDay === selectedDate ||
                    day?.futureDay === order?.futureOrderDay?.futureDay
                      ? "border-dynamic"
                      : ""
                  } `}
                >
                  <h6 className="fw-bold-light fs-6 ">{day?.futureDay}</h6>
                  <p className="mb-0">{day?.futureDate}</p>
                </div>
              </SwiperSlide>
            </div>
          </Fragment>
        );
      })}
      <button
        onClick={handleSlideNext}
        className="swiper-button-next bg-white op-1"
      ></button>
      <button
        onClick={handleSlidePrev}
        className="swiper-button-prev bg-white op-1"
      ></button>
      <br></br>
    </Swiper>
  );
};
export default FutureDayComponent;
