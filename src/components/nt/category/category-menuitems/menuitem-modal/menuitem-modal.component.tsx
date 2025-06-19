// import React, { useEffect, useMemo, useState } from "react";
// import { useDispatch } from "react-redux";
// import {
//   calculateNettotal,
//   GetCurrency,
//   GetThemeDetails,
//   ORDER_TYPE,
// } from "../../../../common/utility";
// import handleNotify from "../../../../default/helpers/toaster/toaster-notify";
// import { ToasterPositions } from "../../../../default/helpers/toaster/toaster-positions";
// import { ToasterTypes } from "../../../../default/helpers/toaster/toaster-types";
// import { useWindowDimensions } from "../../../../customhooks/usewindowdimension-hook";
// import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
// import {
//   MenuItemDetailList,
//   SelectedMenuItemDetail,
//   ToppingOption,
// } from "@/types/menuitem-types/menuitem.type";
// import { useParams, useRouter } from "next/navigation";
// import {
//   getMenuItemDetailes,
//   removeMenuItem,
//   selecteditemquantity,
//   selectedItemSize,
//   selectedMenuItem,
//   setDipendentId,
//   setDipendentIds,
//   setDipendentItemQty,
// } from "../../../../../../redux/menu-item/menu-item.slice";
// import { getDesc, getImagePath } from "@/components/nt/common/utility";
// import { MenuItemServices } from "../../../../../../redux/menu-item/menu-item.services";
// import MenuItemFooter from "./menuitem-footer.component";
// import MenuItemSize from "./menuitem-size.component";
// import MenuItemInfo from "./menuiteminfo.component";
// import { MenuItemTypes } from "../../../../../../redux/menu-item/menuitem.type";

// const MenuItemModal = ({
//   isOpenModal,
//   handleToggleDependnt,
//   handleToggleMenuItem,
//   isPreLoaded = false,
// }: any) => {
//   const {
//     menuitem,
//     restaurantinfo,
//     sessionid,
//     selecteddelivery,
//     userinfo,
//     main,
//     //studentdata,
//     recievingTime,
//     meredian,
//     order,
//     rewardpoints,
//   } = useReduxData();
//   const dispatch = useDispatch();
//   let selectedmenuitemdetail = menuitem.selectedmenuitemdetail;
//   const [minQty, setminQty] = useState<number>(1);
//   //   const [currentQty, setcurrentQty] = useState(
//   //     selectedmenuitemdetail.qty !== undefined ? selectedmenuitemdetail.qty : 1
//   //   );
//   const [currentQty, setcurrentQty] = useState<number>(
//     menuitem.selecteditemquantity !== undefined
//       ? menuitem.selecteditemquantity
//       : 1
//   );
//   const [isLoad, setisLoad] = useState<boolean>(false);
//   const [isCollpase, setisCollpase] = useState<boolean>(true);
//   const currencySymbol = GetCurrency();
//   const [lstcarttopping, setlstcarttopping] = useState<ToppingOption[]>([]);
//   const [count, setcount] = useState<number>(0);
//   const [refreshTopping, setrefreshTopping] = useState<boolean>(false);
//   const router = useRouter();
//   const params = useParams();
//   const { dynamic, location, category } = params;
//   const selctedTheme = GetThemeDetails(restaurantinfo.themetype);
//   const customerId = userinfo ? userinfo.customerId : 0;
//   const { restaurantId, defaultlocationId, defaultLocation } = restaurantinfo;
//   const sessionId = sessionid;
//   const dependentId = menuitem?.dependentid ?? 0;
//   const dependentIds = menuitem?.dependentitemids;
//   let menuItemDetail = (menuitem.menuitemdetaillist as MenuItemDetailList[])[0];
//   const deliveryaddressinfo = selecteddelivery;
//   const selectedsize = menuItemDetail.size.find(
//     (x: any) => x.sizeselected === true
//   );
//   const selectedtopping = selectedsize
//     ? menuItemDetail.topping.find(
//         (x) => x.subparameterId === selectedsize.subparameterId
//       )
//     : undefined;
//   //   let selectedsize =
//   //     menuItemDetail != undefined &&
//   //     menuItemDetail.size != undefined &&
//   //     menuItemDetail.size.filter((x) => x.sizeselected === true);
//   //   let selectedtopping =
//   //     menuItemDetail != undefined &&
//   //     menuItemDetail?.topping != undefined &&
//   //     menuItemDetail.topping.filter(
//   //       (x) => x.subparameterId == selectedsize?.subparameterId
//   //     );
//   let updateitemoptionincart = menuitem.updateitemoptionincart;
//   let selectedtoppings =
//     menuItemDetail != undefined &&
//     menuItemDetail.topping != undefined &&
//     menuItemDetail.topping.length > 0 &&
//     menuItemDetail?.topping.find(
//       (x) => x.subparameterId == selectedsize?.subparameterId
//     );
//   let maincategoryList = main?.maincategoryList;
//   var ordertype =
//     deliveryaddressinfo.pickupordelivery === ORDER_TYPE.DELIVERY.text
//       ? ORDER_TYPE.DELIVERY.value
//       : ORDER_TYPE.PICKUP.value;
//   let quantity = menuitem.selecteditemquantity;
//   // let studentname = studentdata.studentname;
//   //   const selectedItemDescription =
//   //     selectedmenuitemdetail !== undefined && selectedmenuitemdetail.description
//   //       ? selectedmenuitemdetail?.description
//   //       : menuitem?.menuitemdetaillist?.description;
//   const selectedItemDescription = menuItemDetail.description;
//   const selectedItemName =
//     menuItemDetail?.itemName !== undefined && menuItemDetail?.itemName;
//   let itemImage = getImagePath(
//     menuItemDetail.image,
//     restaurantinfo?.defaultLocation?.defaultmenuitemimage
//   );
//   var selecetdtime = recievingTime + " " + (meredian ?? "");
//   const menuItemId =
//     selectedmenuitemdetail[0].menuitemId ??
//     selectedmenuitemdetail[0].menuitemId;
//   const catSlug = maincategoryList?.find(
//     (cat) => cat?.catId === selectedmenuitemdetail?.[0]?.catId
//   )?.categoryslug;
//   let shareUrl = `${window.location.origin}/${
//     selctedTheme.url
//   }/${dynamic}/${location}/${catSlug}?menuitemId=${
//     selectedmenuitemdetail?.[0]?.menuitemId ??
//     selectedmenuitemdetail?.[0]?.menuitemId
//   }`;
//   let rpoint = 0;
//   const { width } = useWindowDimensions();
//   const isMobile = width < 768;
//   const { deliveryRequestId } = order;
//   let ramount = 0;
//   let rewardpoint = rewardpoints;
//   if (rewardpoint?.redeemPoint) {
//     rpoint = rewardpoint.redeemPoint > 0 ? rewardpoint.redeemPoint : 0;
//   }
//   if (rewardpoint?.rewardvalue && rpoint > 0) {
//     ramount = rpoint / rewardpoint.rewardvalue;
//   }

//   useEffect(() => {
//     // setcurrentQty(
//     //   selectedmenuitemdetail.qty !== undefined ? selectedmenuitemdetail.qty : 1
//     // );
//     setcurrentQty(
//       menuitem.selecteditemquantity !== undefined
//         ? menuitem.selecteditemquantity
//         : 1
//     );

//     if (isPreLoaded === true) {
//       setisLoad(true);
//       return;
//     }
//     // getMenuItemDetailes(restaurantinfo.restaurantId,restaurantinfo.defaultlocationId,0,selectedmenuitemdetail.menuitemId,sessionId,0)
//     if (dependentId === 0) {
//       MenuItemServices.getMenuItemList({
//         restaurantId,
//         locationId: defaultlocationId,
//         customerId,
//         menuitemId: menuItemId,
//         cartsessionId: sessionId as string,
//         cartId: 0,
//       }).then((response) => {
//         if (response) {
//           //   dispatch({
//           //     type: MenuItemTypes.MENU_ITEM_DETAIL_LIST,
//           //     payload: response,
//           //   });
//           dispatch(getMenuItemDetailes(response as any) as any);
//           setisLoad(true);
//         }
//       });
//     }
//     if (dependentId > 0) {
//       setisLoad(true);
//     }
//   }, [selectedmenuitemdetail]);

//   useEffect(() => {
//     dispatch(selecteditemquantity(currentQty));
//     //dispatch(getCartItemCount(sessionId, restaurantinfo.defaultlocationId, restaurantinfo.restaurantId, customerId));
//   }, [currentQty]);
//   useEffect(() => {
//     let selectedTopping = menuItemDetail.topping;
//     let selectedToppingLength = selectedTopping?.[0]?.list?.filter(
//       (item: any) => item.optionselected === true
//     ).length;
//     let lstcarttoppingNew = [];
//     if (selectedtoppings && selectedtoppings?.list) {
//       selectedtoppings.list != undefined &&
//         selectedtoppings.list.length > 0 &&
//         selectedtoppings.list.map((lsttop) => {
//           lsttop.type != undefined &&
//             lsttop.type.length > 0 &&
//             lsttop.type.map((type: any) => {
//               if (type.subOptionselected === true) {
//                 lstcarttoppingNew.push(type);
//                 setlstcarttopping(lstcarttoppingNew);
//               }
//             });
//         });
//     }

//     if (Array.isArray(selectedToppingLength)) {
//       let selectedtop = selectedToppingLength.find(
//         (item) => item.optionselected === true
//       );
//       let selectedToppintypeLength = selectedtop.type.filter(
//         (item: any) => item.subOptionselected === true
//       ).length;
//       if (selectedToppintypeLength === 0 && lstcarttoppingNew.length === 0) {
//         setlstcarttopping([]);
//       }
//     }
//     if (selectedtoppings && selectedtoppings?.list.length === 0) {
//       setlstcarttopping([]);
//     }
//   }, [refreshTopping, updateitemoptionincart, menuItemDetail]);

//   const handleRefreshTopping = () => {
//     setrefreshTopping(!refreshTopping);
//   };
//   const selectedSizeClick = (item: any) => {
//     setlstcarttopping([]);
//     setisCollpase(true);
//     if (item != undefined) {
//       let lstsizedata: any = [];
//       menuItemDetail.size.map((data) => {
//         if (data.type === item.type) data.sizeselected = true;
//         else data.sizeselected = false;

//         lstsizedata.push(data);
//       });
//       menuItemDetail.size = lstsizedata;
//       dispatch(removeMenuItem());
//       dispatch(selectedItemSize(menuItemDetail as any));
//     }
//     setcount(count + 1);
//     handleRefreshTopping();
//   };

//   const increment = () => {
//     const plusState = currentQty + 1;
//     if (menuitem?.dependentqty !== 0 && plusState > menuitem?.dependentqty) {
//       return;
//     }
//     setcurrentQty(plusState);
//   };

//   const decrement = () => {
//     if (minQty === currentQty) {
//       setcurrentQty(minQty);
//       return;
//     }
//     const minusState = currentQty - 1;
//     setcurrentQty(minusState);
//   };

//   const memorisedNetTotal = useMemo(() => {
//     return calculateNettotal(
//       lstcarttopping,
//       selectedsize,
//       quantity,
//       menuItemDetail
//     );
//   }, [lstcarttopping, quantity, selectedsize]);

//   const addToCart = () => {
//     if (dependentId > 0) {
//       selectedmenuitemdetail.menuItemName = menuItemDetail.itemName;
//     }
//     if (
//       dependentId === 0 &&
//       (menuItemDetail?.dependantMenuList?.length === 0 ||
//         menuItemDetail?.dependantMenuList === null) &&
//       menuitem?.dependentqty !== 0
//     ) {
//       dispatch(setDipendentItemQty(0));
//     }
//     let total =
//       selectedsize != undefined &&
//       selectedsize.length > 0 &&
//       selectedsize[0].price;
//     // let nettotal = total * currentQty;
//     //if (deliveryaddressinfo.pickupordelivery === "Pickup" || (deliveryaddressinfo.pickupordelivery === "Delivery")) {
//     let selectedoption =
//       selectedtopping.length > 0 &&
//       selectedtopping[0].list.filter((x) => x.isCompulsory == true);
//     if (selectedmenuitemdetail && selectedmenuitemdetail?.cartid > 0) {
//       //CHECK ITEM TOPPINGS REQUIRED IS SELECTED OR NOT
//       var isValidateItem = true;
//       //test
//       if (
//         menuItemDetail.topping != undefined &&
//         menuItemDetail.topping.length > 0 &&
//         selectedoption.length > 0
//       ) {
//         let result = [];
//         for (var i = 0; i < selectedoption.length; i++) {
//           if (
//             selectedoption[i].type != undefined &&
//             selectedoption[i].type.length > 0 &&
//             selectedoption[i].type.filter((x) => x.subOptionselected === true)
//               .length === 0
//           ) {
//             handleNotify(
//               "Please select atleast one item in " + selectedoption[i].name,
//               ToasterPositions.TopRight,
//               ToasterTypes.Error
//             );
//             result.push({ value: i, text: false });
//             isValidateItem = false;
//             break;
//           }
//         }
//       }

//       //THIS CONDITION WILL EXECUTE WHEN ITEM UPDATE FROM CART PAGE
//       if (isValidateItem) {
//         let itemobj = FormatOrderObject(
//           restaurantinfo,
//           selectedmenuitemdetail,
//           menuItemDetail,
//           customerId,
//           total,
//           currentQty,
//           sessionId,
//           ordertype,
//           selecetdtime,
//           studentname
//         );
//         if (itemobj != undefined) {
//           MenuItemServices.updateCartOrdersItem(itemobj, restaurantId).then(
//             (response) => {
//               if (response) {
//                 dispatch(
//                   getCartItem(
//                     sessionid,
//                     restaurantinfo.defaultlocationId,
//                     restaurantinfo.restaurantId,
//                     0,
//                     userinfo ? userinfo?.customerId : 0,
//                     rpoint,
//                     ramount,
//                     0,
//                     0,
//                     0,
//                     ordertype,
//                     order?.checktime,
//                     order?.deliveryRequestId
//                   )
//                 );
//                 dispatch(
//                   getCartItemCount(
//                     sessionId,
//                     defaultlocationId,
//                     restaurantId,
//                     customerId
//                   )
//                 );
//                 handleToggleMenuItem(false);
//                 //TODO:
//                 // setTimeout(() => {
//                 //     var randomval = Math.floor(1000 + Math.random() * 9000);

//                 //     router.push(`/${selectedTheme.url}/${dynamic}/${location}/cart?update=${randomval}`);
//                 // }, 1000);
//               }
//             }
//           );
//         }
//       }
//     } else if (
//       menuItemDetail.topping != undefined &&
//       menuItemDetail.topping.length === 0
//     ) {
//       let itemobj = FormatOrderObject(
//         restaurantinfo,
//         selectedmenuitemdetail,
//         menuItemDetail,
//         customerId,
//         total,
//         currentQty,
//         sessionId,
//         ordertype,
//         selecetdtime,
//         studentname
//       );
//       if (itemobj != undefined) {
//         MenuItemServices.addItemToCart(itemobj, restaurantId).then(
//           (response) => {
//             if (response) {
//               dispatch({
//                 type: MenuItemTypes.ADD_ITEM_TO_CART,
//                 payload: response,
//               });
//               dispatch(
//                 getCartItemCount(
//                   sessionId,
//                   defaultlocationId,
//                   restaurantId,
//                   customerId
//                 )
//               );
//               dispatch(
//                 getCartItem(
//                   sessionid,
//                   restaurantinfo.defaultlocationId,
//                   restaurantinfo.restaurantId,
//                   0,
//                   userinfo ? userinfo?.customerId : 0,
//                   rpoint,
//                   ramount,
//                   0,
//                   0,
//                   0,
//                   ordertype,
//                   order?.checktime,
//                   order?.deliveryRequestId
//                 )
//               );

//               handleToggleMenuItem(false);
//             }
//           }
//         );
//         // dispatch(updateCartItemCount());
//         dispatch(
//           getCartItemCount(
//             sessionId,
//             restaurantinfo.defaultlocationId,
//             restaurantinfo.restaurantId,
//             customerId
//           )
//         );
//       }
//     } else if (
//       menuItemDetail.topping != undefined &&
//       menuItemDetail.topping.length > 0 &&
//       selectedoption.length > 0
//     ) {
//       let result = [];
//       for (var i = 0; i < selectedoption.length; i++) {
//         if (
//           selectedoption[i].type != undefined &&
//           selectedoption[i].type.length > 0 &&
//           selectedoption[i].type.filter((x) => x.subOptionselected === true)
//             .length === 0
//         ) {
//           handleNotify(
//             "Please select atleast one item in " + selectedoption[i].name,
//             ToasterPositions.TopRight,
//             ToasterTypes.Error
//           );
//           result.push({ value: i, text: false });
//           break;
//         } else {
//           result.push({ value: i, text: true });
//         }
//       }
//       if (
//         result.length > 0 &&
//         result.filter((x) => x.text == false).length === 0
//       ) {
//         let itemobj = FormatOrderObject(
//           restaurantinfo,
//           selectedmenuitemdetail,
//           menuItemDetail,
//           customerId,
//           total,
//           currentQty,
//           sessionId,
//           ordertype,
//           selecetdtime,
//           studentname
//         );
//         if (itemobj != undefined) {
//           MenuItemServices.addItemToCart(itemobj, restaurantId).then(
//             (response) => {
//               if (response) {
//                 dispatch({
//                   type: MenuItemTypes.ADD_ITEM_TO_CART,
//                   payload: response,
//                 });
//                 dispatch(
//                   getCartItemCount(
//                     sessionId,
//                     defaultlocationId,
//                     restaurantId,
//                     customerId
//                   )
//                 );
//                 dispatch(
//                   getCartItem(
//                     sessionid,
//                     restaurantinfo.defaultlocationId,
//                     restaurantinfo.restaurantId,
//                     0,
//                     userinfo ? userinfo?.customerId : 0,
//                     rpoint,
//                     ramount,
//                     0,
//                     0,
//                     0,
//                     ordertype,
//                     order?.checktime,
//                     order?.deliveryRequestId
//                   )
//                 );

//                 // dispatch(updateCartItemCount());

//                 //TO DO:HANDLE THE DEPENDET ITEM POPUP
//                 handleToggleMenuItem(false);
//                 // console.log(menuItemDetail?.dependantMenuList.length)
//                 if (
//                   menuItemDetail?.dependantMenuList?.length > 0 &&
//                   ((dependentIds === undefined && dependentId === 0) ||
//                     (dependentIds?.length === 0 && dependentId === 0))
//                 ) {
//                   //TODO:
//                   setTimeout(() => {
//                     handleToggleDependnt?.(true);
//                   }, 500);
//                 } else {
//                   if (
//                     (menuItemDetail?.dependantMenuList?.length > 0 &&
//                       menuItemDetail?.dependantMenuList !== null) ||
//                     dependentIds?.length > 0
//                   ) {
//                     let dependentItemList =
//                       dependentIds?.length > 0
//                         ? dependentIds
//                         : menuItemDetail?.dependantMenuList?.map(
//                             (item) => item?.DependantMenuItemId
//                           );
//                     let removefirst = dependentItemList?.shift();
//                     let remainingList = dependentItemList;
//                     dispatch(setDipendentId(removefirst?.DependantMenuItemId));
//                     dispatch(setDipendentIds(remainingList));
//                   } else {
//                     dispatch(setDipendentId(0));
//                     dispatch(setDipendentItemQty(0));
//                   }
//                 }
//               }
//             }
//           );
//         }
//       }
//     } else if (
//       menuItemDetail.topping != undefined &&
//       menuItemDetail.topping.length > 0 &&
//       selectedoption.length === 0
//     ) {
//       let itemobj = FormatOrderObject(
//         restaurantinfo,
//         selectedmenuitemdetail,
//         menuItemDetail,
//         customerId,
//         total,
//         currentQty,
//         sessionId,
//         ordertype,
//         selecetdtime,
//         studentname
//       );
//       if (itemobj != undefined) {
//         MenuItemServices.addItemToCart(itemobj, restaurantId).then(
//           (response) => {
//             if (response) {
//               dispatch({
//                 type: MenuItemTypes.ADD_ITEM_TO_CART,
//                 payload: response,
//               });
//               dispatch(
//                 getCartItemCount(
//                   sessionId,
//                   defaultlocationId,
//                   restaurantId,
//                   customerId
//                 )
//               );
//               handleToggleMenuItem(false);
//               dispatch(
//                 getCartItem(
//                   sessionid,
//                   restaurantinfo.defaultlocationId,
//                   restaurantinfo.restaurantId,
//                   0,
//                   userinfo ? userinfo?.customerId : 0,
//                   rpoint,
//                   ramount,
//                   0,
//                   0,
//                   0,
//                   ordertype,
//                   order?.checktime,
//                   order?.deliveryRequestId
//                 )
//               );

//               // dispatch(updateCartItemCount());
//               // dispatch(getCartItemCount(sessionId, restaurantinfo.defaultlocationId, restaurantinfo.restaurantId, customerId));

//               if (
//                 menuItemDetail?.dependantMenuList?.length > 0 &&
//                 ((dependentIds === undefined && dependentId === 0) ||
//                   (dependentIds?.length === 0 && dependentId === 0))
//               ) {
//                 //TODO:
//                 setTimeout(() => {
//                   handleToggleDependnt?.(true);
//                 }, 500);
//               } else {
//                 if (
//                   (menuItemDetail?.dependantMenuList?.length > 0 &&
//                     menuItemDetail?.dependantMenuList !== null) ||
//                   dependentIds?.length > 0
//                 ) {
//                   let dependentItemList =
//                     dependentIds?.length > 0
//                       ? dependentIds
//                       : menuItemDetail?.dependantMenuList?.map(
//                           (item) => item?.DependantMenuItemId
//                         );
//                   let removefirst = dependentItemList?.shift();
//                   let remainingList = dependentItemList;
//                   dispatch(setDipendentId(removefirst?.DependantMenuItemId));
//                   dispatch(setDipendentIds(remainingList));
//                   // if (remainingList.length === 0 && removefirst?.DependantMenuItemId > 0) {

//                   // }
//                 } else {
//                   dispatch(setDipendentId(0));
//                   dispatch(setDipendentItemQty(0));
//                 }
//               }
//             }
//           }
//         );
//       }
//     }
//   };

//   const handleClickSkip = () => {
//     handleToggleMenuItem(false);
//     if (
//       // (menuItemDetail?.dependantMenuList.length > 0 && menuItemDetail?.dependantMenuList !== null)
//       dependentIds?.length > 0
//     ) {
//       dispatch({
//         type: MenuItemTypes.MENU_ITEM_DETAIL_LIST,
//         payload: {},
//       });
//       let dependentItemList =
//         dependentIds?.length > 0
//           ? dependentIds
//           : menuItemDetail?.dependantMenuList?.map(
//               (item) => item?.DependantMenuItemId
//             );
//       let removefirst = dependentItemList?.shift();
//       let remainingList = dependentItemList;
//       dispatch(setDipendentId(removefirst.DependantMenuItemId));
//       dispatch(setDipendentIds(remainingList));
//     } else {
//       dispatch(setDipendentItemQty(0));
//       dispatch(setDipendentId(0));
//     }
//   };
//   const selectedFavoriteClick = (item) => {
//     setcount(count + 1);
//     let objdata = selectedmenuitemdetail;
//     objdata.isFavoriteMenu = item;
//     dispatch(removeMenuItemForFavorite());
//     dispatch(selectedMenuItem(objdata));
//     if (item === true) {
//       dispatch(
//         addFavorite(
//           userinfo.customerId.toString(),
//           restaurantinfo.restaurantId,
//           objdata.menuitemId != undefined
//             ? objdata.menuitemId
//             : objdata.menuitemid
//         )
//       );
//     } else {
//       dispatch(
//         deleteFavorite(
//           userinfo.customerId,
//           restaurantinfo.restaurantId,
//           objdata.menuitemId != undefined
//             ? objdata.menuitemId
//             : objdata.menuitemid
//         )
//       );
//     }
//   };
//   return (
//     <>
//       <div
//         className={`modal modal-product fade ${
//           isOpenModal ? "show d-block" : ""
//         }`}
//         id="exampleModal"
//         tabIndex={-1}
//         aria-labelledby="exampleModalLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <div className={`modal-content ${dependentId > 0 ? "pt-5" : ""}`}>
//             <button
//               type="button"
//               className={dependentId > 0 ? "d-none btn-close" : "btn-close"}
//               onClick={() => handleToggleMenuItem(false)}
//             />
//             {Object.keys(menuItemDetail).length > 0 ? (
//               <>
//                 <form>
//                   <div className="modal-body">
//                     <MenuItemInfo
//                       selectedSizeClick={selectedSizeClick}
//                       selectedFavoriteClick={selectedFavoriteClick}
//                       name={selectedItemName}
//                       desc={selectedItemDescription}
//                       shareUrl={shareUrl}
//                       isFavourite={selectedmenuitemdetail?.isFavoriteMenu}
//                       img={itemImage}
//                     />
//                     <div className="row mt-3">
//                       <div className="col-lg-12 sppr col-md-12 col-12">
//                         {isMobile && (
//                           <MenuItemSize
//                             selectedSizeClick={selectedSizeClick}
//                             shareUrl={shareUrl}
//                           />
//                         )}
//                         <div className="d-block d-md-none">
//                           <h1>Description</h1>
//                           <p> {getDesc(selectedItemDescription)}</p>
//                           {/* <p >  {selectedItemDescription}</p> */}
//                         </div>
//                         {/* <div className="accordion" id="toppings-accordion">
//                                                     <div className="row"> */}
//                         {isLoad && (
//                           <MenuItemOptions
//                             isLoad={isLoad}
//                             count={count}
//                             isExpand={isPreLoaded}
//                           />
//                         )}
//                         {/* </div>
//                                                 </div> */}
//                       </div>
//                     </div>
//                   </div>
//                   <MenuItemFooter>
//                     <MenuItemQty
//                       increment={increment}
//                       decrement={decrement}
//                       currentQty={currentQty}
//                     />
//                     <MenuItemAddCartBtn
//                       addToCart={addToCart}
//                       currencySymbol={currencySymbol}
//                       memorisedNetTotal={memorisedNetTotal}
//                     />
//                     {dependentId > 0 && (
//                       <div className="col-lg-4   col-md-5 col-12 mt-1 mt-md-0 p-0 ps-md-1">
//                         <a
//                           className="btn-default btn-order "
//                           onClick={handleClickSkip}
//                         >
//                           {" "}
//                           Skip{" "}
//                         </a>
//                       </div>
//                     )}
//                   </MenuItemFooter>
//                 </form>
//               </>
//             ) : (
//               <>
//                 <MenuItemSkeletonComponent />
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="modal-backdrop fade show"></div>
//     </>
//   );
// };

// export default MenuItemModal;
