import React, { useCallback, useEffect, useMemo, useState } from "react";
import useUtility from "../../customhooks/utility-hook";
import {
  checkCheckoutDisable,
  getDependentParentQty,
  GetThemeDetails,
  handleSetDeliveryTypeError,
  ORDER_TYPE,
  ORDERTYPE,
} from "../../common/utility";
import { getImagePath } from "../common/utility";
import useFutureOrder from "../../customhooks/usefuture-order-hook";
import MenuItemModal from "../category/category-menuitems/menuitem-modal/menuitem-modal.component";
import Link from "next/link";
import { useReduxData } from "@/components/customhooks/useredux-data-hooks";
import useTipValue from "@/components/customhooks/use-tip-hook";
import {
  CartItemDetails,
  CartOptionParams,
  CartTotal,
} from "@/types/cart-types/cartservice.type";
import { useAppDispatch } from "../../../../redux/hooks";
import { useParams, useRouter } from "next/navigation";
import { CartServices } from "../../../../redux/cart/cart.services";
import {
  carttotaldata,
  deleteCartItem,
  getCartItemCount,
  setCartItem,
  setOrderInstruction,
  updateCartItem,
  updateCartItemCount,
  updatequantity,
} from "../../../../redux/cart/cart.slice";
import { CustomerServices } from "../../../../redux/customer/customer.services";
import { setrewardpoint } from "../../../../redux/rewardpoint/rewardpoint.slice";
import { MenuItemServices } from "../../../../redux/menu-item/menu-item.services";
import {
  getMenuItemDetailes,
  selectedMenuItem,
  setDipendentItemQty,
  setMenuItemDetailList,
} from "../../../../redux/menu-item/menu-item.slice";
import CartSuboptionDisplay from "./suboption-display.component";
import { CartMessage } from "../helpers/static-message/cart-message";
import CommonModal from "../common/common-model.component";

const CartItemsDetailComponent = () => {
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
    cartItemsAmountTotal,
  } = useReduxData();
  // const {isShowing, toggle} = useModal();
  const { calculateTip } = useTipValue(
    true,
    cart?.carttotal as CartTotal,
    false,
    true
  );

  const cartdata = cart?.cartitemdetail && cart?.cartitemdetail;
  const customerId = userinfo ? userinfo.customerId : 0;
  let sessionId = sessionid;
  const [deleteItemData, setdeleteItemData] = useState<CartItemDetails | null>(
    null
  );
  const [isProductItemPopup, setisProductItemPopup] = useState<boolean>(false);
  const [updateQty, setupdateQty] = useState<number>(0);

  const pickupordelivery = selecteddelivery.pickupordelivery;
  const dispatch = useAppDispatch();
  const { isDisplayPrice } = useUtility();
  let rewardvalue = rewardpoints?.rewardvalue;

  var carttotal = cart?.carttotal && cart.carttotal;
  let cartitemcount = cart.cartitemcount;
  const deliveryaddressinfo = selecteddelivery.selecteddeliveryaddress;
  const ordertype =
    pickupordelivery === ORDER_TYPE.DELIVERY.text
      ? ORDER_TYPE.DELIVERY.value
      : ORDER_TYPE.PICKUP.value;

  const { recievingDate, enabletimeslot } = useFutureOrder();

  let selectedTheme = GetThemeDetails(restaurantinfo?.themetype as number);
  let locationFullLink =
    "/" +
    selectedTheme?.url +
    "/" +
    restaurantinfo?.restaurantURL +
    "/" +
    restaurantinfo?.defaultLocation?.locationURL.trim() +
    "/";
  const minQty = 1;

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [cartdeleteconfirm, setcartdeleteconfirm] = useState<boolean>(false);
  const [openMenuItemModal, setopenMenuItemModal] = useState<boolean>(false);
  const [updateCart, setUpdateCart] = useState<boolean>(false);
  let locationHrefLink = `/${selectedTheme?.url}/[dynamic]/[location]/`;

  const router = useRouter();
  const params = useParams();
  const { update } = params;

  let rewardpoint = rewardpoints;
  let selectedtime = order?.checktime ?? "";

  useEffect(() => {
    let rpoint = 0,
      ramount = 0;
    if (rewardpoint?.redeemPoint) {
      rpoint = rewardpoint.redeemPoint > 0 ? rewardpoint.redeemPoint : 0;
    }
    if (rewardpoint?.rewardvalue && rpoint > 0) {
      ramount = rpoint / rewardpoint.rewardvalue;
    }

    if (cart?.cartitemcount !== 0) {
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
        tipPercentage: carttotal?.tipPercentage,
        tipAmount: carttotal?.tipAmount,
        ordertype: ordertype,
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
  }, [
    cart?.cartitemcount,
    update,
    deliveryaddressinfo,
    userinfo?.customerId,
    order?.checktime,
    updateCart,
  ]);

  const clearRedeempoint = () => {
    CustomerServices.checkCustomerRewardPointsLocationBase(
      restaurantinfo?.restaurantId as number,
      customerId,
      0,
      "0",
      restaurantinfo?.defaultlocationId as number
    ).then((response) => {
      if (response?.status == 1 && userinfo) {
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
            cartsessionId: sessionid as string,
            locationId: restaurantinfo?.defaultlocationId as number,
            restaurantId: restaurantinfo?.restaurantId as number,
            customerId,
            cartId: 0,
            rewardpoints: String(carttotal?.reedemPoints),
            redeemamount: String(carttotal?.reedemAmount),
            tipPercentage: String(carttotal?.tipPercentage),
            tipAmount: carttotal?.tipAmount,
            deliveryaddressId: deliveryaddressinfo?.deliveryaddressId as number,
            ordertype: ordertype,
            requestId: order.deliveryRequestId,
            recievingTime: recievingTime as string,
            recievingMeridian: meredian as string,
            ordertimetype: orderTimeType,
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
          //dispatch({ type: CartTypes.DELETE_CART_ITEM, payload: response });
          //dispatch(deleteCartItem(response))

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
              cartsessionId: sessionId as string,
              locationId: restaurantinfo?.defaultlocationId as number,
              restaurantId: restaurantinfo?.restaurantId as number,
              customerId: customerId,
            })
          );
        }
      });
      // setcartdeleteconfirm(false);
      setIsOpenModal(false);
    }
  };

  const editcartclick = (
    item: any,
    menucategoryitem: any,
    menuitemnameurl: any
  ) => {
    if (item != undefined) {
      MenuItemServices.getMenuItemList({
        restaurantId: restaurantinfo?.restaurantId as number,
        locationId: restaurantinfo?.defaultlocationId as number,
        customerId: customerId,
        menuitemId: item.menuitemid,
        cartsessionId: sessionId as string,
        cartId: item.cartid,
      }).then((response) => {
        if (response) {
          // dispatch({
          //   type: MenuItemTypes.MENU_ITEM_DETAIL_LIST,
          //   payload: response,
          // });
          dispatch(setMenuItemDetailList(response));
          dispatch(selectedMenuItem(item));
        }
      });
    }
  };

  // const increment = async (
  //   currentQty: number,
  //   cartid: number,
  //   dependentParentQty: number
  // ) => {
  //   const plusState = currentQty + 1;
  //   if (dependentParentQty > 0 && dependentParentQty < plusState) {
  //     return;
  //   }
  //   let dcart: any = [];
  //   let cdetail = cartdata;
  //   cartdata?.cartDetails?.cartItemDetails?.map((data) => {
  //     if (data.cartid === cartid) {
  //       data.qty = plusState;
  //       data.totalprice = data.unitprice * data.qty;
  //     }
  //     dcart.push(data);
  //   });

  //   // dispatch(setCartItem(cdetail));
  //   let responsResult = await dispatch(
  //     updatequantity({
  //       cartsessionId: sessionId as string,
  //       cartId: cartid,
  //       qty: plusState,
  //       price: "0",
  //       locationId: restaurantinfo?.defaultlocationId as number,
  //       restaurantId: restaurantinfo?.restaurantId as number,
  //     })
  //   );
  //   if (responsResult && cdetail) {
  //     cdetail.cartDetails.cartItemDetails = dcart;
  //     dispatch(setCartItem(cdetail));
  //   }
  // };

  // const decrement = async (
  //   currentQty: any,
  //   cartid: any,
  //   dependentParentQty: any,
  //   item: any
  // ) => {
  //   if (minQty === currentQty) {
  //     return;
  //   }
  //   const minusState = currentQty - 1;
  //   let dcart: any = [];
  //   let cdetail = cartdata;
  //   cartdata?.cartDetails?.cartItemDetails?.map((data) => {
  //     if (data.cartid === cartid) {
  //       data.qty = minusState;
  //       data.totalprice = data.unitprice * data.qty;
  //     } else if (data?.dependentmenuitemid > 0) {
  //       //TODO: CHECK THE IS PARENT QTY IS LESS THEN DEPENDENT THEN NEED TO ALSO UPDATE THE DEPENDENT QTY
  //       if (
  //         item?.menuitemid === data?.dependentmenuitemid &&
  //         minusState < data?.qty
  //       ) {
  //         data.qty = minusState;
  //       }
  //     } else {
  //     }
  //     dcart.push(data);
  //   });

  //   let responsResult = await dispatch(
  //     updatequantity({
  //       cartsessionId: sessionId as string,
  //       cartId: cartid,
  //       qty: minusState,
  //       price: "0",
  //       locationId: restaurantinfo?.defaultlocationId as number,
  //       restaurantId: restaurantinfo?.restaurantId as number,
  //     })
  //   );
  //   if (responsResult && cdetail) {
  //     cdetail.cartDetails.cartItemDetails = dcart;
  //     dispatch(setCartItem(cdetail));
  //   }
  // };

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
          setupdateQty(0);
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
          setupdateQty(0);
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

  const editItemClick = (item: any, depQty: number = 0) => {
    if (item != undefined) {
      // setisProductItemPopup(false);
      setopenMenuItemModal(false);
      if (depQty > 0) {
        dispatch(setDipendentItemQty(depQty));
      }
      MenuItemServices.getMenuItemList({
        restaurantId: restaurantinfo?.restaurantId as number,
        locationId: restaurantinfo?.defaultlocationId as number,
        customerId: customerId,
        menuitemId: item.menuitemid,
        cartsessionId: sessionId as string,
        cartId: item.cartid,
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
            setopenMenuItemModal(true);
          }, 100);
        }
      });
    }
  };

  const handleToggle = (value: boolean) => {
    setcartdeleteconfirm(value);
    setIsOpenModal(value);
  };

  const handleToggleMenuItem = (value: boolean) => {
    setopenMenuItemModal(value);
    setUpdateCart(!updateCart);
  };

  return (
    <>
      <div className="infobox mb-2">
        {cartdata &&
          cartdata?.cartDetails?.cartItemDetails &&
          cartdata?.cartDetails?.cartItemDetails?.map((data: any, index) => {
            let counter = index;
            let subOption = cartdata?.cartDetails?.cartOptionParams?.filter(
              (x) => x.cartid === data.cartid
            );
            let subOptionDisplayCmp = (
              <CartSuboptionDisplay
                subOption={subOption as CartOptionParams[]}
              />
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
              <div key={index}>
                <h3 className="heading d-flex align-items-center">
                  {data.itemname + " - " + data.subparametername} &nbsp;
                  {isDisplayPrice && (
                    <>
                      ({data.currencysymbol} {data?.unitprice?.toFixed(2)})
                    </>
                  )}
                  <a
                    className="btn-default small ms-2 edit-checkout"
                    onClick={() => editItemClick(data, dependentParentQty)}
                  >
                    {" "}
                    <i className="fa ms-0 me-1 fa-pencil" />
                    <span className="d-md-inline-block d-none">Edit</span>{" "}
                  </a>
                  <a
                    className="deletebtn medium"
                    onClick={() => {
                      handlesetDeleteData(data);
                    }}
                  >
                    {" "}
                    <i className="fa fa-trash red-color-dark" />{" "}
                  </a>
                </h3>

                <div className="small d-flex textsmall">
                  {subOptionDisplayCmp}

                  {data?.description}

                  <div className="text-lg-end text-md-end pt-3 pt-lg-0 pt-md-0 ms-auto ps-lg-3 ps-md-3">
                    <div className="d-flex ms-auto pt-0 align-items-center justify-content-between">
                      <div className="quantity normal qty-container me-5">
                        <button
                          onClick={() =>
                            decrement(
                              data.qty,
                              data.cartid,
                              dependentParentQty,
                              data
                            )
                          }
                          className={
                            data.qty > 1
                              ? "qty-btn-minus btn-light quantity__minus "
                              : "qty-btn-minus btn-light quantity__minus disabled"
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
                          onClick={() =>
                            increment(data.qty, data.cartid, dependentParentQty)
                          }
                          className={
                            !(
                              dependentParentQty !== 0 &&
                              dependentParentQty === data.qty
                            )
                              ? "qty-btn-plus btn-light quantity__plus"
                              : "qty-btn-plus btn-light quantity__plus disabled pe-none"
                          }
                          type="button"
                        >
                          {" "}
                          <i className="fa fa-plus" />{" "}
                        </button>
                      </div>

                      <span className=" fs-18 color-green fw-semibold">
                        {isDisplayPrice && (
                          <>
                            {data.currencysymbol}
                            {data?.totalprice?.toFixed(2)}
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                {data?.studentname && (
                  <div className="col-lg-12 col-sm-12 mt-0 col-xs-12 xs-px-0">
                    <p className="color_black mt-0">
                      Name:{" "}
                      <span className="color-red"> {data?.studentname} </span>
                    </p>
                  </div>
                )}
                {((pickupordelivery === ORDERTYPE.Pickup &&
                  !data.categorytakeoutavailable) ||
                  (pickupordelivery === ORDERTYPE.Delivery &&
                    !data.categorydeliveryavailable) ||
                  !data?.availability) && (
                  <div className="col-12 col-sm-12 col-md-12">
                    <h6 className="text-danger">
                      {" "}
                      <img
                        src="/nt/img/alert-circle.svg"
                        alt=""
                        className="me-1"
                      />
                      {`${CartMessage.ITEM_NOT_AVILABLE} ${pickupordelivery}.`}
                    </h6>
                  </div>
                )}

                {cartdata?.cartDetails?.cartItemDetails &&
                  counter <
                    cartdata?.cartDetails?.cartItemDetails?.length - 1 &&
                  isBorderBottom && <hr />}
              </div>
            );
          })}
        {/* <Modal
        isShowing={isShowing}
        hide={toggle}
      /> */}
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

        {openMenuItemModal && (
          <MenuItemModal
            isOpenModal={openMenuItemModal}
            handleToggleMenuItem={handleToggleMenuItem}
            isPreLoaded={true}
          />
        )}
      </div>
      <div className=" text-start  mb-2">
        <Link
          href={`${locationFullLink}`}
          //href={`${locationHrefLink}`}
          className="btn-default "
          //as={`${locationFullLink}`}
        >
          Add More Items
        </Link>
      </div>
    </>
  );
};
export default CartItemsDetailComponent;
