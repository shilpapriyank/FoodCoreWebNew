import { useCallback, useState } from "react";
import { GetThemeDetails, ORDERTYPE, ThemeObj } from "../common/utility";
import { useAppDispatch } from "../../../redux/hooks";
import { useParams, useRouter } from "next/navigation";
import {
  setSearchData,
  setSearchText,
} from "../../../redux/menu-item/menu-item.slice";
import { MenuItemServices } from "../../../redux/menu-item/menu-item.services";
import { selectedCategory } from "../../../redux/category/category.slice";
import { useReduxData } from "./useredux-data-hooks";

export const useSearchData = (searchtext: any) => {
  const dispatch = useAppDispatch();
  const [searchItem, setsearchItem] = useState(searchtext);
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
  const selctedTheme = GetThemeDetails(restaurantinfo?.themetype);

  const handleChangeSearch = (e: any) => {
    let value = e.target.value;
    setsearchItem(value);
    if (value.length === 0 && searchtext !== "") {
      handleClickCancel();
    }
  };

  const handleSubmitSearch = useCallback(() => {
    if (searchItem !== "") {
      dispatch(setSearchText(searchItem));
      dispatch(setSearchData({}));
      MenuItemServices.getSerachResult({
        locationId: restaurantinfo.defaultLocation.locationId,
        restaurantId: restaurantinfo.restaurantId,
        customerId: userinfo?.customerId ?? 0,
        serchQuery: searchItem.trim(),
      })
        .then((res) => {
          if (Object.keys(res).length > 0) {
            seterrorMessage("");
            let orderTypeCat = null;
            if (pickupordelivery === ORDERTYPE.Pickup) {
              orderTypeCat = res.categories.filter(
                (item: any) => item.istakeoutavailable === true
              );
            } else if (pickupordelivery === ORDERTYPE.Delivery) {
              orderTypeCat = res.categories.filter(
                (item: any) => item.isdeliveryavailable === true
              );
            } else {
              orderTypeCat = res.categories;
            }
            let avilableMenuItem = res.menuItems.filter((item: any) => {
              return orderTypeCat.some((cat: any) => cat.catId === item.catId);
            });
            res.categories = orderTypeCat;
            //chnage for the newtheme category based on theme condition
            if (selctedTheme.name !== ThemeObj.newtheme) {
              res.menuItems = avilableMenuItem;
              dispatch(setSearchData(res));
              router.push(
                `/${selctedTheme.url}/${dynamic}/${location}/${res?.categories[0]?.categoryslug}`
              );
              dispatch(selectedCategory(res.categories[0]));
            } else {
              const newCatWithMenuItems = orderTypeCat?.map((cat: any) => {
                const menuItems = avilableMenuItem?.filter(
                  (menuItem: any) => menuItem?.catId === cat?.catId
                );
                console.log("menu item from usesearchdata-hook", menuItems);
                return {
                  ...cat,
                  menuitems: menuItems,
                };
              });
              res.menuItems = newCatWithMenuItems;
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
    dispatch(setSearchData({}));
  }
  return {
    searchItem,
    setsearchItem,
    handleChangeSearch,
    errorMessage,
    handleClickCancel,
    handleSubmitSearch,
    selctedTheme,
  };
};

// import { useCallback, useState } from "react";
// import { GetThemeDetails, ORDERTYPE, ThemeObj } from "../common/utility";
// import { useParams, useRouter } from "next/navigation";
// import {
//   setSearchData,
//   setSearchText,
// } from "../../../redux/menu-item/menu-item.slice";
// import { MenuItemServices } from "../../../redux/menu-item/menu-item.services";
// import { selectedCategory } from "../../../redux/category/category.slice";
// import { useReduxData } from "./useredux-data-hooks";
// import { useAppDispatch } from "../../../redux/hooks";

// export const useSearchData = (searchtext: string) => {
//   const dispatch = useAppDispatch();
//   const [searchItem, setsearchItem] = useState(searchtext);
//   const { selecteddelivery, restaurantinfo, userinfo, menuitem } =
//     useReduxData();
//   let pickupordelivery = selecteddelivery.pickupordelivery;
//   const searchdata = menuitem?.searchdata;
//   const router = useRouter();
//   const params = useParams();
//   const { dynamic, location } = params;
//   const [errorMessage, seterrorMessage] = useState(
//     searchtext !== "" && Object.keys(searchdata).length === 0
//       ? "Opps! No Items Found"
//       : ""
//   );
//   const selctedTheme = GetThemeDetails(restaurantinfo.themetype);

//   const handleChangeSearch = (e: any) => {
//     let value = e.target.value;
//     setsearchItem(value);
//     if (value.length === 0 && searchtext !== "") {
//       handleClickCancel();
//     }
//   };

//   const handleSubmitSearch = useCallback(() => {
//     if (searchItem !== "") {
//       dispatch(setSearchText(searchItem));
//       dispatch(setSearchData({}));
//       MenuItemServices.getSerachResult({
//         locationId: restaurantinfo.defaultLocation.locationId,
//         restaurantId: restaurantinfo.restaurantId,
//         customerId: userinfo?.customerId ?? 0,
//         serchQuery: searchItem.trim(),
//       })
//         .then((res) => {
//           if (Object.keys(res).length > 0) {
//             seterrorMessage("");
//             let orderTypeCat = null;
//             if (pickupordelivery === ORDERTYPE.Pickup) {
//               orderTypeCat = res.categories.filter(
//                 (item: any) => item.istakeoutavailable === true
//               );
//             } else if (pickupordelivery === ORDERTYPE.Delivery) {
//               orderTypeCat = res.categories.filter(
//                 (item: any) => item.isdeliveryavailable === true
//               );
//             } else {
//               orderTypeCat = res.categories;
//             }
//             let avilableMenuItem = res.menuItems.filter((item: any) => {
//               return orderTypeCat.some((cat: any) => cat.catId === item.catId);
//             });
//             res.categories = orderTypeCat;
//             //chnage for the newtheme category based on theme condition
//             if (selctedTheme.name !== ThemeObj.newtheme) {
//               res.menuItems = avilableMenuItem;
//               dispatch(setSearchData(res));
//               router.push(
//                 `/${selctedTheme.url}/${dynamic}/${location}/${res?.categories[0]?.categoryslug}`
//               );
//               dispatch(selectedCategory(res.categories[0]));
//             } else {
//               const newCatWithMenuItems = orderTypeCat?.map((cat: any) => {
//                 const menuItems = avilableMenuItem?.filter(
//                   (menuItem: any) => menuItem?.catId === cat?.catId
//                 );
//                 return {
//                   ...cat,
//                   menuitems: menuItems,
//                 };
//               });
//               res.menuItems = newCatWithMenuItems;
//               dispatch(setSearchData(res));
//               router.push(
//                 `/${selctedTheme.url}/${dynamic}/${location}/${res?.categories[0]?.categoryslug}`
//               );
//               dispatch(selectedCategory(res.categories[0]));
//             }
//           } else {
//             seterrorMessage("Opps! No Items Found");
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   }, [searchItem, searchtext]);

//   function handleClickCancel() {
//     dispatch(setSearchText(""));
//     setsearchItem("");
//     seterrorMessage("");
//     dispatch(setSearchData({}));
//   }
//   return {
//     searchItem,
//     setsearchItem,
//     handleChangeSearch,
//     errorMessage,
//     handleClickCancel,
//     handleSubmitSearch,
//   };
// };
