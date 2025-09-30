"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import {
  countryData,
  GetThemeDetails,
  onLoadSetDefaultFlag,
} from "@/components/common/utility";
import Layout from "@/components/nt/layout/layout";
import AuthGuardComponent from "@/components/nt/common/authgaurd.component";
import BackButton from "@/components/nt/common/backbutton.component";
import MyAccountInfo from "@/components/nt/myaccount/myaccountinfo.component";
import ProfileAddressComponent from "@/components/nt/myaccount/profile-address.component";
import AddAddress from "@/components/nt/common/add-address.component";

const MyAccount = () => {
  const { restaurantinfo, userinfo, selecteddelivery, deliveryaddress } =
    useReduxData();
  const dialCode = userinfo?.dialcode || "+1";
  let locationCountryData = Object.values(countryData).find(
    (item) => item.countryCode === dialCode
  );
  let defaultflag = document.querySelector(".iti-flag");
  let countryList = document.querySelector(".country-list");
  const [openAddAddress, setopenAddAddress] = useState(false);
  const addresscount = deliveryaddress?.deliveryaddressdata?.length;
  const selectedTheme = GetThemeDetails(restaurantinfo?.themetype as number);
  let location = restaurantinfo?.defaultLocation?.locationURL;
  const isSchoolProgramEnabled = restaurantinfo?.isSchoolProgramEnabled;

  let locationFullLink =
    "/" +
    selectedTheme?.url +
    "/" +
    restaurantinfo?.restaurantURL +
    "/" +
    location +
    "/";
  const b2b = restaurantinfo?.defaultLocation?.b2btype;
  useEffect(() => {
    if (dialCode === locationCountryData?.countryCode && userinfo) {
      onLoadSetDefaultFlag(defaultflag, countryList, locationCountryData);
    }
  }, [defaultflag, countryList, userinfo, dialCode]);

  const handleToggleAddAddress = (value: boolean) => {
    setopenAddAddress(value);
  };
  return (
    <>
      <Head>
        <title>
          My Account || {restaurantinfo?.restaurantname}: Ordering Online
        </title>
        <meta name="description" content="Online description" />
      </Head>
      <Layout>
        <AuthGuardComponent>
          <section className="info-address">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-9 col-md-8 col-12">
                  <div className="row">
                    <div className="col-lg-12 mb-lg-5 mb-md-4 col-md-12 col-12">
                      <BackButton path={locationFullLink} />
                    </div>
                    <div className="col-lg-12 mb-lg-4 mb-md-4 col-md-12 col-12">
                      <h4 className="large-heading color-green">
                        <strong>My profile</strong>
                      </h4>
                    </div>
                  </div>
                  <MyAccountInfo />
                </div>
                {!b2b && !isSchoolProgramEnabled && (
                  <div className="col-lg-3 col-md-4 col-12">
                    <h4 className="large-heading color-green">
                      <a
                        className="btn-default float-end  rounded-circle"
                        onClick={() => handleToggleAddAddress(true)}
                      >
                        <i className="fa m-0 fa-plus" />
                      </a>
                      <strong>My addresses</strong>
                      <br />
                      <span className="color-black fs-12">
                        <span className="color-green">
                          {addresscount}
                        </span>{" "}
                        available address
                      </span>
                    </h4>
                    <hr />
                    <ProfileAddressComponent />
                  </div>
                )}
              </div>
            </div>
          </section>
        </AuthGuardComponent>
      </Layout>

      {openAddAddress && (
        <AddAddress
          isOpenModal={openAddAddress}
          handleToggleAddAddressModal={handleToggleAddAddress}
        />
      )}
    </>
  );
};

export default MyAccount;
