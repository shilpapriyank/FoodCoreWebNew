import React, { Component, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { GetThemeDetails } from "../common/utility";

const RestaurantNotExist = () => {
  const router = useRouter();
  const {
    query: { dynamic },
  } = router;
  const locationUrl = router.query.location;
  const restaurantinfo = useSelector(
    ({ restaurant }: any) => restaurant.restaurantdetail
  );
  const location = restaurantinfo.defaultLocation;
  const selectedTheme = GetThemeDetails(restaurantinfo.themetype);

  return (
    <>
      <section id="pickup" className="cre-password">
        <div className="container">
          <div className="row">
            <div className="col-lg-2 left-a col-sm-4 col-xs-6"></div>
            {/* <MemoizedRegisterHeaderLogoComponent /> */}
          </div>
          <div className="row">
            <div className="col-lg-12 tp-pickup flush col-sm-12 col-xs-12"></div>
            <div className="col-lg-12 flush col-sm-12 col-xs-12">
              <div className="col-lg-7 column-centered col-sm-8 col-xs-12">
                <div className="col-lg-12 bg-s pa-set col-sm-12 col-xs-12">
                  <div className="card">
                    <div className="card-header  text-center">
                      <h2>Sorry!!!</h2>
                    </div>
                    <div className="card-body py-5">
                      <div className="custom-icons">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 496 512"
                        >
                          {/* Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) */}
                          <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm80 168c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm-160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm170.2 218.2C315.8 367.4 282.9 352 248 352s-67.8 15.4-90.2 42.2c-13.5 16.3-38.1-4.2-24.6-20.5C161.7 339.6 203.6 320 248 320s86.3 19.6 114.7 53.8c13.6 16.2-11 36.7-24.5 20.4z" />
                        </svg>
                      </div>
                      <h3 className="orange-text text-center">
                        Restaurant Doesn&apos;t Exist !!!
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RestaurantNotExist;
