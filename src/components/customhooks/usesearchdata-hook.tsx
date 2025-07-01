import { ChangeEvent, useCallback, useState } from "react";
import {
  GetThemeDetails,
  ORDER_TYPE_ENUM,
  ThemeObj,
} from "../common/utility";
import { useAppDispatch } from "../../../redux/hooks";
import { useReduxData } from "./useredux-data-hooks";
import { useParams, useRouter } from "next/navigation";
import {
  setSearchData,
  setSearchText,
} from "../../../redux/menu-item/menu-item.slice";
import { MenuItemServices } from "../../../redux/menu-item/menu-item.services";
import {
  GetAllMenuCategoryItems,
  GetSerachResult,
  Menuitems,
} from "@/types/menuitem-types/menuitem.type";
import { selectedCategory } from "../../../redux/category/category.slice";

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
  const selctedTheme = GetThemeDetails(restaurantinfo!.themetype);

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
            if (pickupordelivery === ORDER_TYPE_ENUM.PICKUP) {
              orderTypeCat = res?.categories.filter(
                (item) => item.istakeoutavailable === true
              );
            } else if (pickupordelivery === ORDER_TYPE_ENUM.DELIVERY) {
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
              dispatch(selectedCategory(res?.categories[0]));
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
              dispatch(selectedCategory(res.categories[0]));
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

// "use client";

// import { useCallback, useState, ChangeEvent } from "react";
// import {
//   GetThemeDetails,
//   ORDER_TYPE_ENUM,
//   ORDERTYPE,
//   ThemeObj,
// } from "@/components/common/utility";
// import { useSearchParams, useRouter } from "next/navigation";
// import { useAppDispatch } from "../../../redux/hooks";
// import {
//   setSearchData,
//   setSearchText,
// } from "../../../redux/menu-item/menu-item.slice";
// import { MenuItemServices } from "../../../redux/menu-item/menu-item.services";
// import { selectedCategory } from "../../../redux/category/category.slice";
// import { useReduxData } from "./useredux-data-hooks";
// import { ThemeType } from "@/types/common-types/common.types";

// interface Category {
//   catId: number;
//   categoryslug: string;
//   istakeoutavailable?: boolean;
//   isdeliveryavailable?: boolean;
//   [key: string]: any;
// }

// interface MenuItem {
//   catId: number;
//   [key: string]: any;
// }

// interface SearchResponse {
//   categories: Category[];
//   menuItems: MenuItem[];
//   [key: string]: any;
// }

// export const useSearchData = (initialSearchText: string) => {
//   const dispatch = useAppDispatch();
//   const [searchItem, setSearchItem] = useState(initialSearchText);
//   const { selecteddelivery, restaurantinfo, userinfo, menuitem } =
//     useReduxData();
//   const pickupordelivery = selecteddelivery.pickupordelivery;
//   const searchdata = menuitem?.searchdata || {};
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const dynamic = searchParams.get("dynamic");
//   const location = searchParams.get("location");

//   const [errorMessage, setErrorMessage] = useState(
//     initialSearchText !== "" && Object.keys(searchdata).length === 0
//       ? "Oops! No Items Found"
//       : ""
//   );

//   const selectedTheme: ThemeType = GetThemeDetails(restaurantinfo?.themetype);

//   const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setSearchItem(value);

//     if (value.length === 0 && initialSearchText !== "") {
//       handleClickCancel();
//     }
//   };

//   const handleSubmitSearch = useCallback(() => {
//     if (searchItem.trim() === "") return;

//     dispatch(setSearchText(searchItem));
//     dispatch(setSearchData({}));

//     MenuItemServices.getSerachResult({
//       restaurantId: restaurantinfo?.restaurantId as number,
//       locationId: restaurantinfo?.defaultLocation?.locationId as number,
//       customerId: userinfo?.customerId ?? 0,
//       serchQuery: searchItem.trim(),
//     })
//       .then((res) => {
//         if (Object.keys(res).length > 0) {
//           setErrorMessage("");

//           let filteredCategories: Category[] = [];

//           if (pickupordelivery === ORDER_TYPE_ENUM.PICKUP) {
//             filteredCategories = res.categories.filter(
//               (cat) => cat.istakeoutavailable
//             );
//           } else if (pickupordelivery === ORDER_TYPE_ENUM.DELIVERY) {
//             filteredCategories = res.categories.filter(
//               (cat) => cat.isdeliveryavailable
//             );
//           } else {
//             filteredCategories = res.categories;
//           }

//           const availableMenuItems = res.menuItems.filter((item) =>
//             filteredCategories.some((cat) => cat.catId === item.catId)
//           );

//           res.categories = filteredCategories;

//           if (selectedTheme.name !== ThemeObj.newtheme) {
//             res.menuItems = availableMenuItems;
//           } else {
//             const newCatWithMenuItems = filteredCategories.map((cat) => {
//               const items = availableMenuItems.filter(
//                 (item) => item.catId === cat.catId
//               );
//               return { ...cat, menuitems: items };
//             });
//             res.menuItems = newCatWithMenuItems;
//           }

//           dispatch(setSearchData(res));
//           dispatch(selectedCategory(res.categories[0]));

//           router.push(
//             `/${selectedTheme.url}/${dynamic}/${location}/${res.categories[0].categoryslug}`
//           );
//         } else {
//           setErrorMessage("Oops! No Items Found");
//         }
//       })
//       .catch((err) => {
//         console.error("Search error:", err);
//       });
//   }, [
//     searchItem,
//     dispatch,
//     dynamic,
//     location,
//     pickupordelivery,
//     restaurantinfo,
//     selectedTheme,
//     userinfo,
//   ]);

//   const handleClickCancel = () => {
//     dispatch(setSearchText(""));
//     setSearchItem("");
//     setErrorMessage("");
//     dispatch(setSearchData({}));
//   };

//   return {
//     searchItem,
//     setSearchItem,
//     handleChangeSearch,
//     errorMessage,
//     handleClickCancel,
//     handleSubmitSearch,
//   };
// };
