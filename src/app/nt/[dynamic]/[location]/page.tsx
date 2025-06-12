"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ORDER_TYPE } from "../../../../components/common/utility";
import LoadLocationDirectComponent from "../../../../components/nt/common/loadlocation-direct.component";
import CategoryMenuItems from "../../../../components/nt/category/category-menuitems/category-menuItems.component";
import { useRouter } from "next/navigation";
import { useSearchData } from "../../../../components/customhooks/usesearchdata-hook";
import SearchBarComponent from "../../../../components/nt/category/category-menuitems/search-bar.component";
import useUtility from "../../../../components/customhooks/utility-hook";
import Layout from "@/components/nt/layout/layout.component";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { setpickupordelivery } from "../../../../../redux/selected-delivery-data/selecteddelivery.slice";
import { OrderServices } from "../../../../../redux/order/order.services";
import { isasap } from "../../../../../redux/order/order.slice";
import { OrderTypes } from "../../../../../redux/order/order.type";
import { useAppDispatch } from "../../../../../redux/hooks";
import CategoryHeader from "@/components/nt/category/category-header/category-header";

export default function DynamicPage() {
  const dispatch = useAppDispatch();

  const {
    selecteddelivery,
    restaurantinfo,
    menuitem,
    categoryItemsList,
    userinfo,
    order,
  } = useReduxData();
  const [isloadAdress, setisloadAdress] = useState(true);
  const b2b = restaurantinfo?.defaultLocation?.b2btype;
  console.log("b2b from src/app/nt/[dynamic]/[location]/page.tsx", b2b);
  const isSchoolProgramEnabled = restaurantinfo?.isSchoolProgramEnabled;
  const searchdata = menuitem?.searchdata;
  const searchtext = menuitem?.searchtext;
  const {
    searchItem,
    handleChangeSearch,
    errorMessage,
    handleClickCancel,
    handleSubmitSearch,
  } = useSearchData(searchtext);
  const { filterCategory } = useUtility();
  let pickupordelivery = selecteddelivery.pickupordelivery;
  let menuItemsWithCat = filterCategory(
    searchtext !== "" ? searchdata?.menuItems : categoryItemsList,
    pickupordelivery
  );

  useEffect(() => {
    if (
      selecteddelivery?.pickupordelivery === null ||
      Object.keys(selecteddelivery?.pickupordelivery).length === 0 ||
      selecteddelivery?.pickupordelivery === ""
    ) {
      dispatch(
        setpickupordelivery(
          restaurantinfo?.defaultLocation?.defaultordertype
            ? ORDER_TYPE.DELIVERY.text
            : ORDER_TYPE.PICKUP.text
        )
      );
    }
  }, []);

  useEffect(() => {
    //if b2b restaurant
    if (b2b || isSchoolProgramEnabled) {
      dispatch(setpickupordelivery(ORDER_TYPE.PICKUP.text));
      if (order?.checktime === "") {
        OrderServices.getOrderTime({
          restaurantId: restaurantinfo.restaurantId,
          locationId: restaurantinfo.locationId,
        } as any).then((response) => {
          dispatch(isasap(true));
          const time = response?.ordertime?.split(":");
          const timeWithMeridian = `${time?.[0]}:${time?.[1]} ${time?.[2]}`;
          if (response) {
            dispatch({
              type: OrderTypes.CHECK_ORDER_TIME,
              payload: timeWithMeridian,
            });
            return;
          }
        });
      }
    }
  }, [userinfo]);

  const loginButton = document.querySelector(".login-btn") as HTMLButtonElement;
  useEffect(() => {
    if (b2b && userinfo === null) {
      loginButton?.click();
    }
  }, [userinfo, loginButton]);

  const handleChangeAddress = () => {
    setisloadAdress(false);
  };

  return (
    <>
      <Layout handleChangeAddress={handleChangeAddress} page={"location"}>
        {/* {!errorMessage && } */}
        <CategoryHeader />
        <LoadLocationDirectComponent
          isLoadAddressChangeUrl={isloadAdress}
        ></LoadLocationDirectComponent>
        <CategoryMenuItems
          menuItemsWithCat={menuItemsWithCat}
          errorMessage={errorMessage}
        >
          <SearchBarComponent
            searchItem={searchItem}
            handleChangeSearch={handleChangeSearch}
            errorMessage={errorMessage}
            handleSubmitSearch={handleSubmitSearch}
            handleClickCancel={handleClickCancel}
          />
        </CategoryMenuItems>
      </Layout>
      {/* <section className="right-sticky">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-8 col-12">
              <SearchBarComponent
                searchItem={searchItem}
                handleChangeSearch={handleChangeSearch}
                errorMessage={errorMessage}
                handleSubmitSearch={handleSubmitSearch}
                handleClickCancel={handleClickCancel}
              />
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}
