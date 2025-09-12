import { ChangeEvent, useCallback, useState } from "react";
import { GetThemeDetails, ORDERTYPE, ThemeObj } from "../common/utility";
import { useReduxData } from "./useredux-data-hooks";
import {
  setSearchData,
  setSearchText,
} from "../../../redux/menu-item/menu-item.slice";
import { MenuItemServices } from "../../../redux/menu-item/menu-item.services";
import { setSelectedCategory } from "../../../redux/category/category.slice";
import { useAppDispatch } from "../../../redux/hooks";
import { useParams, useRouter } from "next/navigation";

export const useSearchData = (searchtext: string) => {
  const dispatch = useAppDispatch();
  const { selecteddelivery, restaurantinfo, userinfo, menuitem } =
    useReduxData();
  const pickupordelivery = selecteddelivery.pickupordelivery;
  const router = useRouter();
  const params = useParams();
  const { dynamic, location } = params;
  const selctedTheme = GetThemeDetails(restaurantinfo?.themetype as number);

  const [searchItem, setsearchItem] = useState(searchtext);
  const [errorMessage, seterrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setsearchItem(value);
    if (value.length === 0 && searchtext !== "") {
      handleClickCancel();
    }
  };

  const handleSubmitSearch = useCallback(() => {
    if (!searchItem.trim()) return;

    setLoading(true);
    // seterrorMessage("");

    dispatch(setSearchText(searchItem));
    MenuItemServices.getSerachResult({
      locationId: restaurantinfo?.defaultLocation.locationId as number,
      restaurantId: restaurantinfo?.restaurantId as number,
      customerId: userinfo?.customerId ?? 0,
      serchQuery: searchItem.trim(),
    })
      .then((res) => {
        if (res && Object.keys(res).length > 0) {
          let orderTypeCat =
            pickupordelivery === ORDERTYPE.Pickup
              ? res.categories.filter((cat) => cat.istakeoutavailable)
              : pickupordelivery === ORDERTYPE.Delivery
                ? res.categories.filter((cat) => cat.isdeliveryavailable)
                : res.categories;

          const availableMenuItems = res.menuItems.filter((item) =>
            orderTypeCat.some((cat) => cat.catId === item.catId)
          );

          res.categories = orderTypeCat;

          if (selctedTheme?.name !== ThemeObj.newtheme) {
            res.menuItems = availableMenuItems;
            dispatch(setSearchData(res));
            router.push(
              `/${selctedTheme?.url}/${dynamic}/${location}/${res.categories[0]?.categoryslug}`
            );
            dispatch(setSelectedCategory(res.categories[0]));
          } else {
            const newCatWithMenuItems = orderTypeCat.map((cat) => ({
              ...cat,
              menuitems: availableMenuItems.filter((item) => item.catId === cat.catId),
            }));
            res.menuItems = newCatWithMenuItems as any;
            dispatch(setSearchData(res));
            router.push(
              `/${selctedTheme?.url}/${dynamic}/${location}/${res.categories[0]?.categoryslug}`
            );
            dispatch(setSelectedCategory(res.categories[0]));
          }

          setLoading(false);
        } else {
          setLoading(false);
          seterrorMessage("Oops! No Items Found");
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
        // seterrorMessage("Something went wrong");
      });
  }, [searchItem, searchtext]);

  const handleClickCancel = () => {
    dispatch(setSearchText(""));
    setsearchItem("");
    seterrorMessage("");
    dispatch(setSearchData({ categories: [], menuItems: [] }));
  }
  return {
    searchItem,
    setsearchItem,
    handleChangeSearch,
    handleSubmitSearch,
    handleClickCancel,
    errorMessage,
    loading,
  };
};
