import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { CartServices } from "./cart.services";
import {
  CartDetails,
  CartTotal,
  GetCartItems,
  GetCartItemsCount,
  GetCartItemsList,
} from "@/types/cart-types/cartservice.type";
import { actionAsyncStorage } from "next/dist/server/app-render/action-async-storage.external";
import { CartTypes } from "./cart.type";
import { checkIntegerValue } from "@/components/common/utility";
import { ORDER_TYPE } from "@/components/nt/common/utility";
import { checkOrderTime, setDeliveryRequestId } from "../order/order.slice";
import { GetMenuItemDetail } from "@/types/menuitem-types/menuitem.type";

// Define the cart item shape
export interface CartState {
  cartitemdetail: GetCartItems | null;
  cartitemcount: GetCartItemsCount | number;
  carttotal: CartTotal | null;
  deliverycharges: any;
  rewardpoints: number;
  transactionid: string;
  grandtotal: number;
  paymentintentid: string;
  orderinfo: any;
  orderinstruction: string;
  orderdeliveryinstruction: string;
}

const initialState: CartState = {
  cartitemdetail: null,
  cartitemcount: 0,
  carttotal: null,
  deliverycharges: {},
  rewardpoints: 0,
  transactionid: "",
  grandtotal: 0,
  paymentintentid: "",
  orderinfo: {},
  orderinstruction: "",
  orderdeliveryinstruction: "",
};

export const getCartItem = createAsyncThunk(
  //"cart/getCartItem",
  CartTypes.CART_DATA,
  async (
    {
      cartsessionId,
      locationId,
      restaurantId,
      cartId,
      customerId,
      rewardpoints,
      redeemamount,
      deliveryaddressId,
      tipPercentage,
      tipAmount,
      ordertype,
      selectedTime,
      requestId,
    }: {
      cartsessionId: string;
      locationId: number;
      restaurantId: number;
      cartId: number;
      customerId: number;
      rewardpoints?: number;
      redeemamount?: number;
      deliveryaddressId?: number;
      tipPercentage?: number;
      tipAmount?: number;
      ordertype?: number;
      selectedTime: string;
      requestId: string;
    },
    { dispatch }
  ) => {
    const tippercent = tipPercentage && tipPercentage > 0 ? tipPercentage : 0;
    const tip = tipAmount ?? 0;
    const response = await CartServices.getCartItemList({
      cartsessionId,
      locationId,
      restaurantId,
      cartId,
      customerId,
      rewardpoints,
      redeemamount,
      deliveryaddressId,
      tipAmount,
      tipPercentage,
      ordertype,
      selectedTime,
      requestId,
    });
    return response as GetCartItems;
  }
);

export const getCartItemCount = createAsyncThunk(
  CartTypes.CART_ITEM_COUNT,
  async (
    {
      cartsessionId,
      locationId,
      restaurantId,
      customerId,
    }: {
      cartsessionId?: string;
      locationId: number;
      restaurantId: number;
      customerId: number;
    },
    thunkAPI
  ) => {
    const response = await CartServices.getCartItemCount(
      cartsessionId ?? "",
      locationId,
      restaurantId,
      customerId
    );

    if (response && typeof response.cartCount === "number") {
      return response.cartCount;
    } else {
      return 0;
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({
    cartsessionId,
    cartId,
    restaurantId,
    locationId,
  }: {
    cartsessionId: string;
    cartId: number;
    restaurantId: number;
    locationId: number;
  }) => {
    const response = await CartServices.deleteCartItem(
      cartsessionId,
      cartId,
      restaurantId,
      locationId
    );
    return response;
  }
);

export const updatequantity = createAsyncThunk(
  CartTypes.UPDATE_QUANTITY,
  async ({
    cartsessionId,
    cartId,
    qty,
    price,
    locationId,
    restaurantId,
  }: {
    cartsessionId: string;
    cartId: number;
    qty: number;
    price: string;
    locationId: number;
    restaurantId: number;
  }) => {
    const response = await CartServices.updatequantity(
      cartsessionId,
      cartId,
      qty,
      price,
      locationId,
      restaurantId
    );
    return response;
  }
);

export const checkCustomerRewardPoints = createAsyncThunk(
  CartTypes.CHECK_CUSTOMER_REWARD_POINTS,
  async (
    {
      restaurantId,
      customerId,
      rewardpoints,
      amount,
    }: {
      restaurantId: number;
      customerId: number;
      rewardpoints: number;
      amount: string;
    },
    thunkAPI
  ) => {
    await CartServices.checkCustomerRewardPoints(
      restaurantId,
      customerId,
      rewardpoints,
      amount
    ).then((response) => {
      if (response) {
        return response;
      }
    });
  }
);

export const cartcheckout = createAsyncThunk(
  "cart/cartcheckout",
  async ({ obj, restaurantId }: { obj: any; restaurantId: number }) => {
    const response = await CartServices.cartcheckout(obj, restaurantId);
    return response;
  }
);

export const deleteCartItemFromSessionId = createAsyncThunk(
  CartTypes.DELETE_CART_ITEM_FROM_SESSIONID,
  async (
    {
      cartsessionId,
      restaurantId,
      locationId,
    }: {
      cartsessionId: string;
      restaurantId: number;
      locationId: number;
    },
    thunkAPI
  ) => {
    await CartServices.deleteCartItemFromSessionId(
      cartsessionId,
      restaurantId,
      locationId
    ).then((response) => {
      if (response) {
        return response;
      }
    });
  }
);

export const carttotaldata = createAsyncThunk(
  "cart/cartTotalData",
  async (
    {
      cartsessionId,
      locationId,
      restaurantId,
      customerId,
      cartId,
      rewardpoints,
      redeemamount,
      tipPercentage,
      tipAmount,
      deliveryaddressId,
      ordertype,
      requestId,
      recievingTime,
      recievingMeridian,
      ordertimetype,
      recievingDate,
      enableTimeSlot,
    }: {
      cartsessionId: string;
      locationId: number;
      restaurantId: number;
      customerId: number;
      cartId: number;
      rewardpoints?: string;
      redeemamount?: string;
      tipPercentage?: string;
      tipAmount?: number;
      deliveryaddressId?: number;
      ordertype?: number;
      requestId?: string;
      recievingTime: string;
      recievingMeridian: string;
      ordertimetype: number;
      recievingDate: string;
      enableTimeSlot: boolean;
    },
    { dispatch }
  ) => {
    await CartServices.carttotal(
      cartsessionId,
      locationId,
      restaurantId,
      customerId,
      cartId,
      rewardpoints,
      redeemamount,
      tipPercentage,
      checkIntegerValue(tipAmount as number),
      deliveryaddressId,
      ordertype,
      requestId,
      recievingTime,
      recievingMeridian,
      ordertimetype,
      recievingDate,
      enableTimeSlot
    ).then((response) => {
      if (response) {
        if (
          ordertype === ORDER_TYPE.DELIVERY.value &&
          response?.deliveryCharges
        ) {
          let dcharges = JSON.parse(response?.deliveryCharges);
          let dropofTime =
            dcharges != undefined &&
            dcharges?.dropofTime &&
            dcharges.dropofTime;
          let responseRequestId =
            dcharges != undefined && dcharges?.requestId && dcharges?.requestId;
          //check requesting id and incoming id and time not same then update
          if (dcharges && dropofTime && dcharges?.returnMessage === "") {
            if (!enableTimeSlot) {
              dispatch(checkOrderTime(dropofTime));
            }
            dispatch(setDeliveryRequestId(responseRequestId));
          }
        }
        dispatch(setCartTotal(response));
      }
      return response;
    });
  }
);

export const getCartTotalData = createAsyncThunk(
  CartTypes.CART_TOTAL,
  async (
    {
      cartsessionId,
      locationId,
      restaurantId,
      customerId,
      cartId,
      rewardpoints,
      redeemamount,
      tipPercentage,
      tipAmount,
      deliveryaddressId,
      ordertype,
      requestId,
      recievingTime,
      recievingMeridian,
      enableTimeSlot,
    }: {
      cartsessionId: string;
      locationId: number;
      restaurantId: number;
      customerId: number;
      cartId: number;
      rewardpoints: string;
      redeemamount: string;
      tipPercentage: string;
      tipAmount: number;
      deliveryaddressId: number;
      ordertype: number;
      requestId: string;
      recievingTime: string;
      recievingMeridian: string;
      enableTimeSlot: number;
    },
    { dispatch }
  ) => {
    await CartServices.carttotal(
      cartsessionId,
      locationId,
      restaurantId,
      customerId,
      cartId,
      rewardpoints,
      redeemamount,
      tipPercentage,
      tipAmount,
      deliveryaddressId,
      ordertype,
      requestId,
      recievingTime,
      recievingMeridian,
      enableTimeSlot
    ).then((response) => {
      if (response) {
        if (
          ordertype === ORDER_TYPE.DELIVERY.value &&
          response?.deliveryCharges
        ) {
          let dcharges = JSON.parse(response?.deliveryCharges);
          let dropofTime =
            dcharges != undefined &&
            dcharges?.dropofTime &&
            dcharges.dropofTime;
          let responseRequestId =
            dcharges != undefined && dcharges?.requestId && dcharges?.requestId;
          //check requesting id and incoming id and time not same then update
          if (dcharges && dropofTime && dcharges?.returnMessage === "") {
            if (!enableTimeSlot) {
              dispatch(checkOrderTime(dropofTime));
            }
            dispatch(setDeliveryRequestId(responseRequestId));
          }
        }
        dispatch(setCartTotal(response));
      }
      return response;
    });
  }
);

export const afterPaymentSuccess = (
  restaurantId: number,
  orderId: number,
  source: any
) => {
  // return (dispatch) => {
  if (orderId > 0) {
    CartServices.afterPaymentSuccess(restaurantId, orderId, source);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItem: (state, action: PayloadAction<GetCartItems>) => {
      state.cartitemdetail = action.payload;
    },
    updateCartItemCount: (state) => {
      state.cartitemcount = 0;
    },
    updateCartItem: (state) => {
      state.cartitemdetail = null;
    },
    setTransactionId: (state, action: PayloadAction<any>) => {
      state.transactionid = action.payload;
    },
    setGrandTotal: (state, action: PayloadAction<number>) => {
      state.grandtotal = action.payload;
    },
    setPaymentIntentId: (state, action: PayloadAction<string>) => {
      state.paymentintentid = action.payload;
    },
    setOrderInstruction: (state, action: PayloadAction<string>) => {
      state.orderinstruction = action.payload;
    },
    setOrderDeliveryInstruction: (state, action: PayloadAction<string>) => {
      state.orderdeliveryinstruction = action.payload;
    },
    emptycart: (state) => {
      Object.assign(state, initialState);
    },
    resetCart: (state) => {
      Object.assign(state, initialState);
    },
    setOrderInfo: (state, action: PayloadAction<any>) => {
      state.orderinfo = action.payload;
    },
    emptyOrderInfo: (state) => {
      state.orderinfo = null;
    },
    setCartTotal: (state, action: PayloadAction<any>) => {
      state.carttotal = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      getCartItem.fulfilled,
      (state, action: PayloadAction<GetCartItems | null>) => {
        state.cartitemdetail = action.payload;
      }
    );

    builder.addCase(
      getCartItemCount.fulfilled,
      (state, action: PayloadAction<GetCartItemsCount | number>) => {
        state.cartitemcount = action.payload;
      }
    );

    builder.addCase(
      updatequantity.fulfilled,
      (state, action: PayloadAction<GetCartItemsCount | number>) => {
        state.cartitemcount = action.payload;
      }
    );

    builder.addCase(
      carttotaldata.fulfilled,
      (state, action: PayloadAction<any>) => {
        if (action.payload) {
          state.carttotal = action.payload.cartDetails;
          try {
            state.deliverycharges = JSON.parse(
              action.payload?.deliveryCharges || "{}"
            );
          } catch {
            state.deliverycharges = {};
          }
        }
      }
    );

    builder.addCase(deleteCartItemFromSessionId.fulfilled, (state) => {
      // Clear cart item detail and count
      state.cartitemdetail = null;
      state.cartitemcount = 0;
    });
  },
});

export const {
  setCartItem,
  updateCartItemCount,
  updateCartItem,
  setTransactionId,
  setGrandTotal,
  setPaymentIntentId,
  setOrderInstruction,
  setOrderDeliveryInstruction,
  emptycart,
  resetCart,
  setOrderInfo,
  emptyOrderInfo,
  setCartTotal,
} = cartSlice.actions;

export default cartSlice.reducer;
