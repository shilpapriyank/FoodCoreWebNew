import { ChangeEvent, useCallback, useState } from "react";
import { GetThemeDetails, ORDER_TYPE, ThemeObj } from "../common/utility";
import { useAppDispatch } from "../../../redux/hooks";
import { useReduxData } from "./useredux-data-hooks";
import { useParams, useRouter } from "next/navigation";
import {
  setSearchData,
  setSearchText,
} from "../../../redux/menu-item/menu-item.slice";
import { MenuItemServices } from "../../../redux/menu-item/menu-item.services";
import { setSelectedCategory } from "../../../redux/category/category.slice";

export const useSearchData = (searchtext: string) => {
  const dispatch = useAppDispatch();
  const [searchItem, setsearchItem] = useState<string>(searchtext);
  const { selecteddelivery, restaurantinfo, userinfo, menuitem } =
    useReduxData();
  let pickupordelivery = selecteddelivery.pickupordelivery;
  const searchdata = menuitem?.searchdata;
  const router = useRouter();
  const params = useParams();
  const { dynamic, location } = params;
  const [errorMessage, seterrorMessage] = useState(
    searchtext !== "" && Object.keys(searchdata).length === 0
      ? "Opps! No Items Found"
      : ""
  );
  const selctedTheme = GetThemeDetails(restaurantinfo?.themetype as number);

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setsearchItem(value);
    if (value.length === 0 && searchtext !== "") {
      handleClickCancel();
    }
  };

  const handleSubmitSearch = useCallback(() => {
    if (searchItem !== "") {
      dispatch(setSearchText(searchItem));
      dispatch(
        setSearchData({
          menuItems: [],
          categories: [],
        })
      );
      MenuItemServices.getSerachResult({
        locationId: restaurantinfo?.defaultLocation.locationId as number,
        restaurantId: restaurantinfo?.restaurantId as number,
        customerId: userinfo?.customerId ?? 0,
        serchQuery: searchItem.trim(),
      })
        .then((res) => {
          if (res && Object.keys(res).length > 0) {
            seterrorMessage("");
            let orderTypeCat = null;
            if (pickupordelivery === ORDER_TYPE.PICKUP.text) {
              orderTypeCat = res?.categories.filter(
                (item) => item.istakeoutavailable === true
              );
            } else if (pickupordelivery === ORDER_TYPE.DELIVERY.text) {
              orderTypeCat = res?.categories.filter(
                (item) => item.isdeliveryavailable === true
              );
            } else {
              orderTypeCat = res.categories;
            }
            let avilableMenuItem = res?.menuItems.filter((item) => {
              return orderTypeCat.some((cat) => cat.catId === item.catId);
            });
            res.categories = orderTypeCat;
            //chnage for the newtheme category based on theme condition
            if (selctedTheme?.name !== ThemeObj.newtheme) {
              res.menuItems = avilableMenuItem;
              dispatch(setSearchData(res));
              router.push(
                `/${selctedTheme?.url}/${dynamic}/${location}/${res?.categories[0]?.categoryslug}`
              );
              dispatch(setSelectedCategory(res?.categories[0]));
            } else {
              const newCatWithMenuItems = orderTypeCat?.map((cat) => {
                const menuItems = avilableMenuItem?.filter(
                  (menuItem) => menuItem?.catId === cat?.catId
                );
                return {
                  ...cat,
                  menuitems: menuItems,
                };
              });
              //res.menuItems = newCatWithMenuItems;
              res.menuItems = avilableMenuItem;
              //res.categories = newCatWithMenuItems;
              dispatch(setSearchData(res));
              router.push(
                `/${selctedTheme.url}/${dynamic}/${location}/${res?.categories[0]?.categoryslug}`
              );
              dispatch(setSelectedCategory(res.categories[0]));
            }
          } else {
            seterrorMessage("Opps! No Items Found");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchItem, searchtext]);

  function handleClickCancel() {
    dispatch(setSearchText(""));
    setsearchItem("");
    seterrorMessage("");
    dispatch(
      setSearchData({
        menuItems: [],
        categories: [],
      })
    );
  }
  return {
    searchItem,
    setsearchItem,
    handleChangeSearch,
    errorMessage,
    handleClickCancel,
    handleSubmitSearch,
  };
};
