"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../../redux/hooks";
import { useReduxData } from "../../../../components/customhooks/useredux-data-hooks";
import { ORDER_TYPE } from "../../../../components/common/utility";
import LoadLocationDirectComponent from "../../../../components/nt/common/loadlocation-direct.component";
import CategoryMenuItems from "../../../../components/nt/category/category-menuitems/category-menuItems.component";
import CategoryHeader from "../../../../components/nt/category/category-header/category-header";
import { useSearchData } from "../../../../components/customhooks/usesearchdata-hook";
import SearchBarComponent from "../../../../components/nt/category/category-menuitems/search-bar.component";
import useUtility from "../../../../components/customhooks/utility-hook";
import { setpickupordelivery } from "../../../../../redux/selected-delivery-data/selecteddelivery.slice";
import { OrderServices } from "../../../../../redux/order/order.services";
import { isasap, setordertime } from "../../../../../redux/order/order.slice";
import Layout from "@/components/nt/layout/layout";

const LocationPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    selecteddelivery,
    restaurantinfo,
    menuitem,
    categoryItemsList,
    userinfo,
    order,
  } = useReduxData();
  const [isloadAddress, setIsLoadAddress] = useState<boolean>(true);
  const b2b = restaurantinfo?.defaultLocation?.b2btype;
  const isSchoolProgramEnabled = restaurantinfo?.isSchoolProgramEnabled;
  const searchdata = menuitem?.searchdata;
  const searchtext = menuitem?.searchtext;
  const {
    searchItem,
    handleChangeSearch,
    handleSubmitSearch,
    handleClickCancel,
    errorMessage,
    loading,
  } = useSearchData(searchtext);

  // filterCategory serach data....
  const { filterCategory } = useUtility();
  const pickupordelivery = selecteddelivery.pickupordelivery;
  const menuItemsWithCat = filterCategory(
    searchtext !== "" && searchdata ? searchdata.menuItems : categoryItemsList,
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

  const loginButton = document.querySelector(".login-btn") as HTMLButtonElement;
  useEffect(() => {
    if (b2b && userinfo === null) {
      loginButton?.click();
    }
  }, [userinfo, loginButton]);

  const handleChangeAddress = () => {
    setIsLoadAddress(false);
  };

  return (
    <Layout handleChangeAddress={handleChangeAddress} page="location">
      <LoadLocationDirectComponent isLoadAddressChangeUrl={isloadAddress}>
        {!errorMessage && <CategoryHeader />}
      </LoadLocationDirectComponent>

      <CategoryMenuItems
        menuItemsWithCat={menuItemsWithCat}
        errorMessage={!loading ? errorMessage : ""}
        // categoryslug=""
      >
        <SearchBarComponent
          searchItem={searchItem}
          handleChangeSearch={handleChangeSearch}
          handleSubmitSearch={handleSubmitSearch}
          handleClickCancel={handleClickCancel}
          errorMessage={!loading ? errorMessage : ""}
        />
      </CategoryMenuItems>
    </Layout>
  );
};
export default LocationPage;
