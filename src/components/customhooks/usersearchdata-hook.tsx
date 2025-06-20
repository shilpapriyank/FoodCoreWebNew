'use client';

import { useCallback, useState, ChangeEvent } from "react";
import { GetThemeDetails, ORDERTYPE, ThemeObj } from "@/components/common/utility"; 
import { useSearchParams, useRouter } from "next/navigation";
import { useAppDispatch } from "../../../redux/hooks";
import { setSearchData, setSearchText } from "../../../redux/menu-item/menu-item.slice";
import { MenuItemServices } from "../../../redux/menu-item/menu-item.services";
import { useReduxData } from "./useredux-data-hooks";
import { selectedCategory } from "../../../redux/category/category.slice";
import { ThemeType } from "@/types/common-types/common.types";

interface Category {
  catId: number;
  categoryslug: string;
  istakeoutavailable?: boolean;
  isdeliveryavailable?: boolean;
  [key: string]: any;
}

interface MenuItem {
  catId: number;
  [key: string]: any;
}

interface SearchResponse {
  categories: Category[];
  menuItems: MenuItem[];
  [key: string]: any;
}

export const useSearchData = (initialSearchText: string) => {
  const dispatch = useAppDispatch();
  const [searchItem, setSearchItem] = useState(initialSearchText);
  const { selecteddelivery, restaurantinfo, userinfo, menuitem } = useReduxData();
  const pickupordelivery = selecteddelivery.pickupordelivery;
  const searchdata = menuitem?.searchdata || {};
  const router = useRouter();
  const searchParams = useSearchParams();
  const dynamic = searchParams.get("dynamic");
  const location = searchParams.get("location");

  const [errorMessage, setErrorMessage] = useState(
    initialSearchText !== "" && Object.keys(searchdata).length === 0 ? "Oops! No Items Found" : ""
  );

  const selectedTheme: ThemeType = GetThemeDetails(restaurantinfo.themetype);

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchItem(value);

    if (value.length === 0 && initialSearchText !== "") {
      handleClickCancel();
    }
  };

  const handleSubmitSearch = useCallback(() => {
    if (searchItem.trim() === "") return;

    dispatch(setSearchText(searchItem));
    dispatch(setSearchData({}));

    MenuItemServices.getSerachResult(
      restaurantinfo.defaultLocation.locationId,
    //   restaurantinfo.restaurantId,
    //   userinfo?.customerId ?? 0,
    //   searchItem.trim()
    )
      .then((res: SearchResponse) => {
        if (Object.keys(res).length > 0) {
          setErrorMessage("");

          let filteredCategories: Category[] = [];

          if (pickupordelivery === ORDERTYPE.Pickup) {
            filteredCategories = res.categories.filter(cat => cat.istakeoutavailable);
          } else if (pickupordelivery === ORDERTYPE.Delivery) {
            filteredCategories = res.categories.filter(cat => cat.isdeliveryavailable);
          } else {
            filteredCategories = res.categories;
          }

          const availableMenuItems = res.menuItems.filter(item =>
            filteredCategories.some(cat => cat.catId === item.catId)
          );

          res.categories = filteredCategories;

          if (selectedTheme.name !== ThemeObj.newtheme) {
            res.menuItems = availableMenuItems;
          } else {
            const newCatWithMenuItems = filteredCategories.map(cat => {
              const items = availableMenuItems.filter(item => item.catId === cat.catId);
              return { ...cat, menuitems: items };
            });
            res.menuItems = newCatWithMenuItems;
          }

          dispatch(setSearchData(res));
          dispatch(selectedCategory(res.categories[0]));

          router.push(`/${selectedTheme.url}/${dynamic}/${location}/${res.categories[0].categoryslug}`);
        } else {
          setErrorMessage("Oops! No Items Found");
        }
      })
      .catch(err => {
        console.error("Search error:", err);
      });
  }, [searchItem, dispatch, dynamic, location, pickupordelivery, restaurantinfo, selectedTheme, userinfo]);

  const handleClickCancel = () => {
    dispatch(setSearchText(""));
    setSearchItem("");
    setErrorMessage("");
    dispatch(setSearchData({}));
  };

  return {
    searchItem,
    setSearchItem,
    handleChangeSearch,
    errorMessage,
    handleClickCancel,
    handleSubmitSearch,
  };
};
