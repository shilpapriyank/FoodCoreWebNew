import React, { useState } from "react";
import { GetThemeDetails, TOOLTIP_MSG } from "../../common/utility";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch } from "../../../../redux/hooks";
import { ORDER_TYPE } from "../common/utility";
import {
  GetMenuItemDetail,
  Menuitems,
} from "@/types/menuitem-types/menuitem.type";
import {
  addItemToCart,
  selectedMenuItem,
  setDipendentId,
  setDipendentIds,
  setDipendentItemQty,
  setMenuCategoryData,
} from "../../../../redux/menu-item/menu-item.slice";
import { MenuItemServices } from "../../../../redux/menu-item/menu-item.services";
import { FormatOrderObject } from "../common/format-order-object";
import {
  getCartItemCount,
  setCartItem,
  updateCartItemCount,
} from "../../../../redux/cart/cart.slice";
import { CartServices } from "../../../../redux/cart/cart.services";
import Popover from "../common/custompopover";
import ShareitemComponent from "../common/shareitem.component";
import { GetAllRestaurantInfo } from "@/types/restaurant-types/restaurant.type";

const MenuItemAddToCart = ({
  item,
  handleToggleDependnt,
  shareUrl,
}: {
  item: Menuitems;
  handleToggleDependnt: (value: boolean) => void;
  shareUrl: string;
}) => {
  const {
    selecteddelivery,
    restaurantinfo,
    userinfo,
    rewardpoints,
    cart,
    session,
    menuitem,
    order,
    recievingTime,
    meredian,
  } = useReduxData();
  let [currentQty, setcurrentQty] = useState<number>(1);
  const [minQty, setminQty] = useState<number>(1);
  const [isdecrement, setisdecrement] = useState<boolean>(false);
  const router = useRouter();
  const params = useParams();
  const { dynamic, location, category } = params;
  const dispatch = useAppDispatch();
  const deliveryaddressinfo = selecteddelivery;
  let sessionidObj = session?.sessionid;
  const customerId = userinfo ? userinfo.customerId : 0;
  let cartsessionid = sessionidObj;
  const dependentIds = menuitem?.dependentitemids;
  const dependentId = menuitem?.dependentid ?? 0;
  const cartdata = cart?.cartitemdetail && cart?.cartitemdetail;
  const selectedTheme = GetThemeDetails(restaurantinfo?.themetype as number);
  const locationSelected = restaurantinfo?.defaultLocation;
  const ordertype =
    deliveryaddressinfo.pickupordelivery === ORDER_TYPE.DELIVERY.text
      ? ORDER_TYPE.DELIVERY.value
      : ORDER_TYPE.PICKUP.value;
  var itemRow = cartdata?.cartDetails?.cartItemDetails?.filter(
    (items) => items.menuitemid === item.menuitemId
  );
  var selecetdtime = recievingTime + " " + meredian;
  let rpoint = 0;
  const { deliveryRequestId } = order;
  let ramount = 0;
  let rewardpoint = rewardpoints;
  if (rewardpoint?.redeemPoint) {
    rpoint = rewardpoint.redeemPoint > 0 ? rewardpoint.redeemPoint : 0;
  }
  if (rewardpoint?.rewardvalue && rpoint > 0) {
    ramount = rpoint / rewardpoint.rewardvalue;
  }
  const increment = () => {
    const plusState = currentQty + 1;
    setcurrentQty(plusState);
    // newqty = plusState;
  };

  const decrement = () => {
    if (minQty === currentQty) {
      setcurrentQty(minQty);
      return <></>;
    }
    const minusState = currentQty - 1;
    setcurrentQty(minusState);
  };

  const addtocartclick = (item: Menuitems) => {
    //debugger;
    dispatch(selectedMenuItem(item as any));
    MenuItemServices.getMenuItemList({
      restaurantId: restaurantinfo?.restaurantId as number,
      locationId: restaurantinfo?.defaultlocationId as number,
      customerId: customerId,
      menuitemId: item?.menuitemId,
      cartsessionId: String(cartsessionid),
      cartId: 0,
    }).then((response) => {
      //debugger;
      if (response) {
        if (response) {
          // console.log("add to cart click getMenuitemList response", response);
          dispatch(setMenuCategoryData(response));
        }
        let menuItemDetail = response;
        let selectedsize =
          menuItemDetail != undefined &&
          menuItemDetail.size != undefined &&
          menuItemDetail.size?.filter((x) => x.sizeselected == true);

        let selectedtopping =
          selectedsize &&
          selectedsize.length > 0 &&
          menuItemDetail != undefined &&
          menuItemDetail.topping != undefined &&
          menuItemDetail.topping.length > 0 &&
          menuItemDetail.topping.filter(
            (x) => x.subparameterId == selectedsize[0].subparameterId
          );
        let selectedoption =
          selectedtopping &&
          selectedtopping[0]?.list?.filter((x) => x.isCompulsory == true);
        // 🛠 Fix: total is strictly number
        let total: number =
          selectedsize && selectedsize.length > 0 && selectedsize[0].price
            ? selectedsize[0].price
            : 0;
        if (
          menuItemDetail.topping != undefined &&
          menuItemDetail.topping.length > 0 &&
          selectedoption
        ) {
          let itemobj = FormatOrderObject({
            objrestaurant: restaurantinfo as GetAllRestaurantInfo,
            objselectedItem: item as any,
            menuItemDetail,
            customerId,
            total,
            quantity: currentQty,
            sessionid: cartsessionid as string,
            orderType: ordertype,
            selectedtime: selecetdtime,
          });
          if (itemobj && itemobj != undefined) {
            MenuItemServices.addItemToCart({
              orderobj: itemobj,
              restaurantId: restaurantinfo?.restaurantId as number,
            }).then((response) => {
              dispatch(addItemToCart(response));
              // console.log("add item to cart response from if", response);
              if (response) {
                dispatch(updateCartItemCount());
                dispatch(
                  getCartItemCount({
                    cartsessionId: cartsessionid as string,
                    locationId: restaurantinfo?.defaultlocationId as number,
                    restaurantId: restaurantinfo?.restaurantId as number,
                    customerId: customerId,
                  })
                );
                CartServices.getCartItemList({
                  cartsessionId: String(cartsessionid),
                  locationId: restaurantinfo?.defaultlocationId as number,
                  restaurantId: restaurantinfo?.restaurantId as number,
                  cartId: 0,
                  customerId: customerId,
                  rewardpoints: Number(rewardpoints),
                  redeemamount: ramount,
                  deliveryaddressId: 0,
                  tipPercentage: 0,
                  tipAmount: 0,
                  ordertype: Number(ordertype),
                  selectedTime: selecetdtime,
                  requestId: deliveryRequestId,
                }).then((response) => {
                  if (response) {
                    if (
                      response?.cartDetails &&
                      response?.cartDetails?.cartTotal
                    ) {
                      // dispatch({
                      //   type: CartTypes.CART_DATA,
                      //   payload: response,
                      // });
                      dispatch(setCartItem(response));
                      // handlUpdateQty()
                    }
                  }
                });
                // setTimeout(() => {
                //     router.push(`/${selectedTheme.url}/${dynamic}/${location}/cart`);
                //   }, 1000);
                if (
                  dependentIds &&
                  menuItemDetail?.dependantMenuList?.length > 0 &&
                  ((dependentIds === undefined && dependentId === 0) ||
                    (dependentIds?.length === 0 && dependentId === 0))
                ) {
                  dispatch(setDipendentItemQty(currentQty));
                  setTimeout(() => {
                    handleToggleDependnt?.(true);
                  }, 500);
                } else {
                  // console.log("add item to cart response from else", response);
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
                    dispatch(setDipendentId(removefirst as number));
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
      }
    });
  };

  const IsOrderDisable = () => {
    if (locationSelected && locationSelected.isOrderingDisable == true) {
      return <b className="red-text">{locationSelected?.orderingMessage}</b>;
    } else {
      if (
        deliveryaddressinfo &&
        deliveryaddressinfo.pickupordelivery === "Pickup" &&
        locationSelected?.isTakeoutOrderingDisable === true
      ) {
        return <b className="red-text">{locationSelected?.orderingMessage}</b>;
      } else if (
        deliveryaddressinfo &&
        deliveryaddressinfo.pickupordelivery === ORDER_TYPE.DELIVERY.text &&
        locationSelected?.isDeliveryOrderingDisable === true
      ) {
        return <b className="red-text">{locationSelected?.orderingMessage}</b>;
      } else {
        return (
          <>
            <a
              className=" btn-default ms-1 small menu-addcart"
              data-toggle="tooltip"
              data-placement="left"
              title={TOOLTIP_MSG.ADDTOCART_BTN}
              id={String(item.menuitemId)}
              onClick={() => addtocartclick(item)}
            >
              Add to cart
            </a>
          </>
        );
      }
    }
  };
  return (
    <>
      <div className="d-flex align-items-center justify-content-between mt-2">
        {/* <div className="quantity normal qty-container">
            <button className="qty-btn-minus btn-light quantity__minus" onClick={() => decrement(data.qty, data.cartid,dependentParentQty,data)} type="button" > <i className="fa fa-minus" /> </button>
            <input type="text" name="qty" value={data.qty} disabled className="input-qty quantity__input" />
            <button className="qty-btn-plus btn-light quantity__plus" onClick={() => increment(data.qty, data.cartid,dependentParentQty)} type="button" > <i className="fa fa-plus" /> </button>
          </div> */}

        <div
          className="quantity normal qty-container qty-container-small  "
          id="menu-addcart-qty"
        >
          <button
            onClick={() => decrement()}
            className="qty-btn-minus btn-light quantity__minus"
            type="button"
          >
            {" "}
            <i className="fa fa-minus" />{" "}
          </button>
          <input
            type="text"
            name="qty"
            readOnly
            value={currentQty > 0 ? currentQty : ""}
            //value={currentQty > 0 ? currentQty : defaultQuantity}
            className="input-qty quantity__input"
          />
          <button
            onClick={() => increment()}
            className="qty-btn-plus btn-light quantity__plus"
            type="button"
          >
            {" "}
            <i className="fa fa-plus" />{" "}
          </button>
        </div>
        <IsOrderDisable />
        <Popover
          content={
            <ShareitemComponent
              isHrLine={true}
              linkClass="fs-4 mt-1 ms-1 pointer-cursor"
              url={shareUrl}
            />
          }
          position="top"
        >
          <button
            className="bg-white"
            data-toggle="tooltip"
            data-placement="left"
            title={TOOLTIP_MSG.SHARE_ITEM}
          >
            <i className="fa fa-share-alt color-green cursor-pointer pointer-cursor fs-5"></i>
          </button>
        </Popover>
        {/* <SharePopOver/> */}
      </div>
    </>
  );
};
export default MenuItemAddToCart;
