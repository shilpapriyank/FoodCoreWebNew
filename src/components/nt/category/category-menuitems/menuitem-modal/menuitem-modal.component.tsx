import React, { useEffect, useMemo, useState } from "react";
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
  addItemToCart,
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
  getCartItemCount,
  setCartItem,
} from "../../../../../../redux/cart/cart.slice";
import MenuItemOptions from "./menuitem-options.component";
import MenuItemAddCartBtn from "./menuitem-addtocart.component";
import MenuItemQty from "./menuitem-qty.component";
import MenuItemSkeletonComponent from "@/components/nt/skeleton/menuitem-skeleton.component";
import { useAppDispatch } from "../../../../../../redux/hooks";
import {
  DependantMenuList,
  GetMenuItemDetail,
  Size,
  Type,
} from "@/types/menuitem-types/menuitem.type";
import { GetAllRestaurantInfo } from "@/types/restaurant-types/restaurant.type";
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
  const [currentQty, setcurrentQty] = useState<number>(
    selectedmenuitemdetail?.qty ? selectedmenuitemdetail.qty : 1
  );
  const [isLoad, setisLoad] = useState<boolean>(false);
  const [isCollpase, setisCollpase] = useState<boolean>(true);
  const currencySymbol = GetCurrency();
  const [lstcarttopping, setlstcarttopping] = useState<Type[]>([]);
  const [count, setcount] = useState<number>(0);
  const [refreshTopping, setrefreshTopping] = useState<boolean>(false);
  const router = useRouter();
  const params = useParams();
  const { dynamic, location, category } = params;
  const selctedTheme = GetThemeDetails(restaurantinfo?.themetype as number);
  const customerId = userinfo ? userinfo.customerId : 0;
  const { restaurantId, defaultlocationId } =
    restaurantinfo as GetAllRestaurantInfo;
  const sessionId = sessionid;
  const dependentId = menuitem?.dependentid ?? 0;
  const dependentIds = menuitem?.dependentitemids;
  let menuItemDetail = menuitem?.menuitemdetaillist;
  const deliveryaddressinfo = selecteddelivery;
  let selectedsize =
    menuItemDetail?.size &&
    menuItemDetail.size.filter((x) => x.sizeselected === true);
  let selectedtopping =
    menuItemDetail != undefined &&
    menuItemDetail.topping != undefined &&
    menuItemDetail.topping.filter(
      (x) => x.subparameterId == selectedsize?.[0]?.subparameterId
    );
  let updateitemoptionincart = menuitem.updateitemoptionincart;
  let selectedtoppings =
    menuItemDetail?.topping &&
    menuItemDetail.topping.length > 0 &&
    menuItemDetail?.topping.find(
      (x) => x.subparameterId == selectedsize?.[0]?.subparameterId
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
          dispatch(setMenuItemDetailList(response));
          dispatch(setMenuCategoryData(response));
          setisLoad(true);
        }
      });
    }
    if (dependentId > 0) {
      setisLoad(true);
    }
  }, [selectedmenuitemdetail]);

  useEffect(() => {
    dispatch(selecteditemquantity(currentQty));
  }, [currentQty]);

  useEffect(() => {
    let selectedToppingLength =
      selectedtoppings &&
      selectedtoppings?.list?.filter((item) => item.optionselected === true)
        .length;
    let lstcarttoppingNew = [];
    if (selectedtoppings && selectedtoppings?.list) {
      selectedtoppings?.list != undefined &&
        selectedtoppings?.list.length > 0 &&
        selectedtoppings?.list.map((lsttop) => {
          lsttop.type != undefined &&
            lsttop.type.length > 0 &&
            lsttop.type.map((type) => {
              if (type.subOptionselected === true) {
                lstcarttoppingNew.push(type);
                setlstcarttopping(lstcarttoppingNew);
              }
            });
        });
    }

    if (
      selectedtoppings &&
      selectedToppingLength &&
      selectedToppingLength > 0
    ) {
      let selectedtop = selectedtoppings?.list.find(
        (item) => item.optionselected === true
      );
      let selectedToppintypeLength = selectedtop?.type.filter(
        (item) => item.subOptionselected === true
      ).length;

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

  const selectedSizeClick = (item: Size) => {
    setlstcarttopping([]);
    setisCollpase(true);

    if (item && menuItemDetail) {
      const newMenuItemDetail = { ...menuItemDetail };
      let lstsizedata: Size[] = [];

      lstsizedata = menuItemDetail?.size?.map((data) => ({
        ...data,
        sizeselected: data.type === item.type,
      }));
      newMenuItemDetail.size = lstsizedata;
      dispatch(removeMenuItem());
      dispatch(selectedItemSize(newMenuItemDetail));
      //dispatch(selectedItemSize(menuItemDetail.size));
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
      selectedsize as Size[],
      quantity,
      menuItemDetail as GetMenuItemDetail
    );
  }, [lstcarttopping, quantity, selectedsize]);

  const addToCart = () => {
    let updatedSelectedMenuitemDetail = selectedmenuitemdetail;
    if (dependentId > 0 && selectedmenuitemdetail) {
      updatedSelectedMenuitemDetail = {
        ...selectedmenuitemdetail,
        menuItemName:
          menuItemDetail?.itemName || selectedmenuitemdetail.menuItemName || "",
      };
    }
    if (
      dependentId === 0 &&
      (menuItemDetail?.dependantMenuList?.length === 0 ||
        menuItemDetail?.dependantMenuList === null) &&
      menuitem?.dependentqty !== 0
    ) {
      dispatch(setDipendentItemQty(0));
    }
    let total =
      selectedsize &&
      selectedsize != undefined &&
      selectedsize.length > 0 &&
      selectedsize[0].price;

    let selectedoption =
      selectedtopping &&
      selectedtopping?.length > 0 &&
      selectedtopping?.[0].list.filter((x) => x.isCompulsory == true);
    if (
      updatedSelectedMenuitemDetail &&
      updatedSelectedMenuitemDetail?.cartid > 0
    ) {
      //CHECK ITEM TOPPINGS REQUIRED IS SELECTED OR NOT
      var isValidateItem = true;
      if (
        menuItemDetail &&
        menuItemDetail.topping != undefined &&
        menuItemDetail.topping.length > 0 &&
        selectedoption &&
        selectedoption.length > 0
      ) {
        let result = [];
        for (var i = 0; i < selectedoption.length; i++) {
          if (
            selectedoption[i].type != undefined &&
            selectedoption[i].type.length > 0 &&
            selectedoption[i].type.filter((x) => x.subOptionselected === true)
              .length === 0
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
          objselectedItem: updatedSelectedMenuitemDetail,
          menuItemDetail: menuItemDetail as GetMenuItemDetail,
          customerId: Number(customerId),
          total: Number(total),
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
                  ordertype: Number(ordertype),
                  selectedTime: order?.checktime,
                  requestId: order?.deliveryRequestId,
                })
              );
              dispatch(
                getCartItemCount({
                  cartsessionId: String(sessionid),
                  locationId: restaurantinfo?.defaultlocationId as number,
                  restaurantId: restaurantinfo?.restaurantId as number,
                  customerId: userinfo ? userinfo?.customerId : 0,
                })
              );
              handleToggleMenuItem(false);
            }
          });
        }
      }
    } else if (
      updatedSelectedMenuitemDetail &&
      menuItemDetail?.topping != undefined &&
      menuItemDetail?.topping.length === 0
    ) {
      let itemobj = FormatOrderObject({
        objrestaurant: restaurantinfo as GetAllRestaurantInfo,
        objselectedItem: updatedSelectedMenuitemDetail,
        menuItemDetail: menuItemDetail,
        customerId: Number(customerId),
        total: total as number,
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
            //dispatch(setCartItem(response));
            dispatch(
              getCartItemCount({
                cartsessionId: String(sessionid),
                locationId: restaurantinfo?.defaultlocationId as number,
                restaurantId: restaurantinfo?.restaurantId as number,
                customerId: userinfo ? userinfo?.customerId : 0,
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
                ordertype: Number(ordertype),
                selectedTime: order?.checktime,
                requestId: order?.deliveryRequestId,
              })
            );

            handleToggleMenuItem(false);
          }
        });
        dispatch(
          getCartItemCount({
            cartsessionId: String(sessionid),
            locationId: restaurantinfo?.defaultlocationId as number,
            restaurantId: restaurantinfo?.restaurantId as number,
            customerId: userinfo ? userinfo?.customerId : 0,
          })
        );
      }
    } else if (
      menuItemDetail &&
      menuItemDetail.topping &&
      selectedoption &&
      menuItemDetail?.topping?.length > 0 &&
      selectedoption?.length > 0
    ) {
      let result = [];
      for (var i = 0; i < selectedoption.length; i++) {
        if (
          selectedoption[i].type != undefined &&
          selectedoption[i].type.length > 0 &&
          selectedoption[i].type.filter((x) => x.subOptionselected === true)
            .length === 0
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
          objselectedItem: updatedSelectedMenuitemDetail!,
          menuItemDetail: menuItemDetail as GetMenuItemDetail,
          customerId: Number(customerId),
          total: total as number,
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
              dispatch(setCartItem(response));
              dispatch(
                getCartItemCount({
                  cartsessionId: String(sessionid),
                  locationId: restaurantinfo?.defaultlocationId as number,
                  restaurantId: restaurantinfo?.restaurantId as number,
                  customerId: userinfo ? userinfo?.customerId : 0,
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
                  ordertype: Number(ordertype),
                  selectedTime: order?.checktime,
                  requestId: order?.deliveryRequestId,
                })
              );

              //TO DO:HANDLE THE DEPENDET ITEM POPUP
              handleToggleMenuItem(false);
              if (
                menuItemDetail.dependantMenuList &&
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
                  (menuItemDetail.dependantMenuList &&
                    menuItemDetail?.dependantMenuList?.length > 0 &&
                    menuItemDetail?.dependantMenuList !== null) ||
                  dependentIds?.length > 0
                ) {
                  let dependentItemList =
                    dependentIds?.length > 0
                      ? dependentIds
                      : menuItemDetail?.dependantMenuList;
                  let removefirst = dependentItemList?.shift();
                  let remainingList = dependentItemList;

                  dispatch(setDipendentId(removefirst?.DependantMenuItemId));
                  dispatch(setDipendentId(removefirst?.DependantMenuItemId));
                  dispatch(
                    setDipendentIds(remainingList as DependantMenuList[])
                  );
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
        objselectedItem: updatedSelectedMenuitemDetail!,
        menuItemDetail: menuItemDetail as GetMenuItemDetail,
        customerId: Number(customerId),
        total: total as number,
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
            dispatch(getCartItem(response));
            dispatch(
              getCartItemCount({
                cartsessionId: String(sessionid),
                locationId: restaurantinfo?.defaultlocationId as number,
                restaurantId: restaurantinfo?.restaurantId as number,
                customerId: userinfo ? userinfo?.customerId : 0,
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
                ordertype: ordertype,
                selectedTime: order?.checktime,
                requestId: order?.deliveryRequestId,
              })
            );

            if (
              menuItemDetail?.dependantMenuList &&
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
                (menuItemDetail?.dependantMenuList &&
                  menuItemDetail?.dependantMenuList?.length > 0 &&
                  menuItemDetail?.dependantMenuList !== null) ||
                dependentIds?.length > 0
              ) {
                let dependentItemList =
                  dependentIds?.length > 0
                    ? dependentIds
                    : menuItemDetail?.dependantMenuList;
                let removefirst = dependentItemList?.shift();
                let remainingList = dependentItemList;
                dispatch(setDipendentId(removefirst?.DependantMenuItemId));
                dispatch(
                  setDipendentId(removefirst?.DependantMenuItemId as number)
                );
                dispatch(setDipendentIds(remainingList as DependantMenuList[]));
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

    if (dependentIds?.length > 0) {
      dispatch(
        getMenuItemDetailes({
          restaurantId: restaurantinfo?.restaurantId as number,
          locationId: restaurantinfo?.defaultlocationId as number,
          customerId: userinfo ? userinfo.customerId : 0,
          menuitemId: menuItemDetail?.menuItemId as number,
          cartsessionId: sessionId as string,
          cartId: 0,
        })
      );

      let dependentItemList =
        dependentIds?.length > 0
          ? dependentIds
          : menuItemDetail?.dependantMenuList;

      // make a copy before mutating
      let dependentItemListCopy = [...(dependentItemList || [])];
      let removefirst = dependentItemListCopy.shift();
      let remainingList = dependentItemListCopy;

      if (typeof removefirst === "number") {
        dispatch(setDipendentId(removefirst));
      } else if (removefirst && typeof removefirst === "object") {
        dispatch(setDipendentId(removefirst.DependantMenuItemId));
      }

      dispatch(setDipendentIds(remainingList as DependantMenuList[]));
    } else {
      dispatch(setDipendentItemQty(0));
      dispatch(setDipendentId(0));
    }
  };

  const selectedFavoriteClick = (item: boolean) => {
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
        role="dialog"
        //aria-labelledby="exampleModalLabel"
        //aria-hidden="true"
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
                      name={selectedItemName as string}
                      desc={selectedItemDescription as string}
                      shareUrl={shareUrl}
                      isFavourite={
                        selectedmenuitemdetail?.isFavoriteMenu as boolean
                      }
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
                        </div>
                        {isLoad && (
                          <MenuItemOptions
                            isLoad={isLoad}
                            count={count}
                            isExpand={isPreLoaded}
                          />
                        )}
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
