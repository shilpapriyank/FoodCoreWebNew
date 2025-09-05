import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export const MyOrderSkeleton = () => {
  let count = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <>
      {/* Hello world */}
      <section className="menu-items my-orders">
        <div className="row g-2">
          {count.map((item, index) => {
            return (
              <div key={index} className="col-lg-6 col-md-6 col-12 nohover">
                <div className="item-box">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-12 py-1">
                      <Skeleton height={250} className="w-100" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
