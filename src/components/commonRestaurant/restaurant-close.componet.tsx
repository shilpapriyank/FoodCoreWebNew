import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useReduxData } from "../customhooks/useredux-data-hooks";
import { GetThemeDetails } from "../common/utility";
import { PAGES } from "../nt/common/pages";

const RestaurantCloseComponent = () => {
  const { restaurantinfo } = useReduxData();
  const router = useRouter();
  const locationUrl = router.query.location;
  const location = restaurantinfo.defaultLocation;
  const selectedTheme = GetThemeDetails(restaurantinfo.themetype);
  let locationFullLink =
    "/" +
    selectedTheme.url +
    "/" +
    restaurantinfo.restaurantURL +
    "/" +
    locationUrl +
    "/";
  let locationHrefLink = `/${selectedTheme.url}/[dynamic]/[location]/`;
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
                  <div className="row">
                    <div
                      style={{ marginTop: 30 + "px", fontSize: 24 + "px" }}
                      className="col-lg-12 col-sm-12 col-xs-12"
                    >
                      <h2 style={{ textAlign: "center" }}> Restaurant Close</h2>

                      {location === null ? (
                        <p
                          style={{
                            marginTop: 50 + "px",
                            fontSize: 24 + "px",
                            textAlign: "center",
                          }}
                        >
                          {
                            "Sorry! We are off today. Please try again next time. "
                          }
                        </p>
                      ) : (
                        <p
                          style={{
                            marginTop: 50 + "px",
                            fontSize: 24 + "px",
                            textAlign: "center",
                          }}
                        >
                          {location.orderingMessage}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12 register tttp flush column-centered col-sm-12 col-xs-12">
                      <form className="customForm">
                        <div className="col-lg-12 text-center flush col-sm-12 col-xs-12">
                          <div className="col-lg-12 flush column-centered col-sm-12 col-xs-12">
                            {location !== null && (
                              <>
                                <div className="col-lg-6 col-sm-6 col-xs-6">
                                  <Link
                                    legacyBehavior
                                    href={
                                      "/" +
                                      selectedTheme.url +
                                      "/[dynamic]/pickup"
                                    }
                                    as={`/${selectedTheme.url}/${restaurantinfo.restaurantURL}/pickup`}
                                  >
                                    <button
                                      className="blue_btn font_18px blue_btn_porder  btn-primary"
                                      type="submit"
                                      style={{ width: 100 + "px" }}
                                    >
                                      Home Page
                                    </button>
                                  </Link>
                                </div>
                                <div className="col-lg-6 col-sm-6 col-xs-6">
                                  <Link
                                    legacyBehavior
                                    href={`${locationHrefLink}${PAGES.MAIN}`}
                                    as={`${locationFullLink}${PAGES.MAIN}`}
                                  >
                                    <button
                                      className="blue_btn font_18px blue_btn_porder  btn-primary"
                                      type="submit"
                                      style={{ width: 100 + "px" }}
                                    >
                                      {" "}
                                      Main Page
                                    </button>
                                  </Link>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </form>
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

export default RestaurantCloseComponent;
