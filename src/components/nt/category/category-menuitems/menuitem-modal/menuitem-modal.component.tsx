import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import {
  calculateNettotal,
  GetCurrency,
  GetThemeDetails,
} from "../../../../common/utility";
import handleNotify from "../../../../default/helpers/toaster/toaster-notify";
import { ToasterPositions } from "../../../../default/helpers/toaster/toaster-positions";
import { ToasterTypes } from "../../../../default/helpers/toaster/toaster-types";
import { useWindowDimensions } from "../../../../customhooks/usewindowdimension-hook";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { useParams, useRouter } from "next/navigation";
import {
  addFavorite,
  deleteFavorite,
  getMenuItemDetailes,
  removeMenuItem,
  removeMenuItemForFavorite,
  selecteditemquantity,
  selectedItemSize,
  selectedMenuItem,
  setDipendentId,
  setDipendentIds,
  setDipendentItemQty,
  setMenuCategoryData,
  setMenuItemDetailList,
} from "../../../../../../redux/menu-item/menu-item.slice";
import {
  getDesc,
  getImagePath,
  ORDER_TYPE,
} from "@/components/nt/common/utility";
import { MenuItemServices } from "../../../../../../redux/menu-item/menu-item.services";
import MenuItemFooter from "./menuitem-footer.component";
import MenuItemSize from "./menuitem-size.component";
import MenuItemInfo from "./menuiteminfo.component";
import { MenuItemTypes } from "../../../../../../redux/menu-item/menuitem.type";
import { FormatOrderObject } from "@/components/nt/common/format-order-object";
import {
  getCartItem,
  setCartItem,
} from "../../../../../../redux/cart/cart.slice";
import { getCartItemCount } from "../../../../../../redux/tableorder/tableorder.slice";
import MenuItemOptions from "./menuitem-options.component";
import MenuItemAddCartBtn from "./menuitem-addtocart.component";
import MenuItemQty from "./menuitem-qty.component";
import MenuItemSkeletonComponent from "@/components/nt/skeleton/menuitem-skeleton.component";
import { useAppDispatch } from "../../../../../../redux/hooks";
import {
  GetMenuItemDetail,
  List,
  SelectedMenuItemDetail,
  Size,
  Topping,
  Type,
} from "@/types/menuitem-types/menuitem.type";
import { GetAllRestaurantInfo } from "@/types/restaurant-types/restaurant.type";
import {
  CartDetails,
  CartItemDetail,
} from "@/types/cart-types/cartservice.type";
import ToastNotify from "@/components/nt/helpers/toastnotify/toast-notify.component";

const MenuItemModal = ({
  isOpenModal,
  handleToggleDependnt,
  handleToggleMenuItem,
  isPreLoaded = false,
}: {
  isOpenModal?: boolean;
  handleToggleDependnt?: (value: boolean) => void;
  handleToggleMenuItem: (value: boolean) => void;
  isPreLoaded?: boolean;
}) => {
  const {
    menuitem,
    restaurantinfo,
    sessionid,
    selecteddelivery,
    userinfo,
    main,
    //studentdata,
    recievingTime,
    meredian,
    order,
    rewardpoints,
  } = useReduxData();
  const dispatch = useAppDispatch();
  let selectedmenuitemdetail = menuitem.selectedmenuitemdetail;
  const [minQty, setminQty] = useState<number>(1);
  //   const [currentQty, setcurrentQty] = useState<number>(
  //     selectedmenuitemdetail.qty !== undefined ? selectedmenuitemdetail.qty : 1
  //   );
  const [currentQty, setcurrentQty] = useState<number>(
    menuitem.selecteditemquantity !== undefined
      ? menuitem.selecteditemquantity
      : 1
  );
  const [isLoad, setisLoad] = useState<boolean>(false);
  const [isCollpase, setisCollpase] = useState<boolean>(true);
  const currencySymbol = GetCurrency();
  const [lstcarttopping, setlstcarttopping] = useState<Topping[]>([]);
  const [count, setcount] = useState<number>(0);
  const [refreshTopping, setrefreshTopping] = useState<boolean>(false);
  const router = useRouter();
  const params = useParams();
  const { dynamic, location, category } = params;
  const selctedTheme = GetThemeDetails(restaurantinfo?.themetype as number);
  const customerId = userinfo?.customerId;
  const { restaurantId, defaultlocationId } =
    restaurantinfo as GetAllRestaurantInfo;
  const sessionId = sessionid;
  const dependentId = menuitem?.dependentid ?? 0;
  const dependentIds = menuitem?.dependentitemids;
  let menuItemDetail = menuitem.menuitemdetaillist;
  //let menuItemDetail = menuitem?.menuitemdetaillist;
  // console.log(
  //   "selected menuitem detail from menuitem-modal compo",
  //   menuitem?.selectedmenuitemdetail
  // );
  const deliveryaddressinfo = selecteddelivery;
  let selectedsize =
    menuItemDetail &&
    menuItemDetail.size != undefined &&
    menuItemDetail.size.filter((x) => x.sizeselected === true);
  let selectedtopping =
    menuItemDetail &&
    selectedsize &&
    menuItemDetail.topping.filter(
      (x) => x.subparameterId == selectedsize[0].subparameterId
    );
  let updateitemoptionincart = menuitem.updateitemoptionincart;
  let selectedtoppings =
    menuItemDetail &&
    selectedsize &&
    menuItemDetail?.topping.find(
      (x) => x.subparameterId == selectedsize[0].subparameterId
    );
  let maincategoryList = main?.maincategoryList;
  var ordertype =
    deliveryaddressinfo.pickupordelivery === ORDER_TYPE.DELIVERY.text
      ? ORDER_TYPE.DELIVERY.value
      : ORDER_TYPE.PICKUP.value;
  let quantity = menuitem.selecteditemquantity;
  //let studentname = studentdata.studentname;
  const selectedItemDescription =
    selectedmenuitemdetail !== undefined && selectedmenuitemdetail?.description
      ? selectedmenuitemdetail?.description
      : menuitem?.menuitemdetaillist?.description;
  const selectedItemName =
    menuItemDetail?.itemName !== undefined && menuItemDetail?.itemName;
  let itemImage = getImagePath(
    menuItemDetail?.image,
    restaurantinfo?.defaultLocation?.defaultmenuitemimage
  );
  var selecetdtime = recievingTime + " " + (meredian ?? "");
  const menuItemId =
    selectedmenuitemdetail?.menuitemId ?? selectedmenuitemdetail?.menuitemId;
  const catSlug = maincategoryList?.find(
    (cat) => cat?.catId === selectedmenuitemdetail?.catId
  )?.categoryslug;
  let shareUrl = `${window.location.origin}/${
    selctedTheme?.url
  }/${dynamic}/${location}/${catSlug}?menuitemId=${
    selectedmenuitemdetail?.menuitemId ?? selectedmenuitemdetail?.menuitemId
  }`;
  let rpoint = 0;
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const { deliveryRequestId } = order;
  let ramount = 0;
  let rewardpoint = rewardpoints;
  if (rewardpoint?.redeemPoint) {
    rpoint = rewardpoint.redeemPoint > 0 ? rewardpoint.redeemPoint : 0;
  }
  if (rewardpoint?.rewardvalue && rpoint > 0) {
    ramount = rpoint / rewardpoint.rewardvalue;
  }

  useEffect(() => {
    setcurrentQty(
      selectedmenuitemdetail?.qty !== undefined ? selectedmenuitemdetail.qty : 1
    );
    if (isPreLoaded === true) {
      setisLoad(true);
      return;
    }
    // getMenuItemDetailes(restaurantinfo.restaurantId,restaurantinfo.defaultlocationId,0,selectedmenuitemdetail.menuitemId,sessionId,0)
    if (dependentId === 0) {
      MenuItemServices.getMenuItemList({
        restaurantId,
        locationId: defaultlocationId,
        customerId: customerId as number,
        menuitemId: menuItemId as number,
        cartsessionId: sessionId as string,
        cartId: 0,
      }).then((response) => {
        if (response) {
          //   dispatch({
          //     type: MenuItemTypes.MENU_ITEM_DETAIL_LIST,
          //     payload: response,
          //   });

          dispatch(setMenuItemDetailList(response));
          dispatch(setMenuCategoryData(response));
          setisLoad(true);
        }
      });
    }
    selectedItemDescription;
    if (dependentId > 0) {
      setisLoad(true);
    }
  }, [selectedmenuitemdetail]);

  useEffect(() => {
    dispatch(selecteditemquantity(currentQty));
    //dispatch(getCartItemCount(sessionId, restaurantinfo.defaultlocationId, restaurantinfo.restaurantId, customerId));
  }, [currentQty]);

  useEffect(() => {
    //let selectedTopping = menuItemDetail.topping;
    let selectedToppingLength =
      selectedtoppings &&
      selectedtoppings?.list.filter((item) => item?.optionselected === true)
        .length;
    let lstcarttoppingNew = [];
    if (selectedtoppings && selectedtoppings?.list) {
      selectedtoppings?.list != undefined &&
        selectedtoppings?.list.length > 0 &&
        selectedtoppings?.list.map((lsttop: any) => {
          lsttop.type != undefined &&
            lsttop.type.length > 0 &&
            lsttop.type.map((type: any) => {
              if (type.subOptionselected === true) {
                lstcarttoppingNew.push(type);
                setlstcarttopping(lstcarttoppingNew);
              }
            });
        });
    }

    if (Array.isArray(selectedToppingLength && selectedToppingLength > 0)) {
      let selectedtop =
        selectedtoppings &&
        selectedtoppings?.list.filter((item) => item.optionselected === true);
      let selectedToppintypeLength =
        selectedtop &&
        selectedtop[0]?.type.filter((item) => item.subOptionselected === true)
          .length;
      if (selectedToppintypeLength === 0 && lstcarttoppingNew.length === 0) {
        setlstcarttopping([]);
      }
    }
    if (selectedtoppings && selectedtoppings?.list.length === 0) {
      setlstcarttopping([]);
    }
  }, [refreshTopping, updateitemoptionincart, menuItemDetail]);

  const handleRefreshTopping = () => {
    setrefreshTopping(!refreshTopping);
  };

  //   const selectedSizeClick = (item: List) => {
  //     setlstcarttopping([]);
  //     setisCollpase(true);

  //     if (item) {
  //       let lstsizedata: Size[] = [];
  //       menuItemDetail?.size?.forEach((data) => {
  //         if (data?.type === item?.type) {
  //           data.sizeselected = true;
  //         } else data.sizeselected = false;

  //         lstsizedata.push(data);
  //       });
  //       menuItemDetail.size = lstsizedata;
  //       dispatch(removeMenuItem());
  //       dispatch(selectedItemSize(menuItemDetail as any));
  //     }
  //     setcount(count + 1);
  //     handleRefreshTopping();
  //   };

  const selectedSizeClick = (item: List) => {
    setlstcarttopping([]);
    setisCollpase(true);

    if (item && menuItemDetail) {
      let lstsizedata: Size[] = [];

      menuItemDetail.size?.forEach((data) => {
        // Compare item.type with one of the entries in data.type array
        const isMatch = Array.isArray(data.type)
          ? data.type.some((t) => t.name === item.type)
          : false;

        data.sizeselected = isMatch;
        lstsizedata.push(data);
      });

      menuItemDetail.size = lstsizedata;
      dispatch(removeMenuItem());
      dispatch(selectedItemSize(menuItemDetail.size as Size[]));
    }

    setcount(count + 1);
    handleRefreshTopping();
  };

  const increment = () => {
    const plusState = currentQty + 1;
    if (menuitem?.dependentqty !== 0 && plusState > menuitem?.dependentqty) {
      return;
    }
    setcurrentQty(plusState);
  };

  const decrement = () => {
    if (minQty === currentQty) {
      setcurrentQty(minQty);
      return;
    }
    const minusState = currentQty - 1;
    setcurrentQty(minusState);
  };

  const memorisedNetTotal = useMemo(() => {
    return calculateNettotal(
      lstcarttopping,
      selectedsize,
      quantity,
      menuItemDetail
    );
  }, [lstcarttopping, quantity, selectedsize]);

  const addToCart = () => {
    if (selectedmenuitemdetail && dependentId > 0) {
      selectedmenuitemdetail.menuItemName = menuItemDetail?.itemName as string;
    }
    if (
      dependentId === 0 &&
      (menuItemDetail?.dependantMenuList?.length === 0 ||
        menuItemDetail?.dependantMenuList === null) &&
      menuitem?.dependentqty !== 0
    ) {
      dispatch(setDipendentItemQty(0));
    }
    // let total = selectedsize && selectedsize[0]?.price;
    let total: number =
      selectedsize && selectedsize.length > 0 && selectedsize[0].price
        ? selectedsize[0].price
        : 0;
    // let nettotal = total * currentQty;
    //if (deliveryaddressinfo.pickupordelivery === "Pickup" || (deliveryaddressinfo.pickupordelivery === "Delivery")) {
    let selectedoption =
      selectedtopping &&
      selectedtopping[0]?.list?.filter((x) => x.isCompulsory == true);
    //if (selectedmenuitemdetail && selectedmenuitemdetail?.cartid > 0) {
    if (selectedmenuitemdetail) {
      //CHECK ITEM TOPPINGS REQUIRED IS SELECTED OR NOT
      var isValidateItem = true;
      //test
      if (
        menuItemDetail &&
        selectedoption &&
        menuItemDetail?.topping.length > 0 &&
        selectedoption?.length > 0
      ) {
        let result = [];
        for (var i = 0; i < selectedoption.length; i++) {
          if (
            selectedoption[i].type != undefined &&
            selectedoption[i].type.length > 0 &&
            selectedoption[i].type.filter(
              (x: any) => x.subOptionselected === true
            ).length === 0
          ) {
            handleNotify(
              "Please select atleast one item in " + selectedoption[i].name,
              ToasterPositions.TopRight,
              ToasterTypes.Error
            );
            result.push({ value: i, text: false });
            isValidateItem = false;
            break;
          }
        }
      }

      //THIS CONDITION WILL EXECUTE WHEN ITEM UPDATE FROM CART PAGE
      if (isValidateItem) {
        let itemobj = FormatOrderObject({
          objrestaurant: restaurantinfo as GetAllRestaurantInfo,
          objselectedItem: selectedmenuitemdetail,
          menuItemDetail: menuItemDetail as GetMenuItemDetail,
          //customerId: Number(customerId),
          total: total,
          quantity: currentQty,
          sessionid: sessionid as string,
          orderType: ordertype,
          selectedtime: selecetdtime,
          studentname: "",
        });
        if (itemobj != undefined) {
          MenuItemServices.updateCartOrdersItem({
            orderobj: itemobj,
            restaurantId: restaurantId,
          }).then((response) => {
            if (response) {
              dispatch(
                getCartItem({
                  cartsessionId: sessionid as string,
                  locationId: restaurantinfo?.defaultlocationId as number,
                  restaurantId: restaurantinfo?.restaurantId as number,
                  cartId: 0,
                  customerId: userinfo ? userinfo?.customerId : 0,
                  rewardpoints: rpoint,
                  redeemamount: ramount,
                  deliveryaddressId: 0,
                  tipPercentage: 0,
                  tipAmount: 0,
                  ordertype: String(ordertype),
                  selectedTime: order?.checktime,
                  requestId: order?.deliveryRequestId,
                })
              );
              dispatch(
                getCartItemCount({
                  sessionId,
                  defaultlocationId,
                  restaurantId,
                  customerId,
                })
              );
              handleToggleMenuItem(false);
              //TODO:
              // setTimeout(() => {
              //     var randomval = Math.floor(1000 + Math.random() * 9000);

              //     router.push(`/${selectedTheme.url}/${dynamic}/${location}/cart?update=${randomval}`);
              // }, 1000);
            }
          });
        }
      }
    } else if (
      selectedmenuitemdetail &&
      menuItemDetail?.topping != undefined &&
      menuItemDetail?.topping.length === 0
    ) {
      let itemobj = FormatOrderObject({
        objrestaurant: restaurantinfo as GetAllRestaurantInfo,
        objselectedItem: selectedmenuitemdetail,
        menuItemDetail: menuItemDetail,
        //customerId: Number(customerId),
        total: total,
        quantity: currentQty,
        sessionid: sessionid as string,
        orderType: ordertype,
        selectedtime: selecetdtime,
        studentname: "",
      });
      if (itemobj != undefined) {
        MenuItemServices.addItemToCart({
          orderobj: itemobj,
          restaurantId: restaurantId,
        }).then((response) => {
          if (response) {
            //   dispatch({
            //     type: MenuItemTypes.ADD_ITEM_TO_CART,
            //     payload: response,
            //   });
            dispatch(setCartItem(response as any));
            dispatch(
              getCartItemCount({
                sessionId,
                defaultlocationId,
                restaurantId,
                customerId,
              })
            );
            dispatch(
              getCartItem({
                cartsessionId: sessionid as string,
                locationId: restaurantinfo?.defaultlocationId as number,
                restaurantId: restaurantinfo?.restaurantId as number,
                cartId: 0,
                customerId: userinfo ? userinfo?.customerId : 0,
                rewardpoints: rpoint,
                redeemamount: ramount,
                deliveryaddressId: 0,
                tipPercentage: 0,
                tipAmount: 0,
                ordertype: String(ordertype),
                selectedTime: order?.checktime,
                requestId: order?.deliveryRequestId,
              })
            );

            handleToggleMenuItem(false);
          }
        });
        // dispatch(updateCartItemCount());
        dispatch(
          getCartItemCount({
            sessionId,
            defaultlocationId,
            restaurantId,
            customerId,
          })
        );
      }
    } else if (
      menuItemDetail &&
      selectedoption &&
      menuItemDetail?.topping.length > 0 &&
      selectedoption?.length > 0
    ) {
      let result = [];
      for (var i = 0; i < selectedoption.length; i++) {
        if (
          selectedoption[i].type != undefined &&
          selectedoption[i].type.length > 0 &&
          selectedoption[i].type.filter(
            (x: any) => x.subOptionselected === true
          ).length === 0
        ) {
          handleNotify(
            "Please select atleast one item in " + selectedoption[i].name,
            ToasterPositions.TopRight,
            ToasterTypes.Error
          );
          result.push({ value: i, text: false });
          break;
        } else {
          result.push({ value: i, text: true });
        }
      }
      if (
        result.length > 0 &&
        result.filter((x) => x.text == false).length === 0
      ) {
        let itemobj = FormatOrderObject({
          objrestaurant: restaurantinfo as GetAllRestaurantInfo,
          objselectedItem: selectedmenuitemdetail!,
          menuItemDetail: menuItemDetail as GetMenuItemDetail,
          //customerId: Number(customerId),
          total: total,
          quantity: currentQty,
          sessionid: sessionid as string,
          orderType: ordertype,
          selectedtime: selecetdtime,
          studentname: "",
        });
        if (itemobj != undefined) {
          MenuItemServices.addItemToCart({
            orderobj: itemobj,
            restaurantId: restaurantId,
          }).then((response) => {
            if (response) {
              //   dispatch({
              //     type: MenuItemTypes.ADD_ITEM_TO_CART,
              //     payload: response,
              //   });
              dispatch(setCartItem(response));
              dispatch(
                getCartItemCount({
                  sessionId,
                  defaultlocationId,
                  restaurantId,
                  customerId,
                })
              );
              dispatch(
                getCartItem({
                  cartsessionId: sessionid as string,
                  locationId: restaurantinfo?.defaultlocationId as number,
                  restaurantId: restaurantinfo?.restaurantId as number,
                  cartId: 0,
                  customerId: userinfo ? userinfo?.customerId : 0,
                  rewardpoints: rpoint,
                  redeemamount: ramount,
                  deliveryaddressId: 0,
                  tipPercentage: 0,
                  tipAmount: 0,
                  ordertype: String(ordertype),
                  selectedTime: order?.checktime,
                  requestId: order?.deliveryRequestId,
                })
              );

              // dispatch(updateCartItemCount());

              //TO DO:HANDLE THE DEPENDET ITEM POPUP
              handleToggleMenuItem(false);
              // console.log(menuItemDetail?.dependantMenuList.length)
              if (
                menuItemDetail?.dependantMenuList?.length > 0 &&
                ((dependentIds === undefined && dependentId === 0) ||
                  (dependentIds?.length === 0 && dependentId === 0))
              ) {
                //TODO:
                setTimeout(() => {
                  handleToggleDependnt?.(true);
                }, 500);
              } else {
                if (
                  (menuItemDetail?.dependantMenuList?.length > 0 &&
                    menuItemDetail?.dependantMenuList !== null) ||
                  dependentIds?.length > 0
                ) {
                  let dependentItemList =
                    dependentIds?.length > 0
                      ? dependentIds
                      : menuItemDetail?.dependantMenuList?.map(
                          (item) => item?.DependantMenuItemId
                        );
                  let removefirst = dependentItemList?.shift();
                  let remainingList = dependentItemList;
                  //dispatch(setDipendentId(removefirst?.DependantMenuItemId));
                  dispatch(setDipendentIds(remainingList));
                } else {
                  dispatch(setDipendentId(0));
                  dispatch(setDipendentItemQty(0));
                }
              }
            }
          });
        }
      }
    } else if (
      menuItemDetail &&
      menuItemDetail.topping &&
      menuItemDetail?.topping.length > 0 &&
      selectedoption
    ) {
      let itemobj = FormatOrderObject({
        objrestaurant: restaurantinfo as GetAllRestaurantInfo,
        objselectedItem: selectedmenuitemdetail!,
        menuItemDetail: menuItemDetail as GetMenuItemDetail,
        //customerId: Number(customerId),
        total: total,
        quantity: currentQty,
        sessionid: sessionid as string,
        orderType: ordertype,
        selectedtime: selecetdtime,
        studentname: "",
      });
      if (itemobj != undefined) {
        MenuItemServices.addItemToCart({
          orderobj: itemobj,
          restaurantId: restaurantId,
        }).then((response) => {
          if (response) {
            // dispatch({
            //   type: MenuItemTypes.ADD_ITEM_TO_CART,
            //   payload: response,
            // });
            dispatch(setCartItem(response));
            dispatch(
              getCartItemCount({
                sessionId,
                defaultlocationId,
                restaurantId,
                customerId,
              })
            );
            handleToggleMenuItem(false);
            dispatch(
              getCartItem({
                cartsessionId: sessionid as string,
                locationId: restaurantinfo?.defaultlocationId as number,
                restaurantId: restaurantinfo?.restaurantId as number,
                cartId: 0,
                customerId: userinfo ? userinfo?.customerId : 0,
                rewardpoints: rpoint,
                redeemamount: ramount,
                deliveryaddressId: 0,
                tipPercentage: 0,
                tipAmount: 0,
                ordertype: String(ordertype),
                selectedTime: order?.checktime,
                requestId: order?.deliveryRequestId,
              })
            );

            // dispatch(updateCartItemCount());
            // dispatch(getCartItemCount(sessionId, restaurantinfo.defaultlocationId, restaurantinfo.restaurantId, customerId));

            if (
              menuItemDetail?.dependantMenuList?.length > 0 &&
              ((dependentIds === undefined && dependentId === 0) ||
                (dependentIds?.length === 0 && dependentId === 0))
            ) {
              //TODO:
              setTimeout(() => {
                handleToggleDependnt?.(true);
              }, 500);
            } else {
              if (
                (menuItemDetail?.dependantMenuList?.length > 0 &&
                  menuItemDetail?.dependantMenuList !== null) ||
                dependentIds?.length > 0
              ) {
                let dependentItemList =
                  dependentIds?.length > 0
                    ? dependentIds
                    : menuItemDetail?.dependantMenuList?.map(
                        (item) => item?.DependantMenuItemId
                      );
                let removefirst = dependentItemList?.shift();
                let remainingList = dependentItemList;
                //dispatch(setDipendentId(removefirst?.DependantMenuItemId));
                dispatch(setDipendentIds(remainingList));
                // if (remainingList.length === 0 && removefirst?.DependantMenuItemId > 0) {

                // }
              } else {
                dispatch(setDipendentId(0));
                dispatch(setDipendentItemQty(0));
              }
            }
          }
        });
      }
    }
  };

  const handleClickSkip = () => {
    handleToggleMenuItem(false);
    if (
      // (menuItemDetail?.dependantMenuList.length > 0 && menuItemDetail?.dependantMenuList !== null)
      dependentIds?.length > 0
    ) {
      dispatch({
        type: MenuItemTypes.MENU_ITEM_DETAIL_LIST,
        payload: {},
      });
      let dependentItemList =
        dependentIds?.length > 0
          ? dependentIds
          : menuItemDetail?.dependantMenuList?.map(
              (item) => item?.DependantMenuItemId
            );
      let removefirst = dependentItemList?.shift();
      let remainingList = dependentItemList;
      //dispatch(setDipendentId(removefirst?.DependantMenuItemId));
      dispatch(setDipendentIds(remainingList as any));
    } else {
      dispatch(setDipendentItemQty(0));
      dispatch(setDipendentId(0));
    }
  };
  const selectedFavoriteClick = (item: any) => {
    setcount(count + 1);
    let objdata = selectedmenuitemdetail;
    if (!objdata) return null;
    objdata.isFavoriteMenu = item;
    dispatch(removeMenuItemForFavorite());
    dispatch(selectedMenuItem(objdata));
    if (item === true) {
      dispatch(
        addFavorite({
          customerId: String(userinfo?.customerId),
          restaurantId: restaurantinfo?.restaurantId as number,
          menuItemId: String(menuItemId),
        })
      );
    } else {
      dispatch(
        deleteFavorite({
          customerId: String(userinfo?.customerId),
          restaurantId: restaurantinfo?.restaurantId as number,
          menuItemId: String(selectedmenuitemdetail?.menuitemId),
        })
      );
    }
  };
  return (
    <>
      <div
        className={`modal modal-product fade ${
          isOpenModal ? "show d-block" : ""
        }`}
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className={`modal-content ${dependentId > 0 ? "pt-5" : ""}`}>
            <button
              type="button"
              className={dependentId > 0 ? "d-none btn-close" : "btn-close"}
              onClick={() => handleToggleMenuItem(false)}
            />
            {menuItemDetail && Object.keys(menuItemDetail).length > 0 ? (
              <>
                <form>
                  <div className="modal-body">
                    <MenuItemInfo
                      selectedSizeClick={selectedSizeClick}
                      selectedFavoriteClick={selectedFavoriteClick}
                      name={selectedItemName}
                      desc={selectedItemDescription}
                      shareUrl={shareUrl}
                      isFavourite={selectedmenuitemdetail?.isFavoriteMenu}
                      img={itemImage}
                    />
                    <div className="row mt-3">
                      <div className="col-lg-12 sppr col-md-12 col-12">
                        {isMobile && (
                          <MenuItemSize
                            selectedSizeClick={selectedSizeClick}
                            shareUrl={shareUrl}
                          />
                        )}
                        <div className="d-block d-md-none">
                          <h1>Description</h1>
                          <p> {getDesc(selectedItemDescription as string)}</p>
                          {/* <p >  {selectedItemDescription}</p> */}
                        </div>
                        {/* <div className="accordion" id="toppings-accordion">
                                                    <div className="row"> */}
                        {isLoad && (
                          <MenuItemOptions
                            isLoad={isLoad}
                            count={count}
                            isExpand={isPreLoaded}
                          />
                        )}
                        {/* </div>
                                                </div> */}
                      </div>
                    </div>
                  </div>
                  <MenuItemFooter>
                    <MenuItemQty
                      increment={increment}
                      decrement={decrement}
                      currentQty={currentQty}
                    />
                    <MenuItemAddCartBtn
                      addToCart={addToCart}
                      currencySymbol={currencySymbol}
                      memorisedNetTotal={memorisedNetTotal}
                    />
                    {dependentId > 0 && (
                      <div className="col-lg-4   col-md-5 col-12 mt-1 mt-md-0 p-0 ps-md-1">
                        <a
                          className="btn-default btn-order "
                          onClick={handleClickSkip}
                        >
                          {" "}
                          Skip{" "}
                        </a>
                      </div>
                    )}
                  </MenuItemFooter>
                </form>
              </>
            ) : (
              <>
                {" "}
                <MenuItemSkeletonComponent />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
      <ToastNotify />
    </>
  );
};

export default MenuItemModal;
