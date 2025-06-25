"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";

import { GetThemeDetails } from "../../../common/utility";
import useUtility from "../../../customhooks/utility-hook";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import CommonModal from "../../common/common-model.component";
import { OrderPreparationDetail } from "./order-preparation-detail.component";
import { AddressListItem } from "@/types/restaurant-types/restaurant.type";

const CategorySidebar: React.FC = () => {
  const dispatch = useDispatch();
  const { restaurantinfo, cart, restaurant } = useReduxData();
  const router = useRouter();
  const { isDisplayPrice, isRewardTip } = useUtility();
  const searchParams = useSearchParams();
  const dynamic = searchParams.get("dynamic");
  const location = searchParams.get("location");
  const [isOpenChangeLocation, setIsOpenChangeLocation] =
    useState<boolean>(false);
  const selectedTheme = GetThemeDetails(restaurantinfo?.themetype);
  const addressList = restaurant?.restaurantslocationlistwithtime?.addressList;
  //console.log("address list from categoery sideber component", addressList);
  const isSchoolProgramEnabled = restaurantinfo?.isSchoolProgramEnabled;

  const handleClick = () => {
    if (
      restaurantinfo?.displayLocationPopUpChange &&
      addressList &&
      addressList.length > 1
    ) {
      setIsOpenChangeLocation(true);
      return;
    }
    router.push(`/${selectedTheme?.url}/${dynamic}/${location}/checkout`);
  };

  const handleClickOk = () => {
    setIsOpenChangeLocation(false);
    router.push(`/${selectedTheme?.url}/${dynamic}/${location}/checkout`);
  };

  const handleToggle = (value: boolean) => {
    setIsOpenChangeLocation(value);
  };

  const handleClickBtn2 = () => {
    setIsOpenChangeLocation(false);
    document.getElementById("time-mdl")?.click();
  };

  return (
    <>
      <div className="col-lg-3 col-md-4 col-12 order-1 order-lg-2 order-md-2 d-none d-md-block scrollable-section">
        <div className="sidebar">
          {!isSchoolProgramEnabled && <OrderPreparationDetail />}
          <div className="card totalbox">
            {/* <OrderItemsList />
                      
                        {/* {cart?.cartitemcount > 0 && <RelatedItemsList />} */}

            {cart?.cartitemcount > 0 ? (
              <a className="btn-default w-100" onClick={handleClick}>
                {" "}
                Go To Cart
                <i className="fa fa-angle-right" />{" "}
              </a>
            ) : (
              <a className="btn-default w-100 greyColor">
                {" "}
                Go To Cart <i className="fa fa-angle-right" />{" "}
              </a>
            )}
          </div>
        </div>
      </div>

      {restaurantinfo?.displayLocationPopUpChange && isOpenChangeLocation && (
        <CommonModal
          title="Confirm Location"
          isButton={true}
          btn1Name="Confirm"
          handleToggle={handleToggle}
          isOpenModal={isOpenChangeLocation}
          isbtn2={true}
          btn2Name="No change"
          handleClickBtn2={handleClickBtn2}
          handleClickBtn1={handleClickOk}
          isChild={true}
        >
          <>
            <h6 className=" mt-3 fs-6 text-center">
              You have selected{" "}
              <span className="text-dynamic">
                {restaurantinfo?.defaultLocation?.locationName}
              </span>{" "}
              location.
            </h6>
          </>
        </CommonModal>
      )}
    </>
  );
};

export default CategorySidebar;
