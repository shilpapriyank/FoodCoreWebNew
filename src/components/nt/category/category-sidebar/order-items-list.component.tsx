import React, { useEffect, useMemo, useState, useCallback } from "react";
import { getImagePath } from "../../common/utility";
import {
  getDependentParentQty,
  ORDER_TYPE,
  ORDERTYPE,
} from "../../../common/utility";
import useUtility from "../../../customhooks/utility-hook";
import useFutureOrder from "../../../customhooks/usefuture-order-hook";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import { useAppDispatch } from "../../../../../redux/hooks";
import { useParams, useRouter } from "next/navigation";
import { CartServices } from "../../../../../redux/cart/cart.services";
import { CartTypes } from "../../../../../redux/cart/cart.type";
import { CustomerServices } from "../../../../../redux/customer/customer.services";
import {
  CartDetails,
  CartItemDetails,
  CartOptionParams,
  GetCartItems,
} from "@/types/cart-types/cartservice.type";
import CommonModal from "../../common/common-model.component";
import {
  carttotaldata,
  getCartItemCount,
  setCartItem,
  setOrderInstruction,
  updateCartItem,
  updateCartItemCount,
} from "../../../../../redux/cart/cart.slice";
import { setrewardpoint } from "../../../../../redux/rewardpoint/rewardpoint.slice";
import { MenuItemServices } from "../../../../../redux/menu-item/menu-item.services";
import {
  selectedMenuItem,
  setDipendentItemQty,
  setMenuItemDetailList,
} from "../../../../../redux/menu-item/menu-item.slice";
import CartSuboptionDisplay from "../../checkout/suboption-display.component";
import { MainCategoryList } from "@/types/mainservice-types/mainservice.type";

export const OrderItemsList = () => {
  const {
    restaurantinfo,
    userinfo,
    selecteddelivery,
    sessionid,
    rewardpoints,
    order,
    cart,
  } = useReduxData();
  const { recievingDate, enabletimeslot } = useFutureOrder();
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
  const ordertype =
    pickupordelivery === ORDER_TYPE.DELIVERY.text
      ? ORDER_TYPE.DELIVERY.value
      : ORDER_TYPE.PICKUP.value;
  let rewardvalue = rewardpoints?.rewardvalue;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [deleteItemData, setdeleteItemData] = useState<CartItemDetails | null>(
    null
  );
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
        deliveryaddressId: deliveryaddressinfo?.deliveryaddressId,
        tipPercentage: Number(carttotal?.tipPercentage),
        tipAmount: carttotal?.tipAmount,
        ordertype: Number(ordertype),
        selectedTime: selectedtime,
        requestId: order?.deliveryRequestId,
      }).then((response) => {
        if (response) {
          if (response?.cartDetails && response?.cartDetails?.cartTotal) {
            dispatch(setCartItem(response));
          }
        }
      });
    }
  }, [update, deliveryaddressinfo, userinfo?.customerId, order?.checktime]);

  const clearRedeempoint = () => {
    CustomerServices.checkCustomerRewardPointsLocationBase(
      restaurantinfo?.restaurantId as number,
      customerId,
      0,
      "0",
      restaurantinfo?.defaultlocationId as number
    ).then((response) => {
      debugger
      if (response && response.status == 1) {
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
        dispatch(
          carttotaldata({
            cartsessionId: sessionId as string,
            locationId: restaurantinfo?.defaultlocationId as number,
            restaurantId: Number(restaurantinfo?.restaurantId),
            customerId: customerId,
            cartId: 0,
            rewardpoints: "0",
            redeemamount: "0",
            tipPercentage: String(carttotal?.tipPercentage),
            tipAmount: carttotal?.tipAmount,
            deliveryaddressId:
              pickupordelivery === ORDERTYPE.Delivery
                ? deliveryaddressinfo?.deliveryaddressId
                : 0,
            ordertype: ordertype,
            requestId: order.deliveryRequestId,
            recievingTime: "",
            recievingMeridian: "",
            ordertimetype: 0,
            recievingDate: recievingDate,
            enableTimeSlot: enabletimeslot as boolean,
          })
        );
      }
    });
  };

  const deletecartclick = (deleteitem: CartItemDetails) => {
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
          let cartItem = cartdata?.cartDetails?.cartItemDetails?.filter(
            (item) => item.dependentmenuitemid === 0
          );
          if (rewardpoints?.redeemPoint > 0 && cartItem?.length === 1) {
            clearRedeempoint();
          }
          //CHECK CARTITEM ONLY ONE DEPENDENT ITEM
          if (cartItem?.length === 1 && deleteitem?.dependentmenuitemid === 0) {
            // TO DO:HANDLE GET ITEM AND CaLACULATE THE SUBTOTAL
            dispatch(updateCartItem());
          }
          if (cartItem?.length === 1 && deleteitem?.dependentmenuitemid === 0) {
            dispatch(updateCartItemCount());
          }
          dispatch(setOrderInstruction(""));
          let redeemPoint =
            rewardpoints?.redeemPoint > 0 ? rewardpoints?.redeemPoint : 0;
          let redeemAmount = 0;
          if (redeemPoint > 0) {
            redeemAmount =
              rewardpoints?.redeemPoint / rewardpoints?.rewardvalue;
          }
          dispatch(
            getCartItemCount({
              cartsessionId: sessionid as string,
              locationId: restaurantinfo?.defaultlocationId as number,
              restaurantId: restaurantinfo?.restaurantId as number,
              customerId: userinfo ? userinfo?.customerId : 0,
            })
          );
          CartServices.getCartItemList({
            cartsessionId: String(sessionId),
            locationId: restaurantinfo?.defaultlocationId as number,
            restaurantId: restaurantinfo?.restaurantId as number,
            cartId: 0,
            customerId: customerId,
            rewardpoints: Number(rpoint),
            redeemamount: ramount,
            deliveryaddressId: 0,
            tipPercentage: 0,
            tipAmount: 0,
            ordertype: Number(ordertype),
            selectedTime: selectedtime,
            requestId: order?.deliveryRequestId,
          }).then((response) => {
            if (response) {
              if (response?.cartDetails && response?.cartDetails?.cartTotal) {
                dispatch(setCartItem(response));
              }
            }
          });
        }
      });
      setIsOpenModal(false);
    }
  };

  const editcartclick = (
    item: any,
    menucategoryitem: MainCategoryList,
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

    if (dependentParentQty > 0 && dependentParentQty < plusState) return;

    const cdetail = structuredClone(cartdata);

    if (!cdetail?.cartDetails?.cartItemDetails) return;

    const dcart: CartItemDetails[] = cdetail.cartDetails.cartItemDetails.map(
      (data: CartItemDetails) => {
        if (data.cartid === cartid) {
          return {
            ...data,
            qty: plusState,
            totalprice: data.unitprice * plusState,
          };
        }
        return data;
      }
    );

    cdetail.cartDetails.cartItemDetails = dcart;

    dispatch(setCartItem(cdetail));

    CartServices.updatequantity(
      sessionId as string,
      cartid,
      plusState,
      "0",
      restaurantinfo?.defaultlocationId as number,
      restaurantinfo?.restaurantId as number
    ).then((response) => {
      if (response) {
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
    item: CartItemDetails
  ) => {
    if (minQty === currentQty) {
      return;
    }

    const minusState = currentQty - 1;
    const cdetail = structuredClone(cartdata);

    if (!cdetail?.cartDetails?.cartItemDetails) return;

    const dcart: CartItemDetails[] = cdetail.cartDetails.cartItemDetails.map(
      (data: CartItemDetails) => {
        if (data.cartid === cartid) {
          data.qty = minusState;
          data.totalprice = data.unitprice * data.qty;
        } else if (data?.dependentmenuitemid > 0) {
          if (
            item?.menuitemid === data?.dependentmenuitemid &&
            minusState < data?.qty
          ) {
            return {
              ...data,
              qty: minusState,
              totalprice: data.unitprice * minusState,
            };
          }
        }
        return data;
      }
    );

    cdetail.cartDetails.cartItemDetails = dcart;

    dispatch(setCartItem(cdetail));

    CartServices.updatequantity(
      sessionId as string,
      cartid,
      minusState,
      "0",
      restaurantinfo?.defaultlocationId as number,
      restaurantinfo?.restaurantId as number
    ).then((response) => {
      if (response) {
        setTimeout(() => {
          setupdateQty(!updateQty);
        }, 100);
      }
    });
  };

  const handlesetDeleteData = (data: CartItemDetails) => {
    setdeleteItemData(data);
    setIsOpenModal(true);
  };

  const memoRiseddeleteItemData = useMemo(() => {
    return deleteItemData;
  }, [deleteItemData?.orderitemId, deleteItemData?.cartid]);

  const handleConfirmDeleteItem = useCallback(() => {
    deletecartclick(deleteItemData as CartItemDetails);
  }, [memoRiseddeleteItemData]);

  const handleToggle = (value: boolean) => {
    setcartdeleteconfirm(value);
    setIsOpenModal(value);
  };

  return (
    <>
      {cartdata &&
        cartdata?.cartDetails?.cartItemDetails?.map((data, index) => {
          let counter = index;
          let subOption = cartdata?.cartDetails?.cartOptionParams?.filter(
            (x) => x.cartid === data.cartid
          );
          let subOptionDisplayCmp = (
            <CartSuboptionDisplay subOption={subOption as CartOptionParams[]} />
          );
          let itemImage = getImagePath(
            data?.imgUrl,
            restaurantinfo?.defaultLocation?.defaultmenuitemimage
          );
          let isBorderBottom =
            !cartdata?.cartDetails?.cartItemDetails?.[index + 1]
              ?.dependentmenuitemid;
          let dependentParentQty = getDependentParentQty(
            cartdata?.cartDetails?.cartItemDetails as CartItemDetails[],
            data,
            index
          );

          return (
            <React.Fragment key={`${data.cartid}-${index}`}>
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
              <div className="small mb-1">{subOptionDisplayCmp}</div>
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
                  <input
                    type="text"
                    name="qty"
                    value={data.qty}
                    disabled
                    className="input-qty quantity__input"
                  />
                  <button
                    className="qty-btn-plus btn-light quantity__plus"
                    onClick={() =>
                      increment(data.qty, data.cartid, dependentParentQty)
                    }
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
            </React.Fragment>
          );
        })}
      {isOpenModal && (
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
      )}
    </>
  );
};

export default OrderItemsList;
