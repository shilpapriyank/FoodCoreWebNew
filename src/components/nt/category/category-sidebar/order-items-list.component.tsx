import React, { useEffect, useMemo, useState, useCallback } from "react";
import { getImagePath } from "../../common/utility";
import {
  getDependentParentQty,
  ORDER_TYPE,
  ORDER_TYPE_ENUM,
} from "../../../common/utility";
import useUtility from "../../../customhooks/utility-hook";
import useFutureOrder from "../../../customhooks/usefuture-order-hook";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { useAppDispatch } from "../../../../../redux/hooks";
import { useParams, useRouter } from "next/navigation";
import { CartServices } from "../../../../../redux/cart/cart.services";
import { CartTypes } from "../../../../../redux/cart/cart.type";
import { CustomerServices } from "../../../../../redux/customer/customer.services";
import { CartItem } from "@/types/cart-types/cartservice.type";
import CommonModal from "../../common/common-model.component";
import {
  orderinstruction,
  setCartItem,
  updateCartItem,
  updateCartItemCount,
} from "../../../../../redux/cart/cart.slice";
import { setrewardpoint } from "../../../../../redux/rewardpoint/rewardpoint.slice";
import { getCartItemCount } from "../../../../../redux/tableorder/tableorder.slice";
import {
  GetAllMenuCategoryItems,
  Menuitems,
} from "@/types/menuitem-types/menuitem.type";
import { MenuItemServices } from "../../../../../redux/menu-item/menu-item.services";
import {
  selectedMenuItem,
  setDipendentItemQty,
  setMenuItemDetailList,
} from "../../../../../redux/menu-item/menu-item.slice";
import CartSuboptionDisplay from "../../checkout/suboption-display.component";

export const OrderItemsList = () => {
  const {
    restaurantinfo,
    userinfo,
    selecteddelivery,
    sessionid,
    rewardpoints,
    main,
    orderTimeType,
    recievingTime,
    meredian,
    order,
    cart,
  } = useReduxData();
  const { recievingDate, enabletimeslot } = useFutureOrder();

  // const {isShowing, toggle} = useModal();
  const { isDisplayPrice } = useUtility();
  const deliveryaddressinfo = selecteddelivery.selecteddeliveryaddress;
  const pickupordelivery = selecteddelivery.pickupordelivery;

  const cartdata = cart?.cartitemdetail && cart?.cartitemdetail;
  const customerId = userinfo ? userinfo.customerId : 0;
  let sessionId = sessionid;
  let rewardpoint = rewardpoints;
  let selectedtime = order?.checktime ?? "";
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useParams();
  const { update, location } = params;
  const locationFullLink = `/${params.location}/`;
  var carttotal = cart?.carttotal && cart.carttotal;
  // const ordertype =
  //   pickupordelivery === ORDER_TYPE_ENUM.DELIVERY
  //     ? ORDER_TYPE_ENUM.DELIVERY
  //     : ORDER_TYPE_ENUM.PICKUP;
  const ordertype =
    pickupordelivery === ORDER_TYPE.DELIVERY.text
      ? ORDER_TYPE.DELIVERY.value
      : ORDER_TYPE.PICKUP.value;

  let rewardvalue = rewardpoints?.rewardvalue;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [deleteItemData, setdeleteItemData] = useState();
  const [updateQty, setupdateQty] = useState<boolean>(false);
  const minQty = 1;
  const [cartdeleteconfirm, setcartdeleteconfirm] = useState<boolean>(false);

  const enableTip = restaurantinfo?.defaultLocation?.enableTip;
  const enableRewardPoint = restaurantinfo?.defaultLocation?.enableRewardPoint;

  useEffect(() => {
    let rpoint = 0,
      ramount = 0;
    if (rewardpoint?.redeemPoint) {
      rpoint = rewardpoint.redeemPoint > 0 ? rewardpoint.redeemPoint : 0;
    }
    if (rewardpoint?.rewardvalue && rpoint > 0) {
      ramount = rpoint / rewardpoint.rewardvalue;
    }
    if (
      cart?.cartitemcount !== 0 &&
      cart?.cartitemdetail?.cartDetails?.cartItemDetails?.length !==
        cart?.cartitemcount
    ) {
      let deliveryId =
        deliveryaddressinfo && deliveryaddressinfo.deliveryaddressId > 0
          ? deliveryaddressinfo.deliveryaddressId
          : 0;
      CartServices.getCartItemList({
        cartsessionId: sessionId as string,
        locationId: restaurantinfo?.defaultlocationId as number,
        restaurantId: restaurantinfo?.restaurantId as number,
        cartId: 0,
        customerId: customerId,
        rewardpoints: rpoint,
        redeemamount: ramount,
        deliveryaddressId: deliveryId,
        tipPercentage: Number(carttotal?.tipPercentage),
        tipAmount: carttotal?.tipAmount,
        ordertype: String(ordertype),
        selectedTime: selectedtime,
        requestId: order?.deliveryRequestId,
      }).then((response) => {
        if (response) {
          if (response?.cartDetails && response?.cartDetails?.cartTotal) {
            // dispatch({
            //   type: CartTypes.CART_DATA,
            //   payload: response,
            // });
            dispatch(setCartItem(response));
          }
        }
      });
    }
  }, [update, deliveryaddressinfo, userinfo?.customerId, order?.checktime]);

  const clearRedeempoint = () => {
    CustomerServices.checkCustomerRewardPointsLocationBase(
      restaurantinfo?.restaurantId,
      customerId,
      0,
      0 || "0",
      String(restaurantinfo?.defaultlocationId)
    ).then((response) => {
      if (response && rewardpoints && response.status == 1) {
        let rewards = {
          rewardvalue: rewardvalue,
          rewardamount: (
            (Number(rewardpoints?.totalRewardPoints)
              ? Number(rewardpoints?.totalRewardPoints)
              : Number(userinfo?.totalRewardPoints)) /
              rewardvalue -
            0
          ).toFixed(2),
          rewardPoint:
            (Number(rewardpoints?.totalRewardPoints)
              ? Number(rewardpoints?.totalRewardPoints)
              : Number(userinfo?.totalRewardPoints)) - 0,
          totalRewardPoints: rewardpoints.totalRewardPoints
            ? rewardpoints.totalRewardPoints
            : userinfo?.totalRewardPoints,
          redeemPoint: 0,
        };
        dispatch(setrewardpoint(rewards as any));
        // dispatch(
        //   carttotaldata(
        //     sessionId,
        //     restaurantinfo.defaultlocationId,
        //     restaurantinfo.restaurantId,
        //     customerId,
        //     0,
        //     0,
        //     0,
        //     carttotal.tipPercentage,
        //     carttotal.tipAmount,
        //     pickupordelivery === ORDERTYPE.Delivery &&
        //       deliveryaddressinfo &&
        //       deliveryaddressinfo.deliveryaddressId,
        //     ordertype,
        //     order.deliveryRequestId,
        //     recievingTime,
        //     meredian,
        //     orderTimeType,
        //     recievingDate,
        //     enabletimeslot
        //   )
        // );
      }
    });
  };

  const deletecartclick = (deleteitem: any) => {
    let rpoint = 0,
      ramount = 0;
    if (rewardpoint?.redeemPoint) {
      rpoint = rewardpoint.redeemPoint > 0 ? rewardpoint.redeemPoint : 0;
    }
    if (rewardpoint?.rewardvalue && rpoint > 0) {
      ramount = rpoint / rewardpoint.rewardvalue;
    }
    if (deleteitem != undefined) {
      CartServices.deleteCartItem(
        sessionId as string,
        deleteitem.cartid,
        restaurantinfo?.restaurantId as number,
        restaurantinfo?.defaultlocationId as number
      ).then((response) => {
        if (response) {
          dispatch({ type: CartTypes.DELETE_CART_ITEM, payload: response });

          let cartItem = cartdata?.cartDetails?.cartItemDetails?.filter(
            (item) => item.dependentmenuitemid === 0
          );
          if (rewardpoints?.redeemPoint > 0 && cartItem?.length === 1) {
            clearRedeempoint();
          }
          //CHECK CARTITEM ONLY ONE DEPENDENT ITEM
          if (cartItem?.length === 1 && deleteitem?.dependentmenuitemid === 0) {
            // TO DO:HANDLE GET ITEM AND CaLACULATE THE SUBTOTAL
            dispatch(updateCartItem(response));
          }
          if (cartItem?.length === 1 && deleteitem?.dependentmenuitemid === 0) {
            dispatch(updateCartItemCount());
          }
          dispatch(orderinstruction(""));
          let redeemPoint =
            rewardpoints?.redeemPoint > 0 ? rewardpoints?.redeemPoint : 0;
          let redeemAmount = 0;
          if (redeemPoint > 0) {
            redeemAmount =
              rewardpoints?.redeemPoint / rewardpoints?.rewardvalue;
          }
          dispatch(
            getCartItemCount({
              cartsessionId: sessionId,
              locationId: restaurantinfo?.defaultlocationId,
              restaurantId: restaurantinfo?.restaurantId,
              customerId: customerId,
            })
          );
          CartServices.getCartItemList({
            cartsessionId: sessionId as string,
            locationId: restaurantinfo?.defaultlocationId as number,
            restaurantId: restaurantinfo?.restaurantId as number,
            cartId: 0,
            customerId: customerId,
            rewardpoints: rpoint,
            redeemamount: ramount,
            deliveryaddressId: deliveryaddressinfo?.deliveryaddressId,
            tipPercentage: Number(carttotal?.tipPercentage),
            tipAmount: carttotal?.tipAmount,
            ordertype: String(ordertype),
            selectedTime: selectedtime,
            requestId: order?.deliveryRequestId,
          }).then((response) => {
            if (response) {
              if (response?.cartDetails && response?.cartDetails?.cartTotal) {
                dispatch({
                  type: CartTypes.CART_DATA,
                  payload: response,
                });
                // handlUpdateQty()
              }
            }
          });
        }
      });
      // setcartdeleteconfirm(false);
      setIsOpenModal(false);
    }
  };

  const editcartclick = (
    item: any,
    menucategoryitem: any,
    menuitemnameurl: string
  ) => {
    if (item != undefined) {
      MenuItemServices.getMenuItemList({
        restaurantId: restaurantinfo?.restaurantId as number,
        locationId: restaurantinfo?.defaultlocationId as number,
        customerId: customerId,
        menuitemId: item.menuitemid,
        cartsessionId: sessionId as string,
        cartId: item?.cartid ?? 0,
      }).then((response) => {
        if (response) {
          // dispatch({
          //   type: MenuItemTypes.MENU_ITEM_DETAIL_LIST,
          //   payload: response,
          // });
          dispatch(setMenuItemDetailList(response));
          dispatch(selectedMenuItem(item));

          if (item.isdefaultprice === true && item.pricetypeid === 0) {
            router.push(locationFullLink + menucategoryitem);
          } else {
            router.push(locationFullLink + menucategoryitem);
          }
        }
      });
    }
  };

  const increment = (
    currentQty: number,
    cartid: number,
    dependentParentQty: number
  ) => {
    const plusState = currentQty + 1;
    if (dependentParentQty > 0 && dependentParentQty < plusState) {
      return;
    }
    let dcart: any[] = [];
    let cdetail: any = cartdata;
    cartdata?.cartDetails.cartItemDetails.map((data) => {
      if (data.cartid === cartid) {
        data.qty = plusState;
        data.totalprice = data.unitprice * data.qty;
      }
      dcart.push(data);
    });

    cdetail.cartDetails.cartItemDetails = dcart;

    dispatch(setCartItem(cdetail));
    CartServices.updatequantity(
      sessionId as string,
      cartid,
      plusState,
      0 || "0",
      restaurantinfo?.defaultlocationId as number,
      restaurantinfo?.restaurantId as number
    ).then((response) => {
      if (response) {
        dispatch({
          type: CartTypes.UPDATE_QUANTITY,
          payload: response,
        });
        setTimeout(() => {
          setupdateQty(!updateQty);
        }, 100);
      }
    });
  };

  const decrement = (
    currentQty: number,
    cartid: number,
    dependentParentQty: number,
    item: any
  ) => {
    if (minQty === currentQty) {
      return;
    }
    const minusState = currentQty - 1;
    let dcart: any[] = [];
    let cdetail: any = cartdata;
    cartdata?.cartDetails.cartItemDetails.map((data) => {
      if (data.cartid === cartid) {
        data.qty = minusState;
        data.totalprice = data.unitprice * data.qty;
      } else if (data?.dependentmenuitemid > 0) {
        //TODO: CHECK THE IS PARENT QTY IS LESS THEN DEPENDENT THEN NEED TO ALSO UPDATE THE DEPENDENT QTY
        if (
          item?.menuitemid === data?.dependentmenuitemid &&
          minusState < data?.qty
        ) {
          data.qty = minusState;
        }
      } else {
      }
      dcart.push(data);
    });
    cdetail.cartDetails.cartItemDetails = dcart;

    dispatch(setCartItem(cdetail));
    CartServices.updatequantity(
      sessionId as string,
      cartid,
      minusState,
      0 || "0",
      restaurantinfo?.defaultlocationId as number,
      restaurantinfo?.restaurantId as number
    ).then((response) => {
      if (response) {
        dispatch({
          type: CartTypes.UPDATE_QUANTITY,
          payload: response,
        });
        setTimeout(() => {
          setupdateQty(!updateQty);
        }, 100);
      }
    });
  };

  const handlesetDeleteData = (data: any) => {
    setdeleteItemData(data);
    setIsOpenModal(true);
  };

  const memoRiseddeleteItemData = useMemo(() => {
    return deleteItemData;
  }, [deleteItemData, deleteItemData]);

  const handleConfirmDeleteItem = useCallback(() => {
    deletecartclick(deleteItemData);
  }, [memoRiseddeleteItemData]);

  const editItemClick = (item: any, depQty: any) => {
    if (item != undefined) {
      //setisProductItemPopup(false);
      if (depQty > 0) {
        dispatch(setDipendentItemQty(depQty));
      }
      MenuItemServices.getMenuItemList({
        restaurantId: restaurantinfo?.restaurantId as number,
        locationId: restaurantinfo?.defaultlocationId as number,
        customerId: customerId,
        menuitemId: item.menuitemid,
        cartsessionId: sessionId as string,
        cartId: item?.cartid,
      }).then((response) => {
        if (response) {
          // dispatch({
          //   type: MenuItemTypes.MENU_ITEM_DETAIL_LIST,
          //   payload: response,
          // });
          dispatch(setMenuItemDetailList(response));
          dispatch(selectedMenuItem(item));

          setTimeout(() => {
            // setisProductItemPopup(true);
          }, 100);
        }
      });
    }
  };

  const handleToggle = (value: boolean) => {
    setcartdeleteconfirm(value);
    setIsOpenModal(value);
  };

  return (
    <>
      {cartdata &&
        cartdata?.cartDetails?.cartItemDetails?.map((data, index) => {
          let counter = index;
          let subOption = cartdata.cartDetails.cartOptionParams.filter(
            (x) => x.cartid === data.cartid
          );
          let subOptionDisplayCmp = "";
          <CartSuboptionDisplay subOption={subOption} />;
          let itemImage = getImagePath(
            data?.imgUrl,
            restaurantinfo?.defaultLocation?.defaultmenuitemimage
          );
          let isBorderBottom =
            !cartdata?.cartDetails?.cartItemDetails[index + 1]
              ?.dependentmenuitemid;
          let dependentParentQty = getDependentParentQty(
            cartdata?.cartDetails?.cartItemDetails,
            data,
            index
          );

          return (
            <>
              <h6>
                {" "}
                {data.itemname + " - " + data.subparametername}{" "}
                {isDisplayPrice && (
                  <span className="ms-auto">
                    {" "}
                    {data.currencysymbol}
                    {data?.totalprice?.toFixed(2)}{" "}
                  </span>
                )}
              </h6>
              <p className="small mb-1">{subOptionDisplayCmp}</p>
              {data?.studentname && (
                <p className="color_black mt-0 mb-1">
                  Name: <span className="color-red"> {data?.studentname} </span>
                </p>
              )}
              <div
                className={`d-flex align-items-center ${
                  isBorderBottom ? "" : "pb-3"
                }`}
              >
                <div className="quantity normal qty-container">
                  <button
                    className="qty-btn-minus btn-light quantity__minus"
                    onClick={() =>
                      decrement(data.qty, data.cartid, dependentParentQty, data)
                    }
                    type="button"
                  >
                    {" "}
                    <i className="fa fa-minus" />{" "}
                  </button>
                  {/* <input type="text" name="qty" defaultValue={0} className="input-qty quantity__input" /> */}
                  <input
                    type="text"
                    name="qty"
                    value={data.qty}
                    disabled
                    className="input-qty quantity__input"
                  />
                  <button
                    className="qty-btn-plus btn-light quantity__plus"
                    // onClick={() =>
                    //   increment(data.qty, data.cartid, dependentParentQty)
                    // }
                    type="button"
                  >
                    {" "}
                    <i className="fa fa-plus" />{" "}
                  </button>
                </div>
                <a
                  className="deletebtn"
                  onClick={() => {
                    handlesetDeleteData(data);
                  }}
                >
                  {" "}
                  <i className="fa fa-trash red-color-dark" />{" "}
                </a>
              </div>
              {isBorderBottom && <hr />}
            </>
          );
        })}
      {/* {isOpenModal && (
        <CommonModal
          title="Delete"
          text={`Are you sure you want to remove ${deleteItemData?.itemname} from the cart?`}
          btn1Name="Delete"
          btn2Name="Cancel"
          isbtn2={true}
          handleClickBtn1={handleConfirmDeleteItem}
          handleClickBtn2={() => handleToggle(false)}
          handleToggle={handleToggle}
          isOpenModal={isOpenModal}
        />
      )} */}
    </>
  );
};

export default OrderItemsList;
