// import { useCallback, useState, ChangeEvent } from "react";
// import { useDispatch } from "react-redux";
// import { useRouter } from "next/router";
// import { AppDispatch } from "../../../redux/store";
// import { useReduxData } from "./useredux-data-hooks";
// import { setSearchData, setSearchText } from "../../../redux/menu-item/menu-item.slice";
// import { MenuItemServices } from "../../../redux/menu-item/menu-item.services";
// import { GetThemeDetails, ORDERTYPE, ThemeObj } from "../common/utility";
// import { selectedCategory } from "../../../redux/category/category.slice";
// import { CategoryType, MenuItemSearchResponse, MenuItemType, } from "@/types/customhook-types/usesearchdata-type";

// type UseSearchDataReturn = {
//     searchItem: string;
//     setsearchItem: React.Dispatch<React.SetStateAction<string>>;
//     handleChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
//     errorMessage: string;
//     handleClickCancel: () => void;
//     handleSubmitSearch: () => void;
// };
// // types/restaurant.ts
//  interface RestaurantDetail {
//   themetype?: string;
//   restaurantId?: number;
//   defaultLocation?: {
//     locationId?: number;
//     defaultordertype?: boolean;
//     [key: string]: any;
//   };
//   [key: string]: any;
// }


// export const useSearchData = (searchtext: string): UseSearchDataReturn => {
//     const dispatch = useDispatch<AppDispatch>();
//     const [searchItem, setsearchItem] = useState<string>(searchtext);

//     const { selecteddelivery, restaurantinfo, userinfo, menuitem } = useReduxData();
//     const pickupordelivery = selecteddelivery?.pickupordelivery;
//     const searchdata = menuitem?.searchdata ?? {};

//     const router = useRouter();
//     const { dynamic, location } = router.query as { dynamic: string; location: string };

//     const [errorMessage, seterrorMessage] = useState<string>(
//         searchtext !== "" && Object.keys(searchdata).length === 0 ? "Opps! No Items Found" : ""
//     );

//    // const selctedTheme = GetThemeDetails(restaurantinfo?.themetype);

//     const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         setsearchItem(value);

//         if (value.length === 0 && searchtext !== "") {
//             handleClickCancel();
//         }
//     };

//     const handleSubmitSearch = useCallback(() => {
//         if (searchItem !== "") {
//             dispatch(setSearchText(searchItem));
//             dispatch(setSearchData({}));

//             MenuItemServices.getSerachResult(
//                 restaurantinfo?.defaultLocation?.locationId,
//                 restaurantinfo?.restaurantId,
//                 userinfo?.customerId ?? 0,
//                 searchItem.trim()
//             )
//                 .then((res: MenuItemSearchResponse) => {
//                     if (Object.keys(res).length > 0) {
//                         seterrorMessage("");

//                         let orderTypeCat: CategoryType[] = [];

//                         if (pickupordelivery === ORDERTYPE.Pickup) {
//                             orderTypeCat = res.categories.filter(cat => cat.istakeoutavailable);
//                         } else if (pickupordelivery === ORDERTYPE.Delivery) {
//                             orderTypeCat = res.categories.filter(cat => cat.isdeliveryavailable);
//                         } else {
//                             orderTypeCat = res.categories;
//                         }

//                         const avilableMenuItem: MenuItemType[] = res.menuItems.filter(item =>
//                             orderTypeCat.some(cat => cat.catId === item.catId)
//                         );

//                         res.categories = orderTypeCat;

//                         if (selctedTheme.name !== ThemeObj.newtheme) {
//                             res.menuItems = avilableMenuItem;
//                             dispatch(setSearchData(res));
//                             router.push(`/${selctedTheme.url}/${dynamic}/${location}/${res.categories[0]?.categoryslug}`);
//                             dispatch(selectedCategory(res.categories[0]));
//                         } else {
//                             const newCatWithMenuItems = orderTypeCat.map(cat => ({
//                                 ...cat,
//                                 menuitems: avilableMenuItem.filter(item => item.catId === cat.catId)
//                             }));
//                             res.menuItems = newCatWithMenuItems;
//                             dispatch(setSearchData(res));
//                             router.push(`/${selctedTheme.url}/${dynamic}/${location}/${res.categories[0]?.categoryslug}`);
//                             dispatch(selectedCategory(res.categories[0]));
//                         }
//                     } else {
//                         seterrorMessage("Opps! No Items Found");
//                     }
//                 })
//                 .catch(err => {
//                     console.error("Search error:", err);
//                 });
//         }
//     }, []);

//     const handleClickCancel = () => {
//         dispatch(setSearchText(""));
//         setsearchItem("");
//         seterrorMessage("");
//         dispatch(setSearchData({}));
//     };

//     return {
//         searchItem,
//         setsearchItem,
//         handleChangeSearch,
//         errorMessage,
//         handleClickCancel,
//         handleSubmitSearch
//     };
// };
