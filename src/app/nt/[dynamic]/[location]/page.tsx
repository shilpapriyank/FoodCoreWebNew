"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ORDER_TYPE } from "../../../../components/common/utility";
import LoadLocationDirectComponent from "../../../../components/nt/common/loadlocation-direct.component";
import CategoryMenuItems from "../../../../components/nt/category/category-menuitems/category-menuItems.component";
import { useParams, useRouter } from "next/navigation";
import { useSearchData } from "../../../../components/customhooks/usesearchdata-hook";
import SearchBarComponent from "../../../../components/nt/category/category-menuitems/search-bar.component";
import useUtility from "../../../../components/customhooks/utility-hook";
import Layout from "@/components/nt/layout/layout.component";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { setpickupordelivery } from "../../../../../redux/selected-delivery-data/selecteddelivery.slice";
import { OrderServices } from "../../../../../redux/order/order.services";
import {
  getordertime,
  isasap,
  setordertime,
} from "../../../../../redux/order/order.slice";
import { OrderTypes } from "../../../../../redux/order/order.type";
import CategoryHeader from "@/components/nt/category/category-header/category-header";
import { AppDispatch } from "../../../../../redux/store";

export default function LocationPage() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    selecteddelivery,
    restaurantinfo,
    menuitem,
    categoryItemsList,
    userinfo,
    order,
  } = useReduxData();
  console.log(
    "defaultLocation from location page",
    restaurantinfo.defaultLocation
  );
  const params = useParams();
  const { location } = params;
  console.log("location from lacation page", location);
  const [isloadAdress, setisloadAdress] = useState<boolean>(true);
  const b2b: boolean = restaurantinfo?.defaultLocation?.b2btype;
  const isSchoolProgramEnabled: boolean =
    restaurantinfo?.isSchoolProgramEnabled;
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
  console.log("pickupordelivery from location page", pickupordelivery);
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
            // dispatch({
            //   type: OrderTypes.CHECK_ORDER_TIME,
            //   payload: timeWithMeridian,
            // });
            dispatch(setordertime(timeWithMeridian));
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
        <LoadLocationDirectComponent isLoadAddressChangeUrl={isloadAdress}>
          {!errorMessage && <CategoryHeader />}
          {/* <CategoryHeader /> */}
        </LoadLocationDirectComponent>
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
        {/* {menuItemsWithCat?.length === 0 &&<h1></h1>} */}
      </Layout>
    </>
  );
}
