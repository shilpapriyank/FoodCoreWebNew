"use client";

import React, { useEffect, useState } from "react";
import { useReduxData } from "../../../../components/customhooks/useredux-data-hooks";
import { ORDER_TYPE } from "../../../../components/common/utility";
import LoadLocationDirectComponent from "../../../../components/nt/common/loadlocation-direct.component";
import CategoryMenuItems from "../../../../components/nt/category/category-menuitems/category-menuItems.component";
import CategoryHeader from "../../../../components/nt/category/category-header/category-header";
import { useSearchData } from "../../../../components/customhooks/usesearchdata-hook";
import SearchBarComponent from "../../../../components/nt/category/category-menuitems/search-bar.component";
import useUtility from "../../../../components/customhooks/utility-hook";
import { useParams } from "next/navigation";
import { useAppDispatch } from "../../../../../redux/hooks";
import { setpickupordelivery } from "../../../../../redux/selected-delivery-data/selecteddelivery.slice";
import { OrderServices } from "../../../../../redux/order/order.services";
import { isasap, setordertime } from "../../../../../redux/order/order.slice";
import Layout from "@/components/nt/layout/layout.component";

export default function LocationPage() {
  const dispatch = useAppDispatch();
  const {
    selecteddelivery,
    restaurantinfo,
    menuitem,
    categoryItemsList,
    userinfo,
    order,
  } = useReduxData();

  const [isloadAdress, setisloadAdress] = useState<boolean>(true);
  const { location } = useParams() ?? {};
  const b2b = restaurantinfo?.defaultLocation?.b2btype;
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

  const pickupordelivery = selecteddelivery.pickupordelivery;
  // const menuItemsWithCat = filterCategory(
  //   searchtext !== "" ? searchdata?.menuItems : categoryItemsList,
  //   pickupordelivery
  // );

  const menuItemsWithCat = filterCategory(
    searchtext !== "" && searchdata ? searchdata?.menuItems : categoryItemsList,
    pickupordelivery
  );

  useEffect(() => {
    if (
      selecteddelivery?.pickupordelivery === null ||
      selecteddelivery?.pickupordelivery === "" ||
      Object.keys(selecteddelivery?.pickupordelivery || {}).length === 0
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
    if (b2b || isSchoolProgramEnabled) {
      dispatch(setpickupordelivery(ORDER_TYPE.PICKUP.text));

      if (order?.checktime === "") {
        OrderServices.getOrderTime({
          restaurantId: restaurantinfo?.restaurantId,
          locationId: restaurantinfo?.locationId,
        }).then((response) => {
          dispatch(isasap(true));
          const time = response?.ordertime?.split(":");
          const timeWithMeridian = `${time?.[0]}:${time?.[1]} ${time?.[2]}`;
          if (response) {
            dispatch(setordertime(timeWithMeridian));
          }
        });
      }
    }
  }, [userinfo]);

  useEffect(() => {
    const loginButton = document.querySelector(
      ".login-btn"
    ) as HTMLButtonElement;
    if (b2b && userinfo === null) {
      loginButton?.click();
    }
  }, [userinfo]);

  const handleChangeAddress = () => {
    setisloadAdress(false);
  };

  return (
    <Layout handleChangeAddress={handleChangeAddress} page={"location"}>
      <LoadLocationDirectComponent isLoadAddressChangeUrl={isloadAdress}>
        {!errorMessage && <CategoryHeader />}
      </LoadLocationDirectComponent>

      <CategoryMenuItems
        menuItemsWithCat={menuItemsWithCat}
        errorMessage={errorMessage}
        categoryslug=""
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
  );
}
